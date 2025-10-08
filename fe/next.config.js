/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
    output: "standalone",
    swcMinify: false, // SWC 비활성화
    compiler: {
        // SWC 컴파일러 완전 비활성화
        removeConsole: false,
    },
    // Babel 사용으로 SWC 우회
    babel: {
        presets: ['next/babel'],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
