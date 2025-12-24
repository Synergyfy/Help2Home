// components/marketplace/PropertyGrid.tsx
'use client';
import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import { FiHome } from "react-icons/fi";


type PropertyGridProps = {
    properties: typeof import('@/utils/properties').allProperties;
};

export default function PropertyGrid({ properties }: PropertyGridProps) {
    if (!properties.length) return (
        <div className="text-center py-16">
            <div className="text-6xl mb-4"><FiHome className='w-4 h-4' /></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
                onClick={() => import('@/store/marketplaceStore').then(mod => mod.useMarketplaceStore.getState().resetFilters())}
                className="px-6 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.images[0]}
                    title={property.title}
                    location={property.location}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    description={property.description}
                    price={`₦${property.price.toLocaleString()}`}
                    monthlyPrice={
                        typeof property.monthlyPrice === 'number' && property.monthlyPrice > 0
                            ? `₦${property.monthlyPrice.toLocaleString()}`
                            : undefined
                    }

                    featured={property.featured}
                    verified={property.verified}
                    isNew={property.isNew}
                />
            ))}
        </div>
    );
}
