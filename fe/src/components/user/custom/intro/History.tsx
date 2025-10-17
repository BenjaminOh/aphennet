import Link from "next/link";
import { useEffect, useState } from "react";

import subBannerHistory from "@/assets/images/user/subBannerHistory.jpg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

interface HistoryListItem {
    date: string;
    text: string;
}

interface HistoryItem {
    year: string;
    list: HistoryListItem[];
}

interface ProgressListItem {
    date: string;
    content: string;
}

interface ProgressItem {
    title: string;
    subtitle?: string;
    list: ProgressListItem[];
}

interface Item {
    title: string;
    id: string;
    history?: HistoryItem[];
    progress?: ProgressItem[];
}

const items: Item[] = [
    {
        title: "공동교재 연혁",
        id: "content1",
        history: [
            {
                year: "2001",
                list: [
                    { date: "03. 05", text: "‘일본역사교과서개악저지운동본부’ 결성 제안" },
                    { date: "03. 14", text: "‘일본역사교과서개악저지운동본부’ 결성 선언 및 기자회견(55개 단체 참여)" },
                    { date: "03. 24", text: "일본대사관 항의 방문, 일본 역사교과서 개악저지 집회" },
                    { date: "03. 26", text: "일본 역사교과서 개악 규탄 아시아행동의 날 - 한일공동연대시위" },
                    { date: "04. 01", text: "일본 역사교과서 개악 저지 서명운동 진행" },
                    { date: "04. 03", text: "일본 문부성 ‘위험한’ 교과서 검정통과에 따른 한일공동 규탄 기자회견" },
                    { date: "04. 23", text: "상설연대기구 ‘일본교과서바로잡기운동본부’ 창립(86개 단체 참여)" },
                ],
            },
            {
                year: "2002",
                list: [
                    { date: "01. 18 ~ 01. 20", text: "'역사인식과 동아시아 평화포럼' 남경대회 준비회의(서울대)" },
                    { date: "02. 06", text: "2002년도 정기대표자회의 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "02. 28", text: "한일역사공동연구기구 설립과 관련 한일 시민단체 공동요청서 제출(한국)" },
                    { date: "03. 27 ~ 03. 31", text: "제1회 역사인식과 동아시아 평화포럼 난징대회(중국 난징)" },
                    { date: "04. 09", text: "‘최신일본사’ 검정통과에 대한 기자회견 및 한중일 공동 성명 발표(서울)" },
                    {
                        date: "04. 13",
                        text: "‘화해와 반성을 위한 동아시아 역사인식 - 한중일 교과서와 비교를 중심으로’ 심포지엄",
                    },
                    {
                        date: "04. 17 ~ 05. 20",
                        text: "‘최신일본사’ 검정통과에 대한 한국정부의 강력대응을 촉구하는 1인 시위(정부청사 입구)",
                    },
                    { date: "05. 03", text: "일본의 과거청산을 촉구하는 아시아지역 심포지엄(평양)" },
                    { date: "05. 03 ~ 07. 11", text: "‘동아시아 평화 만들기’ 한일 공동캠페인" },
                    {
                        date: "05. 20",
                        text: "『한국 지성의 소리 1-언론자료로 본 일본교과서 역사왜곡』<br/>『한국 지성의 소리 2-지방자치단체의 결의』 (역사비평사) 발간",
                    },
                    { date: "06~07월", text: "‘최신일본사’ 불채택을 위한 한일연대캠페인(한국·일본 각지)" },
                    {
                        date: "08. 18 ~ 08. 22",
                        text: "제1회 한일 청소년 역사체험캠프(한국 서울) “한국과 일본, 새로운 하나됨 : 한일 청소년의 힘으로”",
                    },
                    { date: "08. 23 ~ 08. 25", text: "제1회 한중일3국공동역사교재편찬위원회 국제회의(한국)" },
                    {
                        date: "09. 16",
                        text: "‘조일 정상회담에 즈음하여 식민지배와 전쟁피해에 대한 사죄와 배상을 촉구하는 범국민 의견 광고’ 게재(한겨레신문)",
                    },
                    {
                        date: "11. 09",
                        text: "‘21세기 한국사 교과서와 역사교육의 방향-제7차 교육과정을 중심으로’ 심포지엄",
                    },
                    { date: "11. 30", text: "‘2002 평화 만들기’ 콘서트 개최(서울)" },
                ],
            },
            {
                year: "2003",
                list: [
                    { date: "01. 09", text: "출판기념회 및 신년하례회(크라운호텔)" },
                    { date: "02. 07", text: "2003년도 정기대표자회의 및 제1차 운영위원회(역사문제연구소)" },
                    { date: "02. 27 ~ 03. 01", text: "제2회 역사인식과 동아시아 평화포럼 도쿄대회(일본 도쿄)" },
                    {
                        date: "04. 01",
                        text: "『한국사교과서의 희망을 찾아서-21세기 한국사교과서와 역사교육의 방향』(역사비평사) 발간",
                    },
                    { date: "06~07월", text: "히로시마 ‘위험한’교과서 채택저지를 위한 한일공동서명 활동 전개" },
                    {
                        date: "07. 25 ~ 07. 30",
                        text: "제2회 한일 청소년 역사체험캠프(일본 간사이) “전쟁 없는 세상! 우리가 함께 만들어요”",
                    },
                    { date: "09. 08 ~ 09", text: "제4회 한중일3국공동역사교재편찬위원회 국제회의(중국 베이징)" },
                    {
                        date: "09. 17 ~ 18",
                        text: "제1회 일본의 과거청산을 요구하는 국제연대협의회 상하이대회(중국 상하이)",
                    },
                    {
                        date: "10. 30",
                        text: "‘미래를 여는 역사’ 영상 시사회 및 대학 특별강연<br/>‘미래를 여는 역사’ 영상자료 각 시도 교육청 및 해외공관 배포",
                    },
                    { date: "11. 10", text: "『글로벌화와 인권·교과서』(역사비평사) 발간" },
                    {
                        date: "11. 21 ~ 11. 24",
                        text: "국제학술대회 ‘동아시아역사공동체-한중일 공동의 역사인식을 위해’",
                    },
                    { date: "11. 21 ~ 11. 23", text: "제5회 한중일3국공동역사교재편찬위원회 국제회의(서울)" },
                    { date: "11. 24", text: "‘한중일 공동 역사부교재 편찬 작업 개시’ 한중일 공동기자회견(서울)" },
                    { date: "11. 28", text: "일본의 과거청산을 요구하는 국제연대협의회 한국위원회 발족 기자회견" },
                    { date: "12. 30", text: "『과거와 현재를 잇는 역사여행』 현장 답사 매뉴얼 발간" },
                ],
            },
            {
                year: "2004",
                list: [
                    { date: "01. 13", text: "중국 고구려사 왜곡 대책 공청회(서울 국회)" },
                    {
                        date: "02. 10",
                        text: "『일본 우익의 논리-일본 ‘새역모’의 역사관·교육관·한국관』(역사비평사) 발간",
                    },
                    { date: "02. 18", text: "2004년도 정기대표자회의(프란치스코교육회관)" },
                    {
                        date: "03. 22 ~ 03. 24",
                        text: "일본의 과거청산을 요구하는 국제연대협의회 남북 실무협의회(금강산)",
                    },
                    { date: "05. 20 ~ 05. 24", text: "제2회 일본의 과거청산을 요구하는 국제연대협의회 서울대회(서울)" },
                    {
                        date: "08. 08 ~ 08. 13",
                        text: "제3회 한중일청소년역사체험캠프(한국 안양) “1945.8.15.- 한·중·일 역사 인식의 공유”",
                    },
                    { date: "08. 11", text: "제3회 역사인식과 동아시아 평화포럼 서울대회(서울)" },
                    {
                        date: "08. 12 ~ 08. 13",
                        text: "2005년 일본교과서 검정채택 대비 한중일 시민단체 전략회의 및 기자회견(서울)",
                    },
                    { date: "11. 02", text: "올바른 과거청산법 쟁취를 위한 국회 앞 농성" },
                    { date: "12. 31", text: "2005년 일본교과서 검정·채택을 대비한 교육자료집 및 CD-ROM 제작" },
                ],
            },
            {
                year: "2005",
                list: [
                    { date: "01. 05 ~ 10", text: "‘후소샤 교과서 채택 저지를 위한 교육자료집’ 전국 지자체 배포" },
                    { date: "01. 21", text: "‘고구려가 위험하다!’ 교육비디오 시사회" },
                    { date: "01. 28 ~ 01. 31", text: "제10회 한중일3국공동역사교재편찬위원회 국제회의(일본 도쿄)" },
                    { date: "02. 23", text: "2005년도 정기대표자회의(배재대학교 학술지원센터)" },
                    { date: "02~03월", text: "‘소리없는 전쟁, 일본의 역사왜곡을 말한다’ 전시회(서울)" },
                    { date: "03. 11", text: "‘새로운 역사교과서 2005년 검정본의 실체를 밝힌다’ 기자회견" },
                    { date: "03. 18", text: "일본 역사왜곡문제 해결을 위한 한일 시민단체 연대집회(서울)" },
                    { date: "04. 05 ~ 06", text: "일본 문부성 검정결과 발표에 대한 기자회견 및 항의집회" },
                    { date: "04. 09", text: "일본 교과서 역사왜곡 규탄 대국민 집회" },
                    { date: "04. 11", text: "일본 교과서 분석 심포지엄" },
                    {
                        date: "05. 26",
                        text: "『한중일이 함께 만든 동아시아 3국의 근현대사-미래를 여는 역사』 (한겨레신문사) 출판 기자회견 및 출판기념회",
                    },
                    { date: "06. 09", text: "후소샤 교과서 불채택을 위한 국제심포지엄(서울)" },
                    { date: "06. 10", text: "후소샤 교과서 불채택을 위한 민-관-정 네트워크 지자체 방문(전국)" },
                    {
                        date: "06~08월",
                        text: "후소샤 교과서 불채택을 위한 일본캠페인(일본 도쿄, 오사카, 히로시마, 미요시시, 에히메, 홋카이도, 카가와, 교토)",
                    },
                    {
                        date: "07. 05 ~ 08. 15",
                        text: "일본 신문 의견광고 게재를 위한 국민모금운동 및 후소샤 교과서 채택 저지 의견광고 게재(총 10개 신문사, 14회 게재)",
                    },
                    { date: "07~08월", text: "후소샤 교과서 불채택을 위한 국내캠페인 전시회(전국)" },
                    {
                        date: "08. 04 ~ 10",
                        text: "제4회 한중일 청소년 역사체험캠프(중국 베이징) “광복 60주년-한·중·일을 하나로! 평화로! 미래로!”",
                    },
                    { date: "11. 03 ~ 06", text: "2005년 후소샤 교과서 불채택운동 평가 심포지엄(강화도)" },
                ],
            },
            {
                year: "2006",
                list: [
                    { date: "01. 06 ~ 09", text: "제4회 역사인식과 동아시아 평화포럼 베이징대회(중국 베이징)" },
                    { date: "02. 23", text: "2006년도 정기대표자회의(한국노총 중회의실)" },
                    { date: "04. 28", text: "창립 5주년 기념 심포지엄 ‘현대중국의 역사교과서 - 소외되는 한국사’" },
                    { date: "05. 03", text: "동북아 평화실현을 위한 대일행동네트워크 발족" },
                    {
                        date: "08. 03 ~ 10",
                        text: "제5회 한중일 청소년 역사체험캠프(일본 오키나와) “오키나와로부터 아시아의 평화로”",
                    },
                    { date: "08. 12 ~ 15", text: "8·15광복 61주년, 일본의 군국주의 우경화 규탄 공동행동 및 전시회" },
                    {
                        date: "09. 23",
                        text: "동아시아 역사인식 공유를 위한 국제심포지엄 ‘역사대화를 위한 한일시민협력 과제와 전망’(서울)",
                    },
                    { date: "11. 02 ~ 06", text: "제5회 역사인식과 동아시아 평화포럼 교토대회(일본 교토)" },
                    {
                        date: "11. 25",
                        text: "동아시아 역사인식 공유를 위한 국제심포지엄 “역사대화의 경험공유와 동아시아 협력모델 찾기”(서울)",
                    },
                    {
                        date: "12. 16",
                        text: "동아시아 역사인식 공유를 위한 국제심포지엄 “동아시아 역사갈등을 바라보는 다섯 가지 시선”(서울)",
                    },
                ],
            },
            {
                year: "2007",
                list: [
                    {
                        date: "01. 12",
                        text: "일본의 과거청산을 요구하는 국제연대협의회 한국위원회 워크숍(14:00 한국노총)",
                    },
                    {
                        date: "01. 19 ~ 21",
                        text: "일본의 과거청산을 요구하는 국제연대협의회 코디네이터 회의(대만 타이페이)",
                    },
                    { date: "01. 31", text: "『어린이를 위한 미래를 여는 역사 1. 2권』 출판(한겨레출판사)" },
                    { date: "02.", text: "한국의 역사교육 및 교과서 문제 대응을 위한 ‘역사교육연대회의’ 발족" },
                    { date: "02. 27", text: "2007년도 정기대표자회의(역사문제연구소)" },
                    { date: "03. 12", text: "일본의 과거청산을 요구하는 국제연대협의회(한국정신대연구소)" },
                    {
                        date: "05. 29 ~ 06. 01",
                        text: "역사 및 평화교육 네트워크 아젠더개발 전략회의 및 전문가 강연회-평화를 위한 역사교육 연대활동 활성화 방안 모색",
                    },
                    { date: "05. 29 ~ 06. 12", text: "한일미디어강좌 “평화? 상상력!” · 작은 영화제" },
                    { date: "06. 11", text: "『중국은 왜 고구려를 탐낼까 3권』 출판(한솔수북)" },
                    {
                        date: "08. 07 ~ 10",
                        text: "제6회 한중일 청소년 역사체험캠프(한국 제주도) “전후 역사와 동아시아 평화 만들기”",
                    },
                    { date: "09. 14 ~ 18", text: "제6회 역사인식과 동아시아 평화포럼 서울대회(한국 서울)" },
                    { date: "11. 02 ~ 04", text: "난징대학살 70주년 국제심포지엄 “전쟁 시기 민간인 학살”(서울)" },
                ],
            },
            {
                year: "2008",
                list: [
                    { date: "01. 24 ~ 28", text: "제20차 한중일3국공동역사교재편찬위원회 동경회의(일본 도쿄)" },
                    { date: "02. 22", text: "2008년도 정기총회(역사문제연구소)" },
                    { date: "05. 02 ~ 06", text: "일본평화기행’헌법9조에서 동아시아 평화 찾기’(일본 도쿄)" },
                    { date: "06. 05", text: "학술토론회―뉴라이트의 “위험한 교과서” 바로 읽기" },
                    { date: "06. 05 ~ 26", text: "‘한일관계와 동북아의 미래’연속강좌 및 국제심포지엄(서울)" },
                    { date: "06. 14", text: "동아시아사 교육 국제심포지엄 개최" },
                    {
                        date: "08. 06 ~ 11",
                        text: "제7회 한중일 청소년 역사체험캠프(중국 난징) “난징에서 생각하는 동아시아 화해와 평화”",
                    },
                    { date: "08. 29", text: "독도관련 긴급정책토론회 ‘독도문제 해결, 어떻게 할 것인가?’" },
                    {
                        date: "10. 02 ~ 05",
                        text: "제5회 일본의 과거청산을 요구하는 국제연대협의회 헤이그대회(네덜란드 헤이그)",
                    },
                    { date: "11. 06 ~ 09", text: "제7회 역사인식과 동아시아 평화포럼 베이징대회(중국 베이징)" },
                    { date: "12. 13 ~ 14", text: "2009년 교과서채택에 대비한 교과서 교류회(일본 오사카)" },
                    { date: "12. 26 ~ 28", text: "‘동아시아사’교육 활성화를 위한 한중일 교사 교류회(서울)" },
                ],
            },
        ],
    },
];

export default function History() {
    const [activeId, setActiveId] = useState(items[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActiveId(e.target.id);
                });
            },
            { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }, // 상단 고정헤더/가시영역 보정
        );
        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <SubBanner banner={subBannerHistory} title={`한중일 3국 <br/>공동역사교재 편찬`} />
            <div className="p-[40px_20px_60px] md:p-[60px_28px_80px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[18px] text-[#666] md:text-[20px] xl:w-[680px]">
                        역사왜곡에 대한 비판만이 아닌 대안 제시로 한중일 3국 시민사회, 학계가 공동으로 기획하고 집필한
                        세계 최초의 동아시아 공동역사교재 『미래를 여는 역사』를 출간했습니다.
                        <br />
                        <br />
                        『미래를 여는 역사』는 2002년부터 4년간의 작업을 거쳐 2005년 출간되었으며, 침략과 전쟁으로
                        얼룩졌던 과거의 역사를 반성하고 평화로운 동아시아의 미래를 지향하는 내용을 담고 있습니다. 수업에
                        활용할 수 있도록 『미래를 여는 역사 수업실천사례집』을 제작, 만화 『어린이를 위한 미래를 여는
                        역사』(1~3권)를 출간했습니다. <br />
                        <br />
                        2012년 5월에는 『미래를 여는 역사』의 후속으로 3국의 일반시민을 대상으로 한 공동역사교재
                        『한중일이 함께 쓴 동아시아 근현대사』 1, 2를 출간했고, 이어 세계인을 위해 『미래를 여는 역사』,
                        『한중일이 함께 쓴 동아시아 근현대사』의 영문판도 출간했습니다.
                        <br />
                        <br />
                        『미래를 여는 역사』와 『한중일이 함께 쓴 동아시아 근현대사』 1, 2의 성과를 바탕으로 세번째
                        공동역사교재 『미래를 여는 역사』를 2025년 8월에 출간했습니다.
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1360px] xl:flex xl:items-start xl:gap-[14px]">
                <div className="sticky top-[60px] z-[10] bg-white xl:w-[360px]">
                    <ScrollArea>
                        <ul className="flex w-max gap-[40px] p-[20px] md:px-[28px] xl:w-full xl:flex-col xl:p-[120px_126px_120px_0]">
                            {items.map((item, idx) => (
                                <li key={`history_tab_${idx}`}>
                                    <Link
                                        href={`#${item.id}`}
                                        className={`relative text-[20px] font-[700] text-[#999] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-2 after:opacity-0 md:text-[28px]${
                                            activeId === item.id ? " text-primary-2 after:opacity-100" : ""
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <div className="flex flex-col gap-[60px] p-[40px_20px_120px] md:px-[28px] xl:flex-1 xl:p-[120px_0_160px]">
                    {items.map((item, idx) => (
                        <div key={`history_content_${idx}`} id={item.id} className="scroll-mt-[60px]">
                            <h3 className="border-b-2 border-primary-2 pb-[8px] text-[24px] font-[700] text-primary-2 md:text-[32px]">
                                {item.title}
                            </h3>
                            {item.history && (
                                <ul className="flex flex-col gap-[60px] pt-[24px] md:gap-[80px] md:pt-[40px]">
                                    {item.history.map((history, idx) => (
                                        <li
                                            key={`history_list_${idx}`}
                                            className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start xl:gap-0"
                                        >
                                            <h4 className="font-gmarket text-[32px] font-[700] md:text-[48px] xl:w-[200px]">
                                                {history.year}
                                            </h4>
                                            <div className="flex flex-col gap-[16px] xl:flex-1">
                                                {history.list.map((list, idx) => (
                                                    <div
                                                        key={`history_list_item_${idx}`}
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
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
