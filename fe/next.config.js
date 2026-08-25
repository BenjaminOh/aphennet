/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "likeweb.co.kr",
                port: "",
                pathname: "/admin/**",
            },
        ],
    },
    async headers() {
        return [
            {
                // 해시가 붙은 빌드 산출물에만 immutable 을 건다.
                // 예전에는 source 가 "/(.*)" 라 HTML 문서와 RSC 페이로드까지 1년간
                // immutable 로 캐시됐다. 배포 후 관리자 브라우저가 옛 HTML 을 계속 써서
                // 사라진 청크를 요청하면 ChunkLoadError 가 난다.
                source: "/_next/static/:path*",
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
