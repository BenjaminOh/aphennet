import Image from "next/image";

import scrollImg from "@/assets/images/user/scrollImg.png";
import subBannerCamp from "@/assets/images/user/subBannerCamp.jpg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

const items = [
    {
        title: "제1회 동아시아 청소년 역사체험캠프",
        date: "2002. 08. 18 ~ 08. 22",
        location: "한국 서울",
        theme: "한국과 일본, 새로운 하나됨 : 한일 청소년의 힘으로!",
    },
    {
        title: "제2회 동아시아 청소년 역사체험캠프",
        date: "2003. 07. 25 ~ 07. 30",
        location: "일본 간사이",
        theme: "전쟁 없는 세상! 우리가 함께 만들어요",
    },
    {
        title: "제3회 동아시아 청소년 역사체험캠프",
        date: "2004. 08. 08 ~ 08. 13",
        location: "한국 안양",
        theme: "1945. 8. 15 - 한중일 역사인식의 공유",
    },
    {
        title: "제4회 동아시아 청소년 역사체험캠프",
        date: "2005. 08. 04 ~ 08. 10",
        location: "중국 북경",
        theme: "광복 60주년 - 한중일을 하나로! 평화로! 미래로!",
    },
    {
        title: "제5회 동아시아 청소년 역사체험캠프",
        date: "2006. 08. 03 ~ 08. 10",
        location: "일본 오키나와",
        theme: "오키나와로부터 아시아의 평화로!",
    },
    {
        title: "제6회 동아시아 청소년 역사체험캠프",
        date: "2007. 08. 07 ~ 08. 12",
        location: "한국 제주",
        theme: "전후 역사와 동아시아 평화 만들기",
    },
    {
        title: "제7회 동아시아 청소년 역사체험캠프",
        date: "2008. 08. 06 ~ 08. 11",
        location: "중국 남경",
        theme: "난징에서 생각하는 동아시아 화해와 평화",
    },
    {
        title: "제8회 동아시아 청소년 역사체험캠프",
        date: "-",
        location: "한국",
        theme: "(신종 인플루엔자로 취소)",
    },
    {
        title: "제9회 동아시아 청소년 역사체험캠프",
        date: "2010. 08. 04 ~ 08. 09",
        location: "일본 치바",
        theme: "동아시아 100년, 평화와 교류의 21세기를!",
    },
    {
        title: "제10회 동아시아 청소년 역사체험캠프",
        date: "2011. 08. 04 ~ 08. 09",
        location: "한국 인천",
        theme: "교류의 도시 인천에서 마주하는 평화",
    },
    {
        title: "제11회 동아시아 청소년 역사체험캠프",
        date: "2012. 07. 25 ~ 07. 30",
        location: "중국 대련",
        theme: "다양성이 공존하는 대련에서 생각하는 역사와 미래",
    },
    {
        title: "제12회 동아시아 청소년 역사체험캠프",
        date: "2013. 08. 07 ~ 08. 12",
        location: "일본 교토",
        theme: "일본의 고도·교토에서 교류, 평화·화해를 젊은이의 손으로",
    },
    {
        title: "제13회 동아시아 청소년 역사체험캠프",
        date: "2014. 08. 05 ~ 08. 10",
        location: "한국 충남",
        theme: "동아시아, 1894 갈등을 넘어 2014 평화를 말하다",
    },
    {
        title: "제14회 동아시아 청소년 역사체험캠프",
        date: "2015. 07. 31 ~ 08. 06",
        location: "중국 상해",
        theme: "청소년과 동아시아의 미래 : 전후 70년의 사고",
    },
    {
        title: "제15회 동아시아 청소년 역사체험캠프",
        date: "2016. 07. 28 ~ 08. 02",
        location: "일본 홋카이도",
        theme: "홋카이도 역사와 문화에 배우고 미래를 만들자!",
    },
    {
        title: "제16회 동아시아 청소년 역사체험캠프",
        date: "2017. 07. 24 ~ 07. 29",
        location: "한국 서울",
        theme: "서울에서 평화와 민주주의의 길을 걷다",
    },
    {
        title: "제17회 동아시아 청소년 역사체험캠프",
        date: "2018. 07. 28 ~ 08. 02",
        location: "중국 장춘",
        theme: "동북으로 - 진실의 역사와 미래에 대한 상상",
    },
    {
        title: "제18회 동아시아 청소년 역사체험캠프",
        date: "2019. 08. 07 ~ 08. 12",
        location: "일본 도쿄",
        theme: "동아시아의 현재와 미래를 이야기하자! <br />- 동아시아의 화해와 핵 없는 세계로의 길",
    },
    {
        title: "",
        date: "-",
        location: "한국",
        theme: "(코로나19로 연기)",
    },
    {
        title: "제19회 동아시아 청소년 역사체험캠프",
        date: "2021. 08. 03 ~ 08. 06",
        location: "한국(온라인)",
        theme: "코로나 시대, <br/>신냉전과 한반도 분단을 넘어 평화를 상상하다!",
    },
    {
        title: "제20회 동아시아 청소년 역사체험캠프",
        date: "2022, 2023",
        location: "중국",
        theme: "(중국의 코로나19 확산으로 연기, 취소)",
    },
    {
        title: "제21회 동아시아 청소년 역사체험캠프",
        date: "2024. 08. 04 ~ 08. 08",
        location: "일본 교토",
        theme: "‘인류의 위기를 넘어 평화로운 세계로’ : <br />과거와 현재의 대화, 교토에서",
    },
    {
        title: "제22회 동아시아 청소년 역사체험캠프",
        date: "2025. 08. 04 ~ 08. 08",
        location: "한국 경기, 서울",
        theme: "‘함께 걸어온 길, 함께 걸어갈 미래’ <br />- 동아시아 청소년들의 평화를 위한 ‘8020 기억프로젝트’",
    },
];

export default function Camp() {
    return (
        <>
            <SubBanner banner={subBannerCamp} title={`동아시아 청소년 <br/>역사체험캠프`} />
            <div className="p-[40px_20px_80px] md:p-[60px_28px_100px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[18px] text-[#666] md:text-[20px] xl:w-[680px]">
                        한·중·일 3국은 지리적으로 매우 가까운 나라로 역사적으로 오랫동안 밀접한 관계를 맺어 왔지만,
                        때로는 침략과 전쟁, 식민지 지배의 불행한 역사를 경험하였습니다. <br />
                        <br />
                        그로 인한 3국 간의 역사 갈등은 아직까지도 동아시아의 평화를 증진시키는 데 장애 요인으로 남아
                        있습니다. 이에 동아시아 청소년들이 교류를 통해 역사 문제의 발생 및 갈등에 관한 사실을 정확히
                        인식하고, 이웃 나라의 역사와 문화에 대한 이해를 높이는 계기를 마련하여, 평화로운 동아시아를
                        만들기 위한 청소년의 역할을 함께 생각하는 기회로 동아시아 청소년 역사 체험 캠프를 진행하고
                        있습니다.
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1360px] pb-[80px] md:p-[20px_0px_160px]">
                <p className="pb-[24px] text-center text-[20px] font-[700] md:pb-[48px] md:text-[24px]">
                    역대 동아시아 청소년 역사체험캠프
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
                                                {item.location}
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
