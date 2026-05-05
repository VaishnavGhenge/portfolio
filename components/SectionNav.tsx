const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#blogs", label: "Writing" },
    { href: "#editorial", label: "Editorial" },
];

export default function SectionNav() {
    return (
        <nav
            aria-label="Section navigation"
            className="mb-20 border-y-2 border-stone-900 py-3"
        >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-stone-500">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-stone-900"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
