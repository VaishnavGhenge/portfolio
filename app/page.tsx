import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Blogs from '@/components/blogs';

export default function Page() {
    return (
        <div>
            <About/>
            <Skills/>
            <Experience/>
            <Projects/>
            <Blogs/>
        </div>
    );
}
