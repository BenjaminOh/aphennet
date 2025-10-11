import "@/assets/css/user/user.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="user-layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
