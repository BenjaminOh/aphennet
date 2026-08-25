import type { ElementFormatType } from "lexical";

/**
 * 에디터 이미지 삽입 공통 설정.
 *
 * 이미지가 본문에 들어오는 경로가 둘이다.
 *  - "이미지 넣기" 모달 (images-plugin.tsx)
 *  - 본문에 직접 드래그앤드롭 / 붙여넣기 (drag-drop-paste-plugin.tsx)
 * 두 경로가 다른 값을 쓰면 같은 사진이 경로에 따라 다른 크기로 들어가므로
 * 기준값을 여기 한 곳에만 둔다.
 */

/** 한 번에 넣을 수 있는 최대 사진 수. 서버는 15장까지 받지만 더 엄격한 쪽을 쓴다. */
export const MAX_IMAGE_COUNT = 12;

/** "사진 여백 넣기" 체크 시 이미지에 적용할 여백(px) */
export const IMAGE_MARGIN = 10;

/** 사진 폭 기본값(px) */
export const DEFAULT_IMAGE_WIDTH = 800;

/**
 * 서버 저장 상한. be/src/middleware/util.js 의 MAX_IMAGE_SIZE / MAX_TOTAL_SIZE / MAX_IMAGES 와
 * 반드시 같은 값을 유지해야 한다. (한쪽만 바뀌면 저장 시점에야 에러가 뜬다)
 *
 * 이 값은 API 컨테이너가 감당할 수 있는 본문 크기에 묶여 있다.
 * 2026-08-25 에 30MB/300MB 로 올렸다가 37MB 요청에서 heap 이 터져 되돌렸다.
 */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_IMAGE_BYTES = 50 * 1024 * 1024;

/** 사진 폭 선택지. "original" 은 각 사진의 실제 폭, "custom" 은 숫자 직접 입력. */
export const IMAGE_WIDTH_OPTIONS = [
    { value: "original", label: "원본" },
    { value: "1200", label: "1200px" },
    { value: "1024", label: "1024px" },
    { value: "800", label: "800px" },
    { value: "640", label: "640px" },
    { value: "480", label: "480px" },
    { value: "custom", label: "직접 입력…" },
] as const;

export type ImageWidthMode = (typeof IMAGE_WIDTH_OPTIONS)[number]["value"];

/** Select 기본 선택값 */
export const DEFAULT_IMAGE_WIDTH_MODE: ImageWidthMode = "800";

/** 본문에 직접 드롭/붙여넣기 했을 때 쓰는 기본 삽입 옵션 (모달 기본값과 동일) */
export const DEFAULT_INSERT_OPTIONS: {
    width: number;
    margin: number;
    align: ElementFormatType;
    newLine: boolean;
} = {
    width: DEFAULT_IMAGE_WIDTH,
    margin: IMAGE_MARGIN,
    align: "left",
    newLine: true,
};

/** 대체 텍스트 기본값으로 쓰기 위해 파일명에서 확장자를 뗀다. */
export function stripExtension(fileName: string): string {
    return fileName.replace(/\.[^./\\]+$/, "");
}

function formatMb(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(1);
}

/**
 * 서버 상한(be/src/middleware/util.js)을 삽입 전에 미리 검사한다.
 * 통과하면 null, 걸리면 사용자에게 보여줄 안내 문구를 돌려준다.
 */
export function validateImageBytes(items: { name: string; bytes: number }[]): string | null {
    if (items.length > MAX_IMAGE_COUNT) {
        return `사진은 한 번에 최대 ${MAX_IMAGE_COUNT}장까지 넣을 수 있습니다.`;
    }

    const tooBig = items.find(item => item.bytes > MAX_IMAGE_BYTES);
    if (tooBig) {
        return (
            `"${tooBig.name}" 은(는) ${formatMb(tooBig.bytes)}MB 로 너무 큽니다.<br />` +
            `사진 한 장은 ${formatMb(MAX_IMAGE_BYTES)}MB 까지 넣을 수 있습니다.`
        );
    }

    const total = items.reduce((sum, item) => sum + item.bytes, 0);
    if (total > MAX_TOTAL_IMAGE_BYTES) {
        return (
            `사진 전체 용량이 ${formatMb(total)}MB 로 너무 큽니다.<br />` +
            `한 게시글에는 ${formatMb(MAX_TOTAL_IMAGE_BYTES)}MB 까지 넣을 수 있습니다.`
        );
    }

    return null;
}
