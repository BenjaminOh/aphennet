import Image from "next/image";
import React from "react";

import icTurnRightConsole from "@/assets/images/console/icTurnRightConsole.svg";

interface AddSubButtonProps {
    txt: string;
    handleClick?: () => void;
}

const AddSubButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & AddSubButtonProps
>(({ txt, handleClick, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        className="flex h-[32px] items-center justify-center gap-[4px] rounded-[5px] border border-[#D9D9D9] bg-white px-[10px] text-[14px] font-[500] text-[#666]"
        onClick={handleClick}
        {...props}
    >
        <Image src={icTurnRightConsole} alt="추가" className="size-[20px]" />
        <span>{txt}</span>
    </button>
));

AddSubButton.displayName = "AddSubButton";
export default AddSubButton;
