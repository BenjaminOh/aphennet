import { useMutation } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    idx: (string | number)[];
    p_use_yn: string;
}

// 운영정책 사용여부 변경
export const usePostPolicyUse = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.post(CONSOLE_API_ROUTES.POLICY.POST_USE, body);
            return res.data;
        },
    });
};
