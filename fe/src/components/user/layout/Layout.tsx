"use client";

import "@/assets/css/user/user.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Suspense, useEffect, useState } from "react";

import ScrollToTop from "@/components/common/common/ScrollToTop";
import LoadingPop from "@/components/common/popup/LoadingPop";
import { DEFAULT_LANGUAGE, SITE_ID } from "@/constants/common/site";
import { useGetSiteInfo } from "@/service/user/common";
import { useGetCategoryList } from "@/service/user/menu";
import { initialSiteInfo, MenuItem, SiteInfoItem, useSiteStore } from "@/store/common/useSiteStore";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { setSiteInfoData } = useSiteStore();
    const { menuList, setMenuList } = useSiteStore();
    const [siteInfo, setSiteInfo] = useState<SiteInfoItem>(initialSiteInfo);
    const { data: configData } = useGetCategoryList(DEFAULT_LANGUAGE);
    const { data: siteInfoData } = useGetSiteInfo(SITE_ID, DEFAULT_LANGUAGE, { enabled: !!SITE_ID });

    useEffect(() => {
        if (siteInfoData) {
            const { c_site_name, c_address, c_tel, c_fax, c_email, c_num, c_ceo } = siteInfoData.data;
            setSiteInfo({
                c_site_name,
                c_ceo,
                c_address,
                c_tel,
                c_fax,
                c_email,
                c_num,
            });
            setSiteInfoData({
                c_site_name,
                c_ceo,
                c_address,
                c_tel,
                c_fax,
                c_email,
                c_num,
            });
        } else {
            setSiteInfo(initialSiteInfo);
            setSiteInfoData(initialSiteInfo);
        }
    }, [siteInfoData]); // eslint-disable-line react-hooks/exhaustive-deps

    // 메뉴 목록 조회
    useEffect(() => {
        if (configData) {
            const filterMenuRecursively = (items: MenuItem[]): MenuItem[] => {
                return items
                    .filter((item: MenuItem) => item.c_use_yn === "Y")
                    .map((item: MenuItem) => ({
                        ...item,
                        submenu: item.submenu ? filterMenuRecursively(item.submenu) : undefined,
                    }));
            };
            const newMenuList = filterMenuRecursively(configData.data);
            setMenuList(newMenuList);
        } else {
            setMenuList([]);
        }
    }, [configData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <ScrollToTop />
            <div className="user-layout min-w-[375px]">
                <Suspense fallback={<LoadingPop />}>
                    <div className="min-h-screen">
                        <Header menuList={menuList} />
                        {children}
                    </div>
                    <Footer menuList={menuList} siteInfo={siteInfo} />
                </Suspense>
            </div>
        </>
    );
}
