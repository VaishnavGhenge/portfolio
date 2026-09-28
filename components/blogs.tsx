import { getTopArticles } from '@/lib/devto';
import Image from 'next/image';

const PROFILE = 'https://dev.to/vaishnavghenge';

// Static class names so Tailwind can see them; the API returns up to three articles.
const COLS: Record<number, string> = { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' };

// dev.to returns descriptions HTML-escaped ("Installation &amp; Setup").
const decode = (s: string) =>
    s.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e as string] ?? _);

export default async function Blogs() {
    const articles = await getTopArticles();

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (articles.length === 0) {
        return (
            <p className="text-[15px] text-stone-700">
                Articles are on <a href={PROFILE} target="_blank" rel="noreferrer noopener" className="ink-link">dev.to</a>.
            </p>
        );
    }

    return (
        <div>
            <ol className={`grid gap-8 ${COLS[articles.length] ?? COLS[3]} md:gap-0 md:divide-x md:divide-stone-300`}>
                {articles.map((article) => (
                    <li key={article.url} className="md:px-6 md:first:pl-0 md:last:pr-0">
                        <article>
                            {article.cover_image && (
                                <div className="relative mb-3 aspect-[1000/420] overflow-hidden border border-stone-900">
                                    {/* Grayscale so dev.to covers read as newsprint photos. */}
                                    <Image
                                        src={article.cover_image}
                                        alt=""
                                        fill
                                        className="object-cover contrast-[1.1] grayscale"
                                        sizes="(min-width: 768px) 540px, 100vw"
                                    />
                                </div>
                            )}
                            <h3 className="font-serif text-lg font-bold leading-snug text-stone-900">
                                <a href={article.url} target="_blank" rel="noreferrer noopener" className="hover:text-amber-800">
                                    {article.title}
                                </a>
                            </h3>
                            <p className="mt-1.5 font-mono text-[11px] text-stone-600">
                                {formatDate(article.published_at)} · {article.reading_time_minutes} min read
                            </p>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-700">{decode(article.description)}</p>
                        </article>
                    </li>
                ))}
            </ol>
            <a
                href={PROFILE}
                target="_blank"
                rel="noreferrer noopener"
                className="rubric mt-8 inline-flex text-stone-900 underline decoration-stone-400 underline-offset-4 hover:text-amber-800 hover:decoration-amber-800"
            >
                All articles on dev.to ↗
            </a>
        </div>
    );
}
