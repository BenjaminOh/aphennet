"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { useGetSubCategory } from "@/service/user/menu";
import { usePopupStore } from "@/store/common/usePopupStore";

import PostDetail from "../board/PostDetail";
import PostList from "../board/PostList";
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
import System from "../custom/japan-distortion-response/System";
import Timeline from "../custom/japan-distortion-response/Timeline";
import SubLayout from "./-components/SubLayout";
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
            {postIdx && (configData?.data?.c_content_type?.[0] === 4 || configData?.data?.c_content_type?.[0] === 5) ? (
                <SubLayout>
                    <PostDetail category={category} detailIdx={postIdx} />
                </SubLayout>
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/Greeting" ? (
                <Greeting />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/About" ? (
                <About />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/Location" ? (
                <Location />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/Organization" ? (
                <Organization />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/intro/History" ? (
                <History />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/Textbook" ? (
                <Textbook />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/activities/Camp" ? (
                <Camp />
            ) : configData?.data?.c_content_type?.[0] === 3 && configData?.data?.file_path === "/activities/Forum" ? (
                <Forum />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/JointTextbook" ? (
                <JointTextbook />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/activities/Solidarity" ? (
                <Solidarity />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/japan-distortion-response/Timeline" ? (
                <Timeline />
            ) : configData?.data?.c_content_type?.[0] === 3 &&
              configData?.data?.file_path === "/japan-distortion-response/System" ? (
                <System />
            ) : configData?.data?.c_content_type?.[0] === 4 ? (
                <PostList category={category} boardType="board" />
            ) : configData?.data?.c_content_type?.[0] === 5 ? (
                <PostList category={category} boardType="gallery" />
            ) : null}
        </>
    );
}
