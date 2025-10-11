import Image from "next/image";

import arrowTop from "@/assets/images/user/arrowTop.png";

export default function Footer() {
    return (
        <footer className="bg-[#F2F2F2] p-[20px]">
            <div>
                <div className="flex items-center justify-between border-b border-[#ddd] py-[20px]">
                    <div className="h-[60px] w-[183px] bg-logo bg-contain bg-center bg-no-repeat xl:h-[60px] xl:w-[274px]" />
                    <button type="button">
                        <Image src={arrowTop} alt="최상단으로 이동" width={40} height={40} />
                    </button>
                </div>
                <div className="flex flex-col gap-[8px] pt-[16px]">
                    <div>
                        <a href="/" rel="noopener noreferrer" target="_blank">
                            아시아평화와역사연구소
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
