import React, { Suspense } from 'react'
import Link from 'next/link'
import { getTag, articleUrl } from '@/lib/api'
import LazyImage from '@/components/LazyImage'
import { GridSkeleton } from '@/components/Skeletons'

const PLACEHOLDER = 'https://placehold.co/300x200'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { tag } = await getTag(slug)
    return { title: tag?.name || 'বিষয়' }
}

export default function TagPage({ params, searchParams }) {
    return (
        <Suspense fallback={<GridSkeleton withHero={false} cards={8} />}>
            <TagContent params={params} searchParams={searchParams} />
        </Suspense>
    )
}

async function TagContent({ params, searchParams }) {
    const { slug } = await params
    const sp = await searchParams
    const page = parseInt(sp?.page) || 1

    const { tag, articles, meta } = await getTag(slug, 16, page)
    const title = tag?.name || 'বিষয়'
    const lastPage = meta?.last_page ?? 1

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="mb-6">
                    <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>{title}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {articles.map((news, index) => (
                        <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                            <LazyImage src={news.image || PLACEHOLDER} alt={news.title} className="w-full h-48" />
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
