import { EMAIL } from "./HeroContent";
import EmailLink from "./EmailLink";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-24">
            {/* Closing contact block — the page ends on an action, not a copyright line. */}
            <div className="border-y-2 border-stone-900 py-10 text-center">
                <p className="rubric text-stone-400">Currently open to work</p>
                <p className="mx-auto mt-3 max-w-md font-serif text-2xl font-bold leading-snug text-stone-900">
                    Building something that needs to hold up under load?
                </p>
                <EmailLink email={EMAIL} />
            </div>

            <div className="flex flex-col gap-2 py-6 font-mono text-[11px] text-stone-400 sm:flex-row sm:items-center sm:justify-between">
                <span>© {year} Vaishnav Ghenge</span>
                <span className="text-stone-400">
                    Set in Playfair Display &amp; Newsreader · Next.js on Vercel ·{" "}
                    <a
                        href="https://github.com/VaishnavGhenge/portfolio"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 transition-colors hover:text-stone-700"
                    >
                        Source
                    </a>
                </span>
            </div>
        </footer>
    );
}
