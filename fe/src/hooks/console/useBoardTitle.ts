import { useEffect, useState } from "react";

import { useBoardStore } from "@/store/common/useBoardStore";

interface UseBoardTitleProps {
    category: number;
}

export const useBoardTitle = ({ category }: UseBoardTitleProps) => {
    const { boardMenuList } = useBoardStore();
    const [boardTitle, setBoardTitle] = useState("");

    useEffect(() => {
        const newBoardTitle = boardMenuList.find(menu => menu.category === category)?.c_name;
        setBoardTitle(newBoardTitle || "");
    }, [boardMenuList, category]);

    return { boardTitle };
};