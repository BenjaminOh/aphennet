"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import subTitle from "@/assets/images/user/subTitle.png";
import { useMenuNavigation } from "@/hooks/user/useMenuNavigation";
import { MenuItem, useSiteStore } from "@/store/common/useSiteStore";

import SubSelect, { SubSelectItem } from "./SubSelect";

export default function SubTop({ category }: { category: string }) {
    const { menuList } = useSiteStore();
    const { handleCategoryClick } = useMenuNavigation();
    const [list, setList] = useState<MenuItem[]>([]);
    const [topParent, setTopParent] = useState<MenuItem | null>(null);
    const [selectList, setSelectList] = useState<SubSelectItem[]>([]);
    const [selectValue, setSelectValue] = useState("");

    // 메뉴 목록 조회
    useEffect(() => {
        if (menuList && menuList.length > 0) {
            setList(menuList);
        } else {
            setList([]);
        }
    }, [menuList]);

    // 메뉴 ID로 특정 depth의 부모를 찾는 함수
    const findParentByDepth = (menuList: MenuItem[], targetId: number, targetDepth: number): MenuItem | null => {
        const findMenuRecursively = (menus: MenuItem[], parentStack: MenuItem[] = []): MenuItem | null => {
            for (const menu of menus) {
                // 현재 메뉴가 찾는 메뉴인 경우
                if (menu.id === targetId) {
                    // 부모 스택에서 해당 depth의 부모 찾기
                    return parentStack.find(parent => parent.c_depth === targetDepth) || null;
                }

                // 하위메뉴가 있는 경우 재귀적으로 찾기
                if (menu.submenu && menu.submenu.length > 0) {
                    const newParentStack = [...parentStack, menu];
                    const result = findMenuRecursively(menu.submenu, newParentStack);
                    if (result !== null) {
                        return result;
                    }
                }
            }
            return null;
        };

        return findMenuRecursively(menuList);
    };

    // 메뉴 ID로 바로 위 부모를 찾는 함수
    const findDirectParent = (menuList: MenuItem[], targetId: number): MenuItem | null => {
        const findMenuRecursively = (menus: MenuItem[], parent: MenuItem | null = null): MenuItem | null => {
            for (const menu of menus) {
                // 현재 메뉴가 찾는 메뉴인 경우
                if (menu.id === targetId) {
                    return parent;
                }

                // 하위메뉴가 있는 경우 재귀적으로 찾기
                if (menu.submenu && menu.submenu.length > 0) {
                    const result = findMenuRecursively(menu.submenu, menu);
                    if (result !== null) {
                        return result;
                    }
                }
            }
            return null;
        };

        return findMenuRecursively(menuList);
    };

    // category ID로 최상위 부모 찾기
    useEffect(() => {
        if (category && list.length > 0) {
            const categoryId = parseInt(category);
            const topLevelParent = findParentByDepth(list, categoryId, 1);
            setTopParent(topLevelParent);
        } else {
            setTopParent(null);
        }
    }, [category, list]); // eslint-disable-line react-hooks/exhaustive-deps

    // category ID로 바로 위 부모의 submenu 가져오기
    useEffect(() => {
        if (category && list.length > 0) {
            const categoryId = parseInt(category);
            const directParent = findDirectParent(list, categoryId);

            if (directParent?.submenu) {
                const list = directParent.submenu;
                const parentSubmenu = list.map(item => {
                    return {
                        value: item.id.toString(),
                        label: item.c_name,
                    };
                });
                setSelectList(parentSubmenu);
                setSelectValue(parentSubmenu.find(item => item.value === category)?.value || "");
            } else {
                setSelectList([]);
                setSelectValue("");
            }
        } else {
            setSelectList([]);
            setSelectValue("");
        }
    }, [category, list]);

    const handleSelectValue = (value: string) => {
        const categoryId = parseInt(value);

        // list에서 해당 id를 가진 메뉴 찾기
        const findMenuById = (menus: MenuItem[], targetId: number): MenuItem | null => {
            for (const menu of menus) {
                if (menu.id === targetId) {
                    return menu;
                }

                // 하위메뉴가 있는 경우 재귀적으로 찾기
                if (menu.submenu && menu.submenu.length > 0) {
                    const result = findMenuById(menu.submenu, targetId);
                    if (result !== null) {
                        return result;
                    }
                }
            }
            return null;
        };

        const foundMenu = findMenuById(list, categoryId);

        if (foundMenu) {
            handleCategoryClick(foundMenu);
        }
    };

    return (
        <div className="relative p-[32px_20px_48px] md:p-[60px_28px] xl:pt-[100px]">
            <div className="absolute bottom-0 right-0 hidden h-[192px] w-[584px] md:block xl:right-[6%]">
                <Image src={subTitle} alt="Asia Peace & History Institute" fill className="object-contain" />
            </div>
            <div className="relative mx-auto flex max-w-[1360px] flex-col gap-[20px] md:gap-[40px]">
                <p className="relative pt-[12px] text-[36px] font-[700] leading-[1.5] after:absolute after:inset-0 after:h-[4px] after:w-[24px] after:bg-primary after:content-[''] md:pt-[28px] md:text-[60px] md:after:h-[8px]">
                    {topParent?.c_name}
                </p>
                <ul className="hidden items-center gap-[40px] md:flex md:flex-wrap md:gap-x-[60px] md:gap-y-[20px]">
                    {selectList.map((item, idx) => (
                        <li key={`item-${idx}`}>
                            <button
                                type="button"
                                onClick={() => handleSelectValue(item.value)}
                                className={`text-[20px] ${
                                    selectValue === item.value ? "font-[700] text-primary" : "font-[500] text-[#666]"
                                }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="md:hidden">
                    <SubSelect list={selectList} value={selectValue} onChange={handleSelectValue} />
                </div>
            </div>
        </div>
    );
}
