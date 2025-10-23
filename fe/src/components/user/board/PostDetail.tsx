"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import arrowNext from "@/assets/images/user/arrowNext.svg";
import arrowPrev from "@/assets/images/user/arrowPrev.svg";
import arrowUpRight from "@/assets/images/user/arrowUpRight.svg";
import { FileData } from "@/components/user/form/FileUpload";
import { useGetPost, useGetPostFileDownload } from "@/service/user/board";
import { usePopupStore } from "@/store/user/usePopupStore";

import QuillContent from "../../common/common/QuillContent";

interface InfoItem {
    b_title: string;
    b_reg_date: string;
    b_contents: string;
    b_content_type: string;
    b_file: FileData[];
    b_img: string | null;
    g_name: string | null;
    prev_board: { idx: string; b_title: string } | null;
    next_board: { idx: string; b_title: string } | null;
}

export default function PostDetail({ category, detailIdx }: { category: string; detailIdx: string }) {
    const [downloadFile, setDownloadFile] = useState<{ idx: string; name: string } | null>(null);
    const { data: configData, isLoading: isInitialLoading } = useGetPost(category || "", detailIdx || "", "T", {
        enabled: Boolean(detailIdx),
    });
    const { data: downloadData, isLoading: isFileDownloadLoading } = useGetPostFileDownload(
        category || "",
        detailIdx || "",
        downloadFile?.idx || "",
    );
    const initialInfo = useMemo<InfoItem>(
        () => ({
            b_title: "",
            b_reg_date: "",
            b_contents: "",
            b_content_type: "editor",
            b_file: [],
            b_img: null,
            g_name: null,
            prev_board: null,
            next_board: null,
        }),
        [],
    );
    const [info, setInfo] = useState<InfoItem>(initialInfo);
    const { setLoadingPop } = usePopupStore();

    // 데이터 수정,삭제 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = isInitialLoading || isFileDownloadLoading;
        setLoadingPop(isLoading);
        return () => setLoadingPop(false);
    }, [isInitialLoading, isFileDownloadLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    // 상세 조회
    useEffect(() => {
        if (configData) {
            setInfo(configData.data);
        } else {
            setInfo(initialInfo);
        }
    }, [configData, initialInfo]);

    // 파일다운로드 데이터가 있을 때 실행
    useEffect(() => {
        if (downloadData && downloadFile) {
            const url = window.URL.createObjectURL(new Blob([downloadData.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", downloadFile.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setDownloadFile(null); // 다운로드 완료 후 초기화
        }
    }, [downloadData, downloadFile]);

    // 첨부파일 다운로드 버튼 클릭시
    const handleFileDownload = (idx: string, file_name: string) => {
        if (!category || !detailIdx) return;
        setDownloadFile({ idx, name: file_name });
    };

    return (
        <>
            <div className="flex flex-col gap-[8px] border-b-2 border-[#060606] pb-[24px] text-center md:items-center">
                <p className="text-[18px] font-[500] md:text-[24px] xl:text-[36px]">{info.b_title}</p>
                <p className="text-[14px] text-[#666] md:text-[16px]">{info.b_reg_date}</p>
                {/* <div className="flex gap-[4px]">
                    {loginUser.m_level === 9 && ( // 관리자만 수정 가능
                        <Link
                            href={`/${category}/${detailIdx}/edit`}
                            className="h-[34px] rounded-[8px] bg-[#F6F7FA] px-[18px] text-[16px] font-[500] leading-[33px] text-[#666]"
                        >
                            수정
                        </Link>
                    )}
                    {boardSettingData.b_reply === "Y" && (
                        <Link
                            href={`/${category}/${detailIdx}/reply`}
                            className="h-[34px] rounded-[8px] bg-[#F6F7FA] px-[18px] text-[16px] font-[500] leading-[33px] text-[#666]"
                        >
                            답글
                        </Link>
                    )}
                    {loginUser.m_level === 9 && ( // 관리자만 삭제 가능
                        <button
                            type="button"
                            className="h-[34px] rounded-[8px] bg-[#FEE2E2] px-[18px] text-[16px] font-[500] text-[#E5313D]"
                        >
                            삭제
                        </button>
                    )}
                </div> */}
            </div>
            <div className="min-h-[300px] border-b border-[#D9D9D9] py-[24px]">
                <div className="flex justify-center pb-[20px]"></div>
                {info.b_content_type === "editor" && <QuillContent content={info.b_contents} />}
                {info.b_content_type === "html" && <div dangerouslySetInnerHTML={{ __html: info.b_contents }} />}
            </div>
            {info.b_file.length > 0 && (
                <div className="flex border-b border-[#D9D9D9] p-[16px_20px]">
                    <p className="w-[120px] font-[500]">첨부파일</p>
                    <ul className="flex flex-1 flex-col gap-[5px]">
                        {info.b_file.map((file, i) => (
                            <li key={`file_${i}`}>
                                <button
                                    type="button"
                                    className="text-left text-[14px] text-[#999]"
                                    onClick={() => handleFileDownload(file.idx.toString(), file.original_name)}
                                >
                                    {file.original_name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="relative mt-[40px] md:mt-[40px] md:flex md:flex-col md:gap-[40px]">
                <div className="hidden justify-between md:flex">
                    {info.prev_board ? (
                        <Link href={`/${category}/${info.prev_board.idx}`} className="flex w-1/3 gap-[32px]">
                            <Image src={arrowPrev} alt="이전글" width={22} height={58} />
                            <div className="flex w-[70%] flex-col gap-[8px] text-[18px]">
                                <p>이전글</p>
                                <p className="truncate text-[#666]">{info.prev_board.b_title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {info.next_board ? (
                        <Link
                            href={`/${category}/${info.next_board.idx}`}
                            className="flex w-1/3 justify-end gap-[32px]"
                        >
                            <div className="flex w-[70%] flex-col gap-[8px] text-[18px]">
                                <p>다음글</p>
                                <p className="truncate text-[#666]">{info.next_board.b_title}</p>
                            </div>
                            <Image src={arrowNext} alt="다음글" width={22} height={58} />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
                <Link
                    href={`/${category}`}
                    className="xl: flex h-[60px] w-full items-center justify-between rounded-[8px] border border-[#D9D9D9] px-[24px] text-[18px] xl:absolute xl:left-1/2 xl:top-1/2 xl:w-[200px] xl:-translate-x-1/2 xl:-translate-y-1/2"
                >
                    목록으로
                    <Image src={arrowUpRight} alt="목록으로" width={20} height={21} />
                </Link>
            </div>
        </>
    );
}
