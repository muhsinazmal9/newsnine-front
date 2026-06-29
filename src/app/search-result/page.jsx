import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { searchOptions } from '@/lib/queries'
import { PageLoader } from '@/components/Skeletons'
import SearchContent from './_content'

export async function generateMetadata({ searchParams }) {
    const p = await searchParams
    const q = p?.q || ''
    return { title: q ? `"${q}" অনুসন্ধান` : 'অনুসন্ধান' }
}

export default async function SearchResult({ searchParams }) {
    const p = await searchParams
    const query = p?.q || ''
    const page = parseInt(p?.page) || 1

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(searchOptions(query, page))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<PageLoader />}>
                <SearchContent />
            </Suspense>
        </HydrationBoundary>
    )
}
