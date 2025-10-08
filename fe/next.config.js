/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
    // output: "standalone", // standalone 빌드 비활성화
    swcMinify: false, // SWC 비활성화
    compiler: {
        // SWC 컴파일러 완전 비활성화
        removeConsole: false,
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
