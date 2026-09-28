"use client";

import { useEffect, useRef, useState } from "react";

export default function EmailLink({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2200);
        } catch {
            // Clipboard unavailable (insecure context, denied permission). The
            // mailto link beside this still works, so fail quietly.
        }
    };

    return (
        <span className="inline-flex items-center gap-3">
            <a
                href={`mailto:${email}`}
                className="border-b-2 border-amber-800/40 pb-0.5 font-mono text-sm text-amber-800 transition-colors hover:border-amber-800 hover:text-stone-900"
            >
                {email}
            </a>

            <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
                className="rubric px-1 py-1.5 text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2"
            >
                {copied ? "copied ✓" : "copy"}
            </button>
        </span>
    );
}
