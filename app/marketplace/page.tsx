'use client';

import { useMemo, useState } from 'react';
import MarketplaceHero from '@/components/MarketplaceHero';
import FilterModal from '@/components/marketplace/FilterModal';
import FeaturedProperties from '@/components/marketplace/FeaturedProperties';
import PropertyGrid from '@/components/marketplace/PropertyGrid';
import SortSelect from '@/components/marketplace/SortSelect';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { allProperties } from '@/utils/properties';

export default function MarketplacePage() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const filters = useMarketplaceStore((state) => state.filters);

    const filteredProperties = useMemo(() => {
        let filtered = allProperties.filter((property) => {
            if (property.propertyType !== filters.propertyType) return false;
            if (filters.propertyType === 'rent' && filters.category !== 'all' && property.category !== filters.category) return false;
            if (filters.location && property.state !== filters.location) return false;
            if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) return false;
            if (filters.bathrooms !== null && property.bathrooms < filters.bathrooms) return false;
            if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) return false;
            return true;
        });

        switch (filters.sortBy) {
            case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
            case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
            case 'featured':
            default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
        }

        return filtered;
    }, [filters]);

    const featuredProperties = useMemo(() => filteredProperties.filter(p => p.featured).slice(0, 3), [filteredProperties]);

    const getPropertyTypeLabel = () => {
        switch (filters.propertyType) {
            case 'rent': return 'Rent';
            case 'buy': return 'Buy';
            case 'service-apartment': return 'Service Apartments';
            default: return 'Properties';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <MarketplaceHero onOpenFilterModal={() => setIsFilterModalOpen(true)} />
            <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />

            <div className="max-w-8xl mx-auto px-4 md:mx-4 py-12">
                <FeaturedProperties properties={featuredProperties} label={getPropertyTypeLabel()} />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {getPropertyTypeLabel()} Properties
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                        </p>
                    </div>
                    <SortSelect />
                </div>

                <PropertyGrid properties={filteredProperties} />

                {/* Pagination */}
                {filteredProperties.length > 0 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                            <FaChevronLeft />
                        </button>
                        {[1, 2, 3, 4, 5].map((page) => (
                            <button
                                key={page}
                                className={`w-12 h-12 flex items-center justify-center rounded-xl border ${page === 1 ? 'bg-gray-900 text-white font-bold shadow-lg' : 'border-gray-200 text-gray-700 hover:bg-gray-50 font-medium'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}