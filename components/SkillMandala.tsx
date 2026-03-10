"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// ─── Locally cached tech logos (/public/icons/) ───────────────────────────────
// SVGs downloaded from devicons + simpleicons at build time.
// Served from the same origin — no CDN round-trip, no layout shift.

const ICON_SRC: Record<string, string> = {
    python:      "/icons/python.svg",
    typescript:  "/icons/typescript.svg",
    django:      "/icons/django.svg",
    react:       "/icons/react.svg",
    postgresql:  "/icons/postgresql.svg",
    go:          "/icons/go.svg",
    nextjs:      "/icons/nextjs.svg",
    docker:      "/icons/docker.svg",
    redis:       "/icons/redis.svg",
    aws:         "/icons/aws.svg",
    angular:     "/icons/angular.svg",
    fastapi:     "/icons/fastapi.svg",
    kubernetes:  "/icons/kubernetes.svg",
    graphql:     "/icons/graphql.svg",
    reactnative: "/icons/react.svg",   // React Native shares the React logo
    nginx:       "/icons/nginx.svg",
    d3:          "/icons/d3.svg",
    supabase:    "/icons/supabase.svg",
    java:        "/icons/java.svg",
    celery:      "/icons/celery.svg",
    grpc:        "/icons/grpc.svg",
    systemd:     "/icons/systemd.svg",
    webrtc:      "/icons/webrtc.svg",
    // websockets has no official logo — rendered as WS badge
};

// Next.js official brand color is black — needs a white disc on dark bg
const NEEDS_LIGHT_BG = new Set(["nextjs"]);

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "backend" | "frontend" | "infra" | "systems" | "language";
type Ring     = "expert" | "proficient" | "familiar";

export const categoryColors: Record<Category, string> = {
    backend:  "#2dd4bf",
    frontend: "#60a5fa",
    infra:    "#a78bfa",
    systems:  "#fb7185",
    language: "#fbbf24",
};

export const categoryLabels: Record<Category, string> = {
    backend:  "Backend",
    frontend: "Frontend",
    infra:    "Infrastructure",
    systems:  "Systems",
    language: "Language",
};

// ─── Mandala accent colors ────────────────────────────────────────────────────
const GOLD    = "#D4A942";
const SAFFRON = "#FF6B35";

// ─── Skills ──────────────────────────────────────────────────────────────────

interface Skill { id: string; name: string; category: Category; ring: Ring; detail: string; }

