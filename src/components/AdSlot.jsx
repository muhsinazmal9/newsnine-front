'use client'

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function AdSlot({ placement, className = '' }) {
    const [ad, setAd] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/ads?placement=${placement}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                const ads = data?.data;
                if (Array.isArray(ads) && ads.length > 0) setAd(ads[0]);
            })
            .catch(() => {});
    }, [placement]);

    if (!ad || imageError) return <div className={className} />;

    if (ad.script) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: ad.script }} />;
    }

    return (
        <div className={className}>
            <a href={ad.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img 
                    src={ad.image} 
                    alt={ad.title} 
                    className="w-full h-full object-cover" 
                    onError={() => setImageError(true)}
                />
            </a>
        </div>
    );
}
