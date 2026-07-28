"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A 16x14 pixel sprite of the duck from the editorial cartoon, docked in the
 * corner. It idles, blinks, and says something if you talk to it. Nothing more.
 */

const PALETTE: Record<string, string> = {
    y: "#fcd34d", // body
    d: "#d9a521", // underside shading
    o: "#f97316", // beak
    k: "#1c1917", // eye
};

const OPEN = [
    "......yyyy......",
    ".....yyyyyy.....",
    "....yyyyyyyy....",
    "....yykyyyyy....",
    "....yyyyyyyyoo..",
    "....yyyyyyyyoo..",
    "....yyyyyyyy....",
    "...yyyyyyyy.....",
    "..yyyyyyyyyyy...",
    ".yyyyyyyyyyyyy..",
    "yyyyyyyyyyyyyyy.",
    "yyyyyyyyyyyyyyy.",
    ".yyyyyyyyyyyyy..",
    "..ddddddddddd...",
];

const BLINK = [...OPEN];
BLINK[3] = "....yykkyyyy....";

/** What the duck has to say, depending on what you're reading. */
const LINES: Record<string, string[]> = {
    default: [
        "quack.",
        "still reading?",
        "the tests passed at 3:47.",
        "he explains it to me first.",
    ],
    about: [
        "he's been at this since 2018.",
        "the diploma came first. the degree caught up.",
    ],
    experience: [
        "the billing engine was a whole thing.",
        "ask him about the race condition.",
    ],
    projects: [
        "i was there for all three.",
        "i was there for the N+1.",
        "the go binary has no dependencies. he mentions it.",
    ],
    skills: [
        "he rates himself honestly. mostly.",
        "three dots means he'd take the interview.",
    ],
    blogs: [
        "he writes these at night.",
        "the django-silky one took a while.",
    ],
    editorial: [
        "that's me. i was the first reader.",
        "i don't say much. i just sit there.",
    ],
};

const SECTIONS = ["about", "experience", "projects", "skills", "blogs", "editorial"];

function Sprite({ blinking }: { blinking: boolean }) {
    const rows = blinking ? BLINK : OPEN;

    return (
        <svg
            viewBox="0 0 16 14"
            width="40"
            height="35"
            shapeRendering="crispEdges"
            aria-hidden="true"
            className="overflow-visible"
        >
            {rows.map((row, y) =>
                row.split("").map((ch, x) =>
                    ch === "." ? null : (
                        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PALETTE[ch]} />
                    )
                )
            )}
        </svg>
    );
}

export default function DuckCompanion() {
    const [visible, setVisible]   = useState(false);
    const [blinking, setBlinking] = useState(false);
    const [line, setLine]         = useState<string | null>(null);
    const [nudge, setNudge]       = useState(false);

    const [section, setSection] = useState<string>("default");

    const spokenFor  = useRef<Set<string>>(new Set());
    const lineIndex  = useRef(0);
    const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Arrive quietly, after the page has settled.
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 1400);
        return () => clearTimeout(t);
    }, []);

    // Blink on an irregular beat so it never looks mechanical.
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let timer: ReturnType<typeof setTimeout>;

        const schedule = () => {
            timer = setTimeout(() => {
                setBlinking(true);
                setTimeout(() => setBlinking(false), 130);
                schedule();
            }, 2800 + Math.random() * 4200);
        };

        schedule();
        return () => clearTimeout(timer);
    }, []);

    // Track which section is being read, so the duck has something apt to say.
    useEffect(() => {
        const els = SECTIONS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (els.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const top = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

                if (top) setSection(top.target.id);
            },
            { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    }, []);

    const say = useCallback((text: string) => {
        setLine(text);

        setNudge(true);
        if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
        nudgeTimer.current = setTimeout(() => setNudge(false), 420);

        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setLine(null), 4400);
    }, []);

    /**
     * Speaks up on its own the first time you reach a section — but only once
     * per section, and only after you've settled there, so scrolling straight
     * through the page doesn't set off a chain of bubbles.
     */
    useEffect(() => {
        if (!visible) return;
        if (spokenFor.current.has(section)) return;

        const t = setTimeout(() => {
            if (spokenFor.current.has(section)) return;
            spokenFor.current.add(section);

            const pool = LINES[section] ?? LINES.default;
            say(pool[0]);
            lineIndex.current = 1;
        }, 1100);

        return () => clearTimeout(t);
    }, [section, visible, say]);

    // Clicking asks for another line.
    const speak = useCallback(() => {
        const pool = LINES[section] ?? LINES.default;
        say(pool[lineIndex.current % pool.length]);
        lineIndex.current += 1;
    }, [section, say]);

    return (
        <div
            className={`fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2 transition-opacity duration-700 ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div aria-live="polite" className="min-h-0">
                {line && (
                    <p className="duck-bubble max-w-[190px] border border-stone-900 bg-white px-2.5 py-1.5 font-mono text-[10px] leading-snug text-stone-700 shadow-[3px_3px_0_rgba(28,25,23,0.12)]">
                        {line}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={speak}
                aria-label="Ask the duck to say something else"
                title="say something else"
                className={`duck-idle rounded-sm p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2 ${
                    nudge ? "duck-nudge" : ""
                }`}
            >
                <Sprite blinking={blinking} />
            </button>
        </div>
    );
}
