import About from '@/components/about';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Blogs from '@/components/blogs';
import SkillGrid, { SkillLegend } from '@/components/SkillGrid';
import EditorialCartoon from '@/components/EditorialCartoon';

function Section({
    id,
    number,
    title,
    aside,
    children,
}: {
    id: string;
    number: string;
    title: string;
    aside?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24">
            <div className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-b border-stone-900 pb-2">
                <span className="rubric text-amber-800">{number}</span>
                <h2 className="font-serif text-base font-bold uppercase tracking-[0.18em] text-stone-900">
                    {title}
                </h2>
                {aside && <div className="ml-auto">{aside}</div>}
            </div>
            {children}
        </section>
    );
}

export default function Page() {
    return (
        <div className="space-y-20">
            <Section id="about" number="01" title="About">
                <About />
            </Section>

            <Section id="experience" number="02" title="Experience">
                <Experience />
            </Section>

            <Section id="projects" number="03" title="Featured Projects">
                <Projects />
            </Section>

            <Section id="skills" number="04" title="Technical Skills" aside={<SkillLegend />}>
                <SkillGrid />
            </Section>

            <Section id="blogs" number="05" title="Recent Writing">
                <Blogs />
            </Section>

            <Section id="editorial" number="06" title="Editorial">
                <EditorialCartoon />
            </Section>
        </div>
    );
}
