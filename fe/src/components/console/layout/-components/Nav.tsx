import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import icLogout from "@/assets/images/console/icLogout.svg";
import icMenuBoard from "@/assets/images/console/icMenuBoard.svg";
import icMenuBoardOn from "@/assets/images/console/icMenuBoardOn.svg";
import icMenuDesign from "@/assets/images/console/icMenuDesign.svg";
import icMenuDesignOn from "@/assets/images/console/icMenuDesignOn.svg";
import icMenuHome from "@/assets/images/console/icMenuHome.svg";
import icMenuHomeOn from "@/assets/images/console/icMenuHomeOn.svg";
import icMenuMaint from "@/assets/images/console/icMenuMaint.svg";
import icMenuMaintOn from "@/assets/images/console/icMenuMaintOn.svg";
import icMenuMember from "@/assets/images/console/icMenuMember.svg";
import icMenuMemberOn from "@/assets/images/console/icMenuMemberOn.svg";
import icMenuMenu from "@/assets/images/console/icMenuMenu.svg";
import icMenuMenuOn from "@/assets/images/console/icMenuMenuOn.svg";
import icMenuSetting from "@/assets/images/console/icMenuSetting.svg";
import icMenuSettingOn from "@/assets/images/console/icMenuSettingOn.svg";
import icMenuStats from "@/assets/images/console/icMenuStats.svg";
import icMenuStatsOn from "@/assets/images/console/icMenuStatsOn.svg";
import icProfile from "@/assets/images/console/icProfile.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetBoardMenu } from "@/service/console/common";
import { useBoardStore } from "@/store/common/useBoardStore";
import { useAuthStore } from "@/store/console/useAuthStore";

interface SubItems {
    path: string;
    label: string;
    id: string;
    subItems?: SubItems[];
}

interface MenuList {
    title: string;
    menuId: string;
    urlPrefix: string;
    subItems?: SubItems[];
}

interface BoardMenu {
    category: number;
    c_name: string;
}

