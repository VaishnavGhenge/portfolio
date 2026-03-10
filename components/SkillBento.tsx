"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientTiltCard from "./ClientTiltCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillDomain {
    title: string;
    description: string;
    tags: string[];
    visual: React.ReactNode;
    type: "code" | "visual" | "metric";
}

// ─── Visuals ──────────────────────────────────────────────────────────────────

/** Concurrent requests → Celery queue → serialized output */
function CeleryQueueAnimation() {
    const tasks = [
        { id: "REQ·1", color: "#f97316" },
        { id: "REQ·2", color: "#a78bfa" },
        { id: "REQ·3", color: "#60a5fa" },
    ];

    return (
        <div className="font-mono text-[10px] w-full h-full flex flex-col justify-center gap-3 py-1">
            <div className="text-[9px] text-slate-600 uppercase tracking-wider">
                race condition fix · concurrent → serialized
            </div>

            {/* INPUT: concurrent requests colliding */}
            <div className="flex items-center gap-2">
                <span className="text-slate-600 w-14 shrink-0">Incoming</span>
                <div className="relative flex-1 h-7 overflow-hidden">
                    {tasks.map((t, i) => (
                        <motion.div
                            key={t.id}
                            className="absolute h-6 px-2 rounded flex items-center text-[9px]"
                            style={{
                                backgroundColor: `${t.color}12`,
                                border: `1px solid ${t.color}35`,
                                color: t.color,
                                top: i * 0,   // overlap intentionally
                                left: 0,
                            }}
                            animate={{ x: ["-10%", "85%"], opacity: [0, 1, 1, 0] }}
                            transition={{
                                duration: 2.6,
                                repeat: Infinity,
                                repeatDelay: 1.0,
                                delay: i * 0.22,
                                ease: "easeIn",
                            }}
                        >
                            {t.id}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* QUEUE box */}
            <div className="flex items-center gap-2">
                <span className="text-slate-600 w-14 shrink-0">Celery</span>
                <div className="flex-1 h-7 rounded border border-teal-500/25 bg-teal-500/5 relative overflow-hidden flex items-center px-2">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/12 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-teal-400/70 text-[9px] z-10">Redis broker · task queue</span>
                </div>
            </div>

            {/* OUTPUT: ordered one at a time */}
            <div className="flex items-start gap-2">
                <span className="text-slate-600 w-14 shrink-0 pt-0.5">Output</span>
                <div className="flex-1 flex flex-col gap-1">
                    {tasks.map((t, i) => (
                        <motion.div
                            key={t.id}
                            className="flex items-center justify-between h-5 px-2 rounded"
                            style={{
                                backgroundColor: `${t.color}0d`,
                                border: `1px solid ${t.color}25`,
                                color: t.color,
                            }}
                            animate={{ opacity: [0, 1, 1, 0], x: [-6, 0, 0, 0] }}
                            transition={{
                                duration: 2.6,
                                repeat: Infinity,
                                repeatDelay: 1.0,
                                delay: 1.5 + i * 0.55,
                            }}
                        >
                            <span>{t.id}</span>
                            <motion.span
                                className="text-green-400"
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 0.2, delay: 1.7 + i * 0.55, repeat: Infinity, repeatDelay: 3.1 }}
                            >✓</motion.span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/** Animated payment retry timeline with exponential backoff */
function BillingRetryAnimation() {
    const steps = [
        { label: "Attempt 1", result: "FAIL", color: "#ef4444" },
        { label: "wait 2s",   result: "",      color: "#78716c" },
        { label: "Attempt 2", result: "FAIL", color: "#ef4444" },
        { label: "wait 4s",   result: "",      color: "#78716c" },
        { label: "Attempt 3", result: "OK",   color: "#4ade80" },
    ];

    return (
        <div className="font-mono text-[10px] w-full h-full flex flex-col justify-center gap-3 py-1">
            <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">
                payment retry · exponential backoff
            </div>

            {/* Timeline row */}
            <div className="flex items-center gap-1">
                {steps.map((s, i) => (
                    <React.Fragment key={i}>
                        {s.result !== "" ? (
                            <motion.div
                                className="flex flex-col items-center gap-1"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.4, duration: 0.3, repeat: Infinity, repeatDelay: steps.length * 0.4 + 1 }}
                            >
                                <motion.div
                                    className="w-9 h-9 rounded-full border flex items-center justify-center text-[11px]"
                                    style={{ borderColor: `${s.color}50`, backgroundColor: `${s.color}12`, color: s.color }}
                                    animate={s.result === "OK" ? {
                                        boxShadow: ["0 0 0px transparent", `0 0 14px ${s.color}50`, "0 0 0px transparent"]
                                    } : {}}
                                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 + 0.3 }}
                                >
                                    {s.result === "OK" ? "✓" : "✗"}
                                </motion.div>
                                <span className="text-[8px]" style={{ color: `${s.color}99` }}>{s.result}</span>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center flex-1 gap-1">
                                <div className="w-full h-px bg-slate-800 relative overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-amber-500/60"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: (i - 1) * 0.4 + 0.5, repeatDelay: steps.length * 0.4 }}
                                    />
                                </div>
                                <span className="text-[8px] text-amber-700">{s.label}</span>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Code hint */}
            <div className="border-t border-slate-800/60 pt-2 text-slate-600 text-[9px] leading-relaxed">
                <span className="text-purple-400/70">if</span> sub.retry_count &lt; 3:{" "}
                <span className="text-orange-400/70">exponential_backoff</span>(sub)
            </div>
        </div>
    );
}

/** Live journald log stream with unique entry keys */
function SystemLogsAnimation() {
    const allLines = [
        { text: "[Servio] Service 'api-gateway' starting...", color: "#64748b" },
        { text: "[Systemd] ExecStart=/usr/bin/node server.js", color: "#475569" },
        { text: "[Network] Listening on :8080", color: "#2dd4bf" },
        { text: "[D-Bus] Connected to systemd socket", color: "#64748b" },
        { text: "[Stream] WebSocket connection established", color: "#94a3b8" },
        { text: "[Servio] Health check passed ✓", color: "#4ade80" },
        { text: "[Git] Deploy triggered · branch: main", color: "#a78bfa" },
        { text: "[Servio] Rebuilding service...", color: "#64748b" },
        { text: "[Servio] Reloaded successfully", color: "#4ade80" },
    ];

    const [logs, setLogs] = useState<Array<{ text: string; color: string; uid: number }>>([]);
    const uid = useRef(0);
    const idx = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const line = allLines[idx.current % allLines.length];
            idx.current++;
            uid.current++;
            setLogs(prev => [...prev.slice(-4), { ...line, uid: uid.current }]);
        }, 750);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="font-mono text-[10px] w-full h-full flex flex-col">
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-700/40">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="ml-1.5 text-slate-600 text-[9px]">servio — journald</span>
                <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                />
            </div>

            {/* Log lines */}
            <div className="flex flex-col gap-0.5 flex-1">
                {logs.map(log => (
                    <motion.div
                        key={log.uid}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-1.5 items-start truncate"
                    >
                        <span className="text-teal-600 shrink-0">›</span>
                        <span style={{ color: log.color }} className="truncate">{log.text}</span>
                    </motion.div>
                ))}
                <motion.span
                    className="text-slate-600 mt-0.5"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >▋</motion.span>
            </div>
        </div>
    );
}

