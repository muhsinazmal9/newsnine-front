'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
    FaFacebook, FaWhatsapp, FaTelegramPlane, FaLinkedin,
    FaEnvelope, FaRedditAlien, FaPinterest, FaTumblr,
    FaShareAlt, FaLink, FaCheck,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { RiZoomInFill, RiZoomOutFill } from 'react-icons/ri'
import LazyImage from '@/components/LazyImage'

const PLACEHOLDER = 'https://placehold.co/300x200'
const SIZES = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

const PLATFORMS = [
    { name: 'ফেসবুক',      icon: FaFacebook,      bg: 'bg-[#1877F2]' },
    { name: 'হোয়াটসঅ্যাপ', icon: FaWhatsapp,      bg: 'bg-[#25D366]' },
    { name: 'টেলিগ্রাম',   icon: FaTelegramPlane, bg: 'bg-[#2AABEE]' },
    { name: 'টুইটার',      icon: FaXTwitter,      bg: 'bg-black'     },
    { name: 'লিংকডইন',    icon: FaLinkedin,      bg: 'bg-[#0A66C2]' },
    { name: 'ইমেইল',      icon: FaEnvelope,      bg: 'bg-stone-500' },
    { name: 'রেডিট',      icon: FaRedditAlien,   bg: 'bg-[#FF4500]' },
    { name: 'পিন্টারেস্ট', icon: FaPinterest,     bg: 'bg-[#E60023]' },
    { name: 'টাম্বলার',    icon: FaTumblr,        bg: 'bg-[#35465C]' },
]

function buildHref(name, url, title) {
    const enc = encodeURIComponent
    switch (name) {
        case 'ফেসবুক':      return `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`
        case 'হোয়াটসঅ্যাপ': return `https://wa.me/?text=${enc(title + ' ' + url)}`
        case 'টেলিগ্রাম':   return `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`
        case 'টুইটার':      return `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`
        case 'লিংকডইন':    return `https://www.linkedin.com/shareArticle?mini=true&url=${enc(url)}&title=${enc(title)}`
        case 'ইমেইল':      return `mailto:?subject=${enc(title)}&body=${enc(url)}`
        case 'রেডিট':      return `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}`
        case 'পিন্টারেস্ট': return `https://pinterest.com/pin/create/button/?url=${enc(url)}`
        case 'টাম্বলার':    return `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${enc(url)}&title=${enc(title)}`
        default:            return '#'
    }
}

function formatDate(value) {
    if (!value) return ''
    try {
        return new Date(value).toLocaleString('bn-BD', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
        })
    } catch {
        return ''
    }
}

