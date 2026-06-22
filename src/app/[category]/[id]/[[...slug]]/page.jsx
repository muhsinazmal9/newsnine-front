import React from 'react'
import Link from 'next/link'
import { getArticle, getRelated, articleUrl } from '@/lib/api'
import AdSlot from '@/components/AdSlot'
import ArticleBody from '@/components/ArticleBody'

const PLACEHOLDER = 'https://placehold.co/300x200';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const article = await getArticle(id);
    if (!article) return { title: 'সংবাদ' };
    return {
        title: article.seo?.meta_title || article.title,
        description: article.seo?.meta_description || article.excerpt || '',
        openGraph: {
            title: article.seo?.meta_title || article.title,
            description: article.seo?.meta_description || article.excerpt || '',
            images: article.image ? [{ url: article.image }] : [],
        },
    };
}

export default async function NewsDetail({ params }) {
    const { id } = await params;

    // The article is resolved by id; the slug in the URL is purely cosmetic.
    const article = await getArticle(id);
    const related = await getRelated(id);

    if (!article) {
        return (
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <h1 className='text-3xl font-bold text-stone-800'>সংবাদটি পাওয়া যায়নি</h1>
            </div>
        );
    }

    const category = article.categories?.[0];

    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">
                {/* TITLE */}
                <div className="col-span-7">
                    {category && (
                        <Link href={`/${category.slug}`} className='text-teal-700 font-bold text-sm border-b-2 border-teal-700 inline-block mb-4'>{category.name}</Link>
                    )}
                    <h1 className='text-3xl font-bold text-stone-800'>{article.title}</h1>
                </div>

                {/* Main Content */}
                <div className="col-span-5">
                    <ArticleBody article={article} />
                </div>

                {/* Another Sidebar */}
                <div className="col-span-2 space-y-4">
                    <AdSlot placement="sidebar" className="bg-stone-200 h-48" />
                    <div className="bg-white rounded-sm overflow-hidden">
                        <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">অন্যান্য সংবাদ</div>
                        <div className="flex flex-col gap-4 mb-4">
                            {related.map((news, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex items-start space-x-4 px-4">
                                        <img src={news.image || PLACEHOLDER} alt={news.title} className="w-16 h-12 object-cover" />
                                        <div>
                                            <Link href={articleUrl(news)}>
                                                <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                    <hr className="border-stone-200 last:hidden" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
