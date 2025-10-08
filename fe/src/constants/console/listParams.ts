// 공통 리스트 파라미터 타입
export interface ListParams extends Record<string, string | number> {
    page: number;
    searchtxt: string;
}

// 게시글관리 리스트 파라미터 타입
export interface BoardListParams extends ListParams {
    search: string;
    detail: string; // 게시글 상세 번호
    create: string; // 게시글 등록 ["0","1"]
    edit: string; // 게시글 수정 ["0","1"]
}

// 댓글관리 리스트 파라미터 타입
export interface CommentListParams extends ListParams {
    search: string;
    idx: string;
    category: string;
    boardIdx: string;
}

// 카테고리 리스트 파라미터 타입
export interface CategoryListParams {
    lang: string;
    detail: string; // 상세 번호
    create: string; // 등록 ["0","1"]
    [key: string]: string;
}

// 회원관리 리스트 파라미터 타입
export interface MemberListParams extends ListParams {
    search: string;
    sdate: string;
    edate: string;
    mLevel: string;
    detail: string;
}

// 배너 리스트 파라미터 타입
export interface BannerListParams extends ListParams {
    type: string;
    detail: string; // 상세 번호
    create: string; // 등록 ["0","1"]
}

// 팝업 리스트 파라미터 타입
export interface PopupListParams extends ListParams {
    lang: string;
    type: string;
    detail: string; // 상세 번호
    create: string; // 등록 ["0","1"]
}

// 운영정책 리스트 파라미터 타입
export interface PolicyListParams extends ListParams {
    lang: string;
    type: string;
    detail: string; // 상세 번호
}

// 유지보수 리스트 파라미터 타입
export interface MaintListParams extends ListParams {
    detail: string; // 상세 번호
    create: string; // 등록 ["0","1"]
}

// 언어 파라미터 타입
export interface LanguageParams {
    lang: string;
    [key: string]: string;
}

// 리스트 검색 타입
export const listSearchTypes = [
    { value: "title", label: "제목만" },
    { value: "titlecontents", label: "제목+내용" },
    { value: "name", label: "작성자" },
    { value: "email", label: "이메일" },
];

// 회원리스트 검색 타입
export const memberListSearchTypes = [
    { value: "email", label: "이메일" },
    { value: "name", label: "회원명" },
    { value: "phone", label: "휴대폰번호" },
];

// 리스트 페이지 크기 옵션
export const listSizes = [10, 20, 30, 50];

// 리스트 페이지 크기 초기값
export const initialListSize = 10;

// 디바이스 탭 타입
export const deviceTypes = ["P", "M"];

// 디바이스 탭 초기값
export const initialDeviceType = "P";
