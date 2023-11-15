import Image from 'next/image'

export default function Skills() {
    const skills = [
        {
            src: 'next.svg',
            alt: 'NextJS',
            width: 40,
            height: 40
        },
        {
            src: 'angular.svg',
            alt: 'Angular',
            width: 40,
            height: 40
        },
        {
            src: 'react.svg',
            alt: 'React',
            width: 40,
            height: 40
        },
        {
            src: 'typescript.svg',
            alt: 'TypeScript',
            width: 40,
            height: 40
        },
        {
            src: 'javascript.svg',
            alt: 'JavaScript',
            width: 40,
            height: 40
        },
        {
            src: 'java.svg',
            alt: 'Java',
            width: 40,
            height: 40
        },
        {
            src: 'python.svg',
            alt: 'Python',
            width: 40,
            height: 40
        },
        {
            src: 'django.svg',
            alt: 'Django',
            width: 40,
            height: 40,
        },
    ];
    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-4'>Skills</h2>
            <div className='flex gap-4 flex-wrap'>
                {skills.map(skill =>
                    <div
                        key={skill.src}
                        className='bg-white p-1 rounded flex justify-center items-center object-cover w-[50px] h-[50px]'
                    >
                        <Image
                            src={skill.src}
                            alt={skill.alt}
                            width={skill.width}
                            height={skill.height}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}