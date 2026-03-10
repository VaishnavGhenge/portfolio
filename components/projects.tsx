"use client";

import { motion } from 'framer-motion';
import ClientTiltCard from './ClientTiltCard';

// ─── Highlight Visuals ────────────────────────────────────────────────────────

function VartalaapArchitecture() {
    const SFU = { x: 130, y: 52 };
    const peers = [
        { id: "A", x: 14,  y: 14,  color: "#60a5fa" },
        { id: "B", x: 14,  y: 76,  color: "#a78bfa" },
        { id: "C", x: 218, y: 14,  color: "#4ade80" },
        { id: "D", x: 218, y: 76,  color: "#fb7185" },
    ];

    return (
        <div className="flex items-center justify-center w-full py-2">
            <svg width="100%" viewBox="0 0 260 106" fill="none" overflow="visible">
                {/* Connection lines */}
                {peers.map(p => (
                    <line
                        key={p.id + "-line"}
                        x1={p.x + 14} y1={p.y + 10}
                        x2={SFU.x}    y2={SFU.y}
                        stroke={`${p.color}22`}
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                    />
                ))}

                {/* Inbound packets: peer → SFU */}
                {peers.map((p, i) => (
                    <motion.circle
                        key={p.id + "-in"}
                        cx={p.x + 14} cy={p.y + 10} r={3}
                        fill={p.color}
                        animate={{
                            x: [0, SFU.x - (p.x + 14)],
                            y: [0, SFU.y - (p.y + 10)],
                            opacity: [0, 1, 0.9, 0],
                        }}
                        transition={{
                            duration: 1.05,
                            repeat: Infinity,
                            repeatDelay: 1.95,
                            delay: i * 0.55,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Outbound packets: SFU → peer */}
                {peers.map((p, i) => (
                    <motion.circle
                        key={p.id + "-out"}
                        cx={SFU.x} cy={SFU.y} r={2.5}
                        fill={p.color} fillOpacity={0.65}
                        animate={{
                            x: [0, (p.x + 14) - SFU.x],
                            y: [0, (p.y + 10) - SFU.y],
                            opacity: [0, 1, 0.75, 0],
                        }}
                        transition={{
                            duration: 1.05,
                            repeat: Infinity,
                            repeatDelay: 1.95,
                            delay: i * 0.55 + 1.3,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Peer nodes */}
                {peers.map(p => (
                    <g key={p.id + "-node"}>
                        <rect x={p.x} y={p.y} width={28} height={20} rx={4}
                            fill="rgba(15,23,42,0.9)" stroke={`${p.color}45`} strokeWidth="1"
                        />
                        <text x={p.x + 14} y={p.y + 13.5} textAnchor="middle"
                            fill={p.color} fontSize="8" fontFamily="monospace" fontWeight="700"
                        >{p.id}</text>
                    </g>
                ))}

                {/* SFU core */}
                <rect x={SFU.x - 33} y={SFU.y - 22} width={66} height={44} rx={6}
                    fill="rgba(9,14,24,0.95)" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5"
                />
                <text x={SFU.x} y={SFU.y - 7} textAnchor="middle"
                    fill="#2dd4bf" fontSize="9.5" fontFamily="monospace" fontWeight="700"
                >SFU</text>
                <text x={SFU.x} y={SFU.y + 5} textAnchor="middle"
                    fill="#334155" fontSize="6.5" fontFamily="monospace"
                >media router</text>

                {/* SFU activity dots */}
                {[-8, 0, 8].map((off, i) => (
                    <motion.circle key={i} cx={SFU.x + off} cy={SFU.y + 16} r={1.8}
                        fill="#2dd4bf"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.35 }}
                    />
                ))}

                {/* O(n) label */}
                <text x="130" y="102" textAnchor="middle"
                    fill="rgba(71,85,105,0.65)" fontSize="7" fontFamily="monospace"
                >O(n) routing · not O(n²) mesh</text>
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
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-700/40">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="ml-1.5 text-slate-600 text-[9px]">servio — journald</span>
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
                    className="text-slate-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                >▋</motion.span>
            </div>

            {/* CPU / MEM bars */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                {[
                    { label: "CPU", color: "#a78bfa", values: ["8%", "22%", "11%", "19%", "8%"] },
                    { label: "MEM", color: "#60a5fa", values: ["34%", "38%", "36%", "40%", "34%"] },
                ].map(bar => (
                    <div key={bar.label} className="flex items-center gap-2">
                        <span className="text-slate-600 w-6 shrink-0">{bar.label}</span>
                        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
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
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700/50">
                <span className="text-teal-300 font-bold">django-silky</span>
                <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[9px]">dark</span>
                    <div className="w-7 h-3.5 rounded-full bg-teal-500/30 relative flex items-center px-0.5">
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-teal-300 absolute"
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
                        <span className="text-slate-500 w-16 truncate shrink-0">{q.label}</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${q.pct}%` }}
                                transition={{ duration: 1.2, delay: i * 0.18, ease: "easeOut" }}
                                style={{ backgroundColor: q.color }}
                                className="h-full rounded-full"
                            />
                        </div>
                        <span className="text-slate-400 shrink-0 w-10 text-right">{q.time}</span>
                    </div>
                ))}
            </div>

            {/* Flame chart */}
            <div className="text-[9px] text-slate-600 mb-1">flame · /api/users/</div>
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

// ─── Card entrance variant ────────────────────────────────────────────────────

const cardVariant = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
    const projects = [
        {
            title: "Vartalaap",
            url: "https://vartalaap.vaishnavghenge.com/",
            titleExplaination: "Scalable SFU Video Conferencing Platform",
            description:
                "Architected a scalable Selective Forwarding Unit (SFU) video architecture to support high-quality multi-party calls with minimal bandwidth. Unlike P2P mesh, this central media router efficiently manages streams, decoding once and forwarding to participants. Integrated OpenAI Whisper (C++ optimized) for real-time AI captioning and handled complex signaling via WebSockets in Django.",
            tech: ["Next.js", "Django", "WebRTC (SFU)", "Fast-Whisper", "Redis", "PostgreSQL", "Docker"],
            highlight: <VartalaapArchitecture />,
            engineeringDecision: "Why SFU over P2P mesh? In a mesh, each peer uploads to every other peer — O(n²) bandwidth. SFU routes raw streams through one server — O(n). For any call with more than 3 participants, SFU is the only architecture that scales.",
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
            url: "https://github.com/VaishnavGhenge/django-silky",
            titleExplaination: "Production-Quality Fork of django-silk",
            badge: "Built in 1 day",
            description:
                "Forked the popular django-silk profiling library and shipped a fully modernized version: persistent dark/light theming, inline collapsible filter bar, D3.js analytics dashboards, N+1 query detection with endpoint attribution, and self-hosted icons (zero CDN dependencies). Drop-in replacement — no new migrations required.",
            tech: ["Python", "Django", "D3.js", "CSS Custom Properties", "PostgreSQL"],
            highlight: <DjangoSilkyHighlight />,
            engineeringDecision: "Why fork instead of contributing upstream? The changes required architectural rewrites — CSS variables for theming, D3 for analytics, self-hosted assets. Getting that through upstream review would take weeks. Forking let me ship in one day and write about it.",
        },
    ];

    return (
        <div className="mb-16">
            <h2 className="text-lg font-bold uppercase mb-8 tracking-widest text-slate-200">
                Featured Projects
            </h2>
            <ol className="group/list">
                {projects.map((project, index) => (
                    <motion.li
                        key={project.title}
                        className="mb-12"
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.65,
                            delay: index * 0.1,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                    >
                        <ClientTiltCard>
                            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                <div className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                                {/* Highlight panel */}
                                <div className="z-10 sm:col-span-3 sm:order-2">
                                    <motion.div
                                        className="rounded border-2 border-slate-200/10 bg-slate-900/50 h-full flex flex-col justify-center overflow-hidden"
                                        whileHover={{ borderColor: "rgba(148,163,184,0.25)" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {project.highlight}
                                        <div className="bg-slate-950/50 p-2 text-center border-t border-slate-800/50">
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                                                Technical Highlight
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="z-10 sm:col-span-5 sm:order-1">
                                    <h3 className="font-medium leading-snug text-slate-200">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                                        >
                                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                            <span>
                                                {project.title}
                                                <span className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                                        <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </span>
                                        </a>
                                        {'badge' in project && project.badge && (
                                            <span className="ml-2 inline-flex items-center text-[10px] font-medium border border-amber-400/30 text-amber-300/80 rounded-full px-2 py-0.5 bg-amber-400/5">
                                                {project.badge}
                                            </span>
                                        )}
                                    </h3>

                                    {project.titleExplaination && (
                                        <div className="text-slate-500 text-sm mb-2 font-medium">
                                            {project.titleExplaination}
                                        </div>
                                    )}

                                    <p className="mt-2 text-sm leading-normal text-slate-400">
                                        {project.description}
                                    </p>

                                    {'engineeringDecision' in project && project.engineeringDecision && (
                                        <motion.div
                                            className="mt-3 border-l-2 border-teal-500/30 pl-3 py-1.5"
                                            initial={{ opacity: 0, x: -6 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        >
                                            <p className="text-[10px] text-teal-400/60 font-mono uppercase tracking-wider mb-1">
                                                Engineering Decision
                                            </p>
                                            <p className="text-xs text-slate-500 leading-relaxed">
                                                {project.engineeringDecision}
                                            </p>
                                        </motion.div>
                                    )}

                                    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                                        {project.tech.map((tech, ti) => (
                                            <motion.li
                                                key={tech}
                                                className="mr-1.5 mt-2"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.25, delay: index * 0.1 + 0.2 + ti * 0.05 }}
                                            >
                                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                                    {tech}
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ClientTiltCard>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}
