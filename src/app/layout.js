'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './globals.css';

const categories = [
  { name: 'প্রচ্ছদ', active: true, href: '/' },
  { name: 'জাতীয়', active: false, href: '/single-category' },
  { name: 'রাজনীতি', active: false, href: '/single-category' },
  { name: 'আন্তর্জাতিক', active: false, href: '/single-category' },
  { name: 'অর্থনীতি', active: false, href: '/single-category' },
  { name: 'খেলা', active: false, href: '/single-category' },
  { name: 'বিনোদন', active: false, href: '/single-category' },
  { name: 'লাইফ স্টাইল', active: false, href: '/single-category' },
  { name: 'মতামত', active: false, href: '/single-category' },
  { name: 'ভিডিও', active: false, href: '/single-category' }
];

export default function MainLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  return (
    <html>
      <body>
        <div className="min-h-screen bg-stone-100 font-tiro">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <Link href="/">
                  <img src="/images/NewsNine.jpg" alt="Logo" />
                </Link>
                {/* Ad area */}
                <div className="w-full h-24 bg-stone-200">
                  <p className="text-center text-stone-500"></p>
                </div>
              </div>
            </div>
          </header>

          {/* Navigation */}
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
                        ${category.active ? 'bg-teal-950' : ''}
                    `}
                  >
                    <Link href={category.href}>{category.name}</Link>
                  </li>
                ))}
                <li className='flex items-center px-4 cursor-pointer transition hover:bg-teal-800'>আরও</li>
              </ul>
              {/* search */}
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
                onClick={!searchOpen ? handleSearchClick : undefined}
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
                      className="flex-1 h-9 px-3 rounded text-white outline-none"
                    />

                    <Link href="/search-result" className="px-3 py-1 bg-teal-700 rounded cursor-pointer">
                      অনুসন্ধান
                    </Link>

                    <button
                      onClick={() => setSearchOpen(false)}
                      className="px-3 py-1 bg-red-600 rounded cursor-pointer"
                    >
                      বাতিল
                    </button>
                  </>
                )}
              </div>

            </div>
          </nav>

          <main className='pt-6'>
            {children}
          </main>

          <footer className="bg-teal-950 text-teal-100">
            <div className="max-w-7xl mx-auto px-4 pt-12 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: Publication Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white">
                    NewsNine24.com
                  </h3>

                  <p className="text-sm leading-relaxed text-stone-300">
                    সম্পাদকঃ মুহম্মদ ইব্রাহিম সোহেল
                    <br />
                    ইমেইলঃ{" "}
                    <a
                      href="mailto:newsnine24@gmail.com"
                      className="hover:underline text-blue-300"
                    >
                      info@newsnine24.com
                    </a>
                    <br />
                    ৬/২ শান্তিবাগ, ঢাকা ১২১৭
                  </p>
                </div>

                {/* Right: Optional Links / Meta */}
                <div className="md:text-right text-sm text-stone-300">
                  <ul className="space-y-2">
                    <li className="hover:text-white cursor-pointer">
                      আমাদের সম্পর্কে
                    </li>
                    <li className="hover:text-white cursor-pointer">
                      যোগাযোগ
                    </li>
                    <li className="hover:text-white cursor-pointer">
                      গোপনীয়তা নীতি
                    </li>
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-teal-900 my-4"></div>

              {/* Bottom */}
              <div className="text-center text-xs text-stone-400">
                স্বত্ব © ২০১৬–২০২৬ নিউজনাইন২৪ ডটকম
              </div>
            </div>
          </footer>

          {/* Developed by */}
          <div className="text-center text-xs text-stone-300 bg-stone-950 py-2">
            Developed with <span className="text-red-500">❤</span> by <a href="https://muhsinazmal.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">Muhsin</a>
          </div>
        </div>
      </body>
    </html>
  );
}
