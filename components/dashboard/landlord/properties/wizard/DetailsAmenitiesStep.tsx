'use client';

import React from 'react';

interface DetailsAmenitiesStepProps {
    data: any;
    updateData: (data: any) => void;
}

const AMENITIES_LIST = [
    'Water Supply', 'Electricity (24/7)', 'Security', 'Gated Estate',
    'Swimming Pool', 'Gym', 'WiFi / Internet', 'Parking Space',
    'Elevator', 'Generator', 'Air Conditioning', 'Balcony',
    'Garden', 'Boys Quarters (BQ)', 'CCTV', 'Waste Disposal'
];

export default function DetailsAmenitiesStep({ data, updateData }: DetailsAmenitiesStepProps) {
    const toggleAmenity = (amenity: string) => {
        const current = data.amenities || [];
        const updated = current.includes(amenity)
            ? current.filter((a: string) => a !== amenity)
            : [...current, amenity];
        updateData({ amenities: updated });
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                        <input
                            type="number"
                            min="0"
                            value={data.specs?.bedrooms || ''}
                            onChange={(e) => updateData({ specs: { ...data.specs, bedrooms: Number(e.target.value) } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={data.specs?.bathrooms || ''}
                            onChange={(e) => updateData({ specs: { ...data.specs, bathrooms: Number(e.target.value) } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area Size</label>
                        <div className="flex">
                            <input
                                type="number"
                                min="0"
                                value={data.specs?.area || ''}
                                onChange={(e) => updateData({ specs: { ...data.specs, area: Number(e.target.value) } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                            <select
                                value={data.specs?.areaUnit || 'sqm'}
                                onChange={(e) => updateData({ specs: { ...data.specs, areaUnit: e.target.value } })}
                                className="border-l-0 border border-gray-300 rounded-r-lg px-3 bg-gray-50 text-gray-600"
                            >
                                <option value="sqm">sqm</option>
                                <option value="sqft">sqft</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing</label>
                        <select
                            value={data.specs?.furnishing || ''}
                            onChange={(e) => updateData({ specs: { ...data.specs, furnishing: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E] bg-white"
                        >
                            <option value="">Select...</option>
                            <option value="Furnished">Furnished</option>
                            <option value="Partly Furnished">Partly Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <p className="text-sm text-gray-500 mb-4">Select all that apply to this property.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES_LIST.map(amenity => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                            <input
                                type="checkbox"
                                checked={data.amenities?.includes(amenity) || false}
                                onChange={() => toggleAmenity(amenity)}
                                className="rounded text-[#00853E] focus:ring-[#00853E]"
                            />
                            <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
