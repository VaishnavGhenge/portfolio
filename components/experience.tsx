import {IExperience} from "@/types";

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
                "I work as a Full-Stack Developer on farmdesk.eu, a client project undergoing major feature upgrades. My role involves building new features, refining existing functionality, and ensuring seamless development as the platform evolves. I work in a small, focused team, adapting to changing requirements and contributing to scaling and optimizing the system.",
            skills: ["Python", "Django", "Angular", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker"],
        },
    ];

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-4'>Experience</h2>
            <div className='group/list'>
                <ol>
                    {expreriences.map((experience) => (
                        <li key={experience.company} className='mb-8'>
                            <div
                                className='group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                                <div
                                    className="absolute -inset-2 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-700/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                <div className='z-10 relative cursor-default'>
                                    <h3 className='text-md leading-snug mb-4 font-medium'>
                                        {experience.company}
                                    </h3>
                                    {experience.roles.map((role) => (
                                        <div key={role.role} className="mb-4">
                                            <h3 className="text-md font-medium hover:text-white">{role.role}</h3>
                                            <p className='text-xs sub-text'>
                                                {role.from} - {role.to}
                                            </p>
                                        </div>

                                    ))}
                                    <p className='sub-text mt-2 text-sm'>
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
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
