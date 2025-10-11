"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import InputError from "@/components/console/common/InputError";
import Tabs from "@/components/console/common/Tabs";
import Checkbox from "@/components/console/form/Checkbox";
import DateRangePicker from "@/components/console/form/DateRangePicker";
import EditorWithHtml from "@/components/console/form/EditorWithHtml";
import FileUpload, { FileData } from "@/components/console/form/FileUpload";
import Input from "@/components/console/form/Input";
import InputBox from "@/components/console/form/InputBox";
import Radio from "@/components/console/form/Radio";
import Toggle from "@/components/console/form/Toggle";
import { API_URL } from "@/config/apiConfig";
import { useToast } from "@/hooks/use-toast";
import { useDelBanner, useGetBanner, usePostBanner, usePutBanner } from "@/service/console/design/banner";
import { usePopupStore } from "@/store/common/usePopupStore";

const schema = z
    .object({
        b_open: z.enum(["Y", "N"]),
        b_title: z.string().min(1, "배너명을 입력해주세요."),
        b_width_size: z.string().min(1, "가로 사이즈를 입력해주세요."),
        b_height_size: z.string().min(1, "세로 사이즈를 입력해주세요."),
        b_size: z.enum(["1", "2"]),
        isDate: z.enum(["Y", "N"]),
        b_s_date: z.date().optional(),
        b_e_date: z.date().optional(),
        b_c_type: z.enum(["1", "2", "3"]),
        b_url: z.string().optional(),
        b_url_target: z.enum(["1", "2"]),
        b_mov_type: z.enum(["1", "2"]),
        b_mov_url: z.string().optional(),
        b_mov_play: z.enum(["Y", "N"]),
        b_content: z.string().optional(),
        file: z.enum(["Y", "N"]).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.isDate === "Y" && (!data.b_s_date || !data.b_e_date)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "기간을 설정해주세요.",
                path: ["b_s_date"],
            });
        }
        if (
            (data.b_c_type === "1" && data.file === "N") ||
            (data.b_c_type === "2" && data.b_mov_type === "1" && data.file === "N")
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "배너파일을 등록해주세요.",
                path: ["file"],
            });
        }
        if (data.b_c_type === "2" && data.b_mov_type === "2" && !data.b_mov_url) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "동영상 URL 등록해주세요.",
                path: ["b_mov_url"],
            });
        }
    });

type FormValues = z.infer<typeof schema>;

interface BannerFormProps {
    type: "P" | "M";
    mode: "create" | "edit";
    detailIdx: string;
    onComplete: () => void;
    handleCancel: () => void;
    refetch: boolean;
    onRefetched: () => void;
    onDeleteComplete: () => void;
}

