import About from '@/components/about';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Blogs from '@/components/blogs';
import SkillGrid from '@/components/SkillGrid';
import EditorialCartoon from '@/components/EditorialCartoon';

export default function Page() {
    return (
        <div className="space-y-20">
            <section id="about">
                <About />
            </section>

            <hr className="border-stone-200" />

            <section id="experience">
                <Experience />
            </section>

            <hr className="border-stone-200" />

            <section id="projects">
                <Projects />
            </section>

            <hr className="border-stone-200" />

            <section id="skills">
                <h2 className="font-serif text-lg font-bold uppercase mb-2 tracking-widest text-stone-900">
                    Technical Skills
                </h2>
                <p className="text-xs text-stone-400 mb-6 font-mono">
                    ●●● expert · ●● proficient · ● familiar
                </p>
                <SkillGrid />
            </section>

            <hr className="border-stone-200" />

            <section id="blogs">
                <Blogs />
            </section>

            <hr className="border-stone-200" />

            <section id="editorial">
                <EditorialCartoon />
            </section>
        </div>
    );
}