/** Offline-first mobile sync visualization */
function MobileSyncAnimation() {
    const statuses = ["Offline", "Syncing…", "Synced ✓"] as const;
    const statusColors = { "Offline": "#ef4444", "Syncing…": "#f97316", "Synced ✓": "#4ade80" };
    const [status, setStatus] = useState<typeof statuses[number]>("Offline");

    useEffect(() => {
        let i = 0;
        const cycle = () => {
            i = (i + 1) % statuses.length;
            setStatus(statuses[i]);
        };
        const t = setInterval(cycle, 1800);
        return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex items-center justify-between w-full h-full px-2 gap-3">
            {/* Phone */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-10 h-15 border-2 border-slate-600 rounded-xl bg-slate-800 flex flex-col items-center justify-center gap-1 p-1" style={{ height: 56 }}>
                    <span className="text-[7px] text-blue-300 font-mono">APP</span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={status}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2 }}
                            className="text-[7px] font-mono"
                            style={{ color: statusColors[status] }}
                        >
                            {status === "Offline" ? "●" : status === "Syncing…" ? "↑" : "✓"}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={status}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[8px] font-mono"
                        style={{ color: statusColors[status] + "cc" }}
                    >
                        {status}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Packet stream */}
            <div className="flex-1 relative flex items-center h-full">
                <div className="absolute w-full h-px bg-slate-800" />
                {status === "Syncing…" && [0, 0.5, 1.0].map((delay, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-sm bg-orange-400/80 text-[7px] flex items-center justify-center font-bold"
                        animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay, ease: "easeInOut" }}
                    />
                ))}
                {status === "Synced ✓" && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute w-full h-px bg-green-400/30"
                        style={{ transformOrigin: "left center" }}
                    />
                )}
            </div>

            {/* API */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-12 h-10 border border-dashed border-violet-500/40 rounded-lg bg-violet-500/5 flex items-center justify-center">
                    <span className="text-[10px] text-violet-300 font-mono">API</span>
                </div>
                <span className="text-[8px] text-slate-600 font-mono">Django REST</span>
            </div>
        </div>
    );
}

