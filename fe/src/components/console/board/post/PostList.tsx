"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingSpinner from "@/components/common/common/LoadingSpinner";
import DraggableList from "@/components/console/common/DraggableList";
import NoData from "@/components/console/common/NoData";
import Pagination from "@/components/console/common/Pagination";
import ResizableSplit from "@/components/console/common/ResizableSplit";
import AllCheckbox from "@/components/console/form/AllCheckbox";
import Checkbox from "@/components/console/form/Checkbox";
import ListSizeSelect from "@/components/console/form/ListSizeSelect";
import SearchInput from "@/components/console/form/SearchInput";
import SelectBox, { SelectItem } from "@/components/console/form/SelectBox";
import Toggle from "@/components/console/form/Toggle";
import BoardGroupPop from "@/components/console/popup/BoardGroupPop";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/config/apiConfig";
import {
    initialListSize,
    initialPage,
    listSearchTypes,
    listSizes,
    PostListParams,
} from "@/constants/console/listParams";
import { usePagination } from "@/hooks/common/usePagination";
import { useUrlParams } from "@/hooks/common/useUrlParams";
import { useCheckboxList } from "@/hooks/console/useCheckboxList";
import { useToast } from "@/hooks/use-toast";
import { useDelPost, useGetPostList } from "@/service/common";
import { usePutPostNotice, usePutPostOrder } from "@/service/console/board/post";
import { useGetBoardGroupList } from "@/service/console/menu/category";
import { initialBoardSettingData, useBoardStore } from "@/store/common/useBoardStore";
import { usePopupStore } from "@/store/common/usePopupStore";
import { makeIntComma } from "@/utils/numberUtils";
import { calculatePrevPage } from "@/utils/paginationUtils";

import PostDetail from "./PostDetail";
import PostForm from "./PostForm";

const schema = z.object({
    search: z.string(),
    searchtxt: z.string().optional(),
});

type SearchValues = z.infer<typeof schema>;

export interface PostItem {
    idx: number;
    category: number;
    b_title: string;
    b_notice: string;
    b_num: number;
    b_img: string | null;
    g_name: string | null;
    g_status: string;
    comment_count: number;
}

interface BoardGroupItem {
    id: number;
    g_num: number;
    g_name: string;
    use_yn: string[];
}

