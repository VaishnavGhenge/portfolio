"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClientTiltCard from "./ClientTiltCard";

// Types for our "Skill Examples"
interface SkillExample {
    type: "code" | "visual" | "metric";
    content: React.ReactNode;
}

interface SkillDomain {
    title: string;
    description: string;
    tags: string[];
    examples: SkillExample[];
}

// --- Animations ---

function CeleryQueueAnimation() {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 mb-2">
                <span>RACE CONDITION FIX</span>
            </div>
            <div className="flex items-center space-x-2">
                {/* Incoming Requests */}
                <div className="flex space-x-1">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ x: [0, 50, 100], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                            className="w-3 h-3 rounded-full bg-red-400"
                        />
                    ))}
                </div>

                {/* The Queue (Celery) */}
                <div className="w-16 h-8 border-2 border-slate-600 rounded flex items-center justify-center bg-slate-800 relative overflow-hidden">
                    <span className="text-[10px] text-slate-400 z-10">QUEUE</span>
                    <motion.div
                        className="absolute inset-0 bg-teal-500/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>

                {/* Serialized Output */}
                <div className="flex space-x-1">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ x: [0, 30], opacity: [0, 1, 0], scale: [0.8, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 1.5 + (i * 0.5) }}
                            className="w-3 h-3 rounded-full bg-green-400"
                        />
                    ))}
                </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
                Concurrent &rarr; Serialized
            </div>
        </div>
    );
}

function BillingRetryCode() {
    return (
        <div className="font-mono text-xs leading-relaxed">
            <span className="text-purple-400">def</span> <span className="text-blue-400">charge_subscription</span>(sub):<br />
            &nbsp;&nbsp;<span className="text-purple-400">try</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;payment = mollie.charge(...)<br />
            &nbsp;&nbsp;<span className="text-purple-400">except</span> <span className="text-yellow-300">PaymentFailed</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># Auto-recovery workflow</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> sub.retry_count &lt; 3:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sub.status = <span className="text-green-300">&apos;RETRYING&apos;</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduler.schedule(<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;func=retry_charge,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay=<span className="text-orange-300">exponential_backoff(sub)</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br />
        </div>
    );
}

function SystemLogsAnimation() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const lines = [
            "[Servio] Service 'api-gateway' starting...",
            "[Systemd] ExecStart=/usr/bin/node server.js",
            "[Network] Listening on port 8080",
            "[Stream] Connection established",
            "[Servio] Health check passed ✅"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLogs(prev => [...prev.slice(-4), lines[i % lines.length]]);
            i++;
        }, 800);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="font-mono text-[10px] text-slate-400 space-y-1">
            {logs.map((log, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate"
                >
                    <span className="text-teal-500 mr-2">➜</span>{log}
                </motion.div>
            ))}
        </div>
    );
}

