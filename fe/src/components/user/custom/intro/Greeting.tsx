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
                            침략과 전쟁, 지배와 수탈로 인한 갈등의 20세기를 뒤로 하고 화해와 평화를 기대하며 맞이한
                            동아시아의 21세기는 교과서 문제로 불거진 갈등으로 시작되었습니다. 이에 역사 갈등을 해소하고
                            역사인식의 공유를 통해 동아시아 평화의 방향을 모색하기 위한 운동을 시작한 지 어느덧
                            4반세기가 지났습니다.
                            <br />
                            <br />
                            그동안 이런 취지에 동의하는 동아시아 시민들의 힘을 모아 다양한 활동을 벌였습니다. 시민,
                            연구자, 교사가 참여하는 평화포럼을 매년 열었으며, 한・중・일 삼국 청소년이 만나서 상호이해와
                            동아시아의 평화로운 미래를 이야기하는 청소년 캠프도 계속되었습니다. 두 차례에 걸쳐 동아시아
                            공동교재를 출판하고, 해방 80주년을 맞이한 뜻깊은 올해 8월, 세 번째 책인 《평화를 여는
                            역사》를 출판했습니다. .<br />
                            <br />
                            우리 운동의 이런 노력은 동아시아 사회에 역사 화해와 상호이해의 필요성을 자각시키는 데 일정한
                            역할을 했습니다. 그렇지만 여전히 적잖은 과제가 남아있고, 새로운 문제에 부딪히는 때입니다.
                            역사 갈등은 완전하게 해소되지 않았으며, 동아시아의 평화가 역사 화해만으로 이루어질 수 없음을
                            새롭게 느끼는 요즈음입니다. 전 세계를 휩쓰는 사회 양극화와 자국 중심의 문화, 각국 내부의
                            문제가 동아시아 평화의 새로운 걸림돌이 되는 시기에 어떻게 대응해 나갈 것인가는 우리 운동의
                            미래를 좌우할 것입니다. <br />
                            이런 갈림길에서 동아시아의 평화와 새로운 역사교육을 위한 우리의 발걸음이 어느 때보다도 더
                            절실한 때에, 새롭게 홈페이지 문을 열고 묵은 깊은 저력으로 변화의 길로 함께 나아가고자
                            합니다. .<br />
                            시민운동은 한 사람, 한 사람의 힘이 모여 사회를 바꾸는 움직임이라는 기본적인 명제를 되새기며
                            이 운동에 관심을 가지신 많은 시민의 지지와 격려, 참여를 부탁드립니다.
                        </div>
                        <div className="flex flex-col gap-[10px] pt-[40px] md:flex-row md:justify-between">
                            <p className="text-[24px] font-[700]">감사합니다.</p>
                            <div className="flex flex-col gap-[8px] md:text-right">
                                <p className="text-[18px] font-[500]">2025년 10월</p>
                                <p className="text-[24px] font-[700] text-primary">아시아평화와역사교육연대</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
