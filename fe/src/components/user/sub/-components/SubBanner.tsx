import Image, { StaticImageData } from "next/image";

import subBannerLogo from "@/assets/images/user/subBannerLogo.png";

interface SubBannerProps {
    banner: StaticImageData;
    title: string;
}

export default function SubBanner({ banner, title }: SubBannerProps) {
    return (
        <div className="relative p-[100px_20px_0_0] md:p-[140px_0_0] xl:p-0">
            <div className="absolute inset-0 xl:static">
                <div className="relative h-[160px] w-full md:h-[240px] xl:h-[400px]">
                    <Image src={banner} alt="banner" fill className="object-cover" />
                </div>
            </div>
            <div className="pointer-events-none w-full max-w-[1360px] xl:absolute xl:left-1/2 xl:top-[200px] xl:-translate-x-1/2">
                <div className="pointer-events-auto relative min-h-[172px] w-full max-w-[600px] rounded-[0_0_40px_0] bg-[linear-gradient(316deg,#171E1D_6.2%,#206B6E_98.86%)] p-[32px_20px] md:min-h-[320px] md:p-[40px] xl:min-h-[520px] xl:max-w-[560px] xl:p-[60px]">
                    <p
                        className="text-[32px] font-[700] leading-[1.5] text-white md:text-[60px]"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div className="absolute bottom-0 right-[20px] md:right-[46px] xl:bottom-[10px]">
                        <div className="relative h-[132px] w-[120px] md:h-[236px] md:w-[213px]">
                            <Image src={subBannerLogo} alt="logo" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
