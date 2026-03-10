"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "backend" | "frontend" | "infra" | "systems" | "language";
type Ring     = "expert" | "proficient" | "familiar";

const categoryColors: Record<Category, string> = {
    backend:  "#2dd4bf",
    frontend: "#60a5fa",
    infra:    "#a78bfa",
    systems:  "#fb7185",
    language: "#fbbf24",
};

const categoryLabels: Record<Category, string> = {
    backend:  "Backend",
    frontend: "Frontend",
    infra:    "Infrastructure",
    systems:  "Systems",
    language: "Language",
};

interface Skill { id: string; name: string; category: Category; ring: Ring; detail: string; }

const skills: Skill[] = [
    { id: "python",      name: "Python",       category: "language", ring: "expert",     detail: "5+ yrs · Django, FastAPI, Celery, scripting" },
    { id: "typescript",  name: "TypeScript",   category: "frontend", ring: "expert",     detail: "3+ yrs · React, Next.js, Angular, Node.js" },
    { id: "django",      name: "Django",       category: "backend",  ring: "expert",     detail: "3+ yrs · REST, WebSockets, ORM, admin" },
    { id: "react",       name: "React",        category: "frontend", ring: "expert",     detail: "3+ yrs · Next.js, Framer Motion, RSC" },
    { id: "postgresql",  name: "PostgreSQL",   category: "infra",    ring: "expert",     detail: "3+ yrs · Query plans, indexing, joins" },
    { id: "webrtc",      name: "WebRTC",       category: "systems",  ring: "expert",     detail: "2 yrs · SFU architecture, signaling, ICE" },
    { id: "go",          name: "Go",           category: "language", ring: "proficient", detail: "1+ yr · goroutines, stdlib, D-Bus" },
    { id: "nextjs",      name: "Next.js",      category: "frontend", ring: "proficient", detail: "2+ yrs · RSC, SSR, edge, App Router" },
    { id: "docker",      name: "Docker",       category: "infra",    ring: "proficient", detail: "3+ yrs · Compose, multi-stage builds" },
    { id: "redis",       name: "Redis",        category: "infra",    ring: "proficient", detail: "2+ yrs · Pub/Sub, caching, session" },
    { id: "aws",         name: "AWS",          category: "infra",    ring: "proficient", detail: "EC2, S3, VPC, IAM, CloudWatch" },
    { id: "celery",      name: "Celery",       category: "backend",  ring: "proficient", detail: "Task queues, beat scheduler, retry logic" },
    { id: "angular",     name: "Angular",      category: "frontend", ring: "proficient", detail: "2+ yrs · RxJS, signals, standalone" },
    { id: "fastapi",     name: "FastAPI",      category: "backend",  ring: "proficient", detail: "Async, Pydantic v2, WebSockets, OpenAPI" },
    { id: "kubernetes",  name: "Kubernetes",   category: "infra",    ring: "familiar",   detail: "Deployments, services, ingress, helm" },
    { id: "grpc",        name: "gRPC",         category: "backend",  ring: "familiar",   detail: "Proto3, bidirectional streaming" },
    { id: "graphql",     name: "GraphQL",      category: "backend",  ring: "familiar",   detail: "Queries, mutations, subscriptions" },
    { id: "reactnative", name: "React Native", category: "frontend", ring: "familiar",   detail: "Expo SDK 54, MobX, offline-first" },
    { id: "nginx",       name: "Nginx",        category: "infra",    ring: "familiar",   detail: "Reverse proxy, SSL, load balancing" },
    { id: "d3",          name: "D3.js",        category: "frontend", ring: "familiar",   detail: "Custom analytics dashboards, SVG" },
    { id: "systemd",     name: "Systemd",      category: "systems",  ring: "familiar",   detail: "Service lifecycle, D-Bus, journald" },
    { id: "supabase",    name: "Supabase",     category: "infra",    ring: "familiar",   detail: "Auth, realtime subscriptions, storage" },
    { id: "java",        name: "Java",         category: "language", ring: "familiar",   detail: "Spring Boot, REST APIs, Maven" },
    { id: "websockets",  name: "WebSockets",   category: "systems",  ring: "familiar",   detail: "Real-time comms, Django Channels, ASGI" },
];

const CAT_ORDER: Category[] = ["backend", "frontend", "infra", "systems", "language"];

const ringOpacity: Record<Ring, number>  = { expert: 1, proficient: 0.72, familiar: 0.45 };
const ringDots:    Record<Ring, string>  = { expert: "●●●", proficient: "●●", familiar: "●" };

export default function SkillGrid() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="space-y-5">
            {CAT_ORDER.map((cat, ci) => {
                const catSkills = skills.filter(s => s.category === cat);
                const color     = categoryColors[cat];

                return (
                    <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: ci * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        {/* Category label + rule */}
                        <div className="flex items-center gap-3 mb-2.5">
                            <span
                                className="text-[9px] font-mono uppercase tracking-widest shrink-0"
                                style={{ color }}
                            >
                                {categoryLabels[cat]}
                            </span>
                            <div className="flex-1 h-px" style={{ backgroundColor: `${color}18` }} />
                        </div>

                        {/* Skill badges */}
                        <div className="flex flex-wrap gap-1.5">
                            {catSkills.map((skill, si) => {
                                const isHov = hovered === skill.id;

                                return (
                                    <div key={skill.id} className="relative">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.85 }}
                                            whileInView={{ opacity: ringOpacity[skill.ring], scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.2, delay: ci * 0.07 + si * 0.03 }}
                                            animate={{ opacity: isHov ? 1 : ringOpacity[skill.ring] }}
                                            onHoverStart={() => setHovered(skill.id)}
                                            onHoverEnd={() => setHovered(null)}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono"
                                            style={{
                                                borderColor:     isHov ? `${color}55` : `${color}22`,
                                                backgroundColor: isHov ? `${color}12` : `${color}07`,
                                                color:           isHov ? color : `${color}cc`,
                                                boxShadow:       isHov && skill.ring === "expert"
                                                    ? `0 0 14px ${color}28`
                                                    : "none",
                                                transition: "border-color 0.15s, background-color 0.15s, box-shadow 0.15s",
                                            }}
                                        >
                                            {skill.name}
                                            <span
                                                className="text-[7px] tracking-[-1px]"
                                                style={{ opacity: isHov ? 0.65 : 0.3 }}
                                            >
                                                {ringDots[skill.ring]}
                                            </span>
                                        </motion.button>

                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {isHov && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    transition={{ duration: 0.12 }}
                                                    className="absolute bottom-full mb-2 left-0 z-50 pointer-events-none"
                                                    style={{ minWidth: 180 }}
                                                >
                                                    <div
                                                        className="rounded-lg border p-2.5 backdrop-blur-sm"
                                                        style={{
                                                            backgroundColor: "rgba(9,14,24,0.97)",
                                                            borderColor:     `${color}25`,
                                                            boxShadow:       `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${color}0d`,
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            <span
                                                                className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                                                                style={{ backgroundColor: `${color}15`, color }}
                                                            >
                                                                {categoryLabels[cat]}
                                                            </span>
                                                            <span
                                                                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                                                                style={{ backgroundColor: "rgba(148,163,184,0.08)", color: "rgb(100,116,139)" }}
                                                            >
                                                                {skill.ring}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 leading-relaxed">
                                                            {skill.detail}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
