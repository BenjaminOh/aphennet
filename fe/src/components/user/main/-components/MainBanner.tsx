"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
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

const swiperStyle = `
    [&>.swiper-pagination]:leading-[0]
    [&>.swiper-pagination]:flex
    [&>.swiper-pagination]:gap-[12px]
    [&>.swiper-pagination]:justify-end
    [&>.swiper-pagination]:px-[20px]
    [&>.swiper-pagination]:!bottom-0
    [&>.swiper-pagination>.swiper-pagination-bullet-active]:!bg-primary 
    [&>.swiper-pagination>.swiper-pagination-bullet]:!mx-0
    [&>.swiper-pagination>.swiper-pagination-bullet]:bg-[#F2F2F2]
    [&>.swiper-pagination>.swiper-pagination-bullet]:opacity-100
    md:[&>.swiper-pagination]:px-[28px]
    md:[&>.swiper-pagination]:gap-[12px]
    md:[&>.swiper-pagination>.swiper-pagination-bullet]:size-[16px]
    xl:[&>.swiper-pagination]:px-0
    xl:[&>.swiper-pagination]:justify-start
    xl:[&>.swiper-pagination]:max-w-[1360px]
    xl:[&>.swiper-pagination]:!left-1/2
    xl:[&>.swiper-pagination]:!-translate-x-1/2
    xl:[&>.swiper-pagination]:!bottom-[30%]
`;

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
                    className={swiperStyle}
                    pagination={{
                        clickable: true,
                    }}
                    effect="fade"
                    fadeEffect={{
                        crossFade: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, EffectFade]}
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
                                <div className="relative flex flex-col gap-[14px] md:gap-[47px] xl:flex-row xl:justify-end">
                                    <img
                                        src={`${API_URL}/${item.b_file}`}
                                        alt={item.b_title}
                                        className="w-full xl:w-auto"
                                    />
                                    <div
                                        className="whitespace-pre-line px-[20px] text-left text-[24px] font-[700] md:px-[28px] md:text-[48px] xl:absolute xl:left-1/2 xl:top-[30%] xl:mx-auto xl:w-full xl:max-w-[1360px] xl:-translate-x-1/2 xl:px-0 xl:text-[60px]"
                                        dangerouslySetInnerHTML={{ __html: item.b_title }}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </>
    );
}
