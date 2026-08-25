/**
 * 브라우저 캔버스 기반 이미지 축소 유틸.
 *
 * 에디터에 넣는 사진은 업로드 엔드포인트 없이 base64 data URL 로 본문에 실려 전송되고,
 * 서버가 저장 시점에 파일로 빼낸다(be/src/middleware/util.js `base64ToImagesPath`).
 * 그 서버 로직에 이미지당·합계 상한이 있어(be/src/middleware/util.js) 원본 사진을 그대로 넣으면
 * 저장이 통째로 실패할 수 있고, 무엇보다 본문이 무거워져 사용자단 로딩이 느려진다.
 * 그래서 삽입 시점에 여기서 실제 픽셀을 줄인다.
 *
 * 원칙
 *  - 긴 변이 상한 이하면 재인코딩하지 않고 원본 바이트를 그대로 쓴다.
 *    (PNG 를 캔버스로 다시 인코딩하면 오히려 커지는 경우가 있다)
 *  - 축소할 때 포맷은 원본을 유지한다. (PNG→PNG, JPEG→JPEG, WebP→WebP)
 *  - 캔버스가 인코딩할 수 없거나 재인코딩하면 안 되는 타입(GIF 애니메이션, SVG, HEIC)은
 *    손대지 않고 그대로 통과시킨다.
 *  - 어떤 이유로든 실패하면 예외를 던지지 않고 원본을 그대로 돌려준다.
 */

/** 축소 후 긴 변 최대 픽셀. 이 값을 바꾸면 모달·드롭 경로 모두에 반영된다. */
export const MAX_IMAGE_EDGE_PX = 1600;

/** 캔버스로 다시 인코딩해도 되는 MIME. 이 목록 밖은 원본을 그대로 둔다. */
const RE_ENCODABLE_MIME = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

/**
 * 출력 포맷은 WebP 로 통일한다.
 * 1600px PNG 는 장당 2~3MB 라 사진 12장이면 본문이 30MB 를 넘고,
 * 그 상태로 저장하면 서버가 감당하지 못한다(2026-08-25 heap 장애).
 * WebP 는 같은 화질에서 ~300KB 로 10배 작고 투명도도 유지된다.
 */
const OUTPUT_MIME = "image/webp";

/** WebP 인코딩 품질. */
const ENCODE_QUALITY = 0.85;

export interface ResizedImage {
    /** 업로드할 실제 바이트. 삽입 시점에 이걸 서버로 올린다. */
    blob: Blob;
    /** 실제 픽셀 폭 (축소 후) */
    width: number;
    /** 실제 픽셀 높이 (축소 후) */
    height: number;
    /** 디코딩 기준 바이트 수. 서버 상한 사전 검사에 쓴다. */
    bytes: number;
    /** 픽셀을 실제로 줄였는지 여부 */
    resized: boolean;
}

function readAsDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error ?? new Error("파일을 읽지 못했습니다."));
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : "";
            if (result) {
                resolve(result);
            } else {
                reject(new Error("파일을 읽지 못했습니다."));
            }
        };
        reader.readAsDataURL(blob);
    });
}

/** createImageBitmap 을 우선 쓰고(디코딩이 메인 스레드를 덜 막는다), 없거나 실패하면 <img> 로 폴백한다. */
async function decode(file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> {
    if (typeof createImageBitmap === "function") {
        try {
            const bitmap = await createImageBitmap(file);
            return { source: bitmap, width: bitmap.width, height: bitmap.height };
        } catch {
            // 폴백으로 내려간다
        }
    }

    const dataUrl = await readAsDataURL(file);
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error("이미지를 디코딩하지 못했습니다."));
        img.src = dataUrl;
    });
}

function toBlob(canvas: HTMLCanvasElement, mime: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            blob => (blob ? resolve(blob) : reject(new Error("이미지를 인코딩하지 못했습니다."))),
            mime,
            ENCODE_QUALITY,
        );
    });
}

/**
 * 파일을 긴 변 `maxEdge` 픽셀 이하로 줄여 Blob 으로 돌려준다.
 * 줄일 필요가 없거나 줄일 수 없는 파일은 원본 Blob 을 그대로 돌려준다.
 *
 * data URL 은 만들지 않는다. 미리보기는 호출부에서 URL.createObjectURL 로 만들고,
 * 본문에는 업로드 후 받은 서버 URL 이 들어간다.
 */
export async function resizeImageFile(file: File, maxEdge: number = MAX_IMAGE_EDGE_PX): Promise<ResizedImage> {
    const mime = file.type.toLowerCase();
    const canReEncode = RE_ENCODABLE_MIME.includes(mime);

    let decoded: { source: CanvasImageSource; width: number; height: number } | null = null;
    try {
        decoded = await decode(file);
    } catch {
        decoded = null;
    }

    const passthrough = (width: number, height: number): ResizedImage => ({
        blob: file,
        width,
        height,
        bytes: file.size,
        resized: false,
    });

    // 디코딩 실패(HEIC 등) — 원본을 그대로 쓴다. 크기 검사는 호출부가 bytes 로 한다.
    if (!decoded) {
        return passthrough(0, 0);
    }

    const { source, width, height } = decoded;
    const longEdge = Math.max(width, height);

    // 재인코딩하면 안 되는 포맷(GIF 애니메이션·SVG)은 원본 유지
    if (!canReEncode) {
        if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap) {
            source.close();
        }
        return passthrough(width, height);
    }

    // 상한 이하라도 WebP 로 다시 인코딩한다. 폭이 작아도 PNG 는 수 MB 가 될 수 있다.
    const scale = longEdge > maxEdge ? maxEdge / longEdge : 1;
    const targetWidth = Math.max(1, Math.round(width * scale));
    const targetHeight = Math.max(1, Math.round(height * scale));

    try {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return passthrough(width, height);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

        const blob = await toBlob(canvas, OUTPUT_MIME);

        // 변환 결과가 원본보다 크고 크기도 그대로면 굳이 바꿀 이유가 없다.
        if (blob.size >= file.size && scale === 1) {
            return passthrough(width, height);
        }

        return {
            blob,
            width: targetWidth,
            height: targetHeight,
            bytes: blob.size,
            resized: true,
        };
    } catch {
        return passthrough(width, height);
    } finally {
        if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap) {
            source.close();
        }
    }
}