export default function PostList() {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const prevCategoryRef = useRef(category);
    const { setBoardSettingData, boardSettingData } = useBoardStore();
    const [boardGroupList, setBoardGroupList] = useState<SelectItem[]>([]);
    const [boardGroup, setBoardGroup] = useState("");
    const [groupEnabled, setGroupEnabled] = useState(false);
    const [items, setItems] = useState<PostItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { urlParams, updateUrlParams, resetUrlParams } = useUrlParams<PostListParams>({
        page: { defaultValue: initialPage, type: "number" },
        search: { defaultValue: "titlecontents", type: "string", validValues: listSearchTypes.map(type => type.value) },
        searchtxt: { defaultValue: "", type: "string" },
        detail: { defaultValue: "", type: "string" },
        create: { defaultValue: "0", type: "string" },
        edit: { defaultValue: "0", type: "string" },
        group: { defaultValue: "all", type: "string" },
        listSize: { defaultValue: initialListSize, type: "number", validValues: listSizes },
    });
    const { currentPage, pages, setCurrentPage } = usePagination({ totalPages, initialPage: urlParams.page });
    const { allCheck, setCheckList, checkedList, setCheckedList, handleAllCheck, handleCheck } = useCheckboxList();
    const [detailOn, setDetailOn] = useState("");
    const [createOn, setCreateOn] = useState(false);
    const [editOn, setEditOn] = useState(false);
    const [detailRefetch, setDetailRefetch] = useState(false);
    const { control, setValue, register } = useForm<SearchValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            search: urlParams.search,
            searchtxt: urlParams.searchtxt,
        },
    });
    const { data: boardGroupListData, isLoading: isBoardGroupListLoading } = useGetBoardGroupList(category, {
        enabled: groupEnabled,
    });
    const {
        data: configData,
        isLoading: isInitialLoading,
        refetch,
        error: getPostListError,
    } = useGetPostList(
        category || "",
        urlParams.listSize.toString(),
        urlParams.page.toString(),
        { enabled: Boolean(category) },
        urlParams.search,
        urlParams.searchtxt,
        urlParams.group === "all" ? "" : urlParams.group,
    );
    const putBoardOrderMutation = usePutPostOrder();
    const putBoardNoticeMutation = usePutPostNotice();
    const delBoardMutation = useDelPost();
    const { setConfirmPop, setLoadingPop } = usePopupStore();
    const { toast } = useToast();

    // category 변경 시 초기화
    useEffect(() => {
        if (prevCategoryRef.current !== category) {
            resetUrlParams();
            setCurrentPage(1);
            setValue("search", "title");
            setValue("searchtxt", "");
            prevCategoryRef.current = category;
        }
    }, [category, resetUrlParams, setCurrentPage, setValue]);

    // urlParams.search, urlParams.searchtxt 변경 시만 동기화
    useEffect(() => {
        setValue("search", urlParams.search);
        setValue("searchtxt", urlParams.searchtxt);
    }, [urlParams.search, urlParams.searchtxt]); // eslint-disable-line react-hooks/exhaustive-deps

    // detail 파라미터 동기화
    useEffect(() => {
        setDetailOn(urlParams.detail ? urlParams.detail : "");
    }, [urlParams.detail]);

    // create 파라미터 동기화
    useEffect(() => {
        setCreateOn(urlParams.create === "1");
    }, [urlParams.create]);

    // edit 파라미터 동기화
    useEffect(() => {
        setEditOn(urlParams.edit === "1");
    }, [urlParams.edit]);

    // urlParams.group 변경 시만 동기화
    useEffect(() => {
        setBoardGroup(urlParams.group);
    }, [urlParams.group]); // eslint-disable-line react-hooks/exhaustive-deps

    // currentPage 변경 시 URL 파라미터 업데이트
    const handleChangeCurrentPage = (page: number) => {
        updateUrlParams({
            page: page,
            group: urlParams.group,
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
            detail: undefined,
            group: urlParams.group,
        });
        setCurrentPage(1);
    };

    // 데이터 수정,삭제 중일 때 로딩 팝업 표시
    useEffect(() => {
        const isLoading =
            isBoardGroupListLoading ||
            putBoardNoticeMutation.isPending ||
            delBoardMutation.isPending ||
            putBoardOrderMutation.isPending;
        setLoadingPop(isLoading);
        return () => setLoadingPop(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isBoardGroupListLoading,
        putBoardNoticeMutation.isPending,
        delBoardMutation.isPending,
        putBoardOrderMutation.isPending,
    ]);

    // 게시판 분류 목록 조회
    useEffect(() => {
        if (boardGroupListData) {
            const list = boardGroupListData.data.filter((item: BoardGroupItem) => item.use_yn[0] === "Y");
            const newList = list.map((item: BoardGroupItem) => ({
                value: item.id.toString(),
                label: item.g_name,
            }));
            setBoardGroupList([{ value: "all", label: "전체" }, ...newList]);
        } else {
            setBoardGroupList([]);
            updateUrlParams({
                ...urlParams,
                group: "",
            });
        }
    }, [boardGroupListData]); // eslint-disable-line react-hooks/exhaustive-deps

    // 게시글 목록 조회
    useEffect(() => {
        if (configData) {
            const data = configData.data;
            setItems(data.data_list);
            setTotalPages(data.last_page);
            setTotalCount(data.total_count);
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
            setGroupEnabled(data.b_group === "Y");
        } else {
            setItems([]);
            setTotalPages(1);
            setTotalCount(0);
            setBoardSettingData(initialBoardSettingData);
            setGroupEnabled(false);
        }
    }, [configData]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 처리
    useEffect(() => {
        if (getPostListError) {
            notFound();
        }
    }, [getPostListError]);

    // 리스트 idx 값만 배열로 (전체 체크박스리스트 만들기)
    useEffect(() => {
        setCheckList(items && items.length > 0 ? items.map(item => item.idx) : []);
        setCheckedList([]);
    }, [items, setCheckList, setCheckedList]);

    // 게시글 분류 탭 변경 시 URL 파라미터 업데이트
    const handleChangeBoardGroup = (value: string) => {
        updateUrlParams({
            ...urlParams,
            page: 1,
            group: value,
            searchtxt: undefined,
        });
        setCurrentPage(1);
    };

    // 게시글 상세 열기
    const handleOpenDetail = (idx: number) => {
        if (detailOn === idx.toString()) {
            updateUrlParams({
                ...urlParams,
                detail: undefined,
                create: undefined,
                edit: undefined,
            });
        } else {
            updateUrlParams({
                ...urlParams,
                detail: idx.toString(),
                create: undefined,
                edit: undefined,
            });
        }
    };

    // 게시글 등록 열기
    const handleOpenCreate = () => {
        const create = createOn ? "0" : "1";
        updateUrlParams({
            ...urlParams,
            detail: undefined,
            create,
            edit: undefined,
        });
    };

    // 순서 변경 처리
    const handleChangeOrder = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!category) return;
        if (!over || active.id === over.id) return;

        const body = {
            idx: Number(active.id),
            category: Number(category),
            b_num: over.data.current?.b_num,
        };

        putBoardOrderMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "순서가 변경되었습니다.",
                });
                refetch();
            },
        });
    };

    // 공지설정 변경
    const handleChangeNotice = (idx: number, checked: boolean) => {
        if (!category) return;
        const body = {
            idx: [idx],
            category: Number(category),
            notice: checked ? "1" : "0",
        };

        putBoardNoticeMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "공지설정이 변경되었습니다.",
                });
                refetch();
                setDetailRefetch(true);
            },
        });
    };

    // 삭제 확인
    const handleConfirmDelete = (idx?: string) => {
        if (idx || checkedList.length > 0) {
            setConfirmPop(true, "삭제하시겠습니까?", 2, () => handleDelete(idx));
        } else {
            setConfirmPop(true, "게시글을 선택해주세요.", 1);
        }
    };

    // 삭제하기
    const handleDelete = (idx?: string) => {
        if (!category) return;
        const body = { idx: idx ? [idx] : checkedList, category: Number(category), pass: "T" };
        delBoardMutation.mutate(body, {
            onSuccess: () => {
                toast({
                    title: "삭제되었습니다.",
                });

                // 삭제 후 refetch 전에 페이지 이동 처리
                const prevPage = calculatePrevPage(urlParams.page, items.length);

                updateUrlParams({
                    ...urlParams,
                    page: prevPage,
                    detail: undefined,
                    edit: undefined,
                });
                refetch();
                setCurrentPage(prevPage);
            },
        });
    };

    // 게시글 수정 열기
    const handleOpenEdit = () => {
        updateUrlParams({
            ...urlParams,
            create: undefined,
            edit: "1",
        });
    };

    // 게시글 등록/수정 취소시
    const handlePostCancel = () => {
        updateUrlParams({
            ...urlParams,
            create: undefined,
            edit: undefined,
        });
    };

    // 게시글 등록/수정 완료시
    const onPostComplete = (edit?: boolean) => {
        updateUrlParams({
            ...urlParams,
            detail: edit ? detailOn : undefined,
            create: undefined,
            edit: undefined,
        });
        refetch();
    };

    // 게시글 삭제 완료시
    const onDeleteComplete = (reply: boolean) => {
        // 삭제 후 refetch 전에 페이지 이동 처리
        const prevPage = calculatePrevPage(urlParams.page, items.length);

        // 답글 삭제 아닐때만 게시글상세 닫기
        if (!reply) {
            updateUrlParams({
                ...urlParams,
                page: prevPage,
                detail: undefined,
                edit: undefined,
            });
        }
        refetch();
        setCurrentPage(prevPage);
    };

    return (
        <ResizableSplit
            left={
                <div className="flex h-[calc(100vh-90px)] flex-col">
                    <div className="min-h-0 flex-1">
                        <ScrollArea className="h-full pr-[7px]">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-[#D9D9D9] py-[8px]">
                                    <p className="font-[500]">
                                        <span className="text-console">{makeIntComma(totalCount)} </span>개
                                    </p>
                                    <button
                                        type="button"
                                        className="h-[40px] rounded-[8px] bg-black px-[20px] text-[18px] font-[700] text-white"
                                        onClick={handleOpenCreate}
                                    >
                                        게시글 등록
                                    </button>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-[8px] py-[8px]">
                                    <div className="flex items-center gap-[8px]">
                                        <AllCheckbox
                                            checked={allCheck}
                                            onChange={e => handleAllCheck(e.currentTarget.checked)}
                                        />
                                        {groupEnabled && ( // 게시판 분류 사용시에만 노출
                                            <>
                                                <SelectBox
                                                    list={boardGroupList}
                                                    value={boardGroup}
                                                    onChange={handleChangeBoardGroup}
                                                    triggerClassName="h-[34px] min-w-[120px]"
                                                />
                                                <BoardGroupPop parentId={category} />
                                            </>
                                        )}
                                        <button
                                            type="button"
                                            className="h-[34px] rounded-[8px] bg-[#FEE2E2] px-[16px] font-[500] text-[#E5313D]"
                                            onClick={() => handleConfirmDelete()}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                    <div className="flex gap-[8px]">
                                        <SearchInput {...register("searchtxt")} handleClick={handleSearch} />
                                        <ListSizeSelect
                                            value={urlParams.listSize}
                                            onChange={value => updateUrlParams({ listSize: value })}
                                            className="h-[34px] min-w-[100px]"
                                        />
                                    </div>
                                </div>
                                {isInitialLoading ? (
                                    <LoadingSpinner />
                                ) : items && items.length > 0 ? (
                                    <DraggableList
                                        items={items}
                                        getItemId={item => item.idx}
                                        getItemData={item => ({
                                            b_num: item.b_num,
                                        })}
                                        renderRow={item => (
                                            <div
                                                className={`group flex min-h-[60px] cursor-pointer items-center justify-between gap-[16px] rounded-[12px] border bg-white p-[8px_20px_8px_8px] transition-all hover:border-console ${
                                                    detailOn === item.idx.toString() ? "border-console" : "border-white"
                                                }`}
                                                onClick={() => handleOpenDetail(item.idx)}
                                            >
                                                <div className="flex min-w-0 flex-1 items-center gap-[16px]">
                                                    <div className="flex shrink-0 justify-center pl-[24px]">
                                                        <Checkbox
                                                            checked={checkedList.includes(item.idx)}
                                                            onChange={e =>
                                                                handleCheck(e.currentTarget.checked, item.idx)
                                                            }
                                                        />
                                                    </div>
                                                    {/* 갤러리 게시판일때만 게시글 썸네일 노출 */}
                                                    {boardSettingData.c_content_type === 5 && item.b_img && (
                                                        <div className="flex h-[90px] w-[160px] shrink-0 justify-center overflow-hidden rounded-[8px] border border-[#D9D9D9] bg-[#353535]">
                                                            <img
                                                                src={`${API_URL}/${item.b_img}`}
                                                                alt="게시글 이미지"
                                                                className="h-full max-w-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex min-w-0 flex-1 basis-0 items-center gap-[4px]">
                                                        <p
                                                            className={`min-w-0 flex-1 truncate text-left font-[500] text-[#222] transition-all group-hover:underline${
                                                                detailOn === item.idx.toString() ? " underline" : ""
                                                            }`}
                                                        >
                                                            {`${
                                                                groupEnabled && item.g_name ? `[${item.g_name}] ` : ""
                                                            }${item.b_title}`}
                                                        </p>
                                                        {item.comment_count > 0 && (
                                                            <p className="shrink-0">
                                                                ({makeIntComma(item.comment_count)})
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-[8px]">
                                                    <ul className="flex gap-[8px]">
                                                        {boardSettingData.c_content_type === 7 && ( // 1:1문의 게시판일때만 노출
                                                            <li className="flex min-w-[80px] flex-col gap-[4px]">
                                                                <p className="text-[14px] text-[#9F9FA5]">답변상태</p>
                                                                <p
                                                                    className={`font-[700] ${
                                                                        item.g_status === "답변완료"
                                                                            ? "text-console-2"
                                                                            : "text-[#9F9FA5]"
                                                                    }`}
                                                                >
                                                                    {item.g_status}
                                                                </p>
                                                            </li>
                                                        )}
                                                    </ul>
                                                    <Toggle
                                                        txt="공지"
                                                        checked={item.b_notice === "1"}
                                                        handleChange={checked => handleChangeNotice(item.idx, checked)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        handleChangeOrder={handleChangeOrder}
                                    />
                                ) : (
                                    <NoData className="flex-1" />
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                    {totalCount > 0 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            pages={pages}
                            handleChangePage={handleChangeCurrentPage}
                        />
                    )}
                </div>
            }
            right={
                <ScrollArea className="h-[calc(100vh-90px)]">
                    {!createOn && detailOn && !editOn ? (
                        <div className="h-full p-[0_20px_20px_7px]">
                            <PostDetail
                                category={category}
                                detailIdx={detailOn}
                                handleEdit={handleOpenEdit}
                                onDeleteComplete={onDeleteComplete}
                                onCompleteComment={() => refetch()}
                            />
                        </div>
                    ) : createOn || (editOn && detailOn) ? (
                        <PostForm
                            detailIdx={detailOn}
                            onComplete={onPostComplete}
                            handleCancel={handlePostCancel}
                            refetch={detailRefetch}
                            onRefetched={() => setDetailRefetch(false)}
                            handleConfirmDelete={handleConfirmDelete}
                        />
                    ) : (
                        <div className="h-full p-[0_20px_20px_7px]">
                            <NoData txt="선택된 컨텐츠가 없습니다." className="h-full rounded-[12px] bg-white" />
                        </div>
                    )}
                </ScrollArea>
            }
        />
    );
}
