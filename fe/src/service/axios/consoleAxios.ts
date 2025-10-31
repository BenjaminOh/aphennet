import axios from "axios";

import { API_URL, COMMON_API_ROUTES } from "@/config/apiConfig";
import { usePopupStore } from "@/store/common/usePopupStore";
import { useAuthStore } from "@/store/console/useAuthStore";

const consoleAxios = axios.create({
    baseURL: API_URL,
});

const refreshAxios = axios.create({ baseURL: API_URL });

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

consoleAxios.interceptors.request.use(
    config => {
        const { loginUser, clearUser } = useAuthStore.getState();
        if (loginUser.accessToken) {
            config.headers["Authorization"] = `Bearer ${loginUser.accessToken}`;
        } else {
            clearUser();
            if (typeof window !== "undefined") {
                window.location.href = "/console/login";
            }
        }
        return config;
    },
    error => Promise.reject(error),
);

consoleAxios.interceptors.response.use(
    response => response,
    async error => {
        const { setConfirmPop } = usePopupStore.getState();
        const { loginUser, setUser, clearUser } = useAuthStore.getState();
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // refresh API 호출
                    const { data } = await refreshAxios.post(COMMON_API_ROUTES.REFRESH_TOKEN, { refresh_token: loginUser.refreshToken });
                    const { accessToken, refreshToken } = data.data;
                    setUser({
                        ...loginUser,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                    onRefreshed(accessToken);
                    isRefreshing = false;
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return consoleAxios(originalRequest);
                } catch (refreshError) {
                    console.log(refreshError);
                    clearUser();
                    if (typeof window !== "undefined") {
                        window.location.href = "/console/login";
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                // 토큰 갱신 중이면 대기
                return new Promise((resolve, _) => {
                    refreshSubscribers.push((token: string) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(consoleAxios(originalRequest));
                    });
                });
            }
        }

        // 기존 에러 처리
        const { status, data } = error.response || {};
        const errorMessage = data?.message || "알 수 없는 에러가 발생했습니다.";

        // 404 에러는 인터셉터에서 처리하지 않음 (개별 컴포넌트에서 처리)
        if (status === 404) {
            return Promise.reject(error);
        }

        // 409: 요청 헤더로 개별 처리 허용
        if (status === 409 && originalRequest?.headers?.["X-Handle-409"] === "true") {
            return Promise.reject(error);
        }

        if (status === 500) {
            setConfirmPop(true, "서버 오류가 발생했습니다.", 1);
        } else {
            setConfirmPop(true, errorMessage, 1);
            return Promise.reject(error);
        }
        
        return Promise.reject(error);// 개별 호출에서도 에러 처리 가능하도록 전달
    }
);

export default consoleAxios;