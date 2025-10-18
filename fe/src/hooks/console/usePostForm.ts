import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import type { FileData } from "@/components/console/form/FileUpload";
import type { SelectItem } from "@/components/console/form/SelectBox";
import { API_URL } from "@/config/apiConfig";
import { useToast } from "@/hooks/use-toast";
import { useDelPostFile, useGetPost, useGetPostGroupList,usePostPostCreate, usePutPost } from "@/service/common";
import { useBoardStore } from "@/store/common/useBoardStore";
import { usePopupStore } from "@/store/common/usePopupStore";
import { useAuthStore } from "@/store/console/useAuthStore";

export const schema = z
    .object({
        b_title: z.string().min(1, "제목을 입력해주세요."),
        b_notice: z.string(),
        b_contents: z.string().min(1, "내용을 입력해주세요."),
        m_pwd: z.string().optional(),
        b_secret: z.string().optional(),
        group_id: z.string().optional(),
        c_content_type: z.number().nullable().optional(),
        b_depth: z.number(),
        parent_id: z.number().nullable(),
        b_group: z.enum(["Y", "N"]),
        b_img_name: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.b_secret === "Y" && !data.m_pwd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "비밀번호를 설정해주세요.",
                path: ["m_pwd"],
            });
        }
        if (data.b_group === "Y" && !data.group_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "유형을 설정해주세요.",
                path: ["group_id"],
            });
        }
    });
export type FormValues = z.infer<typeof schema>;

export type UsePostFormMode = "create" | "edit" | "reply";

