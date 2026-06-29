'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getAd } from '@/lib/api'

export default function AdSlot({ placement, className = '' }) {
    const [imageError, setImageError] = useState(false)

    const { data: ad } = useQuery({
        queryKey: ['ad', placement],
        queryFn: () => getAd(placement),
        staleTime: 5 * 60 * 1000,
    })

    if (!ad || imageError) return <div className={className} />

    if (ad.script) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: ad.script }} />
    }

    return (
        <div className={`relative ${className}`}>
            <a href={ad.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <Image
                    src={ad.image}
                    alt={ad.title || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    onError={() => setImageError(true)}
                />
            </a>
        </div>
    )
}
