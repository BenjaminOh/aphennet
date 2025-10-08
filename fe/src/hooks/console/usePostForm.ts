import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import type { FileData } from "@/components/console/form/FileUpload";
import type { SelectItem } from "@/components/console/form/SelectBox";
import { API_URL } from "@/config/apiConfig";
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
        preview_img: z.enum(["Y", "N"]).optional(),
        b_depth: z.number(),
        parent_id: z.number().nullable(),
    })
    .superRefine((data, ctx) => {
        if (data.b_secret === "Y" && !data.m_pwd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "비밀번호를 설정해주세요.",
                path: ["m_pwd"],
            });
        }
        if (data.c_content_type === 5 && data.preview_img === "N") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "미리보기 이미지를 등록해주세요.",
                path: ["preview_img"],
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
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const initialValues = useMemo<FormValues>(
        () => ({
            b_title: "",
            b_notice: "0",
            b_contents: "",
            m_pwd: "",
            b_secret: "",
            c_content_type: null,
            preview_img: "N",
            b_depth: 0,
            parent_id: null,
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
    const { data: configData, isLoading: isInitialLoading, refetch: refetchPost } = useGetPost(category || "", detailIdx || "", "T", {
        enabled: !!detailIdx && mode === "edit",
    });
    const postBoardCreateMutation = usePostPostCreate();
    const putBoardMutation = usePutPost();
    const { data: configBoardGroupList } = useGetPostGroupList(category, {
        enabled: boardSettingData.b_group === "Y",
    });
    const delBoardFileMutation = useDelPostFile();

    // 데이터 로딩 또는 저장,수정 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = isInitialLoading || putBoardMutation.isPending || postBoardCreateMutation.isPending;
        setLoadingPop(isLoading, true);
        return () => setLoadingPop(false);
    }, [isInitialLoading, putBoardMutation.isPending, postBoardCreateMutation.isPending, setLoadingPop]);

    // 게시글 상세 조회
    useEffect(() => {
        if (mode === "reply") {
            // 답글 모드에서는 reset 하지 않음 (빈 폼)
            return;
        }
        if (mode === "create") {
            reset(initialValues);
        }
        if (configData) {
            const { b_title, b_notice, b_contents, group_id, b_file, b_img, parent_id} = configData.data;
            reset({
                ...initialValues,
                b_title,
                b_notice,
                b_contents,
                parent_id,
                ...(group_id && { group_id: group_id.toString() }),
                ...(boardSettingData.c_content_type && { c_content_type: boardSettingData.c_content_type }),
            });
            setFiles(b_file);
            if (b_img) {
                setImgFiles([{ idx: uuidv4(), original_name: b_img, url: `${API_URL}/${b_img}` }]);
            }
        }
    }, [configData, reset, initialValues, boardSettingData.c_content_type, mode]);

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

    // 미리보기 이미지 설정
    useEffect(() => {
        if (imgFiles.length > 0) {
            setValue("preview_img", "Y");
        } else {
            setValue("preview_img", "N");
        }
    }, [imgFiles, setValue]);

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
                setValue("preview_img", undefined);
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
                setConfirmPop(true, "삭제되었습니다.", 1);
                if (img) {
                    const newList = [...imgFiles];
                    newList.splice(idx, 1);
                    setImgFiles(newList);
                    setValue("preview_img", undefined);
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
        const baseBody = {
            ...data,
            category,
            m_email: loginUser.m_email,
            m_name: loginUser.m_name,
            b_file: filesData.length > 0 ? filesData : [],
            m_pwd: data.m_pwd || "",
            b_secret: data.b_secret || "",
            ...(data.c_content_type === 5 && imgFilesData.length > 0 && { b_img: imgFilesData[0] }),
            ...(boardSettingData.b_group === "Y" && { group_id: data.group_id }),
        };
        delete baseBody.c_content_type;
        delete baseBody.preview_img;

        // 게시글 수정
        if (mode === "edit") {
            const body = { ...baseBody, idx: detailIdx, parent_id: baseBody.parent_id?.toString() || ""};
            putBoardMutation.mutate(body, {
                onSuccess: () => {
                    setConfirmPop(true, "수정되었습니다.", 1);
                    onComplete?.(true);
                },
            });
        } 
        // 게시글 등록
        else if (mode === "create") {
            const body = {...baseBody, parent_id: ""};
            postBoardCreateMutation.mutate(body, {
                onSuccess: () => {
                    setConfirmPop(true, "등록되었습니다.", 1);
                    onComplete?.();
                },
            });
        }
        // 답글 등록
        else if (mode === "reply") {
            const body = { ...baseBody, b_depth: 1, parent_id: detailIdx };
            postBoardCreateMutation.mutate(body, {
                onSuccess: () => {
                    setConfirmPop(true, "등록되었습니다.", 1);
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