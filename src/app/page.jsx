import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { homeOptions } from '@/lib/queries'
import { PageLoader } from '@/components/Skeletons'
import HomeContent from './_home'

export default async function Page() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(homeOptions())
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<PageLoader />}>
                <HomeContent />
            </Suspense>
        </HydrationBoundary>
    )
}
