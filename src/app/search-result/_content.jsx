'use client'
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { searchOptions } from '@/lib/queries'
import { articleUrl } from '@/lib/api'
import LazyImage from '@/components/LazyImage'
import { PageLoader } from '@/components/Skeletons'

const PLACEHOLDER = 'https://placehold.co/300x200'

export default function SearchContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')

    const { data, isPending } = useQuery(searchOptions(query, page))
    if (isPending) return <PageLoader />
    const results = data?.results ?? []
    const meta = data?.meta ?? null
    const lastPage = meta?.last_page ?? 1

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="mb-6">
                    <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>
                        অনুসন্ধানের ফলাফল{query ? `: "${query}"` : ''}
                    </h1>
                </div>

                {results.length === 0 ? (
                    <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] p-12 text-center">
                        <p className="text-stone-500 text-lg">
                            {query ? `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি।` : 'অনুসন্ধান করতে উপরের সার্চ বক্স ব্যবহার করুন।'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-3">
                            {results.map((news, index) => (
                                <div key={index} className="flex gap-4 bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                                    <LazyImage src={news.image || PLACEHOLDER} alt={news.title} className="w-32 sm:w-56 h-24 sm:h-36 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 py-3 pr-4 flex flex-col justify-center">
                                        {news.category && (
                                            <Link href={`/${news.category.slug}`} className="self-start text-teal-700 text-xs font-bold hover:text-teal-900 transition">{news.category.name}</Link>
                                        )}
                                        <Link href={articleUrl(news)}>
                                            <h3 className="font-bold text-stone-800 hover:text-teal-900 transition text-base sm:text-lg mt-1 line-clamp-2">{news.title}</h3>
                                        </Link>
                                        {news.excerpt && (
                                            <p className="text-stone-500 text-sm mt-2 line-clamp-2 hidden sm:block">{news.excerpt}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {lastPage > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                {page > 1 && (
                                    <Link href={`/search-result?q=${encodeURIComponent(query)}&page=${page - 1}`} className="px-4 py-2 bg-teal-900 text-white text-sm rounded hover:bg-teal-800 transition">
                                        ← আগের পৃষ্ঠা
                                    </Link>
                                )}
                                <span className="text-stone-500 text-sm">{page} / {lastPage}</span>
                                {page < lastPage && (
                                    <Link href={`/search-result?q=${encodeURIComponent(query)}&page=${page + 1}`} className="px-4 py-2 bg-teal-900 text-white text-sm rounded hover:bg-teal-800 transition">
                                        পরের পৃষ্ঠা →
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
