import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    idx: number;
    category: number;
    b_num: number;
}

// 게시글 게시판 이동
export const usePutPostOrder = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.put(CONSOLE_API_ROUTES.POST.PUT_ORDER, body);
            return res.data;
        },
    });
};
