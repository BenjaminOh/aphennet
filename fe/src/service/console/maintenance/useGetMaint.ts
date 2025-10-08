import { useQuery } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

// 유지보수 상세 조회
export const useGetMaint = (
    category: string,
    listNo: string,
    options: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["maintDetail", category, listNo],
        queryFn: async () => {
            const res = await consoleAxios.get(
                `${CONSOLE_API_ROUTES.MAINTENANCE.GET_DETAIL.replace(":category", category).replace(":list_no", listNo)}`,
            );
            return res.data;
        },
        enabled: options.enabled,
    });
};

