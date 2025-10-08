import { PopoverClose } from "@radix-ui/react-popover";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import icBell from "@/assets/images/console/icBell.svg";
import popClose from "@/assets/images/console/popClose.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import NotiItem from "./NotiItem";

export default function NotiPopup() {
    const tabStyle = "text-[14px] text-[#666] h-[32px] px-[20px] bg-[#F7F6FB] rounded-[20px]";
    const tabOnStyle = twMerge(tabStyle, "text-[#222] font-[500] bg-white border border-[#222]");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="relative flex size-[48px] items-center justify-center rounded-full bg-[#F2F3F8] after:absolute after:right-[14px] after:top-[14px] after:h-[6px] after:w-[6px] after:rounded-full after:bg-[#FF5049] after:content-[''] data-[state=open]:bg-white"
                >
                    <Image src={icBell} alt="알림" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="mr-[20px] w-[640px] rounded-[8px] bg-white p-0 shadow-[0_0_16px_0_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between border-b border-[#F1F1F1] p-[32px_40px_20px]">
                    <p className="text-[24px] font-[600]">알림</p>
                    <PopoverClose>
                        <Image src={popClose} alt="닫기" />
                    </PopoverClose>
                </div>
                <ScrollArea className="flex max-h-[600px] flex-col overflow-y-auto p-[20px_40px]">
                    <ScrollArea className="w-full pb-[8px]">
                        <ul className="flex w-max gap-[4px]">
                            <li>
                                <button type="button" className={tabOnStyle}>
                                    전체
                                </button>
                            </li>
                            <li>
                                <button type="button" className={tabStyle}>
                                    취소/교환/환불 신청
                                </button>
                            </li>
                            <li>
                                <button type="button" className={tabStyle}>
                                    취소/교환/환불 신청
                                </button>
                            </li>
                            <li>
                                <button type="button" className={tabStyle}>
                                    취소/교환/환불 신청
                                </button>
                            </li>
                            <li>
                                <button type="button" className={tabStyle}>
                                    취소/교환/환불 신청
                                </button>
                            </li>
                            <li>
                                <button type="button" className={tabStyle}>
                                    취소/교환/환불 신청
                                </button>
                            </li>
                        </ul>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="flex items-center justify-between p-[4px_0_12px]">
                        <p className="font-[500] text-[#666]">
                            알림이 총 <span className="text-[#00BA97]">344</span>개가 있습니다.
                        </p>
                        <ul className="flex gap-[33px]">
                            <li>
                                <button type="button" className="text-[#999]">
                                    전체 읽기
                                </button>
                            </li>
                            <li className="relative after:absolute after:-left-[16px] after:top-1/2 after:h-[16px] after:w-[1px] after:-translate-y-1/2 after:bg-[#D9D9D9] after:content-['']">
                                <button type="button" className="text-[#999]">
                                    읽은 알림 삭제
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ul className="flex flex-col gap-[32px] border-t border-[#D9D9D9] py-[32px]">
                        <li>
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                        <li className="opacity-[0.5]">
                            <NotiItem />
                        </li>
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
