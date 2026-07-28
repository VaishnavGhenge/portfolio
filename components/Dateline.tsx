"use client";

import { useEffect, useState } from "react";

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
        <span className="rubric text-stone-400" suppressHydrationWarning>
            {stamp ?? "Est. 2018 · Pune, IN"}
        </span>
    );
}
