"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputError from "@/components/console/common/InputError";
import LanguageTabs from "@/components/console/common/LanguageTabs";
import Input from "@/components/console/form/Input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageParams } from "@/constants/console/listParams";
import { useUrlParams } from "@/hooks/common/useUrlParams";
import { useLangTypes } from "@/hooks/console/useLangTypes";
import { useToast } from "@/hooks/use-toast";
import { useGetSiteInfo, usePutSiteInfo } from "@/service/console/setting/site";
import { usePopupStore } from "@/store/common/usePopupStore";
import { useAuthStore } from "@/store/console/useAuthStore";

const schema = z.object({
    c_site_name: z.string().min(1, "사이트 이름을 입력해주세요."),
    c_ceo: z.string(),
    c_tel: z.string(),
    c_num: z.string(),
    c_num2: z.string(),
    c_email: z.string().email("이메일 형식이 올바르지 않습니다."),
    c_address: z.string(),
    c_fax: z.string(),
    c_manager: z.string(),
    c_b_title: z.string().min(1, "브라우저 타이틀을 입력해주세요."),
    c_meta: z.string(),
    c_meta_tag: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function SiteInfo() {
    const { loginUser } = useAuthStore();
    const { langTypes, initialLang } = useLangTypes();
    const { urlParams, updateUrlParams } = useUrlParams<LanguageParams>({
        lang: { defaultValue: initialLang, type: "string", validValues: langTypes },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const { data: configData, isLoading: isInitialLoading } = useGetSiteInfo(loginUser.siteId, urlParams.lang, {
        enabled: !!loginUser.siteId && !!urlParams.lang,
    });
    const putSiteInfoMutation = usePutSiteInfo();
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const { toast } = useToast();

    // 데이터 조회,수정 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = isInitialLoading || putSiteInfoMutation.isPending;
        setLoadingPop(isLoading, true);
        return () => setLoadingPop(false);
    }, [isInitialLoading, putSiteInfoMutation.isPending, setLoadingPop]);

    // 사이트 정보 조회
    useEffect(() => {
        if (configData) {
            reset({
                c_site_name: configData.data.c_site_name || "",
                c_ceo: configData.data.c_ceo || "",
                c_tel: configData.data.c_tel || "",
                c_num: configData.data.c_num || "",
                c_num2: configData.data.c_num2 || "",
                c_email: configData.data.c_email || "",
                c_address: configData.data.c_address || "",
                c_fax: configData.data.c_fax || "",
                c_manager: configData.data.c_manager || "",
                c_b_title: configData.data.c_b_title || "",
                c_meta: configData.data.c_meta || "",
                c_meta_tag: configData.data.c_meta_tag || "",
            });
        }
    }, [configData, reset]);

    // 언어탭 변경 시
    const handleChangeLangTab = (lang: string) => {
        updateUrlParams({ lang: lang });
    };

    // 저장 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "저장하시겠습니까?", 2, () => onSubmit(data));
    };

    // 저장하기
    const onSubmit = (data: FormValues) => {
        const { ...formData } = data;
        const body = {
            ...formData,
            site_id: loginUser.siteId,
            c_lang: urlParams.lang,
            site_lang: langTypes,
        };

        putSiteInfoMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "저장되었습니다.",
                });
            },
        });
    };

    return (
        <div className="flex h-[calc(100vh-90px)] flex-col pr-[20px]">
            <LanguageTabs activeLang={urlParams.lang} handleLanguageChange={handleChangeLangTab} />
            <div className="min-h-0 flex-1">
                <ScrollArea className="h-full pr-[7px]">
                    <form onSubmit={handleSubmit(handleConfirmSave)}>
                        <div className="rounded-[12px] bg-white">
                            <div className="p-[16px_20px] text-[20px] font-[700]">기본정보</div>
                            <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                                <li className="flex w-full flex-col gap-[8px]">
                                    <label htmlFor="c_site_name" className="text-[#666]">
                                        사이트 이름<span className="pl-[5px] font-[700] text-console-2">*</span>
                                    </label>
                                    <div>
                                        <Input
                                            {...register("c_site_name")}
                                            id="c_site_name"
                                            className="w-full"
                                            placeholder="사이트 이름을 입력해주세요."
                                        />
                                        <InputError message={errors.c_site_name?.message} />
                                    </div>
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_ceo" className="text-[#666]">
                                        대표자
                                    </label>
                                    <Input
                                        {...register("c_ceo")}
                                        id="c_ceo"
                                        className="w-full"
                                        placeholder="대표자를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_tel" className="text-[#666]">
                                        대표전화
                                    </label>
                                    <Input
                                        {...register("c_tel")}
                                        id="c_tel"
                                        className="w-full"
                                        placeholder="대표전화를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_num" className="text-[#666]">
                                        사업자번호
                                    </label>
                                    <Input
                                        {...register("c_num")}
                                        id="c_num"
                                        className="w-full"
                                        placeholder="사업자번호를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_num2" className="text-[#666]">
                                        통신판매번호
                                    </label>
                                    <Input
                                        {...register("c_num2")}
                                        id="c_num2"
                                        className="w-full"
                                        placeholder="통신판매번호를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_email" className="text-[#666]">
                                        이메일
                                    </label>
                                    <div>
                                        <Input
                                            {...register("c_email")}
                                            id="c_email"
                                            placeholder="이메일을 입력해주세요."
                                        />
                                        <InputError message={errors.c_email?.message} />
                                    </div>
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_address" className="text-[#666]">
                                        주소
                                    </label>
                                    <Input
                                        {...register("c_address")}
                                        id="c_address"
                                        className="w-full"
                                        placeholder="주소를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_fax" className="text-[#666]">
                                        FAX 번호
                                    </label>
                                    <Input
                                        {...register("c_fax")}
                                        id="c_fax"
                                        className="w-full"
                                        placeholder="FAX 번호를 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_manager" className="text-[#666]">
                                        개인정보관리책임자
                                    </label>
                                    <Input
                                        {...register("c_manager")}
                                        id="c_manager"
                                        className="w-full"
                                        placeholder="개인정보관리책임자를 입력해주세요."
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="mt-[20px] rounded-[12px] bg-white">
                            <div className="p-[16px_20px] text-[20px] font-[700]">메타정보</div>
                            <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_b_title" className="text-[#666]">
                                        브라우저 타이틀<span className="pl-[5px] font-[700] text-console-2">*</span>
                                    </label>
                                    <div>
                                        <Input
                                            {...register("c_b_title")}
                                            id="c_b_title"
                                            className="w-full"
                                            placeholder="브라우저 타이틀을 입력해주세요."
                                        />
                                        <InputError message={errors.c_b_title?.message} />
                                    </div>
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_meta" className="text-[#666]">
                                        메타설명
                                    </label>
                                    <Input
                                        {...register("c_meta")}
                                        id="c_meta"
                                        className="w-full"
                                        placeholder="메타설명을 입력해주세요."
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="c_meta_tag" className="text-[#666]">
                                        메타태그
                                    </label>
                                    <Input
                                        {...register("c_meta_tag")}
                                        id="c_meta_tag"
                                        className="w-full"
                                        placeholder="메타설명을 입력해주세요."
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end py-[20px]">
                            <button
                                type="submit"
                                className="h-[52px] w-[160px] rounded-[12px] bg-console-2 text-[18px] font-[700] text-white"
                            >
                                저장
                            </button>
                        </div>
                    </form>
                </ScrollArea>
            </div>
        </div>
    );
}
