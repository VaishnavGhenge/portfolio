export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-20 py-8 border-t-2 border-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-stone-400 font-mono">
                <span>© {year} Vaishnav Ghenge</span>
                <span className="hidden sm:block text-stone-300">·</span>
                <span>Built with Next.js · Deployed on Vercel</span>
                <span className="hidden sm:block text-stone-300">·</span>
                <a
                    href="https://github.com/VaishnavGhenge/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-stone-700 transition-colors underline underline-offset-2"
                >
                    Source
                </a>
            </div>
        </footer>
    );
}
