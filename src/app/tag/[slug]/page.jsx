import React from 'react'
import Link from 'next/link'
import { getTag, articleUrl } from '@/lib/api'

const PLACEHOLDER = 'https://placehold.co/300x200'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { tag } = await getTag(slug)
    return { title: tag?.name || 'বিষয়' }
}

export default async function TagPage({ params, searchParams }) {
    const { slug } = await params
    const sp = await searchParams
    const page = parseInt(sp?.page) || 1

    const { tag, articles, meta } = await getTag(slug, 16, page)
    const title = tag?.name || 'বিষয়'
    const hero = articles[0]
    const rest = articles.slice(1)
    const lastPage = meta?.last_page ?? 1

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="mb-6">
                    <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>{title}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {hero && (
                        <div className="col-span-1 md:col-span-2 relative h-96 rounded-sm overflow-hidden shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition">
                            <img src={hero.image || PLACEHOLDER} alt={hero.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="relative z-10 flex flex-col justify-end h-full p-4">
                                <Link href={articleUrl(hero)}>
                                    <h3 className="text-white text-3xl font-bold leading-snug">{hero.title}</h3>
                                </Link>
                            </div>
                        </div>
                    )}

                    {rest.map((news, index) => (
                        <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                            <div className="relative">
                                <img src={news.image || PLACEHOLDER} alt={news.title} className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <Link href={articleUrl(news)}>
                                    <h3 className="font-bold text-stone-800 hover:text-teal-900 mb-2 py-3 px-4 transition">{news.title}</h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {lastPage > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        {page > 1 && (
                            <Link href={page === 2 ? `/tag/${slug}` : `/tag/${slug}?page=${page - 1}`} className="px-4 py-2 bg-teal-900 text-white text-sm rounded hover:bg-teal-800 transition">
                                ← আগের পৃষ্ঠা
                            </Link>
                        )}
                        <span className="text-stone-500 text-sm">{page} / {lastPage}</span>
                        {page < lastPage && (
                            <Link href={`/tag/${slug}?page=${page + 1}`} className="px-4 py-2 bg-teal-900 text-white text-sm rounded hover:bg-teal-800 transition">
                                পরের পৃষ্ঠা →
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
