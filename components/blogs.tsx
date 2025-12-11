import { getTopArticles } from '@/lib/devto';
import Image from 'next/image';
import ClientTiltCard from './ClientTiltCard';

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
            <h2 className='text-lg font-bold uppercase mb-8 tracking-widest text-slate-200'>Recent Blog Posts</h2>
            <div>
                <ol>
                    {articles.map((article, index) => (
                        <li key={article.url} className='mb-8'>
                            <ClientTiltCard>
                                <div className='group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
                                    <div className="absolute -inset-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                    <div className='z-10 relative p-4 lg:p-0'>
                                        <div className='flex gap-4 items-start'>
                                            {article.cover_image && (
                                                <div className='flex-shrink-0 w-20 h-20 sm:w-32 sm:h-20 md:w-36 md:h-24 relative rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30'>
                                                    <Image
                                                        src={article.cover_image}
                                                        alt={article.title}
                                                        fill
                                                        className='object-cover'
                                                        sizes='(max-width: 640px) 80px, (max-width: 768px) 128px, 160px'
                                                    />
                                                </div>
                                            )}
                                            <div className='flex-1 min-w-0'>
                                                <h3 className="text-base font-medium leading-tight text-slate-200 group-hover:text-teal-300">
                                                    <a
                                                        href={article.url}
                                                        className='inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link'
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                                        <span>
                                                            {article.title}
                                                            <span className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                                                            </span>
                                                        </span>
                                                    </a>
                                                </h3>
                                                <div className='flex items-center gap-2 sm:gap-3 mt-1 text-xs text-slate-400 flex-wrap font-medium'>
                                                    <span>{formatDate(article.published_at)}</span>
                                                    <span>•</span>
                                                    <span>{article.reading_time_minutes} min read</span>
                                                    {article.public_reactions_count > 0 && (
                                                        <>
                                                            <span className='hidden sm:inline'>•</span>
                                                            <span className='hidden sm:inline'>{article.public_reactions_count} reactions</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className='mt-2 text-sm leading-normal text-slate-400 line-clamp-2'>{article.description}</p>
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
                            </ClientTiltCard>
                        </li>
                    ))}
                </ol>
                <div className='mt-12'>
                    <a
                        href='https://dev.to/vaishnavghenge'
                        target='_blank'
                        rel='noreferrer noopener'
                        className='inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group'
                        aria-label="View all blogs"
                    >
                        <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                            View all articles
                        </span>
                        <span className="whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.5a.75.75 0 010 1.08l-5.5 5.5a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path></svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}