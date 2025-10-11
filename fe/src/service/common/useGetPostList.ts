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
        retry: (failureCount, error) => {
            // 404 에러는 재시도하지 않음 (게시판 카테고리 없을때)
            if ((error as { response?: { status?: number } })?.response?.status === 404) {
                return false;
            }
            // 다른 에러는 최대 3번(기본값)까지 재시도
            return failureCount < 3;
        },
    });
};

