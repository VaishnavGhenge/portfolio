import Dateline from "./Dateline";

export default function Masthead() {
    return (
        <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-stone-900 pb-2">
                <span className="rubric text-stone-600">Est. 2018 · Pune, IN</span>
                <span className="rubric hidden text-stone-600 md:inline">Backend &amp; Distributed Systems Edition</span>
                <Dateline />
            </div>

            <h1 className="mt-5 text-center whitespace-nowrap font-blackletter text-[clamp(2rem,11vw,7.5rem)] font-normal leading-none text-stone-900">
                The Ghenge Times
            </h1>

            <p className="mt-4 text-center text-lg text-stone-700 sm:text-xl">
                Vaishnav Ghenge, software engineer: backend &amp; distributed systems
            </p>

            <div className="mt-4 border-t-[3px] border-double border-stone-900" />
        </div>
    );
}
