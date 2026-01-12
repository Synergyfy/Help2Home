'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getMockProperties } from '@/utils/properties';

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const urlParams = useParams();
    const role = urlParams?.role as string || 'landlord';

    // Find property by ID or fallback
    const property = getMockProperties().find(p => p.id.toString() === id) || getMockProperties()[0];

    // Updated to handle flat price number and currency
    const formatPrice = (price: number, currency: string = 'NGN') => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Service charges for amenities/utilities (paid upfront, not part of rent)
    const serviceCharges = [
        { name: 'Security', amount: 50000, included: property.security },
        { name: 'Waste Management', amount: 15000, included: true },
        { name: 'Estate Maintenance', amount: 30000, included: property.serviced },
        { name: 'Generator/Power', amount: 25000, included: property.electricity },
    ].filter(charge => charge.included);

    const totalServiceCharges = serviceCharges.reduce((sum, charge) => sum + charge.amount, 0);
    const totalUpfront = property.price + totalServiceCharges;

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href={`/dashboard/${role}/properties`} className="text-gray-500 hover:text-gray-700 text-sm">
                            Properties
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-medium">{property.title}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                    {/* Flat address access */}
                    <p className="text-gray-500">{property.address}, {property.city}, {property.state}</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/dashboard/${role}/properties/${property.id}/edit`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Edit Listing
                    </Link>
                    <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                        View Public Page
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Images & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Gallery - Handles string array of images */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-96 bg-gray-200 relative">
                            {property.images && property.images[0] ? (
                                <img src={property.images[0]} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-4 flex gap-2 overflow-x-auto">
                            {property.images?.map((imgUrl, index) => (
                                <div key={index} className="h-20 w-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-brand-green">
                                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <div className="prose max-w-none text-gray-600 mb-6">
                            <p>{property.description || "No description provided for this listing."}</p>
                        </div>

                        {/* Keywords/Tags */}
                        {property.keywords && property.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                {property.keywords.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full capitalize">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Infrastructure & Support */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Infrastructure & Utilities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${property.electricity ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                                <span className={`text-xs font-bold uppercase tracking-wider ${property.electricity ? 'text-green-700' : 'text-gray-400'}`}>Electricity</span>
                                <span className={`text-xs ${property.electricity ? 'text-green-600' : 'text-gray-400'}`}>{property.electricity ? 'Constant' : 'Variable'}</span>
                            </div>
                            <div className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${property.waterSupply ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                                <span className={`text-xs font-bold uppercase tracking-wider ${property.waterSupply ? 'text-green-700' : 'text-gray-400'}`}>Water Supply</span>
                                <span className={`text-xs ${property.waterSupply ? 'text-green-600' : 'text-gray-400'}`}>{property.waterSupply ? 'Available' : 'Limited'}</span>
                            </div>
                            <div className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${property.security ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                                <span className={`text-xs font-bold uppercase tracking-wider ${property.security ? 'text-green-700' : 'text-gray-400'}`}>Security</span>
                                <span className={`text-xs ${property.security ? 'text-green-600' : 'text-gray-400'}`}>{property.security ? 'Gated/Guard' : 'Standard'}</span>
                            </div>
                            <div className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${property.serviced ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                                <span className={`text-xs font-bold uppercase tracking-wider ${property.serviced ? 'text-green-700' : 'text-gray-400'}`}>Serviced</span>
                                <span className={`text-xs ${property.serviced ? 'text-green-600' : 'text-gray-400'}`}>{property.serviced ? 'Fully Managed' : 'Self-MGD'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Amenities - Using your flat array */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.amenities.map(amenity => (
                                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="capitalize">{amenity.replace(/-/g, ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Stats & Actions */}
                <div className="space-y-6">
                    {/* Price Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">Price</span>
                            <div className="text-3xl font-bold text-brand-green">
                                {formatPrice(property.price, property.currency)}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Status</span>
                                <span className={`font-medium px-2 py-0.5 rounded-full uppercase text-[10px] ${property.status === 'available' ? 'bg-green-100 text-green-800' :
                                    property.status === 'sold' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {property.status || 'available'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Views</span>
                                <span className="font-medium text-gray-900">{property.views || 0}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Inquiries</span>
                                <span className="font-medium text-gray-900">{property.inquiries || 0}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span className="text-gray-600 text-xs">Listed on</span>
                                <span className="font-medium text-gray-400 text-xs">
                                    {property.dateAdded ? new Date(property.dateAdded).toLocaleDateString() : 'Dec 28, 2023'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Specs Card - Direct flat access */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Property Specs</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Type</span>
                                <span className="font-medium text-gray-900 capitalize">{property.propertyType?.replace(/-/g, ' ')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Bedrooms</span>
                                <span className="font-medium text-gray-900">{property.bedrooms}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Bathrooms</span>
                                <span className="font-medium text-gray-900">{property.bathrooms}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Floor Size</span>
                                <span className="font-medium text-gray-900">{property.floorSize ? `${property.floorSize} sqm` : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Furnished</span>
                                <span className="font-medium text-gray-900">{property.furnished ? 'Fully Furnished' : 'Unfurnished'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Ownership</span>
                                <span className="font-medium text-brand-green capitalize">{property.ownership || 'Freehold'}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                                <span className="text-gray-600">Category</span>
                                <span className="font-medium text-gray-900 capitalize text-xs">{property.category?.replace(/-/g, ' ')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Service Charges Card */}
                    <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="font-bold text-blue-900">Service Charges</h3>
                        </div>
                        <p className="text-xs text-blue-700 mb-4">
                            The following charges cover utilities and amenities. Paid upfront (not part of monthly rent).
                        </p>
                        <div className="space-y-2">
                            {serviceCharges.map(charge => (
                                <div key={charge.name} className="flex justify-between text-sm">
                                    <span className="text-blue-800">{charge.name}</span>
                                    <span className="font-semibold text-blue-900">{formatPrice(charge.amount, property.currency)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between text-sm pt-2 border-t border-blue-200">
                                <span className="font-bold text-blue-900">Total Service Charges</span>
                                <span className="font-bold text-blue-900">{formatPrice(totalServiceCharges, property.currency)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Total Upfront Payment Card */}
                    <div className="bg-linear-to-br from-brand-green to-green-700 p-6 rounded-xl shadow-lg text-white">
                        <h3 className="font-bold text-lg mb-2">Total Upfront Payment</h3>
                        <p className="text-white/80 text-xs mb-4">
                            First payment includes rent + service charges
                        </p>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/90">Rent</span>
                                <span className="font-medium">{formatPrice(property.price, property.currency)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/90">Service Charges</span>
                                <span className="font-medium">{formatPrice(totalServiceCharges, property.currency)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-white/20">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl">{formatPrice(totalUpfront, property.currency)}</span>
                        </div>
                    </div>

                    {/* Installments Card - Based on marketplace logic */}
                    {property.isInstallmentAllowed && (
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-green-900">Installments Available</h3>
                            </div>
                            <p className="text-xs text-green-700 leading-relaxed mb-4">
                                This property supports flexible payment plans tailored to your budget.
                            </p>
                            <button className="w-full py-2 bg-brand-green text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors">
                                View Payment Plan
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
