"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import icArrowOut from "@/assets/images/console/icArrowOut.svg";
import NotiPopup from "@/components/console/layout/-components/NotiPopup";
import { useGetSiteInfo } from "@/service/console/common";
import { useSiteStore } from "@/store/common/useSiteStore";
import { useAuthStore } from "@/store/console/useAuthStore";

const LocaMapper: Record<string, string[]> = {
    // 게시판 관리
    "/console/board/": ["게시판 관리", "공지사항"],
    "/console/board/166": ["게시판 관리", "공지사항"],
    "/console/board/167": ["게시판 관리", "자주 묻는 질문"],
    // 디자인 관리
    "/console/design/": ["디자인 관리"],
    "/console/design/popup": ["디자인 관리", "팝업 관리"],
};

export default function Header() {
    const pathname = usePathname();
    const { loginUser } = useAuthStore();
    const { setSiteLanguages } = useSiteStore();
    const { data: configData } = useGetSiteInfo(loginUser.siteId, "KR", { enabled: !!loginUser.siteId });

    // 사이트 언어 설정
    useEffect(() => {
        if (configData) {
            setSiteLanguages(configData.data.c_site_lang);
        }
    }, [configData]); // eslint-disable-line react-hooks/exhaustive-deps

    const locaList =
        Object.keys(LocaMapper)
            .sort((a, b) => b.length - a.length) // 긴 prefix 우선
            .find(key => pathname.startsWith(key)) || "";

    return (
        <header className="flex items-center justify-between p-[20px_20px_20px_0]">
            <ul className="flex items-center gap-[16px]">
                {(LocaMapper[locaList] || []).map((loca, i) => (
                    <li
                        key={`loca_${i}`}
                        className={i === 0 ? "text-[30px] font-[700]" : "text-[20px] font-[500] text-[#666]"}
                    >
                        <p>{loca}</p>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-[8px]">
                <button
                    type="button"
                    onClick={() => window.open("/", "_blank")}
                    className="flex h-[50px] items-center justify-center gap-[10px] rounded-full bg-white px-[12px] text-[18px] font-[500] leading-[34px]"
                >
                    <span>사용자 페이지</span>
                    <Image src={icArrowOut} alt="화살표" />
                </button>
                <NotiPopup />
            </div>
        </header>
    );
}
