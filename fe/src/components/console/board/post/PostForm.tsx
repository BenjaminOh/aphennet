"use client";

import { useParams } from "next/navigation";

import { usePostForm } from "@/hooks/console/usePostForm";

import PostFormBody from "./-components/PostFormBody";

interface BoardFormProps {
    detailIdx: string;
    onComplete: (edit?: boolean) => void;
    handleCancel: () => void;
    refetch: boolean;
    onRefetched: () => void;
}

export default function PostForm({ detailIdx, onComplete, handleCancel, refetch, onRefetched }: BoardFormProps) {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const postForm = usePostForm(category, detailIdx, detailIdx ? "edit" : "create", onComplete, refetch, onRefetched);

    return (
        <div className="p-[0_20px_20px_7px]">
            <div className="rounded-[12px] bg-white shadow-[0_18px_40px_0_rgba(112,144,176,0.12)]">
                <form onSubmit={postForm.handleSubmit(postForm.handleConfirmSave)}>
                    <div className="flex items-center justify-between p-[16px_20px]">
                        <p className="text-[20px] font-[700]">게시글 관리</p>
                        {/* 게시글 수정일때만 삭제버튼 노출 */}
                        {detailIdx && (
                            <button
                                type="button"
                                className="h-[34px] rounded-[8px] bg-[#FEE2E2] px-[16px] font-[500] text-[#E5313D]"
                            >
                                삭제
                            </button>
                        )}
                    </div>
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
                    />
                    <div className="flex justify-end gap-[10px] border-t border-[#D9D9D9] p-[12px_20px]">
                        <button
                            type="button"
                            onClick={handleCancel}
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
            </div>
        </div>
    );
}
