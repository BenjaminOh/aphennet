"use client";

import Portal from "@/components/common/common/Portal";
import { usePopupStore } from "@/store/common/usePopupStore";

import ConfirmPop from "../../common/popup/ConfirmPop";
import LoadingPop from "../../common/popup/LoadingPop";

export default function Popup() {
    const { loadingPop, confirmPop } = usePopupStore();

    return (
        <Portal>
            {/* 알림 팝업 */}
            {confirmPop && <ConfirmPop />}

            {/* 로딩 팝업 */}
            {loadingPop && <LoadingPop />}
        </Portal>
    );
}
