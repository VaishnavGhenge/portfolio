"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

function CountUp({ target, duration = 1600 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });

    useEffect(() => {
        if (!inView) return;
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress >= 1) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}</span>;
}

const metrics = [
    { prefix: '', target: 3, suffix: '+', label: 'yrs production' },
    { prefix: '+', target: 30, suffix: '%', label: 'billing reliability' },
    { prefix: '−', target: 45, suffix: '%', label: 'build time cut' },
    { prefix: '', target: 5, suffix: '+', label: 'languages shipped' },
];

export default function ImpactMetrics() {
    return (
        <div className="grid grid-cols-2 gap-2 mt-6">
            {metrics.map((m) => (
                <div
                    key={m.label}
                    className="rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2.5 text-center"
                >
                    <div className="text-xl font-bold text-teal-400 font-mono leading-none tabular-nums">
                        {m.prefix}<CountUp target={m.target} />{m.suffix}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 leading-tight tracking-wide">{m.label}</div>
                </div>
            ))}
        </div>
    );
}