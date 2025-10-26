"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import InputError from "@/components/console/common/InputError";
import Checkbox from "@/components/console/form/Checkbox";
import Input from "@/components/console/form/Input";
import LevelSelect from "@/components/console/form/LevelSelect";
import Radio from "@/components/console/form/Radio";
import { useToast } from "@/hooks/use-toast";
import { useDelMember, useGetMember, usePostMember, usePutMember } from "@/service/console/member";
import { usePopupStore } from "@/store/common/usePopupStore";
import { makeIntComma } from "@/utils/numberUtils";

const schema = z.object({
    log_cnt: z.number(),
    board_cnt: z.number(),
    comment_cnt: z.number(),
    reg_date: z.string(),
    m_name: z.string().min(1, "이름을 입력해주세요."),
    m_level: z.number(),
    m_email: z.string().email("이메일을 입력해주세요."),
    m_mobile: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, "휴대폰번호를 입력해주세요."),
    m_sms_yn: z.enum(["Y", "N"]),
    m_mail_yn: z.enum(["Y", "N"]),
    m_memo: z.string(),
    m_menu_auth: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

const initialValues: FormValues = {
    log_cnt: 0,
    board_cnt: 0,
    comment_cnt: 0,
    reg_date: "",
    m_name: "",
    m_level: 9,
    m_email: "",
    m_mobile: "",
    m_sms_yn: "N",
    m_mail_yn: "N",
    m_memo: "",
    m_menu_auth: [],
};

interface MemberFormProps {
    detailIdx: string;
    onComplete: () => void;
    handleCancel: () => void;
    refetch: boolean;
    onRefetched: () => void;
    onDeleteComplete: () => void;
}

export default function MemberForm({
    detailIdx,
    onComplete,
    handleCancel,
    refetch,
    onRefetched,
    onDeleteComplete,
}: MemberFormProps) {
    const {
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
    const {
        data: configData,
        isLoading: isInitialLoading,
        refetch: refetchMember,
        error: getMemberError,
    } = useGetMember(detailIdx, {
        enabled: Boolean(detailIdx),
    });
    const postMemberMutation = usePostMember();
    const putMemberMutation = usePutMember();
    const delMemberMutation = useDelMember();
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const { toast } = useToast();

    // 데이터 로딩 또는 저장,수정 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = putMemberMutation.isPending;
        setLoadingPop(isLoading, true);
        return () => setLoadingPop(false);
    }, [putMemberMutation.isPending, setLoadingPop]);

    // 상세 조회
    useEffect(() => {
        if (detailIdx) {
            if (configData) {
                const menuAuth =
                    configData.data.m_menu_auth !== null
                        ? configData.data.m_menu_auth.map((item: string[]) => item[0])
                        : [];
                reset({
                    log_cnt: configData.data.log_cnt,
                    board_cnt: configData.data.board_cnt,
                    comment_cnt: configData.data.comment_cnt,
                    reg_date: configData.data.reg_date,
                    m_name: configData.data.m_name,
                    m_level: configData.data.m_level || initialValues.m_level,
                    m_email: configData.data.m_email,
                    m_mobile: configData.data.m_mobile,
                    m_sms_yn: configData.data.m_sms_yn[0],
                    m_mail_yn: configData.data.m_mail_yn[0],
                    m_memo: configData.data.m_memo || initialValues.m_memo,
                    m_menu_auth: menuAuth,
                });
            }
        } else {
            reset(initialValues);
        }
    }, [configData, detailIdx]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 처리
    useEffect(() => {
        if (getMemberError) {
            notFound();
        }
    }, [getMemberError]);

    useEffect(() => {
        if (refetch) {
            refetchMember();
            onRefetched();
        }
    }, [refetch]); // eslint-disable-line react-hooks/exhaustive-deps

    // 관리자권한 체크시
    const handleChangeMenuAuth = (checked: boolean, authCode: string, currentValue: string[]) => {
        if (checked) {
            if (!currentValue.includes(authCode)) {
                setValue("m_menu_auth", [...currentValue, authCode]);
            }
        } else {
            setValue(
                "m_menu_auth",
                currentValue.filter(item => item !== authCode),
            );
        }
    };

    // 저장 확인
    const handleConfirmSave = (data: FormValues) => {
        setConfirmPop(true, "저장하시겠습니까?", 2, () => onSubmit(data));
    };

    // 저장하기
    const onSubmit = (data: FormValues) => {
        const { log_cnt, board_cnt, comment_cnt, reg_date, m_menu_auth, ...baseBody } = data;
        void log_cnt;
        void board_cnt;
        void comment_cnt;
        void reg_date; // eslint 무시

        const body = {
            ...baseBody,
            m_menu_auth: m_menu_auth.length > 0 ? m_menu_auth.join(",") : null,
        };

        if (detailIdx) {
            putMemberMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "수정되었습니다.",
                    });
                    onComplete();
                },
            });
        } else {
            postMemberMutation.mutate(body, {
                onSuccess: () => {
                    toast({
                        title: "등록되었습니다.",
                    });
                    onComplete();
                },
            });
        }
    };

    // 회원탈퇴 확인
    const handleConfirmDelete = () => {
        setConfirmPop(
            true,
            `회원을 탈퇴 처리하시겠습니까? <br /><br />탈퇴한 회원은 복구가 되지 않으며, <br />ㅇㅇ일간 등록한 이메일 정보로 재가입이 불가합니다. <br />또한 탈퇴 회원 목록에서 ㅇㅇ일간 등록한 이메일 정보가 기록됩니다.`,
            2,
            () => handleDelete(),
        );
    };

    // 회원 탈퇴하기
    const handleDelete = () => {
        const body = { idx: [detailIdx] };
        delMemberMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "탈퇴 처리되었습니다.",
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
                                <p className="text-[20px] font-[700]">회원 관리</p>
                                {detailIdx && (
                                    <button
                                        type="button"
                                        className="h-[34px] rounded-[8px] bg-[#FEE2E2] px-[16px] font-[500] text-[#E5313D]"
                                        onClick={handleConfirmDelete}
                                    >
                                        탈퇴
                                    </button>
                                )}
                            </div>
                            <ul className="flex flex-wrap gap-[20px] border-t border-[#D9D9D9] p-[20px_40px]">
                                {detailIdx && (
                                    <li className="w-full">
                                        <ul className="flex flex-1 gap-[20px]">
                                            <li className="flex w-1/4 flex-col gap-[4px]">
                                                <p className="text-[14px] text-[#9F9FA5]">로그인수</p>
                                                <p>{makeIntComma(values.log_cnt)}</p>
                                            </li>
                                            <li className="flex w-1/4 flex-col gap-[4px]">
                                                <p className="text-[14px] text-[#9F9FA5]">게시글</p>
                                                <p>{makeIntComma(values.board_cnt)}</p>
                                            </li>
                                            <li className="flex w-1/4 flex-col gap-[4px]">
                                                <p className="text-[14px] text-[#9F9FA5]">댓글</p>
                                                <p>{makeIntComma(values.comment_cnt)}</p>
                                            </li>
                                            <li className="flex w-1/4 flex-col gap-[4px]">
                                                <p className="text-[14px] text-[#9F9FA5]">가입일자</p>
                                                <p>{values.reg_date}</p>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="m_name" className="text-[#666]">
                                        이름
                                    </label>
                                    <div>
                                        <Controller
                                            name="m_name"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="m_name"
                                                    className="w-full"
                                                    placeholder="이름을 입력해주세요."
                                                />
                                            )}
                                        />
                                        <InputError message={errors.m_name?.message} />
                                    </div>
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="text-[#666]">회원등급</p>
                                    <Controller
                                        name="m_level"
                                        control={control}
                                        render={({ field }) => (
                                            <LevelSelect
                                                value={Number(field.value)}
                                                onChange={val => field.onChange(Number(val))}
                                            />
                                        )}
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="text-[#666]">이메일</p>
                                    {detailIdx && (
                                        <div className="flex h-[48px] items-center justify-start">
                                            <p>{values.m_email}</p>
                                        </div>
                                    )}
                                    {!detailIdx && (
                                        <div>
                                            <Controller
                                                name="m_email"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        id="m_email"
                                                        className="w-full"
                                                        placeholder="이메일을 입력해주세요."
                                                    />
                                                )}
                                            />
                                            <InputError message={errors.m_email?.message} />
                                        </div>
                                    )}
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <label htmlFor="m_mobile" className="text-[#666]">
                                        휴대폰번호
                                    </label>
                                    <div>
                                        <Controller
                                            name="m_mobile"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="m_mobile"
                                                    className="w-full"
                                                    placeholder="숫자만 입력해주세요."
                                                    formattedInput
                                                />
                                            )}
                                        />
                                        <InputError message={errors.m_mobile?.message} />
                                    </div>
                                </li>
                                {values.m_level === 9 && ( // 관리자 회원일때만 노출
                                    <li className="flex w-full flex-col gap-[8px]">
                                        <p className="text-[#666]">관리자 권한</p>
                                        <Controller
                                            name="m_menu_auth"
                                            control={control}
                                            render={({ field }) => (
                                                <ul className="flex flex-wrap">
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("1")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "1",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="게시판 관리"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("2")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "2",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="메뉴 관리"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("3")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "3",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="회원 관리"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("4")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "4",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="디자인 관리"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("5")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "5",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="환경설정"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("6")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "6",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="통계 관리"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                    <li className="w-1/4 py-[12px]">
                                                        <Checkbox
                                                            checked={field.value.includes("7")}
                                                            onChange={e => {
                                                                const currentValue = field.value || [];
                                                                handleChangeMenuAuth(
                                                                    e.currentTarget.checked,
                                                                    "7",
                                                                    currentValue,
                                                                );
                                                            }}
                                                            txt="유지보수 게시판"
                                                            className="justify-start"
                                                        />
                                                    </li>
                                                </ul>
                                            )}
                                        />
                                    </li>
                                )}
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="text-[#666]">문자수신</p>
                                    <Controller
                                        name="m_sms_yn"
                                        control={control}
                                        render={({ field }) => (
                                            <ul className="flex justify-between py-[14px]">
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="Y"
                                                        checked={field.value === "Y"}
                                                        txt="수신"
                                                    />
                                                </li>
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="N"
                                                        checked={field.value === "N"}
                                                        txt="거부"
                                                    />
                                                </li>
                                            </ul>
                                        )}
                                    />
                                </li>
                                <li className="flex w-[calc(50%-10px)] flex-col gap-[8px]">
                                    <p className="text-[#666]">메일수신</p>
                                    <Controller
                                        name="m_mail_yn"
                                        control={control}
                                        render={({ field }) => (
                                            <ul className="flex justify-between py-[14px]">
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="Y"
                                                        checked={field.value === "Y"}
                                                        txt="수신"
                                                    />
                                                </li>
                                                <li className="flex-1">
                                                    <Radio
                                                        {...field}
                                                        value="N"
                                                        checked={field.value === "N"}
                                                        txt="거부"
                                                    />
                                                </li>
                                            </ul>
                                        )}
                                    />
                                </li>
                                <li className="flex w-full flex-col gap-[8px]">
                                    <label htmlFor="m_memo" className="text-[#666]">
                                        메모
                                    </label>
                                    <div>
                                        <Controller
                                            name="m_memo"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="m_memo"
                                                    className="w-full"
                                                    placeholder="메모를 입력해주세요."
                                                />
                                            )}
                                        />
                                        <InputError message={errors.m_memo?.message} />
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
