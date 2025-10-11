import { useQuery } from "@tanstack/react-query";

import { USER_API_ROUTES } from "@/config/apiConfig";
import userAxios from "@/service/axios/userAxios";

// 메인 배너 조회
export const useGetBannerList = (limit: string, b_type: string) => {
    return useQuery({
        queryKey: ["mainBannerList", limit, b_type],
        queryFn: async () => {
            const res = await userAxios.get(`${USER_API_ROUTES.GET_MAIN_BANNER}?limit=${limit}&b_type=${b_type}`);
            return res.data;
        },
    });
};

