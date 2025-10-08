import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    idx: (string | number)[];
}

// 팝업 삭제
export const useDelPopup = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.delete(CONSOLE_API_ROUTES.POPUP.CRUD, {
                data: body,
            });
            return res.data;
        },
    });
};
