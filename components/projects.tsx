"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ClientTiltCard from './ClientTiltCard';

// --- Highlight Visual Components ---

function VartalaapArchitecture() {
    return (
        <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400 p-2 w-full">
            {/* Peer A */}
            <div className="flex flex-col items-center">
                <span className="mb-1 text-blue-400">Peer A</span>
                <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center p-1"
                >🎥</motion.div>
                <div className="h-4 w-[1px] bg-slate-600 mt-1"></div>
            </div>

            {/* SFU Server */}
            <div className="flex flex-col items-center z-10 mx-2">
                <div className="w-16 h-10 rounded border border-teal-500/50 bg-slate-800 flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                    <span className="text-[9px] text-teal-300 font-bold">SFU Core</span>
                    <div className="flex space-x-1 mt-1">
                        <motion.div
                            className="w-1 h-1 rounded-full bg-teal-400"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="w-1 h-1 rounded-full bg-teal-400"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="w-1 h-1 rounded-full bg-teal-400"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                    </div>
                </div>
                <div className="text-[9px] text-slate-500 mt-1">Media Router</div>
            </div>

            {/* Peer B */}
            <div className="flex flex-col items-center">
                <span className="mb-1 text-green-400">Peer B</span>
                <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center p-1"
                >🎥</motion.div>
                <div className="h-4 w-[1px] bg-slate-600 mt-1"></div>
            </div>
        </div>
    );
}

function ServioDeployFlow() {
    return (
        <div className="font-mono text-[10px] leading-relaxed p-3 text-slate-300 w-full">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700/50">
                <span className="text-slate-400">service: <span className="text-teal-300">api-gateway</span></span>
                <span className="text-green-400 text-[9px] border border-green-400/30 px-1 rounded">ACTIVE</span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Memory</span>
                    <motion.div
                        initial={{ width: "20%" }}
                        animate={{ width: ["20%", "45%", "30%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-1 bg-blue-500 rounded-full"
                        style={{ width: 100 }} // Container
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-500">Logs</span>
                    <span className="text-xs text-orange-300 animate-pulse">Streaming...</span>
                </div>
            </div>
        </div>
    );
}


export default function Projects() {
    const projects = [
        {
            title: "Vartalaap",
            url: "https://vartalaap.vaishnavghenge.com/",
            titleExplaination: "Scalable SFU Video Conferencing Platform",
            description:
                "Architected a scalable Selective Forwarding Unit (SFU) video architecture to support high-quality multi-party calls with minimal bandwidth. Unlike P2P mesh, this central media router efficiently manages streams, decoding once and forwarding to participants. Integrated OpenAI Whisper (C++ optimized) for real-time AI captioning and handled complex signaling via WebSockets in Django.",
            tech: ["Next.js", "Django", "WebRTC (SFU)", "Fast-Whisper", "Redis", "PostgreSQL", "Docker"],
            highlight: <VartalaapArchitecture />
        },
        {
            title: "Servio",
            url: "https://github.com/VaishnavGhenge/servio",
            titleExplaination: "GUI-Based Systemd Service Manager",
            description:
                "Built a visually rich Web GUI for orchestrating Linux servers, replacing command-line fatigue with a modern dashboard. Directly interfaces with Systemd via D-Bus to start/stop services, view real-time journald logs, and manage environment variables. Includes a Git-integrated deployment pipeline that automatically builds and reloads services on push.",
            tech: ["Go (Golang)", "Linux Systemd", "WebSockets", "React UI", "SQLite", "D-Bus"],
            highlight: <ServioDeployFlow />
        },
    ];

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-8 tracking-widest text-slate-200'>Featured Projects</h2>
            <ol className="group/list">
                {projects.map((project, index) => (
                    <li key={project.title} className='mb-12'>
                        <ClientTiltCard>
                            <div className='group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                                <div className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                                {/* Image / Highlight Section (Left on desktop for impact) */}
                                <div className="z-10 sm:col-span-3 sm:order-2">
                                    <div className="rounded border-2 border-slate-200/10 bg-slate-900/50 transition group-hover:border-slate-200/30 overflow-hidden h-full flex flex-col justify-center">
                                        {project.highlight}
                                        <div className="bg-slate-950/50 p-2 text-center border-t border-slate-800/50">
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Technical Highlight</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="z-10 sm:col-span-5 sm:order-1">
                                    <h3 className="font-medium leading-snug text-slate-200">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                                        >
                                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                            <span>
                                                {project.title}
                                                <span className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                                                </span>
                                            </span>
                                        </a>
                                    </h3>
                                    {project.titleExplaination && (
                                        <div className="text-slate-500 text-sm mb-2 font-medium">{project.titleExplaination}</div>
                                    )}
                                    <p className="mt-2 text-sm leading-normal text-slate-400">
                                        {project.description}
                                    </p>
                                    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                                        {project.tech.map((tech) => (
                                            <li key={tech} className="mr-1.5 mt-2">
                                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                                    {tech}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ClientTiltCard>
                    </li>
                ))}
            </ol>
        </div>
    );
}
