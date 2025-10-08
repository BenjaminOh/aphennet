"use client";

import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
}

export default function Editor({ value, onChange, placeholder, className }: EditorProps) {
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["clean"],
            ],
        },
    };

    return (
        <div id="editor" className={className}>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={modules}
                className="[&>.ql-container>.ql-editor]:max-h-[200px] [&>.ql-container>.ql-editor]:min-h-[200px] [&>.ql-container]:rounded-b-[5px] [&>.ql-container]:!border-[#D9D9D9] [&>.ql-container]:bg-white [&>.ql-toolbar]:rounded-t-[5px] [&>.ql-toolbar]:!border-[#D9D9D9] [&>.ql-toolbar]:bg-white"
                theme="snow"
                bounds="#editor"
                placeholder={placeholder}
            />
        </div>
    );
}
