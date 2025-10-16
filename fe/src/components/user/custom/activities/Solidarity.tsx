import subBannerSolidarity from "@/assets/images/user/subBannerSolidarity.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function Solidarity() {
    return (
        <>
            <SubBanner banner={subBannerSolidarity} title="연대 활동" />
            <div className="p-[40px_20px_120px] md:p-[60px_28px_160px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[20px] md:text-[24px] xl:w-[680px]">
                        <span className="text-[24px] font-[700] md:text-[28px]">아시아평화와역사교육연대는</span>
                        <br />
                        <br />
                        동아시아의 역사인식을 공유하기 위해 역사NGO세계대회, <br />
                        일본의 올바른 과거청산을 위한 국제연대협의회, <br />
                        2010 강제병합 100년 한일시민선언실천협의회, <br />
                        역사연대 평화기행 등의 국제연대활동을 주관하였고, <br />
                        연대활동에 적극 참여하고 있습니다.
                    </div>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </>
    );
}
