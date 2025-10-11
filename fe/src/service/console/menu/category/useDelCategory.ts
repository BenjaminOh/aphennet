import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    id: number;
}

// 카테고리 삭제
export const useDelCategory = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.delete(CONSOLE_API_ROUTES.CATEGORY.CRUD, {
                data: body,
            });
            return res.data;
        },
    });
};
