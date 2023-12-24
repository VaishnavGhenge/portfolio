export default function Projects() {
    const projects = [
        {
            title: "Vartalaap",
            url: "https://vartalaap-client.vercel.app/",
            titleExplaination: "Video calling app with reltime captions",
            description:
                "Vartalaap is a video calling app like Google meet which provides real-time video calling service as well as real-time captions for users",
            tech: [
                "NextJS",
                "Django",
                "WebRTC",
                "WebSocket",
                "React",
                "TypeScript",
                "Python",
                "PostgreSQL",
            ],
        },
        {
            title: "Quiz App",
            url: "https://github.com/VaishnavGhenge/quizapp",
            description:
                "Quiz app is a web application which provides a platform to create and play quizzes",
            tech: [
                "NextJS",
                "Django",
                "React",
                "TypeScript",
                "Python",
                "MongoDB",
            ],
        },
    ];

    const projectListTSX = projects.map((project, index) => {
        const skillsListTSX = project.tech.map((skill) => (
            <div key={`${skill}-${index}`} className='mr-1.5 mt-2'>
                <div className='flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300'>
                    {skill}
                </div>
            </div>
        ));

        return (
            <li key={project.title} className='mb-8'>
                <div className='mt-2'>
                    <a
                        href={project.url}
                        className='text-lg leading-snug font-medium hover:text-white hover:underline'
                        target="_blank"
                    >
                        {project.title}
                    </a>
                    {project.titleExplaination && (
                        <p className='text-sm text-slate-400'>
                            {project.titleExplaination}
                        </p>
                    )}
                </div>
                <p className='mt-2 text-sm'>{project.description}</p>
                <div className='mt-2 flex flex-wrap'>{skillsListTSX}</div>
            </li>
        );
    });

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-4'>Projects</h2>
            <div>
                <ol>{projectListTSX}</ol>
            </div>
        </div>
    );
}