export default function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const { loginUser, clearUser } = useAuthStore();
    const [menuOn, setMenuOn] = useState<string | null>(null);
    const [menuList, setMenuList] = useState<MenuList[]>([
        {
            title: "대시보드",
            menuId: "home",
            urlPrefix: "/console/main",
        },
        {
            title: "게시판 관리",
            menuId: "board",
            urlPrefix: "/console/board/",
            subItems: [
                { path: "post", label: "게시글 관리", id: "board1", subItems: [] },
                { path: "comment", label: "댓글 관리", id: "board2" },
            ],
        },
        {
            title: "메뉴 관리",
            menuId: "menu",
            urlPrefix: "/console/menu/",
            subItems: [{ path: "category", label: "카테고리 관리", id: "menu1" }],
        },
        {
            title: "회원 관리",
            menuId: "member",
            urlPrefix: "/console/member/",
        },
        {
            title: "디자인 관리",
            menuId: "design",
            urlPrefix: "/console/design/",
            subItems: [
                { path: "banner", label: "메인 배너 관리", id: "design1" },
                { path: "popup", label: "팝업 관리", id: "design2" },
            ],
        },
        {
            title: "환경설정",
            menuId: "setting",
            urlPrefix: "/console/setting/",
            subItems: [
                { path: "site", label: "사이트정보", id: "setting1" },
                { path: "policy", label: "시스템 운영정책", id: "setting2" },
                { path: "level", label: "회원 등급 관리", id: "setting3" },
            ],
        },
        {
            title: "통계관리",
            menuId: "stats",
            urlPrefix: "/console/stats/",
            subItems: [
                { path: "chart", label: "전체 통계", id: "stats1" },
                { path: "visitor", label: "접속자 이력 통계", id: "stats2" },
            ],
        },
        {
            title: "유지보수 게시판",
            menuId: "maintenance",
            urlPrefix: "/console/maintenance/",
        },
    ]);
    const { data: boardMenu } = useGetBoardMenu();
    const { setBoardMenuList } = useBoardStore();

    // 게시판메뉴 가져오기
    useEffect(() => {
        if (boardMenu) {
            const newMenuList = boardMenu.data.map((menu: BoardMenu, i: number) => ({
                path: menu.category,
                label: menu.c_name,
                id: `board1-${i + 1}`,
            }));

            setMenuList(prev => {
                if (prev.length === 0 || !prev[1].subItems || prev[1].subItems.length === 0) return prev;
                const updated = [...prev];
                const firstMenu = { ...updated[1] };
                const subItems = firstMenu.subItems ?? [];
                const firstSubItem = { ...(subItems[0] ?? {}), subItems: newMenuList };
                firstMenu.subItems = [firstSubItem, ...subItems.slice(1)];
                updated[1] = firstMenu;
                return updated;
            });
            setBoardMenuList(boardMenu.data);
        }
    }, [boardMenu]); // eslint-disable-line react-hooks/exhaustive-deps

    // 메뉴 활성화
    useEffect(() => {
        const menuMapping: { [key: string]: string } = {
            "/console/main": "home",
            "/console/board/post": "board1",
            "/console/board/comment": "board2",
            "/console/menu/category": "menu1",
            "/console/member": "member",
            "/console/design/banner": "design1",
            "/console/design/popup": "design2",
            "/console/setting/site": "setting1",
            "/console/setting/policy": "setting2",
            "/console/setting/level": "setting3",
            "/console/maintenance": "maintenance",
        };

        // 정확한 경로 일치를 우선으로 검사
        const newMenuOn =
            Object.keys(menuMapping).find(key => pathname === key) ||
            Object.keys(menuMapping).find(key => pathname.startsWith(key));

        if (newMenuOn) {
            setMenuOn(menuMapping[newMenuOn]);
        } else {
            setMenuOn("");
        }
    }, [pathname]);

    // 로그아웃
    const handleLogout = () => {
        clearUser();
        router.push("/console/login");
    };

    return (
        <div className="p-[20px]">
            <div className="flex h-[calc(100vh-40px)] w-[220px] flex-col rounded-[20px] bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.08)]">
                <div className="flex min-h-[96px] items-center justify-center">
                    <Link href="/console/main" className="text-[30px] font-[600]">
                        관리자
                    </Link>
                </div>
                <ScrollArea className="flex-1">
                    <ul className="pr-[16px]">
                        {menuList.map((menu, i) => (
                            <li
                                key={`menu_${i}`}
                                className={`relative rounded-[0_16px_16px_0] after:absolute after:inset-0 after:h-full after:w-[4px] after:bg-console after:opacity-0 after:transition-all after:duration-300${
                                    menuOn?.includes(menu.menuId) ? " bg-[#F8F9FB] after:opacity-100" : ""
                                }`}
                            >
                                <button
                                    type="button"
                                    className={`flex w-full items-center justify-between p-[17px_0_17px_16px] text-[18px] text-[#9F9FA5]${
                                        menuOn?.includes(menu.menuId) ? " [&>p]:font-[700] [&>p]:text-console" : ""
                                    }`}
                                    onClick={() => {
                                        if (menu.subItems) {
                                            if (menuOn?.includes(menu.menuId)) {
                                                setMenuOn(null);
                                            } else {
                                                setMenuOn(menu.menuId);
                                            }
                                        } else {
                                            setMenuOn(menu.menuId);
                                            router.push(menu.urlPrefix);
                                        }
                                    }}
                                >
                                    <p className="flex items-center gap-[16px]">
                                        {menuOn?.includes(menu.menuId) ? (
                                            <Image
                                                src={
                                                    i === 0
                                                        ? icMenuHomeOn
                                                        : i === 1
                                                        ? icMenuBoardOn
                                                        : i === 2
                                                        ? icMenuMenuOn
                                                        : i === 3
                                                        ? icMenuMemberOn
                                                        : i === 4
                                                        ? icMenuDesignOn
                                                        : i === 5
                                                        ? icMenuSettingOn
                                                        : i === 6
                                                        ? icMenuStatsOn
                                                        : icMenuMaintOn
                                                }
                                                alt="아이콘"
                                            />
                                        ) : (
                                            <Image
                                                src={
                                                    i === 0
                                                        ? icMenuHome
                                                        : i === 1
                                                        ? icMenuBoard
                                                        : i === 2
                                                        ? icMenuMenu
                                                        : i === 3
                                                        ? icMenuMember
                                                        : i === 4
                                                        ? icMenuDesign
                                                        : i === 5
                                                        ? icMenuSetting
                                                        : i === 6
                                                        ? icMenuStats
                                                        : icMenuMaint
                                                }
                                                alt="아이콘"
                                            />
                                        )}
                                        <span>{menu.title}</span>
                                    </p>
                                </button>
                                {menu.subItems && (
                                    <ul
                                        className={`flex flex-col gap-[6px] overflow-hidden ${
                                            menuOn?.includes(menu.menuId)
                                                ? "max-h-screen pb-[17px] transition-all duration-300"
                                                : "max-h-0"
                                        }`}
                                    >
                                        {menu.subItems.map((subMenu, j) => (
                                            <li key={`sub_menu_${j}`}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full items-center justify-between p-[6px_0_6px_60px] text-left text-[#666] ${
                                                        menuOn === subMenu.id ? " underline" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (subMenu.subItems) {
                                                            if (menuOn?.includes(subMenu.id)) {
                                                                setMenuOn(menu.menuId);
                                                            } else {
                                                                setMenuOn(subMenu.id);
                                                            }
                                                        } else {
                                                            router.push(`${menu.urlPrefix}${subMenu.path}`);
                                                        }
                                                    }}
                                                >
                                                    <span>{subMenu.label}</span>
                                                </button>
                                                {subMenu.subItems && (
                                                    <ul
                                                        className={`overflow-hidden ${
                                                            menuOn?.includes(subMenu.id)
                                                                ? "max-h-screen transition-all duration-300"
                                                                : "max-h-0"
                                                        }`}
                                                    >
                                                        {subMenu.subItems.map((subMenu2, k) => (
                                                            <li key={`sub_menu2_${k}`}>
                                                                <Link
                                                                    href={`${menu.urlPrefix}${subMenu.path}/${subMenu2.path}`}
                                                                    className={`block truncate p-[6px_6px_6px_60px] text-[14px] font-[500] text-[#878b93] ${
                                                                        menuOn === subMenu2.id ? " text-white" : ""
                                                                    }`}
                                                                >
                                                                    {subMenu2.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <div className="flex items-center justify-between p-[20px_6px_20px_16px]">
                    <div className="flex items-center gap-[12px]">
                        <Image src={icProfile} alt="회원" />
                        <p className="text-[20px] font-[700]">{loginUser.m_name} 님</p>
                    </div>
                    <button type="button" onClick={handleLogout} className="p-[10px]">
                        <Image src={icLogout} alt="로그아웃" />
                    </button>
                </div>
            </div>
        </div>
    );
}
