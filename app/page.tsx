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
                <section id="about" className="scroll-mt-24 lg:scroll-mt-32">
                    <About />
                </section>
            </FadeIn>

            <FadeIn delay={0.25}>
                <section id="focus" className="scroll-mt-24 lg:scroll-mt-32">
                    <SkillBento />
                </section>
            </FadeIn>

            <FadeIn delay={0.28}>
                <section id="skills" className="mb-16 scroll-mt-24 lg:scroll-mt-32">
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
                <section id="experience" className="scroll-mt-24 lg:scroll-mt-32">
                    <Experience />
                </section>
            </FadeIn>
            <FadeIn delay={0.4}>
                <section id="projects" className="scroll-mt-24 lg:scroll-mt-32">
                    <Projects />
                </section>
            </FadeIn>
            <FadeIn delay={0.5}>
                <section id="blogs" className="scroll-mt-24 lg:scroll-mt-32">
                    <Blogs />
                </section>
            </FadeIn>
        </div>
    );
}
