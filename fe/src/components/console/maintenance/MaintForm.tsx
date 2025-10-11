"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import InputError from "@/components/console/common/InputError";
import TooltipBox from "@/components/console/common/TooltipBox";
import Editor from "@/components/console/form/Editor";
import FileUpload, { FileData } from "@/components/console/form/FileUpload";
import Input from "@/components/console/form/Input";
import { useToast } from "@/hooks/use-toast";
import { usePostMaint } from "@/service/console/maintenance";
import { usePopupStore } from "@/store/common/usePopupStore";

const schema = z.object({
    subject: z.string().min(1, "제목을 입력해주세요."),
    name: z.string().min(1, "담당자를 입력해주세요."),
    tel: z.string().min(1, "연락처를 입력해주세요."),
    email: z.string().min(1, "이메일을 입력해주세요.").email("이메일 형식이 올바르지 않습니다."),
    url: z.string().min(1, "도메인을 입력해주세요."),
    content: z.string().min(1, "내용을 입력해주세요."),
    file: z.enum(["Y", "N"]).optional(),
});

type FormValues = z.infer<typeof schema>;

interface MaintFormProps {
    maintName: string;
    siteId: string;
    handleCancel: () => void;
    onComplete: () => void;
}

export default function MaintForm({ maintName, siteId, handleCancel, onComplete }: MaintFormProps) {
    const initialValues = useMemo<FormValues>(
        () => ({
            subject: "",
            name: "",
            tel: "",
            email: "",
            url: "",
            content: "",
            file: "N",
        }),
        [],
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });
    const values = useWatch({ control });
    const [files, setFiles] = useState<FileData[]>([]);
    const [filesData, setFilesData] = useState<File[]>([]);
    const postMaintMutation = usePostMaint();
    const { setConfirmPop } = usePopupStore();
    const { toast } = useToast();

    // 등록 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "등록하시겠습니까?", 2, () => onSubmit(data));
    };

    // 등록하기
    const onSubmit = (data: FormValues) => {
        const { name, tel, email, url, content, file, ...formData } = data;
        const contents =
            "<p>## 빠른 처리를 위해 아래 고객님 정보를 입력해주시길 바랍니다. ##</p><br/><p>- (필수)담당자 : " +
            name +
            "</p><p>- (필수)담당자연락처(직통) : " +
            tel +
            "</p><p>- 담당자이메일 : " +
            email +
            "</p><p>- (필수)도메인 : " +
            url +
            "</p><p>- 보수내용 : " +
            content +
            "</p>";
        const body = {
            ...formData,
            category: maintName,
            name: maintName,
            password: "",
            contents,
            company: siteId,
            email,
            b_file: filesData.length > 0 ? filesData : [],
        };
        void file;

        postMaintMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "등록되었습니다.",
                });
                onComplete();
            },
        });
    };

    return (
        <div className="p-[0_20px_20px_7px]">
            <div className="rounded-[12px] bg-white">
                <form onSubmit={handleSubmit(handleConfirmSave)}>
                    <div className="p-[16px_20px]">
                        <p className="text-[20px] font-[700]">유지보수 등록</p>
                    </div>
                    <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                        <li className="flex w-full flex-col gap-[8px]">
                            <label htmlFor="subject" className="text-[#666]">
                                제목<span className="pl-[5px] font-[700] text-console-2">*</span>
                            </label>
                            <div>
                                <Input
                                    {...register("subject")}
                                    id="subject"
                                    className="w-full"
                                    placeholder="제목을 입력해주세요."
                                />
                                <InputError message={errors.subject?.message} />
                            </div>
                        </li>
                        <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                            <label htmlFor="name" className="text-[#666]">
                                담당자<span className="pl-[5px] font-[700] text-console-2">*</span>
                            </label>
                            <div>
                                <Input
                                    {...register("name")}
                                    id="name"
                                    className="w-full"
                                    placeholder="담당자를 입력해주세요."
                                />
                                <InputError message={errors.name?.message} />
                            </div>
                        </li>
                        <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                            <label htmlFor="tel" className="text-[#666]">
                                담당자연락처 (직통)<span className="pl-[5px] font-[700] text-console-2">*</span>
                            </label>
                            <div>
                                <Input
                                    {...register("tel")}
                                    id="tel"
                                    className="w-full"
                                    placeholder="담당자 연락처를 입력해주세요."
                                />
                                <InputError message={errors.tel?.message} />
                            </div>
                        </li>
                        <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                            <label htmlFor="email" className="text-[#666]">
                                담당자 이메일<span className="pl-[5px] font-[700] text-console-2">*</span>
                            </label>
                            <div>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    className="w-full"
                                    placeholder="담당자 이메일을 입력해주세요."
                                />
                                <InputError message={errors.email?.message} />
                            </div>
                        </li>
                        <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                            <label htmlFor="url" className="text-[#666]">
                                도메인<span className="pl-[5px] font-[700] text-console-2">*</span>
                            </label>
                            <div>
                                <Input
                                    {...register("url")}
                                    id="url"
                                    className="w-full"
                                    placeholder="도메인을 입력해주세요."
                                />
                                <InputError message={errors.url?.message} />
                            </div>
                        </li>
                        <li className="w-full">
                            <Editor value={values.content || ""} onChange={cont => setValue("content", cont)} />
                            <InputError message={errors.content?.message} />
                        </li>
                        <li className="flex w-full flex-col gap-[8px]">
                            <div className="flex items-center gap-[8px]">
                                <p className="text-[#666]">파일 첨부</p>
                                <TooltipBox
                                    text={`&middot; 1개의 파일만 첨부 가능합니다.<br/> &middot; 총 용량: 50MB 이하<br/> &middot; 여러개 파일 등록시에는 압축하여 등록해주세요.`}
                                />
                            </div>
                            <FileUpload
                                uploadFiles={files}
                                setFiles={setFiles}
                                setFilesData={setFilesData}
                                handleDelt={() => {
                                    setFiles([]);
                                    setFilesData([]);
                                }}
                            />
                        </li>
                    </ul>
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
