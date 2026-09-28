import EmailLink from "./EmailLink";
import { EMAIL, SOCIALS } from "./SocialLinks";

export default function Classifieds() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-stone-900 bg-white p-5 sm:col-span-2">
                <p className="rubric text-amber-800">Situation wanted</p>
                <p className="mt-2 font-serif text-2xl font-bold leading-snug text-stone-900">
                    Building something that needs to hold up under load?
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-700">
                    Backend engineer, three years in production. Python, Django and Go. Billing,
                    real-time data, WebRTC. Open to new roles.
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-stone-700">
                    Reply to <EmailLink email={EMAIL} />
                </p>
            </div>

            <div className="border border-stone-900 p-4">
                <p className="rubric text-stone-900">Free to a good home</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    One Django profiler, dark mode included. No new migrations.
                </p>
                <code className="mt-2 block font-mono text-[12px] text-amber-800">pip install django-silky</code>
            </div>

            <div className="border border-stone-900 p-4">
                <p className="rubric text-stone-900">Also listed at</p>
                <ul className="mt-2 space-y-0.5 text-sm">
                    {SOCIALS.map((s) => (
                        <li key={s.label}>
                            <a href={s.href} target="_blank" rel="noreferrer" className="ink-link inline-block py-0.5">
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
