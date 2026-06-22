import React from 'react'
import Link from 'next/link'
import { search, articleUrl } from '@/lib/api'

const PLACEHOLDER = 'https://placehold.co/300x200'

export async function generateMetadata({ searchParams }) {
    const p = await searchParams
    const q = p?.q || ''
    return { title: q ? `"${q}" অনুসন্ধান` : 'অনুসন্ধান' }
}

export default async function SearchResult({ searchParams }) {
    const params = await searchParams
    const query = params?.q || ''
    const page = parseInt(params?.page) || 1

    const { results, meta } = query
        ? await search(query, 24, page)
        : { results: [], meta: null }

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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {results.map((news, index) => (
                                <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                                    <div className="relative">
                                        <img src={news.image || PLACEHOLDER} alt={news.title} className="w-full h-48 object-cover" />
                                    </div>
                                    <div>
                                        <Link href={articleUrl(news)}>
                                            <h3 className="font-bold text-stone-800 hover:text-teal-900 mb-2 py-3 px-4 transition">{news.title}</h3>
                                        </Link>
                                        {news.category && (
                                            <div className="p-3 border-t border-stone-200">
                                                <Link href={`/${news.category.slug}`} className="text-teal-700 text-sm hover:text-teal-900">{news.category.name}</Link>
                                            </div>
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
