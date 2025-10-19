import Image from "next/image";

import organizationImg from "@/assets/images/user/organizationImg.png";
import organizationImgP from "@/assets/images/user/organizationImgP.png";
import organizationImgT from "@/assets/images/user/organizationImgT.png";
import subBannerOrganization from "@/assets/images/user/subBannerOrganization.jpg";
import SupportSection from "@/components/user/common/SupportSection";

export default function Organization() {
    return (
        <div className="relative">
            <div className="absolute inset-0 h-[160px] w-full md:h-[240px] xl:h-[400px]">
                <Image src={subBannerOrganization} alt="banner" fill className="object-cover" />
            </div>
            <div className="relative p-[40px_20px_80px] md:p-[80px_28px_120px] xl:p-[120px_0]">
                <Image src={organizationImg} alt="조직도" width={320} height={900} className="mx-auto md:hidden" />
                <Image
                    src={organizationImgT}
                    alt="조직도"
                    width={712}
                    height={881}
                    className="mx-auto hidden md:block xl:hidden"
                />
                <Image
                    src={organizationImgP}
                    alt="조직도"
                    width={1360}
                    height={1682}
                    className="mx-auto hidden xl:block"
                />
            </div>
            <div className="mx-auto max-w-[1360px] pb-[100px] xl:pb-[160px]">
                <p className="pb-[24px] text-center text-[28px] font-[700] md:pb-[48px] md:text-[32px]">
                    조직 현황 (2025년)
                </p>
                <ul className="flex items-center bg-[#F3F9F5] py-[16px] text-center text-[18px] font-[500] text-primary-2 md:text-[20px] xl:rounded-[20px]">
                    <li className="w-[22%] px-[5px]">직위</li>
                    <li className="w-[20%] px-[5px]">성명</li>
                    <li className="w-[58%] px-[5px]">소속</li>
                </ul>
                <div className="mt-[12px] overflow-hidden border border-[#ddd] xl:rounded-[20px]">
                    <table>
                        <colgroup>
                            <col className="w-[22%]" />
                            <col className="w-[20%]" />
                            <col className="w-[58%]" />
                        </colgroup>
                        <tbody>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={5}
                                >
                                    고&nbsp;&nbsp;&nbsp;&nbsp;문
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    서중석
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    성균관대학교 명예교수 · 전)상임공동대표
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    강창일
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한라대학교 석좌교수 · 아시아평화와역사연구소 이사장 · 전)주일대사
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    안병우
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한신대학교 명예교수 · 전)한국학중앙연구원 원장 · 상임공동대표
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    이인석
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    전)문정고등학교 교사 · 상임공동대표
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김동명
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한국노동조합총연맹 위원장
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={3}
                                >
                                    상임공동대표
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    이지원
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    대림대학교 명예교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김한종
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한국교원대학교 명예교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    왕현종
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    연세대학교 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={2}
                                >
                                    감&nbsp;&nbsp;&nbsp;&nbsp;사
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    조기홍
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    삼우회계사무소 공인회계사
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    장완익
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    해마루법무법인 변호사
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={2}
                                >
                                    공동운영위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김숙진
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    전)한국노총 공공노련 대외협력실장 · 더불어민주당 이수진국회의원 보좌관
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    조철수
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    서곶중학교 교장
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    공동교재위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김성보
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    연세대학교 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    일본위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    강혜정
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">한일 통번역가</td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    중국위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김지훈
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    아시아평화와역사연구소 연구위원
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    청소년교육위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    조정아
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    운정고등학교 교사
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    평화기행위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    은정태
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    역사디자인연구소 소장
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    대외협력위원장
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    이봉현
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한국노동조합총연맹 대외협력본부장
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김정인
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    아시아평화와역사연구소 소장 · 춘천교육대학교 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    박삼헌
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    건국대학교 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    배영미
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    독립기념관 한국독립운동사연구소 연구위원
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    신주백
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    연세대학교 국학연구원 전문연구원
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    유지아
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    원광대학교 HK교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    이세영
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    연세대학교 국학연구원 학술연구교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    이신철
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    아시아평화와역사연구소 연구위원
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    임국평
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    평택-에히메 시민교류회 사무국장
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    하종문
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한신대학교 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    장&nbsp;&nbsp;&nbsp;신
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한국학중앙연구원 교수
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김진선
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    피스모모 커뮤니티랩 거버넌스매니저
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    김준영
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    전국금속노동조합연맹 위원장
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    운영위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]">
                                    유주동
                                </td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    건국대학교병원노동조합 위원장
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={2}
                                >
                                    운영위원단체
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]"></td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">역사문제연구소</td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]"></td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    전국역사교사모임
                                </td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                                <th
                                    className="border-b border-[#999999] bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]"
                                    rowSpan={2}
                                >
                                    회원단체
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]"></td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    한국노동조합총연맹
                                </td>
                            </tr>
                            <tr className="border-b border-[#999999]">
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]"></td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    건국대학교병원노동조합
                                </td>
                            </tr>
                            <tr>
                                <th className="bg-[#FAFAFA] p-[20px_8px] text-[18px] font-[500] md:text-[24px]">
                                    국회자문위원
                                </th>
                                <td className="border-l border-r border-[#ddd] p-[16px_5px] text-center text-[18px] font-[500] md:text-[20px]"></td>
                                <td className="p-[16px_8px] text-[#666] md:px-[20px] md:text-[18px]">
                                    국회의원 김주영 · 이수진 · 박해철
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <SupportSection sectOn={true} />
        </div>
    );
}
