import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserPopupStore {
    closedPopups: Set<string>;
    setClosedPopup: (index: number) => void;
    setOneDayClosedPopup: (index: number) => void;
    isPopupClosed: (index: number) => boolean;
}

export const useUserPopupStore = create<UserPopupStore>()(
    devtools((set, get) => ({
        closedPopups: new Set(),
        setClosedPopup: index =>
            set(state => ({
                closedPopups: new Set(Array.from(state.closedPopups).concat(`aphen-popup-${index}`)),
            })),
        setOneDayClosedPopup: index => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            localStorage.setItem(`aphen-popup-${index}-hide-until`, tomorrow.toISOString());
            get().setClosedPopup(index);
        },
        isPopupClosed: index => {
            const popupKey = `aphen-popup-${index}`;
            const hideUntil = localStorage.getItem(`aphen-popup-${popupKey}-hide-until`);

            if (hideUntil) {
                const hideDate = new Date(hideUntil);
                const now = new Date();
                if (now < hideDate) {
                    return true;
                }
                localStorage.removeItem(`aphen-popup-${popupKey}-hide-until`);
            }

            return get().closedPopups.has(popupKey);
        },
    })),
);
