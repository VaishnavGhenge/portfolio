export default function Projects() {
    const projects = [
        {
            title: "Vartalaap",
            url: "https://vartalaap.vaishnavghenge.com/",
            titleExplaination: "Video calling app with real-time captions",
            description:
                "Vartalaap is a real-time video calling application designed to enhance communication by providing live captions during calls. Inspired by platforms like Google Meet, it enables seamless video conferencing while transcribing conversations in real-time, making it especially useful for accessibility and clarity. The platform leverages WebRTC for video streaming and WebSockets for real-time communication, ensuring a smooth and interactive user experience.",
            tech: [
                "NextJS",
                "Django",
                "WebRTC",
                "WebSocket",
                "React",
                "TypeScript",
                "Python",
                "PostgresSQL",
            ],
        },
        {
            title: "Quiz App",
            url: "https://quizapp-vaishnavghenge.vercel.app/",
            description:
                "The Quiz App is a dynamic web application that allows users to create, manage, and play quizzes. It provides an intuitive platform for educators, trainers, and students to design interactive quizzes with multiple question formats. The app ensures a smooth and engaging user experience, featuring result tracking, and a responsive design. Users can participate in quizzes, and view scores making learning more interactive and fun.",
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
                <div
                    className='flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300'>
                    {skill}
                </div>
            </div>
        ));

        return (
            <li key={project.title} className='mb-8'>
                <div className='group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                    <div
                        className="absolute -inset-2 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-700/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className='z-10 relative cursor-default'>
                        <div className='mt-2'>
                            <a
                                href={project.url}
                                className='text-lg leading-snug font-medium hover:text-white hover:underline'
                                target="_blank"
                            >
                                {project.title}
                            </a>
                            {project.titleExplaination && (
                                <p className='text-sm intermediate-text'>
                                    {project.titleExplaination}
                                </p>
                            )}
                        </div>
                        <p className='mt-2 text-sm sub-text'>{project.description}</p>
                        <div className='mt-2 flex flex-wrap'>{skillsListTSX}</div>
                    </div>
                </div>
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
