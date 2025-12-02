'use client';

import React from 'react';

interface BasicsStepProps {
    data: any;
    updateData: (data: any) => void;
}

export default function BasicsStep({ data, updateData }: BasicsStepProps) {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Basics</h2>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title || ''}
                            onChange={(e) => updateData({ title: e.target.value })}
                            placeholder="e.g., Modern 2-Bedroom Apartment in Lekki Phase 1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                        <p className="text-xs text-gray-500 mt-1">Keep it short and descriptive — location and size help renters.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Property Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.type || ''}
                                onChange={(e) => updateData({ type: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E] bg-white"
                            >
                                <option value="">Select type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Room">Room</option>
                                <option value="Studio">Studio</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Detached House">Detached House</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>

                        {/* Listing Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Listing Type <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="listingType"
                                        value="Rent"
                                        checked={data.listingType === 'Rent'}
                                        onChange={(e) => updateData({ listingType: e.target.value })}
                                        className="text-[#00853E] focus:ring-[#00853E]"
                                    />
                                    <span>For Rent</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="listingType"
                                        value="Sale"
                                        checked={data.listingType === 'Sale'}
                                        onChange={(e) => updateData({ listingType: e.target.value })}
                                        className="text-[#00853E] focus:ring-[#00853E]"
                                    />
                                    <span>For Sale</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>

                <div className="space-y-4">
                    {/* Address Search (Mock) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data.address?.street || ''}
                                onChange={(e) => updateData({ address: { ...data.address, street: e.target.value } })}
                                placeholder="Start typing address..."
                                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                value={data.address?.city || ''}
                                onChange={(e) => updateData({ address: { ...data.address, city: e.target.value } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                                type="text"
                                value={data.address?.state || ''}
                                onChange={(e) => updateData({ address: { ...data.address, state: e.target.value } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <p className="text-sm">Map Preview</p>
                            <p className="text-xs">Drag pin to adjust location</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
