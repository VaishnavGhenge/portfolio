import Dateline, { EditionLine } from "./Dateline";

/** The boxed panels either side of a nameplate. Here they say whose paper this is. */
function Ear({ align, children }: { align: "left" | "right"; children: React.ReactNode }) {
    return (
        <div className={`hidden w-44 shrink-0 border border-stone-900 px-3 py-2.5 lg:block ${align === "right" ? "text-right" : ""}`}>
            {children}
        </div>
    );
}

export default function Masthead() {
    return (
        <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-stone-900 pb-2">
                <span className="rubric text-stone-600">Est. 2018 · Pune, IN</span>
                <span className="rubric hidden text-stone-600 md:inline">Backend &amp; Distributed Systems Edition</span>
                <Dateline />
            </div>

            <div className="mt-5 flex items-center justify-between gap-6">
                <Ear align="left">
                    <p className="rubric text-amber-800">Portfolio of</p>
                    <p className="mt-1 font-serif text-lg font-bold leading-tight text-stone-900">Vaishnav Ghenge</p>
                    <p className="mt-0.5 text-xs leading-snug text-stone-700">Software engineer, Pune</p>
                </Ear>

                <h1 className="ink min-w-0 flex-1 whitespace-nowrap text-center font-blackletter text-[clamp(2rem,11vw,7.5rem)] font-normal leading-none text-stone-900 lg:text-[clamp(3.5rem,5.6vw,5.5rem)]">
                    The Ghenge Times
                </h1>

                <Ear align="right">
                    <p className="rubric flex items-center justify-end gap-1.5 text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" aria-hidden="true" />
                        Open to work
                    </p>
                    <p className="mt-1 text-xs leading-snug text-stone-700">Hiring for backend or distributed systems?</p>
                    <a href="#classifieds" className="rubric mt-1.5 inline-block text-stone-900 underline decoration-stone-400 underline-offset-4 hover:text-amber-800">
                        Contact, page D2
                    </a>
                </Ear>
            </div>

            <p className="mt-4 text-center text-lg text-stone-700 sm:text-xl">
                The portfolio of Vaishnav Ghenge, software engineer: backend &amp; distributed systems
            </p>

            <div className="mt-4 border-t-[3px] border-double border-stone-900" />
            <EditionLine />
            <div className="border-t border-stone-900" />
        </div>
    );
}
