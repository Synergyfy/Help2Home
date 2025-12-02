'use client';

import React from 'react';
import { Property } from '@/lib/mockLandlordData';
import Link from 'next/link';

interface PropertiesTableProps {
    properties: Property[];
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export default function PropertiesTable({ properties, onDelete, onDuplicate, onToggleStatus }: PropertiesTableProps) {
    const formatPrice = (price: Property['price']) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: price.currency,
            maximumFractionDigits: 0,
        }).format(price.amount) + (price.period ? ` / ${price.period}` : '');
    };

    const getStatusColor = (status: Property['status']) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800';
            case 'Draft': return 'bg-gray-100 text-gray-800';
            case 'Paused': return 'bg-yellow-100 text-yellow-800';
            case 'Under Review': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Apps
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-12 w-16 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-200">
                                        {/* Placeholder for image if not present or fails */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                                            No Img
                                        </div>
                                        {property.images[0] && (
                                            <img className="h-full w-full object-cover absolute inset-0" src={property.images[0].url} alt="" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]" title={property.title}>
                                            {property.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Last updated: {new Date(property.metrics.lastUpdated).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {property.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {property.address.city}, {property.address.state}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatPrice(property.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(property.status)}`}>
                                    {property.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link href={`/dashboard/landlord/properties/${property.id}/applications`} className="text-[#00853E] hover:underline font-medium">
                                    {property.metrics.applications}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-3">
                                    <Link href={`/dashboard/landlord/properties/${property.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </Link>
                                    <button onClick={() => onToggleStatus(property.id)} className="text-gray-600 hover:text-gray-900">
                                        {property.status === 'Published' ? 'Pause' : 'Publish'}
                                    </button>
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
