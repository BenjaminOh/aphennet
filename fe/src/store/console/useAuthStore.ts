"use client";

import CryptoJS from 'crypto-js';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? "";

// 암호화 함수
const encrypt = (data: string): string => {
    if (!ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY is not set");
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

// 복호화 함수
const decrypt = (encryptedData: string): string => {
    if (!ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY is not set");
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

interface UserItem {
    accessToken: string;
    refreshToken: string;
    m_email: string;
    m_level: number | null;
    m_name: string;
    m_menu_auth: string | null;
    siteId: string;
    maintName: string;
}

interface AuthStore {
    loginUser: UserItem;
    setUser: (data: UserItem) => void;
    clearUser: () => void;
}

const initialLoginUser: UserItem = {
    accessToken: "",
    refreshToken: "",
    m_email: "",
    m_level: null,
    m_name: "",
    m_menu_auth: null,
    siteId: "",
    maintName: "",
};

// 커스텀 스토리지 (암호화/복호화만 담당)
const customStorage = {
    getItem: (name: string): string | null => {
        const encryptedData = localStorage.getItem(name);
        if (encryptedData) {
            try {
                return decrypt(encryptedData);
            } catch (error) {
                // 복호화 실패 시 localStorage 값 삭제
                localStorage.removeItem(name);
                alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
                return null;
            }
        }
        return null;
    },
    setItem: (name: string, value: string) => {
        const encryptedData = encrypt(value);
        localStorage.setItem(name, encryptedData);
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            loginUser: initialLoginUser,
            setUser: (data: UserItem) => set({ loginUser: data }),
            clearUser: () => set({ loginUser: initialLoginUser }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => customStorage),
        },
    ),
);
