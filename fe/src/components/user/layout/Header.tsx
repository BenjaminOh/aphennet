"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import arrowDown from "@/assets/images/user/arrowDown.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [menuOn, setMenuOn] = useState<number | null>(null);

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="flex h-[60px] items-center justify-between px-[20px] md:px-[28px]">
                <Link href="/" className="h-[40px] w-[183px] bg-logo bg-contain bg-center bg-no-repeat" />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button className="size-[40px] bg-icMenu bg-contain bg-center bg-no-repeat">
                            <span className="sr-only">메뉴 열기</span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-screen border-none p-0 shadow-none" sideOffset={-50}>
                        <div className="relative flex h-screen w-full justify-end bg-[rgba(0,0,0,0.5)]">
                            <div className="flex h-full w-[90%] flex-col justify-between bg-white p-[0_20px_40px] md:w-[70%] md:p-[0_40px_60px]">
                                <div className="h-[75%]">
                                    <div className="flex h-[60px] items-center justify-end md:mb-[20px]">
                                        <button
                                            type="button"
                                            className="size-[40px] bg-icClose bg-contain bg-center bg-no-repeat"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">메뉴 닫기</span>
                                        </button>
                                    </div>
                                    <ScrollArea className="h-[calc(100%-60px)]">
                                        <ul className="flex flex-col gap-[16px] md:gap-[24px]">
                                            <li>
                                                <div
                                                    className={`relative flex items-center justify-between py-[8px] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#222] after:transition-all after:duration-300 md:py-[20px] ${
                                                        menuOn === 1 ? "after:opacity-100" : "after:opacity-0"
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        className={`text-[20px] font-[700] leading-[1.5] md:text-[36px]${
                                                            menuOn === 1 ? " text-primary" : ""
                                                        }`}
                                                    >
                                                        소개
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (menuOn === 1) {
                                                                setMenuOn(null);
                                                            } else {
                                                                setMenuOn(1);
                                                            }
                                                        }}
                                                    >
                                                        <Image src={arrowDown} alt="화살표" />
                                                    </button>
                                                </div>
                                                {menuOn === 1 && (
                                                    <div className="flex flex-col gap-[16px] pt-[24px] md:flex-row md:flex-wrap md:gap-x-[6px] md:gap-y-[20px]">
                                                        <button
                                                            type="button"
                                                            className="text-left text-[18px] font-[500] text-[#666] md:w-[calc(50%-3px)]"
                                                        >
                                                            인사말
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-left text-[18px] font-[500] text-[#666] md:w-[calc(50%-3px)]"
                                                        >
                                                            인사말
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-left text-[18px] font-[500] text-[#666] md:w-[calc(50%-3px)]"
                                                        >
                                                            인사말
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                    </ScrollArea>
                                </div>
                                <div className="flex flex-col gap-[20px]">
                                    <ul className="flex flex-col gap-[8px] rounded-[8px] border border-[#ddd] p-[16px] md:p-[20px]">
                                        <li>
                                            <a href="/" className="text-[18px] font-[500] text-[#666]">
                                                후원하기
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" className="text-[18px] font-[500] text-[#666]">
                                                아시아평화와역사연구소
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="flex gap-[20px]">
                                        <li>
                                            <a
                                                href="/"
                                                className="block size-[32px] bg-icInstagram bg-contain bg-center bg-no-repeat -indent-[9999px] text-[0]"
                                            >
                                                인스타그램
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="block size-[32px] bg-icFacebook bg-contain bg-center bg-no-repeat -indent-[9999px] text-[0]"
                                            >
                                                페이스북
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}
