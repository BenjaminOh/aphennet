import { useQuery } from "@tanstack/react-query";

import { USER_API_ROUTES } from "@/config/apiConfig";
import userAxios from "@/service/axios/userAxios";

// 팝업 목록 조회
export const useGetUserPopupList = (type: string,  options: { enabled: boolean }) => {
    return useQuery({
        queryKey: ["userPopupList", type],
        queryFn: async () => {
            const res = await userAxios.get(`${USER_API_ROUTES.POPUP.GET_LIST}?p_type=${type}`);
            return res.data;
        },
        enabled: options.enabled,
    });
};
