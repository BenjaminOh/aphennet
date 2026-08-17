import dynamic from "next/dynamic";

import Tabs from "@/components/console/common/Tabs";
import { normalizeQuillAlignment } from "@/lib/quillCompat";

import Editor from "./Editor";
import Textarea from "./Textarea";

// Lexical 은 번들이 크므로 실제로 렌더하는 라우트에서만 로드되게 코드 분할한다.
// (정적 import 로 두면 engine="quill" 을 쓰는 라우트의 First Load JS 까지 늘어난다)
const LexicalEditor = dynamic(() => import("@/components/blocks/editor-x/editor").then(m => m.Editor), {
    ssr: false,
});

interface EditorWithHtmlProps {
    type: "editor" | "html";
    editorValue: string;
    htmlValue: string;
    onChangeEditorValue: (content: string) => void;
    onChangeHtmlValue: (content: string) => void;
    onTypeChange: (type: "editor" | "html") => void;
    placeholder?: string;
    textareaClassName?: string;
    editorClassName?: string;
    /**
     * 위지윅 엔진 선택.
     * - `"quill"`(기본): 기존 react-quill-new. 배너 등 기존 화면이 계속 사용한다.
     * - `"lexical"`: basic_solution 에서 이관한 Lexical. YouTube 링크 임베드를 지원한다.
     *
     * 2026-08-17 게시판만 먼저 Lexical 로 전환했다. 다른 화면을 옮길 때
     * 이 prop 만 바꾸면 되고, 회귀 범위도 화면 단위로 좁혀진다.
     */
    engine?: "quill" | "lexical";
}

export default function EditorWithHtml2({
    type,
    editorValue,
    htmlValue,
    onChangeEditorValue,
    onChangeHtmlValue,
    onTypeChange,
    placeholder,
    textareaClassName,
    editorClassName,
    engine = "quill",
}: EditorWithHtmlProps) {
    return (
        <>
            <Tabs
                list={["CH에디터", "HTML"]}
                activeIdx={type === "html" ? 1 : 0}
                handleClick={idx => onTypeChange(idx === 1 ? "html" : "editor")}
            />
            {type === "html" ? (
                <Textarea
                    value={htmlValue}
                    onChange={e => {
                        onChangeHtmlValue(e.target.value);
                    }}
                    boxClassName={textareaClassName}
                    placeholder={placeholder}
                />
            ) : engine === "lexical" ? (
                // Quill 은 붙여넣은 YouTube URL 을 <a> 로 자동 링크만 해서 임베드가 불가능했다.
                // Lexical 은 HTML in/out 이라 기존 게시물이 그대로 열린다.
                <LexicalEditor
                    // 과거 Quill 게시물의 class="ql-align-*" 를 인라인 text-align 으로 바꿔서 넣는다.
                    // 안 하면 에디터로 열어 재저장하는 순간 정렬이 사라진다.
                    htmlValue={normalizeQuillAlignment(editorValue)}
                    onHtmlChange={onChangeEditorValue}
                    className={editorClassName}
                />
            ) : (
                <Editor
                    value={editorValue}
                    onChange={val => {
                        onChangeEditorValue(val);
                    }}
                    placeholder={placeholder}
                    className={editorClassName}
                />
            )}
        </>
    );
}
