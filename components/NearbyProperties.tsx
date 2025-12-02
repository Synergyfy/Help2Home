'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const nearbyProperties = [
    {
        id: 1,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja.png',
        title: '3 Bedroom Flat, Vgc, Eti-osa, Lagos',
    },
    {
        id: 2,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-1.png',
        title: '3 Bedroom Flat, Vgc, Eti-osa, Lagos',
    },
    {
        id: 3,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-2.png',
        title: '3 Bedroom Flat, Vgc, Eti-osa, Lagos',
    },
    {
        id: 4,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-3.png',
        title: '3 Bedroom Flat, Vgc, Eti-osa, Lagos',
    },
    {
        id: 5,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-4.png',
        title: '3 Bedroom Flat, Vgc, Eti-osa, Lagos',
    },
];

export default function NearbyProperties() {
    return (
        <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 mb-6">Nearby Properties</h3>
            <div className="space-y-6">
                {nearbyProperties.map((property) => (
                    <div key={property.id} className="flex gap-4 items-start">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">{property.title}</h4>
                            <Link
                                href={`/marketplace/${property.id}`}
                                className="inline-block bg-[#00853E] text-white text-xs font-bold px-4 py-1.5 rounded hover:bg-[#006c32] transition-colors"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
