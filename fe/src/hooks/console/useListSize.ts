"use client";

import { useState } from "react";

interface UseListSizeProps {
    defaultSize?: number;
    options?: { value: string; label: string }[];
}

export default function useListSize({
    defaultSize = 10,
    options = [
        { value: "10", label: "10개씩" },
        { value: "20", label: "20개씩" },
        { value: "30", label: "30개씩" },
        { value: "50", label: "50개씩" },
    ],
}: UseListSizeProps = {}) {
    const [listSize, setListSize] = useState(defaultSize);

    return {
        listSize,
        setListSize,
        options,
    };
}