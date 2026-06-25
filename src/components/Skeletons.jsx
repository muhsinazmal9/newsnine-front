import React from 'react'

/* A single shimmering placeholder block. */
export function Shimmer({ className = '' }) {
    return <div className={`skeleton-shimmer rounded-sm ${className}`} />
}

/* Card placeholder: image on top, two title lines below. */
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <Shimmer className="w-full h-48 rounded-none" />
            <div className="p-4 space-y-2">
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-3/4" />
            </div>
        </div>
    )
}

/* List-row placeholder: small thumbnail + two text lines. */
export function ListItemSkeleton() {
    return (
        <div className="flex items-start gap-4 px-4">
            <Shimmer className="w-16 h-12 flex-shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
            </div>
        </div>
    )
}

/* Column of list rows inside a white/stone card. */
export function ListCardSkeleton({ rows = 5, dark = false }) {
    return (
        <div className={`${dark ? 'bg-stone-100' : 'bg-white'} rounded-sm overflow-hidden`}>
            <div className="py-4 flex flex-col gap-4">
                {Array.from({ length: rows }).map((_, i) => (
                    <ListItemSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

/* Reusable grid: optional large hero + a grid of cards. */
export function GridSkeleton({ withHero = true, cards = 7 }) {
    return (
        <div className="max-w-7xl mx-auto px-4 pb-12">
            <Shimmer className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {withHero && <Shimmer className="col-span-1 md:col-span-2 h-96 rounded-sm" />}
                {Array.from({ length: cards }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

/* A single horizontal search-result row placeholder. */
export function SearchRowSkeleton() {
    return (
        <div className="flex gap-4 bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <Shimmer className="w-32 sm:w-56 h-24 sm:h-36 flex-shrink-0 rounded-none" />
            <div className="flex-1 py-4 pr-4 space-y-3 flex flex-col justify-center">
                <Shimmer className="h-3 w-20" />
                <Shimmer className="h-5 w-3/4" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
            </div>
        </div>
    )
}

/* Search page skeleton — a vertical list of rows. */
export function SearchSkeleton({ rows = 6 }) {
    return (
        <div className="max-w-7xl mx-auto px-4 pb-12">
            <Shimmer className="h-8 w-64 mb-6" />
            <div className="flex flex-col gap-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <SearchRowSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

/* Homepage skeleton — mirrors the hero grid + a couple of section blocks. */
export function HomeSkeleton() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">
                {/* Main grid: big feature + cards */}
                <div className="col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Shimmer className="col-span-2 h-100 rounded-sm" />
                        {Array.from({ length: 4 }).map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                {/* Two sidebars */}
                <div className="col-span-2">
                    <ListCardSkeleton rows={6} />
                </div>
                <div className="col-span-2 space-y-4">
                    <Shimmer className="h-48" />
                    <ListCardSkeleton rows={6} />
                </div>
            </div>

            {/* Breaking strip */}
            <div className="py-20 bg-teal-950">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>

            {/* Section block */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <Shimmer className="h-7 w-40 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="col-span-2 space-y-4">
                            <Shimmer className="w-full aspect-video" />
                            <Shimmer className="h-6 w-5/6" />
                            <Shimmer className="h-4 w-full" />
                            <Shimmer className="h-4 w-2/3" />
                        </div>
                        <ListCardSkeleton rows={4} dark />
                        <ListCardSkeleton rows={4} />
                    </div>
                </div>
            </div>
        </>
    )
}

/* Article detail skeleton — title, hero image, body paragraphs, sidebar. */
export function DetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">
            <div className="col-span-7 space-y-3">
                <Shimmer className="h-5 w-24" />
                <Shimmer className="h-9 w-3/4" />
            </div>

            <div className="col-span-5 space-y-4">
                <div className="flex justify-between border-y border-stone-200 py-2">
                    <Shimmer className="h-4 w-40" />
                    <Shimmer className="h-4 w-32" />
                </div>
                <Shimmer className="w-full aspect-video" />
                <div className="space-y-3 pt-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Shimmer key={i} className={`h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
                    ))}
                </div>
            </div>

            <div className="col-span-2 space-y-4">
                <Shimmer className="h-48" />
                <ListCardSkeleton rows={5} />
            </div>
        </div>
    )
}
