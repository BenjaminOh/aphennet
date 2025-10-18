import subBannerTimeline from "@/assets/images/user/subBannerTimeline.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

interface Item {
    date: string;
    content: string;
}

const items: Item[] = [
    {
        date: "1993. 08. ~ 1995. 02.",
        content: `<p class="text-[#666]">자민당 전후 총결산을 위한 ‘역사검토위원회’ 활동</p>`,
    },
    {
        date: "1997. 01.",
        content: `<p class="font-[700]">새로운 역사 교과서를 만드는 모임 결성</p>`,
    },
    {
        date: "2000. 04.",
        content: `<p class="text-[#666]">검정 신청(후소샤판 교과서 신청, 『국민의 역사』 판매)</p>`,
    },
    {
        date: "2001. 03.",
        content: `<p class="font-[700]">새역모 『새로운 역사 교과서』 검정 통과 <br/>(새역모, 시판본 『새로운 역사 교과서』 발매)</p>`,
    },
    {
        date: "2001. 03. 14",
        content: `<p class="text-[#666]">한국 일본역사교과서개악저지운동본부 결성</p>`,
    },
    {
        date: "2001. 04. 23",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">한국 일본교과서바로잡기운동본부 결성, </span><br/>한일 시민연대 불채택 운동으로 채택률 0.039%(총 521권)로 저지. <br/>(후소샤판 교과서 2002~2005년까지 4년간 현장 사용)</p>`,
    },
    {
        date: "2002. 04. 09",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">고교용 메이세이샤(명성사)의 『최신 일본사』 검정 통과</span><br/>(고교용 교과서에 독도 영유권 최초 기술)</p>`,
    },
    {
        date: "2003. 09. 07",
        content: `<p class="text-[#666]">일본교과서바로잡기운동본부, <span class="font-[700] text-[#222]">아시아평화와역사교육연대</span>로 개칭</p>`,
    },
    {
        date: "2004. 04.",
        content: `<p class="text-[#666]">중학교용 역사 교과서 검정 신청</p>`,
    },
    {
        date: "2005. 04. 05",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">후소샤판 『새로운 역사 교과서』 검정 통과 한·중·일 연대 불채택 운동</span><br/>(0.39% 채택률. 중·고 일관교 등에서 역사 4,912권, 공민 2,338권(0.19%),<br/>2006~2009년까지 사용 예정이었으나 2011년까지 가능)</p>`,
    },
    {
        date: "2005. 05.",
        content: `<p class="text-[#666]">한·중·일 공동 부교재 『미래를 여는 역사』 발간</p>`,
    },
    {
        date: "2008. 04.",
        content: `<p class="font-[700]">신학습지도요령 실시 지연에 따른 임시(2년용) 검정 신청, <br/>지유샤판 중학교 역사 교과서 검정 신청</p>`,
    },
    {
        date: "2008. 07. 15",
        content: `<p class="text-[#666]">2012년 시행 중학교 학습지도요령 해설서 발표(독도 영유권 명시)</p>`,
    },
    {
        date: "2009. 01.",
        content: `<p class="font-[700]">새역모, ‘근린제국 조항’ 삭제 요구</p>`,
    },
    {
        date: "2009. 03. 09",
        content: `<p class="text-[#666]">고등학교용 학습지도요령 발표</p>`,
    },
    {
        date: "2009. 04. 09",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">새역모의 지유샤판 중학교 역사 교과서 검정 통과 발표</span><br/>(2010~2011년 현장 사용)</p>`,
    },
    {
        date: "2009. 07.",
        content: `<p class="text-[#666]">고등학교 학습지도요령 해설서 발표</p>`,
    },
    {
        date: "2010. 04.",
        content: `<p class="text-[#666]">2012년부터 사용할 교과서 검정 신청 교육개선모임 측 이쿠호샤<br/>(育鵬社, 후소샤 자회사)를 통해 중학교 교과서 신청 초등학교 교과서 <br/>검정 발표. 4개 교과서에 문부과학성 독도 관련 지도 수정 요청</p>`,
    },
    {
        date: "2011. 03. 30",
        content: `<p class="text-[#666]">중학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2011. 11. 01",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">일본 문부성 발표 </span><br/>- 역사 3.8% : 이쿠호샤 3.7%, 지유샤 0.1% <br/>- 공민 4.1% : 이쿠호샤 4.0%, 지유샤 0.1%</p>`,
    },
    {
        date: "2012. 06.",
        content: `<p class="text-[#666]">한·중·일 공동 부교재 [한·중·일이 함께 쓴 동아시아 근현대사] 출판</p>`,
    },
    {
        date: "2015. 03.",
        content: `<p class="text-[#666]">한·중·일 공동 부교재 3단계 시작</p>`,
    },
    {
        date: "2015. 04. 06",
        content: `<p class="text-[#666]">중학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2015. 04.",
        content: `<p class="font-[700]">일본 역사왜곡에 대해 국제 공동 서명 운동 진행</p>`,
    },
    {
        date: "2015. 10. 30",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">일본 문부성 발표 </span><br/>- 역사 : 이쿠호샤 6.8% <br/>- 공민 : 이쿠호샤 5.7%</p>`,
    },
    {
        date: "2015. 12. 28",
        content: `<p class="text-[#666]">2015년 한·일 일본군 위안부 협상 타결</p>`,
    },
    {
        date: "2016. 03. 18",
        content: `<p class="text-[#666]">고등학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2017. 01. 23",
        content: `<p class="text-[#666]">일본 신 교과서 검정 기준(골자) 발표</p>`,
    },
    {
        date: "2017. 01. 31",
        content: `<p class="font-[700]">일본 학습지도요령안 개정 발표</p>`,
    },
    {
        date: "2017. 02. 14",
        content: `<p class="font-[700]">일본 의무제 신학습지도요령안 발표</p>`,
    },
    {
        date: "2017. 03. 24",
        content: `<p class="text-[#666]">고등학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2017. 03.",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">일본 의무제 신학습지도요령안 결정</span><br/>(2018년 초등학교 검정부터 적용)</p>`,
    },
    {
        date: "2018. 03. 30",
        content: `<p class="text-[#666]"><span class="font-[700] text-[#222]">고등학교 신학습지도요령 발표</span><br/>(‘독도가 일본 고유 영토’라는 정부 입장이 반영)</p>`,
    },
    {
        date: "2019. 02. 25",
        content: `<p class="text-[#666]">이나다 도모미 자민당 필두부 간사장 발언<br/>(‘근린제국 조항’에서 한국 제외 선언)</p>`,
    },
    {
        date: "2019. 03. 26",
        content: `<p class="text-[#666]">소학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2020. 03. 24",
        content: `<p class="font-[700]">중학교 교과서 검정 결과 발표</p>`,
    },
    {
        date: "2020. 09.",
        content: `<p class="text-[#666]">- 역사 : 이쿠호샤 1% <br/>- 공민 : 이쿠호샤 0.4%</p>`,
    },
    {
        date: "2021. 03. 30",
        content: `<p class="text-[#666]">고등학교 필수과목(‘역사 총합’, ‘지리 총합’ 등) <br/>교과서 검정 발표 지유샤판 중학교 『역사』 추가 검정 통과</p>`,
    },
    {
        date: "2022. 03. 29",
        content: `<p class="text-[#666]">고등학교 선택과목 교과서 검정 발표</p>`,
    },
    {
        date: "2023. 03. 28",
        content: `<p class="text-[#666]">소학교 검정 결과 발표</p>`,
    },
    {
        date: "2024. 03. 22",
        content: `<p class="text-[#666]">중학교 검정 결과 발표 <br/><span class="font-[700] text-[#222]">&#8594; 04. 19. 레이와 『역사』 추가 검정 통과 발표</span></p>`,
    },
    {
        date: "2025. 03. 25",
        content: `<p class="text-[#666]">고등학교 사회과 필수과목 검정 결과 발표</p>`,
    },
];

export default function Timeline() {
    return (
        <>
            <SubBanner
                banner={subBannerTimeline}
                titleClassName="xl:max-w-[480px] xl:p-[40px]"
                title={`<p class="text-white text-[24px] md:text-[36px]">현재까지 일본 사회과 <br/>교과서 검정 경과와 배경</p>`}
                subTitle={`일본의 우익교과서 새역모 계열 <br/>교과서 출현 (제3차 교과서 공격)`}
            />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="flex flex-col gap-[16px] md:gap-[20px] xl:w-[800px]">
                        {items.map((item, idx) => (
                            <div
                                key={`timeline_item_${idx}`}
                                className="relative flex flex-col gap-[4px] pl-[16px] before:absolute before:left-0 before:top-[10px] before:size-[8px] before:rounded-full before:bg-[#23AA4B] md:flex-row md:gap-[16px] xl:pl-[24px]"
                            >
                                <p className="text-[18px] font-[700] md:min-w-[224px] md:text-[20px]">{item.date}</p>
                                <div
                                    className="text-[18px] md:flex-1"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
