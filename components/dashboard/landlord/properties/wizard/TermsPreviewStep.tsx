'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';

export default function TermsPreviewStep() {
    const { register, watch } = useFormContext<PropertySchema>();
    const data = watch(); // Watch all data for preview

    // Helper to safely get the cover image
    const coverImage = data.images?.find(img => img.isPrimary)?.url || data.images?.[0]?.url;

    return (
        <div className="space-y-8 max-w-3xl mx-auto">

            {/* Terms Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Terms & Description</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Available From
                        </label>
                        <input
                            type="date"
                            {...register('terms.availableFrom')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            {...register('description.long')}
                            rows={4}
                            placeholder="Describe the property, neighborhood, and unique features..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Preview Listing</h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 max-w-md mx-auto md:mx-0">
                    <div className="h-48 w-full bg-gray-200 relative">
                        {coverImage ? (
                            <img src={coverImage} alt={data.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                        )}
                        <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase">
                            {data.status || 'Available'}
                        </span>
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{data.title || 'Untitled Property'}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{data.address?.city}, {data.address?.state}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span>{data.specs?.bedrooms} Beds</span>
                            <span>{data.specs?.bathrooms} Baths</span>
                            <span>{data.specs?.area} {data.specs?.areaUnit}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-[#00853E] font-bold">
                                {data.price?.currency} {formatNumber(data.price?.amount || 0)}
                                {data.listingType === 'Rent' && <span className="text-gray-500 text-xs font-normal">/{data.price?.period}</span>}
                            </span>
                            {data.installments?.enabled && (
                                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Installments</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
