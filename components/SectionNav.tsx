"use client";

import { useEffect, useState } from "react";

const links = [
    { href: "#front", label: "Front Page" },
    { href: "#features", label: "Features" },
    { href: "#markets", label: "Markets" },
    { href: "#opinion", label: "Opinion" },
    { href: "#comics", label: "Comics" },
    { href: "#classifieds", label: "Classifieds" },
];

export default function SectionNav() {
    const [active, setActive] = useState<string>("");
    const [progress, setProgress] = useState(0);

    // Reading progress: a hairline that fills along the nav's bottom rule.
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    useEffect(() => {
        const sections = links
            .map((l) => document.querySelector<HTMLElement>(l.href))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Prefer the entry closest to the top of the viewport.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) setActive(`#${visible[0].target.id}`);
            },
            { rootMargin: "-72px 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="sticky top-0 z-40 -mx-4 mb-10 border-b border-stone-900 bg-[#faf8f4]/90 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6"
        >
            <div className="-mx-2 flex items-center overflow-x-auto [scrollbar-width:none] sm:justify-center">
                {links.map((link) => {
                    const isActive = active === link.href;
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? "true" : undefined}
                            className={`rubric relative shrink-0 px-2 py-3 transition-colors ${
                                isActive ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
                            }`}
                        >
                            {link.label}
                            <span
                                className={`absolute bottom-2 left-2 h-px bg-amber-800 transition-all duration-300 ${
                                    isActive ? "w-[calc(100%-1rem)] opacity-100" : "w-0 opacity-0"
                                }`}
                            />
                        </a>
                    );
                })}
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-amber-800/70"
                style={{ transform: `scaleX(${progress})` }}
            />
        </nav>
    );
}
