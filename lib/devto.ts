export interface DevToArticle {
    title: string;
    description: string;
    published_at: string;
    url: string;
    tag_list: string[];
    reading_time_minutes: number;
    public_reactions_count: number;
    cover_image?: string;
}

export async function getTopArticles(): Promise<DevToArticle[]> {
    try {
        const response = await fetch(
            'https://dev.to/api/articles?username=vaishnavghenge&per_page=3',
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 } // Revalidate every hour
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }

        const articles: DevToArticle[] = await response.json();
        return articles;
    } catch (error) {
        console.error('Error fetching Dev.to articles:', error);
        return [];
    }
}