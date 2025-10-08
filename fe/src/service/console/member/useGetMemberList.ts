import { useQuery } from "@tanstack/react-query";

import { CONSOLE_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

// 회원 목록 조회
export const useGetMemberList = (
    limit: string,
    page: string,
    search?: string,
    searchtxt?: string,
    sdate?: string,
    edate?: string,
    m_level?: string,
) => {
    return useQuery({
        queryKey: ["memberList", limit, page, search, searchtxt, sdate, edate, m_level],
        queryFn: async () => {
            const res = await consoleAxios.get(
                `${CONSOLE_API_ROUTES.MEMBER.GET_LIST}?getLimit=${limit}&page=${page}${search ? `&search=${search}` : ""}${searchtxt ? `&searchtxt=${searchtxt}` : ""}${sdate ? `&sdate=${sdate}` : ""}${edate ? `&edate=${edate}` : ""}${m_level ? `&m_level=${m_level}` : ""}`,
            );
            return res.data;
        },
    });
};

