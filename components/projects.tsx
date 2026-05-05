"use client";

import { motion } from 'framer-motion';

// ─── Highlight Visuals ────────────────────────────────────────────────────────

function VartalaapP2P() {
    const peerA = { x: 30, y: 48 };
    const peerB = { x: 198, y: 48 };
    const midX = 114;

    const features = [
        { label: "Noise Cancel", color: "#a78bfa", y: 14 },
        { label: "Echo Cancel",  color: "#60a5fa", y: 50 },
        { label: "BG Blur",      color: "#2dd4bf", y: 86 },
    ];

    return (
        <div className="flex items-center justify-center w-full py-2">
            <svg width="100%" viewBox="0 0 260 108" fill="none" overflow="visible">
                {/* Direct P2P connection line */}
                <line
                    x1={peerA.x + 22} y1={peerA.y}
                    x2={peerB.x}      y2={peerB.y}
                    stroke="rgba(148,163,184,0.12)" strokeWidth="1.5" strokeDasharray="4 3"
                />

                {/* Animated packets A → B */}
                {[0, 1].map(i => (
                    <motion.circle
                        key={`ab-${i}`}
                        cx={peerA.x + 22} cy={peerA.y} r={3}
                        fill="#60a5fa"
                        animate={{
                            x: [0, peerB.x - (peerA.x + 22)],
                            opacity: [0, 1, 0.9, 0],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            repeatDelay: 1.8,
                            delay: i * 1.0,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Animated packets B → A */}
                {[0, 1].map(i => (
                    <motion.circle
                        key={`ba-${i}`}
                        cx={peerB.x} cy={peerB.y} r={3}
                        fill="#a78bfa"
                        animate={{
                            x: [0, (peerA.x + 22) - peerB.x],
                            opacity: [0, 1, 0.9, 0],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            repeatDelay: 1.8,
                            delay: 0.5 + i * 1.0,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Peer A */}
                <rect x={peerA.x - 22} y={peerA.y - 18} width={44} height={36} rx={6}
                    fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.2"
                />
                <text x={peerA.x} y={peerA.y - 4} textAnchor="middle"
                    fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="700"
                >You</text>
                <text x={peerA.x} y={peerA.y + 9} textAnchor="middle"
                    fill="#334155" fontSize="6" fontFamily="monospace"
                >HD · 1080p</text>

                {/* Peer B */}
                <rect x={peerB.x - 22} y={peerB.y - 18} width={44} height={36} rx={6}
                    fill="rgba(15,23,42,0.9)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.2"
                />
                <text x={peerB.x} y={peerB.y - 4} textAnchor="middle"
                    fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="700"
                >Them</text>
                <text x={peerB.x} y={peerB.y + 9} textAnchor="middle"
                    fill="#334155" fontSize="6" fontFamily="monospace"
                >HD · 1080p</text>

                {/* Feature pills */}
                {features.map((f, i) => (
                    <motion.g key={f.label}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.2 }}
                    >
                        <rect x={midX - 30} y={f.y} width={60} height={12} rx={6}
                            fill={`${f.color}15`} stroke={`${f.color}35`} strokeWidth="0.8"
                        />
                        <motion.circle cx={midX - 20} cy={f.y + 6} r={2}
                            fill={f.color}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                        />
                        <text x={midX - 13} y={f.y + 9} textAnchor="start"
                            fill={f.color} fontSize="6.5" fontFamily="monospace"
                        >{f.label}</text>
                    </motion.g>
                ))}

                {/* Screen share badge */}
                <motion.g
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <rect x={midX - 22} y={99} width={44} height={10} rx={5}
                        fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.25)" strokeWidth="0.8"
                    />
                    <text x={midX} y={107} textAnchor="middle"
                        fill="#2dd4bf" fontSize="6" fontFamily="monospace"
                    >screen share</text>
                </motion.g>
            </svg>
        </div>
    );
}

function ServioDeployFlow() {
    const logs = [
        { text: "[●] api-gateway.service", color: "#4ade80" },
        { text: "    Active: active (running)", color: "#475569" },
        { text: "    D-Bus: connected to systemd", color: "#475569" },
        { text: "    Logs: streaming via journald", color: "#2dd4bf" },
    ];

    return (
        <div className="font-mono text-[10px] p-3 w-full">
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-stone-700/40">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="ml-1.5 text-stone-600 text-[9px]">servio — journald</span>
                <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* Log lines */}
            <div className="space-y-1 mb-2.5">
                {logs.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.28, duration: 0.25 }}
                        style={{ color: line.color }}
                    >
                        {line.text}
                    </motion.div>
                ))}
                {/* Blinking cursor */}
                <motion.span
                    className="text-stone-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                >▋</motion.span>
            </div>

            {/* CPU / MEM bars */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800/60">
                {[
                    { label: "CPU", color: "#a78bfa", values: ["8%", "22%", "11%", "19%", "8%"] },
                    { label: "MEM", color: "#60a5fa", values: ["34%", "38%", "36%", "40%", "34%"] },
                ].map(bar => (
                    <div key={bar.label} className="flex items-center gap-2">
                        <span className="text-stone-600 w-6 shrink-0">{bar.label}</span>
                        <div className="flex-1 h-1 bg-stone-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: bar.color + "99" }}
                                animate={{ width: bar.values }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DjangoSilkyHighlight() {
    const queries = [
        { label: '/api/users/', time: '240ms', pct: 85, color: '#f97316' },
        { label: '/api/posts/', time: '38ms',  pct: 30, color: '#2dd4bf' },
        { label: '/api/tags/',  time: '12ms',  pct: 12, color: '#2dd4bf' },
    ];
    const flame = [
        { label: 'ORM',  flex: 0.45, color: '#f97316' },
        { label: 'N+1',  flex: 0.30, color: '#ef4444' },
        { label: 'Ser',  flex: 0.10, color: '#60a5fa' },
        { label: 'Net',  flex: 0.08, color: '#475569' },
    ];

    return (
        <div className="font-mono text-[10px] p-3 w-full">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-700/50">
                <span className="text-amber-400 font-bold">django-silky</span>
                <div className="flex items-center gap-1.5">
                    <span className="text-stone-500 text-[9px]">dark</span>
                    <div className="w-7 h-3.5 rounded-full bg-amber-500/30 relative flex items-center px-0.5">
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute"
                            animate={{ x: [0, 14, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* Query waterfall */}
            <div className="space-y-1.5 mb-2.5">
                {queries.map((q, i) => (
                    <div key={q.label} className="flex items-center gap-2">
                        <span className="text-stone-500 w-16 truncate shrink-0">{q.label}</span>
                        <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${q.pct}%` }}
                                transition={{ duration: 1.2, delay: i * 0.18, ease: "easeOut" }}
                                style={{ backgroundColor: q.color }}
                                className="h-full rounded-full"
                            />
                        </div>
                        <span className="text-stone-400 shrink-0 w-10 text-right">{q.time}</span>
                    </div>
                ))}
            </div>

            {/* Flame chart */}
            <div className="text-[9px] text-stone-600 mb-1">flame · /api/users/</div>
            <div className="flex h-3.5 gap-px mb-2.5 overflow-hidden rounded-sm">
                {flame.map((seg, i) => (
                    <motion.div
                        key={i}
                        className="h-full flex items-center justify-center overflow-hidden"
                        style={{
                            flex: seg.flex,
                            backgroundColor: `${seg.color}1a`,
                            borderTop: `2px solid ${seg.color}70`,
                            transformOrigin: "left center",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease: "easeOut" }}
                    >
                        <span style={{ color: seg.color + "cc", fontSize: 7 }}>{seg.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* N+1 badge */}
            <motion.div
                animate={{ opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="inline-flex items-center gap-1 text-[9px] text-orange-400 border border-orange-400/30 px-1.5 py-0.5 rounded bg-orange-400/5"
            >
                ⚠ N+1 detected · /api/users/
            </motion.div>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
    const projects = [
        {
            title: "Vartalaap",
            url: "https://vartalaap.vaishnavghenge.com/",
            titleExplaination: "HD Video Calling with Real-Time Media Processing",
            description:
                "Built a high-quality P2P video call app focused on call reliability and media fidelity. Features HD 1080p video, background blur and virtual backgrounds via MediaPipe, screen sharing, acoustic echo cancellation, and background noise suppression — tackling the exact frustrations people have with mainstream video apps. Signaling handled by a lightweight Go WebSocket server with zero dependencies.",
            tech: ["Next.js", "Go", "WebRTC", "MediaPipe", "simple-peer", "WebSockets", "Zustand"],
            highlight: <VartalaapP2P />,
            engineeringDecision: "Why Go for signaling? Needed a single self-contained binary that handles concurrent WebSocket connections without a runtime or framework. Go's stdlib covers it entirely — no Node, no Python, no external dependencies on the critical signaling path.",
        },
        {
            title: "Servio",
            url: "https://github.com/VaishnavGhenge/servio",
            titleExplaination: "GUI-Based Systemd Service Manager",
            description:
                "Built a visually rich Web GUI for orchestrating Linux servers, replacing command-line fatigue with a modern dashboard. Directly interfaces with Systemd via D-Bus to start/stop services, view real-time journald logs, and manage environment variables. Includes a Git-integrated deployment pipeline that automatically builds and reloads services on push.",
            tech: ["Go (Golang)", "Linux Systemd", "WebSockets", "React UI", "SQLite", "D-Bus"],
            highlight: <ServioDeployFlow />,
            engineeringDecision: "Why Go over Node.js or Python? Needed a single self-contained binary with no runtime dependencies, direct D-Bus bindings for Systemd, and native goroutines for concurrent log streaming across multiple services. Go's stdlib handles all of this without a single external dependency.",
        },
        {
            title: "django-silky",
            url: "https://pypi.org/project/django-silky/",
            titleExplaination: "Production-Quality Fork of django-silk",
            description:
                "Forked the popular django-silk profiling library and shipped a fully modernized version: persistent dark/light theming, inline collapsible filter bar, D3.js analytics dashboards, N+1 query detection with endpoint attribution, and self-hosted icons (zero CDN dependencies). Drop-in replacement — no new migrations required.",
            tech: ["Python", "Django", "D3.js", "CSS Custom Properties", "PostgreSQL"],
            highlight: <DjangoSilkyHighlight />,
            engineeringDecision: "Why fork instead of contributing upstream? The changes required architectural rewrites — CSS variables for theming, D3 for analytics, self-hosted assets. Getting that through upstream review would take weeks. Forking let me ship in one day and write about it.",
        },
    ];

    return (
        <div className="mb-16">
            <h2 className="font-serif text-lg font-bold uppercase mb-8 tracking-widest text-stone-900">
                Featured Projects
            </h2>
            <ol className="space-y-12">
                {projects.map((project) => (
                    <li key={project.title}>
                        <div className="grid gap-6 sm:grid-cols-8">
                            {/* Dark terminal panel — intentional contrast on light page */}
                            <div className="sm:col-span-3 sm:order-2">
                                <div className="rounded border border-stone-800 bg-stone-900 h-full flex flex-col justify-center overflow-hidden">
                                    {project.highlight}
                                    <div className="bg-black/30 p-2 text-center border-t border-stone-800">
                                        <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">
                                            Technical Highlight
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="sm:col-span-5 sm:order-1">
                                <h3 className="font-serif font-bold text-stone-900">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-amber-800 underline underline-offset-2 decoration-stone-300 hover:decoration-amber-800 transition-colors"
                                    >
                                        {project.title} ↗
                                    </a>
                                </h3>

                                {project.titleExplaination && (
                                    <p className="text-xs text-stone-500 mt-1 mb-3 font-medium uppercase tracking-wide">
                                        {project.titleExplaination}
                                    </p>
                                )}

                                <p className="text-sm leading-relaxed text-stone-600">
                                    {project.description}
                                </p>

                                {'engineeringDecision' in project && project.engineeringDecision && (
                                    <div className="mt-3 border-l-2 border-stone-300 pl-3 py-1">
                                        <p className="text-[10px] text-stone-400 font-mono uppercase tracking-wider mb-1">
                                            Engineering Decision
                                        </p>
                                        <p className="text-xs text-stone-500 leading-relaxed">
                                            {project.engineeringDecision}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="border border-stone-300 rounded px-2.5 py-0.5 text-xs text-stone-600 bg-white">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
