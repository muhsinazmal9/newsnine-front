'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function NavBar({ categories }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

    const submitSearch = () => {
        const q = query.trim();
        if (q) {
            router.push(`/search-result?q=${encodeURIComponent(q)}`);
            setSearchOpen(false);
            setQuery('');
        }
    };

    return (
        <nav className="bg-teal-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 relative">
                <ul className="flex h-12 space-x-0">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`
                                flex items-center px-4
                                cursor-pointer transition
                                hover:bg-teal-800
                                ${isActive(category.href) ? 'bg-teal-950' : ''}
                            `}
                        >
                            <Link href={category.href}>{category.name}</Link>
                        </li>
                    ))}
                    <li className='flex items-center px-4 cursor-pointer transition hover:bg-teal-800'>আরও</li>
                </ul>

                <div
                    className={`
                        h-12
                        flex items-center gap-3
                        transition-all duration-300 ease-in-out
                        cursor-pointer
                        ${searchOpen
                        ? 'absolute left-0 top-0 w-full bg-teal-900 z-30 px-4'
                        : 'px-4 border-l border-r border-white/10 hover:bg-teal-800'}
                    `}
                    onClick={!searchOpen ? () => setSearchOpen(true) : undefined}
                >
                    {!searchOpen ? (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            অনুসন্ধান
                        </>
                    ) : (
                        <>
                            <input
                                autoFocus
                                type="text"
                                placeholder="খুঁজুন..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }}
                                className="flex-1 h-9 px-3 rounded text-white outline-none"
                            />
                            <button onClick={submitSearch} className="px-3 py-1 bg-teal-700 rounded cursor-pointer">
                                অনুসন্ধান
                            </button>
                            <button onClick={() => setSearchOpen(false)} className="px-3 py-1 bg-red-600 rounded cursor-pointer">
                                বাতিল
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
