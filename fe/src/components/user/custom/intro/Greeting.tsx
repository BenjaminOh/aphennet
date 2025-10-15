import subBannerGreeting from "@/assets/images/user/subBannerGreeting.jpg";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function Greeting() {
    return (
        <>
            <SubBanner banner={subBannerGreeting} title={`아시아평화와 <br/>역사교육연대는`} />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="xl:w-[680px]">
                        <div className="text-[18px] leading-[1.5] text-[#666] md:text-[20px]">
                            아무도 예기치 못한 순간에 등장한 ‘코로나19’ 바이러스는 전 세계를 공포에 빠트리며, 인류에게
                            많은 것을 되돌아보게 하였습니다. 그것은 대자연에 대한 인간의 폭력이 얼마나 자기 파괴적인지를
                            겸허히 반성케 합니다. 세계인들이 가진 인류애의 기반이 얼마나 허약한지를 극명히 보여주기도
                            합니다. 물론 그 다른 한편에서는 공존과 연대의 기운이 일어나기도 합니다.
                            <br />
                            <br />
                            이런 상황에서 세계를 주도하고 있는 미국과 중국은 공동의 대응보단 대립을 택해 서로의 이익에만
                            관심을 집중합니다. 보건 분야에서 세계적 모범국가로 우뚝 선 한국에서는 다른 나라는 도와주어도
                            일본은 좀 곤란하다는 여론이 만만치 않습니다. 세계의 자국중심적 대립과 한일간의 역사갈등은
                            해결의 길이 없는 것일까요?
                            <br />
                            <br />
                            아시아평화와역사교육연대는 2000년대 초반 일본의 역사왜곡에 맞서 한중일 시민사회가 그 대안을
                            찾아보자는 취지로 만들어졌습니다. 24년의 시간 동안 우리는 한중일의 청년 학생들이 함께 읽고
                            생각을 공유할 수 있는 공동부교재를 만드는 일을 해 왔습니다. 한중일의 청년 학생들이 한자리에
                            모여 역사와 미래를 생각해 보는 역사캠프도 꾸준히 진행하고 있습니다. 한중일의 연구자, 교사,
                            시민들이 한자리에 모여 평화와 연대를 이야기하고 공동의 행동을 추구해 왔습니다.
                            <br />
                            <br />
                            그럼에도 갈 길이 아직 멀기만 합니다. 한중일의 역사갈등은 좀처럼 수그러들지 않고, 동아시아
                            평화의 빠질 수 없는 주체인 북한은 아직도 역사대화의 파트너가 되지 못했습니다. <br />
                            베트남과 몽골 등 동아시아 각국과의 대화도 걸음마조차 제대로 떼지 못했습니다.
                            <br />
                            <br />갈 길은 멀지만 걸음을 멈출 수는 없습니다. 아시아평화와역사교육연대는 지난 시절 해 왔던
                            일을 되돌아보고, 다시 신발끈을 묶습니다. 마침 새단장한 홈페이지가 문을 열었습니다. <br />
                            조금 더 관심을 가져주시고, 함께 걸음을 내딛어주신다면 우리의 발걸음이 한결 가벼워질 것이라
                            생각합니다.
                        </div>
                        <div className="flex flex-col gap-[10px] pt-[40px] md:flex-row md:justify-between">
                            <p className="text-[24px] font-[700]">감사합니다.</p>
                            <div className="flex flex-col gap-[8px] md:text-right">
                                <p className="text-[18px] font-[500]">2025. 10.</p>
                                <p className="text-[24px] font-[700] text-primary">아시아평화와역사교육연대</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
