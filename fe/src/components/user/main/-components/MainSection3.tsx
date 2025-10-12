"use client";

import Image from "next/image";

import arrowRightWhite from "@/assets/images/user/arrowRightWhite.png";
import mainSection3Img from "@/assets/images/user/mainSection3Img.jpg";
import LinkButton from "@/components/user/button/LinkButton";

export default function MainSection3({
    sectRef,
    sectOn,
}: {
    sectRef: React.RefObject<HTMLDivElement>;
    sectOn: boolean;
}) {
    return (
        <div ref={sectRef} className="relative overflow-hidden xl:pt-[120px]">
            <div className="relative p-[60px_20px] md:p-[120px_28px] xl:p-[120px_0_180px]">
                <Image src={mainSection3Img} alt="배경이미지" fill className="object-cover" />
                <div className="xl:mx-auto xl:flex xl:max-w-[1360px] xl:justify-end">
                    <div
                        className={`relative flex translate-x-[50%] flex-col gap-[40px] opacity-0 transition-all duration-700 ease-in-out md:gap-[60px]${
                            sectOn ? " !translate-x-0 opacity-100" : ""
                        }`}
                    >
                        <p className="text-[22px] font-[700] leading-[1.5] text-white md:text-[40px]">
                            아시아평화와역사교육연대는
                            <br />
                            ‘비판’만이 아닌
                            <br />
                            ‘대안’을 제시하면서 나아가겠습니다.
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-[10px] md:text-[20px]"
                        >
                            <span className="relative font-[500] leading-[1.5] text-white after:absolute after:bottom-[4px] after:left-0 after:h-[1px] after:w-full after:bg-white after:opacity-50 after:content-['']">
                                아시아평화와역사연구소 바로가기
                            </span>
                            <span className="relative block size-[20px] md:size-[24px]">
                                <Image src={arrowRightWhite} alt="바로가기" fill className="object-contain" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="xl:pointer-events-none xl:absolute xl:left-1/2 xl:top-0 xl:flex xl:w-full xl:max-w-[1360px] xl:-translate-x-1/2">
                <div
                    className={`pointer-events-auto translate-y-[50%] bg-[#056547] p-[40px_20px] opacity-0 transition-all duration-700 ease-in-out md:p-[60px_28px] xl:w-[640px] xl:rounded-[24px] xl:p-[60px]${
                        sectOn ? " !translate-y-0 opacity-100" : ""
                    }`}
                >
                    <p className="text-[24px] font-[700] leading-[1.5] text-white md:text-[40px]">
                        함께 하는 마음으로,
                        <br />
                        함께 걷는 역사.
                    </p>
                    <p className="pt-[16px] text-[#ddd] md:pt-[24px] md:text-[20px]">
                        지금, 후원은 가장 쉬운 평화 실천입니다.
                    </p>
                    <div className="mt-[45px] md:mt-[52px] md:flex md:justify-end xl:mt-[152px]">
                        <LinkButton
                            txt="후원하러 가기"
                            handleClick={() => {
                                window.open(
                                    "https://link.donationbox.co.kr/donationBoxList.jsp?campaignuid=okIiz0H7Vu",
                                );
                            }}
                            type="black"
                            className="w-full md:w-[240px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
