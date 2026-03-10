import About from '@/components/about';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Blogs from '@/components/blogs';
import FadeIn from '@/components/FadeIn';
import SkillBento from '@/components/SkillBento';
import SkillGrid from '@/components/SkillGrid';

export default function Page() {
    return (
        <div className="space-y-16 lg:space-y-24">
            <FadeIn delay={0.1}>
                <About />
            </FadeIn>

            <FadeIn delay={0.25}>
                <SkillBento />
            </FadeIn>

            <FadeIn delay={0.28}>
                <section className="mb-16">
                    <h2 className="text-lg font-bold uppercase mb-2 tracking-widest text-slate-200">
                        Technical Skills
                    </h2>
                    <p className="text-xs text-slate-600 mb-6 font-mono">
                        ●●● expert · ●● proficient · ● familiar
                    </p>
                    <SkillGrid />
                </section>
            </FadeIn>

            <FadeIn delay={0.3}>
                <Experience />
            </FadeIn>
            <FadeIn delay={0.4}>
                <Projects />
            </FadeIn>
            <FadeIn delay={0.5}>
                <Blogs />
            </FadeIn>
        </div>
    );
}
