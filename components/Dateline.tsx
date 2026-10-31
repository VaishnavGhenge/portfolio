"use client";

import { useEffect, useState } from "react";

const FOUNDED = 2018;

function roman(n: number) {
    const table: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let out = "";
    for (const [value, numeral] of table) {
        while (n >= value) { out += numeral; n -= value; }
    }
    return out;
}

/**
 * The masthead dateline. Server-renders a neutral placeholder, then swaps to the
 * reader's own local time once mounted — so a visitor at 3 a.m. gets noticed.
 */
export default function Dateline() {
    const [stamp, setStamp] = useState<string | null>(null);

    useEffect(() => {
        const render = () => {
            const now  = new Date();
            const hour = now.getHours();

            // Ordered low-to-high so every hour 0–23 lands in exactly one branch.
            const greeting =
                hour < 5  ? "You're up late too" :
                hour < 12 ? "Good morning"       :
                hour < 17 ? "Good afternoon"     :
                hour < 22 ? "Good evening"       :
                            "Working late";

            const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
            setStamp(`${greeting} · ${time}`);
        };

        render();
        const t = setInterval(render, 30_000);
        return () => clearInterval(t);
    }, []);

    return (
        <span className="rubric text-stone-600" suppressHydrationWarning>
            {stamp ?? "Today's edition"}
        </span>
    );
}

/** Volume counts years since founding; the issue number is the day of the year. */
export function EditionLine() {
    const [edition, setEdition] = useState<{ vol: string; no: number; date: string } | null>(null);

    useEffect(() => {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        setEdition({
            vol: roman(now.getFullYear() - FOUNDED + 1),
            no: Math.floor((now.getTime() - startOfYear.getTime()) / 86_400_000),
            date: now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
        });
    }, []);

    return (
        <div className="rubric flex items-center justify-between gap-4 py-1.5 text-stone-700" suppressHydrationWarning>
            <span>{edition ? `Vol. ${edition.vol} · No. ${edition.no}` : "Vol. · No."}</span>
            <span className="hidden sm:inline">{edition?.date ?? "Today's edition"}</span>
            <span>Price: one coffee</span>
        </div>
    );
}
