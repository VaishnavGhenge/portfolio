import { getTopArticles } from '@/lib/devto';
import Image from 'next/image';

export default async function Blogs() {
    const articles = await getTopArticles();

    if (articles.length === 0) {
        return null;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className='mb-16'>
            <h2 className='text-lg font-bold uppercase mb-4'>Recent Blog Posts</h2>
            <div>
                <ol>
                    {articles.map((article, index) => (
                        <li key={article.url} className='mb-8'>
                            <div className='group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                                <div className="absolute -inset-2 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-700/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                <div className='z-10 relative'>
                                    <div className='flex gap-4 items-start'>
                                        {article.cover_image && (
                                            <div className='flex-shrink-0 w-32 h-20 relative rounded overflow-hidden md:w-40 md:h-24'>
                                                <Image
                                                    src={article.cover_image}
                                                    alt={article.title}
                                                    fill
                                                    className='object-cover'
                                                    sizes='(max-width: 768px) 128px, 160px'
                                                />
                                            </div>
                                        )}
                                        <div className='flex-1 min-w-0'>
                                            <a
                                                href={article.url}
                                                className='text-lg leading-snug font-medium hover:text-white hover:underline'
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {article.title}
                                            </a>
                                            <div className='flex items-center gap-3 mt-1 text-xs text-slate-400'>
                                                <span>{formatDate(article.published_at)}</span>
                                                <span>•</span>
                                                <span>{article.reading_time_minutes} min read</span>
                                                {article.public_reactions_count > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{article.public_reactions_count} reactions</span>
                                                    </>
                                                )}
                                            </div>
                                            <p className='mt-2 text-sm sub-text line-clamp-2'>{article.description}</p>
                                        </div>
                                    </div>
                                    <div className='mt-3 flex flex-wrap'>
                                        {article.tag_list.slice(0, 5).map((tag) => (
                                            <div key={`${tag}-${index}`} className='mr-1.5 mt-2'>
                                                <div className='flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300'>
                                                    #{tag}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className='mt-6'>
                    <a
                        href='https://dev.to/vaishnavghenge'
                        target='_blank'
                        rel='noreferrer noopener'
                        className='inline-flex items-center text-sm font-medium hover:text-white hover:underline'
                    >
                        View all articles →
                    </a>
                </div>
            </div>
        </div>
    );
}