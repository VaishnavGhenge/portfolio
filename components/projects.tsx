// ─── Figures ──────────────────────────────────────────────────────────────────
// Ink-on-paper diagrams. Motion is plain CSS (see globals.css) and switches off
// under prefers-reduced-motion.

const INK = "#1c1917";
const RULE = "#a8a29e";
const ACCENT = "#9a3412";

function SessionlyFigure() {
    const steps = [
        { x: 6,   title: "Your hours",  sub: "+ Google Calendar" },
        { x: 116, title: "Client books", sub: "in their timezone" },
        { x: 226, title: "Private room", sub: "via Cloudflare SFU" },
    ];

    return (
        <svg viewBox="0 0 320 110" className="w-full" role="img" aria-labelledby="fig-sessionly">
            <title id="fig-sessionly">
                Booking flow: you set weekly hours synced with Google Calendar, a client books a time in their own timezone, and the booking opens a private video room joined from the browser.
            </title>

            {/* Connectors, with a marker travelling the whole flow */}
            <path d="M94 55 H116 M204 55 H226" stroke={INK} strokeWidth="1.2" />
            <path d="M110 51 L116 55 L110 59 M220 51 L226 55 L220 59" fill="none" stroke={INK} strokeWidth="1.2" />
            <circle cx="50" cy="86" r="2.8" fill={ACCENT} className="fig-flow" />
            <line x1="50" y1="86" x2="270" y2="86" stroke={RULE} strokeWidth="1" strokeDasharray="2 3" />

            {steps.map((st, i) => (
                <g key={st.title}>
                    <rect x={st.x} y="30" width="88" height="50" fill="#fff" stroke={INK} strokeWidth={i === 2 ? 2 : 1.3} />
                    <text x={st.x + 44} y="50" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill={INK}>{st.title}</text>
                    <text x={st.x + 44} y="64" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#57534e">{st.sub}</text>
                    <text x={st.x + 44} y="22" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={ACCENT}>{i + 1}</text>
                </g>
            ))}
        </svg>
    );
}

