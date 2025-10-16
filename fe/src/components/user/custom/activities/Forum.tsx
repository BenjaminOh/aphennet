import Image from "next/image";

import scrollImg from "@/assets/images/user/scrollImg.png";
import subBannerForum from "@/assets/images/user/subBannerForum.jpg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

const items = [
    {
        title: "제1회 역사인식과 동아시아 평화포럼 난징대회",
        date: "2002. 03. 27 ~ 03. 31",
        location: "중국, 난징",
        theme: "한중일 역사인식과 일본교과서",
    },
    {
        title: "제2회 역사인식과 동아시아 평화포럼 도쿄대회",
        date: "2003. 02. 27 ~ 03. 01",
        location: "일본, 도쿄(와세다대)",
        theme: "글로벌화와 인권, 교과서",
    },
    {
        title: "제3회 역사인식과 동아시아 평화포럼 서울대회",
        date: "2004. 08. 08 ~ 08. 13",
        location: "한국, 서울(은행연합회관)",
        theme: "한중일 3국의 815 기억",
    },
    {
        title: "제4회 역사인식과 동아시아 평화포럼 베이징대회",
        date: "2006. 01. 06 ~ 01. 09",
        location: "중국, 베이징(쑨싱리조트)",
        theme: "전후 60년, 역사인식의 총괄과 전망",
    },
    {
        title: "제5회 역사인식과 동아시아 평화포럼 교토대회",
        date: "2006. 11. 02 ~ 11. 06",
        location: "일본, 교토(리츠메이칸대)",
        theme: "전후 역사와 평화의 선택",
    },
    {
        title: "제6회 역사인식과 동아시아 평화포럼 서울대회",
        date: "2007. 09. 14 ~ 09. 18",
        location: "한국, 서울(성균관대)",
        theme: "변환기 역사인식과 동북아시아 평화",
    },
    {
        title: "제7회 역사인식과 동아시아 평화포럼 베이징대회",
        date: "2008. 11. 06 ~ 11. 09",
        location: "중국, 베이징(사회과학원근대사연구소)",
        theme: "동아시아 국제관계 변화와 역사인식",
    },
    {
        title: "제8회 역사인식과 동아시아 평화포럼 도쿄대회",
        date: "2009. 11. 21 ~ 11. 23",
        location: "일본, 도쿄(와세다대)",
        theme: "동아시아사의 가능성과 평화를 만드는 힘",
    },
    {
        title: "제9회 역사인식과 동아시아 평화포럼 서울대회",
        date: "2010. 11. 20 ~ 11. 21",
        location: "한국, 서울(아카데미하우스)",
        theme: "일본의 한국 강제병합 100년에 생각하는 <br/>동아시아 평화공동체",
    },
    {
        title: "제10회 역사인식과 동아시아 평화포럼 베이징대회",
        date: "2011. 01. 26 ~ 01. 28",
        location: "중국, 베이징(사회과학원근대사연구소)",
        theme: "평화포럼 10년 활동의 평가와 전망",
    },
    {
        title: "제11회 역사인식과 동아시아 평화포럼 도쿄대회",
        date: "2012. 11. 24 ~ 11. 26",
        location: "일본, 도쿄(YMCA청소년센터)",
        theme: "시민으로부터 시작하는 동아시아 평화공동체(1)",
    },
    {
        title: "제12회 역사인식과 동아시아 평화포럼 광주대회",
        date: "2013. 05. 16 ~ 11. 19",
        location: "한국, 광주(김대중센터/518문화관)",
        theme: "시민으로부터 시작하는 동아시아 평화공동체(2)",
    },
    {
        title: "제13회 역사인식과 동아시아 평화포럼 베이징대회",
        date: "2014. 11. 21 ~ 11. 24",
        location: "중국, 베이징 <br/>(인민대 국제관계대학)",
        theme: "청일전쟁 120주년과 동아시아 평화 공동체 구축",
    },
    {
        title: "제14회 역사인식과 동아시아 평화포럼 오키나와대회",
        date: "2015. 10. 30 ~ 11. 03",
        location: "일본, 오키나와(류큐대)",
        theme: "전후 70년, 동아시아 평화를 오키나와에서 생각한다",
    },
    {
        title: "제15회 역사인식과 동아시아 평화포럼 제주대회",
        date: "2016. 10. 20 ~ 10. 23",
        location: "한국, 제주 <br/>(칼호텔/제주4.3평화재단)",
        theme: "평화의 섬 ‘제주’에서 생각하는 동아시아 평화와 역사화해",
    },
    {
        title: "제16회 역사인식과 동아시아 평화포럼 난징대회",
        date: "2017. 09. 07 ~ 09. 11",
        location: "중국, 난징(중산호텔)",
        theme: "전쟁의 역사기억·역사화해 · 동아시아 평화",
    },
    {
        title: "제17회 역사인식과 동아시아 평화포럼 히로시마대회",
        date: "2018. 11. 22 ~ 11. 26",
        location: "일본, 히로시마(국제청년회관)",
        theme: "히로시마에서 생각하는 핵이 없는 세계, 동아시아 평화",
    },
    {
        title: "제18회 역사인식과 동아시아 평화포럼 서울대회",
        date: "2019. 11. 01 ~ 11. 04",
        location: "한국, 서울(SC컨벤션센터)",
        theme: "3.1운동, 5.4운동 100주년 기념 - 3·1운동 현장에서 <br/>동아시아 평화를 생각하다.",
    },
    {
        title: "제19회 역사인식과 동아시아 평화포럼",
        date: "2021. 11. 13 ~ 11. 14",
        location: "중국 온라인",
        theme: "코로나19 시대에 동아시아 평화와 인간의 생명존엄에 대한 사고",
    },
    {
        title: "제20회 역사인식과 동아시아 평화포럼",
        date: "2022. 11. 12",
        location: "일본 온라인",
        theme: "전쟁없는 세계를 위한 국제사회와 동아시아의 역할",
    },
    {
        title: "제21회 역사인식과 동아시아 평화포럼 부산대회",
        date: "2023. 11. 04 ~ 11. 06",
        location: "한국, 부산",
        theme: "다시 아시아 평화를 묻다",
    },
    {
        title: "제22회 역사인식과 동아시아 평화포럼 창사대회",
        date: "2024. 11. 01 ~ 11. 05",
        location: "중국, 창사",
        theme: "전쟁의 현실과 역사 기억 속에서 평화를 찾는다.",
    },
    {
        title: "제23회 역사인식과 동아시아 평화포럼 마츠모토대회",
        date: "2025. 11. 01 ~ 11. 03",
        location: "일본, 나가노",
        theme: "일본의 패전·한국의 광복·중국의 항일전 승리로부터 <br/>80년, 다시 동아시아의 역사 인식을 묻는다",
    },
];

