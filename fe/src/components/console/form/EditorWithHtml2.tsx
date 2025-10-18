import Tabs from "@/components/console/common/Tabs";

import Editor from "./Editor";
import Textarea from "./Textarea";

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
