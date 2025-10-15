import Image from "next/image";

import arrowOutward from "@/assets/images/user/arrowOutward.png";
import arrowOutwardGreen from "@/assets/images/user/arrowOutwardGreen.png";
import icLogo from "@/assets/images/user/icLogo.png";

interface LinkButtonProps {
    txt: string;
    handleClick: () => void;
    type?: "default" | "black";
    className?: string;
}

export default function LinkButton({ txt, handleClick, type = "default", className = "" }: LinkButtonProps) {
    return (
        <button
            type="button"
            onClick={handleClick}
            className={`group relative flex h-[54px] w-[240px] items-center justify-between rounded-[30px] transition-all duration-300 xl:hover:bg-[#23AA4B] ${
                type === "black" ? "bg-[#222222]" : "bg-primary-2"
            } ${className}`}
        >
            <div className="absolute left-[8px] top-1/2 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-all duration-300 xl:group-hover:left-[calc(100%-48px)]">
                <div className="relative size-[24px] xl:group-hover:size-[18px]">
                    <Image
                        src={type === "black" ? arrowOutward : arrowOutwardGreen}
                        alt="아이콘"
                        fill
                        className="object-contain opacity-100 xl:group-hover:opacity-0"
                    />
                    <Image
                        src={icLogo}
                        alt="로고"
                        fill
                        className="object-contain opacity-0 xl:group-hover:opacity-100"
                    />
                </div>
            </div>
            <p className="absolute right-[24px] top-1/2 -translate-y-1/2 text-[20px] font-[700] text-white transition-all duration-300 xl:group-hover:left-[24px] xl:group-hover:right-auto">
                {txt}
            </p>
        </button>
    );
}
