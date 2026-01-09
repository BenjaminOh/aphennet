import WindowPopup from "@/components/user/popup/WindowPopup";

export default function PopupPage({ params }: { params: { popup_idx: string } }) {
    return <WindowPopup popupIdx={params.popup_idx} />;
}