export function usePostForm(
    category: string,
    detailIdx: string,
    mode: UsePostFormMode = "create",
    onComplete: (edit?: boolean) => void,
    refetch?: boolean,
    onRefetched?: () => void,
) {
    const { loginUser } = useAuthStore();
    const { boardSettingData } = useBoardStore();
    const initialValues = useMemo<FormValues>(
        () => ({
            b_title: "",
            b_notice: "0",
            b_contents: "",
            m_pwd: "",
            b_secret: "",
            c_content_type: null,
            b_depth: 0,
            parent_id: null,
            b_group: "N",
            b_img_name: "",
        }),
        []
    );
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });
    const { register, handleSubmit, formState: { errors }, control, setValue, reset } = form;
    const values = useWatch({ control });
    const [boardGroupList, setBoardGroupList] = useState<SelectItem[]>([]);
    const [files, setFiles] = useState<FileData[]>([]);
    const [filesData, setFilesData] = useState<File[]>([]);
    const [imgFiles, setImgFiles] = useState<FileData[]>([]);
    const [imgFilesData, setImgFilesData] = useState<File[]>([]);
    const { data: configData, isLoading: isInitialLoading, refetch: refetchPost, error: getPostError } = useGetPost(category || "", detailIdx || "", "T", {
        enabled: !!detailIdx && mode === "edit",
    });
    const postBoardCreateMutation = usePostPostCreate();
    const putBoardMutation = usePutPost();
    const { data: configBoardGroupList } = useGetPostGroupList(category, {
        enabled: boardSettingData.b_group === "Y",
    });
    const delBoardFileMutation = useDelPostFile();
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const { toast } = useToast();

    // 데이터 로딩 또는 저장,수정 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = isInitialLoading || putBoardMutation.isPending || postBoardCreateMutation.isPending;
        setLoadingPop(isLoading);
        return () => setLoadingPop(false);
    }, [isInitialLoading, putBoardMutation.isPending, postBoardCreateMutation.isPending]); // eslint-disable-line react-hooks/exhaustive-deps

    // 게시글 상세 조회
    useEffect(() => {
        if (mode === "reply") {
            reset({
                ...initialValues,
                ...(boardSettingData.c_content_type && { c_content_type: boardSettingData.c_content_type }),
                ...(boardSettingData.b_template === "Y" && { b_contents: boardSettingData.b_template_text }),
                ...(boardSettingData.b_group === "Y" ? { b_group: "Y" } : { b_group: "N" }),
            });
        }
        if (mode === "create") {
            reset({
                ...initialValues,
                ...(boardSettingData.c_content_type && { c_content_type: boardSettingData.c_content_type }),
                ...(boardSettingData.b_template === "Y" && { b_contents: boardSettingData.b_template_text }),
                ...(boardSettingData.b_group === "Y" ? { b_group: "Y" } : { b_group: "N" }),
            });
        }
        if (mode === "edit" && configData) {
            const { b_title, b_notice, b_contents, group_id, b_file, b_img, parent_id, b_secret} = configData.data;
            reset({
                ...initialValues,
                b_title,
                b_notice,
                b_contents,
                parent_id,
                b_secret,
                ...(boardSettingData.b_group === "Y" ? { b_group: "Y" } : { b_group: "N" }),
                ...(group_id && { group_id: group_id.toString() }),
                ...(boardSettingData.c_content_type && { c_content_type: boardSettingData.c_content_type }),
                ...(boardSettingData.c_content_type === 5 && b_img && { b_img_name: b_img}),
            });
            setFiles(b_file);
            if (b_img) {
                setImgFiles([{ idx: uuidv4(), original_name: b_img, url: `${API_URL}/${b_img}` }]);
            }
        }
    }, [configData, boardSettingData, mode]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 처리
    useEffect(() => {
        if (getPostError) {
            notFound();
        }
    }, [getPostError]);

    // 게시글 분류 목록 조회
    useEffect(() => {
        if (configBoardGroupList) {
            const list = configBoardGroupList.data.filter((item: { id: number; g_name: string }) => !!item.id);
            const newList = list.map((item: { id: number; g_name: string }) => ({
                value: item.id.toString(),
                label: item.g_name,
            }));
            setBoardGroupList(newList);
        }
    }, [configBoardGroupList]);

    // boardGroupList가 로드된 후 group_id 재설정 (수정일때만 적용)
    useEffect(() => {
        if (mode === "edit" && configData && boardGroupList.length > 0) {
            const { group_id } = configData.data;
            if (group_id) {
                setValue("group_id", group_id.toString());
            }
        }
    }, [boardGroupList, mode, configData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (refetch) {
            refetchPost();
            onRefetched?.();
        }
    }, [refetch]); // eslint-disable-line react-hooks/exhaustive-deps

    // 첨부파일 삭제
    const handleConfirmDeleteFile = (idx: number, file_idx: number | string, img?: boolean) => {
        if (detailIdx && typeof file_idx === "number") {
            setConfirmPop(true, `파일을 영구 삭제하시겠습니까? <br/>삭제 후에는 복구할 수 없습니다.`, 2, () =>
                handleDeleteFile(idx, file_idx, img)
            );
        } else {
            if (img) {
                const newList = [...imgFiles];
                newList.splice(idx, 1);
                setImgFiles(newList);
                const newFileData = [...imgFilesData];
                newFileData.splice(idx, 1);
                setImgFilesData(newFileData);
            } else {
                const newList = [...files];
                newList.splice(idx, 1);
                setFiles(newList);
                const newFileData = [...filesData];
                newFileData.splice(idx, 1);
                setFilesData(newFileData);
            }
        }
    };

    // 첨부파일 영구삭제
    const handleDeleteFile = (idx: number, file_idx: number, img?: boolean) => {
        const body = { idx: [file_idx] };
        delBoardFileMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "삭제되었습니다.",
                });
                if (img) {
                    const newList = [...imgFiles];
                    newList.splice(idx, 1);
                    setImgFiles(newList);
                } else {
                    const newList = [...files];
                    newList.splice(idx, 1);
                    setFiles(newList);
                }
            },
        });
    };

    // 저장 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "저장하시겠습니까?", 2, () => onSubmit(data));
    };

    // 저장하기
    const onSubmit = (data: FormValues) => {
        if (!category) return;
        const { c_content_type, b_img_name, ...formData} = data;
        const baseBody = {
            ...formData,
            category,
            m_email: loginUser.m_email,
            m_name: loginUser.m_name,
            b_file: filesData.length > 0 ? filesData : [],
            m_pwd: formData.m_pwd || "",
            b_secret: formData.b_secret || "",
            ...(c_content_type === 5 && imgFilesData.length > 0 && { b_img: imgFilesData[0] }),
            ...(boardSettingData.b_group === "Y" && { group_id: formData.group_id }),
        };

        // 게시글 수정
        if (mode === "edit") {
            const body = { ...baseBody, idx: detailIdx, parent_id: baseBody.parent_id?.toString() || "", ...(c_content_type === 5 && { b_img_name: imgFilesData.length > 0 ? "" : imgFiles.length === 0 && imgFilesData.length === 0 ? "" : b_img_name}) };
            putBoardMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "수정되었습니다.",
                    });
                    onComplete?.(true);
                },
            });
        } 
        // 게시글 등록
        else if (mode === "create") {
            const body = {...baseBody, parent_id: ""};
            postBoardCreateMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "등록되었습니다.",
                    });
                    onComplete?.();
                },
            });
        }
        // 답글 등록
        else if (mode === "reply") {
            const body = { ...baseBody, b_depth: 1, parent_id: detailIdx };
            postBoardCreateMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "등록되었습니다.",
                    });
                    onComplete?.();
                },
            });
        }
    };

    return {
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
        handleSubmit,
        handleConfirmSave,
        isInitialLoading,
        mode,
        onRefetched,
    };
} 