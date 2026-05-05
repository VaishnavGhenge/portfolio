"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ImpactMetrics from "./ImpactMetrics";

const ease = [0.22, 1, 0.36, 1] as const;
const sectionLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Writing" },
] as const;

export default function HeroContent() {
    const [activeSection, setActiveSection] = useState<string>(sectionLinks[0].id);

    useEffect(() => {
        const sections = sectionLinks
            .map(({ id }) => document.getElementById(id))
            .filter((section): section is HTMLElement => section instanceof HTMLElement);

        if (sections.length === 0) {
            return;
        }

        const syncActiveSectionFromHash = () => {
            const hash = window.location.hash.slice(1);

            if (hash && sectionLinks.some((section) => section.id === hash)) {
                setActiveSection(hash);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

                const currentSection = visibleEntries[0]?.target.id;

                if (currentSection) {
                    setActiveSection(currentSection);
                }
            },
            {
                rootMargin: "-30% 0px -45% 0px",
                threshold: [0.15, 0.35, 0.55, 0.75],
            }
        );

        sections.forEach((section) => observer.observe(section));
        syncActiveSectionFromHash();
        window.addEventListener("hashchange", syncActiveSectionFromHash);

        return () => {
            observer.disconnect();
            window.removeEventListener("hashchange", syncActiveSectionFromHash);
        };
    }, []);

    return (
        <div className="mb-16">
            {/* Name — clip reveal from bottom */}
            <div style={{ overflow: "hidden" }}>
                <motion.h1
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease }}
                    className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl"
                >
                    <a href="/">Vaishnav Ghenge</a>
                </motion.h1>
            </div>

            {/* Subtitle — slide from left */}
            <motion.h2
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl"
            >
                Software Engineer · Distributed Systems
            </motion.h2>

            {/* Tagline — fade up */}
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="mt-4 max-w-xs leading-relaxed text-slate-400"
            >
                I build things that scale — SFU video infrastructure, billing engines
                that don&apos;t fail, open source dev tools. Currently at{" "}
                <a
                    href="https://www.noovosoft.com/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-slate-300 hover:text-teal-300 transition-colors"
                >
                    Noovosoft Technologies
                </a>
                , Pune.
            </motion.p>

            {/* Metrics — scale in */}
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
                className="max-w-xs"
            >
                <ImpactMetrics />
            </motion.div>

            {/* Open to work badge — pop in */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 200, damping: 18 }}
                className="mt-4 flex items-center gap-2"
            >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs text-slate-500">Open to new opportunities</span>
            </motion.div>

            <motion.nav
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.8, ease }}
                className="mt-10 hidden lg:block"
                aria-label="Section navigation"
            >
                <ul className="space-y-3">
                    {sectionLinks.map((section) => {
                        const isActive = section.id === activeSection;

                        return (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={`group inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors ${
                                        isActive ? "text-teal-300" : "text-slate-500 hover:text-slate-200"
                                    }`}
                                >
                                    <span
                                        className={`h-px transition-all duration-300 ${
                                            isActive
                                                ? "w-14 bg-teal-300"
                                                : "w-8 bg-slate-700 group-hover:w-12 group-hover:bg-slate-300"
                                        }`}
                                        aria-hidden="true"
                                    />
                                    <span>{section.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>
        </div>
    );
}
