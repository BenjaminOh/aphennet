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
            const { c_site_name, c_address, c_tel, c_fax, c_email, c_num, c_ceo, c_b_title, c_meta, c_meta_tag } =
                siteInfoData.data;
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

            // 동적으로 meta 태그 변경
            if (c_b_title) {
                document.title = c_b_title;
            }

            // description meta 태그 업데이트
            let descMeta = document.querySelector('meta[name="description"]');
            if (!descMeta) {
                descMeta = document.createElement("meta");
                descMeta.setAttribute("name", "description");
                document.head.appendChild(descMeta);
            }
            if (c_meta) {
                descMeta.setAttribute("content", c_meta);
            }

            // keywords meta 태그 업데이트
            let keywordsMeta = document.querySelector('meta[name="keywords"]');
            if (!keywordsMeta) {
                keywordsMeta = document.createElement("meta");
                keywordsMeta.setAttribute("name", "keywords");
                document.head.appendChild(keywordsMeta);
            }
            if (c_meta_tag) {
                keywordsMeta.setAttribute("content", c_meta_tag);
            }

            // OpenGraph meta 태그 업데이트
            if (c_b_title) {
                const ogTitleMeta = document.querySelector('meta[property="og:title"]');
                if (ogTitleMeta) {
                    ogTitleMeta.setAttribute("content", c_b_title);
                }
            }
            if (c_meta) {
                const ogDescMeta = document.querySelector('meta[property="og:description"]');
                if (ogDescMeta) {
                    ogDescMeta.setAttribute("content", c_meta);
                }
            }

            // Twitter meta 태그 업데이트
            if (c_b_title) {
                const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
                if (twitterTitleMeta) {
                    twitterTitleMeta.setAttribute("content", c_b_title);
                }
            }
            if (c_meta) {
                const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
                if (twitterDescMeta) {
                    twitterDescMeta.setAttribute("content", c_meta);
                }
            }
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
