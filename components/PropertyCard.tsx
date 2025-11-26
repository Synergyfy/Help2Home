'use client';

import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

interface PropertyCardProps {
    id: number | string;
    image: string;
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
    price: string;
}

export default function PropertyCard({
    id,
    image,
    title,
    location,
    bedrooms,
    bathrooms,
    description,
    price
}: PropertyCardProps) {
    return (
        <Link href={`/dashboard/tenant/marketplace/${id}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-64 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#00853E] transition-colors">{title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{location}</p>

                    {/* Features */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>AMAC</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>{bedrooms} Bedroom</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>{bathrooms} Bathrooms</span>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 font-medium line-clamp-2">
                        {description}
                    </p>

                    <div className="text-lg font-bold text-gray-900">
                        {price}
                    </div>
                </div>
            </div>
        </Link>
    );
}
