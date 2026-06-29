import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import AdSlot from '@/components/AdSlot'
import NavBar from '@/components/NavBar'
import QueryProvider from '@/components/QueryProvider'
import SubscribeForm from '@/components/SubscribeForm'
import { getMenuCategories, getSettings } from '@/lib/api'
import './globals.css'

export const metadata = {
    title: { template: '%s | NewsNine24', default: 'NewsNine24' },
    description: 'বাংলাদেশের সর্বশেষ সংবাদ',
}

export default async function MainLayout({ children }) {
    const [categoriesData, settings] = await Promise.all([getMenuCategories(), getSettings()])

    const navCategories = [
        { name: 'প্রচ্ছদ', href: '/' },
        ...categoriesData.map(cat => ({ name: cat.name, href: `/${cat.slug}` })),
    ]

    const logo = settings?.logo || '/images/NewsNine.jpg'
    const siteName = settings?.site_name || 'NewsNine24.com'
    const editorName = settings?.editor_name || ''
    const email = settings?.contact_email || ''
    const address = settings?.address || ''
    const copyright = settings?.copyright || `স্বত্ব © ২০১৬–২০২৬ ${siteName}`
    const social = settings?.social || {}

    return (
        <html>
            <body>
                <QueryProvider>
                <div className="min-h-screen bg-stone-100 font-tiro">
                    <header className="bg-white">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between gap-4">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt={siteName}
                                        width={240}
                                        height={64}
                                        priority
                                        className="h-16 w-auto object-contain"
                                    />
                                </Link>
                                <AdSlot placement="header" className="w-full h-24 bg-stone-200" />
                            </div>
                        </div>
                    </header>

                    <NavBar categories={navCategories} />

                    <main className='pt-6'>
                        {children}
                    </main>

                    <footer className="bg-teal-950 text-teal-100">
                        <div className="max-w-7xl mx-auto px-4 pt-12 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left: Publication Info */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-white">{siteName}</h3>
                                    <p className="text-sm leading-relaxed text-stone-300">
                                        {editorName && <>{`সম্পাদকঃ ${editorName}`}<br /></>}
                                        {email && <>ইমেইলঃ{' '}
                                            <a href={`mailto:${email}`} className="hover:underline text-blue-300">{email}</a>
                                            <br />
                                        </>}
                                        {address}
                                    </p>
                                    {Object.values(social).some(Boolean) && (
                                        <div className="flex gap-3 mt-4 text-xl">
                                            {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaFacebook /></a>}
                                            {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTwitter /></a>}
                                            {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaYoutube /></a>}
                                            {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaInstagram /></a>}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Links + Newsletter */}
                                <div className="md:text-right text-sm text-stone-300">
                                    <ul className="space-y-2 mb-6">
                                        <li><Link href="/about" className="hover:text-white">আমাদের সম্পর্কে</Link></li>
                                        <li><Link href="/contact" className="hover:text-white">যোগাযোগ</Link></li>
                                        <li><Link href="/privacy" className="hover:text-white">গোপনীয়তা নীতি</Link></li>
                                    </ul>
                                    <p className="text-white font-semibold mb-1">নিউজলেটার সাবস্ক্রাইব করুন</p>
                                    <SubscribeForm />
                                </div>
                            </div>

                            <div className="border-t border-teal-900 my-4"></div>

                            <div className="text-center text-xs text-stone-400">
                                {copyright}
                            </div>
                        </div>
                    </footer>

                    <div className="text-center text-xs text-stone-300 bg-stone-950 py-2">
                        Developed with <span className="text-red-500">❤</span> by <a href="https://muhsinazmal.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">Muhsin</a>
                    </div>
                </div>
                </QueryProvider>
            </body>
        </html>
    )
}