export default function BannerForm({
    type,
    mode = "create",
    detailIdx,
    onComplete,
    handleCancel,
    refetch,
    onRefetched,
    onDeleteComplete,
}: BannerFormProps) {
    const tabList = ["이미지", "동영상", "HTML"];
    const [tabOn, setTabOn] = useState(0);
    const initialValues = useMemo<FormValues>(
        () => ({
            b_open: "Y",
            b_title: "",
            b_width_size: "",
            b_height_size: "",
            b_size: "1",
            isDate: "N",
            b_s_date: undefined,
            b_e_date: undefined,
            b_c_type: "1",
            b_url: "",
            b_url_target: "1",
            b_mov_type: "1",
            b_mov_url: "",
            b_mov_play: "N",
            b_content: "",
            file: "N",
        }),
        [],
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });
    const values = useWatch({ control });
    const [files, setFiles] = useState<FileData[]>([]);
    const [filesData, setFilesData] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<FileData[]>([]);
    const [videoFilesData, setVideoFilesData] = useState<File[]>([]);
    const {
        data: configData,
        isLoading: isInitialLoading,
        refetch: refetchBanner,
        error: getBannerError,
    } = useGetBanner(detailIdx, {
        enabled: Boolean(detailIdx) && mode === "edit",
    });
    const postBannerMutation = usePostBanner();
    const putBannerMutation = usePutBanner();
    const delBannerMutation = useDelBanner();
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const { toast } = useToast();

    // 데이터 로딩 또는 저장,수정 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = postBannerMutation.isPending || putBannerMutation.isPending;
        setLoadingPop(isLoading, true);
        return () => setLoadingPop(false);
    }, [postBannerMutation.isPending, putBannerMutation.isPending, setLoadingPop]);

    // 배너 상세 조회
    useEffect(() => {
        // 배너 등록 시 초기화
        if (mode === "create") {
            reset(initialValues);
            setFiles([]);
            setFilesData([]);
            setVideoFiles([]);
            setVideoFilesData([]);
            return;
        }
        if (mode === "edit") {
            if (configData) {
                const {
                    b_open,
                    b_title,
                    b_width_size,
                    b_height_size,
                    b_size,
                    b_s_date,
                    b_e_date,
                    b_c_type,
                    b_file,
                    b_url,
                    b_url_target,
                    b_mov_type,
                    b_mov_url,
                    b_mov_play,
                    b_content,
                } = configData.data;
                reset({
                    b_open: b_open[0],
                    b_title,
                    b_width_size: b_width_size.toLocaleString(),
                    b_height_size: b_height_size.toLocaleString(),
                    b_size: b_size[0],
                    isDate: b_s_date || b_e_date ? "Y" : "N",
                    b_s_date: b_s_date && b_s_date !== "" ? new Date(b_s_date) : undefined,
                    b_e_date: b_e_date && b_e_date !== "" ? new Date(b_e_date) : undefined,
                    b_c_type: b_c_type[0],
                    b_url: b_url ?? "",
                    b_url_target: b_url_target[0],
                    b_mov_type: b_mov_type[0],
                    b_mov_url: b_mov_url ?? "",
                    b_mov_play: b_mov_play === "Y" ? "Y" : "N",
                    b_content: b_content ?? "",
                });
                if (b_file) {
                    if (b_c_type[0] === "1") {
                        setFiles([{ idx: uuidv4(), original_name: b_file, url: `${API_URL}/${b_file}` }]);
                    }
                    if (b_c_type[0] === "2") {
                        setVideoFiles([{ idx: uuidv4(), original_name: b_file, url: `${API_URL}/${b_file}` }]);
                    }
                } else {
                    setFiles([]);
                    setVideoFiles([]);
                }
            }
        }
    }, [configData, reset, mode]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 처리
    useEffect(() => {
        if (getBannerError) {
            notFound();
        }
    }, [getBannerError]);

    useEffect(() => {
        if (refetch) {
            refetchBanner();
            onRefetched();
        }
    }, [refetch]); // eslint-disable-line react-hooks/exhaustive-deps

    // 배너종류 변경
    const handleChangeTab = (idx: number) => {
        const index = idx === 0 ? "1" : idx === 1 ? "2" : "3";
        setValue("b_c_type", index);
    };

    // 배너종류 변경 시 탭 변경
    useEffect(() => {
        if (values.b_c_type === "1") {
            setTabOn(0);
            if (files.length === 0) {
                setValue("file", "N");
            } else {
                setValue("file", "Y");
            }
        } else if (values.b_c_type === "2") {
            setTabOn(1);
            if (videoFiles.length === 0) {
                setValue("file", "N");
            } else {
                setValue("file", "Y");
            }
        } else if (values.b_c_type === "3") {
            setTabOn(2);
        }
    }, [values.b_c_type]); // eslint-disable-line react-hooks/exhaustive-deps

    // 수정일때 배너종류 변경 시 중복값 초기화
    useEffect(() => {
        if (mode === "edit" && configData?.data?.b_c_type) {
            const currentType = Number(configData.data.b_c_type[0]);
            if (tabOn + 1 !== currentType) {
                setValue("b_url", "");
                setValue("b_url_target", "1");
            } else {
                setValue("b_url", configData.data.b_url ?? "");
                setValue("b_url_target", configData.data.b_url_target?.[0] ?? "1");
            }
        }
    }, [tabOn, mode, configData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (files.length > 0 || videoFiles.length > 0) {
            setValue("file", "Y");
        } else {
            setValue("file", "N");
        }
    }, [files, videoFiles, setValue]);

    // 저장 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "저장하시겠습니까?", 2, () => onSubmit(data));
    };

    // 저장하기
    const onSubmit = (data: FormValues) => {
        const { b_width_size, b_height_size, isDate, b_s_date, b_e_date, file, b_c_type, b_mov_play, ...formData } =
            data;
        const baseBody = {
            ...formData,
            b_type: type,
            b_width_size: Number(b_width_size.replace(/,/g, "")),
            b_height_size: Number(b_height_size.replace(/,/g, "")),
            b_s_date: isDate === "Y" && b_s_date ? format(b_s_date, "yyyy.MM.dd") : "",
            b_e_date: isDate === "Y" && b_e_date ? format(b_e_date, "yyyy.MM.dd") : "",
            b_c_type,
            b_file:
                b_c_type === "1"
                    ? filesData.length > 0
                        ? filesData
                        : []
                    : b_c_type === "2"
                    ? videoFilesData.length > 0
                        ? videoFilesData
                        : []
                    : [],
            b_mov_play: b_mov_play === "Y" ? "Y" : "",
        };
        void isDate;
        void file;

        // 배너 수정
        if (mode === "edit") {
            const body = { ...baseBody, idx: Number(detailIdx) };
            putBannerMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "수정되었습니다.",
                    });
                    onComplete();
                },
            });
        }
        // 배너 등록
        else {
            postBannerMutation.mutate(baseBody, {
                onSuccess: () => {
                    toast({
                        title: "등록되었습니다.",
                    });
                    onComplete();
                },
            });
        }
    };

    // 삭제 확인
    const handleConfirmDelete = () => {
        setConfirmPop(true, "배너를 삭제하시겠습니까?", 2, () => handleDelete());
    };

    // 삭제하기
    const handleDelete = () => {
        const body = { idx: [detailIdx] };
        delBannerMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "삭제되었습니다.",
                });
                onDeleteComplete();
            },
        });
    };

    return (
        <>
            {!isInitialLoading && (
                <div className="p-[0_20px_20px_7px]">
                    <div className="rounded-[12px] bg-white">
                        <form onSubmit={handleSubmit(handleConfirmSave)}>
                            <div className="flex items-center justify-between p-[16px_20px]">
                                <div className="flex items-center gap-[10px]">
                                    <p className="text-[20px] font-[700]">배너 관리</p>
                                    <Controller
                                        name="b_open"
                                        control={control}
                                        render={({ field }) => (
                                            <Toggle
                                                {...field}
                                                checked={field.value === "Y"}
                                                txt="노출"
                                                className="justify-start"
                                                handleChange={checked => {
                                                    setValue("b_open", checked ? "Y" : "N");
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="h-[34px] rounded-[8px] bg-[#FEE2E2] px-[16px] font-[500] text-[#E5313D]"
                                    onClick={handleConfirmDelete}
                                >
                                    삭제
                                </button>
                            </div>
                            <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                                <li className="flex w-full flex-col gap-[8px]">
                                    <label htmlFor="b_title" className="text-[#666]">
                                        배너명<span className="pl-[5px] font-[700] text-console-2">*</span>
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
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="b_width_size" className="text-[#666]">
                                            노출 사이즈<span className="pl-[5px] font-[700] text-console-2">*</span>
                                        </label>
                                        <p className="text-[14px] text-console-2">권장사이즈 : 1920*520</p>
                                    </div>
                                    <div>
                                        <ul className="flex gap-[4px]">
                                            <li className="flex-1">
                                                <InputBox
                                                    {...register("b_width_size")}
                                                    id="b_width_size"
                                                    className="pl-[40px] text-right"
                                                    numberInput
                                                    thousandSeparator
                                                    value={values.b_width_size}
                                                >
                                                    <p className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#9F9FA5]">
                                                        가로
                                                    </p>
                                                </InputBox>
                                            </li>
                                            <li className="flex-1">
                                                <InputBox
                                                    {...register("b_height_size")}
                                                    className="pl-[40px] text-right"
                                                    numberInput
                                                    thousandSeparator
                                                    value={values.b_height_size}
                                                >
                                                    <p className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#9F9FA5]">
                                                        세로
                                                    </p>
                                                </InputBox>
                                            </li>
                                        </ul>
                                        <InputError
                                            message={errors.b_width_size?.message || errors.b_height_size?.message}
                                        />
                                    </div>
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="h-[22px]" />
                                    <Controller
                                        name="b_size"
                                        control={control}
                                        render={({ field }) => (
                                            <ul className="flex justify-between py-[14px]">
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="1"
                                                        checked={field.value === "1"}
                                                        txt="커버"
                                                    />
                                                </li>
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="2"
                                                        checked={field.value === "2"}
                                                        txt="원본 사이즈 고정"
                                                    />
                                                </li>
                                            </ul>
                                        )}
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="text-[#666]">
                                        노출기간 설정<span className="pl-[5px] font-[700] text-console-2">*</span>
                                    </p>
                                    <Controller
                                        name="isDate"
                                        control={control}
                                        render={({ field }) => (
                                            <ul className="flex justify-between py-[14px]">
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="N"
                                                        checked={field.value === "N"}
                                                        txt="상시노출"
                                                    />
                                                </li>
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="Y"
                                                        checked={field.value === "Y"}
                                                        txt="기간노출"
                                                    />
                                                </li>
                                            </ul>
                                        )}
                                    />
                                </li>
                                {values.isDate === "Y" && (
                                    <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                        <p className="h-[22px]" />
                                        <div>
                                            <DateRangePicker
                                                startDate={values.b_s_date ?? null}
                                                endDate={values.b_e_date ?? null}
                                                setStartDate={date => date && setValue("b_s_date", date)}
                                                setEndDate={date => date && setValue("b_e_date", date)}
                                            />
                                            <InputError message={errors.b_s_date?.message} />
                                        </div>
                                    </li>
                                )}
                                <li className="w-full" />
                                <li className="flex w-full flex-col gap-[8px]">
                                    <p className="text-[#666]">배너종류</p>
                                    <Tabs list={tabList} activeIdx={tabOn} handleClick={handleChangeTab} />
                                    <div className="overflow-hidden rounded-[8px] border border-[#D9D9D9]">
                                        <div className="bg-[#F2F3F8] p-[16px_20px] text-[20px] font-[700]">
                                            {tabList[tabOn]}
                                        </div>
                                        <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px]">
                                            {tabOn === 1 && (
                                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                                    <p className="text-[#666]">
                                                        동영상 업로드
                                                        <span className="pl-[5px] font-[700] text-console-2">*</span>
                                                    </p>
                                                    <Controller
                                                        name="b_mov_type"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <ul className="flex justify-between py-[14px]">
                                                                <li className="flex-1">
                                                                    <Radio
                                                                        {...field}
                                                                        value="1"
                                                                        checked={field.value === "1"}
                                                                        txt="직접 업로드"
                                                                    />
                                                                </li>
                                                                <li className="flex-1">
                                                                    <Radio
                                                                        {...field}
                                                                        value="2"
                                                                        checked={field.value === "2"}
                                                                        txt="URL 입력"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        )}
                                                    />
                                                </li>
                                            )}
                                            {tabOn === 0 && (
                                                <li className="flex w-full flex-col gap-[8px]">
                                                    <p className="text-[#666]">
                                                        배너 파일
                                                        <span className="pl-[5px] font-[700] text-console-2">*</span>
                                                    </p>
                                                    <div>
                                                        <FileUpload
                                                            uploadFiles={files}
                                                            setFiles={setFiles}
                                                            setFilesData={setFilesData}
                                                            handleDelt={() => {
                                                                setFiles([]);
                                                                setFilesData([]);
                                                            }}
                                                            showPreview
                                                            accept="image/*"
                                                        />
                                                        <InputError message={errors.file?.message} />
                                                    </div>
                                                </li>
                                            )}
                                            {tabOn === 1 && values.b_mov_type === "1" && (
                                                <li className="flex w-full flex-col gap-[8px]">
                                                    <p className="text-[#666]">
                                                        배너 파일
                                                        <span className="pl-[5px] font-[700] text-console-2">*</span>
                                                    </p>
                                                    <div>
                                                        <FileUpload
                                                            uploadFiles={videoFiles}
                                                            setFiles={setVideoFiles}
                                                            setFilesData={setVideoFilesData}
                                                            handleDelt={() => {
                                                                setVideoFiles([]);
                                                                setVideoFilesData([]);
                                                            }}
                                                            showPreview
                                                            accept="video/*"
                                                            video
                                                        />
                                                        <InputError message={errors.file?.message} />
                                                    </div>
                                                </li>
                                            )}
                                            {tabOn === 1 && values.b_mov_type === "2" && (
                                                <li className="flex w-full flex-col gap-[8px]">
                                                    <p className="text-[#666]">
                                                        동영상 URL
                                                        <span className="pl-[5px] font-[700] text-console-2">*</span>
                                                    </p>
                                                    <div>
                                                        <Input
                                                            {...register("b_mov_url")}
                                                            placeholder="URL을 입력해주세요."
                                                        />
                                                        <InputError message={errors.b_mov_url?.message} />
                                                    </div>
                                                </li>
                                            )}
                                            {tabOn < 2 && (
                                                <>
                                                    <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                                        <label htmlFor="b_url" className="text-[#666]">
                                                            배너링크
                                                        </label>
                                                        <Input
                                                            {...register("b_url")}
                                                            id="b_url"
                                                            className="w-full"
                                                            placeholder="배너링크를 입력해주세요."
                                                        />
                                                    </li>
                                                    <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                                        <p className="text-[#666]">링크 열림창</p>
                                                        <Controller
                                                            name="b_url_target"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <ul className="flex justify-between py-[14px]">
                                                                    <li className="flex-1">
                                                                        <Radio
                                                                            {...field}
                                                                            value="1"
                                                                            checked={field.value === "1"}
                                                                            txt="부모창"
                                                                        />
                                                                    </li>
                                                                    <li className="flex-1">
                                                                        <Radio
                                                                            {...field}
                                                                            value="2"
                                                                            checked={field.value === "2"}
                                                                            txt="새창"
                                                                        />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        />
                                                    </li>
                                                </>
                                            )}
                                            {tabOn === 1 && (
                                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                                    <p className="text-[#666]">자동 재생</p>
                                                    <Controller
                                                        name="b_mov_play"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                {...field}
                                                                checked={field.value === "Y"}
                                                                txt="체크시 동영상 배너 자동재생"
                                                                className="justify-start"
                                                                onChange={e => {
                                                                    const check = e.currentTarget.checked;
                                                                    setValue("b_mov_play", check ? "Y" : "N");
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </li>
                                            )}
                                            {tabOn === 2 && (
                                                <li className="w-full">
                                                    <EditorWithHtml
                                                        value={values.b_content || ""}
                                                        onChange={cont => setValue("b_content", cont)}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                    </div>
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
