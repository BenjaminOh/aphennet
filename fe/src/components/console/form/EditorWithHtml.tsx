"use client";

import { useEffect, useState } from "react";

import Tabs from "@/components/console/common/Tabs";

import Editor from "./Editor";
import Textarea from "./Textarea";

interface EditorWithHtmlProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    textareaClassName?: string;
    editorClassName?: string;
}

export default function EditorWithHtml({
    value,
    onChange,
    placeholder,
    textareaClassName,
    editorClassName,
}: EditorWithHtmlProps) {
    const [isHtmlMode, setIsHtmlMode] = useState(false);
    const [editorValue, setEditorValue] = useState(value || "");
    const [htmlValue, setHtmlValue] = useState(value || "");

    useEffect(() => {
        setEditorValue(value);
        setHtmlValue(value);
    }, [value]);

    const handleToggle = () => {
        if (isHtmlMode) {
            // HTML → 에디터로 전환
            setEditorValue(htmlValue);
            onChange(htmlValue);
        } else {
            // 에디터 → HTML로 전환
            setHtmlValue(editorValue);
            onChange(editorValue);
        }
        setIsHtmlMode(!isHtmlMode);
    };

    return (
        <>
            <Tabs list={["CH에디터", "HTML"]} activeIdx={isHtmlMode ? 1 : 0} handleClick={handleToggle} />
            {isHtmlMode ? (
                <Textarea
                    value={htmlValue}
                    onChange={e => {
                        setHtmlValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    boxClassName={textareaClassName}
                    placeholder={placeholder}
                />
            ) : (
                <Editor
                    value={editorValue}
                    onChange={val => {
                        setEditorValue(val);
                        onChange(val);
                    }}
                    placeholder={placeholder}
                    className={editorClassName}
                />
            )}
        </>
    );
}
