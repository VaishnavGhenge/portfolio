export default function Skills() {
    const skillCategories = [
        {
            title: "Languages",
            skills: ["Python", "TypeScript", "Go (Golang)", "Java", "C++", "SQL (Postgres)", "SystemVerilog", "Bash"]
        },
        {
            title: "Backend & Systems",
            skills: ["Django", "FastAPI", "Express.js", "WebRTC", "WebSocket", "Celery", "SOAP", "REST", "GraphQL", "gRPC"]
        },
        {
            title: "Cloud & Infrastructure",
            skills: ["AWS (EC2, S3)", "Docker", "Kubernetes", "Nginx", "Linux Systemd", "CI/CD (GitHub Actions)", "Redis", "Supabase"]
        },
        {
            title: "Mobile Engineering",
            skills: ["React Native", "Expo SDK 54", "MobX", "Android/iOS Native Modules", "Offline-first Architecture"]
        },
        {
            title: "Frontend Ecosystem",
            skills: ["React", "Next.js", "Angular", "RxJS", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"]
        },
        {
            title: "Architecture & Design",
            skills: ["Distributed Systems", "Microservices", "Event-Driven Architecture", "Database Sharding", "System Design", "Concurrency Control"]
        },
        {
            title: "Developer Tools",
            skills: ["Git", "Jira", "uv (Python)", "Postman", "VS Code", "IntelliJ IDEA", "Vim"]
        }
    ];

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-8 tracking-widest text-slate-200'>Technical Skills</h2>
            <div className='grid gap-8 md:grid-cols-1'>
                {skillCategories.map((category) => (
                    <div key={category.title}>
                        <h3 className='text-sm font-semibold text-slate-400 uppercase mb-3'>{category.title}</h3>
                        <div className='flex flex-wrap gap-2'>
                            {category.skills.map((skill) => (
                                <div
                                    key={skill}
                                    className='flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 hover:bg-teal-400/20 transition-colors cursor-default'
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}