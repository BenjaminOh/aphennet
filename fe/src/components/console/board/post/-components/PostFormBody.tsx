import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import InputError from "@/components/console/common/InputError";
import TooltipBox from "@/components/console/common/TooltipBox";
import Checkbox from "@/components/console/form/Checkbox";
import EditorWithHtml from "@/components/console/form/EditorWithHtml";
import FileUpload, { FileData } from "@/components/console/form/FileUpload";
import Input from "@/components/console/form/Input";
import SelectBox, { SelectItem } from "@/components/console/form/SelectBox";
import { FormValues } from "@/hooks/console/usePostForm";
import { BoardSetting } from "@/store/common/useBoardStore";

interface PostFormBodyProps {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    values: Partial<FormValues>;
    boardSettingData: BoardSetting;
    boardGroupList: SelectItem[];
    files: FileData[];
    setFiles: (files: FileData[]) => void;
    setFilesData: (files: File[]) => void;
    imgFiles: FileData[];
    setImgFiles: (files: FileData[]) => void;
    setImgFilesData: (files: File[]) => void;
    handleConfirmDeleteFile: (idx: number, file_idx: number | string, img?: boolean) => void;
    reply?: boolean; // 답글달기 인지 여부
}

export default function PostFormBody({
    register,
    control,
    errors,
    setValue,
    values,
    boardSettingData,
    boardGroupList,
    files,
    setFiles,
    setFilesData,
    imgFiles,
    setImgFiles,
    setImgFilesData,
    handleConfirmDeleteFile,
    reply = false,
}: PostFormBodyProps) {
    return (
        <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
            {!reply && (
                <li className="flex w-full flex-col gap-[8px]">
                    <p className="text-[#666]">공지 설정</p>
                    <div className="flex h-[48px] items-center justify-start">
                        <Controller
                            name="b_notice"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value === "1"}
                                    txt="체크 시 목록 최상단 노출"
                                    onChange={e => {
                                        const check = e.currentTarget.checked;
                                        setValue("b_notice", check ? "1" : "0");
                                    }}
                                />
                            )}
                        />
                    </div>
                </li>
            )}
            <li className="flex w-full flex-col gap-[8px]">
                <label htmlFor="b_title" className="text-[#666]">
                    제목<span className="pl-[5px] font-[700] text-console-2">*</span>
                </label>
                <div>
                    <Input
                        {...register("b_title")}
                        id="b_title"
                        className="w-full"
                        placeholder="제목을 입력해주세요."
                    />
                    <InputError message={errors.b_title?.message} />
                </div>
            </li>
            {/* 게시판 분류 사용시에만 노출 */}
            {boardSettingData.b_group === "Y" && (
                <li className="flex w-full flex-col gap-[8px]">
                    <p className="text-[#666]">
                        유형<span className="pl-[5px] font-[700] text-console-2">*</span>
                    </p>
                    <div>
                        <SelectBox
                            list={boardGroupList}
                            value={values.group_id}
                            onChange={value => setValue("group_id", value)}
                            triggerClassName="w-full"
                        />
                        <InputError message={errors.group_id?.message} />
                    </div>
                </li>
            )}
            {/* 갤러리 게시판일때만 노출 */}
            {boardSettingData.c_content_type === 5 && (
                <li className="flex w-full flex-col gap-[8px]">
                    <p className="text-[#666]">미리보기 등록</p>
                    <div className="flex-1">
                        <FileUpload
                            uploadFiles={imgFiles}
                            setFiles={setImgFiles}
                            setFilesData={setImgFilesData}
                            handleDelt={(idx, file_idx) => handleConfirmDeleteFile(idx, file_idx, true)}
                            showPreview
                        />
                        <InputError message={errors.preview_img?.message} />
                    </div>
                </li>
            )}
            <li className="w-full">
                <EditorWithHtml value={values.b_contents || ""} onChange={cont => setValue("b_contents", cont)} />
                <InputError message={errors.b_contents?.message} />
            </li>
            <li className="flex w-full flex-col gap-[8px]">
                <div className="flex items-center gap-[8px]">
                    <p className="text-[#666]">파일 첨부</p>
                    <TooltipBox
                        text={`&middot; 최대 10개의 파일만 첨부 가능합니다.<br/> &middot; 개별 파일 크기: 5MB 이하<br/> &middot; 총 용량: 50MB 이하`}
                    />
                </div>
                <FileUpload
                    uploadFiles={files}
                    setFiles={setFiles}
                    setFilesData={setFilesData}
                    boxClassName="flex-1"
                    maxLength={10}
                    handleDelt={(idx, file_idx) => handleConfirmDeleteFile(idx, file_idx)}
                />
            </li>
            <li className="flex w-full flex-col gap-[8px]">
                <label htmlFor="m_pwd" className="text-[#666]">
                    비밀번호
                </label>
                <div className="flex items-start gap-[8px]">
                    <div className="pt-[16px]">
                        <Controller
                            name="b_secret"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value === "Y"}
                                    txt="비밀글 설정"
                                    className="justify-start"
                                    onChange={e => {
                                        const check = e.currentTarget.checked;
                                        setValue("b_secret", check ? "Y" : "");
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            {...register("m_pwd")}
                            id="m_pwd"
                            className="w-full"
                            placeholder="비밀번호를 설정해주세요."
                        />
                        <InputError message={errors.m_pwd?.message} />
                    </div>
                </div>
            </li>
        </ul>
    );
}
