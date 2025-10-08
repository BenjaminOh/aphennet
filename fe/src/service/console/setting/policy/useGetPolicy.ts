import { useQuery } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

// 운영정책 상세 조회
export const useGetPolicy = (idx: string, options: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["policyDetail", idx],
        queryFn: async () => {
            const res = await consoleAxios.get(CONSOLE_API_ROUTES.POLICY.GET_DETAIL.replace(":idx", idx));
            return res.data;
        },
        enabled: options.enabled,
    });
};
