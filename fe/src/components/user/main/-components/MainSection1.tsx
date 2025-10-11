"use client";

import Image from "next/image";

import bgMainSection1 from "@/assets/images/user/bgMainSection1.jpg";
import icMainSection1 from "@/assets/images/user/icMainSection1.png";
import LinkButton from "@/components/user/button/LinkButton";

export default function MainSection1() {
    return (
        <div className="mx-auto max-w-[1360px] px-[20px] md:px-[28px] min-[1400px]:px-0">
            <div className="relative flex flex-col items-center justify-center gap-[20px] overflow-hidden rounded-[20px] py-[160px] text-center md:gap-[40px] md:rounded-[40px] md:py-[136px] xl:py-[160px]">
                <Image
                    src={bgMainSection1}
                    alt="배경"
                    fill
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
                />
                <div className="relative flex flex-col items-center justify-center gap-[20px]">
                    <div className="relative h-[120px] w-[97px] md:h-[220px] md:w-[178px]">
                        <Image src={icMainSection1} alt="진실의 역사, 평화의 미래" fill className="object-contain" />
                    </div>
                    <p className="text-[24px] font-[700] leading-[1.5] text-white md:text-[40px]">
                        진실의 역사, 평화의 미래
                    </p>
                </div>
                <div className="relative flex flex-col items-center justify-center gap-[24px]">
                    <p className="leading-[1.5] text-white md:text-[20px]">
                        왜곡된 과거를 바로잡고,
                        <br />
                        동아시아 공동의 기억을 함께 써 내려갑니다.
                    </p>
                    <LinkButton txt="단체 소개" handleClick={() => {}} />
                </div>
            </div>
        </div>
    );
}
