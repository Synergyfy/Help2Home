'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProperties } from '@/utils/properties';

interface NearbyPropertiesProps {
    currentPropertyId?: number;
    location?: string;
}

export default function NearbyProperties({ currentPropertyId, location }: NearbyPropertiesProps) {

    const nearby = mockProperties
        .filter(p =>
            p.location === location && // Match location
            p.id !== currentPropertyId   // Exclude current
        )
        .slice(0, 5); // Limit to top 5 results

    // Fallback: If no properties are in the exact same location, 
    // show any other featured properties so the sidebar isn't empty.
    const displayProperties = nearby.length > 0
        ? nearby
        : mockProperties.filter(p => p.id !== currentPropertyId).slice(0, 5);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-green rounded-full"></span>
                Nearby Properties
            </h3>

            <div className="space-y-6">
                {displayProperties.map((property) => (
                    <div key={property.id} className="flex gap-4 items-center group">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-50">
                            <Image
                                src={property.images?.[0] || '/placeholder.jpg'}
                                alt={property.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 mb-1 truncate">
                                {property.title}
                            </h4>
                            <p className="text-xs text-brand-green font-black mb-2">
                                {property.price.toLocaleString('en-NG', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    maximumFractionDigits: 0
                                })}
                            </p>
                            <Link
                                href={`/marketplace/${property.id}`}
                                className="text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-brand-green transition-colors"
                            >
                                View Details →
                            </Link>
                        </div>
                    </div>
                ))}

                {displayProperties.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No other properties nearby.</p>
                )}
            </div>
        </div>
    );
}
