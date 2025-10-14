import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";

import QueryProvider from "@/components/common/common/QueryProvider";
import { ConsoleToaster } from "@/components/console/common/ConsoleToaster";
import ConsolePopup from "@/components/console/popup/Popup";
import UserPopup from "@/components/user/popup/Popup";

export const metadata: Metadata = {
    title: "아시아평화와역사교육연대",
    description: "아시아평화와역사교육연대",
    keywords: "아시아평화와역사교육연대",
    authors: [{ name: "아시아평화와역사교육연대" }],
    robots: "index,follow",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    themeColor: "#000000",
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        title: "셀레아시아평화와역사교육연대나이민",
        description: "아시아평화와역사교육연대",
        siteName: "아시아평화와역사교육연대",
    },
    twitter: {
        card: "summary",
        title: "아시아평화와역사교육연대",
        description: "아시아평화와역사교육연대",
    },
    other: {
        "X-UA-Compatible": "IE=edge",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Script
                    src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
                    strategy="beforeInteractive"
                    className="daum_roughmap_loader_script"
                />
                <QueryProvider>{children}</QueryProvider>
                <div id="modal-root" />
                <ConsoleToaster />
                <ConsolePopup />
                <UserPopup />
            </body>
        </html>
    );
}
