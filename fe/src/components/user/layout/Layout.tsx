import "@/assets/css/user/user.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="user-layout">
            <Header />
            {children}
        </div>
    );
}
