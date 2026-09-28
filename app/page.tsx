import FrontPage from '@/components/FrontPage';
import Projects from '@/components/projects';
import Markets from '@/components/Markets';
import Blogs from '@/components/blogs';
import ComicStrip from '@/components/ComicStrip';
import Classifieds from '@/components/Classifieds';

/** A newspaper section flag: name on the left, page marker on the right. */
function SectionFlag({ id, title, page }: { id: string; title: string; page: string }) {
    return (
        <div className="mb-8 flex items-baseline justify-between border-b border-stone-900 pb-2">
            <h2 id={`${id}-title`} className="font-serif text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                {title}
            </h2>
            <span className="rubric text-stone-600">Page {page}</span>
        </div>
    );
}

function Section({
    id,
    title,
    page,
    children,
}: {
    id: string;
    title: string;
    page: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="border-t-[3px] border-double border-stone-900 pt-6">
            <SectionFlag id={id} title={title} page={page} />
            {children}
        </section>
    );
}

export default function Page() {
    return (
        <div className="space-y-20">
            <section id="front" aria-label="Front page">
                <FrontPage />
            </section>

            <Section id="features" title="Features" page="A2">
                <Projects />
            </Section>

            <Section id="markets" title="Markets" page="B1">
                <Markets />
            </Section>

            <Section id="opinion" title="Opinion" page="C1">
                <Blogs />
            </Section>

            <Section id="comics" title="Comics" page="D1">
                <ComicStrip />
            </Section>

            <Section id="classifieds" title="Classifieds" page="D2">
                <Classifieds />
            </Section>
        </div>
    );
}
