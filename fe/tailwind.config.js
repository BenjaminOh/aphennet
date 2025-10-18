/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                batang: ["KoPubWorld Batang", "serif"],
                lato: ["Lato", "serif"],
                gmarket: ["GmarketSans", "serif"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "#206B6E",
                    2: "#056547",
                },
                // 관리자단 색상
                console: {
                    DEFAULT: "#0CB2AD",
                    2: "#00489D",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                border: "hsl(var(--border))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            borderColor: {
                border: "hsl(var(--border))",
            },
            backgroundImage: {
                logo: "url('../assets/images/user/logo.png')",
                logoFooter: "url('../assets/images/user/logoFooter.png')",
                icMenu: "url('../assets/images/user/icMenu.png')",
                icClose: "url('../assets/images/user/icClose.png')",
                icInstagram: "url('../assets/images/user/icInstagram.png')",
                icFacebook: "url('../assets/images/user/icFacebook.png')",
                icYoutube: "url('../assets/images/user/icYoutube.png')",
                "console-pop-close": "url('../assets/images/console/popClose.svg')",
                "console-ic-calendar": "url('../assets/images/console/icCalendar.svg')",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
