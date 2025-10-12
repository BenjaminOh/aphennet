import Image from "next/image";
import Link from "next/link";

import icMainLink1 from "@/assets/images/user/icMainLink1.png";
import icMainLink2 from "@/assets/images/user/icMainLink2.png";
import icMainLink3 from "@/assets/images/user/icMainLink3.png";
import icMainLink4 from "@/assets/images/user/icMainLink4.png";
import icMainLink5 from "@/assets/images/user/icMainLink5.png";

export default function MainLink() {
    return (
        <div className="mx-auto flex max-w-[1360px] flex-wrap gap-y-[28px] p-[60px_20px] md:flex-nowrap md:p-[120px_0] xl:p-[40px_0_160px]">
            <Link href="/" className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/5">
                <div className="relative size-[80px]">
                    <Image src={icMainLink1} alt="일본교과서 왜곡대응" fill className="object-contain" />
                </div>
                <p className="text-center text-[18px] font-[500]">
                    일본교과서
                    <br />
                    왜곡대응
                </p>
            </Link>
            <Link href="/" className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/5">
                <div className="relative size-[80px]">
                    <Image src={icMainLink2} alt="청소년 캠프" fill className="object-contain" />
                </div>
                <p className="text-center text-[18px] font-[500]">청소년 캠프</p>
            </Link>
            <Link href="/" className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/5">
                <div className="relative size-[80px]">
                    <Image src={icMainLink3} alt="평화포럼" fill className="object-contain" />
                </div>
                <p className="text-center text-[18px] font-[500]">평화포럼</p>
            </Link>
            <Link href="/" className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/5">
                <div className="relative size-[80px]">
                    <Image src={icMainLink4} alt="한중일 공동교재" fill className="object-contain" />
                </div>
                <p className="text-center text-[18px] font-[500]">한중일 공동교재</p>
            </Link>
            <Link href="/" className="flex w-1/2 flex-col items-center gap-[12px] md:w-1/5">
                <div className="relative size-[80px]">
                    <Image src={icMainLink5} alt="연대 활동" fill className="object-contain" />
                </div>
                <p className="text-center text-[18px] font-[500]">연대 활동</p>
            </Link>
        </div>
    );
}
