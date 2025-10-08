export default function NotiItem() {
    return (
        <div className="flex cursor-pointer">
            <div className="flex flex-1">
                <p className="w-[64px] text-[18px] font-[500] text-[#00BA97]">취소</p>
                <div className="flex flex-1 flex-col gap-[4px]">
                    <ul className="flex gap-[24px]">
                        <li className="text-[#666]">2023091352042551</li>
                        <li className="text-[#666]">카드 결제</li>
                    </ul>
                    <p className="line-clamp-1 text-[18px]">
                        <strong>자사몰</strong>
                        <span className="pl-[8px]">
                            잇포세트 6 비건베이커리 잇포레스트 비건빵비건빵비건빵비건빵비건빵
                        </span>
                    </p>
                    <p className="text-[14px] text-[#999]">2023.07.23</p>
                </div>
            </div>
            <button
                type="button"
                className="text-0 bg-ic_close_small size-[20px] bg-center bg-no-repeat -indent-[9999px]"
            >
                읽음처리
            </button>
        </div>
    );
}
