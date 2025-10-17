import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// import history2001 from "@/assets/images/user/history2001.jpg";
// import history2002 from "@/assets/images/user/history2002.jpg";
// import history2003 from "@/assets/images/user/history2003.jpg";
// import history2004 from "@/assets/images/user/history2004.jpg";
// import history2005 from "@/assets/images/user/history2005.jpg";
// import history2006 from "@/assets/images/user/history2006.jpg";
// import history2007 from "@/assets/images/user/history2007.jpg";
// import history2008 from "@/assets/images/user/history2008.jpg";
// import history2009 from "@/assets/images/user/history2009.jpg";
// import history2010 from "@/assets/images/user/history2010.jpg";
// import history2011 from "@/assets/images/user/history2011.jpg";
// import history2012 from "@/assets/images/user/history2012.jpg";
// import history2013 from "@/assets/images/user/history2013.jpg";
// import history2014 from "@/assets/images/user/history2014.jpg";
import history2015 from "@/assets/images/user/history2015.jpg";
import history2016 from "@/assets/images/user/history2016.jpg";
import history2017 from "@/assets/images/user/history2017.jpg";
import history2018 from "@/assets/images/user/history2018.jpg";
import history2019 from "@/assets/images/user/history2019.jpg";
import history2020 from "@/assets/images/user/history2020.jpg";
import history2021 from "@/assets/images/user/history2021.jpg";
import history2022 from "@/assets/images/user/history2022.jpg";
import history2023 from "@/assets/images/user/history2023.jpg";
import history2024 from "@/assets/images/user/history2024.jpg";
import history2025 from "@/assets/images/user/history2025.jpg";
import subBannerHistory from "@/assets/images/user/subBannerHistory.jpg";
import subBannerLogo from "@/assets/images/user/subBannerLogo.png";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SupportSection from "@/components/user/common/SupportSection";

interface HistoryListItem {
    date: string;
    text: string;
}

interface HistoryItem {
    year: string;
    img: StaticImageData;
    list: HistoryListItem[];
}

interface Item {
    title: string;
    id: string;
    history: HistoryItem[];
}

