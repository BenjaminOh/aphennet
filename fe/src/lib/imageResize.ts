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

/** JPEG/WebP 로 재인코딩할 때 쓰는 품질. PNG 는 무손실이라 이 값이 무시된다. */
const ENCODE_QUALITY = 0.92;

export interface ResizedImage {
    /** 본문에 삽입할 data URL */
    src: string;
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
 * 파일을 긴 변 `maxEdge` 픽셀 이하로 줄여 data URL 로 돌려준다.
 * 줄일 필요가 없거나 줄일 수 없는 파일은 원본 그대로 돌려준다.
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

    const passthrough = async (width: number, height: number): Promise<ResizedImage> => ({
        src: await readAsDataURL(file),
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

    // 이미 충분히 작거나, 재인코딩하면 안 되는 포맷(GIF 애니메이션·SVG)이면 원본 유지
    if (!canReEncode || longEdge <= maxEdge) {
        if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap) {
            source.close();
        }
        return passthrough(width, height);
    }

    const scale = maxEdge / longEdge;
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

        // jpg 는 표준 MIME 이 아니라 캔버스가 png 로 떨어뜨린다. jpeg 로 정규화한다.
        const outMime = mime === "image/jpg" ? "image/jpeg" : mime;
        const blob = await toBlob(canvas, outMime);

        // 축소했는데 원본보다 커졌다면(드문 PNG 케이스) 의미가 없으니 원본을 쓴다.
        if (blob.size >= file.size) {
            return passthrough(width, height);
        }

        return {
            src: await readAsDataURL(blob),
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
