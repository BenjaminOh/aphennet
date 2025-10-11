"use client";

import "@/assets/css/user/user.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Suspense } from "react";

import ScrollToTop from "@/components/common/common/ScrollToTop";
import LoadingPop from "@/components/common/popup/LoadingPop";

// import { DEFAULT_LANGUAGE, SITE_ID } from "@/constants/common/site";
// import { useGetSiteInfo } from "@/service/user/common";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    // const { data: siteInfoData } = useGetSiteInfo(SITE_ID, DEFAULT_LANGUAGE, { enabled: !!SITE_ID });

    // useEffect(() => {}, [siteInfoData]);

    return (
        <>
            <ScrollToTop />
            <div className="user-layout min-w-[375px]">
                <Suspense fallback={<LoadingPop />}>
                    <div className="min-h-screen">
                        <Header />
                        {children}
                    </div>
                    <Footer />
                </Suspense>
            </div>
        </>
    );
}
