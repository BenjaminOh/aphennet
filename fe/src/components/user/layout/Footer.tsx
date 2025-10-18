import Image from "next/image";

import arrowTop from "@/assets/images/user/arrowTop.png";
import { useMenuNavigation } from "@/hooks/user/useMenuNavigation";
import { MenuItem, SiteInfoItem } from "@/store/common/useSiteStore";

interface FooterProps {
    menuList: MenuItem[];
    siteInfo: SiteInfoItem;
}

export default function Footer({ menuList, siteInfo }: FooterProps) {
    const { handleCategoryClick } = useMenuNavigation();

    // 스크롤위치 맨위로 이동
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-[#F2F2F2] p-[20px] md:p-[40px_28px] xl:py-[60px]">
            <div className="mx-auto flex max-w-[1360px] flex-col gap-[16px] md:gap-[40px]">
                <div className="flex items-center justify-between border-b border-[#ddd] py-[20px]">
                    <div className="h-[60px] w-[183px] bg-logoFooter bg-contain bg-center bg-no-repeat xl:h-[60px] xl:w-[274px]" />
                    <button type="button" onClick={handleScrollToTop}>
                        <Image src={arrowTop} alt="최상단으로 이동" width={40} height={40} />
                    </button>
                </div>
                <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center justify-between">
                        <a href="/" rel="noopener noreferrer" target="_blank" className="md:text-[18px]">
                            아시아평화와역사연구소
                        </a>
                        <ul className="hidden items-center gap-[40px] xl:flex">
                            {menuList.map((menu, idx) => (
                                <li key={`menu_${idx}`}>
                                    <button
                                        type="button"
                                        className="text-[18px] font-[500]"
                                        onClick={() => handleCategoryClick(menu)}
                                    >
                                        {menu.c_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul className="flex flex-col gap-[8px]">
                        <li className="flex items-center md:text-[18px]">
                            <p className="min-w-[80px] text-[#666]">연락처</p>
                            <p className="flex-1">{siteInfo.c_tel}</p>
                        </li>
                        <li className="flex md:text-[18px]">
                            <p className="min-w-[80px] text-[#666]">이메일</p>
                            <p className="flex-1">
                                japantext@daum.net <br className="md:hidden" />
                                (아시아평화와역사교육연대, 국내메일)
                                <br />
                                japantext@hotmail.com <br className="md:hidden" />
                                (아시아평화와역사교육연대, 국제메일)
                                <br />
                                apnhi@daum.net <br className="md:hidden" />
                                (아시아평화와역사연구소)
                            </p>
                        </li>
                        <li className="flex md:text-[18px]">
                            <p className="min-w-[80px] text-[#666]">주&nbsp;&nbsp;&nbsp;소</p>
                            <p className="flex-1">{siteInfo.c_address}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