function toEmbedUrl(url) {
    if (!url) return null
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`
    const vimeo = url.match(/vimeo\.com\/(\d+)/)
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
    return url
}

export default function ArticleBody({ article }) {
    const [sizeIdx, setSizeIdx] = useState(1)
    const [pageUrl, setPageUrl] = useState('')
    const [shareOpen, setShareOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const shareRef = useRef(null)

    useEffect(() => {
        setPageUrl(window.location.href)
    }, [])

    // Close on outside click
    useEffect(() => {
        if (!shareOpen) return
        const handler = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) {
                setShareOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [shareOpen])

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl)
        } catch {
            const el = document.createElement('textarea')
            el.value = pageUrl
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const paragraphs = (article.content || '').split('\n').filter(p => p.trim() !== '')
    const embedUrl = toEmbedUrl(article.video_url)
    const gallery = Array.isArray(article.gallery) ? article.gallery.filter(Boolean) : []

    return (
        <>
            <div className='border-y border-stone-200 py-2 flex justify-between mb-4'>
                <div className='flex items-center gap-4 text-stone-600 text-sm'>
                    <p>{article.author?.name}</p>
                    <div className='w-px h-4 bg-stone-300' />
                    <p>প্রকাশ: {formatDate(article.published_at)}</p>
                </div>

                <div className='flex items-center gap-3 text-stone-600 text-xl'>

                    {/* Share button + panel */}
                    <div className="relative" ref={shareRef}>
                        <button
                            onClick={() => setShareOpen(o => !o)}
                            className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-800 border border-stone-300 hover:border-stone-400 rounded-md px-3 py-1 transition cursor-pointer"
                        >
                            <FaShareAlt className="text-base" />
                            শেয়ার করুন
                        </button>

                        {/* Floating panel — always in DOM, animated via classes */}
                        <div
                            className={`
                                absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl
                                border border-stone-200 z-50 p-4 origin-top-right
                                transition-all duration-200 ease-out
                                ${shareOpen
                                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}
                            `}
                        >
                            <p className="text-sm font-semibold text-stone-700 mb-4">শেয়ার করুন</p>

                            {/* 3×3 platform grid */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {PLATFORMS.map(({ name, icon: Icon, bg }) => (
                                    <a
                                        key={name}
                                        href={pageUrl ? buildHref(name, pageUrl, article.title) : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setShareOpen(false)}
                                        className="flex flex-col items-center gap-1.5 group"
                                    >
                                        <div className={`${bg} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-transform duration-150 group-hover:scale-110`}>
                                            <Icon />
                                        </div>
                                        <span className="text-xs text-stone-500 text-center leading-tight">{name}</span>
                                    </a>
                                ))}
                            </div>

                            {/* Copy link bar */}
                            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                                <span className="flex-1 px-3 py-2 text-xs text-stone-400 truncate select-all">{pageUrl}</span>
                                <button
                                    onClick={copyLink}
                                    className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-600 text-white text-xs px-4 py-2 transition whitespace-nowrap cursor-pointer"
                                >
                                    {copied ? <><FaCheck /> কপি হয়েছে</> : <><FaLink /> লিংক কপি</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-px h-4 bg-stone-300' />
                    <button onClick={() => setSizeIdx(i => Math.max(0, i - 1))} className='transition-colors cursor-pointer hover:text-stone-800'><RiZoomOutFill /></button>
                    <button onClick={() => setSizeIdx(i => Math.min(SIZES.length - 1, i + 1))} className='transition-colors cursor-pointer hover:text-stone-800'><RiZoomInFill /></button>
                </div>
            </div>

            <article className='rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden bg-white'>
                <figure className='space-y-3'>
                    <LazyImage src={article.image || PLACEHOLDER} alt={article.title} className="w-full aspect-video" />
                    {(article.image_caption || article.image_credit) && (
                        <figcaption className='text-center text-sm text-stone-500 italic'>
                            {article.image_caption}{article.image_credit ? ` | ছবি: ${article.image_credit}` : ''}
                        </figcaption>
                    )}
                </figure>

                {embedUrl && (
                    <div className="aspect-video">
                        <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                <section className={`p-6 space-y-6 text-stone-700 leading-8 ${SIZES[sizeIdx]}`}>
                    {paragraphs.map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
                </section>

                {gallery.length > 0 && (
                    <div className="px-6 pb-6">
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {gallery.map((img, i) => (
                                <LazyImage key={i} src={img} alt="" className="w-64 h-48 flex-shrink-0 rounded-sm" />
                            ))}
                        </div>
                    </div>
                )}

                {article.tags?.length > 0 && (
                    <footer className='p-6 border-t border-stone-100'>
                        <div className="flex flex-wrap items-center gap-2 text-stone-700 text-sm">
                            <strong>বিষয়:</strong>
                            {article.tags.map((tag) => (
                                <Link key={tag.id} href={`/tag/${tag.slug}`} className="bg-stone-100 hover:bg-stone-200 border border-stone-200 px-3 py-1 rounded-sm transition">{tag.name}</Link>
                            ))}
                        </div>
                    </footer>
                )}
            </article>
        </>
    )
}
