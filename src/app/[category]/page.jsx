import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { categoryOptions } from '@/lib/queries'
import { getCategory } from '@/lib/api'
import { PageLoader } from '@/components/Skeletons'
import CategoryContent from './_content'

export async function generateMetadata({ params }) {
    const { category: slug } = await params
    const { category } = await getCategory(slug, 1)
    return { title: category?.name || 'বিভাগ' }
}

export default async function SingleCategory({ params, searchParams }) {
    const { category: slug } = await params
    const sp = await searchParams
    const page = parseInt(sp?.page) || 1

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(categoryOptions(slug, page))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<PageLoader />}>
                <CategoryContent />
            </Suspense>
        </HydrationBoundary>
    )
}
