"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import InputError from "@/components/console/common/InputError";
import LoadingSpinner from "@/components/console/common/LoadingSpinner";
import EditorWithHtml from "@/components/console/form/EditorWithHtml";
import Input from "@/components/console/form/Input";
import Toggle from "@/components/console/form/Toggle";
import { useToast } from "@/hooks/use-toast";
import { useGetPolicy, usePutPolicy } from "@/service/console/setting/policy";
import { usePopupStore } from "@/store/common/usePopupStore";

const schema = z.object({
    p_use_yn: z.enum(["Y", "N"]),
    p_title: z.string().min(1, "팝업명을 입력해주세요."),
    p_contents: z.string().min(1, "내용을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

interface PolicyFormProps {
    detailIdx: string;
    onComplete: () => void;
    handleCancel: () => void;
    refetch: boolean;
    onRefetched: () => void;
}

export default function PolicyForm({ detailIdx, onComplete, handleCancel, refetch, onRefetched }: PolicyFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const values = useWatch({ control });
    const {
        data: configData,
        isLoading: isInitialLoading,
        refetch: refetchBanner,
        error: getPolicyError,
    } = useGetPolicy(detailIdx, {
        enabled: Boolean(detailIdx),
    });
    const putPolicyMutation = usePutPolicy();
    const { setConfirmPop } = usePopupStore();
    const { toast } = useToast();

    // 상세 조회
    useEffect(() => {
        if (configData) {
            const { p_use_yn, p_title, p_contents } = configData.data;
            reset({
                p_use_yn,
                p_title,
                p_contents,
            });
        }
    }, [configData, reset]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 처리
    useEffect(() => {
        if (getPolicyError) {
            notFound();
        }
    }, [getPolicyError]);

    useEffect(() => {
        if (refetch) {
            refetchBanner();
            onRefetched();
        }
    }, [refetch]); // eslint-disable-line react-hooks/exhaustive-deps

    // 저장 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "저장하시겠습니까?", 2, () => onSubmit(data));
    };

    // 저장하기
    const onSubmit = (data: FormValues) => {
        const { ...formData } = data;
        const body = {
            ...formData,
            idx: Number(detailIdx),
        };
        putPolicyMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "수정되었습니다.",
                });
                onComplete();
            },
        });
    };

    return (
        <>
            {isInitialLoading ? (
                <LoadingSpinner console />
            ) : (
                <div className="p-[0_20px_20px_7px]">
                    <div className="rounded-[12px] bg-white">
                        <form onSubmit={handleSubmit(handleConfirmSave)}>
                            <div className="flex items-center gap-[10px] p-[16px_20px]">
                                <p className="text-[20px] font-[700]">이용정책 관리</p>
                                <Controller
                                    name="p_use_yn"
                                    control={control}
                                    render={({ field }) => (
                                        <Toggle
                                            {...field}
                                            checked={field.value === "Y"}
                                            txt="노출"
                                            className="justify-start"
                                            handleChange={checked => {
                                                setValue("p_use_yn", checked ? "Y" : "N");
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                                <li className="flex w-full flex-col gap-[8px]">
                                    <label htmlFor="p_title" className="text-[#666]">
                                        제목<span className="pl-[5px] font-[700] text-console-2">*</span>
                                    </label>
                                    <div>
                                        <Input
                                            {...register("p_title")}
                                            id="p_title"
                                            className="w-full"
                                            placeholder="제목을 입력해주세요."
                                        />
                                        <InputError message={errors.p_title?.message} />
                                    </div>
                                </li>
                                <li className="w-full">
                                    <EditorWithHtml
                                        value={values.p_contents || ""}
                                        onChange={cont => setValue("p_contents", cont)}
                                        textareaClassName="h-[400px]"
                                        editorClassName="[&>div>.ql-container>.ql-editor]:max-h-[400px]"
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
            )}
        </>
    );
}
