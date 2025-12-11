import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Blogs from '@/components/blogs';
import FadeIn from '@/components/FadeIn';
import SkillBento from '@/components/SkillBento';

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
                <Skills />
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
