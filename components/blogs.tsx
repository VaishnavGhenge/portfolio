import { getTopArticles } from '@/lib/devto';
import Image from 'next/image';

export default async function Blogs() {
    const articles = await getTopArticles();

    if (articles.length === 0) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div>
            <ol className="divide-y divide-stone-200">
                {articles.map((article) => (
                    <li key={article.url} className="py-6 first:pt-0">
                        <div className="flex gap-4 items-start">
                            {article.cover_image && (
                                <div className="flex-shrink-0 w-20 h-16 relative rounded border border-stone-200 overflow-hidden">
                                    <Image
                                        src={article.cover_image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-serif text-[15px] font-bold leading-snug text-stone-900">
                                    <a
                                        href={article.url}
                                        className="hover:text-amber-800 underline underline-offset-2 decoration-stone-300 hover:decoration-amber-800 transition-colors"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {article.title}
                                    </a>
                                </h3>
                                <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-stone-400">
                                    <span>{formatDate(article.published_at)}</span>
                                    <span>·</span>
                                    <span>{article.reading_time_minutes} min read</span>
                                    {article.public_reactions_count > 0 && (
                                        <>
                                            <span className="hidden sm:inline">·</span>
                                            <span className="hidden sm:inline">{article.public_reactions_count} reactions</span>
                                        </>
                                    )}
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-stone-500 line-clamp-2">{article.description}</p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {article.tag_list.slice(0, 4).map((tag) => (
                                        <span key={tag} className="text-[10px] text-stone-400 font-mono">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
            <div className="mt-6">
                <a
                    href="https://dev.to/vaishnavghenge"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-stone-500 hover:text-amber-800 underline underline-offset-2 decoration-stone-300 hover:decoration-amber-800 transition-colors"
                >
                    View all articles →
                </a>
            </div>
        </div>
    );
}
