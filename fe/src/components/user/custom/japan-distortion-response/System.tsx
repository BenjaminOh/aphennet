import subBannerSystem1 from "@/assets/images/user/subBannerSystem1.jpg";
import subBannerSystem2 from "@/assets/images/user/subBannerSystem2.jpg";
import subBannerSystem3 from "@/assets/images/user/subBannerSystem3.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function System() {
    return (
        <>
            <SubBanner
                banner={subBannerSystem1}
                titleClassName="xl:max-w-[480px] xl:p-[40px]"
                title={`<p class="text-white text-[24px] md:text-[36px]">2018년도<br/>『고교 학습지도요령』 및<br/>『고교 학습지도요령 해설서』</p>`}
                subTitle={`【地理歴史編】`}
            />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="flex flex-col gap-[40px] xl:w-[800px]">
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">청일/러일전쟁</p>
                            <p className="pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                청일전쟁과 타이완 식민지화, 삼국간섭, 러시아의 중국·조선에의 진출, 러일전쟁과 한국 병합
                                등을 취급하여 열강의 아시아 진출의 움직임과 중국과 조선의 동향을 관련시키면서 일본의
                                동향을 취급한다. <br />
                                <br />
                                그때 국민의 대외 의식의 변화와 함께 일본의 근대화와 대외세력에 대한 아시아 근린 제국민의
                                수용 방법에 관해서도 취급한다.
                                <br />
                                특히 러일전쟁에서의 승리가 아시아 제민족의 독립과 근대화 운동에 자극을 주었다는 것을 알
                                수 있도록 한다. 열강의 제국주의 정책과 아시아 제국의 변용을 이해할 수 있도록 한다.
                            </p>
                        </div>
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">제2차 세계대전</p>
                            <p className="pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                이 전쟁이 세계의 제국가·제민족에 미증유의 참화를 가져왔고, 인류의 문화와 생활을 파괴한
                                것, 우리나라가 많은 국가에 특히 아시아 제국의 많은 사람들에게 다대한 손해를 끼쳤다는 것,
                                우리나라에서도 각지의 공습, 오키나와전, 히로시마·나가사키 원자폭탄 투하를 비롯하여
                                공전의 전화를 입었다는 것에 착목해 평화롭고 민주적인 국제사회의 실현에 노력하는 것의
                                중요성을 자각하게 한다.
                            </p>
                        </div>
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">영토</p>
                            <p className="pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                일본의 국민국가 형성 등 학습에 있어서 영토의 획정 등을 취급할 것. <br />
                                그때 북방영토, 다케시마, 센가쿠제도의 편입에 관해서 취급할 것. <br />
                                <br />
                                일본의 근대화와 러·일전쟁의 결과가 아시아 제민족의 독립과 근대화 운동에 미친 영향과
                                더불어 구미제국이 아시아제국에 세력을 확장하고 일본이 조선반도와 중국 동북지방에 세력을
                                확장한 것을 취급하고, 각국의 국내 상황과 국제관계의 변화를 깨달을 수 있게 할 것.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SubBanner
                banner={subBannerSystem2}
                titleClassName="xl:max-w-[480px] xl:p-[40px]"
                title={`<p class="text-white text-[24px] md:text-[36px]">2014년 <br/>『의무교육제 학교 교과용<br/>도서 검정 기준 및<br/>고등학교 교과용 도서 검정<br/>기준의 일본 개정 고시』</p>`}
                subTitle={`(2014. 01. 17. 문부과학성 고시 제2호)`}
            />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="flex flex-col gap-[40px] xl:w-[800px]">
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">
                                사회과(지도 제외) 고유의 조건
                                <br />
                                <span className="text-[16px] md:text-[20px]">
                                    (고등학교의 검정 기준에 있어서는 지리·역사과(지도 제외) 및 공민과)에 관해서 다음과
                                    같이 개정.
                                </span>
                            </p>
                            <ul className="list-disc pl-[20px] pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                <li>
                                    미확정 시사적 사상(事象)에 관해 단정적으로 기술하거나, 특정 사안을 지나치게
                                    강조하거나 일면적인 견해를 충분한 배려 없이 취급하지 않을 것.
                                </li>
                                <li>
                                    근현대의 역사적 사상 중 통설적인 견해가 없는 수치 등의 사항을 기술할 경우에는 통설적
                                    견해가 없다는 점을 명시하고, 학생이 오해할 여지가 있는 표현을 하지 않을 것.
                                </li>
                                <li>
                                    각의 결정 그 외의 방법으로 표현된 정부의 통일적 견해 또는 최고재판소의 판례가 존재할
                                    경우에는 그것을 기본으로 기술할 것.
                                </li>
                                <li>
                                    근린의 아시아 제국과의 관계에서 근현대 역사적 사상의 취급에 국제 이해와 국제 협조의
                                    견지에서 필요한 배려를 할 것.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <SubBanner
                banner={subBannerSystem3}
                titleClassName="xl:max-w-[480px] xl:p-[40px]"
                title={`<p class="text-white text-[24px] md:text-[36px]">2021년<br/>강제동원, 일본군 ‘위안부’<br/>용어 각의 결정</p>`}
            />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="flex flex-col gap-[40px] xl:w-[800px]">
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">
                                ｢2021년 04월 27일 내각중질204제98호｣ <br />
                                강제연행, 강제노동에 관한 표현
                            </p>
                            <ul className="list-disc pl-[20px] pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                <li>
                                    “강제연행 되었다”, “강제적으로 연행되었다” 또는 “연행되었다”는 부적절. 구
                                    국가총동원법 (1938년 법률 제55호) 제4조 규정에 근거한 국민징용령에 의해 징용된
                                    조선반도에서의 노동자 이입에 관해서는 이들 법령에 의해 실시된 것을 명확히 하기 위해
                                    “강제연행”, “연행”이 아니고 “징용”을 사용하는 것이 적절.
                                    <br />
                                    <br />
                                </li>
                                <li>
                                    강제노동에 관한 조약(1922년 조약제10호) 제2조에 ｢강제노동｣에 관해서는 ‘본 조약에서
                                    강제노동이라는 것은 혹자가 처벌의 위협 하에 강요되거나 또는 스스로 자신의 의지에
                                    따르지 않는 일절의 노무’로 규정되어 있고, 또 ‘긴급한 경우 즉 전쟁의 경우(중략)에
                                    강요된 노무’를 포함하지 않는다고 되어 있기 때문에 ‘모집’, ‘관알선’ 및 ‘징용’에 의한
                                    노무에 관해서는 모두 동 조약상의 강제노동에 해당하지 않기 때문에 ‘강제노동’ 표현은
                                    적절하지 않음.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2 md:text-[28px]">
                                ｢2021년 04월 27일 내각중질204제97호｣ <br />
                                종군위안부 등의 표현
                            </p>
                            <ul className="list-disc pl-[20px] pt-[8px] text-[18px] font-[500] text-[#666] md:pt-[16px] md:text-[20px]">
                                <li>
                                    1993년 정부조사 대상 공문서에는 ‘위안부’, ‘특수 위안부’ 등으로 사용, ‘종군
                                    위안부’라는 용어는 사용되지 않았음. ‘군에게 강제연행되었다’라고 유포되게 된 요시다
                                    세이지(吉田 淸治)의 증언에 대해 신문사에 의해 정정. 정부는 ‘종군위안부’, ‘소위
                                    종군위안부’가 아니라 ‘위안부’라는 용어가 적절하다고 생각.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
