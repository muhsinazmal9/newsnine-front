// Lightweight API client for the NewsNine backend.
// Base URL comes from NEXT_PUBLIC_API_URL (see .env.local).

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function apiGet(path, { params, revalidate = 60 } = {}) {
    const url = new URL(`${API_BASE}${path}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, value);
            }
        });
    }

    try {
        const res = await fetch(url, { next: { revalidate } });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function getHome() {
    const data = await apiGet('/home');
    return data ?? { breaking: [], featured: [], latest: [], most_viewed: [], sections: [] };
}

export async function getArticle(id) {
    const data = await apiGet(`/articles/${id}`);
    return data?.data ?? null;
}

export async function getRelated(id) {
    const data = await apiGet(`/articles/${id}/related`);
    return data?.data ?? [];
}

// Build the canonical article URL: /{category}/{id}/{slug}
// The id is what actually resolves the article; category & slug are for readability/SEO.
export function articleUrl(news) {
    if (!news?.id) return '#';
    const category = news.category?.slug || news.categories?.[0]?.slug || 'news';
    const base = `/${category}/${news.id}`;
    return news.slug ? `${base}/${news.slug}` : base;
}

export async function getLatestArticles(perPage = 12) {
    const data = await apiGet('/articles', { params: { per_page: perPage } });
    return data?.data ?? [];
}

export async function getCategory(slug, perPage = 16, page = 1) {
    const data = await apiGet(`/categories/${slug}`, { params: { per_page: perPage, page } });
    if (!data) return { category: null, articles: [], meta: null };
    return { category: data.category ?? null, articles: data.data ?? [], meta: data.meta ?? null };
}

export async function getMenuCategories() {
    const data = await apiGet('/categories', { params: { menu: 1 } });
    return data?.data ?? [];
}

export async function getTag(slug, perPage = 16, page = 1) {
    const data = await apiGet(`/tags/${slug}`, { params: { per_page: perPage, page } });
    if (!data) return { tag: null, articles: [], meta: null };
    return { tag: data.tag ?? null, articles: data.data ?? [], meta: data.meta ?? null };
}

export async function search(query, perPage = 24, page = 1) {
    const data = await apiGet('/search', { params: { q: query, per_page: perPage, page } });
    return { query, results: data?.data ?? [], meta: data?.meta ?? null };
}

export async function getSettings() {
    const data = await apiGet('/settings', { revalidate: 300 });
    return data?.data ?? null;
}