function MobileSyncAnimation() {
    return (
        <div className="flex items-center justify-between px-4 h-full">
            {/* Mobile Device */}
            <div className="flex flex-col items-center">
                <div className="w-8 h-12 border-2 border-slate-500 rounded-md bg-slate-800 flex flex-col items-center justify-center relative">
                    <span className="text-[8px] text-slate-400">APP</span>
                    <motion.div
                        className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full"
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>
            </div>

            {/* Sync Stream */}
            <div className="flex-1 flex justify-center items-center space-x-1 relative h-full">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-700 -z-10" />
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-sm bg-blue-400"
                        animate={{ x: [-20, 60], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Cloud/API */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-8 border border-dashed border-slate-500 rounded-full flex items-center justify-center bg-slate-800/50">
                    <span className="text-[10px] text-blue-300">API</span>
                </div>
                <span className="text-[8px] text-slate-500 mt-1">Sync</span>
            </div>
        </div>
    );
}

function DatabaseOptimAnimation() {
    return (
        <div className="flex flex-col justify-center h-full px-4 space-y-3">
            {/* Before */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                    <span>N+1 Query (Before)</span>
                    <span className="text-red-400">1200ms</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                    <motion.div
                        className="h-full bg-red-400/80"
                        initial={{ width: "90%" }}
                        animate={{ opacity: [0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>
            </div>

            {/* After */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Joined Query (After)</span>
                    <span className="text-green-400"><motion.span animate={{ opacity: [0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>⚡</motion.span> 180ms</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                    <motion.div
                        className="h-full bg-green-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "15%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
}

function UXInteractionAnimation() {
    return (
        <div className="flex flex-col justify-center h-full px-4 space-y-2">
            <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5, type: "spring" }}
                    className="h-6 w-full bg-slate-800 rounded flex items-center px-2 space-x-2"
                >
                    <div className="w-4 h-4 rounded-full bg-slate-700" />
                    <div className="h-2 w-2/3 bg-slate-700 rounded" />
                </motion.div>
            ))}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="self-end px-2 py-1 bg-teal-500/20 rounded text-[9px] text-teal-300"
            >
                60 FPS
            </motion.div>
        </div>
    );
}

const domains: SkillDomain[] = [
    {
        title: "Resilient Distributed Systems",
        description: "Background tasks, async flows, and event-based architectures (WebRTC/WebSockets).",
        tags: ["Celery", "Redis", "Event-Driven", "WebRTC"],
        examples: [
            {
                type: "visual",
                content: <CeleryQueueAnimation />
            }
        ]
    },
    {
        title: "Payments & Subscriptions",
        description: "Robust processing with retry scheduling and user-facing status reporting.",
        tags: ["Django", "Mollie API", "Idempotency", "Recurring Billing"],
        examples: [
            {
                type: "code",
                content: <BillingRetryCode />
            }
        ]
    },
    {
        title: "DevOps & Deployments",
        description: "Systemd services, Nginx configuration, and self-hosted tooling.",
        tags: ["Linux", "Systemd", "Nginx", "Docker"],
        examples: [
            {
                type: "visual",
                content: <SystemLogsAnimation />
            }
        ]
    },
    {
        title: "Frontend & Mobile UX",
        description: "Building Angular, React, & React Native interfaces with smooth, polished UX.",
        tags: ["React Native", "Angular", "framer-motion", "60fps"],
        examples: [
            {
                type: "visual",
                content: <UXInteractionAnimation />
            }
        ]
    },
    {
        title: "Database Performance",
        description: "Optimizing query patterns and relationships for high scale.",
        tags: ["PostgreSQL", "Query Plans", "Indexing", "N+1 Problem"],
        examples: [
            {
                type: "metric",
                content: <DatabaseOptimAnimation />
            }
        ]
    }
];

export default function SkillBento() {
    return (
        <section className="mb-24">
            <h2 className="text-lg font-bold uppercase mb-8 tracking-widest text-slate-200">
                Technical Expertise
            </h2>
            <div className="space-y-12">
                {domains.map((domain) => (
                    <ClientTiltCard key={domain.title} className="block">
                        <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                            <div className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                            {/* Left Content: Title & Description */}
                            <div className="z-10 sm:col-span-3">
                                <h3 className="font-medium leading-snug text-slate-200 text-lg mb-2 group-hover:text-teal-300 transition-colors">
                                    {domain.title}
                                </h3>
                                <p className="text-sm leading-normal text-slate-400 mb-4">
                                    {domain.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {domain.tags.map(tag => (
                                        <span key={tag} className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Content: The Example */}
                            <div className="z-10 sm:col-span-5 relative mt-4 sm:mt-0">
                                <div className="rounded-lg bg-slate-900/50 p-4 font-mono text-xs text-slate-300 border border-slate-700/50 hover:border-slate-600 transition-colors shadow-sm">
                                    <div className="absolute top-2 right-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {domain.examples[0].type === 'code' ? 'Code Snippet' : 'Live Demo'}
                                    </div>
                                    {domain.examples[0].content}
                                </div>
                            </div>
                        </div>
                    </ClientTiltCard>
                ))}
            </div>
        </section>
    );
}
