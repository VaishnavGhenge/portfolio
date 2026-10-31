"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The rubber duck from the comics page, docked in the corner. It idles, blinks,
 * and says something if you talk to it. Nothing more. Drawn like the strip: an
 * ink line over a yellow plate printed slightly out of register.
 */

const INK = "#1c1917";

const BODY = "M248 244 C240 232, 245 218, 259 215 C274 212, 287 220, 289 232 C290 240, 286 244, 282 245 C271 246, 258 246, 248 244 Z";
const HEAD = "M277 214 C273 204, 278 194, 288 193 C297 192, 304 199, 304 208 C304 214, 300 219, 294 220 C287 221, 280 219, 277 214 Z";
const BEAK = "M303 205 C310 202, 316 205, 315 210 C314 214, 307 214, 302 211 Z";

/** What the duck has to say, depending on what you're reading. */
const LINES: Record<string, string[]> = {
    default: [
        "quack.",
        "still reading?",
        "i heard about the race condition first.",
        "he explains it to me first.",
    ],
    front: [
        "the billing engine was a whole thing.",
        "he's been at this since 2018.",
        "ask him about the race condition.",
    ],
    features: [
        "i was there for all three.",
        "i was there for the N+1.",
        "the go binary has no dependencies. he mentions it.",
    ],
    markets: [
        "he rates himself honestly. mostly.",
        "three dots means he'd take the interview.",
    ],
    opinion: [
        "he writes these at night.",
        "the django-silky one took a while.",
    ],
    comics: [
        "that's me, panel five. i said nothing. it helped.",
        "the boss is fictional. so is the cigar.",
    ],
    classifieds: [
        "he answers email. i've seen it.",
        "the diploma came first. the degree caught up.",
    ],
};

const SECTIONS = ["front", "features", "markets", "opinion", "comics", "classifieds"];

function Sprite({ blinking }: { blinking: boolean }) {
    return (
        <svg viewBox="236 188 84 62" width="54" height="40" aria-hidden="true" className="overflow-visible">
            <g transform="translate(1.6 1)">
                <path d={BODY} fill="#f5c518" />
                <path d={HEAD} fill="#f5c518" />
                <path d={BEAK} fill="#e8692a" />
            </g>
            <g fill="#fff" stroke={INK} strokeLinecap="round" strokeLinejoin="round" style={{ mixBlendMode: "multiply" }}>
                <path d={BODY} strokeWidth="2.6" />
                <path d={HEAD} strokeWidth="2.6" />
                <path d={BEAK} strokeWidth="2" />
                <path d="M257 229 C264 224, 275 226, 278 233" fill="none" strokeWidth="2" />
                {blinking
                    ? <path d="M291 204 L296 204" strokeWidth="2" />
                    : <circle cx="293.5" cy="204" r="2.2" fill={INK} stroke="none" />}
            </g>
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
                    <p
                        className="duck-bubble relative mr-3 max-w-[200px] rounded-[10px] border-[1.5px] border-stone-900 bg-[#fbf5e6] px-3 py-1.5 text-[15px] leading-tight text-stone-900 after:absolute after:-bottom-[9px] after:right-5 after:h-4 after:w-4 after:rotate-[30deg] after:skew-x-[25deg] after:border-b-[1.5px] after:border-r-[1.5px] after:border-stone-900 after:bg-[#fbf5e6]"
                        style={{ fontFamily: "var(--font-comic), cursive", fontVariantLigatures: "none" }}
                    >
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
