import { useQuery } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

// 배너 목록 조회
export const useGetBannerList = (
    limit: string,
    page: string,
    b_type: string,
    searchtxt?: string,
) => {
    return useQuery({
        queryKey: ["bannerList", limit, page, b_type, searchtxt],
        queryFn: async () => {
            const res = await consoleAxios.get(
                `${CONSOLE_API_ROUTES.BANNER.CRUD}?limit=${limit}&page=${page}&b_type=${b_type}${searchtxt ? `&searchtxt=${searchtxt}` : ""}`,
            );
            return res.data;
        },
    });
};