function ServioFigure() {
    return (
        <div className="px-4 py-3 font-mono text-[11px] leading-relaxed text-stone-800" role="img" aria-label="Servio status output: api-gateway service active and streaming logs from journald, with live CPU and memory meters.">
            <p className="text-stone-600">$ servio status api-gateway</p>
            <p className="mt-1"><span className="text-amber-800">●</span> api-gateway.service</p>
            <p className="pl-3">Active: <span className="font-medium">active (running)</span></p>
            <p className="pl-3">D-Bus:&nbsp; connected to systemd</p>
            <p className="pl-3">Logs:&nbsp;&nbsp; streaming from journald <span className="fig-blink">▋</span></p>

            <div className="mt-3 space-y-1.5 border-t border-stone-300 pt-2.5">
                {[{ label: "CPU", cls: "fig-cpu" }, { label: "MEM", cls: "fig-mem" }].map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                        <span className="w-7 shrink-0 text-stone-600">{m.label}</span>
                        <div className="h-1.5 flex-1 bg-stone-200">
                            <div className={`h-full bg-stone-800 ${m.cls}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SilkyFigure() {
    const requests = [
        { path: "/api/users/", ms: 240, slow: true  },
        { path: "/api/posts/", ms: 38,  slow: false },
        { path: "/api/tags/",  ms: 12,  slow: false },
    ];
    const flame = [
        { label: "ORM", share: 45, hatch: false },
        { label: "N+1", share: 30, hatch: true  },
        { label: "Ser", share: 13, hatch: false },
        { label: "Net", share: 12, hatch: false },
    ];

    return (
        <div className="px-4 py-3 font-mono text-[11px] text-stone-800" role="img" aria-label="django-silky request timings: /api/users/ takes 240 ms, 30% of it in an N+1 query pattern.">
            <div className="space-y-1.5">
                {requests.map((r) => (
                    <div key={r.path} className="flex items-center gap-2">
                        <span className="w-[78px] shrink-0 text-stone-600">{r.path}</span>
                        <div className="h-1.5 flex-1 bg-stone-200">
                            <div className={`h-full ${r.slow ? "bg-amber-800" : "bg-stone-800"}`} style={{ width: `${(r.ms / 280) * 100}%` }} />
                        </div>
                        <span className="w-11 shrink-0 text-right">{r.ms}ms</span>
                    </div>
                ))}
            </div>

            <p className="mt-3 text-[10px] text-stone-600">flame · /api/users/</p>
            <div className="mt-1 flex h-4 gap-px border border-stone-800">
                {flame.map((f) => (
                    <div
                        key={f.label}
                        className={`flex items-center justify-center text-[9px] ${f.hatch ? "text-amber-900" : "bg-stone-100 text-stone-700"}`}
                        style={{
                            flexBasis: `${f.share}%`,
                            backgroundImage: f.hatch ? "repeating-linear-gradient(135deg, rgba(154,52,18,0.22) 0 2px, transparent 2px 5px)" : undefined,
                        }}
                    >
                        {f.label}
                    </div>
                ))}
            </div>

            <p className="mt-2.5 inline-block border border-amber-800 px-1.5 py-0.5 text-[10px] text-amber-900">
                N+1 detected · /api/users/
            </p>
        </div>
    );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const stories = [
    {
        name: "Sessionly",
        formerly: "Vartalaap",
        url: "https://getsessionly.com/",
        linkLabel: "Open beta",
        headline: "A booking page with the video call built in",
        body:
            "Sessionly puts scheduling and the call behind one link. You set weekly hours and sync Google Calendar; clients pick a time in their own timezone and get a private video room for that booking, joined from the browser. Media runs through Cloudflare acting as an SFU rather than peer to peer. No separate video app, no client account.",
        figure: <SessionlyFigure />,
        caption: "One link covers the booking and the call.",
        question: "Why build the call into the booking page?",
        answer:
            "Every extra app or sign-up is a chance for a client not to show. Booking a time should be the only step; the room comes with it.",
        tech: ["WebRTC", "Cloudflare", "SFU", "Google Calendar"],
    },
    {
        name: "Servio",
        url: "https://github.com/VaishnavGhenge/servio",
        linkLabel: "Source on GitHub",
        headline: "Systemd gets a dashboard: start, stop, tail logs, deploy on push",
        body:
            "A web GUI for Linux servers that talks to systemd over D-Bus: start and stop services, follow journald logs live, edit environment variables. A Git-integrated pipeline rebuilds and reloads a service on every push.",
        figure: <ServioFigure />,
        caption: "Service state and logs come straight from systemd over D-Bus.",
        question: "Why Go over Node.js or Python?",
        answer:
            "Direct D-Bus bindings for systemd, and goroutines to stream logs from many services at once, shipped as a single binary with no runtime to install.",
        tech: ["Go", "systemd", "D-Bus", "WebSockets", "React", "SQLite"],
    },
    {
        name: "django-silky",
        url: "https://pypi.org/project/django-silky/",
        linkLabel: "On PyPI",
        headline: "Profiler fork ships dark mode, D3 charts and N+1 detection",
        body:
            "A modernized fork of the django-silk profiler: persistent dark and light themes, an inline filter bar, D3 analytics dashboards, N+1 query detection with endpoint attribution, and self-hosted icons with no CDN calls. A drop-in replacement with no new migrations.",
        figure: <SilkyFigure />,
        caption: "The slow endpoint, and the N+1 pattern inside it, flagged per request.",
        question: "Why fork instead of contributing upstream?",
        answer:
            "Theming, D3 analytics and self-hosted assets meant architectural rewrites, not patches. Upstream review would have taken weeks; the fork shipped in a day.",
        tech: ["Python", "Django", "D3.js", "CSS custom properties", "PostgreSQL"],
    },
];

export default function Projects() {
    return (
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-stone-300">
            {stories.map((s, i) => (
                <article key={s.name} className="flex flex-col lg:px-6 lg:first:pl-0 lg:last:pr-0">
                    <p className="rubric text-amber-800">
                        {s.name}
                        {s.formerly && <span className="text-stone-600"> · formerly {s.formerly}</span>}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-stone-900">
                        <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-amber-800">
                            {s.headline}
                        </a>
                    </h3>

                    <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{s.body}</p>

                    <figure className="mt-5 border border-stone-900 bg-white">
                        <div className="flex min-h-[140px] items-center">{s.figure}</div>
                        <figcaption className="border-t border-stone-300 px-3 py-2 text-xs leading-snug text-stone-700">
                            <span className="rubric text-stone-900">Fig. {i + 1}</span>{" "}
                            {s.caption}
                        </figcaption>
                    </figure>

                    <blockquote className="mt-5 border-l-2 border-amber-800 pl-4">
                        <p className="font-serif text-base font-bold text-stone-900">{s.question}</p>
                        <p className="mt-1 text-sm leading-relaxed text-stone-700">{s.answer}</p>
                    </blockquote>

                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.name} stack`}>
                        {s.tech.map((t) => (
                            <li key={t} className="tag">{t}</li>
                        ))}
                    </ul>

                    <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rubric mt-auto inline-flex self-start pt-5 text-stone-900 underline decoration-stone-400 underline-offset-4 hover:text-amber-800 hover:decoration-amber-800"
                    >
                        {s.linkLabel} ↗
                    </a>
                </article>
            ))}
        </div>
    );
}
