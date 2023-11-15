export default function Experience() {
    const expreriences = [
        {
            company: "Noovosoft Technologies",
            from: "Aug 2023",
            to: "Present",
            role: "Application Developer Intern",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            skills: ["Angular", "Django", "TypeScript", "JavaScript", "Python"],
        },
    ];

    return (
        <div className="mb-16">
            <h2 className="text-lg font-bold uppercase mb-4">Experience</h2>
            <div className="group/list">
                <ol>
                    {expreriences.map((experience) => (
                        <li key={experience.company} className='mb-8'>
                            <div className="group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                {/* <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-700/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div> */}
                                <div className="z-10 relative">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-lg leading-snug font-medium hover:text-white">
                                                {experience.role}
                                            </h3>
                                            <p className="text-sm text-slate-400">
                                                {experience.company}
                                            </p>
                                        </div>
                                        <div className="text-sm">
                                            <p className='uppercase'>
                                                {experience.from} -{" "}
                                                {experience.to}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm">
                                        {experience.description}
                                    </p>
                                    <div className="mt-2 flex flex-wrap">
                                        {experience.skills.map((skill) => (
                                            <div
                                                key={skill}
                                                className="mr-1.5 mt-2"
                                            >
                                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
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
