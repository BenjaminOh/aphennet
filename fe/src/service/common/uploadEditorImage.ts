import { COMMON_API_ROUTES } from "@/config/apiConfig";
import consoleAxios from "@/service/axios/consoleAxios";

/**
 * 에디터 본문에 넣을 이미지를 삽입 시점에 업로드하고 URL 을 돌려준다.
 *
 * 예전에는 이미지를 base64 로 본문(b_contents)에 박아 저장 요청에 함께 보냈다.
 * 그 방식은 요청이 수십 MB 가 되어 서버가 문자열 처리 중 heap 을 넘겼고,
 * 에디터도 타이핑마다 그 거대한 문자열을 다시 만들어 느려졌다.
 * 지금은 본문에 URL 만 남으므로 저장 요청이 수 KB 로 줄어든다.
 *
 * React 훅이 아니라 평범한 함수다. Lexical 플러그인에서 직접 호출한다.
 */
export async function uploadEditorImage(blob: Blob, fileName: string): Promise<string> {
    const formData = new FormData();
    formData.append("image", blob, fileName);

    const res = await consoleAxios.post(COMMON_API_ROUTES.POST.EDITOR_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const url = res.data?.data?.url;
    if (!url) {
        throw new Error("이미지 업로드 응답에 주소가 없습니다.");
    }
    return url;
}
