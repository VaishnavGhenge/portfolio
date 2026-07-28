import { IExperience } from "@/types";

const code = "rounded bg-stone-900/5 px-1 py-0.5 font-mono text-[12px] text-amber-800";

export default function Experience() {
    const experiences: IExperience[] = [
        {
            company: "Noovosoft Technologies LLP",
            companyUrl: "https://www.noovosoft.com/",
            roles: [
                { from: "Sep 2024", to: "Present",  role: "Software Developer"        },
                { from: "Aug 2023", to: "Sep 2024", role: "Software Developer Intern" },
            ],
            description: (
                <>
                    Architected the recurring billing engine for Farmdesk SaaS, boosting revenue
                    reliability by ~30% via robust retry logic and Mollie integration. Led the
                    migration from DTN to OpenMeteo, improving data accuracy by 25%. Optimized
                    CI/CD pipelines with <code className={code}>uv</code> to cut build times by 45%
                    and resolved critical race conditions in government animal database
                    integrations.
                </>
            ),
            skills: ["Python", "Django", "Angular", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker", "WebRTC"],
        },
    ];

    return (
        <ol className="space-y-10">
            {experiences.map((experience) => (
                <li key={experience.company} className="border-l-2 border-stone-900 pl-5">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                        {experience.companyUrl ? (
                            <a
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-stone-300 underline-offset-4 transition-colors hover:text-amber-800 hover:decoration-amber-800"
                            >
                                {experience.company}
                            </a>
                        ) : (
                            experience.company
                        )}
                    </h3>

                    <div className="mt-3 space-y-1.5">
                        {experience.roles.map((role) => (
                            <div key={role.role} className="flex items-baseline gap-3">
                                <span className="text-sm text-stone-700">{role.role}</span>
                                <span className="h-px flex-1 bg-stone-200" />
                                <span className="shrink-0 font-mono text-[11px] text-stone-400">
                                    {role.from} — {role.to}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
                        {experience.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {experience.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-sm border border-stone-300 bg-white px-2 py-0.5 font-mono text-[11px] text-stone-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </li>
            ))}
        </ol>
    );
}
