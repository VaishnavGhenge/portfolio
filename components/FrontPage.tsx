import SocialLinks, { EMAIL } from "./SocialLinks";

const roles = [
    { role: "Software Developer",        from: "Sep 2024", to: "Present"  },
    { role: "Software Developer Intern", from: "Aug 2023", to: "Sep 2024" },
];

const stack = ["Python", "Django", "Angular", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker", "WebRTC"];

const numbers = [
    { figure: "3 yrs", label: "building production systems" },
    { figure: "30%",   label: "fewer revenue failures after the billing rebuild" },
    { figure: "25%",   label: "more accurate weather data after the provider migration" },
    { figure: "45%",   label: "faster CI/CD builds after moving to uv" },
];

const inside = [
    { href: "#features", page: "A2", text: "Three side projects: bookable video calls, systemd, a Django profiler" },
    { href: "#markets",  page: "B1", text: "Tech holdings, from core stack to watchlist" },
    { href: "#opinion",  page: "C1", text: "Recent writing on Django" },
    { href: "#comics", page: "D1", text: "Comics: The Night Shift" },
    { href: "#classifieds", page: "D2", text: "Situation wanted" },
];

const code = "rounded bg-stone-900/5 px-1 py-0.5 font-mono text-[0.85em] text-amber-800";

export default function FrontPage() {
    return (
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
            {/* Lead story */}
            <article className="lg:col-span-8 lg:pr-8">
                <p className="rubric text-amber-800">Profile · Noovosoft Technologies</p>

                <h2 className="mt-3 font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl">
                    Recurring billing engine cuts revenue failures by 30%
                </h2>

                <p className="mt-4 text-lg leading-snug text-stone-700 sm:text-xl">
                    Vaishnav Ghenge has spent three years on production backends at{" "}
                    <a href="https://www.noovosoft.com/" target="_blank" rel="noreferrer" className="ink-link">
                        Noovosoft Technologies
                    </a>
                    : billing engines, real-time data pipelines and WebRTC video infrastructure.
                    He is open to new roles.
                </p>

                {/* Small screens: the numbers sit under the deck instead of below the whole story. */}
                <dl className="mt-6 grid grid-cols-2 border-y-2 border-stone-900 lg:hidden">
                    {numbers.map((n, i) => (
                        <div key={n.figure} className={`py-3 ${i % 2 ? "border-l border-stone-300 pl-4" : "pr-4"} ${i > 1 ? "border-t border-stone-300" : ""}`}>
                            <dt className="font-serif text-2xl font-bold text-stone-900">{n.figure}</dt>
                            <dd className="mt-0.5 text-xs leading-snug text-stone-700">{n.label}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 gap-8 text-[15px] leading-relaxed text-stone-700 sm:columns-2 [&>p+p]:mt-4">
                    <p className="dropcap">
                        Ghenge architected the recurring billing engine behind Farmdesk&apos;s SaaS
                        subscriptions, built on Mollie with retry logic for failed charges. Revenue
                        failures fell by about 30%.
                    </p>
                    <p>
                        He led the migration of the product&apos;s weather data from DTN to
                        OpenMeteo, which improved data accuracy by 25%, and resolved critical race
                        conditions in integrations with government animal databases.
                    </p>
                    <p>
                        Moving the Python CI/CD pipelines to <code className={code}>uv</code> cut
                        build times by 45%.
                    </p>
                    <p>
                        He cares about correctness, reliability and code that doesn&apos;t need a
                        40-minute explanation. Outside work he builds open-source tools (page A2)
                        and writes about Django (page C1).
                    </p>
                </div>

                <table className="mt-8 w-full border-t border-stone-900 text-sm">
                    <caption className="sr-only">Roles at Noovosoft Technologies</caption>
                    <tbody>
                        {roles.map((r) => (
                            <tr key={r.role} className="border-b border-stone-200">
                                <th scope="row" className="py-2 text-left font-normal text-stone-800">{r.role}</th>
                                <td className="py-2 text-right font-mono text-[11px] text-stone-600">
                                    {r.from} to {r.to}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack at Noovosoft">
                    {stack.map((s) => (
                        <li key={s} className="tag">{s}</li>
                    ))}
                </ul>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:col-span-4 lg:border-l lg:border-stone-900 lg:pl-8">
                <section aria-labelledby="numbers-heading" className="hidden border-2 border-stone-900 bg-white p-5 lg:block">
                    <h3 id="numbers-heading" className="rubric border-b border-stone-900 pb-2 text-stone-900">
                        By the numbers
                    </h3>
                    <dl className="divide-y divide-stone-200">
                        {numbers.map((n) => (
                            <div key={n.figure} className="flex items-baseline gap-4 py-3">
                                <dt className="w-20 shrink-0 font-serif text-3xl font-bold text-stone-900">{n.figure}</dt>
                                <dd className="text-sm leading-snug text-stone-700">{n.label}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section aria-labelledby="contact-heading">
                    <h3 id="contact-heading" className="rubric border-b border-stone-900 pb-2 text-stone-900">
                        Contact desk
                    </h3>
                    <p className="mt-3 flex items-center gap-2 text-sm text-stone-700">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
                        </span>
                        Open to work
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <a
                            href={`mailto:${EMAIL}`}
                            className="inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-stone-50 transition-colors hover:border-amber-800 hover:bg-amber-800"
                        >
                            Get in touch
                        </a>
                        <SocialLinks />
                    </div>
                </section>

                <section aria-labelledby="profile-heading">
                    <h3 id="profile-heading" className="rubric border-b border-stone-900 pb-2 text-stone-900">
                        Profile
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-700">
                        Began a Diploma in Computer Engineering in 2018, when curiosity felt sufficient
                        and a full degree felt optional. Got the B.E. anyway in 2024 (CGPA 8.88), but
                        the real education happened between commits. Off the clock: cricket, and
                        reading about things he probably can&apos;t use at work yet.
                    </p>
                </section>

                <nav aria-labelledby="inside-heading">
                    <h3 id="inside-heading" className="rubric border-b border-stone-900 pb-2 text-stone-900">
                        Inside this issue
                    </h3>
                    <ul className="divide-y divide-stone-200">
                        {inside.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} className="group flex items-baseline gap-3 py-2.5 text-sm text-stone-700">
                                    <span className="rubric w-6 shrink-0 text-amber-800">{item.page}</span>
                                    <span className="group-hover:text-amber-800 group-hover:underline">{item.text}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
