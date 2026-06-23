'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function NavBar({ categories }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const [isMounted, setIsMounted] = useState(false);
    const [visibleCount, setVisibleCount] = useState(categories.length);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    const navRef = useRef(null);
    const ulRef = useRef(null);
    const measurerRef = useRef(null);

    const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

    const submitSearch = () => {
        const q = query.trim();
        if (q) {
            router.push(`/search-result?q=${encodeURIComponent(q)}`);
            setSearchOpen(false);
            setQuery('');
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setMegaMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMounted) return;

        const calculateVisible = () => {
            if (!ulRef.current || !measurerRef.current) return;

            const ulWidth = ulRef.current.getBoundingClientRect().width;
            const measureChildren = measurerRef.current.children;

            if (measureChildren.length < categories.length + 1) return;

            const itemWidths = [];
            for (let i = 0; i < categories.length; i++) {
                itemWidths.push(measureChildren[i].getBoundingClientRect().width);
            }
            const moreWidth = measureChildren[categories.length].getBoundingClientRect().width;

            const totalWidthAll = itemWidths.reduce((a, b) => a + b, 0);

            if (totalWidthAll <= ulWidth) {
                setVisibleCount(categories.length);
            } else {
                let currentWidth = 0;
                let count = 0;
                for (let i = 0; i < itemWidths.length; i++) {
                    if (currentWidth + itemWidths[i] + moreWidth <= ulWidth) {
                        currentWidth += itemWidths[i];
                        count++;
                    } else {
                        break;
                    }
                }
                setVisibleCount(count);
            }
        };

        calculateVisible();

        const observer = new ResizeObserver(() => {
            calculateVisible();
        });
        if (ulRef.current) {
            observer.observe(ulRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isMounted, categories]);

    useEffect(() => {
        if (!megaMenuOpen) return;
        const handleOutsideClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMegaMenuOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [megaMenuOpen]);

    const visibleCategories = isMounted ? categories.slice(0, visibleCount) : categories;
    const overflowCategories = isMounted ? categories.slice(visibleCount) : [];
    const showMore = isMounted && overflowCategories.length > 0;

    const total = overflowCategories.length;
    const lastRowStart5 = Math.floor((total - 1) / 5) * 5 + 1;
    const lastRowStart4 = Math.floor((total - 1) / 4) * 4 + 1;
    const lastRowStart3 = Math.floor((total - 1) / 3) * 3 + 1;
    const lastRowStart2 = Math.floor((total - 1) / 2) * 2 + 1;

    return (
        <nav ref={navRef} className="bg-teal-900 text-white relative">
            {/* Hidden measurer to calculate widths of each category link dynamically */}
            <div
                ref={measurerRef}
                className="absolute top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0 select-none z-[-1] flex flex-nowrap whitespace-nowrap"
                aria-hidden="true"
            >
                {categories.map((category, index) => (
                    <div
                        key={`measure-${index}`}
                        className="flex items-center px-4 h-12"
                    >
                        {category.name}
                    </div>
                ))}
                <div className="flex items-center px-4 h-12">আরও</div>
            </div>

            <div 
                className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 relative"
                onMouseLeave={() => setMegaMenuOpen(false)}
            >
                <ul ref={ulRef} className="flex-1 flex h-12 space-x-0 min-w-0 overflow-hidden flex-nowrap">
                    {visibleCategories.map((category, index) => (
                        <li
                            key={index}
                            className={`
                                flex whitespace-nowrap
                                cursor-pointer transition
                                hover:bg-teal-800
                                ${isActive(category.href) ? 'bg-teal-950' : ''}
                            `}
                            onMouseEnter={() => setMegaMenuOpen(false)}
                        >
                            <Link href={category.href} className="flex items-center px-4 h-full w-full">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                    {showMore && (
                        <li
                            className={`
                                flex items-center gap-1.5 px-4 whitespace-nowrap
                                cursor-pointer transition select-none
                                hover:bg-teal-800
                                ${megaMenuOpen ? 'bg-teal-800' : ''}
                            `}
                            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                            onMouseEnter={() => setMegaMenuOpen(true)}
                        >
                            <span>আরও</span>
                            <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </li>
                    )}
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
                    onClick={!searchOpen ? () => { setSearchOpen(true); setMegaMenuOpen(false); } : undefined}
                    onMouseEnter={() => setMegaMenuOpen(false)}
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

                {/* Mega Menu Dropdown */}
                {megaMenuOpen && overflowCategories.length > 0 && (
                    <div 
                        className="absolute left-4 right-4 top-full z-40 bg-teal-950 border border-teal-800/60 rounded-b-xl shadow-2xl py-6 px-6 transition-all duration-300"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                        <style>{`
                            .mega-menu-grid > * {
                                border-bottom: 1px solid rgba(13, 148, 136, 0.25);
                            }
                            /* Mobile layout (2 columns) */
                            @media (max-width: 639px) {
                                .mega-menu-grid > *:nth-child(n+${lastRowStart2}) {
                                    border-bottom: none;
                                }
                            }
                            /* Small layout (3 columns) */
                            @media (min-width: 640px) and (max-width: 767px) {
                                .mega-menu-grid > *:nth-child(n+${lastRowStart3}) {
                                    border-bottom: none;
                                }
                            }
                            /* Medium layout (4 columns) */
                            @media (min-width: 768px) and (max-width: 1023px) {
                                .mega-menu-grid > *:nth-child(n+${lastRowStart4}) {
                                    border-bottom: none;
                                }
                            }
                            /* Large layout (5 columns) */
                            @media (min-width: 1024px) {
                                .mega-menu-grid > *:nth-child(n+${lastRowStart5}) {
                                    border-bottom: none;
                                }
                            }
                        `}</style>
                        <div className="mb-2 pb-1.5 border-b border-teal-900/60 flex items-center justify-between">
                            <span className="text-lg font-bold tracking-wider text-teal-400 uppercase">
                                আরও ক্যাটাগরি
                            </span>
                            <span className="text-sm text-teal-500">
                                ({overflowCategories.length}টি)
                            </span>
                        </div>
                        <div className="mega-menu-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {overflowCategories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={category.href}
                                    className={`
                                        flex items-center gap-2 px-3 py-2.5
                                        transition-colors duration-200 group
                                        ${isActive(category.href) ? 'text-white' : 'text-teal-100/90 hover:text-white'}
                                    `}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive(category.href) ? 'bg-teal-400 scale-125' : 'bg-teal-700 group-hover:bg-teal-400'}`}></span>
                                    <span className="text-[17px] text-left">
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
