"use client";

import { useState } from "react";

type Category = "backend" | "frontend" | "infra" | "systems" | "language";
type Ring     = "expert" | "proficient" | "familiar";

const categoryColors: Record<Category, string> = {
    backend:  "#0d9488",
    frontend: "#2563eb",
    infra:    "#7c3aed",
    systems:  "#e11d48",
    language: "#b45309",
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
    { id: "webrtc",      name: "WebRTC",       category: "systems",  ring: "expert",     detail: "2 yrs · P2P, signaling, ICE, MediaPipe" },
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
const RING_ORDER: Record<Ring, number> = { expert: 0, proficient: 1, familiar: 2 };
const ringLevel: Record<Ring, number> = { expert: 3, proficient: 2, familiar: 1 };

/**
 * Proficiency meter. Three segments, always at full opacity — the *count* of
 * filled segments carries the signal, so nothing has to be dimmed to read it.
 */
function Meter({ level, color }: { level: number; color: string }) {
    return (
        <span className="flex shrink-0 items-center gap-[2px]" aria-hidden="true">
            {[1, 2, 3].map((n) => (
                <span
                    key={n}
                    className="h-[3px] w-[3px] rounded-[0.5px]"
                    style={{ backgroundColor: n <= level ? color : "rgba(0,0,0,0.13)" }}
                />
            ))}
        </span>
    );
}

export function SkillLegend() {
    return (
        <div className="flex items-center gap-3 font-mono text-[10px] text-stone-400">
            {(["expert", "proficient", "familiar"] as Ring[]).map((r) => (
                <span key={r} className="flex items-center gap-1">
                    <Meter level={ringLevel[r]} color="#78716c" />
                    {r}
                </span>
            ))}
        </div>
    );
}

export default function SkillGrid() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="space-y-5">
            {CAT_ORDER.map((cat) => {
                const catSkills = skills
                    .filter((s) => s.category === cat)
                    .sort((a, b) => RING_ORDER[a.ring] - RING_ORDER[b.ring]);
                const color = categoryColors[cat];

                return (
                    <div key={cat}>
                        <div className="mb-2.5 flex items-center gap-3">
                            <span className="rubric shrink-0" style={{ color }}>
                                {categoryLabels[cat]}
                            </span>
                            <div className="h-px flex-1" style={{ backgroundColor: `${color}22` }} />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {catSkills.map((skill) => {
                                const isHov = hovered === skill.id;

                                return (
                                    <div key={skill.id} className="relative">
                                        <button
                                            type="button"
                                            onMouseEnter={() => setHovered(skill.id)}
                                            onMouseLeave={() => setHovered(null)}
                                            onFocus={() => setHovered(skill.id)}
                                            onBlur={() => setHovered(null)}
                                            aria-label={`${skill.name} — ${skill.ring}. ${skill.detail}`}
                                            className="flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[11px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                                            style={{
                                                borderColor:     isHov ? color : `${color}40`,
                                                backgroundColor: isHov ? `${color}14` : "rgba(255,255,255,0.6)",
                                                color:           color,
                                            }}
                                        >
                                            {skill.name}
                                            <Meter level={ringLevel[skill.ring]} color={color} />
                                        </button>

                                        {isHov && (
                                            <div
                                                role="tooltip"
                                                className="pointer-events-none absolute bottom-full left-0 z-50 mb-2"
                                                style={{ minWidth: 190 }}
                                            >
                                                <div className="rounded-sm border border-stone-200 bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                                                    <div className="mb-1.5 flex items-center gap-1.5">
                                                        <span
                                                            className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                                                            style={{ backgroundColor: `${color}18`, color }}
                                                        >
                                                            {categoryLabels[cat]}
                                                        </span>
                                                        <span className="rounded-sm bg-stone-100 px-1.5 py-0.5 font-mono text-[9px] text-stone-500">
                                                            {skill.ring}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] leading-relaxed text-stone-600">
                                                        {skill.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
