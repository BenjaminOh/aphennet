"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PopupStore {
    // 안내,알림 팝업
    confirmPop: boolean;
    confirmPopTxt: string;
    confirmPopBtn: number | null;
    handleClickConfirmPop?: () => void;
    handleCloseConfirmPop?: () => void;
    setConfirmPop: (
        show: boolean,
        txt: string,
        btn: number | null,
        handleClick?: () => void,
        handleClose?: () => void,
    ) => void;

    // 로딩 팝업
    loadingPop: boolean;
    setLoadingPop: (show: boolean) => void;

    // gnb 팝업
    gnbPopOpen: boolean;
    setGnbPopOpen: (show: boolean) => void;
}

export const usePopupStore = create<PopupStore>()(
    devtools(set => ({
        // 안내,알림 팝업
        confirmPop: false,
        confirmPopTxt: "",
        confirmPopBtn: null,
        handleClickConfirmPop: undefined,
        handleCloseConfirmPop: undefined,
        setConfirmPop: (show, txt, btn, handleClick, handleClose) =>
            set({
                confirmPop: show,
                confirmPopTxt: txt,
                confirmPopBtn: btn,
                handleClickConfirmPop: handleClick ?? undefined, // 없으면 undefined로 초기화
                handleCloseConfirmPop: handleClose ?? undefined, // 없으면 undefined로 초기화
            }),

        // 로딩 팝업
        loadingPop: false,
        setLoadingPop: (loadingPop) => set({ loadingPop }),

        // gnb 팝업
        gnbPopOpen: false,
        setGnbPopOpen: (gnbPopOpen) => set({ gnbPopOpen }),
    })),
);
