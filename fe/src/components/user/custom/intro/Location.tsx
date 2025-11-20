import Image from "next/image";

import icBus from "@/assets/images/user/icBus.png";
import icCall from "@/assets/images/user/icCall.png";
import icFax from "@/assets/images/user/icFax.png";
import icLocation from "@/assets/images/user/icLocation.png";
import icMail from "@/assets/images/user/icMail.png";
import icSubway from "@/assets/images/user/icSubway.png";
import locationLogo from "@/assets/images/user/locationLogo.png";
import KakaoMap from "@/components/user/common/KakaoMap";
import { useSiteStore } from "@/store/common/useSiteStore";

export default function Location() {
    const { siteInfoData } = useSiteStore();

    return (
        <div className="relative flex flex-col">
            <div className="w-full xl:order-2">
                <div className="md:hidden">
                    <KakaoMap timestamp="1760437939623" mapKey="xyq3fr9mo8o" mapHeight="160" className="!w-full" />
                </div>
                <div className="hidden md:block xl:hidden">
                    <KakaoMap timestamp="1760438799759" mapKey="xyqomsyegca" mapHeight="280" className="!w-full" />
                </div>
                <div className="hidden xl:block">
                    <KakaoMap timestamp="1760438872021" mapKey="2c9ckxwigeac" mapHeight="440" className="!w-full" />
                </div>
            </div>
            <div className="mx-auto w-full max-w-[1360px] xl:order-1 xl:pr-[600px]">
                <div className="flex flex-col gap-[20px] p-[40px_20px_60px] md:gap-[24px] md:p-[60px_28px] xl:p-[0_0_80px]">
                    <p className="text-[20px] font-[700] md:text-[24px]">Location</p>
                    <ul className="flex flex-col gap-[20px] md:gap-[16px]">
                        <li className="flex flex-col gap-[8px] md:flex-row md:items-center">
                            <div className="flex items-center gap-[8px] md:w-[132px]">
                                <Image src={icLocation} alt="주소" width={24} height={24} />
                                <p className="text-[20px] font-[700]">주소</p>
                            </div>
                            <p className="flex-1 text-[18px] md:text-[20px]">{siteInfoData.c_address}</p>
                        </li>
                        <li className="flex flex-col gap-[8px] md:flex-row md:items-center">
                            <div className="flex items-center gap-[8px] md:w-[132px]">
                                <Image src={icCall} alt="전화" width={24} height={24} />
                                <p className="text-[20px] font-[700]">전화</p>
                            </div>
                            <p className="flex-1 text-[18px] md:text-[20px]">{siteInfoData.c_tel}</p>
                        </li>
                        {siteInfoData.c_fax && (
                            <li className="flex flex-col gap-[8px] md:flex-row md:items-center">
                                <div className="flex items-center gap-[8px] md:w-[132px]">
                                    <Image src={icFax} alt="팩스" width={24} height={24} />
                                    <p className="text-[20px] font-[700]">팩스</p>
                                </div>
                                <p className="flex-1 text-[18px] md:text-[20px]">{siteInfoData.c_fax}</p>
                            </li>
                        )}
                        <li className="flex flex-col gap-[8px] md:flex-row md:items-center">
                            <div className="flex items-center gap-[8px] md:w-[132px]">
                                <Image src={icMail} alt="이메일" width={24} height={24} />
                                <p className="text-[20px] font-[700]">이메일</p>
                            </div>
                            <p className="text-[18px] md:text-[20px]">
                                <span>{siteInfoData.c_email}</span> <br className="md:hidden" />
                                (아시아평화와역사교육연대, 국내메일)
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="z-[2] xl:pointer-events-none xl:absolute xl:left-1/2 xl:top-0 xl:flex xl:w-full xl:max-w-[1360px] xl:-translate-x-1/2 xl:justify-end">
                <div className="pointer-events-auto relative bg-[#F4F4F4] p-[40px_20px] md:p-[60px_28px_40px] xl:w-[560px] xl:rounded-[20px] xl:p-[40px]">
                    <Image
                        src={locationLogo}
                        alt="logo"
                        width={240}
                        height={240}
                        className="absolute bottom-0 right-0"
                    />
                    <p className="text-[24px] font-[700]">오시는 길</p>
                    <ul className="relative z-[1] flex flex-col gap-[32px] pt-[24px]">
                        <li className="flex flex-col gap-[16px]">
                            <div className="flex items-center gap-[24px]">
                                <Image src={icBus} alt="버스" width={80} height={80} />
                                <p className="text-[20px] font-[700]">버스</p>
                            </div>
                            <div className="flex flex-col gap-[8px] md:flex-row md:items-start md:justify-between md:gap-0">
                                <p className="w-fit rounded-[20px] bg-[#23AA4B] p-[4px_12px] font-[700] text-white">
                                    마포09
                                </p>
                                <p className="text-[18px] text-[#666] md:w-[calc(100%-120px)]">
                                    홍대입구역 1번 출구 동교동사거리 승차 <br />
                                    신한은행 서교동 금융센터점 하차
                                </p>
                            </div>
                        </li>
                        <li className="flex flex-col gap-[16px]">
                            <div className="flex items-center gap-[24px]">
                                <Image src={icSubway} alt="지하철" width={80} height={80} />
                                <p className="text-[20px] font-[700]">지하철</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex w-[120px] flex-col gap-[10px]">
                                    <p className="w-fit rounded-[20px] bg-[#23AA4B] p-[4px_12px] font-[700] text-white">
                                        2호선
                                    </p>
                                    <p className="w-fit rounded-[20px] bg-[#519DC9] p-[4px_12px] font-[700] text-white">
                                        공항
                                    </p>
                                    <p className="w-fit rounded-[20px] bg-[#85C3AB] p-[4px_12px] font-[700] text-white">
                                        경의중앙
                                    </p>
                                </div>
                                <p className="flex-1 text-[18px] text-[#666]">
                                    홍대입구역 1번 출구 <br />
                                    도보 10분
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
