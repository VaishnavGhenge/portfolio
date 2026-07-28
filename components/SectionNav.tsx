"use client";

import { useEffect, useState } from "react";

const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#blogs", label: "Writing" },
    { href: "#editorial", label: "Cartoon" },
];

export default function SectionNav() {
    const [active, setActive] = useState<string>("");
    const [progress, setProgress] = useState(0);

    // Reading progress — a hairline that fills along the nav's bottom rule.
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
            className="sticky top-0 z-40 -mx-6 mb-16 border-y border-stone-900 bg-[#faf8f4]/85 px-6 py-2.5 backdrop-blur-sm"
        >
            <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-x-5 gap-y-1.5">
                {links.map((link) => {
                    const isActive = active === link.href;
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? "true" : undefined}
                            className={`rubric relative transition-colors ${
                                isActive ? "text-stone-900" : "text-stone-400 hover:text-stone-900"
                            }`}
                        >
                            {link.label}
                            <span
                                className={`absolute -bottom-1 left-0 h-px bg-amber-800 transition-all duration-300 ${
                                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
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
