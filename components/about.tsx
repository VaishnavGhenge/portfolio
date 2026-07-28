export default function About() {
    return (
        <div className="space-y-4 text-[15px] leading-relaxed text-stone-600">
            <p className="dropcap">
                Started in 2018 with a Diploma in Computer Engineering — when curiosity felt sufficient and a full degree felt optional. Got the B.E. anyway in 2024 (CGPA 8.88), but the real education happened between commits.
            </p>
            <p>
                Since 2023 I&apos;ve been building at{' '}
                <a href="https://www.noovosoft.com/" target="_blank" rel="noreferrer" className="text-stone-900 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-800 hover:decoration-amber-800">
                    Noovosoft Technologies
                </a>
                {' '}— first as an intern, now full-time. I shipped a recurring billing engine that cut revenue failures by 30%, migrated a weather data provider improving accuracy by 25%, and slashed CI/CD build times by 45% by adopting <code className="rounded bg-stone-900/5 px-1 py-0.5 font-mono text-[12px] text-amber-800">uv</code> across our Python pipelines.
            </p>
            <p>
                Outside work I built <a href="https://vartalaap.vaishnavghenge.com/" target="_blank" rel="noreferrer" className="text-stone-900 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-800 hover:decoration-amber-800">Vartalaap</a> (a P2P video call app with HD video, background blur, and noise cancellation), <a href="https://github.com/VaishnavGhenge/servio" target="_blank" rel="noreferrer" className="text-stone-900 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-800 hover:decoration-amber-800">Servio</a> (a Go-based Linux service manager), and <a href="https://pypi.org/project/django-silky/" target="_blank" rel="noreferrer" className="text-stone-900 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-800 hover:decoration-amber-800">django-silky</a> — a production-quality fork of django-silk with dark mode, D3 analytics dashboards, and N+1 query detection.
            </p>
            <p>
                I care about distributed systems that hold up under pressure, open source tools developers actually reach for, and code that doesn&apos;t need a 40-minute explanation. When I&apos;m not shipping, I&apos;m playing cricket or reading about something I probably can&apos;t use at work yet.
            </p>
        </div>
    );
}
