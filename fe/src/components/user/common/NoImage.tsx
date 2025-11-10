import Image from "next/image";

import logoFooter from "@/assets/images/user/logoFooter.png";

export default function NoImage() {
    return (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#F2F2F2]">
            <Image src={logoFooter} alt="로고" />
        </div>
    );
}