const skills: Skill[] = [
    // ── Expert
    { id: "python",     name: "Python",     category: "language", ring: "expert",     detail: "5+ yrs · Django, FastAPI, Celery, scripting" },
    { id: "typescript", name: "TypeScript", category: "frontend", ring: "expert",     detail: "3+ yrs · React, Next.js, Angular, Node.js" },
    { id: "django",     name: "Django",     category: "backend",  ring: "expert",     detail: "3+ yrs · REST, WebSockets, ORM, admin" },
    { id: "react",      name: "React",      category: "frontend", ring: "expert",     detail: "3+ yrs · Next.js, Framer Motion, RSC" },
    { id: "postgresql", name: "PostgreSQL", category: "infra",    ring: "expert",     detail: "3+ yrs · Query plans, indexing, joins" },
    { id: "webrtc",     name: "WebRTC",     category: "systems",  ring: "expert",     detail: "2 yrs · SFU architecture, signaling, ICE" },
    // ── Proficient
    { id: "go",       name: "Go",       category: "language", ring: "proficient", detail: "1+ yr · Systemd, D-Bus, goroutines, stdlib" },
    { id: "nextjs",   name: "Next.js",  category: "frontend", ring: "proficient", detail: "2+ yrs · RSC, SSR, edge, App Router" },
    { id: "docker",   name: "Docker",   category: "infra",    ring: "proficient", detail: "3+ yrs · Compose, multi-stage builds" },
    { id: "redis",    name: "Redis",    category: "infra",    ring: "proficient", detail: "2+ yrs · Pub/Sub, caching, session" },
    { id: "aws",      name: "AWS",      category: "infra",    ring: "proficient", detail: "EC2, S3, VPC, IAM, CloudWatch" },
    { id: "celery",   name: "Celery",   category: "backend",  ring: "proficient", detail: "Task queues, beat scheduler, retry logic" },
    { id: "angular",  name: "Angular",  category: "frontend", ring: "proficient", detail: "2+ yrs · RxJS, signals, standalone" },
    { id: "fastapi",  name: "FastAPI",  category: "backend",  ring: "proficient", detail: "Async, Pydantic v2, WebSockets, OpenAPI" },
    // ── Familiar
    { id: "kubernetes",  name: "Kubernetes",   category: "infra",    ring: "familiar", detail: "Deployments, services, ingress, helm" },
    { id: "grpc",        name: "gRPC",         category: "backend",  ring: "familiar", detail: "Proto3, bidirectional streaming" },
    { id: "graphql",     name: "GraphQL",      category: "backend",  ring: "familiar", detail: "Queries, mutations, subscriptions" },
    { id: "reactnative", name: "React Native", category: "frontend", ring: "familiar", detail: "Expo SDK 54, MobX, offline-first" },
    { id: "nginx",       name: "Nginx",        category: "infra",    ring: "familiar", detail: "Reverse proxy, SSL, load balancing" },
    { id: "d3",          name: "D3.js",        category: "frontend", ring: "familiar", detail: "Custom analytics dashboards, SVG" },
    { id: "systemd",     name: "Systemd",      category: "systems",  ring: "familiar", detail: "Service lifecycle, D-Bus, journald" },
    { id: "supabase",    name: "Supabase",     category: "infra",    ring: "familiar", detail: "Auth, realtime subscriptions, storage" },
    { id: "java",        name: "Java",         category: "language", ring: "familiar", detail: "Spring Boot, REST APIs, Maven" },
    { id: "websockets",  name: "WebSockets",   category: "systems",  ring: "familiar", detail: "Real-time comms, Django Channels, ASGI" },
];

// ─── Geometry constants ───────────────────────────────────────────────────────

const BASE  = 600;
const CX    = BASE / 2;   // 300
const RINGS = { expert: 102, proficient: 178, familiar: 250 } as const;
const SIZES = { expert: 52,  proficient: 40,  familiar: 30  } as const;

const CAT_ORDER: Category[] = ["backend", "frontend", "infra", "systems", "language"];

interface Sector {
    category: Category;
    startDeg: number;
    endDeg:   number;
    midDeg:   number;
    color:    string;
}

function buildSectors(): Sector[] {
    let cur = -90;
    return CAT_ORDER.map(cat => {
        const count = skills.filter(s => s.category === cat).length;
        const span  = (count / skills.length) * 360;
        const sec: Sector = {
            category: cat,
            startDeg: cur,
            endDeg:   cur + span,
            midDeg:   cur + span / 2,
            color:    categoryColors[cat],
        };
        cur += span;
        return sec;
    });
}

const SECTORS = buildSectors();

// ─── Helpers ─────────────────────────────────────────────────────────────────

const d2r = (d: number) => (d * Math.PI) / 180;
const r2  = (n: number) => Math.round(n * 100) / 100;

function polar(angleDeg: number, radius: number) {
    return {
        x: r2(CX + Math.cos(d2r(angleDeg)) * radius),
        y: r2(CX + Math.sin(d2r(angleDeg)) * radius),
    };
}

function arcPath(startDeg: number, endDeg: number, outerR: number): string {
    const s = polar(startDeg, outerR);
    const e = polar(endDeg,   outerR);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return [
        `M ${CX} ${CX}`,
        `L ${s.x} ${s.y}`,
        `A ${outerR} ${outerR} 0 ${large} 1 ${e.x} ${e.y}`,
        "Z",
    ].join(" ");
}

