import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    idx: (string | number)[];
    m_level: number;
}

// 회원 등급 변경
export const usePutMemberLevel = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.put(CONSOLE_API_ROUTES.MEMBER.PUT_LEVEL, body);
            return res.data;
        },
    });
};