export default function Forum() {
    return (
        <>
            <SubBanner banner={subBannerForum} title={`역사인식과 <br/>동아시아 평화포럼`} />
            <div className="p-[40px_20px_80px] md:p-[60px_28px_100px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[24px] font-[500] md:text-[28px] xl:w-[680px]">
                        한·중·일 3국을 중심으로 한 <br />
                        <strong>‘역사 인식과 동아시아 평화포럼’ 개최</strong>를 통해 <br />
                        <br />
                        3국 공동의 학술 연구와 정보 교류, 연대 활동을 <br />
                        지속적으로 전개하고 있습니다.
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1360px] pb-[80px] md:p-[20px_0px_160px]">
                <p className="pb-[24px] text-center text-[20px] font-[700] md:pb-[48px] md:text-[24px]">
                    역대 역사인식과 동아시아 평화포럼
                </p>
                <ScrollArea className="group relative w-full">
                    <div className="min-w-[768px]">
                        <ul className="flex items-center bg-[#F3F9F5] text-[18px] font-[500] text-primary-2 md:text-[20px] xl:rounded-[20px]">
                            <li className="w-[35%] p-[16px_8px] xl:p-[16px_10px_16px_50px]">대회명</li>
                            <li className="w-[15%] p-[16px_8px] xl:p-[16px_10px]">개최일</li>
                            <li className="w-[15%] p-[16px_8px] xl:p-[16px_10px]">개최지</li>
                            <li className="w-[35%] p-[16px_8px] xl:p-[16px_50px_16px_10px]">주제</li>
                        </ul>
                        <div className="mt-[12px] overflow-hidden border border-[#ddd] xl:rounded-[20px]">
                            <table className="w-full">
                                <colgroup>
                                    <col className="w-[35%]" />
                                    <col className="w-[15%]" />
                                    <col className="w-[15%]" />
                                    한국, 제주(칼호텔/제주4.3평화재단)
                                    <col className="w-[35%]" />
                                </colgroup>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr
                                            className={`text-left${index % 2 === 0 ? " bg-[#FAFAFA]" : ""}`}
                                            key={`camp_${index}`}
                                        >
                                            <th className="p-[12px_8px] text-[18px] font-[500] xl:p-[16px_10px_16px_50px]">
                                                {item.title}
                                            </th>
                                            <td className="p-[12px_8px] font-[500] text-[#666] xl:p-[16px_10px] xl:text-[18px]">
                                                {item.date}
                                            </td>
                                            <td className="p-[12px_8px] font-[500] text-[#666] xl:p-[16px_10px] xl:text-[18px]">
                                                <span dangerouslySetInnerHTML={{ __html: item.location }} />
                                            </td>
                                            <td className="p-[12px_8px] font-[500] text-[#666] xl:p-[16px_50px_16px_10px] xl:text-[18px]">
                                                <span dangerouslySetInnerHTML={{ __html: item.theme }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="absolute left-1/2 top-[20%] -translate-x-1/2 transition-opacity duration-300 hover:opacity-0 group-hover:opacity-0 min-[1040px]:hidden">
                            <Image src={scrollImg} alt="scroll" width={140} height={160} />
                        </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
