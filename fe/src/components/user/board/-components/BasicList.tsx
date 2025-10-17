import Image from "next/image";
import Link from "next/link";

import arrowRight from "@/assets/images/user/arrowRight.png";
import NoImage from "@/components/user/common/NoImage";

import { PostItem } from "../PostList";

export default function BasicList({ items, category }: { items: PostItem[]; category: string }) {
    return (
        <ul className="-ml-[20px] w-[calc(100%+40px)] border-t border-[#ddd] md:ml-0 md:w-full">
            {items.map((item, i) => (
                <li key={`post_${i}`} className="border-b border-[#ddd]">
                    <Link
                        href={`/${category}/${item.idx}`}
                        className="group relative flex items-center gap-[8px] px-[20px] transition-all duration-300 hover:bg-white hover:pr-[88px] hover:shadow-[4px_4px_20px_0_rgba(0,0,0,0.08)] md:gap-[20px] md:py-[16px] xl:gap-[40px] xl:p-[20px_8px]"
                    >
                        <div className="flex min-h-[100px] w-[80px] flex-col items-center justify-center p-[10px] text-primary md:size-[120px]">
                            <p className="text-[14px] md:text-[16px]">2023</p>
                            <p className="text-[20px] font-[700] md:text-[28px]">03.29</p>
                        </div>
                        <p className="flex-1 overflow-hidden text-[18px] font-[700] transition-all [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] md:text-[20px]">
                            {item.b_title}
                        </p>
                        <div className="relative hidden h-[120px] w-[200px] overflow-hidden rounded-[8px] md:block xl:h-[200px] xl:w-[360px]">
                            {item.first_image ? (
                                <img
                                    src={item.first_image}
                                    alt="이미지"
                                    className="absolute inset-0 h-full w-full object-cover transition-all duration-300 xl:group-hover:scale-[1.1]"
                                />
                            ) : (
                                <NoImage />
                            )}
                        </div>
                        <Image
                            src={arrowRight}
                            alt="arrowRight"
                            width={40}
                            height={40}
                            className="absolute right-[8px] top-1/2 hidden -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 xl:block"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
