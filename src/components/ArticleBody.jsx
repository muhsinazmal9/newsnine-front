'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { RiZoomInFill, RiZoomOutFill } from 'react-icons/ri'
import LazyImage from '@/components/LazyImage'

const PLACEHOLDER = 'https://placehold.co/300x200'
const SIZES = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

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
    const [shareLinks, setShareLinks] = useState(null)

    useEffect(() => {
        const url = window.location.href
        const enc = encodeURIComponent
        setShareLinks({
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(article.title)}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${enc(url)}&title=${enc(article.title)}`,
            whatsapp: `https://wa.me/?text=${enc(article.title + ' ' + url)}`,
        })
    }, [article.title])

    const paragraphs = (article.content || '').split('\n').filter(p => p.trim() !== '')
    const embedUrl = toEmbedUrl(article.video_url)
    const gallery = Array.isArray(article.gallery) ? article.gallery.filter(Boolean) : []

    return (
        <>
            <div className='border-y border-stone-200 py-2 flex justify-between mb-4'>
                <div className='flex items-center gap-4 text-stone-600 text-sm'>
                    <p>{article.author?.name}</p>
                    <div className='w-px h-4 bg-stone-300'></div>
                    <p>প্রকাশ: {formatDate(article.published_at)}</p>
                </div>
                <div className='flex items-center gap-3 text-stone-600 text-xl'>
                    <a href={shareLinks?.facebook || '#'} target="_blank" rel="noopener noreferrer" className='transition-colors cursor-pointer hover:text-stone-800'><FaFacebook /></a>
                    <a href={shareLinks?.twitter || '#'} target="_blank" rel="noopener noreferrer" className='transition-colors cursor-pointer hover:text-stone-800'><FaTwitter /></a>
                    <a href={shareLinks?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className='transition-colors cursor-pointer hover:text-stone-800'><FaLinkedin /></a>
                    <a href={shareLinks?.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className='transition-colors cursor-pointer hover:text-stone-800'><FaWhatsapp /></a>
                    <div className='w-px h-4 bg-stone-300'></div>
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