/** Lotus petal from center (cx,cy) outward at angleDeg, pointed tip */
function petalPath(
    cx: number, cy: number,
    angleDeg: number,
    len: number,
    spreadDeg: number,
): string {
    const a  = d2r(angleDeg);
    const sp = d2r(spreadDeg);

    const tipX = r2(cx + Math.cos(a) * len);
    const tipY = r2(cy + Math.sin(a) * len);

    const ctrl = 0.65 * len;
    const c1x = r2(cx + Math.cos(a - sp) * ctrl);
    const c1y = r2(cy + Math.sin(a - sp) * ctrl);
    const c2x = r2(cx + Math.cos(a + sp) * ctrl);
    const c2y = r2(cy + Math.sin(a + sp) * ctrl);

    return `M ${cx} ${cy} Q ${c1x} ${c1y} ${tipX} ${tipY} Q ${c2x} ${c2y} ${cx} ${cy} Z`;
}

/** Floating petal between two radii — starts at innerR, tip at outerR */
function ringPetalPath(
    angleDeg: number,
    innerR: number,
    outerR: number,
    spreadDeg: number,
): string {
    const a    = d2r(angleDeg);
    const sp   = d2r(spreadDeg);
    const midR = (innerR + outerR) / 2;

    const startX = r2(CX + Math.cos(a) * innerR);
    const startY = r2(CX + Math.sin(a) * innerR);
    const tipX   = r2(CX + Math.cos(a) * outerR);
    const tipY   = r2(CX + Math.sin(a) * outerR);

    const c1x = r2(CX + Math.cos(a - sp) * midR);
    const c1y = r2(CX + Math.sin(a - sp) * midR);
    const c2x = r2(CX + Math.cos(a + sp) * midR);
    const c2y = r2(CX + Math.sin(a + sp) * midR);

    return `M ${startX} ${startY} Q ${c1x} ${c1y} ${tipX} ${tipY} Q ${c2x} ${c2y} ${startX} ${startY} Z`;
}

function skillPos(skill: Skill): { x: number; y: number } {
    const sector = SECTORS.find(s => s.category === skill.category)!;
    const group  = skills.filter(s => s.category === skill.category && s.ring === skill.ring);
    const idx    = group.indexOf(skill);
    const count  = group.length;
    const r      = RINGS[skill.ring];

    const startR = d2r(sector.startDeg);
    const endR   = d2r(sector.endDeg);
    const pad    = count <= 1 ? 0 : 0.13;
    const lo     = startR + pad * (endR - startR);
    const hi     = endR   - pad * (endR - startR);
    const angle  = count === 1 ? (startR + endR) / 2 : lo + (idx / (count - 1)) * (hi - lo);

    return polar(angle * 180 / Math.PI, r);
}

