"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { API_URL } from "@/config/apiConfig";
import { useGetBannerList } from "@/service/user/main";

interface BannerItem {
    idx: number;
    b_file: string;
    b_title: string;
    b_open: string[];
    b_s_date: string;
    b_e_date: string;
    b_url: string;
    b_url_target: string;
}

export default function MainBanner() {
    const router = useRouter();
    const [type, setType] = useState<"P" | "M">("P");
    const [bannerList, setBannerList] = useState<BannerItem[]>([]);
    const { data: configBannerData } = useGetBannerList("100", type);

    // 디바이스 크기에 따른 타입 설정
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1280) {
                setType("M");
            } else {
                setType("P");
            }
        };

        // 초기 설정
        handleResize();

        // 리사이즈 이벤트 리스너 등록
        window.addEventListener("resize", handleResize);

        // 클린업
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 메인 배너 목록 조회
    useEffect(() => {
        if (configBannerData) {
            const list = configBannerData.data.data_list;

            const getDateString = (date: Date) => date.toISOString().slice(0, 10);

            const currentDateStr = getDateString(new Date());

            const updatedList = list.filter((item: BannerItem) => {
                if (item.b_open.includes("N")) return false;

                // 시작일 체크
                if (item.b_s_date) {
                    const startDate = new Date(item.b_s_date.replace(/\./g, "-"));
                    const startDateStr = getDateString(startDate);
                    if (startDateStr > currentDateStr) return false;
                }

                // 종료일 체크
                if (item.b_e_date) {
                    const endDate = new Date(item.b_e_date.replace(/\./g, "-"));
                    const endDateStr = getDateString(endDate);
                    if (endDateStr < currentDateStr) return false; // 오늘까지 노출
                }

                return true;
            });
            setBannerList(updatedList);
        } else {
            setBannerList([]);
        }
    }, [configBannerData]);

    return (
        <>
            {bannerList.length > 0 && (
                <Swiper
                    loop={true}
                    className="h-full w-full"
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    observer={true}
                    observeParents={true}
                >
                    {bannerList.map((item, index) => {
                        return (
                            <SwiperSlide
                                key={`main_banner_${index}`}
                                className={`${item.b_url ? "cursor-pointer" : ""}`}
                                onClick={() => {
                                    if (item.b_url) {
                                        if (item.b_url_target === "2") {
                                            window.open(item.b_url, "_blank", "noopener,noreferrer");
                                        } else {
                                            router.push(item.b_url);
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={`${API_URL}/${item.b_file}`}
                                    alt={item.b_title}
                                    className="w-full xl:h-full xl:object-cover"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </>
    );
}
