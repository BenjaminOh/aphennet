import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import jointTextbookImg1 from "@/assets/images/user/jointTextbookImg1.jpg";
import jointTextbookImg2 from "@/assets/images/user/jointTextbookImg2.jpg";
import jointTextbookImg3 from "@/assets/images/user/jointTextbookImg3.jpg";
import subBannerJointTextbook from "@/assets/images/user/subBannerJointTextbook.jpg";
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
                year: "2003",
                list: [
                    { date: "10. 30", text: "‘일본역사교과서개악저지운동본부’ 결성 제안" },
                    { date: "10. 30", text: "‘미래를 여는 역사’ 영상자료 각 시도 교육청 및 해외공관 배포" },
                    { date: "11. 24", text: "‘한중일 공동 역사부교재 편찬 작업 개시’ 한중일 공동기자회견 (서울)" },
                ],
            },
            {
                year: "2005",
                list: [
                    {
                        date: "05. 26",
                        text: "「한중일이 함께 만든 동아시아 3국이 근현대사 - 미래를 여는 역사」 <br/>(한겨레신문사) 출판 기자회견 및 출판기념회",
                    },
                ],
            },
            {
                year: "2010",
                list: [
                    {
                        date: "12. 30",
                        text: "「한중일이 함께 만든 동아시아 3국이 근현대사 - 미래를 여는 역사」 영어판 출간",
                    },
                ],
            },
            {
                year: "2012",
                list: [
                    {
                        date: "05. 29",
                        text: "「한중일이 함께 쓴 근현대사」 1, 2 출간(휴머니스트출판사)",
                    },
                    {
                        date: "06. 20",
                        text: "『한중일이 함께 쓴 동아시아 근현대사』 출간 기념 특강 <br/>‘이제, 3국의 시선으로 동아시아를 읽는다!’",
                    },
                    {
                        date: "06. 22",
                        text: "역사인식 공유를 위한 동아시아 국제심포지엄 <br/>‘동아시아 근현대사를 어떻게 기술할 것인가 <br/>– 한중일이 함께 쓴 동아시아 근현대사』 출판을 기념하며’",
                    },
                ],
            },
            {
                year: "2015",
                list: [
                    {
                        date: "03. 22",
                        text: "한중일 공동부교재 3단계 작업 개시",
                    },
                ],
            },
            {
                year: "2025",
                list: [
                    {
                        date: "08. 11",
                        text: "「평화를 여는 역사 - 한중일 3국이 함께 생각하는 동아시아의 미래」 출간 <br/>((주)휴머니스트출판그룹)",
                    },
                ],
            },
        ],
    },
    {
        title: "국내회의 연혁",
        id: "content2",
        history: [
            {
                year: "2002",
                list: [
                    { date: "04. 27", text: "제1회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 11", text: "제2회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 25", text: "제3회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 17", text: "제4회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 11", text: "제5회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 22", text: "제6회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2003",
                list: [
                    { date: "01. 24", text: "제7회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 08", text: "제8회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 16", text: "제9회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 23", text: "제10회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 24", text: "제11회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 17", text: "제12회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 07", text: "제13회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 19", text: "제14회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2004",
                list: [
                    { date: "01. 16", text: "제15회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 18", text: "제16회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 13", text: "제17회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 10", text: "제18회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 16", text: "제19회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 13", text: "제20회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 01", text: "제21회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 05", text: "제22회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 05", text: "제23회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 16", text: "제24회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 17", text: "제25회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 24", text: "제26회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 14", text: "제27회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 05", text: "제28회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 12", text: "제29회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 19", text: "제30회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 29", text: "제31회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2005",
                list: [
                    { date: "01. 15", text: "제32회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 07", text: "제33회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 04", text: "제34회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 03", text: "제35회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 27", text: "제37회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 11", text: "제38회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 04", text: "제39회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2006",
                list: [
                    { date: "05. 07", text: "제40회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 03", text: "제41회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 18", text: "제42회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 22", text: "제43회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 26", text: "제44회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 19", text: "제45회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2007",
                list: [
                    { date: "01. 09", text: "제46회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 11", text: "제47회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 04", text: "제48회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 13", text: "제49회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 01", text: "제50회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "6월 말", text: "제51회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 14", text: "제52회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 09", text: "제53회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 21", text: "제54회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 18", text: "제55회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2008",
                list: [
                    { date: "01. 17", text: "제56회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 19", text: "제57회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 30", text: "제58회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 20", text: "제59회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 18", text: "제60회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 22", text: "제61회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 14", text: "제62회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 28", text: "제63회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 12", text: "제64회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 29", text: "제65회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 14", text: "제66회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 29", text: "제67회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2009",
                list: [
                    { date: "01. 09", text: "제68회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "01. 31", text: "제69회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 17", text: "제70회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 18", text: "제71회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 19", text: "제72회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 10", text: "제73회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 30", text: "제74회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 03", text: "제76회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 15", text: "제75회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 22", text: "제77회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2010",
                list: [
                    { date: "01. 19", text: "제78회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 24", text: "제79회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 17", text: "제80회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 22", text: "제81회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 19", text: "제82회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 16", text: "제83회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 13", text: "제84회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 14", text: "제85회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 11", text: "제86회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 15", text: "제87회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2011",
                list: [
                    { date: "01. 07", text: "제88회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 10", text: "제89회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 11", text: "제90회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 13", text: "제91회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 11", text: "제92회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 10", text: "제93회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 24", text: "제94회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 15", text: "제95회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 17", text: "제96회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 06", text: "제97회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 04", text: "제98회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 02", text: "제99회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 05", text: "제100회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2012",
                list: [
                    { date: "02. 21", text: "제101회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 19", text: "제102회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 02", text: "제103회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 06", text: "제104회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 13", text: "제105회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 08", text: "제106회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 02", text: "제107회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 07", text: "제112회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 17", text: "제113회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2013",
                list: [
                    { date: "04. 04", text: "제114회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 09", text: "제115회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 24", text: "제116회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 25", text: "제117회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2014",
                list: [
                    { date: "06. 17", text: "제118회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 04", text: "제119회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2015",
                list: [
                    { date: "06. 13", text: "제120회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 24", text: "제121회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2016",
                list: [
                    { date: "05. 09", text: "제122회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 10", text: "제123회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 20", text: "제124회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 18", text: "제125회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 16", text: "제126회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 10", text: "제127회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 08", text: "제128회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2017",
                list: [
                    { date: "02. 28", text: "제129회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 06", text: "제130회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 08", text: "제131회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 19", text: "제132회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 22", text: "제133회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 09", text: "제134회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "12. 26", text: "제135회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2018",
                list: [
                    { date: "01. 05", text: "제136회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 12", text: "제137회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 23", text: "제138회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 19", text: "제139회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 18", text: "제140회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "06. 22", text: "제141회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 01", text: "제142회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 26", text: "제143회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2019",
                list: [
                    { date: "01. 15", text: "제144회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "01. 29", text: "제145회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 18", text: "제146회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "04. 29", text: "제147회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "05. 27", text: "제148회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "07. 02", text: "제149회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "08. 19", text: "제150회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "09. 17", text: "제151회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "10. 24", text: "제152회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "11. 29", text: "제153회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
            {
                year: "2020",
                list: [
                    { date: "01. 03", text: "제154회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "02. 06", text: "제155회 한중일3국공동역사교재편찬위원회 국내회의" },
                    { date: "03. 06", text: "제156회 한중일3국공동역사교재편찬위원회 국내회의" },
                ],
            },
        ],
    },
    {
        title: "국제회의 연혁",
        id: "content3",
        history: [
            {
                year: "2002",
                list: [
                    { date: "08. 23 ~ 25", text: "제1회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                    { date: "12. 20 ~ 23", text: "제2회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                ],
            },
            {
                year: "2003",
                list: [
                    { date: "02. 27", text: "제3회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "09. 08 ~ 09", text: "제4회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "11. 21 ~ 23", text: "제5회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                ],
            },
            {
                year: "2004",
                list: [
                    { date: "05. 27 ~ 29", text: "제6회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "08. 08 ~ 10", text: "제7회 한중일3국공동역사교재편찬위원회 국제회의(한국, 안양)" },
                    { date: "09. 20", text: "제8회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "10. 29 ~ 31", text: "제9회 한중일3국공동역사교재편찬위원회 국제회의(중국, 난징)" },
                ],
            },
            {
                year: "2005",
                list: [
                    { date: "01. 28 ~ 31", text: "제10회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "04. 17 ~ 19", text: "제11회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "10. 13 ~ 14", text: "제12회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "12. 07 ~ 09", text: "제13회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                ],
            },
            {
                year: "2006",
                list: [
                    { date: "01. 07 ~ 09", text: "제14회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "05. 14 ~ 15", text: "제15회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "11. 02 ~ 05", text: "제16회 한중일3국공동역사교재편찬위원회 국제회의(일본, 교토)" },
                ],
            },
            {
                year: "2007",
                list: [
                    { date: "04. 13 ~ 16", text: "제17회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "07. 20 ~ 22", text: "제18회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "09. 16 ~ 17", text: "제19회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                ],
            },
            {
                year: "2008",
                list: [
                    { date: "01. 24 ~ 28", text: "제20회 한중일3국공동역사교재편찬위원회 동경회의(일본, 도쿄)" },
                    { date: "06. 27 ~ 30", text: "제21회 한중일3국공동역사교재편찬위원회 국제회의(한국, 제주도)" },
                    { date: "11. 03 ~ 05", text: "제22회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                ],
            },
            {
                year: "2009",
                list: [
                    { date: "03. 20 ~ 23", text: "제23회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                    { date: "08. 27 ~ 31", text: "제24회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "11. 22 ~ 23", text: "제25회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                ],
            },
            {
                year: "2010",
                list: [
                    { date: "04. 02 ~ 05", text: "제26회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "06. 25 ~ 29", text: "제27회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "09. 10 ~ 13", text: "제28회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                    { date: "11. 21 ~ 24", text: "제29회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                    { date: "12. 28 ~ 30", text: "제30회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                ],
            },
            {
                year: "2011",
                list: [
                    { date: "03. 04 ~ 06", text: "제32회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "11. 28", text: "제34회 한중일3국공동역사교재편찬위원회 국제회의(중국, 북경)" },
                ],
            },
            {
                year: "2012",
                list: [{ date: "11. 26", text: "제35회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" }],
            },
            {
                year: "2014",
                list: [
                    { date: "05. 19", text: "제36회 한중일3국공동역사교재편찬위원회 국제회의(한국, 광주)" },
                    { date: "11. 04", text: "제37회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                ],
            },
            {
                year: "2015",
                list: [
                    { date: "03. 22", text: "제38회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "11. 02", text: "제39회 한중일3국공동역사교재편찬위원회 국제회의(일본, 오키나와)" },
                ],
            },
            {
                year: "2016",
                list: [
                    { date: "07. 02", text: "제40회 한중일3국공동역사교재편찬위원회 국제회의(중국, 항주)" },
                    { date: "10. 23", text: "제41회 한중일3국공동역사교재편찬위원회 국제회의(한국, 제주)" },
                ],
            },
            {
                year: "2017",
                list: [
                    { date: "04. 15 ~ 16", text: "제42회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "07. 29 ~ 30", text: "제43회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                    { date: "09. 11 ~ 12", text: "제44회 한중일3국공동역사교재편찬위원회 국제회의(중국, 난징)" },
                ],
            },
            {
                year: "2018",
                list: [
                    { date: "01. 20 ~ 21", text: "제45회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "06. 29 ~ 07. 02", text: "제46회 한중일3국공동역사교재편찬위원회 국제회의(한국, 춘천)" },
                    { date: "11. 24, 26", text: "제47회 한중일3국공동역사교재편찬위원회 국제회의(일본, 히로시마)" },
                ],
            },
            {
                year: "2019",
                list: [
                    { date: "03. 09 ~ 10", text: "제48회 한중일3국공동역사교재편찬위원회 국제회의(중국, 베이징)" },
                    { date: "07. 20 ~ 21", text: "제49회 한중일3국공동역사교재편찬위원회 국제회의(일본, 도쿄)" },
                    { date: "11. 03 ~ 05", text: "제50회 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" },
                ],
            },
            {
                year: "2020",
                list: [{ date: "01. 12 ~ 13", text: "제51차 한중일3국공동역사교재편찬위원회 국제회의(한국, 서울)" }],
            },
        ],
    },
    {
        title: "3단계 편찬위원회의 개최 경과",
        id: "content4",
        progress: [
            {
                title: "편집 회의",
                list: [
                    { date: "2015. 03.", content: "도쿄회의" },
                    { date: "2015. 11.", content: "오키나와회의" },
                    { date: "2016. 07.", content: "항저우회의" },
                    { date: "2016. 10.", content: "제주회의" },
                    { date: "2017. 04.", content: "북경회의" },
                    { date: "2017. 07.", content: "서울회의" },
                    { date: "2017. 09.", content: "난징회의" },
                    { date: "2018. 01.", content: "북경회의" },
                    { date: "2018. 06.", content: "춘천회의" },
                    { date: "2018. 11.", content: "히로시마회의" },
                    { date: "2019. 03.", content: "북경회의" },
                    { date: "2019. 07.", content: "도쿄회의" },
                    { date: "2019. 11.", content: "서울회의" },
                    { date: "2020. 01.", content: "서울회의" },
                ],
            },
            {
                title: "온라인 회의 (전체회의 및 편집대표자회의)",
                subtitle: "* 이후 온라인으로 분과회의(각부별)·전체회의·편집대표자회의 개최",
                list: [
                    { date: "2020. 10.", content: "전체회의 (온라인)" },
                    { date: "2021. 01.", content: "전체회의 (온라인)" },
                    { date: "2021. 04.", content: "전체회의 (온라인)" },
                    { date: "2021. 06.", content: "편집대표자회의 (온라인)" },
                    { date: "2021. 08.", content: "편집대표자회의 (온라인)" },
                    { date: "2021. 10.", content: "확대편집대표자회의 (온라인)" },
                    { date: "2022. 04.", content: "전체회의 (온라인)" },
                    { date: "2022. 06.", content: "편집대표자회의 (온라인)" },
                    { date: "2022. 11.", content: "편집대표자회의 (온라인)" },
                    { date: "2022. 12.", content: "편집대표자회의 (온라인)" },
                ],
            },
            {
                title: "대면회의+온라인회의(전체회의/편집대표자회의)",
                subtitle: "* 이후 대면과 온라인을 병용하여 전체회의·편집대표자회의 개최",
                list: [
                    { date: "2023. 11.", content: "부산회의 - 전체회의(대면)" },
                    { date: "2024. 08.", content: "편집대표자회의 (온라인)" },
                    { date: "2024. 10.", content: "편집대표자회의 (온라인)" },
                    { date: "2024. 11.", content: "장사회의 : 전체회의(대면+온라인)" },
                    { date: "2024. 12.", content: "편집대표자회의 (온라인)" },
                    { date: "2025. 01.", content: "편집대표자회의 (온라인)" },
                    { date: "2025. 01~03.", content: "온라인 분과회의 및 출판사 회의 개최" },
                    { date: "2025. 08.", content: "『평화를 여는 역사』 (한국), 『신·미래를 여는 역사』 (일본) 출간" },
                ],
            },
        ],
    },
];

export default function JointTextbook() {
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
            <SubBanner banner={subBannerJointTextbook} title={`한중일 3국 <br/>공동역사교재 편찬`} />
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
            <div className="mx-auto max-w-[1360px] p-[0_20px_80px] md:p-[0_28px_120px] xl:pb-0 min-[1400px]:px-0">
                <ul className="flex flex-col gap-[8px] rounded-[20px] bg-white p-[20px] shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)] md:flex-row xl:p-[40px]">
                    <li className="flex flex-col items-center gap-[12px] p-[20px_35px] md:flex-1 md:px-[7px] xl:gap-[24px]">
                        <Image src={jointTextbookImg1} alt="이미지" />
                        <p className="text-center text-[18px] font-[500] text-[#666] md:text-[20px]">
                            <span className="text-[#23AA4B]">1단계</span>
                            <br />
                            『미래를 여는 역사』
                        </p>
                    </li>
                    <li className="flex flex-col items-center gap-[12px] p-[20px_35px] md:flex-1 md:px-[7px] xl:gap-[24px]">
                        <Image src={jointTextbookImg2} alt="이미지" />
                        <p className="text-center text-[18px] font-[500] text-[#666] md:text-[20px]">
                            <span className="text-[#23AA4B]">2단계</span>
                            <br />
                            『한중일이 함께 쓴 동아시아 근현대사』 1, 2
                        </p>
                    </li>
                    <li className="flex flex-col items-center gap-[12px] p-[20px_35px] md:flex-1 md:px-[7px] xl:gap-[24px]">
                        <Image src={jointTextbookImg3} alt="이미지" />
                        <p className="text-center text-[18px] font-[500] text-[#666] md:text-[20px]">
                            <span className="text-[#23AA4B]">3단계</span>
                            <br />
                            『평화를 여는 역사』
                        </p>
                    </li>
                </ul>
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
                        <div
                            key={`history_content_${idx}`}
                            id={item.id}
                            className="scroll-mt-[140px] xl:scroll-mt-[100px]"
                        >
                            <h3 className="border-b-2 border-primary-2 pb-[8px] text-[24px] font-[700] text-primary-2 md:text-[32px]">
                                {item.title}
                            </h3>
                            <ul className="flex flex-col gap-[60px] pt-[24px] md:gap-[80px] md:pt-[40px]">
                                {item.history &&
                                    item.history.map((history, idx) => (
                                        <li
                                            key={`history_list_${idx}`}
                                            className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start xl:gap-0"
                                        >
                                            <h4 className="font-gmarket text-[32px] font-[700] leading-[1.2] md:text-[48px] xl:w-[200px]">
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
                                {item.progress &&
                                    item.progress.map((progress, idx) => (
                                        <li key={`progress_list_${idx}`}>
                                            <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                                                <div className="h-[36px] min-w-[36px] min-w-[48px] rounded-[8px_0_8px_0] bg-primary-2 px-[5px] text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:h-[48px] md:text-[24px] md:leading-[48px]">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-[20px] font-[700] md:text-[28px]">
                                                    {progress.title}
                                                </p>
                                            </div>
                                            {progress.subtitle && (
                                                <p className="pt-[8px] font-[500] text-[#666] md:pt-[12px] md:text-[18px]">
                                                    {progress.subtitle}
                                                </p>
                                            )}
                                            <div className="flex flex-col gap-[16px] pt-[24px] md:gap-[20px] xl:flex-1">
                                                {progress.list.map((list, idx) => (
                                                    <div
                                                        key={`progress_list_item_${idx}`}
                                                        className="relative flex gap-[16px] pl-[16px] before:absolute before:left-0 before:top-[10px] before:size-[8px] before:rounded-full before:bg-[#23AA4B] md:gap-[16px] xl:pl-[24px]"
                                                    >
                                                        <p className="text-[18px] font-[700] md:min-w-[106px] md:min-w-[164px] md:text-[20px]">
                                                            {list.date}
                                                        </p>
                                                        <p
                                                            className="flex-1 text-[18px] font-[700]"
                                                            dangerouslySetInnerHTML={{ __html: list.content }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
