"use client";

import { useEffect, useRef, useState } from "react";

import MainBanner from "./-components/MainBanner";
import MainLink from "./-components/MainLink";
import MainSection1 from "./-components/MainSection1";
import MainSection2 from "./-components/MainSection2";
import MainSection3 from "./-components/MainSection3";

export default function Main() {
    const sect1Ref = useRef<HTMLDivElement>(null);
    const sect2Ref = useRef<HTMLDivElement>(null);
    const sect3Ref = useRef<HTMLDivElement>(null);
    const [sect1On, setSect1On] = useState(false);
    const [sect2On, setSect2On] = useState(false);
    const [sect3On, setSect3On] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLDivElement;
                        if (target === sect1Ref.current) setSect1On(true);
                        if (target === sect2Ref.current) setSect2On(true);
                        if (target === sect3Ref.current) setSect3On(true);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px",
            },
        );

        const refs = [sect1Ref, sect2Ref, sect3Ref];
        refs.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refs.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <>
            <MainBanner />
            <MainLink />
            <MainSection1 sectRef={sect1Ref} sectOn={sect1On} />
            <MainSection2 sectRef={sect2Ref} sectOn={sect2On} />
            <MainSection3 sectRef={sect3Ref} sectOn={sect3On} />
        </>
    );
}
