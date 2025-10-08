import { useQuery } from "@tanstack/react-query";

import { COMMON_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

// 게시글 목록 조회
export const useGetPostList = (
    category: string,
    limit: string,
    page: string,
    options: { enabled: boolean },
    search?: string,
    searchtxt?: string,
) => {
    return useQuery({
        queryKey: ["postList", category, limit, page, search, searchtxt],
        queryFn: async () => {
            const res = await consoleAxios.get(
                `${COMMON_API_ROUTES.POST.GET_LIST.replace(":category", category).replace(":limit", limit)}?page=${page}${search ? `&search=${search}` : ""}${searchtxt ? `&searchtxt=${searchtxt}` : ""}`,
            );
            return res.data;
        },
        enabled: options.enabled,
    });
};

