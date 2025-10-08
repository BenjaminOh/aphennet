"use client";

import { SimpleTreeItemWrapper, TreeItemComponentProps, TreeItems } from "dnd-kit-sortable-tree";
import { ItemChangedReason } from "dnd-kit-sortable-tree/dist/types";
import dynamic from "next/dynamic";
// import Image from "next/image";
import { forwardRef } from "react";

// import icDragGray from "@/assets/images/console/icDragGray.svg";
// import icDragTeal from "@/assets/images/console/icDragTeal.svg";
// import icPlusGray from "@/assets/images/console/icPlusGray.svg";
// import icPlusTeal from "@/assets/images/console/icPlusTeal.svg";
import { makeIntComma } from "@/utils/numberUtils";

export interface CategoryData {
    id: number | string;
    catecode: number;
    name: string;
    depth: number;
    sort: number;
    parent?: number;
    ishidden?: string;
    isdisplaymain?: string;
    submenu?: CategoryData[];
    canHaveChildren?: ((dragItem: CategoryData) => boolean) | boolean;
    collapsed?: boolean;
}

export type CategoryTreeItems = TreeItems<CategoryData>;

export type ExtendedItemChangedReason = ItemChangedReason<CategoryData> & {
    draggedItem: CategoryData;
    draggedFromParent: CategoryData;
    droppedToParent: CategoryData;
};

// SortableTree를 클라이언트에서만 로드하도록 설정 (SSR 비활성화)
const SortableTree = dynamic(
    () =>
        import("dnd-kit-sortable-tree").then(mod => {
            const Component = mod.SortableTree as unknown as typeof mod.SortableTree<CategoryData, HTMLDivElement>;
            return Component;
        }),
    {
        ssr: false, // 서버 사이드 렌더링 비활성화
    },
);

interface DraggableCategoryListProps {
    items: CategoryTreeItems;
    categoryOn: number | null;
    setCategoryOn: (id: number | null) => void;
    className?: string;
    handleItemsChanged: (items: CategoryTreeItems, reason: ExtendedItemChangedReason) => void;
    setDepth?: (depth: number) => void; // 상품 - 카테고리관리 에서 사용
}

interface CategoryItemProps extends TreeItemComponentProps<CategoryData> {
    categoryOn: number | null;
    setCategoryOn: (id: number | null) => void;
    className?: string;
    setDepth?: (depth: number) => void;
}

export const CategoryItem = forwardRef<HTMLDivElement, CategoryItemProps>(
    ({ categoryOn, setCategoryOn, setDepth, ...props }, ref) => {
        // 클릭시 해당 id 값 넘겨주기
        const handleClick = () => {
            if (categoryOn === props.item.catecode) {
                setCategoryOn(null);
                if (setDepth) setDepth(1);
            } else {
                setCategoryOn(props.item.catecode);
                if (setDepth) setDepth(props.item.depth);
            }
        };

        // 전체 하위 항목 개수 구하는 함수
        const countAllChildren = (item: CategoryData): number => {
            if (!item.submenu || item.submenu.length === 0) return 0;

            return item.submenu.reduce((acc, child) => {
                return acc + 1 + countAllChildren(child);
            }, 0);
        };

        return (
            <SimpleTreeItemWrapper
                {...props}
                ref={ref}
                showDragHandle={false}
                indentationWidth={0}
                className={`${props.item.depth && props.item.depth > 0 ? "menu_" + props.item.depth : "menu"}${
                    categoryOn === props.item.id ? " on" : ""
                }${props.childCount && !props.collapsed ? " open" : ""}${
                    props.item.ishidden === "T" ? " disabled" : ""
                } [&>div]:block [&>div]:border-none [&>div]:p-0`}
            >
                <div
                    className="flex justify-between p-[13px_24px]"
                    onClick={e => {
                        e.stopPropagation(); // 내부 토글 동작 차단
                        handleClick();
                    }}
                >
                    <div className="txt_box flex w-[calc(100%-120px)] flex-wrap items-center gap-[8px] font-[500]">
                        <p className="txt max-w-[78%] truncate">{props.item.name}</p>
                        <p className="text-[14px] text-[#666]">({makeIntComma(countAllChildren(props.item))})</p>
                    </div>
                    <div className="flex w-[112px] items-center justify-between">
                        <button type="button">
                            {/* <Image src={categoryOn === props.item.id ? icPlusTeal : icPlusGray} alt="추가" /> */}
                        </button>
                        {/* <div {...props.handleProps} className="menu-drag">
                            <Image src={categoryOn === props.item.id ? icDragTeal : icDragGray} alt="이동" />
                        </div> */}
                    </div>
                </div>
            </SimpleTreeItemWrapper>
        );
    },
);

CategoryItem.displayName = "CategoryItem"; // forwardRef 사용 시 필요

export default function DraggableCategoryTree({
    items,
    categoryOn,
    setCategoryOn,
    className = "",
    handleItemsChanged,
    setDepth,
}: DraggableCategoryListProps) {
    const CustomTreeItem = (props: TreeItemComponentProps<CategoryData>) => (
        <CategoryItem
            {...props}
            categoryOn={categoryOn}
            setCategoryOn={setCategoryOn}
            className={className}
            setDepth={setDepth}
        />
    );

    return (
        <ul className={`dnd_category ${className}`}>
            <SortableTree
                items={items}
                onItemsChanged={handleItemsChanged}
                TreeItemComponent={CustomTreeItem}
                dropAnimation={null}
                // keepGhostInPlace={true}
                canRootHaveChildren={false}
            />
        </ul>
    );
}
