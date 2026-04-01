// components/marketplace/CategoryFilters.tsx
'use client';
import React from 'react';
import { useMarketplaceStore } from '@/store/marketplaceStore';

type CategoryFiltersProps = {
    categories: { name: string; label: string }[];
};

export default function CategoryFilters({ categories }: CategoryFiltersProps) {
    const filters = useMarketplaceStore((state) => state.filters);
    const setCategory = useMarketplaceStore((state) => state.setCategory);

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name as any)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filters.category === cat.name
                            ? 'bg-brand-green text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-green hover:bg-green-50 hover:text-brand-green'
                        }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
