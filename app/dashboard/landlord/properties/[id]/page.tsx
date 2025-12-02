'use client';

import React from 'react';
import Link from 'next/link';
import { mockProperties } from '@/lib/mockLandlordData';

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = mockProperties.find(p => p.id === params.id) || mockProperties[0];

    const formatPrice = (price: any) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: price.currency,
            maximumFractionDigits: 0,
        }).format(price.amount) + (price.period ? ` / ${price.period}` : '');
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href="/dashboard/landlord/properties" className="text-gray-500 hover:text-gray-700 text-sm">
                            Properties
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-medium">{property.title}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                    <p className="text-gray-500">{property.address.street}, {property.address.city}, {property.address.state}</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/dashboard/landlord/properties/${property.id}/edit`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Edit Listing
                    </Link>
                    <button className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                        View Public Page
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Images & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Gallery */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-96 bg-gray-200 relative">
                            {property.images[0] ? (
                                <img src={property.images[0].url} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-4 flex gap-2 overflow-x-auto">
                            {property.images.map((img) => (
                                <div key={img.id} className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-[#00853E]">
                                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <div className="prose max-w-none text-gray-600">
                            <p>This is a mock description for the property. In a real application, this would be the full rich text description provided by the landlord.</p>
                            <p>It includes details about the neighborhood, nearby amenities, and unique features of the property.</p>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property.amenities.map(amenity => (
                                <div key={amenity} className="flex items-center gap-2 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Actions */}
                <div className="space-y-6">
                    {/* Price Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">Price</span>
                            <div className="text-3xl font-bold text-[#00853E]">
                                {formatPrice(property.price)}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Status</span>
                                <span className="font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                                    {property.status}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Views</span>
                                <span className="font-medium text-gray-900">{property.metrics.views}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Applications</span>
                                <span className="font-medium text-gray-900">{property.metrics.applications}</span>
                            </div>
                        </div>
                    </div>

                    {/* Specs Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Property Specs</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Type</span>
                                <span className="font-medium text-gray-900">{property.type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Bedrooms</span>
                                <span className="font-medium text-gray-900">{property.specs.bedrooms}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Bathrooms</span>
                                <span className="font-medium text-gray-900">{property.specs.bathrooms}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Size</span>
                                <span className="font-medium text-gray-900">{property.specs.area} {property.specs.areaUnit}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Furnishing</span>
                                <span className="font-medium text-gray-900">{property.specs.furnishing}</span>
                            </div>
                        </div>
                    </div>

                    {/* Installments Card */}
                    {property.installments?.enabled && (
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Installments Available</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                This property accepts monthly payments.
                            </p>
                            <div className="space-y-2 text-sm text-blue-800">
                                <div className="flex justify-between">
                                    <span>Min Deposit:</span>
                                    <span className="font-bold">{property.installments.depositPercent}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tenures:</span>
                                    <span className="font-bold">{property.installments.tenures?.join(', ')} months</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
