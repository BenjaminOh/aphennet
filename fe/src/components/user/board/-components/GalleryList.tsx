// import Image from "next/image";
import Link from "next/link";

// import icPlus from "@/assets/images/user/icPlus.svg";
import NoImage from "@/components/user/common/NoImage";
import { API_URL } from "@/config/apiConfig";

import { PostItem } from "../PostList";

export default function GalleryList({ items, category }: { items: PostItem[]; category: string }) {
    return (
        <ul className="flex flex-col gap-[24px] md:gap-[40px] xl:flex-row xl:flex-wrap xl:gap-[60px]">
            {items.map((item, i) => (
                <li key={`post_${i}`} className="xl:w-[calc(50%-30px)]">
                    <Link
                        href={`/${category}/${item.idx}`}
                        className="group flex flex-col gap-[16px] md:flex-row md:gap-[24px]"
                    >
                        <div className="relative h-0 w-full overflow-hidden pb-[133.333%] transition-all duration-300 after:absolute after:inset-0 after:h-full after:w-full after:rounded-[20px] after:border-2 after:border-[#012E69] after:opacity-0 after:transition-all after:duration-300 after:content-[''] md:w-[41.666%] md:pb-[55.555%] xl:group-hover:rounded-[20px] xl:group-hover:after:opacity-100">
                            {item.b_secret === "Y" ? (
                                <NoImage />
                            ) : item.b_img ? (
                                <img
                                    src={`${API_URL}/${item.b_img}`}
                                    alt="이미지"
                                    className="absolute inset-0 h-full w-full object-cover transition-all duration-300 xl:group-hover:scale-[1.1]"
                                />
                            ) : item.first_image ? (
                                <img
                                    src={item.first_image}
                                    alt="이미지"
                                    className="absolute inset-0 h-full w-full object-cover transition-all duration-300 xl:group-hover:scale-[1.1]"
                                />
                            ) : (
                                <NoImage />
                            )}
                        </div>
                        <div className="flex flex-col gap-[4px] md:flex-1 md:gap-[12px]">
                            <div className="flex items-center gap-[8px]">
                                {item.b_notice === "1" && ""}
                                <p className="rounded-full bg-[#F2F3F8] p-[4px_16px] text-[14px] font-[500] text-[#666] transition-all xl:group-hover:bg-[#012E69] xl:group-hover:text-white">
                                    {item.b_reg_date}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[8px] md:flex-1 md:justify-between md:gap-[24px]">
                                <p className="overflow-hidden text-[18px] font-[700] transition-all [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] md:text-[24px] xl:group-hover:underline">
                                    {item.b_title}
                                </p>
                                <div className="flex flex-col gap-[24px]">
                                    <p className="overflow-hidden font-[500] text-[#666] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] md:[-webkit-line-clamp:4]">
                                        {item.b_contents}
                                    </p>
                                    <div className="hidden w-fit items-center gap-[12px] border-b-2 border-[#060606] py-[4px] text-[18px] font-[500] leading-[27px] md:flex">
                                        <p>더보기</p>
                                        {/* <Image src={icPlus} alt="더보기" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
