import Image from "next/image";

import aboutBg from "@/assets/images/user/aboutBg.jpg";
import aboutIcon1 from "@/assets/images/user/aboutIcon1.png";
import aboutIcon2 from "@/assets/images/user/aboutIcon2.png";
import aboutIcon3 from "@/assets/images/user/aboutIcon3.png";
import aboutIcon4 from "@/assets/images/user/aboutIcon4.png";
import aboutIcon5 from "@/assets/images/user/aboutIcon5.png";
import aboutIcon6 from "@/assets/images/user/aboutIcon6.png";
import aboutIcon7 from "@/assets/images/user/aboutIcon7.png";
import aboutIcon8 from "@/assets/images/user/aboutIcon8.png";
import aboutIcon9 from "@/assets/images/user/aboutIcon9.png";
import aboutImg1 from "@/assets/images/user/aboutImg1.png";
import aboutImg2 from "@/assets/images/user/aboutImg2.png";
import aboutImg3 from "@/assets/images/user/aboutImg3.png";
import subBannerAbout from "@/assets/images/user/subBannerAbout.jpg";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function About() {
    return (
        <>
            <SubBanner banner={subBannerAbout} title={`아시아평화와 <br/>역사교육연대는`} />
            <div className="p-[40px_20px_80px] md:p-[60px_28px_100px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[18px] text-[#666] md:text-[20px] xl:w-[680px]">
                        국내외 교과서의 역사왜곡을 바로잡고, 20세기 침략과 저항의 역사에 대한 아시아 공동의 역사인식을
                        만들기 위해 2001년 4월 86개의 시민사회단체, 학자, 교사 등이 모여 일본교과서바로잡기운동본부를
                        결성하였습니다.
                        <br />
                        <br />
                        2003년에는 한국의 역사교육, 중국의 고구려사 왜곡 등 한중일을 비롯한 동아시아의 역사갈등을
                        해결하기 위해 단체명칭을 아시아평화와역사교육연대로 변경하고, 산하에
                        (사)아시아평화와역사연구소를 설립했습니다. 역사연대는 한중일 역사인식과 교과서 문제에 대한
                        대중활동과 연구, 출판사업을 진행하고 있습니다.
                        <br />
                        <br />
                        국내외 여러 시민사회‧연구단체들과의 연대활동을 통해, 과거사 청산활동에도 주도적으로 참여하고
                        있습니다.
                        <br />
                        <br />
                        교과서역사왜곡문제는 동아시아의 과거사에 대한 인식의 문제이자 자라나는 세대의 미래에 관한
                        문제입니다. 아시아평화와역사교육연대는 ‘비판’만이 아닌 ‘대안’을 제시하면서 나아가겠습니다.
                    </div>
                </div>
            </div>
            <ul className="relative mx-auto flex max-w-[1360px] flex-col gap-[80px] px-[20px] after:absolute after:bottom-[40px] after:left-1/2 after:h-[80px] after:w-[1px] after:-translate-x-1/2 after:bg-[#ddd] after:opacity-0 after:content-[''] md:gap-[100px] md:p-[0_28px_100px] xl:gap-[80px] xl:after:opacity-100 min-[1400px]:px-0">
                <li className="flex flex-col md:gap-[20px] xl:flex-row xl:items-center xl:gap-0">
                    <Image src={aboutImg1} alt="이미지" className="mx-auto xl:order-2 xl:mx-0" />
                    <div className="flex flex-col gap-[8px] md:gap-[40px] xl:order-1 xl:flex-1">
                        <p className="font-batang text-[40px] font-[700] text-[#23AA4B] md:text-[60px]">歷史</p>
                        <p className="text-[18px] text-[#666] md:text-[20px]">
                            20세기 어두웠던 아픔의 역사 <br />
                            그 역사적 진실을 밝히며 <br />
                            <span className="text-[20px] font-[500] text-[#222] md:text-[24px]">
                                21세기 미래를 향한 반성과 화해의 세상
                            </span>
                            을 만들어가고자 합니다.
                        </p>
                    </div>
                </li>
                <li className="flex flex-col md:gap-[20px] xl:flex-row xl:items-center xl:gap-0">
                    <Image src={aboutImg2} alt="이미지" className="mx-auto xl:mx-0" />
                    <div className="flex flex-col gap-[8px] md:gap-[40px] xl:flex-1">
                        <p className="font-batang text-[40px] font-[700] text-[#407FFA] md:text-[60px]">平和</p>
                        <p className="text-[18px] text-[#666] md:text-[20px]">
                            역사는 과거와 미래를 잇는 다리 <br />
                            공동의 역사인식, 그것은 동아시아평화를 위한 첫걸음 <br />
                            <span className="text-[20px] font-[500] text-[#222] md:text-[24px]">
                                공존과 공생, 그리고 평화의 세상
                            </span>
                        </p>
                    </div>
                </li>
                <li className="flex flex-col md:gap-[20px] xl:flex-row xl:items-center xl:gap-0">
                    <Image src={aboutImg3} alt="이미지" className="mx-auto xl:order-2 xl:mx-0" />
                    <div className="flex flex-col gap-[8px] md:gap-[40px] xl:order-1 xl:flex-1">
                        <p className="font-batang text-[40px] font-[700] text-[#F36E2D] md:text-[60px]">未來</p>
                        <p className="text-[18px] text-[#666] md:text-[20px]">
                            교과서는 아이들의 미래를 위한 나침반 <br />
                            아이들에게 더 이상 거짓을 가르칠 수는 없습니다.
                            <br />
                            <span className="text-[20px] font-[500] text-[#222] md:text-[24px]">
                                미래를 향한 우리들의 손짓, 발짓, 몸짓
                            </span>
                            <br />
                            우리 아이들의 미래에 날개를 달아주십시오.
                        </p>
                    </div>
                </li>
            </ul>
            <div className="p-[80px_20px_20px] md:p-[120px_28px_40px] md:text-center">
                <p className="text-[32px] font-[700] md:text-[40px]">목적 및 주요사업</p>
                <p className="pt-[12px] text-[18px] text-[#666] md:pt-[20px] md:text-[20px]">
                    국내외 교과서의 역사왜곡을 바로잡고, <br className="xl:hidden" />
                    20세기 침략과 저항의 역사에 대한 아시아 공동의 역사인식을 마련하고, <br />
                    나아가 후세에 대한 올바른 교육을 위한 연구를 바탕으로 21세기 세계의 화해와 평화에 기여함을 목적으로
                    한다.
                </p>
            </div>
            <div className="relative mx-auto max-w-[1720px] p-[40px_20px] md:py-[85px] xl:py-[100px]">
                <Image src={aboutBg} alt="이미지" fill className="object-cover" />
                <ul className="relative list-decimal pl-[20px] text-[18px] font-[500] text-white md:flex md:flex-col md:items-center md:pl-0 md:text-[20px]">
                    <li>일본과 중국의 역사왜곡을 바로잡기 위한 연구․교육활동 및 심포지엄</li>
                    <li>한중일 역사학자, 시민단체 간 교류 및 네트워크 구축사업</li>
                    <li>일본과 중국의 역사왜곡과 관련하여 홍보물 발간 및 온라인을 통한 무상 정보제공사업</li>
                </ul>
            </div>
            <ul className="mx-auto flex max-w-[1720px] flex-wrap gap-y-[24px] p-[40px_20px_93px] md:justify-center md:gap-y-[40px] md:p-[80px_28px_145px] xl:flex-nowrap xl:p-[100px_0_160px]">
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon1} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        일본 역사왜곡 <br />
                        대응 활동
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon2} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        중국 역사왜곡 <br />
                        대응 활동
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon3} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        한국사 교과서 <br />
                        개정 및 정상화 활동
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon4} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        역사인식과 <br />
                        동아시아 평화포럼
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon5} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        일본의 과거청산 <br />
                        촉구와 평화 만들기
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon6} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        한중일 역사공동교재 <br />
                        개발 활동
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon7} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">
                        동아시아 청소년 <br />
                        역사체험캠프
                    </p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon8} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">교육활동</p>
                </li>
                <li className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/4 xl:flex-1">
                    <Image src={aboutIcon9} alt="아이콘" />
                    <p className="text-center text-[20px] font-[500]">평화기행</p>
                </li>
            </ul>
        </>
    );
}
