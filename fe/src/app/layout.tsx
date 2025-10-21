import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";

import QueryProvider from "@/components/common/common/QueryProvider";
import { ConsoleToaster } from "@/components/console/common/ConsoleToaster";
import ConsolePopup from "@/components/console/popup/Popup";
import UserPopup from "@/components/user/popup/Popup";

// 동적 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
    try {
        const response = await fetch("https://api.aphen.net/v1/config/site/aphen/KR", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            next: { revalidate: 60 }, // 60초마다 재검증
        });

        if (!response.ok) {
            return {
                metadataBase: new URL("https://aphen.net/"),
                title: "아시아평화와역사교육연대",
                description: "아시아평화와역사교육연대",
                keywords: "아시아평화와역사교육연대",
                authors: [{ name: "아시아평화와역사교육연대" }],
                robots: "index,follow",
                openGraph: {
                    type: "website",
                    url: "https://aphen.net/",
                    title: "아시아평화와역사교육연대",
                    description: "아시아평화와역사교육연대",
                    siteName: "아시아평화와역사교육연대",
                    images: ["/og-image.png"],
                },
                twitter: {
                    card: "summary",
                    title: "아시아평화와역사교육연대",
                    description: "아시아평화와역사교육연대",
                    images: ["/og-image.png"],
                },
                other: {
                    "X-UA-Compatible": "IE=edge",
                },
            };
        }

        const result = await response.json();
        const siteInfo = result.data;

        if (!siteInfo) {
            return {
                metadataBase: new URL("https://aphen.net/"),
                title: "아시아평화와역사교육연대",
                description: "아시아평화와역사교육연대",
                keywords: "아시아평화와역사교육연대",
            };
        }

        const { c_b_title, c_meta, c_meta_tag } = siteInfo;

        return {
            metadataBase: new URL("https://aphen.net/"),
            title: c_b_title || "아시아평화와역사교육연대",
            description: c_meta || "아시아평화와역사교육연대",
            keywords: c_meta_tag || "아시아평화와역사교육연대",
            authors: [{ name: "아시아평화와역사교육연대" }],
            robots: "index,follow",
            openGraph: {
                type: "website",
                url: "https://aphen.net/",
                title: c_b_title || "아시아평화와역사교육연대",
                description: c_meta || "아시아평화와역사교육연대",
                siteName: "아시아평화와역사교육연대",
                images: ["/og-image.png"],
            },
            twitter: {
                card: "summary",
                title: c_b_title || "아시아평화와역사교육연대",
                description: c_meta || "아시아평화와역사교육연대",
                images: ["/og-image.png"],
            },
            other: {
                "X-UA-Compatible": "IE=edge",
            },
        };
    } catch {
        return {
            metadataBase: new URL("https://aphen.net/"),
            title: "아시아평화와역사교육연대",
            description: "아시아평화와역사교육연대",
            keywords: "아시아평화와역사교육연대",
            authors: [{ name: "아시아평화와역사교육연대" }],
            robots: "index,follow",
            openGraph: {
                type: "website",
                url: "https://aphen.net/",
                title: "아시아평화와역사교육연대",
                description: "아시아평화와역사교육연대",
                siteName: "아시아평화와역사교육연대",
                images: ["/og-image.png"],
            },
            twitter: {
                card: "summary",
                title: "아시아평화와역사교육연대",
                description: "아시아평화와역사교육연대",
                images: ["/og-image.png"],
            },
            other: {
                "X-UA-Compatible": "IE=edge",
            },
        };
    }
}

export const viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    themeColor: "#000000",
};

export const formatDetection = {
    telephone: false,
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
