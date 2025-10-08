import { useMutation } from "@tanstack/react-query";

import { COMMON_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

interface body {
    category: number;
    board_idx: number;
    parent_idx: number;
    depth: number;
    m_email: string;
    m_name: string;
    m_pwd: string;
    c_contents: string;
}

// 게시글 댓글 등록
export const usePostPostComment = () => {
    return useMutation({
        mutationFn: async (body: body) => {
            const res = await consoleAxios.post(COMMON_API_ROUTES.POST_COMMENT.CRUD, body);
            return res.data;
        },
    });
};
