import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { articleOptions, relatedOptions } from '@/lib/queries'
import { getArticle } from '@/lib/api'
import { PageLoader } from '@/components/Skeletons'
import ArticleContent from './_content'

export async function generateMetadata({ params }) {
    const { id } = await params
    const article = await getArticle(id)
    if (!article) return { title: 'সংবাদ' }
    return {
        title: article.seo?.meta_title || article.title,
        description: article.seo?.meta_description || article.excerpt || '',
        openGraph: {
            title: article.seo?.meta_title || article.title,
            description: article.seo?.meta_description || article.excerpt || '',
            images: article.image ? [{ url: article.image }] : [],
        },
    }
}

export default async function NewsDetail({ params }) {
    const { id } = await params

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.prefetchQuery(articleOptions(id)),
        queryClient.prefetchQuery(relatedOptions(id)),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<PageLoader />}>
                <ArticleContent />
            </Suspense>
        </HydrationBoundary>
    )
}
