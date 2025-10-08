"use client";

import Portal from "@/components/common/common/Portal";
import { usePopupStore } from "@/store/common/usePopupStore";

import ConfirmPop from "./ConfirmPop";
import LoadingPop from "./LoadingPop";

export default function Popup() {
    const { loadingPop, confirmPop, loadingPopConsole } = usePopupStore();

    return (
        <Portal>
            {/* 알림 팝업 */}
            {confirmPop && <ConfirmPop />}

            {/* 로딩 팝업 */}
            {loadingPop && <LoadingPop console={loadingPopConsole} />}
        </Portal>
    );
}
