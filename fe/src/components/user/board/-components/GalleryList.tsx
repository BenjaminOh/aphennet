import Link from "next/link";

import NoImage from "@/components/user/common/NoImage";
import { API_URL } from "@/config/apiConfig";

import { PostItem } from "../PostList";

export default function Gallery2List({
    items,
    category,
    handlePostClick,
}: {
    items: PostItem[];
    category: string;
    handlePostClick: () => void;
}) {
    return (
        <ul className="flex flex-col gap-[24px] md:flex-row md:flex-wrap xl:gap-x-[20px] xl:gap-y-[40px]">
            {items.map((item, i) => (
                <li key={`post_${i}`} className="md:w-[calc(50%-12px)] xl:w-[calc(25%-15px)]">
                    <Link
                        href={`/${category}/${item.idx}`}
                        onClick={handlePostClick}
                        className="group flex flex-col gap-[12px]"
                    >
                        <div className="relative h-0 w-full overflow-hidden rounded-[16px] pb-[62.5%] transition-all duration-300 after:absolute after:inset-0 after:h-full after:w-full after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)] after:opacity-100 after:transition-all after:duration-300 after:content-[''] md:rounded-[20px] xl:group-hover:after:opacity-0">
                            {item.b_img ? (
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
                        <div>
                            <p className="overflow-hidden text-[18px] font-[700] transition-all [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] md:text-[20px] xl:group-hover:underline">
                                {item.b_title}
                            </p>
                            <p className="pt-[8px] text-[rgba(102,102,105,0.60)]">{item.b_reg_date}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
