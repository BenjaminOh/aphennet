"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import mainSection2Img1 from "@/assets/images/user/mainSection2Img1.png";
import mainSection2Img2 from "@/assets/images/user/mainSection2Img2.png";
import mainSection2Img3 from "@/assets/images/user/mainSection2Img3.png";

export default function MainSection2({
    sectRef,
    sectOn,
}: {
    sectRef: React.RefObject<HTMLDivElement>;
    sectOn: boolean;
}) {
    const cont2Ref = useRef<HTMLDivElement>(null);
    const cont3Ref = useRef<HTMLDivElement>(null);
    const [cont2On, setCont2On] = useState(false);
    const [cont3On, setCont3On] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLDivElement;
                        if (target === cont2Ref.current) setCont2On(true);
                        if (target === cont3Ref.current) setCont3On(true);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px",
            },
        );

        const refs = [cont2Ref, cont3Ref];
        refs.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refs.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div
            ref={sectRef}
            className="mx-auto flex max-w-[1360px] flex-col gap-[80px] p-[120px_20px] md:p-[160px_28px] xl:gap-[120px] min-[1400px]:px-0"
        >
            <div className="flex flex-col gap-[40px] md:gap-[60px] xl:flex-row xl:items-center xl:gap-0">
                <div
                    className={`opacity-0 transition-all duration-700 ease-in-out xl:flex-1${
                        sectOn ? " opacity-100" : ""
                    }`}
                >
                    <p className="w-fit rounded-[30px] bg-[#056547] p-[8px_20px] font-[700] text-white md:text-[18px]">
                        연대 설립 이야기
                    </p>
                    <p className="p-[8px_0_20px] text-[24px] font-[700] md:p-[20px_0_40px] md:text-[40px]">
                        우리는 왜 행동할까요?
                    </p>
                    <p className="leading-[1.5] text-[#666] md:text-[18px]">
                        국내외 교과서의 역사왜곡을 바로잡고, <br />
                        20세기 침략과 저항의 역사에 대한 아시아 공동의 역사인식을 만들기 위해 <br />
                        2001년 4월 86개의 시민사회단체, 학자, 교사 등이 모여 <br className="hidden md:block" />
                        일본교과서바로잡기운동본부를 결성하였습니다.
                    </p>
                </div>
                <Image
                    src={mainSection2Img1}
                    alt="연대 설립 이야기"
                    className={`mx-auto translate-y-[50%] opacity-0 transition-all duration-700 ease-in-out xl:mx-0${
                        sectOn ? " !translate-y-0 opacity-100" : ""
                    }`}
                />
            </div>
            <div ref={cont2Ref} className="flex flex-col gap-[40px] xl:flex-row xl:items-center xl:gap-0">
                <div
                    className={`opacity-0 transition-all duration-700 ease-in-out xl:order-2 xl:flex-1${
                        cont2On ? " opacity-100" : ""
                    }`}
                >
                    <p className="w-fit rounded-[30px] bg-[#056547] p-[8px_20px] font-[700] text-white md:text-[18px]">
                        우리의 철학
                    </p>
                    <p className="p-[8px_0_20px] text-[24px] font-[700] md:text-[40px]">무엇을 지키고자 할까요?</p>
                    <ul className="list-disc pl-[20px] leading-[1.5] text-[#666] md:text-[18px]">
                        <li>역사: 20세기의 아픔을 외면하지 않고 마주합니다.</li>
                        <li>평화: 공동의 역사 인식이 동아시아 평화의 기초입니다.</li>
                        <li>미래: 아이들에게 거짓을 가르치지 않기 위한 우리의 약속입니다.</li>
                    </ul>
                </div>
                <Image
                    src={mainSection2Img2}
                    alt="우리의 철학"
                    className={`mx-auto translate-y-[50%] opacity-0 transition-all duration-700 ease-in-out xl:order-1 xl:mx-0${
                        cont2On ? " !translate-y-0 opacity-100" : ""
                    }`}
                />
            </div>
            <div ref={cont3Ref} className="flex flex-col gap-[40px] xl:flex-row xl:items-center xl:gap-0">
                <div
                    className={`opacity-0 transition-all duration-700 ease-in-out xl:flex-1${
                        cont3On ? " opacity-100" : ""
                    }`}
                >
                    <p className="w-fit rounded-[30px] bg-[#056547] p-[8px_20px] font-[700] text-white md:text-[18px]">
                        비전과 약속
                    </p>
                    <p className="p-[8px_0_20px] text-[24px] font-[700] md:text-[40px]">
                        다시 쓰는 역사, 다시 쓰는 평화
                    </p>
                    <div className="flex flex-col gap-[20px] leading-[1.5] text-[#666] md:text-[18px]">
                        <p>우리는 단순한 비판이 아닌, 함께 만들어가는 대안의 길을 제시합니다.</p>
                        <ul className="list-disc pl-[20px]">
                            <li>미래 세대를 위한 진짜 역사교육</li>
                            <li>아시아의 공동기억을 위한 지식·시민연대의 허브</li>
                            <li>국제 사회 속 ‘기억의 정의’ 실현을 위한 노력</li>
                        </ul>
                    </div>
                </div>
                <Image
                    src={mainSection2Img3}
                    alt="비전과 약속"
                    className={`mx-auto translate-y-[50%] opacity-0 transition-all duration-700 ease-in-out xl:mx-0${
                        cont3On ? " !translate-y-0 opacity-100" : ""
                    }`}
                />
            </div>
        </div>
    );
}
