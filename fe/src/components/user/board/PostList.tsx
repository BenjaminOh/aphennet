"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import NoData from "@/components/user/common/NoData";
import Pagination from "@/components/user/common/Pagination";
import SearchInput from "@/components/user/form/SearchInput";
import { SelectItem } from "@/components/user/form/SelectBox";
import {
    initialGalleryListSize,
    initialListSize,
    initialPage,
    listSearchTypes,
    PostListParams,
} from "@/constants/user/listParams";
import { usePagination } from "@/hooks/common/usePagination";
import { useUrlParams } from "@/hooks/common/useUrlParams";
import { useGetPostGroupList, useGetPostList } from "@/service/user/board";
import { initialBoardSettingData, useBoardStore } from "@/store/common/useBoardStore";
import { useNavigationStore } from "@/store/user/useNavigationStore";
import { usePopupStore } from "@/store/user/usePopupStore";
import { makeIntComma } from "@/utils/numberUtils";

import BasicList from "./-components/BasicList";
import BoardGroupTabs from "./-components/BoardGroupTabs";
import GalleryList from "./-components/GalleryList";

const schema = z.object({
    search: z.string(),
    searchtxt: z.string().optional(),
});

type SearchValues = z.infer<typeof schema>;

export interface PostItem {
    idx: number;
    b_title: string;
    b_contents: string;
    b_notice: string;
    b_reg_date: string;
    b_secret: string;
    m_name: string;
    g_status?: string;
    first_image: string | null;
    b_img: string | null;
    childBoard: number[];
}

