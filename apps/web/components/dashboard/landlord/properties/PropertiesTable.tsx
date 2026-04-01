'use client';

import React from 'react';
import { Property } from '@/utils/properties';
import Link from 'next/link';
import Image from 'next/image';

interface PropertiesTableProps {
    properties: Property[];
    onDelete: (id: number | string) => void;
    onDuplicate: (id: number | string) => void;
    onToggleStatus: (id: number | string) => void;
}

export default function PropertiesTable({ properties, onDelete }: PropertiesTableProps) {

    const formatPrice = (price: number, currency: string = 'NGN') => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-12 w-16 shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                                        {/* property.images is an array of strings */}
                                        {property.images?.[0] && (
                                            <Image className="object-cover" src={property.images[0]} alt="" fill sizes="64px" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                        <div className="text-[10px] text-gray-400">ID: {property.id}</div>
                                    </div>
                                </div>
                            </td>
                            {/* Accessing flat fields */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {property.city}, {property.state}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {formatPrice(property.price, property.currency)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-green-100 text-green-800 uppercase">
                                    {property.status || 'available'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-3">
                                    <Link href={`/dashboard/landlord/properties/${property.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </Link>
                                    <button onClick={() => onDelete(property.id)} className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
