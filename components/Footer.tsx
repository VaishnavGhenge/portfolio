export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-20 flex flex-col gap-2 border-t-[3px] border-double border-stone-900 py-6 font-mono text-[11px] text-stone-600 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} Vaishnav Ghenge</span>
            <span>
                Set in Playfair Display &amp; Newsreader · Next.js on Vercel ·{" "}
                <a
                    href="https://github.com/VaishnavGhenge/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-stone-900"
                >
                    Source
                </a>
            </span>
        </footer>
    );
}
