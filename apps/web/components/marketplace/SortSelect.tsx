// components/marketplace/SortSelect.tsx
'use client';
import React from 'react';
import { useMarketplaceStore } from '@/store/marketplaceStore';

export default function SortSelect() {
    const filters = useMarketplaceStore((state) => state.filters);
    const setSortBy = useMarketplaceStore((state) => state.setSortBy);

    return (
        <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-gray-500 text-sm font-medium whitespace-nowrap">Sort by:</span>
            <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
            </select>
        </div>
    );
}
