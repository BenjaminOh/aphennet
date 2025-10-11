import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    id: number | string;
    c_depth: number;
    c_depth_parent: number | string;
    c_num: number;
}

// 카테고리 순서 변경
export const usePutCategoryOrder = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.put(CONSOLE_API_ROUTES.CATEGORY.PUT_ORDER, body);
            return res.data;
        },
    });
};
