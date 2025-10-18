import subBannerSystem from "@/assets/images/user/subBannerSystem.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function System() {
    return (
        <>
            <SubBanner
                banner={subBannerSystem}
                titleClassName="xl:max-w-[480px] xl:p-[40px]"
                title={`<p class="text-white text-[24px] md:text-[36px]">2018년도<br/>『고교 학습지도요령』 및<br/>『고교 학습지도요령 해설서』</p>`}
                subTitle={`【地理歴史編】`}
            />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="flex flex-col gap-[40px] xl:w-[800px]">
                        <div>
                            <p className="text-[20px] font-[700] text-primary-2">청일/러일전쟁</p>
                            <p className="pt-[8px] text-[18px] font-[500] text-[#666]">
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
                    </div>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
