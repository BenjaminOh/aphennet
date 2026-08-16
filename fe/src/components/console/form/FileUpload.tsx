import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

import icCloseBlue from "@/assets/images/console/icCloseBlue.svg";
import icCloseWhite from "@/assets/images/console/icCloseWhite.svg";
import icFileUpload from "@/assets/images/console/icFileUpload.svg";
import { usePopupStore } from "@/store/common/usePopupStore";

export type FileData = { idx: string | number; original_name: string; url: string };

// 서버(be/src/middleware/multer.js)의 allowedExtensions 와 동일하게 유지할 것
export const ALLOWED_EXTENSIONS = [
    "hwp",
    "hwpx",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "zip",
    "txt",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "mpg",
    "mpeg",
    "avi",
    "wmv",
    "mp4",
];

// 서버 .env 의 FILESIZE(MB) 와 동일하게 유지할 것
export const MAX_FILE_SIZE_MB = 30;

interface FileUploadProps {
    uploadFiles: FileData[];
    setFiles: (file: FileData[]) => void;
    setFilesData: React.Dispatch<React.SetStateAction<File[]>>;
    boxClassName?: string;
    className?: string;
    showPreview?: boolean;
    accept?: string;
    handleDelt?: (idx: number, file_idx: number | string) => void;
    maxLength?: number;
    video?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    uploadFiles = [],
    setFiles,
    setFilesData,
    boxClassName,
    className,
    showPreview = false,
    accept,
    handleDelt,
    maxLength = 1,
    video = false,
}) => {
    const { setConfirmPop } = usePopupStore();
    const { getRootProps, getInputProps } = useDropzone({
        accept: accept ? { [accept]: [] } : undefined,
        multiple: true,
        onDrop: acceptedFiles => {
            const files = acceptedFiles.length + uploadFiles.length;

            if (acceptedFiles.length === 0) {
                return;
            } else if (files > maxLength) {
                setConfirmPop(true, `최대 ${maxLength}개까지 첨부 가능합니다.`, 1);
                return;
            }

            // 서버 왕복 전에 확장자·용량을 먼저 걸러낸다
            const invalidExt = acceptedFiles.find(
                file => !ALLOWED_EXTENSIONS.includes(file.name.split(".").pop()?.toLowerCase() ?? ""),
            );
            if (invalidExt) {
                setConfirmPop(true, `허용되지 않는 파일 형식입니다. (${invalidExt.name})`, 1);
                return;
            }

            const oversized = acceptedFiles.find(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
            if (oversized) {
                setConfirmPop(true, `파일 크기가 너무 큽니다. 최대 ${MAX_FILE_SIZE_MB}MB (${oversized.name})`, 1);
                return;
            }

            const newFiles = acceptedFiles.map(file => ({
                idx: uuidv4(), // 고유한 ID
                original_name: file.name,
                url: URL.createObjectURL(file),
            }));

            // 파일 리스트를 업데이트
            setFiles([...uploadFiles, ...newFiles]);

            // 실제 파일 데이터도 누적한다.
            // (기존에는 덮어써서 두 번 나눠 첨부하면 앞서 고른 파일이 전송되지 않았다)
            setFilesData(prev => [...prev, ...acceptedFiles]);
        },
    });

    // 파일 삭제
    const handleDeltFile = (idx: number, file_idx: number | string) => {
        if (maxLength > 1 && handleDelt) {
            handleDelt(idx, file_idx);
        } else if (maxLength === 1) {
            setFiles([]);
            setFilesData([]);
        }
    };

    return (
        <div className={boxClassName}>
            {uploadFiles.length < maxLength && (
                <div {...getRootProps({ className: "dropzone" })}>
                    <div
                        className={twMerge(
                            `bg-white border-2 border-dashed border-[#D9D9D9] rounded-[12px]`,
                            className,
                        )}
                    >
                        <input {...getInputProps({ className: "hidden" })} />
                        <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-[8px] p-[20px] text-[14px] text-[#666]">
                            <Image src={icFileUpload} alt="파일첨부" />
                            <p>파일을 마우스로 끌어오세요.</p>
                        </label>
                    </div>
                </div>
            )}
            {uploadFiles.length > 0 && (
                <ul
                    className={`flex flex-col gap-[4px]${
                        !showPreview ? " rounded-[8px] border-2 border-dashed border-[#D9D9D9] bg-white py-[8px]" : ""
                    }${maxLength > 1 ? " mt-[8px]" : ""}`}
                >
                    {uploadFiles.map((file, i) => (
                        <li key={`file_${i}`}>
                            {showPreview && (
                                <div className="relative flex h-[200px] w-full justify-center overflow-hidden rounded-[8px] border border-[#D9D9D9]">
                                    {video ? (
                                        <video src={file.url} className="max-h-full max-w-full" controls />
                                    ) : (
                                        <img src={file.url} alt="미리보기이미지" className="max-h-full max-w-full" />
                                    )}
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 flex h-[40px] w-[40px] items-center justify-center bg-[rgba(0,0,0,0.6)]"
                                        onClick={() => {
                                            handleDeltFile(i, file.idx);
                                        }}
                                    >
                                        <Image src={icCloseWhite} alt="삭제" />
                                    </button>
                                </div>
                            )}
                            {!showPreview && (
                                <div className="flex items-center justify-between px-[8px]">
                                    <p className="w-[calc(100%-30px)] truncate text-[#1A2448]">{file.original_name}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleDeltFile(i, file.idx);
                                        }}
                                    >
                                        <Image src={icCloseBlue} alt="삭제" />
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileUpload;
