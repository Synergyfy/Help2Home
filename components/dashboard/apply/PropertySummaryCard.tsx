import React from 'react';
import Image from 'next/image';
import { PropertyDetails } from './types';

interface PropertySummaryCardProps {
    property: PropertyDetails;
}

export default function PropertySummaryCard({ property }: PropertySummaryCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Property Summary</h3>
                <div className="flex gap-4">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                            src={property.image}
                            alt={property.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{property.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{property.location}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-purple-50 text-[#6D28D9] px-2 py-1 rounded">
                                {property.paymentOption}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                ₦ {property.rentPrice.toLocaleString()} / year
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Managed by: <span className="font-medium text-gray-700">{property.landlordName}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
