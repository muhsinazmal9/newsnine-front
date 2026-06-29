import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { tagOptions } from '@/lib/queries'
import { getTag } from '@/lib/api'
import { PageLoader } from '@/components/Skeletons'
import TagContent from './_content'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { tag } = await getTag(slug)
    return { title: tag?.name || 'বিষয়' }
}

export default async function TagPage({ params, searchParams }) {
    const { slug } = await params
    const sp = await searchParams
    const page = parseInt(sp?.page) || 1

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(tagOptions(slug, page))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<PageLoader />}>
                <TagContent />
            </Suspense>
        </HydrationBoundary>
    )
}
