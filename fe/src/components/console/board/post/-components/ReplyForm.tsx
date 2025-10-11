"use client";

import ConsoleDialogContent from "@/components/console/common/ConsoleDialogContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePostForm } from "@/hooks/console/usePostForm";

import PostFormBody from "./PostFormBody";

interface ReplyFormProps {
    category: string;
    detailIdx: string;
    handleClose: () => void;
    onComplete: () => void;
    mode: "create" | "edit" | "reply";
}

export default function ReplyForm({ category, detailIdx, handleClose, onComplete, mode }: ReplyFormProps) {
    const postForm = usePostForm(category, detailIdx, mode, onComplete);

    return (
        <ConsoleDialogContent title="답글 등록" className="max-w-[640px]">
            <form onSubmit={postForm.handleSubmit(postForm.handleConfirmSave)}>
                <ScrollArea className="max-h-[75vh] min-h-[300px] border-b border-[#D9D9D9]">
                    <PostFormBody
                        register={postForm.register}
                        control={postForm.control}
                        errors={postForm.errors}
                        setValue={postForm.setValue}
                        values={postForm.values}
                        boardSettingData={postForm.boardSettingData}
                        boardGroupList={postForm.boardGroupList}
                        files={postForm.files}
                        setFiles={postForm.setFiles}
                        setFilesData={postForm.setFilesData}
                        imgFiles={postForm.imgFiles}
                        setImgFiles={postForm.setImgFiles}
                        setImgFilesData={postForm.setImgFilesData}
                        handleConfirmDeleteFile={postForm.handleConfirmDeleteFile}
                        reply={true}
                    />
                </ScrollArea>
                <div className="flex justify-end gap-[10px] border-t border-[#D9D9D9] p-[12px_20px]">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="h-[52px] w-[160px] rounded-[12px] bg-[#F6F7FA] text-[18px] font-[700] text-[#666]"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="h-[52px] w-[160px] rounded-[12px] bg-console-2 text-[18px] font-[700] text-white"
                    >
                        저장
                    </button>
                </div>
            </form>
        </ConsoleDialogContent>
    );
}
