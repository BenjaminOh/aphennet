"use client";

import { useEffect, useMemo, useRef } from "react";

import { embedBareYoutubeLinks } from "@/lib/youtube";

import { POST_CONTENT_CSS } from "./postContentStyles";

interface PostContentProps {
    /** i_board.b_content_type — "editor" | "html" */
    contentType?: string | null;
    content: string;
    className?: string;
}

/**
 * 게시물 본문 렌더 공통 컴포넌트.
 *
 * 기존에는 사용자단·관리자단 상세 페이지가 각각 아래 2분기를 중복 구현했다:
 *   {type === "editor" && <QuillContent content={...} />}
 *   {type === "html"   && <div dangerouslySetInnerHTML={...} />}
 * 크기 규칙을 한쪽만 고치면 절반이 안 고쳐지므로 한 컴포넌트로 합쳤다.
 *
 * - `editor` 타입: Shadow DOM 에 렌더한다. 과거 Quill 로 작성된 게시물이 있어
 *   quill.snow.css 를 계속 로드하고, 여기에 POST_CONTENT_CSS 를 함께 주입한다.
 *   (Shadow DOM 은 globals.css·Tailwind 가 닿지 않는다)
 * - `html` 타입: 라이트 DOM. 같은 CSS 를 <style> 로 주입한다.
 */
export default function PostContent({ contentType, content, className }: PostContentProps) {
    const shadowHostRef = useRef<HTMLDivElement>(null);
    const isEditorType = contentType !== "html";

    // 과거 Quill 에디터는 붙여넣은 YouTube URL 을 임베드하지 못하고 <a> 로 자동 링크만 했다.
    // 그렇게 저장된 게시물(예: idx 786)을 렌더 시점에 플레이어로 보정한다. DB 는 그대로 둔다.
    const html = useMemo(() => embedBareYoutubeLinks(content), [content]);

    useEffect(() => {
        if (!isEditorType) return;
        const host = shadowHostRef.current;
        if (!host || !html) return;

        const shadowRoot = host.shadowRoot || host.attachShadow({ mode: "open" });

        // 과거 Quill 게시물용 기본 타이포그래피
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css");

        const styleElem = document.createElement("style");
        styleElem.textContent = `
            .ql-editor {
                padding: 0 !important;
            }
            ${POST_CONTENT_CSS}
        `;

        const contentDiv = document.createElement("div");
        // .ql-editor: 기존 Quill 게시물 서식 / .post-content: 공통 크기 규칙
        contentDiv.className = "ql-editor post-content";
        contentDiv.innerHTML = html;

        shadowRoot.innerHTML = "";
        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(styleElem);
        shadowRoot.appendChild(contentDiv);
    }, [html, isEditorType]);

    if (isEditorType) {
        return <div ref={shadowHostRef} className={className} />;
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: POST_CONTENT_CSS }} />
            <div className={`post-content ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: html }} />
        </>
    );
}
