"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { useGetSubCategory } from "@/service/user/menu";
import { usePopupStore } from "@/store/common/usePopupStore";

import Camp from "../custom/activities/Camp";
import Forum from "../custom/activities/Forum";
import JointTextbook from "../custom/activities/JointTextbook";
import Solidarity from "../custom/activities/Solidarity";
import Textbook from "../custom/activities/Textbook";
import About from "../custom/intro/About";
import Greeting from "../custom/intro/Greeting";
import History from "../custom/intro/History";
import Location from "../custom/intro/Location";
import Organization from "../custom/intro/Organization";
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
            {configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/greeting" ? (
                <Greeting />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/about" ? (
                <About />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/location" ? (
                <Location />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/organization" ? (
                <Organization />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/history" ? (
                <History />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/textbook" ? (
                <Textbook />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/activities/camp" ? (
                <Camp />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/activities/forum" ? (
                <Forum />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/joint-textbook" ? (
                <JointTextbook />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/solidarity" ? (
                <Solidarity />
            ) : null}
        </>
    );
}
