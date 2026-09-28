type Position = "core" | "held" | "watch";

interface Holding { name: string; sector: string; position: Position; yrs?: string; notes: string; }

const positionLabel: Record<Position, string> = { core: "Core", held: "Held", watch: "Watchlist" };
const positionLevel: Record<Position, number> = { core: 3, held: 2, watch: 1 };

// Ordered by position, then roughly by how much of the day job each one is.
const holdings: Holding[] = [
    { name: "Python",       sector: "Language", position: "core",  yrs: "5+", notes: "Django, FastAPI, Celery, scripting" },
    { name: "Django",       sector: "Backend",  position: "core",  yrs: "3+", notes: "REST, WebSockets, ORM, admin" },
    { name: "PostgreSQL",   sector: "Infra",    position: "core",  yrs: "3+", notes: "Query plans, indexing, joins" },
    { name: "TypeScript",   sector: "Frontend", position: "core",  yrs: "3+", notes: "React, Next.js, Angular, Node.js" },
    { name: "React",        sector: "Frontend", position: "core",  yrs: "3+", notes: "Next.js, RSC" },
    { name: "WebRTC",       sector: "Systems",  position: "core",  yrs: "2",  notes: "P2P, signaling, ICE, MediaPipe" },
    { name: "Docker",       sector: "Infra",    position: "held",  yrs: "3+", notes: "Compose, multi-stage builds" },
    { name: "Celery",       sector: "Backend",  position: "held",             notes: "Task queues, beat scheduler, retries" },
    { name: "Redis",        sector: "Infra",    position: "held",  yrs: "2+", notes: "Pub/Sub, caching, sessions" },
    { name: "Angular",      sector: "Frontend", position: "held",  yrs: "2+", notes: "RxJS, signals, standalone" },
    { name: "Next.js",      sector: "Frontend", position: "held",  yrs: "2+", notes: "RSC, SSR, App Router" },
    { name: "Go",           sector: "Language", position: "held",  yrs: "1+", notes: "Goroutines, stdlib, D-Bus" },
    { name: "FastAPI",      sector: "Backend",  position: "held",             notes: "Async, Pydantic v2, OpenAPI" },
    { name: "AWS",          sector: "Infra",    position: "held",             notes: "EC2, S3, VPC, IAM, CloudWatch" },
    { name: "WebSockets",   sector: "Systems",  position: "watch",            notes: "Django Channels, ASGI" },
    { name: "Systemd",      sector: "Systems",  position: "watch",            notes: "Service lifecycle, D-Bus, journald" },
    { name: "Nginx",        sector: "Infra",    position: "watch",            notes: "Reverse proxy, SSL, load balancing" },
    { name: "Kubernetes",   sector: "Infra",    position: "watch",            notes: "Deployments, services, ingress, Helm" },
    { name: "gRPC",         sector: "Backend",  position: "watch",            notes: "Proto3, bidirectional streaming" },
    { name: "GraphQL",      sector: "Backend",  position: "watch",            notes: "Queries, mutations, subscriptions" },
    { name: "D3.js",        sector: "Frontend", position: "watch",            notes: "Custom analytics dashboards" },
    { name: "React Native", sector: "Frontend", position: "watch",            notes: "Expo SDK 54, MobX, offline-first" },
    { name: "Supabase",     sector: "Infra",    position: "watch",            notes: "Auth, realtime, storage" },
    { name: "Java",         sector: "Language", position: "watch",            notes: "Spring Boot, REST APIs, Maven" },
];

function Meter({ level }: { level: number }) {
    return (
        <span className="inline-flex gap-[2px]" aria-hidden="true">
            {[1, 2, 3].map((n) => (
                <span key={n} className={`h-2 w-1.5 ${n <= level ? "bg-stone-900" : "bg-stone-300"}`} />
            ))}
        </span>
    );
}

function HoldingsTable({ rows, caption }: { rows: Holding[]; caption: string }) {
    return (
        <table className="w-full border-t-2 border-stone-900 text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
                <tr className="rubric border-b border-stone-900 text-left text-stone-700">
                    <th scope="col" className="py-2 pr-3 font-normal">Holding</th>
                    <th scope="col" className="py-2 pr-3 font-normal">Position</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">Yrs</th>
                    <th scope="col" className="hidden py-2 font-normal sm:table-cell">Notes</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((h) => (
                    <tr key={h.name} className="border-b border-stone-200 align-baseline">
                        <th scope="row" className="py-1.5 pr-3 text-left font-medium text-stone-900">
                            {h.name}
                            <span className="ml-1.5 font-mono text-[10px] font-normal text-stone-600">{h.sector}</span>
                        </th>
                        <td className="whitespace-nowrap py-1.5 pr-3 text-stone-700">
                            <Meter level={positionLevel[h.position]} />
                            <span className="ml-2 font-mono text-[11px]">{positionLabel[h.position]}</span>
                        </td>
                        <td className="py-1.5 pr-3 text-right font-mono text-[11px] text-stone-700">{h.yrs ?? "·"}</td>
                        <td className="hidden py-1.5 text-[13px] text-stone-600 sm:table-cell">{h.notes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default function Markets() {
    const half = Math.ceil(holdings.length / 2);

    return (
        <div>
            <p className="mb-5 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Core</span>: daily, in production.{" "}
                <span className="font-medium text-stone-900">Held</span>: shipped with it, comfortable.{" "}
                <span className="font-medium text-stone-900">Watchlist</span>: used on projects, still building depth.
            </p>
            <div className="grid gap-x-10 gap-y-0 lg:grid-cols-2">
                <HoldingsTable rows={holdings.slice(0, half)} caption="Tech holdings, part 1: core and held" />
                <HoldingsTable rows={holdings.slice(half)} caption="Tech holdings, part 2: held and watchlist" />
            </div>
        </div>
    );
}