export default function PostList({ category, boardType }: { category: string; boardType: string }) {
    const { setBoardSettingData } = useBoardStore();
    const { setCurrentPath } = useNavigationStore();
    const [boardGroupList, setBoardGroupList] = useState<SelectItem[]>([]);
    const [boardGroup, setBoardGroup] = useState("");
    const [useGroup, setUseGroup] = useState(false);
    const [items, setItems] = useState<PostItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { urlParams, updateUrlParams } = useUrlParams<PostListParams>({
        page: { defaultValue: initialPage, type: "number" },
        search: { defaultValue: "titlecontents", type: "string", validValues: listSearchTypes.map(type => type.value) },
        searchtxt: { defaultValue: "", type: "string" },
        group: { defaultValue: "", type: "string" },
    });
    const { currentPage, pages, setCurrentPage } = usePagination({ totalPages, initialPage: urlParams.page });
    const { control, setValue, register } = useForm<SearchValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            search: urlParams.search,
            searchtxt: urlParams.searchtxt,
        },
    });
    const { data: configData, isLoading: isInitialLoading } = useGetPostList(
        category || "",
        boardType === "board" ? initialListSize.toString() : initialGalleryListSize.toString(),
        urlParams.page.toString(),
        { enabled: Boolean(category) },
        urlParams.search,
        urlParams.searchtxt,
        urlParams.group === "all" ? "" : urlParams.group,
    );
    const { data: configBoardGroupList } = useGetPostGroupList(category, {
        enabled: Boolean(category && useGroup),
    });
    const { setLoadingPop } = usePopupStore();

    // urlParams.search, urlParams.searchtxt 변경 시만 동기화
    useEffect(() => {
        setValue("search", urlParams.search);
        setValue("searchtxt", urlParams.searchtxt);
    }, [urlParams.search, urlParams.searchtxt]); // eslint-disable-line react-hooks/exhaustive-deps

    // urlParams.group 변경 시만 동기화
    useEffect(() => {
        setBoardGroup(urlParams.group || "");
    }, [urlParams.group]);

    // currentPage 변경 시 URL 파라미터 업데이트
    const handleChangeCurrentPage = (page: number) => {
        updateUrlParams({
            page: page,
        });
        setCurrentPage(page);
    };

    // 검색 하기
    const handleSearch = () => {
        const formValues = control._formValues;
        const searchValue = formValues.search || "titlecontents";
        const searchTxtValue = formValues.searchtxt || "";

        updateUrlParams({
            page: 1,
            search: searchValue,
            searchtxt: searchTxtValue,
            group: urlParams.group,
        });
        setCurrentPage(1);
    };

    // 데이터 수정,삭제 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading = isInitialLoading;
        setLoadingPop(isLoading);
        return () => setLoadingPop(false);
    }, [isInitialLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    // 게시글 분류 목록 조회 (b_group === "Y"일 때만)
    useEffect(() => {
        if (configBoardGroupList) {
            const list = configBoardGroupList.data.filter(
                (item: { g_name: string; use_yn?: string[] }) =>
                    !item.use_yn || (item.use_yn && item.use_yn[0] === "Y"),
            );
            const newList = list.map((item: { id: number | null; g_name: string }) => ({
                value: !item.id ? "all" : item.id.toString(),
                label: item.g_name,
            }));
            setBoardGroupList(newList);

            // urlParams.group이 없을 때만 첫 번째 값을 기본값으로 설정
            if (newList.length > 0 && urlParams.group === "") {
                updateUrlParams({
                    ...urlParams,
                    group: newList[0].value,
                });
            }
        }
    }, [configBoardGroupList]); // eslint-disable-line react-hooks/exhaustive-deps

    // 게시글 목록 조회
    useEffect(() => {
        if (configData) {
            const data = configData.data;

            // b_group 설정
            const bGroupUse = data.b_group === "Y";
            setUseGroup(bGroupUse);

            // b_group === "N"이면 바로 목록 표시
            // b_group === "Y"이고 urlParams.group이 있으면 목록 표시
            if (!bGroupUse || (bGroupUse && urlParams.group !== "")) {
                setItems(data.data_list);
                setTotalPages(data.last_page);
                setTotalCount(data.total_count);
            }

            setBoardSettingData({
                c_content_type: data.c_content_type,
                b_column_title: data.b_column_title,
                b_column_date: data.b_column_date,
                b_column_recom: data.b_column_recom,
                b_column_file: data.b_column_file,
                limit: data.limit,
                b_read_lv: data.b_read_lv,
                b_write_lv: data.b_write_lv,
                b_secret: data.b_secret,
                b_reply: data.b_reply,
                b_reply_lv: data.b_reply_lv,
                b_comment: data.b_comment,
                b_comment_lv: data.b_comment_lv,
                b_top_html: data.b_top_html,
                b_template: data.b_template,
                b_template_text: data.b_template_text,
                b_thumbnail_with: data.b_thumbnail_with,
                b_thumbnail_height: data.b_thumbnail_height,
                b_group: data.b_group,
            });
        } else {
            setItems([]);
            setTotalPages(1);
            setTotalCount(0);
            setBoardSettingData(initialBoardSettingData);
            setUseGroup(false);
        }
    }, [configData, urlParams.group]); // eslint-disable-line react-hooks/exhaustive-deps

    // 게시글 분류 탭 변경 시 URL 파라미터 업데이트
    const handleChangeBoardGroup = (value: string) => {
        updateUrlParams({
            ...urlParams,
            page: 1,
            group: value,
        });
        setCurrentPage(1);
    };

    const handlePostClick = () => {
        setCurrentPath(window.location.pathname + window.location.search);
    };

    return (
        <>
            <div
                className={`flex flex-col gap-[6px] pb-[80px] md:gap-[30px] md:pb-[120px]${
                    boardGroupList.length > 0 ? " md:-mt-[20px]" : ""
                }`}
            >
                {boardGroupList.length > 0 && (
                    <BoardGroupTabs list={boardGroupList} active={boardGroup} handleClick={handleChangeBoardGroup} />
                )}
                <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-[16px] px-[20px] md:gap-[24px] md:px-[28px] min-[1400px]:px-0">
                    <div className="flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between">
                        <p className="font-[500]">
                            총<span className="px-[4px] text-primary">{makeIntComma(totalCount)}</span>개
                        </p>
                        <div className="flex flex-col gap-[8px] md:flex-row md:items-center md:gap-[20px]">
                            <SearchInput
                                {...register("searchtxt")}
                                handleClick={handleSearch}
                                boxClassName="md:w-[400px]"
                            />
                            {/* {boardSettingData.b_write_lv === 0 && (
                    <Link
                                        href={`/${category}/create`}
                                        className="h-[48px] w-full rounded-[12px] bg-primary-2 text-center font-[700] leading-[48px] text-white md:w-[160px]"
                    >
                        게시글 등록
                    </Link>
                                )} */}
                            {/* {boardType === "inquiry" && (
                                <Link
                                    href={`/${category}/create`}
                                    className="h-[48px] w-full rounded-[12px] bg-primary-2 text-center font-[700] leading-[48px] text-white md:w-[160px]"
                                >
                                    문의 등록
                                </Link>
                            )} */}
                        </div>
                    </div>
                    {isInitialLoading ? (
                        <></>
                    ) : items && items.length > 0 ? (
                        boardType === "board" ? (
                            <BasicList items={items} category={category} handlePostClick={handlePostClick} />
                        ) : boardType === "gallery" ? (
                            <GalleryList items={items} category={category} handlePostClick={handlePostClick} />
                        ) : null
                    ) : (
                        <NoData />
                    )}
                    {totalCount > 0 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            pages={pages}
                            handleChangePage={handleChangeCurrentPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
