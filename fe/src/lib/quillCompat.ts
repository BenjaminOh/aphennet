/**
 * 과거 Quill 에디터로 작성된 게시물을 Lexical 에디터에 넣기 전에 보정한다.
 *
 * Quill 은 정렬을 `class="ql-align-center"` 로 저장하고, 그 의미는 quill.snow.css 가
 * 정의한다. Lexical 의 `$generateNodesFromDOM` 은 인라인 `style="text-align:…"` 만 읽고
 * 클래스는 모르기 때문에, 보정하지 않으면 **에디터로 열어 재저장하는 순간 정렬이 사라진다.**
 *
 * 공개 렌더(PostContent)는 Shadow DOM 에 quill.snow.css 를 계속 로드하므로 보정이 필요 없다.
 * 그래서 이 함수는 **에디터 입력 경로에서만** 쓴다.
 */

/** Quill 정렬 클래스 → 인라인 text-align 값 */
const ALIGN_MAP: Record<string, string> = {
    "ql-align-center": "center",
    "ql-align-right": "right",
    "ql-align-justify": "justify",
    // ql-align-left 는 Quill 이 기본값이라 클래스를 붙이지 않는다
};

/**
 * `class="ql-align-center"` 를 `style="text-align:center"` 로 바꾼다.
 * 이미 `text-align` 이 인라인으로 있으면 기존 값을 그대로 둔다(더 구체적인 지정이므로).
 */
export function normalizeQuillAlignment(html: string): string {
    if (!html || !html.includes("ql-align-")) return html;

    return html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (whole, tag: string, attrs: string) => {
        const hit = Object.keys(ALIGN_MAP).find(cls => new RegExp(`(^|["'\\s])${cls}(["'\\s]|$)`).test(attrs));
        if (!hit) return whole;

        // 정렬 클래스만 제거하고 나머지 클래스는 유지
        let next = attrs.replace(new RegExp(`\\s*\\b${hit}\\b`, "g"), "");
        next = next.replace(/\sclass=(["'])\s*\1/g, ""); // 빈 class="" 정리

        if (/style=["'][^"']*text-align/i.test(next)) return `<${tag}${next}>`;

        const align = ALIGN_MAP[hit];
        if (/\sstyle=["']/i.test(next)) {
            next = next.replace(/(\sstyle=["'])/i, `$1text-align:${align};`);
        } else {
            next += ` style="text-align:${align}"`;
        }
        return `<${tag}${next}>`;
    });
}
