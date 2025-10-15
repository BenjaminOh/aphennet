import subBannerCamp from "@/assets/images/user/subBannerCamp.jpg";
import SupportSection from "@/components/user/common/SupportSection";
import SubBanner from "@/components/user/sub/-components/SubBanner";

export default function Camp() {
    return (
        <>
            <SubBanner banner={subBannerCamp} title={`동아시아 청소년 <br/>역사체험캠프`} />
            <div className="p-[40px_20px_80px] md:p-[60px_28px_100px] xl:pt-[80px]">
                <div className="mx-auto max-w-[1360px] xl:flex xl:justify-end xl:pl-[560px]">
                    <div className="text-[18px] text-[#666] md:text-[20px] xl:w-[680px]">
                        한·중·일 3국은 지리적으로 매우 가까운 나라로 역사적으로 오랫동안 밀접한 관계를 맺어 왔지만,
                        때로는 침략과 전쟁, 식민지 지배의 불행한 역사를 경험하였습니다. <br />
                        <br />
                        그로 인한 3국 간의 역사 갈등은 아직까지도 동아시아의 평화를 증진시키는 데 장애 요인으로 남아
                        있습니다. 이에 동아시아 청소년들이 교류를 통해 역사 문제의 발생 및 갈등에 관한 사실을 정확히
                        인식하고, 이웃 나라의 역사와 문화에 대한 이해를 높이는 계기를 마련하여, 평화로운 동아시아를
                        만들기 위한 청소년의 역할을 함께 생각하는 기회로 동아시아 청소년 역사 체험 캠프를 진행하고
                        있습니다.
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1360px] pb-[80px] md:p-[20px_0px_160px]">
                <p className="pb-[24px] text-center text-[20px] font-[700] md:pb-[48px] md:text-[24px]">
                    역대 동아시아 청소년 역사체험캠프
                </p>
                <ul className="flex items-center bg-[#F3F9F5] text-[18px] font-[500] text-primary-2 md:text-[20px] xl:rounded-[20px] xl:px-[40px]">
                    <li className="w-[22%] p-[16px_8px] xl:px-[10px]">대회명</li>
                    <li className="w-[20%] p-[16px_8px] xl:px-[10px]">개최일</li>
                    <li className="w-[58%] p-[16px_8px] xl:px-[10px]">개최지</li>
                    <li className="w-[58%] p-[16px_8px] xl:px-[10px]">주제</li>
                </ul>
                <div className="mt-[12px] overflow-hidden border border-[#ddd] xl:rounded-[20px]">
                    <table>
                        <colgroup>
                            <col className="w-[22%]" />
                            <col className="w-[20%]" />
                            <col className="w-[58%]" />
                        </colgroup>
                        <tbody>
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
        </>
    );
}
