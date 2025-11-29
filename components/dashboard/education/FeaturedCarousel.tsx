'use client';

import React from 'react';
import Link from 'next/link';
import { EducationContent } from './types';

interface FeaturedCarouselProps {
    featured: EducationContent[];
}

export default function FeaturedCarousel({ featured }: FeaturedCarouselProps) {
    if (featured.length === 0) return null;

    // For simplicity in this MVP, we'll just show the first featured item as a large hero card
    // In a real app, this would be a proper slider
    const item = featured[0];

    return (
        <div className="mb-8 group relative rounded-2xl overflow-hidden bg-gray-900 text-white shadow-lg h-[300px] md:h-[400px]">
            <div className="absolute inset-0 opacity-60">
                {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#00853E] to-[#003366]" />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#00853E] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        Featured
                    </span>
                    <span className="text-sm font-medium text-gray-300">{item.category}</span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                    {item.title}
                </h2>

                <p className="text-gray-300 mb-6 line-clamp-2 md:text-lg">
                    {item.summary}
                </p>

                <Link
                    href={`/dashboard/tenant/education/${item.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {item.format === 'video' ? 'Watch Now' : 'Read Article'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
