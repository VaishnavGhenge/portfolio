import FrontPage from '@/components/FrontPage';
import Projects from '@/components/projects';
import Markets from '@/components/Markets';
import Blogs from '@/components/blogs';
import ComicStrip from '@/components/ComicStrip';
import Classifieds from '@/components/Classifieds';

/** A newspaper section flag: name on the left, page marker on the right. */
/**
 * A newspaper section flag: name on the left, page marker on the right. The
 * plain-words label under the name says what the section is in portfolio terms.
 */
function SectionFlag({ id, title, plain, page }: { id: string; title: string; plain: string; page: string }) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-stone-900 pb-2">
            <div>
                <h2 id={`${id}-title`} className="ink font-serif text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                    {title}
                    <span className="sr-only">: {plain}</span>
                </h2>
                <p aria-hidden="true" className="mt-1 text-[15px] text-stone-700">{plain}</p>
            </div>
            <span className="rubric shrink-0 pb-1 text-stone-600">Page {page}</span>
        </div>
    );
}

function Section({
    id,
    title,
    plain,
    page,
    children,
}: {
    id: string;
    title: string;
    plain: string;
    page: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="border-t-[3px] border-double border-stone-900 pt-6">
            <SectionFlag id={id} title={title} plain={plain} page={page} />
            {children}
        </section>
    );
}

export default function Page() {
    return (
        <div className="space-y-20">
            <section id="front" aria-label="Front page">
                <FrontPage />
                {/* Everything above this crease is the front page. */}
                <div aria-hidden="true" className="fold -mx-4 mt-16 -mb-20 sm:-mx-6 lg:-mx-10" />
            </section>

            <Section id="features" title="Features" plain="Side projects, built and shipped" page="A2">
                <Projects />
            </Section>

            <Section id="markets" title="Markets" plain="Skills, rated by daily use" page="B1">
                <Markets />
            </Section>

            <Section id="opinion" title="Opinion" plain="Articles on Django and the backend" page="C1">
                <Blogs />
            </Section>

            <Section id="comics" title="Comics" plain="A strip about the job" page="D1">
                <ComicStrip />
            </Section>

            <Section id="classifieds" title="Classifieds" plain="Hiring and contact" page="D2">
                <Classifieds />
            </Section>
        </div>
    );
}