/** N+1 vs joined query performance — looping bars */
function DatabaseOptimAnimation() {
    return (
        <div className="flex flex-col justify-center w-full h-full px-1 gap-4 py-1">
            <div className="text-[9px] text-slate-600 uppercase tracking-wider">query plan optimization</div>

            {/* N+1 before */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">N+1 Queries</span>
                    <span className="text-red-400 font-mono">1 200ms</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-red-400/75 rounded-full"
                        animate={{ width: ["0%", "90%", "90%", "0%"] }}
                        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Joined after */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">select_related()</span>
                    <span className="text-green-400 font-mono">180ms</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-green-400/75 rounded-full"
                        animate={{ width: ["0%", "14%", "14%", "0%"] }}
                        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.25, 0.75, 1], ease: "easeInOut", delay: 0.35 }}
                    />
                </div>
            </div>

            {/* Speedup badge */}
            <motion.div
                className="self-start text-[9px] text-green-400 border border-green-400/20 px-2 py-0.5 rounded font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity }}
            >
                ⚡ 6.7× faster · PostgreSQL index hit
            </motion.div>
        </div>
    );
}

/** Auto-cycling tab UI with blur transition — demonstrates 60fps animation quality */
function UXInteractionAnimation() {
    const tabs = [
        { label: "Dashboard", icon: "◼", rows: 3 },
        { label: "Analytics", icon: "◈", rows: 2 },
        { label: "Settings",  icon: "◉", rows: 4 },
    ];
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % tabs.length), 1800);
        return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col w-full h-full gap-2 py-1">
            {/* Chrome */}
            <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                <span className="ml-1 text-[9px] text-slate-600 font-mono">React / Angular UI</span>
                <motion.span
                    className="ml-auto text-[9px] text-teal-400 font-mono"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >60 FPS</motion.span>
            </div>

            {/* Tab bar */}
            <div className="flex gap-0.5 bg-slate-800/40 rounded-md p-0.5">
                {tabs.map((tab, i) => (
                    <motion.div
                        key={tab.label}
                        className="flex-1 flex items-center justify-center gap-1 py-1 rounded text-[9px] font-mono cursor-pointer relative"
                        animate={{
                            color: active === i ? "#2dd4bf" : "#475569",
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {active === i && (
                            <motion.div
                                layoutId="tab-bg"
                                className="absolute inset-0 rounded bg-teal-500/12"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab.icon} {tab.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Content with blur transition */}
            <div className="flex-1 rounded-md bg-slate-800/25 border border-slate-700/25 p-2 overflow-hidden relative" style={{ minHeight: 44 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 7, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -7, filter: "blur(5px)" }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="flex flex-col gap-1.5"
                    >
                        {Array.from({ length: tabs[active].rows }).map((_, j) => (
                            <div key={j} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-slate-700/70 shrink-0" />
                                <div
                                    className="h-2 rounded bg-slate-700/50"
                                    style={{ width: `${60 + ((j * 37 + active * 19) % 35)}%` }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Domains ─────────────────────────────────────────────────────────────────

const domains: SkillDomain[] = [
    {
        title: "Resilient Distributed Systems",
        description: "Background tasks, async flows, and event-based architectures (WebRTC/WebSockets).",
        tags: ["Celery", "Redis", "Event-Driven", "WebRTC"],
        type: "visual",
        visual: <CeleryQueueAnimation />,
    },
    {
        title: "Payments & Subscriptions",
        description: "Robust processing with retry scheduling and user-facing status reporting.",
        tags: ["Django", "Mollie API", "Idempotency", "Recurring Billing"],
        type: "visual",
        visual: <BillingRetryAnimation />,
    },
    {
        title: "DevOps & Deployments",
        description: "Systemd services, Nginx configuration, and self-hosted tooling.",
        tags: ["Linux", "Systemd", "Nginx", "Docker"],
        type: "visual",
        visual: <SystemLogsAnimation />,
    },
    {
        title: "Frontend & Mobile UX",
        description: "Building Angular, React, & React Native interfaces with smooth, polished UX.",
        tags: ["React Native", "Angular", "framer-motion", "60fps"],
        type: "visual",
        visual: <UXInteractionAnimation />,
    },
    {
        title: "Database Performance",
        description: "Optimizing query patterns and relationships for high scale.",
        tags: ["PostgreSQL", "Query Plans", "Indexing", "N+1 Problem"],
        type: "metric",
        visual: <DatabaseOptimAnimation />,
    },
    {
        title: "Mobile Offline-First Sync",
        description: "React Native apps with MobX state, background sync, and Expo SDK 54.",
        tags: ["React Native", "MobX", "Expo", "Offline-First"],
        type: "visual",
        visual: <MobileSyncAnimation />,
    },
];

// ─── Card entrance variant ────────────────────────────────────────────────────

const cardVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
    show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function SkillBento() {
    return (
        <section className="mb-24">
            <h2 className="text-lg font-bold uppercase mb-8 tracking-widest text-slate-200">
                Technical Expertise
            </h2>
            <div className="space-y-10">
                {domains.map((domain, index) => (
                    <motion.div
                        key={domain.title}
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.07,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                    >
                        <ClientTiltCard className="block">
                            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                <div className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                                {/* Left: title + description + tags */}
                                <div className="z-10 sm:col-span-3">
                                    <h3 className="font-medium leading-snug text-slate-200 text-base mb-2 group-hover:text-teal-300 transition-colors duration-200">
                                        {domain.title}
                                    </h3>
                                    <p className="text-sm leading-normal text-slate-400 mb-4">
                                        {domain.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {domain.tags.map((tag, ti) => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.2, delay: index * 0.07 + 0.2 + ti * 0.05 }}
                                                className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: live demo */}
                                <div className="z-10 sm:col-span-5 relative mt-4 sm:mt-0">
                                    <motion.div
                                        className="rounded-lg bg-slate-900/50 p-4 border border-slate-700/50 shadow-sm h-full"
                                        style={{ minHeight: 120 }}
                                        whileHover={{ borderColor: "rgba(148,163,184,0.22)" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="absolute top-2 right-2 text-[9px] text-slate-600 uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                            {domain.type === "code" ? "Code Snippet" : "Live Demo"}
                                        </div>
                                        {domain.visual}
                                    </motion.div>
                                </div>
                            </div>
                        </ClientTiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
