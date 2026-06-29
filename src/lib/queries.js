import { queryOptions } from '@tanstack/react-query'
import { getHome, getArticle, getRelated, getCategory, getTag, search } from '@/lib/api'

export const homeOptions = () => queryOptions({
    queryKey: ['home'],
    queryFn: getHome,
    staleTime: 60 * 1000,
})

export const articleOptions = (id) => queryOptions({
    queryKey: ['article', id],
    queryFn: () => getArticle(id),
    staleTime: 5 * 60 * 1000,
})

export const relatedOptions = (id) => queryOptions({
    queryKey: ['related', id],
    queryFn: () => getRelated(id),
    staleTime: 5 * 60 * 1000,
})

export const categoryOptions = (slug, page = 1) => queryOptions({
    queryKey: ['category', slug, page],
    queryFn: () => getCategory(slug, 16, page),
    staleTime: 60 * 1000,
})

export const tagOptions = (slug, page = 1) => queryOptions({
    queryKey: ['tag', slug, page],
    queryFn: () => getTag(slug, 16, page),
    staleTime: 60 * 1000,
})

export const searchOptions = (query, page = 1) => queryOptions({
    queryKey: ['search', query, page],
    queryFn: () => query
        ? search(query, 24, page)
        : Promise.resolve({ query: '', results: [], meta: null }),
    staleTime: 30 * 1000,
})
