'use client'

import { useState } from 'react'
import Image from 'next/image'

const PLACEHOLDER = 'https://placehold.co/600x400'

/**
 * Blur-to-reveal image backed by next/image.
 *
 * next/image handles lazy loading, WebP/AVIF conversion, and responsive srcset.
 * This wrapper adds a shimmer skeleton + blur-up fade-in on top.
 *
 * `className`    — controls the wrapper's size/position (e.g. "w-full h-48", "absolute inset-0")
 * `imgClassName` — controls how the image fills that wrapper (default: cover)
 * `sizes`        — forwarded to next/image for responsive srcset selection
 * `priority`     — set true for above-the-fold images to skip lazy loading
 */
export default function LazyImage({
    src,
    alt = '',
    className = '',
    imgClassName = 'object-cover',
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority = false,
}) {
    const [loaded, setLoaded] = useState(false)

    // Only add `relative` when the caller hasn't supplied a position class
    // (e.g. "absolute inset-0" for full-bleed heroes already establishes context)
    const hasPosition = /(?:^|\s)(?:absolute|fixed|relative|sticky)(?:\s|$)/.test(className)

    return (
        <span className={`${hasPosition ? '' : 'relative'} block overflow-hidden bg-stone-200 ${className}`}>
            {/* Shimmer skeleton — fades out once the image is ready */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 skeleton-shimmer transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
            />

            <Image
                src={src || PLACEHOLDER}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
                className={`${imgClassName} transition-[opacity,filter,transform] duration-700 ease-out ${
                    loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-105'
                }`}
            />
        </span>
    )
}
