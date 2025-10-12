"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { useGetSubCategory } from "@/service/user/menu";
import { usePopupStore } from "@/store/common/usePopupStore";

import About from "../custom/intro/About";
import Greeting from "../custom/intro/Greeting";
import SubTop from "./-components/SubTop";

export default function Sub({
    category,
    postIdx,
    mode,
}: {
    category: string;
    postIdx?: string;
    mode?: "create" | "edit" | "reply";
}) {
    const {
        data: configData,
        isLoading,
        error: getSubCategoryError,
    } = useGetSubCategory(category, {
        enabled: Boolean(category),
    });
    const { setLoadingPop } = usePopupStore();

    console.log(postIdx, mode);

    // 데이터 수정,삭제 중일 때 로딩 팝업 표시
    useEffect(() => {
        setLoadingPop(isLoading);
        return () => setLoadingPop(false);
    }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    // 404 에러 시 notFound 페이지로 이동
    useEffect(() => {
        if (getSubCategoryError) {
            notFound();
        }
    }, [getSubCategoryError]);

    return (
        <>
            <SubTop category={category} />
            {configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/greeting" ? (
                <Greeting />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/about" ? (
                <About />
            ) : null}
        </>
    );
}
