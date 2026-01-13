'use client';

import React from 'react';
import { Property } from '@/utils/properties';
import Link from 'next/link';

interface PropertyCardProps {
    property: Property;
    onDelete: (id: string | number) => void;
    onDuplicate?: (id: string | number) => void;
    onToggleStatus?: (id: string | number) => void;
}

export default function PropertyCard({ property, onDelete }: PropertyCardProps) {

    const formatPrice = (price: number, currency: string = 'NGN') => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getStatusColor = (status: string | undefined) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'sold': return 'bg-gray-100 text-gray-800';
            case 'let-agreed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 w-full bg-gray-200 relative">
                {/* Image Handling for flat string array */}
                {property.images && property.images[0] ? (
                    <img
                        className="h-full w-full object-cover absolute inset-0"
                        src={property.images[0]}
                        alt={property.title}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-lg shadow-sm ${getStatusColor(property.status)}`}>
                        {property.status || 'available'}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={property.title}>
                        {property.title}
                    </h3>
                </div>

                {/* Flat address access */}
                <p className="text-sm text-gray-500 mb-3">
                    {property.city}, {property.state}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span>{property.bathrooms} Baths</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-brand-green font-bold">
                        {formatPrice(property.price, property.currency)}
                    </span>
                    <div className="flex gap-1">
                        <Link href={`/dashboard/landlord/properties/${property.id}/edit`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Link>
                        <button onClick={() => onDelete(property.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
