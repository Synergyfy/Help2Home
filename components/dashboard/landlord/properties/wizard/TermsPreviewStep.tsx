'use client';

import React from 'react';

interface TermsPreviewStepProps {
    data: any;
    updateData: (data: any) => void;
}

export default function TermsPreviewStep({ data, updateData }: TermsPreviewStepProps) {
    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency || 'NGN',
            maximumFractionDigits: 0,
        }).format(amount || 0);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Description & Terms */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description & Terms</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={140}
                            value={data.description?.short || ''}
                            onChange={(e) => updateData({ description: { ...data.description, short: e.target.value } })}
                            placeholder="Brief summary for search results (max 140 chars)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                        <p className="text-xs text-gray-500 text-right mt-1">
                            {(data.description?.short?.length || 0)}/140
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Long Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={6}
                            value={data.description?.long || ''}
                            onChange={(e) => updateData({ description: { ...data.description, long: e.target.value } })}
                            placeholder="Detailed description of the property, neighborhood, and features..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Available From
                            </label>
                            <input
                                type="date"
                                value={data.terms?.availableFrom || ''}
                                onChange={(e) => updateData({ terms: { ...data.terms, availableFrom: e.target.value } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Tenancy
                            </label>
                            <select
                                value={data.terms?.minTenancy || '12'}
                                onChange={(e) => updateData({ terms: { ...data.terms, minTenancy: e.target.value } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E] bg-white"
                            >
                                <option value="6">6 Months</option>
                                <option value="12">1 Year</option>
                                <option value="24">2 Years</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Preview Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Listing Preview</h2>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-64 bg-gray-200 relative">
                        {data.images && data.images.find((img: any) => img.isPrimary) ? (
                            <img
                                src={data.images.find((img: any) => img.isPrimary).url}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                No Cover Photo
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold">
                            {formatPrice(data.price?.amount, data.price?.currency)}
                            {data.price?.period && <span className="text-xs font-normal text-gray-600">/{data.price.period}</span>}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{data.title || 'Untitled Property'}</h3>
                                <p className="text-gray-500">{data.address?.city || 'City'}, {data.address?.state || 'State'}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                {data.listingType}
                            </span>
                        </div>

                        <div className="flex gap-4 text-sm text-gray-600 my-4">
                            <span>{data.specs?.bedrooms || 0} Beds</span>
                            <span>•</span>
                            <span>{data.specs?.bathrooms || 0} Baths</span>
                            <span>•</span>
                            <span>{data.specs?.area || 0} {data.specs?.areaUnit}</span>
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-600">
                            <p>{data.description?.short || 'No description provided.'}</p>
                        </div>

                        {data.installments?.enabled && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    Monthly Installments Available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
