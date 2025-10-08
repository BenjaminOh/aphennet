"use client";

import { useEffect, useState } from "react";

import LanguageTabs from "@/components/console/common/LanguageTabs";
// import LoadingSpinner from "@/components/console/common/LoadingSpinner";
import NoData from "@/components/console/common/Nodata";
import ResizableSplit from "@/components/console/common/ResizableSplit";
// import Tabs from "@/components/console/common/Tabs";
// import AllCheckbox from "@/components/console/form/AllCheckbox";
// import Checkbox from "@/components/console/form/Checkbox";
// import SearchInput from "@/components/console/form/SearchInput";
// import Toggle from "@/components/console/form/Toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryListParams } from "@/constants/console/listParams";
import useLangTypes from "@/hooks/console/useLangTypes";
import useUrlParams from "@/hooks/console/useUrlParams";
import { useGetCategoryList } from "@/service/console/menu/category";
// import { usePopupStore } from "@/store/common/usePopupStore";
// import { makeIntComma } from "@/utils/numberUtils";

// import DraggableCategoryTree from "./-components/DraggableCategoryTree";
// import CategoryForm from "./CategoryForm";

export interface CategoryItem {
    id: number;
    c_depth: number;
    c_depth_parent: number;
    c_num: number;
    c_name: string;
    c_main_banner: string;
    c_main_banner_file: string;
    c_menu_ui: string | null;
    c_menu_on_img: string | null;
    c_menu_off_img: string | null;
    c_content_type: string | null;
    c_lang: string;
    submenu: CategoryItem[];
}

export default function CategoryList() {
    const { langTypes, initialLang } = useLangTypes();
    // const [items, setItems] = useState<CategoryItem[]>([]);
    // const [totalCount, setTotalCount] = useState(0);
    const { urlParams, updateUrlParams } = useUrlParams<CategoryListParams>({
        lang: { defaultValue: initialLang, type: "string", validValues: langTypes },
        detail: { defaultValue: "", type: "string" },
        create: { defaultValue: "0", type: "string" },
    });
    const [detailOn, setDetailOn] = useState("");
    const [createOn, setCreateOn] = useState(false);
    // const [detailRefetch, setDetailRefetch] = useState(false);
    const {
        // data: configData,
        // isLoading: isInitialLoading,
        // refetch,
    } = useGetCategoryList(urlParams.lang, {
        enabled: !!urlParams.lang,
    });
    // const { setConfirmPop, setLoadingPop } = usePopupStore();

    // detail 파라미터 동기화
    useEffect(() => {
        setDetailOn(urlParams.detail ? urlParams.detail : "");
    }, [urlParams.detail]);

    // create 파라미터 동기화
    useEffect(() => {
        setCreateOn(urlParams.create === "1");
    }, [urlParams.create]);

    // 언어탭 변경 시
    const handleChangeLangTab = (lang: string) => {
        updateUrlParams({ lang: lang, detail: undefined, create: undefined });
    };

    // 팝업 목록 조회
    // useEffect(() => {
    //     if (configData) {
    //         const data = configData.data;
    //         setItems(data.data_list);
    //         setTotalCount(data.total_count);
    //     } else {
    //         setItems([]);
    //         setTotalCount(0);
    //     }
    // }, [configData]);

    // 팝업 상세 열기
    // const handleOpenDetail = (idx: number) => {
    //     if (detailOn === idx.toString()) {
    //         updateUrlParams({
    //             ...urlParams,
    //             detail: undefined,
    //             create: undefined,
    //         });
    //     } else {
    //         updateUrlParams({
    //             ...urlParams,
    //             detail: idx.toString(),
    //             create: undefined,
    //         });
    //     }
    // };

    // 팝업 등록 열기
    // const handleOpenCreate = () => {
    //     const create = createOn ? "0" : "1";
    //     updateUrlParams({
    //         ...urlParams,
    //         detail: undefined,
    //         create,
    //     });
    // };

    // // 삭제 확인
    // const handleConfirmDelete = () => {
    //     if (checkedList.length > 0) {
    //         setConfirmPop(true, "팝업을 삭제하시겠습니까?", 2, () => handleDelete());
    //     } else {
    //         setConfirmPop(true, "팝업을 선택해주세요.", 1);
    //     }
    // };

    // // 삭제하기
    // const handleDelete = () => {
    //     const body = { idx: checkedList };
    //     delPopupMutation.mutate(body, {
    //         onSuccess: () => {
    //             setConfirmPop(true, "삭제되었습니다.", 1);
    //             if (checkedList.includes(Number(detailOn))) {
    //                 updateUrlParams({
    //                     ...urlParams,
    //                     detail: undefined,
    //                 });
    //             }
    //             refetch();
    //         },
    //     });
    // };

    // 팝업정보 수정 취소시
    // const handleEditCancel = () => {
    //     updateUrlParams({
    //         ...urlParams,
    //         detail: undefined,
    //     });
    // };

    // 팝업 등록/수정 완료시
    // const onEditComplete = () => {
    //     updateUrlParams({
    //         ...urlParams,
    //         detail: detailOn ? detailOn : undefined,
    //         create: undefined,
    //     });
    //     refetch();
    // };

    // 팝업 삭제 완료시
    // const onDeleteComplete = () => {
    //     updateUrlParams({
    //         ...urlParams,
    //         detail: undefined,
    //     });
    //     refetch();
    // };

    return (
        <>
            <div className="pr-[20px]">
                <LanguageTabs activeLang={urlParams.lang} handleLanguageChange={handleChangeLangTab} />
            </div>
            <ResizableSplit
                left={
                    <div className="flex h-[calc(100vh-136px)] flex-col">
                        <div className="min-h-0 flex-1">
                            <ScrollArea className="h-full pr-[7px]">
                                {/* <DraggableCategoryTree
                                    items={items}
                                    categoryOn={categoryOn}
                                    setCategoryOn={setCategoryOn}
                                    handleItemsChanged={handleItemsChanged}
                                    setDepth={setDepth}
                                /> */}
                            </ScrollArea>
                        </div>
                    </div>
                }
                right={
                    <ScrollArea className="h-[calc(100vh-136px)]">
                        {detailOn || createOn ? (
                            // <CategoryForm
                            //     lang={urlParams.lang || initialLang}
                            //     mode={detailOn ? "edit" : "create"}
                            //     detailIdx={detailOn}
                            //     onComplete={onEditComplete}
                            //     handleCancel={handleEditCancel}
                            //     refetch={detailRefetch}
                            //     onRefetched={() => setDetailRefetch(false)}
                            //     onDeleteComplete={onDeleteComplete}
                            // />
                            <div />
                        ) : (
                            <div className="h-full p-[0_20px_20px_7px]">
                                <NoData
                                    txt="선택된 컨텐츠가 없습니다."
                                    className="h-full rounded-[12px] bg-white shadow-[0_18px_40px_0_rgba(112,144,176,0.12)]"
                                />
                            </div>
                        )}
                    </ScrollArea>
                }
            />
        </>
    );
}
