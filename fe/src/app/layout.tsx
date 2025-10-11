import "./globals.css";

import type { Metadata } from "next";

import QueryProvider from "@/components/common/common/QueryProvider";
import { ConsoleToaster } from "@/components/console/common/ConsoleToaster";
import ConsolePopup from "@/components/console/popup/Popup";

export const metadata: Metadata = {
    title: "기본솔루션",
    description: "기본솔루션",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <QueryProvider>{children}</QueryProvider>
                <div id="modal-root" />
                <ConsoleToaster />
                <ConsolePopup />
            </body>
        </html>
    );
}
