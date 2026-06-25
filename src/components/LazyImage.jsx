'use client'

import { useState, useRef, useEffect } from 'react'

const PLACEHOLDER = 'https://placehold.co/600x400'

/**
 * Lazy, blur-to-reveal image.
 *
 * - Renders a shimmering skeleton until the real image has loaded.
 * - Defers the actual network request until the element scrolls near the
 *   viewport (IntersectionObserver), so off-screen images never block.
 * - On load the image fades in and un-blurs ("blur to reveal").
 *
 * `className` controls the wrapper's size/position (e.g. "w-full h-48",
 * "absolute inset-0", "w-16 h-12 flex-shrink-0", "aspect-video").
 * `imgClassName` controls how the <img> fills that wrapper.
 */
export default function LazyImage({
    src,
    alt = '',
    className = '',
    imgClassName = 'w-full h-full object-cover',
}) {
    const [inView, setInView] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            // Start loading a bit before the image actually enters the viewport
            // so it is usually ready by the time the user reaches it.
            { rootMargin: '300px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // The wrapper must be its own positioning context for the absolute skeleton
    // overlay. Only add `relative` when the caller hasn't already supplied a
    // position class (e.g. "absolute inset-0" for full-bleed heroes) — otherwise
    // the two conflict and the image falls back into normal flow.
    const hasPosition = /(?:^|\s)(?:absolute|fixed|relative|sticky)(?:\s|$)/.test(className)

    return (
        <span ref={ref} className={`${hasPosition ? '' : 'relative'} block overflow-hidden bg-stone-200 ${className}`}>
            {/* Shimmer skeleton — fades out once the image is ready */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 skeleton-shimmer transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
            />

            {inView && (
                <img
                    src={src || PLACEHOLDER}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                    className={`${imgClassName} transition-[opacity,filter,transform] duration-700 ease-out ${
                        loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-105'
                    }`}
                />
            )}
        </span>
    )
}