/** Which sector does a degree fall into? */
function sectorAt(deg: number): Sector | undefined {
    const norm = ((deg % 360) + 360) % 360;
    return SECTORS.find(s => {
        const start = ((s.startDeg % 360) + 360) % 360;
        const end   = ((s.endDeg   % 360) + 360) % 360;
        return end > start
            ? norm >= start && norm < end
            : norm >= start || norm < end;
    });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SkillMandala({ size: maxSize = 490 }: { size?: number }) {
    const [hovered, setHovered] = useState<string | null>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(maxSize);

    useEffect(() => {
        const el = outerRef.current;
        if (!el) return;
        const update = () => setSize(Math.min(maxSize, Math.max(el.clientWidth, 200)));
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [maxSize]);

    const sc = size / BASE;
    const cx = size / 2;

    const hoveredSkill = skills.find(s => s.id === hovered) ?? null;

    // ── Pre-computed decoration arrays ──────────────────────────────────────

    // 8 center lotus petals (every 45°, offset by 22.5 so they sit between sector dividers)
    const centerPetals = Array.from({ length: 8 },  (_, i) => i * 45 + 22.5);

    // 16 crown petals from r=58→76
    const crownPetals  = Array.from({ length: 16 }, (_, i) => i * 22.5);

    // 24 mid-ring dots at r=140
    const midDots      = Array.from({ length: 24 }, (_, i) => i * 15);

    // 24 outer petals (r=248→272), evenly spaced — color by sector
    const outerPetals  = Array.from({ length: 24 }, (_, i) => i * 15);

    // 36 outer dots at r=265
    const outerDots    = Array.from({ length: 36 }, (_, i) => i * 10);

    return (
        <div ref={outerRef} className="w-full flex justify-center">
        <div className="relative select-none" style={{ width: size, height: size }}>

            {/* ── SVG: all decorative + structural geometry ── */}
            <svg
                className="absolute inset-0 pointer-events-none"
                viewBox={`0 0 ${BASE} ${BASE}`}
                width={size} height={size}
                fill="none"
            >
                <defs>
                    {/* Warm radial glow from center */}
                    <radialGradient id="mg-warmGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor={GOLD}    stopOpacity="0.18" />
                        <stop offset="45%"  stopColor="#2dd4bf" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0"    />
                    </radialGradient>

                    {/* Center node gradient fill */}
                    <radialGradient id="mg-centerFill" cx="40%" cy="35%" r="70%">
                        <stop offset="0%"   stopColor={GOLD}    stopOpacity="0.25" />
                        <stop offset="60%"  stopColor="#2dd4bf" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.04" />
                    </radialGradient>

                    {/* Gold petal gradient */}
                    <radialGradient id="mg-petalGold" cx="0%" cy="50%" r="100%">
                        <stop offset="0%"   stopColor={GOLD}    stopOpacity="0.55" />
                        <stop offset="100%" stopColor={GOLD}    stopOpacity="0.05" />
                    </radialGradient>

                    {/* Per-category gradients for outer petals */}
                    {SECTORS.map(sec => (
                        <radialGradient
                            key={`mg-cat-${sec.category}`}
                            id={`mg-cat-${sec.category}`}
                            cx="0%" cy="50%" r="100%"
                        >
                            <stop offset="0%"   stopColor={sec.color} stopOpacity="0.5"  />
                            <stop offset="100%" stopColor={sec.color} stopOpacity="0.03" />
                        </radialGradient>
                    ))}

                    {/* Glow filter for expert nodes */}
                    <filter id="mg-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ── Overall warm radial glow ── */}
                <circle cx={CX} cy={CX} r={285} fill="url(#mg-warmGlow)" />

                {/* ── Sector wedge backgrounds ── */}
                {SECTORS.map((sec, i) => (
                    <motion.path
                        key={sec.category}
                        d={arcPath(sec.startDeg, sec.endDeg, 262)}
                        fill={sec.color}
                        fillOpacity={hovered && hoveredSkill?.category === sec.category ? 0.11 : 0.035}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: i * 0.1 }}
                    />
                ))}

                {/* ── Outer lotus petals (24 even, colored by sector) ── */}
                {outerPetals.map((deg, i) => {
                    const sec = sectorAt(deg - 90);
                    const color = sec ? sec.color : GOLD;
                    return (
                        <motion.path
                            key={`op-${i}`}
                            d={ringPetalPath(deg - 90, 248, 272, 6.5)}
                            fill={color}
                            fillOpacity={0.20}
                            stroke={color}
                            strokeOpacity={0.35}
                            strokeWidth={0.5}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ transformOrigin: `${CX}px ${CX}px` }}
                            transition={{ duration: 1.1, delay: 0.25 + i * 0.025, ease: "easeOut" }}
                        />
                    );
                })}

                {/* ── Outer dot ring at r=265 ── */}
                {outerDots.map((deg, i) => {
                    const pt  = polar(deg - 90, 265);
                    const sec = sectorAt(deg - 90);
                    const isDivider = SECTORS.some(s => Math.abs(((s.startDeg + 90 - deg + 540) % 360) - 180) < 6);
                    return (
                        <circle
                            key={`od-${i}`}
                            cx={pt.x} cy={pt.y}
                            r={isDivider ? 2.5 : 1.2}
                            fill={sec ? sec.color : GOLD}
                            fillOpacity={isDivider ? 0.55 : 0.28}
                        />
                    );
                })}

                {/* ── Two counter-rotating outer rings ── */}
                <motion.circle
                    cx={CX} cy={CX} r={278}
                    stroke={GOLD}
                    strokeOpacity={0.13}
                    strokeWidth="0.7"
                    strokeDasharray="1.5 7"
                    style={{ transformOrigin: `${CX}px ${CX}px` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                    cx={CX} cy={CX} r={271}
                    stroke={SAFFRON}
                    strokeOpacity={0.09}
                    strokeWidth="0.6"
                    strokeDasharray="4 5"
                    style={{ transformOrigin: `${CX}px ${CX}px` }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
                />

                {/* ── Sector divider lines with gold diamond tips ── */}
                {SECTORS.map(sec => {
                    const pt = polar(sec.startDeg, 264);
                    return (
                        <g key={sec.category + "-div"}>
                            <line
                                x1={CX} y1={CX}
                                x2={pt.x} y2={pt.y}
                                stroke={GOLD}
                                strokeOpacity={0.22}
                                strokeWidth="0.8"
                                strokeDasharray="3 7"
                            />
                            {/* Diamond ornament */}
                            <rect
                                x={pt.x - 4.5} y={pt.y - 4.5}
                                width="9" height="9"
                                fill={GOLD}
                                fillOpacity={0.35}
                                stroke={GOLD}
                                strokeOpacity={0.5}
                                strokeWidth="0.5"
                                transform={`rotate(45, ${pt.x}, ${pt.y})`}
                            />
                            {/* Inner diamond (midway) */}
                            {(() => {
                                const mid = polar(sec.startDeg, 132);
                                return (
                                    <rect
                                        x={mid.x - 2.5} y={mid.y - 2.5}
                                        width="5" height="5"
                                        fill={GOLD}
                                        fillOpacity={0.2}
                                        transform={`rotate(45, ${mid.x}, ${mid.y})`}
                                    />
                                );
                            })()}
                        </g>
                    );
                })}

                {/* ── Three ring guides (gold) ── */}
                {(Object.entries(RINGS) as [Ring, number][]).map(([ring, r], i) => (
                    <motion.circle
                        key={r}
                        cx={CX} cy={CX} r={r}
                        stroke={GOLD}
                        strokeOpacity={0.15}
                        strokeWidth="0.8"
                        strokeDasharray="2 7"
                        style={{ transformOrigin: `${CX}px ${CX}px` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.15 + i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                ))}

                {/* ── Mid-ring dot decorations at r=140 ── */}
                {midDots.map((deg, i) => {
                    const pt  = polar(deg - 90, 140);
                    const sec = sectorAt(deg - 90);
                    const onDiv   = SECTORS.some(s => Math.abs(((s.startDeg + 90 - deg + 540) % 360) - 180) < 8);
                    return (
                        <circle
                            key={`md-${i}`}
                            cx={pt.x} cy={pt.y}
                            r={onDiv ? 2.8 : 1.5}
                            fill={sec ? sec.color : GOLD}
                            fillOpacity={onDiv ? 0.50 : 0.22}
                        />
                    );
                })}

                {/* ── Category labels with dot accents ── */}
                {SECTORS.map(sec => {
                    const labelPt = polar(sec.midDeg, 290);
                    const dotPt   = polar(sec.midDeg, 280);
                    const anchor  = Math.abs(Math.cos(d2r(sec.midDeg))) < 0.25
                        ? "middle"
                        : Math.cos(d2r(sec.midDeg)) > 0 ? "start" : "end";
                    return (
                        <g key={sec.category + "-label"}>
                            {/* Accent dot */}
                            <circle
                                cx={dotPt.x} cy={dotPt.y} r={2.2}
                                fill={sec.color} fillOpacity={0.65}
                            />
                            <text
                                x={labelPt.x} y={labelPt.y}
                                textAnchor={anchor}
                                dominantBaseline="middle"
                                fill={sec.color}
                                fillOpacity={0.82}
                                fontSize="9"
                                fontFamily="monospace"
                                letterSpacing="0.1em"
                                style={{ textTransform: "uppercase" }}
                            >
                                {categoryLabels[sec.category]}
                            </text>
                        </g>
                    );
                })}

                {/* ── Crown petal ring (16 petals r=58→76) ── */}
                {crownPetals.map((deg, i) => (
                    <motion.path
                        key={`cp-${i}`}
                        d={ringPetalPath(deg - 90, 58, 76, 9.5)}
                        fill={GOLD}
                        fillOpacity={0.22}
                        stroke={GOLD}
                        strokeOpacity={0.30}
                        strokeWidth={0.5}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ transformOrigin: `${CX}px ${CX}px` }}
                        transition={{ duration: 0.7, delay: 1.4 + i * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                ))}

                {/* ── Center lotus petals (8 petals to r=50) ── */}
                {centerPetals.map((deg, i) => (
                    <motion.path
                        key={`clp-${i}`}
                        d={petalPath(CX, CX, deg, 50, 20)}
                        fill={GOLD}
                        fillOpacity={0.20}
                        stroke={GOLD}
                        strokeOpacity={0.35}
                        strokeWidth={0.6}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ transformOrigin: `${CX}px ${CX}px` }}
                        transition={{ duration: 0.6, delay: 1.55 + i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                ))}

                {/* ── Center glow halos ── */}
                <circle
                    cx={CX} cy={CX} r={56}
                    fill="rgba(20,184,166,0.04)"
                    stroke={GOLD}
                    strokeOpacity={0.28}
                    strokeWidth="1"
                />
                <circle
                    cx={CX} cy={CX} r={42}
                    fill="rgba(20,184,166,0.06)"
                    stroke="#2dd4bf"
                    strokeOpacity={0.18}
                    strokeWidth="0.6"
                />
                {/* Inner gold dot ring (8 dots between petals) */}
                {Array.from({ length: 8 }, (_, i) => {
                    const pt = polar(i * 45 - 90, 56);
                    return (
                        <circle key={`ib-${i}`}
                            cx={pt.x} cy={pt.y} r={1.8}
                            fill={GOLD} fillOpacity={0.45}
                        />
                    );
                })}

                {/* ── Hover connection line + ripple ── */}
                {hovered && (() => {
                    const skill = skills.find(s => s.id === hovered)!;
                    const pos   = skillPos(skill);
                    const color = categoryColors[skill.category];
                    const baseR = SIZES[skill.ring] / 2;
                    return (
                        <>
                            <motion.line
                                x1={CX} y1={CX}
                                x2={pos.x} y2={pos.y}
                                stroke={color}
                                strokeOpacity={0.40}
                                strokeWidth="1"
                                strokeDasharray="3 5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                            {[0, 0.55].map((delay, i) => (
                                <motion.circle
                                    key={i}
                                    cx={pos.x} cy={pos.y}
                                    r={baseR}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={1.2 - i * 0.3}
                                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                                    initial={{ scale: 1, opacity: 0.7 }}
                                    animate={{ scale: 4.5, opacity: 0 }}
                                    transition={{ duration: 1.4, repeat: Infinity, delay, ease: "easeOut" }}
                                />
                            ))}
                        </>
                    );
                })()}
            </svg>

            {/* ── Ring depth labels (left side) ── */}
            {(["expert", "proficient", "familiar"] as Ring[]).map(ring => {
                const r = RINGS[ring];
                return (
                    <div key={ring}
                        className="absolute pointer-events-none"
                        style={{
                            left: cx - r * sc - 2,
                            top:  cx - 7,
                            transform: "translateX(-100%)",
                        }}
                    >
                        <span
                            className="text-[8px] font-mono uppercase tracking-widest whitespace-nowrap"
                            style={{ color: GOLD, opacity: 0.45 }}
                        >
                            {ring}
                        </span>
                    </div>
                );
            })}

            {/* ── Skill nodes ── */}
            {skills.map((skill) => {
                const pos      = skillPos(skill);
                const nodeSize = SIZES[skill.ring];
                const color    = categoryColors[skill.category];
                const isHov    = hovered === skill.id;
                const isExpert = skill.ring === "expert";

                const src      = ICON_SRC[skill.id] ?? null;
                // Next.js logo is black — needs a frosted disc behind it
                const needsBg  = NEEDS_LIGHT_BG.has(skill.id);

                // Icon area = 65% of node diameter, centered
                const nodePx   = nodeSize * sc;
                const iconPx   = nodePx * 0.65;
                const iconOff  = (nodePx - iconPx) / 2;

                const ringBaseDelay: Record<Ring, number> = { expert: 0.4, proficient: 0.85, familiar: 1.3 };
                const withinRing = skills.filter(s => s.ring === skill.ring);
                const withinIdx  = withinRing.indexOf(skill);
                const nodeDelay  = ringBaseDelay[skill.ring] + (withinIdx / Math.max(withinRing.length - 1, 1)) * 0.25;

                return (
                    <motion.div
                        key={skill.id}
                        className="absolute cursor-pointer"
                        style={{
                            left:      pos.x * sc,
                            top:       pos.y * sc,
                            transform: "translate(-50%, -50%)",
                            zIndex:    isHov ? 50 : 10,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: nodeDelay, type: "spring", stiffness: 280, damping: 18 }}
                        onHoverStart={() => setHovered(skill.id)}
                        onHoverEnd={() => setHovered(null)}
                    >
                        {/* Expert halo ring */}
                        {isExpert && (
                            <div
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width:  nodePx * 1.7,
                                    height: nodePx * 1.7,
                                    left:   -nodePx * 0.35,
                                    top:    -nodePx * 0.35,
                                    border: `1px solid ${color}35`,
                                    background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
                                }}
                            />
                        )}

                        {/* Main circle */}
                        <motion.div
                            className="rounded-full relative overflow-hidden"
                            style={{
                                width:           nodePx,
                                height:          nodePx,
                                borderWidth:     isExpert ? 1.5 : 1,
                                borderStyle:     "solid",
                                borderColor:     isHov ? color : `${color}70`,
                                backgroundColor: isHov
                                    ? `${color}28`
                                    : isExpert
                                        ? `${color}18`
                                        : `${color}0e`,
                                boxShadow: isHov
                                    ? `0 0 20px ${color}70, 0 0 40px ${color}30`
                                    : isExpert
                                        ? `0 0 12px ${color}35`
                                        : `0 0 6px ${color}15`,
                            }}
                            animate={{ scale: isHov ? 1.2 : 1 }}
                            transition={{ duration: 0.15 }}
                        >
                            {/* Official logo */}
                            {src && (
                                <div
                                    className="absolute pointer-events-none flex items-center justify-center"
                                    style={{
                                        left:            iconOff,
                                        top:             iconOff,
                                        width:           iconPx,
                                        height:          iconPx,
                                        borderRadius:    needsBg ? "50%" : undefined,
                                        backgroundColor: needsBg ? "rgba(255,255,255,0.88)" : undefined,
                                        padding:         needsBg ? iconPx * 0.1 : undefined,
                                        opacity:         isHov ? 1 : isExpert ? 0.9 : 0.75,
                                        transition:      "opacity 0.15s",
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt={skill.name}
                                        width={iconPx}
                                        height={iconPx}
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            )}
                            {/* WebSockets has no official logo — show styled WS badge */}
                            {!src && (
                                <div
                                    className="absolute pointer-events-none flex items-center justify-center"
                                    style={{
                                        left: iconOff, top: iconOff,
                                        width: iconPx, height: iconPx,
                                        opacity: isHov ? 1 : 0.75,
                                    }}
                                >
                                    <span style={{
                                        fontSize: iconPx * 0.38,
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        color,
                                        letterSpacing: "-0.04em",
                                    }}>WS</span>
                                </div>
                            )}
                        </motion.div>

                        {/* Name label — only on hover */}
                        <AnimatePresence>
                            {isHov && (
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                                    style={{ top: nodePx * 0.5 + 5 }}
                                    initial={{ opacity: 0, y: -2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <span
                                        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded"
                                        style={{
                                            color,
                                            background: "rgba(9,14,24,0.85)",
                                            border: `1px solid ${color}30`,
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}

            {/* ── Centre node — lotus-inspired with gradient text ── */}
            <motion.div
                className="absolute flex items-center justify-center cursor-default"
                style={{
                    width:        72 * sc,
                    height:       72 * sc,
                    left:         cx - 36 * sc,
                    top:          cx - 36 * sc,
                    borderRadius: "50%",
                    background:   "url(#mg-centerFill)",
                    backgroundColor: "rgba(9,14,24,0.5)",
                    border:       `1.5px solid ${GOLD}55`,
                    outline:      `3px solid rgba(20,184,166,0.10)`,
                    outlineOffset: "3px",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale:     1,
                    opacity:   1,
                    boxShadow: [
                        `0 0 18px rgba(20,184,166,0.15), 0 0 36px ${GOLD}18`,
                        `0 0 42px rgba(20,184,166,0.38), 0 0 64px ${GOLD}38`,
                        `0 0 18px rgba(20,184,166,0.15), 0 0 36px ${GOLD}18`,
                    ],
                }}
                transition={{
                    scale:     { delay: 1.65, type: "spring", stiffness: 320, damping: 18 },
                    opacity:   { delay: 1.65, duration: 0.3 },
                    boxShadow: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 },
                }}
            >
                <span
                    className="font-bold font-mono tracking-tight"
                    style={{
                        fontSize: 19 * sc,
                        background: `linear-gradient(135deg, ${GOLD} 0%, #2dd4bf 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor:  "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 8px rgba(212,169,66,0.4))",
                    }}
                >
                    VG
                </span>
            </motion.div>

            {/* ── Root-level tooltip ── */}
            <AnimatePresence>
                {hoveredSkill && (() => {
                    const pos      = skillPos(hoveredSkill);
                    const nodeSize = SIZES[hoveredSkill.ring];
                    const color    = categoryColors[hoveredSkill.category];
                    // FIX: correct SVG→div coordinate mapping
                    const screenX  = pos.x * sc;
                    const screenY  = pos.y * sc;
                    const above    = pos.y > CX;
                    return (
                        <motion.div
                            key={hoveredSkill.id + "-tip"}
                            initial={{ opacity: 0, scale: 0.92, y: above ? 4 : -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.12 }}
                            className="absolute pointer-events-none"
                            style={{
                                left:      screenX,
                                top:       above
                                    ? screenY - nodeSize * sc / 2 - 10
                                    : screenY + nodeSize * sc / 2 + 10,
                                transform: above ? "translate(-50%, -100%)" : "translate(-50%, 0)",
                                minWidth:  160,
                                zIndex:    100,
                            }}
                        >
                            <div
                                className="rounded-lg border p-2.5 text-left backdrop-blur-sm"
                                style={{
                                    backgroundColor: "rgba(9,14,24,0.96)",
                                    borderColor:     `${color}28`,
                                    boxShadow:       `0 8px 32px ${color}1a, 0 0 0 1px ${GOLD}12`,
                                }}
                            >
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <span
                                        className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                                        style={{ backgroundColor: `${color}18`, color }}
                                    >
                                        {categoryLabels[hoveredSkill.category]}
                                    </span>
                                    <span
                                        className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                                        style={{ backgroundColor: `${GOLD}12`, color: GOLD, opacity: 0.85 }}
                                    >
                                        {hoveredSkill.ring}
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-relaxed">
                                    {hoveredSkill.detail}
                                </p>
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
        </div>
    );
}
