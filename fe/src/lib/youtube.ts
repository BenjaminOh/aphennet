/**
 * YouTube URL 유틸 — 에디터(Lexical YouTubeNode)와 게시물 렌더(PostContent)가 공유한다.
 * 정규식을 두 곳에 복제하면 한쪽만 고쳐지는 사고가 나므로 여기 한 곳에만 둔다.
 */

/**
 * YouTube URL 에서 11자 video id 를 뽑아낸다. 못 찾으면 null.
 *
 * `\/+` 로 슬래시를 여러 개 허용하는 이유: 운영 게시물에 `.../embed//LZhH9Dm15LY` 처럼
 * 슬래시가 중복된 URL 이 실제로 존재한다. 단일 슬래시만 받으면 그 글의 비디오를 놓친다.
 */
export function extractYoutubeId(src: string | null | undefined): string | null {
    if (!src) return null;
    const match =
        /(?:youtube(?:-nocookie)?\.com\/(?:embed\/+|shorts\/+|live\/+|watch\?v=|.*[?&]v=)|youtu\.be\/+)([A-Za-z0-9_-]{11})/.exec(
            src,
        );
    return match ? match[1] : null;
}

/** 임베드에 쓸 iframe src. 쿠키를 덜 쓰는 nocookie 도메인을 사용한다. */
export function youtubeEmbedSrc(videoId: string): string {
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

const IFRAME_ATTRS =
    'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="YouTube video"';

/**
 * 게시물 본문에서 **맨 URL 자동 링크**(`<a href="…youtube…">같은 URL</a>`)를 iframe 으로 바꾼다.
 *
 * 과거 Quill 에디터는 붙여넣은 YouTube URL 을 임베드하지 못하고 `<a>` 로 자동 링크만 했다.
 * 그렇게 저장된 게시물이 남아 있어(예: idx 786) 렌더 시점에 보정한다. DB 는 건드리지 않는다.
 *
 * 링크 텍스트가 href 와 같을 때만 바꾼다 — 사용자가 의도적으로 만든
 * `<a href="…">여기를 클릭</a>` 같은 링크는 그대로 둔다.
 */
export function embedBareYoutubeLinks(html: string): string {
    if (!html) return html;

    return html.replace(
        /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        (whole, href: string, inner: string) => {
            const text = inner.replace(/<[^>]*>/g, "").trim();
            // 링크 텍스트가 URL 그 자체일 때만 (자동 링크로 판단)
            if (text !== href.trim()) return whole;

            const id = extractYoutubeId(href);
            if (!id) return whole;

            return `<iframe src="${youtubeEmbedSrc(id)}" ${IFRAME_ATTRS}></iframe>`;
        },
    );
}