const items: Item[] = [
    {
        title: "2025 ~ 2021",
        id: "content1",
        history: [
            {
                year: "2025",
                img: history2025,
                list: [
                    { date: "01. 13", text: `1월 운영위원회` },
                    { date: "02. 22", text: `2월 운영위원회 및 2025년도 정기총회` },
                    { date: "03. 25", text: `일본 고등학교 역사왜곡 교과서 검정통과 결과분석 보도자료 배포` },
                    { date: "04. 25", text: `2025년 아시아평화와역사연구소 학술회의 : 시민적 역사인식의 방향모색` },
                    { date: "05. 30", text: `5월 운영위원회` },
                    { date: "07. 10", text: `7월 운영위원회` },
                    {
                        date: "08. 04 ~ 08. 08",
                        text: `제22회 동아시아 청소년 역사 체험 캠프(한국 경기, 서울) <br/>‘함께 걸어온 길, 함께 걸어갈 미래’ <br/>- 동아시아 청소년들의 평화를 위한 ‘8020 기억 프로젝트’`,
                    },
                    {
                        date: "08. 11",
                        text: `‘평화를 여는 역사’ 출간<br/>(3단계 편찬위원회/아시아평화와역사교육연대 한중일공동역사교재위원회)`,
                    },
                    { date: "08. 21", text: `캠프 스태프 평가회` },
                    { date: "09. 01", text: `9월 운영위원회` },
                    { date: "10. 20", text: `10월 운영위원회` },
                    { date: "11. 01 ~ 11. 03", text: `제23회 역사인식과 동아시아 평화포럼 마츠모토대회(일본, 나가노)` },
                    { date: "11. 26", text: `사무실 이전(서교동)` },
                ],
            },
            {
                year: "2024",
                img: history2024,
                list: [
                    {
                        date: "03. 15",
                        text: `신진연구자 역사 대화 국제 학술회의 <br/>"‘시선’, 과거사 기억의 세대적 인식과 공유를 위한 역사 대화"`,
                    },
                    { date: "03. 22", text: `2024 일본 중등 교과서 검정 결과 분석 발표 기자회견` },
                    { date: "03. 25", text: `검정 결과에 항의하는 주한 일본대사관 앞 기자회견` },
                    { date: "04. 12", text: `2024년 아시아평화와역사연구소 학술회의 "역사 대화의 성과와 새로운 모색"` },
                    { date: "05. 10", text: `2024 제2회 정책 포럼: "화해학의 도달점"` },
                    { date: "06. 08", text: `2024년 공동 학술 세미나 "다문화 시대 한국과 미국의 역사 교육"` },
                    {
                        date: "06. 12",
                        text: `2024 제3회 정책 포럼: "중국 대학 필수 교재 '중화민족공동체개론' 출간 현황과 함의"`,
                    },
                    { date: "06. 14", text: `공동 수업 진행(후쿠오카 대학/오카타 요시히로, 한혜인)` },
                    { date: "06. 17", text: `공동 수업 진행(오이타 대학/정경아, 이신철)` },
                    { date: "06. 27", text: `공동 수업 진행(독일 베를린자유대학/임성숙)` },
                    {
                        date: "08. 04 ~ 08. 08",
                        text: `제21회 동아시아 청소년 역사 체험 캠프(일본 교토) <br/>‘인류의 위기를 넘어 평화로운 세계로 - 과거와 현재의 대화, 교토에서’`,
                    },
                    { date: "08. 11", text: `『한일 교과서 역사 쟁점 집필 권고안』 제작을 위한 간담회` },
                ],
            },
            {
                year: "2023",
                img: history2023,
                list: [
                    { date: "02. 24", text: "2023년도 정기총회 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "03. 28", text: "2023년도 정기총회 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "04. 14", text: "‘2023 일본 교과서 검정 결과 분석’ 보고서 발간" },
                    { date: "04. 28", text: "일본 교과서 검정 결과 관련 한일 공동 성명 발표" },
                    {
                        date: "07. 31 ~ 08. 04",
                        text: "제22회 한중일 청소년 역사체험캠프(일본 도쿄) “청소년의 시선으로 본 평화의 미래”",
                    },
                    { date: "09. 01 ~ 09. 03", text: "제22회 역사인식과 동아시아 평화포럼 도쿄대회(일본 도쿄)" },
                    { date: "11. 17 ~ 11. 19", text: "제43회 한중일공동역사교과서편찬위원회 국제회의(중국 베이징)" },
                ],
            },
            {
                year: "2022",
                img: history2022,
                list: [
                    { date: "02. 18", text: "2022년도 정기총회 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "03. 29", text: "일본 문부과학성 고등학교 교과서 검정 결과 발표 기자회견(서울)" },
                    { date: "04. 08", text: "일본 교과서 검정 결과 관련 한일 공동 성명 발표" },
                    { date: "04. 29", text: "일본 교과서 역사왜곡 규탄 기자회견(서울)" },
                    {
                        date: "07. 25 ~ 07. 29",
                        text: "제21회 한중일 청소년 역사체험캠프(한국 서울, 온라인) <br/>“청소년, 새로운 역사대화를 열다”",
                    },
                    { date: "09. 02 ~ 09. 04", text: "제21회 역사인식과 동아시아 평화포럼 서울대회(온라인 개최)" },
                    { date: "11. 12 ~ 11. 13", text: "제20회 역사인식과 동아시아 평화포럼(일본, 온라인)" },
                    { date: "11. 25 ~ 11. 27", text: "제24회 한중일공동역사교재편찬위원회 국제회의(온라인)" },
                ],
            },
            {
                year: "2021",
                img: history2021,
                list: [
                    { date: "02. 19", text: "2021년도 정기총회 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "03. 30", text: "일본 문부과학성 중학교 교과서 검정 결과 발표 기자회견(서울)" },
                    { date: "04. 09", text: "‘2021 일본 교과서 검정 결과 분석’ 보고서 발간" },
                    { date: "04. 23", text: "일본 교과서 검정 결과 관련 한일 공동 성명 발표" },
                    {
                        date: "07. 26 ~ 07. 30",
                        text: `제20회 한중일 청소년 역사체험캠프(한국 서울, 온라인) <br/>"포스트 코로나 시대, 청소년의 연대와 평화"`,
                    },
                    { date: "08. 10", text: "일본 교과서 역사왜곡 규탄 기자회견(서울)" },
                    {
                        date: "09. 03 ~ 09. 05",
                        text: "제20회 역사인식과 동아시아 평화포럼 서울대회(한국 서울, 온라인 개최)",
                    },
                    { date: "11. 19 ~ 11. 21", text: "제41회 한중일공동역사교과서편찬위원회 국제회의(온라인)" },
                ],
            },
        ],
    },
    {
        title: "2020 ~ 2016",
        id: "content2",
        history: [
            {
                year: "2020",
                img: history2020,
                list: [
                    { date: "02. 21", text: `2020년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "03. 24", text: `일본 문부과학성 고등학교 교과서 검정 결과 발표에 대한 기자회견(서울)` },
                    { date: "05. 29", text: `일본 교과서 검정 결과 분석 보고서 발간` },
                    {
                        date: "07. 27 ~ 07. 31",
                        text: `제19회 한중일 청소년 역사체험캠프(한국 서울, 온라인) “청소년, 연결된 역사 속으로”`,
                    },
                    { date: "10. 30 ~ 11. 01", text: `제19회 역사인식과 동아시아 평화포럼 서울대회(온라인 개최)` },
                    { date: "11. 27 ~ 11. 29", text: `제40회 한중일공동역사교과서편찬위원회 국제회의(온라인)` },
                ],
            },
            {
                year: "2019",
                img: history2019,
                list: [
                    { date: "02. 22", text: `2019년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "03. 26", text: `일본 문부과학생 중학교 교과서 검정 통과 결과에 대한 기자회견(서울)` },
                    { date: "04. 12", text: `일본 교과서 검정 결과 관련 한일 공동 성명 발표` },
                    { date: "05. 24", text: `일본 교과서 검정 제도 개악 규탄 기자회견(서울)` },
                    {
                        date: "07. 29 ~ 08. 02",
                        text: `제18회 한중일 청소년 역사체험캠프(한국 서울) “청소년, 역사와 평화를 잇다”`,
                    },
                    { date: "09. 06 ~ 09. 08", text: `제19회 역사인식과 동아시아 평화포럼 서울대회(한국 서울)` },
                    { date: "11. 15 ~ 11. 17", text: `제39회 한중일공동역사교과서편찬위원회 국제회의(일본 도쿄)` },
                ],
            },
            {
                year: "2018",
                img: history2018,
                list: [
                    { date: "02. 23", text: `2018년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "03. 27", text: `일본 문부과학생 고등학교 교과서 검정 결과 발표에 따른 기자회견(서울)` },
                    { date: "04. 13", text: `일본 역사왜곡 교과서 검정 제도 개악 반대 성명 발표` },
                    { date: "05. 25", text: `‘2018 일본 고등학교 교과서 검정 결과 분석’ 보고서 발간` },
                    {
                        date: "07. 23 ~ 07. 27",
                        text: `제17회 한중일 청소년 역사체험캠프(일본 오사카) “청소년의 시선으로 평화를 잇다”`,
                    },
                    { date: "09. 14 ~ 09. 16", text: `제18회 역사인식과 동아시아 평화포럼 베이징대회(중국 베이징)` },
                    { date: "11. 16 ~ 11. 18", text: `제38회 한중일공동역사교과서편찬위원회 국제회의(중국 난징)` },
                ],
            },
            {
                year: "2017",
                img: history2017,
                list: [
                    { date: "02. 24", text: `2017년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "03. 31", text: `‘2017 일본 고등학교 교과서 검정 통과 결과 분석’ 기자회견(서울)` },
                    { date: "04. 21", text: `일본의 교과서 역사왜곡에 대한 시민공동 성명 발표` },
                    { date: "05. 26", text: `일본의 교과서 역사왜곡 규탄 기자회견(서울)` },
                    {
                        date: "07. 24 ~ 07. 28",
                        text: `제16회 한중일 청소년 역사체험캠프(한국 서울) “동아시아 청소년, 평화를 잇다”`,
                    },
                    { date: "08. 11", text: `일본의 교과서 역사왜곡에 대한 한중일 공동행동 및 성명 발표` },
                    { date: "09. 01 ~ 09. 03", text: `제17회 역사인식과 동아시아 평화포럼 교토대회(일본 교토)` },
                    { date: "11. 17 ~ 11. 19", text: `제37회 한중일공동역사교과서편찬위원회 국제회의(한국 서울)` },
                ],
            },
            {
                year: "2016",
                img: history2016,
                list: [
                    { date: "02. 26", text: `2016년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "03. 18", text: `‘2016 일본 중학교 교과서 검정 통과 결과 분석’ 기자회견(서울)` },
                    { date: "04. 08", text: `일본 교과서 검정 결과 관련 한일 시민공동 성명 발표` },
                    { date: "04. 22 ~ 04. 24", text: `제15회 역사인식과 동아시아 평화포럼 서울대회(한국 서울)` },
                    {
                        date: "06. 16",
                        text: `일본 교과서 검정 제도 개악 반대 한일 시민 공동 기자회견(서울)`,
                    },
                    {
                        date: "07. 25 ~ 07. 29",
                        text: `제15회 한중일 청소년 역사체험캠프(중국 난징) “기억과 화해, 청소년이 말하다”`,
                    },
                    { date: "09. 02 ~ 09. 04", text: `제36회 한중일3국공동역사교재편찬위원회 국제회의(중국 베이징)` },
                    { date: "09. 02 ~ 09. 04", text: `제16회 역사인식과 동아시아 평화포럼 도쿄대회(일본 도쿄)` },
                ],
            },
        ],
    },
    {
        title: "2015 ~ 2011",
        id: "content3",
        history: [
            {
                year: "2015",
                img: history2015,
                list: [
                    { date: "02. 27", text: `2015년도 정기총회 및 제1차 운영위원회(역사문제연구소)` },
                    { date: "04. 03", text: `‘2015 일본 중학교 교과서 검정 통과’ 결과 분석 기자회견(서울)` },
                    { date: "04. 24", text: `일본의 교과서 역사왜곡 저지를 위한 시민행동 기자회견(서울)` },
                    {
                        date: "07. 27 ~ 07. 31",
                        text: `제14회 한중일 청소년 역사체험캠프(한국 서울) “전쟁과 평화, 그리고 우리의 미래”`,
                    },
                    {
                        date: "06. 16",
                        text: `제14회 역사인식과 동아시아 평화포럼 서울대회(한국 서울)`,
                    },
                    {
                        date: "11. 27 ~ 11. 29",
                        text: `제35회 한중일3국공동역사교재편찬위원회 국제회의(중국 베이징)`,
                    },
                ],
            },
        ],
    },
];

export default function History() {
    const [activeId, setActiveId] = useState(items[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // sticky 헤더 높이 + 여유

            // 각 섹션의 위치 확인
            for (let i = items.length - 1; i >= 0; i--) {
                const element = document.getElementById(items[i].id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    if (scrollPosition >= offsetTop) {
                        setActiveId(items[i].id);
                        break;
                    }
                }
            }
        };

        // 초기 실행
        handleScroll();

        // 스크롤 이벤트 리스너
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="relative xl:pt-[200px]">
                <div className="relative h-[160px] w-full md:h-[240px] xl:absolute xl:inset-0 xl:h-[400px]">
                    <Image src={subBannerHistory} alt="banner" fill className="object-cover" />
                </div>
                <div className="mx-auto max-w-[1360px] xl:flex xl:items-start xl:justify-between xl:pb-[160px]">
                    <div className="sticky top-[60px] z-[10] bg-[linear-gradient(316deg,#171E1D_6.2%,#206B6E_98.86%)] xl:min-h-[440px] xl:w-[320px] xl:rounded-[0_0_40px_0] xl:shadow-[8px_8px_20px_0_rgba(0,0,0,0.16)]">
                        <ScrollArea>
                            <ul className="flex w-max gap-[20px] p-[8px_20px] md:gap-[24px] md:p-[16px_28px] xl:flex-col xl:gap-[20px] xl:p-[40px]">
                                {items.map((item, idx) => (
                                    <li key={`history_tab_${idx}`}>
                                        <Link
                                            href={`#${item.id}`}
                                            className={`relative font-[700] text-[#ddd] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:opacity-0 after:content-[''] ${
                                                activeId === item.id
                                                    ? "text-[20px] text-white after:opacity-100 md:text-[24px] xl:text-[32px]"
                                                    : "text-[18px] md:text-[20px] xl:text-[28px]"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <div className="absolute bottom-0 right-0 hidden xl:block">
                            <Image src={subBannerLogo} alt="logo" width={213} height={236} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[60px] p-[40px_20px_80px] md:gap-[80px] md:p-[80px_28px_120px] xl:max-w-[1000px] xl:flex-1 xl:p-[0_28px] min-[1400px]:px-0">
                        {items.map((item, idx) => (
                            <div
                                key={`history_content_${idx}`}
                                id={item.id}
                                className={`flex scroll-mt-[140px] flex-col gap-[60px] md:gap-[80px] xl:scroll-mt-[100px]${
                                    idx === 0 ? " xl:pt-[280px]" : ""
                                }`}
                            >
                                {item.history.map((cont, i) => (
                                    <div
                                        key={`history_item_${i}`}
                                        className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start xl:justify-between"
                                    >
                                        <p className="font-gmarket text-[32px] font-[700] leading-[1.2] md:text-[48px]">
                                            {cont.year}
                                        </p>
                                        <div>
                                            <div className="overflow-hidden rounded-[8px]">
                                                <Image src={cont.img} alt="이미지" />
                                            </div>
                                            <div className="flex flex-col gap-[16px] pt-[28px]">
                                                {cont.list.map((list, j) => (
                                                    <div
                                                        key={`history_list_item_${j}`}
                                                        className="relative flex flex-col gap-[4px] pl-[16px] before:absolute before:left-0 before:top-[10px] before:size-[8px] before:rounded-full before:bg-[#23AA4B] md:flex-row md:gap-[16px] xl:pl-[24px]"
                                                    >
                                                        <p className="text-[18px] font-[700] md:min-w-[140px] md:text-[20px]">
                                                            {list.date}
                                                        </p>
                                                        <p
                                                            className="text-[18px] text-[#666] md:flex-1"
                                                            dangerouslySetInnerHTML={{ __html: list.text }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
