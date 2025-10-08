import axios from "axios";

import { API_URL } from "@/config/apiConfig";
import { usePopupStore } from "@/store/common/usePopupStore";

const userAxios = axios.create({
    baseURL: API_URL,
});

let activeRequests = 0;

// 요청 인터셉터
userAxios.interceptors.request.use(
    config => {
        activeRequests++;

        return config; // config 반환
    },
    error => {
        activeRequests = Math.max(activeRequests - 1, 0);

        return Promise.reject(error);
    },
);

// 응답 인터셉터
userAxios.interceptors.response.use(
    response => {
        activeRequests = Math.max(activeRequests - 1, 0);

        return response; // 성공적으로 응답이 오면 그대로 반환
    },
    error => {
        activeRequests = Math.max(activeRequests - 1, 0);
        const { setConfirmPop } = usePopupStore.getState();

        // 공통적으로 알림 팝업 표시
        const { status, data } = error.response || {};
        const errorMessage = data?.message || "알 수 없는 에러가 발생했습니다.";

        if (status === 500) {
            setConfirmPop(true, "서버 오류가 발생했습니다.", 1);
        } else {
            setConfirmPop(true, errorMessage, 1);
        }

        return Promise.reject(error); // 개별 호출에서도 에러 처리 가능하도록 전달
    },
);

export default userAxios;
