import Image from "next/image";

import subBannerTextbook from "@/assets/images/user/subBannerTextbook.jpg";
import textbookBg from "@/assets/images/user/textbookBg.jpg";
import textbookImg1 from "@/assets/images/user/textbookImg1.jpg";
import textbookImg2 from "@/assets/images/user/textbookImg2.jpg";
import textbookImg3 from "@/assets/images/user/textbookImg3.jpg";
import textbookImg4 from "@/assets/images/user/textbookImg4.jpg";
import textbookImg5 from "@/assets/images/user/textbookImg5.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function Textbook() {
    return (
        <>
            <SubBanner banner={subBannerTextbook} title={`일본 교과서 <br/>역사왜곡 대응`} />
            <div className="p-[40px_20px_80px] md:p-[60px_28px_100px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="xl:w-[680px]">
                        <p className="text-[28px] font-[700] md:text-[52px]">
                            역사를 바라보는 것은 <br />
                            <span className="text-primary">미래세대를 위한 의무</span>입니다!
                        </p>
                        <p className="pt-[24px] text-[18px] text-[#666] md:pt-[48px] md:text-[20px]">
                            2001년 ‘새로운 역사교과서를 만드는 모임(새역모)’의 후소샤 교과서가 등장하면서 일본뿐만
                            아니라 한국 사회에도 큰 변화가 있었다. <br />
                            역사 인식의 문제를 진지하게 고민하게 하고 역사 인식의 문제를 연구의 영역이 아닌 시민 운동의
                            영역으로 이끌어 낸 장본인(?)이 바로 후소샤 교과서였기 때문이다. <br />
                            <br />
                            또한 시민 운동이 한·일, 한·중·일 시민 연대로 확장되면서 정부 차원에서 결코 가능하지 않았던
                            역사 갈등을 해결하기 위한 실마리를 만들어 가기 시작했다는 점에서 한국 사회의 질적 변화를
                            가져왔다고 할 수 있다. <br />
                            그리고 2001년 후소샤 교과서 채택률을 0.039% 거의 제로 퍼센트로 무력화시켰다는 것 역시 시민
                            운동의 ‘힘’을 보여 준 중요한 쾌거였다. 이러한 한·중·일 시민 연합 운동의 ‘힘’은 일본의
                            역사왜곡을 막을 수 있는 길은 정부가 아닌 풀뿌리 시민 운동이라는 점을 다시 한번 확인할 수
                            있는 계기가 됐다.
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative md:pt-[60px]">
                <div className="absolute left-1/2 top-0 h-[60px] w-[2px] -translate-x-1/2 bg-primary opacity-0 md:opacity-100" />
                <div className="relative p-[60px_20px] md:p-[140px_28px] min-[1400px]:p-[160px_0_120px]">
                    <div className="absolute left-1/2 top-0 z-[1] h-[60px] w-[2px] -translate-x-1/2 bg-[#ddd] opacity-0 md:opacity-100" />
                    <Image src={textbookBg} alt="배경이미지" fill className="object-cover" />
                    <div className="relative mx-auto max-w-[1360px] rounded-[8px] bg-white p-[20px] md:rounded-[20px] md:p-[40px] xl:p-[60px]">
                        <p className="text-[20px] font-[700] md:text-center md:text-[24px]">
                            “2001년도의 핵심적인 활동은 한국민들에게 일본 교과서 왜곡의 실상을 알리고 이 문제 해결을
                            위한 동참을 호소하고, <br />
                            일본의 시민단체들과 연대하여 잘못된 교과서의 채택을 저지하는 일이었다”
                        </p>
                        <p className="pt-[20px] text-[18px] font-[500] text-[#666] md:pt-[48px] md:text-[20px]">
                            일본의 교과서 왜곡은 비단 한국만의 문제도 아니며, 일본만의 문제도 아니기 때문에 한·일 양국
                            시민 단체들의 연대 활동은 운동본부(현 아시아평화와역사교육연대) 활동의 기조를 이룬다고 볼 수
                            있다.
                            <br />
                            <br />
                            그 결과 일본 교과서 개악을 규탄하기 위한 범 아시아 행동의 날과 한·일 공동 시위가 개최됐다.
                            한국에서는 교과서 개악에 항의하기 위한 사이버 시위로 인해 일본 문부과학성, 산케이신문,
                            후쇼사 등 일본의 대표적인 기관의 홈페이지가 마비됐다. 6월에는 교과서 관련 아시아 연대 집회에
                            참여했고, 동시에 73개국 125개 도시에서 일본 교과서 바로잡기 ‘세계 행동의 날’을 개최하기도
                            했다. 일본 도쿄에서 약 500여 명이 문부과학성에서 ‘인간 띠 잇기’ 행사를 진행하였으며, 서울과
                            부산 등에서 약 2,000여 명이 모인 가운데 집회를 진행했다. 또한 10월 15일 일본의 고이즈미 총리
                            방한을 반대하는 전 국민 규탄 대회를 진행한 바 있다.
                            <br />
                            또한 일본의 교과서 왜곡에 대한 전 국민적 동참을 위해 전국적인 서명 운동을 전개했다. 초기
                            서명 운동이 일본 교과서 왜곡의 시정을 요구하는 것이었다면, 일본의 중학교 교과서 검정 통과가
                            확정된 이후, 잘못된 교과서의 채택을 거부하는 불채택 요구가 서명 운동의 중심이 됐다. 이러한
                            서명 운동은 운동본부가 주관하여 1만 명의 서명을 받았으며, 교총 등 관련 단체 등이 참여하여 총
                            35만 명의 서명을 일본대사관에 전달했다. <br />
                            이러한 서명 운동의 성과는 일본 신문에 한국민의 의견을 싣기 위한 광고 운동으로 결실을 맺었다.
                            운동본부는 무관심한 일본 언론들로 인해 일본의 교과서 왜곡의 진상을 알지 못하고 있는 대다수
                            일본 시민들에게 직접적으로 호소하기 위한 의견 광고 싣기 운동을 전개해 약 2,600만 원의 성금을
                            모아 9월과 10월에 걸쳐 일본의 아사히신문과 한국의 문화신문에 의견 광고를 실었다.
                            <br />
                            <br />
                            아시아역사연대 활동의 또 다른 한 축은 출판 및 학술, 홍보 활동이다. 제1차 심포지엄은 일본
                            교과서 왜곡 문제를 중심으로, 제2차 심포지엄은 한국 교과서를 중심으로 진행되었다. 학술
                            심포지엄의 주제는 향후 교과서 운동의 방향과도 맞물리는 것으로, 일본의 교과서 왜곡뿐 아니라
                            한국 교과서의 내용이나 형식도 점차 바뀌어야 한다는 단체 활동의 향후 목적이 내재돼 있다. 이뿐
                            아니라 출판 활동에도 힘을 쏟아 타와라 요시후미의 저술 『위험한 교과서』를 번역·출판했으며,
                            교과서바로잡기운동본부 편저로 『문답으로 읽는 일본의 교과서 역사왜곡』을 출판해서 일본의
                            교과서 역사왜곡을 일반인이 읽기 쉽게 펴냈다.
                        </p>
                    </div>
                </div>
            </div>
            <ul className="mx-auto flex max-w-[1360px] flex-col gap-[60px] p-[80px_20px] md:gap-[80px] md:p-[120px_28px_160px] min-[1400px]:px-0">
                <li className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start">
                    <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                        <div className="size-[36px] rounded-[8px_0_8px_0] bg-primary-2 text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:size-[48px] md:text-[24px] md:leading-[48px]">
                            1
                        </div>
                        <p className="text-[20px] font-[700] md:text-[28px]">민관정 네트워크</p>
                    </div>
                    <div className="xl:w-[856px]">
                        <div className="overflow-hidden rounded-[8px]">
                            <Image src={textbookImg1} alt="이미지" />
                        </div>
                        <p className="pt-[16px] text-[18px] font-[500] text-[#666] md:pt-[28px] md:text-[20px]">
                            2005년 교과서 운동의 기본 축은 한·일 자매 결연 도시를 중심으로 한국 내 지역 시민 단체와
                            지방자치제(구의회/시의회/시교육위원회), 그리고 국회의원을 엮는 민-관-정 네트워크를 만드는
                            일부터 시작됐다. <br />
                            <br />
                            민-관-정 네트워크의 필요성은 일본뿐 아니라 국내에서도 필요했는데, 교과서 운동을 각 지역으로
                            확산하기 위해서 각 지역 단체들의 참여가 필수적이었고, 각 지역 단체들은 역사왜곡 저지라는
                            대의만으로는 사업을 지속하기 어렵기 때문에 일본과 자매 결연돼 있는 지자체들과의 연계를 통해
                            구체적인 성과를 얻는 것이 필요했다. <br />
                            <br />
                            이를 효과적으로 엮어 내기 위해 6월 국제 심포지엄에 참여한 일본의 각 지역 활동가들이 한국의
                            자매 결연 도시의 지자체와 시민 단체를 방문하는 것을 기획했다. 민-관-정 네트워크는 이후
                            사업에도 중요한 근간이 되었는데, 일본 각 지역 교육위원회에 불채택 요청서 보내기 운동, 일본
                            캠페인에도 자매 결연 도시의 시민 단체와 지자체가 큰 역할을 담당했다. <br />
                            그중에서도 서초구(스기나미구)와 동대문구(도시마구), 안양시(사이타마현)의 경우는 해당 지역구
                            국회의원인 시의원이 일본을 직접 방문하는 등 보다 강화된 연대 활동을 진행했다.
                        </p>
                    </div>
                </li>
                <li className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start">
                    <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                        <div className="size-[36px] rounded-[8px_0_8px_0] bg-primary-2 text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:size-[48px] md:text-[24px] md:leading-[48px]">
                            2
                        </div>
                        <p className="text-[20px] font-[700] md:text-[28px]">일본캠페인</p>
                    </div>
                    <div className="xl:w-[856px]">
                        <div className="overflow-hidden rounded-[8px]">
                            <Image src={textbookImg2} alt="이미지" />
                        </div>
                        <p className="pt-[16px] text-[18px] font-[500] text-[#666] md:pt-[28px] md:text-[20px]">
                            일본 캠페인은 요청 행동과 심포지엄이 중심이다. 지역 교육위원회를 방문해 후소샤 교과서 채택이
                            한·일 관계에 어떤 악영향을 끼치는지를 설명하고, 한·일의 시민 단체들이 진정으로 원하는 것은
                            한·일 간의 평화라는 것을 강조했다. <br />
                            또한 한·중·일이 공동으로 집필한 『미래를 여는 역사』 일본어판을 각 교육위원회마다
                            기증하였는데, 이것은 시민 단체들이 비판만 하는 것이 아니라 대안을 제시하고 동아시아 역사
                            인식을 공유하기 위해 노력하고 있음을 알리는 중요한 계기가 됐다. <br />
                            <br />
                            일본 캠페인은 집중적으로 역량을 투입한 만큼 성과도 컸다. 가장 큰 성과는 무관심으로 일관했던
                            일본 언론들을 움직이는 데 일본 캠페인단의 역할이 컸다는 점이다. 인구가 작은 지역일수록
                            한국의 방일단의 활동이 지역 언론의 보도거리가 됐고, 이것을 계기로 교과서 문제를 다루는
                            계기가 되었다고 한다. <br />
                            또한 방일 캠페인단의 지역 교육위원회의 방문 자체가 해당 교육위원회에게 무언의 압력으로
                            작용했다. <br />
                            <br />또 다른 성과는 일본 캠페인을 통해 한·일 시민 단체들과의 연대 활동이 긴밀해졌다는
                            점이다. <br />
                            이미 여러 번에 걸친 만남과 일본 현지 캠페인을 통한 활동으로 서로에 대한 애정과 교과서 문제에
                            대한 깊은 동지애를 느끼게 된 것이다.
                        </p>
                    </div>
                </li>
                <li className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start">
                    <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                        <div className="size-[36px] rounded-[8px_0_8px_0] bg-primary-2 text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:size-[48px] md:text-[24px] md:leading-[48px]">
                            3
                        </div>
                        <p className="text-[20px] font-[700] md:text-[28px]">국내캠페인</p>
                    </div>
                    <div className="xl:w-[856px]">
                        <div className="overflow-hidden rounded-[8px]">
                            <Image src={textbookImg3} alt="이미지" />
                        </div>
                        <p className="pt-[16px] text-[18px] font-[500] text-[#666] md:pt-[28px] md:text-[20px]">
                            2005년 한국은 여러 측면에서 한·일 관계를 새롭게 정리해야 할 필요성이 있었다. <br />
                            을사조약 100주년, 해방 60주년, 한·일 협정 40주년이 중첩된 상황에서 일본군 ‘위안부’ 문제,
                            강제 동원 문제 등 한·일 문제를 중심 주제로 다루고 있는 단체들은 각기 다양한 영역 속에서
                            활동해 왔다. <br />
                            <br />
                            그런 점에서 대일 관련 단체들이 중심이 돼 교과서 운동을 이끌어 갔던 2001년과는 달리 2005년
                            교과서 운동은 중심 주체들이 일반 시민 단체들이 참여하는 형태로 구성, 진행될 수밖에 없는
                            시대적 상황이었다. <br />
                            주로 국내 캠페인은 일본 역사왜곡 관련 전시회를 중심으로 서울과 부산, 광주 등 총 11개 광역
                            도시, 24개 지역에서 7월과 8월에 걸쳐 진행됐다. <br />
                            <br />
                            참여하는 단체들이 통일 연대나 청년 단체들이 중심이 됐는데, 이것이 가능했던 것은 독도 문제와
                            역사왜곡 문제로 각 지역의 관심이 예상보다 높았고, 중앙에서 모든 전시물과 홍보물을 지원하는
                            형식은 각 지역에서 큰 어려움 없이 받아들이기 쉬운 형태였기 때문이다. <br />
                            국내 캠페인은 일본 역사왜곡을 널리 알리기 위한 대중 교육적 측면에서 성과가 있었다.
                        </p>
                    </div>
                </li>
                <li className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start">
                    <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                        <div className="size-[36px] rounded-[8px_0_8px_0] bg-primary-2 text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:size-[48px] md:text-[24px] md:leading-[48px]">
                            4
                        </div>
                        <p className="text-[20px] font-[700] md:text-[28px]">국제캠페인</p>
                    </div>
                    <div className="xl:w-[856px]">
                        <div className="overflow-hidden rounded-[8px]">
                            <Image src={textbookImg4} alt="이미지" />
                        </div>
                        <p className="pt-[16px] text-[18px] font-[500] text-[#666] md:pt-[28px] md:text-[20px]">
                            국제 캠페인은 원래 유엔 코피 아난 사무총장이 전 세계 NGO들에게 갈등 예방을 위한 국제 활동을
                            제안하면서 GPPAC(Global Partnership for the Prevention Against Armed Conflict)
                            동북아위원회에 참여하면서 기획됐다. <br />
                            <br />
                            동북아에서 갈등은 무력 갈등뿐만이 아니라 역사 갈등이 동북아 평화를 위협하는 주요한 의제로
                            대두됐기 때문에, 동북위 지역위원회의 의제 중 하나로 일본 역사왜곡을 설정했다. 2005년 7월
                            뉴욕 유엔에서 GPPAC 세계대회가 열리게 됐고, 이 기간을 전후로 국제 사회에 이 문제를
                            적극적으로 제기하게 된 것이다.
                            <br />
                            <br />
                            우선, GPPAC 기간 내에 일본 역사 갈등의 문제를 이슈화하기 위해 워크숍 “역사 갈등과 평화
                            교육”을 피스보트와 교과서운동본부가 공동 주최했다. 역사 갈등을 해결하기 위해 한·중·일이
                            협력한 ‘미래를 여는 역사’ 모델이 GPPAC이 주창하고 있는 GO와 NGO의 협력 모델에 부합되는
                            것이었다. 이뿐 아니라 뉴욕 콜럼비아대학 한국학연구소의 도움을 얻어 세계 각국의 학자들을
                            초청해 일본 역사왜곡을 주제로 국제 심포지엄을 개최했다.
                            <br />
                            <br />
                            이외에도 비슷한 기간에 개최되는 재미한인학교협의회 총회에서 동북아정세포럼을 넣어서 현재
                            역사 갈등을 주요 테마로 설정해 특강과 강의를 했다. 국제 캠페인은 주로 일본 역사왜곡 문제를
                            국제적인 지평으로 넓혔다는데 그 의미가 있다. 일본 역사왜곡 문제는 한·일 문제로 한정되는
                            것에서 탈피하여 이 문제를 세계적인 문제로 부각하는 데 그 1차적인 목적이 있었다.
                            <br />
                            <br />
                            우선 활동 범위가 국내에 한정돼 있는 것에서 벗어나 미국이라는 사회 속에서 이 문제를 널리
                            알리는 동시에, 접근하는 방식 면에서도 일본 역사왜곡이 한국과 일본 두 나라의 과거사 문제가
                            아닌, 국제 사회의 갈등이라는 측면에서 넓게 인식을 확장하는 것이 필요하다. 예를 들면
                            이스라엘이나 팔레스타인 간의 갈등과 함께 한국과 일본 사이에 존재하는 갈등은 좁게는
                            동아시아의 평화를 위협하고 넓게는 미국을 비롯한 세계 평화를 위협한다는 문제 인식을 확대해야
                            한다는 것이다.
                        </p>
                    </div>
                </li>
                <li className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:items-start">
                    <div className="flex items-center gap-[8px] md:gap-[28px] xl:flex-1">
                        <div className="size-[36px] rounded-[8px_0_8px_0] bg-primary-2 text-center font-lato text-[20px] font-[700] leading-[36px] text-white md:size-[48px] md:text-[24px] md:leading-[48px]">
                            5
                        </div>
                        <p className="text-[20px] font-[700] md:text-[28px]">의견광고</p>
                    </div>
                    <div className="xl:w-[856px]">
                        <div className="overflow-hidden rounded-[8px]">
                            <Image src={textbookImg5} alt="이미지" />
                        </div>
                        <p className="pt-[16px] text-[18px] font-[500] text-[#666] md:pt-[28px] md:text-[20px]">
                            일본의 교과서 채택이 막바지에 들어서고 있는 7월 후소샤 교과서 채택률이 높아질 것이라는
                            전망이 나오기 시작했다. 최초로 오타와라시에서 후소샤 교과서가 채택이 되면서 우려가 현실이
                            되는 게 아닌가 하는 목소리가 나온 것이다.
                            <br />
                            <br />
                            그러나 한국 언론들은 독도 문제와 교과서 문제로 뜨겁게 달아올랐던 초기 상황과는 달리 특별한
                            이슈가 생기지 않는 교과서 문제에 무관심해지고 있었다. <br />
                            이 같은 상황에서 특단의 조치가 필요했고, 이는 일본 신문에 직접적으로 호소하는 의견 광고로
                            드러났다. 당시 일본 언론들은 한국과 중국에서의 반일 시위를 예를 들면서 한국과 중국 국민들이
                            반일 감정에 사로잡혀 있는 것으로 왜곡 보도하고 있는 상황에서, 한국민이 진정 원하는 것은
                            ‘반일’이 아니라 ‘평화’와 ‘공생’이라는 점을 보다 분명하게 전달해야만 했다. <br />
                            그러나 일본 신문 의견 광고를 위해 한국민을 대상으로 모금 운동을 전개한다는 것은 그리 쉬운
                            것은 아니었다.
                            <br />
                            <br />
                            모금 운동이 가능한 것은 전적으로 지원해 준 여러 단체가 있었기에 가능한 일이었다. <br />
                            의견 광고의 제1차 목적은 일본 신문에 한국민의 생각을 직접적으로 전달해 일본 국민들을
                            설득시키는 데 있었다. 따라서 의견 광고 문안 역시 일본 국민들을 움직일 수 있는 편안하고
                            감동적인 내용으로 만들었다. <br />
                            의견 광고가 게재되면서부터 일본의 시민 단체, 시민들로부터 격려와 감사의 편지를 받았다.
                            일본의 시민 단체들은 외롭게 싸우고 있는 상황에서 한국 시민들의 의견 광고를 보면서 천군만마를
                            얻은 것처럼 기뻤다고 말한다.
                            <br />
                            <br />
                            의견 광고는 일본 역사왜곡 저지와 후소샤 교과서 채택 반대라는 목적을 달성하기 위해 목표를
                            달성했다. 우선 국내적으로는 한국민의 관심을 결집시키고, 일본 역사왜곡 등 역사 문제를
                            대중화시키기 위해서는 국민들이 직접 참여할 수 있는 계기를 만들었다. 국제적으로는 일본 각
                            지역에 영향력 있는 신문을 통해 지역 여론을 이끌어 내는 데 도움이 됐다. <br />
                            가장 중요한 성과는 일본에서 활동하고 있는 시민사회단체가 활동하는 데 도움을 얻었다는 점이다.
                        </p>
                        <p className="pt-[60px] text-right text-[20px] font-[700] md:pt-[80px] md:text-[24px]">
                            『아시아평화와역사교육연대(교과서운동본부) 2001 활동보고서』, <br />
                            『4년의 활동, 한일 시민의 승리 – 2005년 교과서운동 백서』 발췌
                        </p>
                    </div>
                </li>
            </ul>
            <SupportSection sectOn={true} />
        </>
    );
}
