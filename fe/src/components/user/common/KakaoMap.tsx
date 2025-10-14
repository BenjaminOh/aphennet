"use client";

import { useEffect } from "react";

interface KakaoMapProps {
    timestamp: string;
    mapKey: string;
    mapWidth?: string;
    mapHeight?: string;
    className?: string;
}

export default function KakaoMap({
    timestamp,
    mapKey,
    mapWidth = "640",
    mapHeight = "360",
    className = "",
}: KakaoMapProps) {
    useEffect(() => {
        let isCancelled = false;
        const ensureLanderScript = () => {
            if (window.daum?.roughmap?.Lander) return;
            const exists = Array.from(document.scripts).some(s => s.src.includes("roughmapLander.js"));
            if (exists) return;
            const rm = window.daum?.roughmap as
                | {
                      url_protocal?: string;
                      cdn?: string;
                      phase?: string;
                  }
                | undefined;
            if (!rm) return;
            const protocol = rm.url_protocal ?? (location.protocol === "https:" ? "https:" : "http:");
            const cdnVer = rm.cdn ?? "20250630";
            const phase = rm.phase ?? "prod";
            const src = `${protocol}//t1.daumcdn.net/kakaomapweb/roughmap/place/${phase}/${cdnVer}/roughmapLander.js`;
            const s = document.createElement("script");
            s.charset = "UTF-8";
            s.src = src;
            document.head.appendChild(s);
        };
        const tryRender = () => {
            if (isCancelled) return;
            if (window.daum?.roughmap?.Lander) {
                try {
                    new window.daum.roughmap.Lander({
                        timestamp,
                        key: mapKey,
                        mapWidth,
                        mapHeight,
                    }).render();
                    // 렌더 직후 + 동적 추가에도 컨트롤 숨김
                    setTimeout(() => {
                        const container = document.getElementById(`daumRoughmapContainer${timestamp}`);
                        if (!container) return;
                        const hideAll = () => {
                            const toHide = container.querySelectorAll(
                                ".wrap_controllers, .cont, .wrap_btn_zoom, .btn_roadview, .map_control",
                            );
                            toHide.forEach(el => {
                                const h = el as HTMLElement;
                                h.style.setProperty("display", "none", "important");
                                h.style.setProperty("visibility", "hidden", "important");
                            });
                        };
                        hideAll();
                        const observer = new MutationObserver(() => hideAll());
                        observer.observe(container, { childList: true, subtree: true });
                    }, 100);
                } catch {}
            } else {
                ensureLanderScript();
                setTimeout(tryRender, 300);
            }
        };
        tryRender();

        return () => {
            isCancelled = true;
        };
    }, [timestamp, mapKey, mapWidth, mapHeight]);

    return (
        <div
            id={`daumRoughmapContainer${timestamp}`}
            className={`root_daum_roughmap root_daum_roughmap_landing [&>.cont]:hidden ${className}`}
        />
    );
}
