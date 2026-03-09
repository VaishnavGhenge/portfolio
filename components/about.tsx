export default function About() {
    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-8 tracking-widest text-slate-200'>About</h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                    Started in 2018 with a Diploma in Computer Engineering — when curiosity felt sufficient and a full degree felt optional. Got the B.E. anyway in 2024 (CGPA 8.88), but the real education happened between commits.
                </p>
                <p>
                    Since 2023 I&apos;ve been building at{' '}
                    <a href="https://www.noovosoft.com/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors">
                        Noovosoft Technologies
                    </a>
                    {' '}— first as an intern, now full-time. I shipped a recurring billing engine that cut revenue failures by 30%, migrated a weather data provider improving accuracy by 25%, and slashed CI/CD build times by 45% by adopting <code className="text-teal-400/80 text-sm bg-slate-800/60 px-1 rounded">uv</code> across our Python pipelines.
                </p>
                <p>
                    Outside work I built <a href="https://vartalaap.vaishnavghenge.com/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors">Vartalaap</a> (a WebRTC SFU video platform with real-time AI captions), <a href="https://github.com/VaishnavGhenge/servio" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors">Servio</a> (a Go-based Linux service manager), and <a href="https://github.com/VaishnavGhenge/django-silky" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors">django-silky</a> — a production-quality fork of django-silk with dark mode, D3 analytics dashboards, and N+1 query detection, built in a single day.
                </p>
                <p>
                    I care about distributed systems that hold up under pressure, open source tools developers actually reach for, and code that doesn&apos;t need a 40-minute explanation. When I&apos;m not shipping, I&apos;m playing cricket or reading about something I probably can&apos;t use at work yet.
                </p>
            </div>
        </div>
    )
}
