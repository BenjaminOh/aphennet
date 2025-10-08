/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
    output: "standalone", // standalone 빌드 활성화
    swcMinify: true, // SWC 사용
    compiler: {
        removeConsole: false,
    },
    // async headers() {
    //     return [
    //         {
    //             source: "/(.*)",
    //             headers: [
    //                 {
    //                     key: "Cache-Control",
    //                     value: "public, max-age=31536000, immutable",
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
