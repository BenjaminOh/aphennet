"use client";

import { useEffect, useRef } from "react";

interface QuillContentProps {
    content: string;
}

export default function QuillContent({ content }: QuillContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !content) return;

        // Shadow DOM 생성
        const shadowRoot = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });

        // Quill CSS 로드
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css");

        // 커스텀 스타일 (padding 제거)
        const styleElem = document.createElement("style");
        styleElem.textContent = `
            .ql-editor {
                padding: 0 !important;
            }
            .ql-editor img {
                max-width: 100%;
            }
        `;

        // 콘텐츠 컨테이너
        const contentDiv = document.createElement("div");
        contentDiv.className = "ql-editor";
        contentDiv.innerHTML = content;

        // Shadow DOM에 추가
        shadowRoot.innerHTML = "";
        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(styleElem);
        shadowRoot.appendChild(contentDiv);
    }, [content]);

    return <div ref={containerRef} />;
}
