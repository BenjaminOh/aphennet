import { useQuery } from "@tanstack/react-query";

import { USER_API_ROUTES } from "@/config/apiConfig";
import userAxios from "@/service/axios/userAxios";

// 하위카테고리 상세 조회
export const useGetSubCategory = (id: string, options: { enabled?: boolean; }) => {
    return useQuery({
        queryKey: ["subCategoryDetail", id],
        queryFn: async () => {
            const headers = { 'x-skip-error-handling': 'true' };
            const res = await userAxios.get(`${USER_API_ROUTES.CATEGORY.GET_SUB.replace(":id", id)}`, { headers });
            return res.data;
        },
        enabled: options.enabled,
        retry: false,
    });
};
