import { IExperience } from "@/types";

export default function Experience() {
    const experiences: IExperience[] = [
        {
            company: "Noovosoft Technologies LLP",
            roles: [
                { from: "Sep 2024", to: "Present",  role: "Software Developer"        },
                { from: "Aug 2023", to: "Sep 2024", role: "Software Developer Intern" },
            ],
            description:
                "Architected the recurring billing engine for Farmdesk SaaS, boosting revenue reliability by ~30% via robust retry logic and Mollie integration. Led the migration from DTN to OpenMeteo, improving data accuracy by 25%. Optimized CI/CD pipelines with `uv` to cut build times by 45% and resolved critical race conditions in government animal database integrations.",
            skills: ["Python", "Django", "Angular", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker", "WebRTC"],
        },
    ];

    return (
        <div className="mb-16">
            <h2 className="font-serif text-lg font-bold uppercase mb-6 tracking-widest text-stone-900">Experience</h2>
            <ol className="space-y-10">
                {experiences.map((experience) => (
                    <li key={experience.company}>
                        <h3 className="font-semibold text-stone-900 mb-3">{experience.company}</h3>
                        <div className="space-y-1.5 mb-4">
                            {experience.roles.map((role) => (
                                <div key={role.role} className="flex items-baseline justify-between">
                                    <span className="text-sm text-stone-700">{role.role}</span>
                                    <span className="text-xs text-stone-400 font-mono shrink-0 ml-4">{role.from} — {role.to}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm leading-relaxed text-stone-600 mb-4">
                            {experience.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {experience.skills.map((skill) => (
                                <span key={skill} className="border border-stone-300 rounded px-2.5 py-0.5 text-xs text-stone-600 bg-white">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
