/**
 * 게시물 본문(b_contents) 렌더 공통 스타일.
 *
 * 렌더 경로가 두 개다:
 *  - `editor` 타입 → Shadow DOM (globals.css·Tailwind 가 닿지 않는다)
 *  - `html`   타입 → 라이트 DOM
 *
 * 두 경로가 같은 규칙을 써야 하므로 CSS 문자열을 여기 한 곳에만 둔다.
 * (globals.css 에 따로 적으면 두 벌이 되어 한쪽만 바뀌는 사고가 난다)
 */

/** 비디오 최대 폭 — 이 값을 바꾸면 두 렌더 경로에 동시 반영된다. */
export const POST_VIDEO_MAX_WIDTH_PX = 1024;

/**
 * `iframe` 에 붙은 인라인 `width`/`height` 속성(기존 게시물의 `width="560" height="315"`)을
 * 이기려면 속성보다 우선하는 CSS 선언이 필요하다. CSS 선언은 presentational attribute 를
 * 항상 이기므로 `!important` 없이도 동작하지만, Shadow DOM 에 함께 로드되는
 * quill.snow.css 의 `.ql-editor .ql-video` 규칙과 겹쳐 순서 의존이 생기는 것을 막기 위해
 * 명시적으로 우선순위를 확보한다.
 */
export const POST_CONTENT_CSS = `
    .post-content img {
        max-width: 100%;
        height: auto;
    }

    .post-content iframe,
    .post-content video,
    .post-content .ql-video {
        display: block;
        width: 100%;
        max-width: ${POST_VIDEO_MAX_WIDTH_PX}px;
        height: auto;
        aspect-ratio: 16 / 9;
        border: 0;
    }

    /* 본문이 가로 스크롤을 만들지 않게 한다 */
    .post-content {
        max-width: 100%;
        overflow-wrap: break-word;
    }

    .post-content table {
        max-width: 100%;
    }
`;
