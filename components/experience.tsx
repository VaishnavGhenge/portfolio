import { IExperience } from "@/types";
import ClientTiltCard from "./ClientTiltCard";

export default function Experience() {
    const expreriences: IExperience[] = [

        {
            company: "Noovosoft Technologies LLP",
            roles: [
                {
                    from: "Sep 2024",
                    to: "Present",
                    role: "Software Developer",
                },
                {
                    from: "Aug 2023",
                    to: "Sep 2024",
                    role: "Software Developer Intern",
                }
            ],
            description:
                "Architected the recurring billing engine for Farmdesk SaaS, boosting revenue reliability by ~30% via robust retry logic and Mollie integration. Led the migration from DTN to OpenMeteo, improving data accuracy by 25%. Optimized CI/CD pipelines with `uv` to cut build times by 45% and resolved critical race conditions in government animal database integrations.",
            skills: ["Python", "Django", "Angular", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker", "WebRTC"],
        },
    ];

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-4'>Experience</h2>
            <div className='group/list'>
                <ol>
                    {expreriences.map((experience) => (
                        <li key={experience.company} className='mb-8'>
                            <ClientTiltCard>
                                <div
                                    className='group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                                    <div
                                        className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                    <div className='z-10 relative cursor-default p-4 lg:p-0'>
                                        <h3 className='text-md leading-snug mb-4 font-medium text-slate-200'>
                                            {experience.company}
                                        </h3>
                                        {experience.roles.map((role) => (
                                            <div key={role.role} className="mb-4">
                                                <h3 className="text-md font-medium text-slate-200 group-hover:text-teal-300 transition-colors">{role.role}</h3>
                                                <p className='text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1'>
                                                    {role.from} — {role.to}
                                                </p>
                                            </div>

                                        ))}
                                        <p className='mt-2 text-sm leading-normal text-slate-400'>
                                            {experience.description}
                                        </p>
                                        <div className='mt-2 flex flex-wrap'>
                                            {experience.skills.map((skill) => (
                                                <div
                                                    key={skill}
                                                    className='mr-1.5 mt-2'
                                                >
                                                    <div
                                                        className='flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300'>
                                                        {skill}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ClientTiltCard>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
