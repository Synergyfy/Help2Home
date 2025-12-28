'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplaceStore } from '@/store/marketplaceStore';

export default function SearchResults() {
  const searchParams = useSearchParams();
  
  // Extract state and actions from the store
  const { 
    filters, 
    setFilters, 
    setCategory, 
    setPropertyType, 
    resultsCount 
  } = useMarketplaceStore();

  // Sync URL params with Zustand store on mount
  useEffect(() => {
    const queryLocation = searchParams.get('location');
    const queryType = searchParams.get('type');
    
    if (queryLocation || queryType) {
      setFilters({
        location: queryLocation || '',
        propertyType: (queryType as any) || 'rent'
      });
    }
  }, [searchParams, setFilters]);

  return (
    <div className="p-6">
      <div className="mb-8 flex gap-4">
        {/* Example: Using setPropertyType action */}
        <button 
          onClick={() => setPropertyType('rent')}
          className={`px-4 py-2 rounded ${filters.propertyType === 'rent' ? 'bg-brand-green text-white' : 'bg-gray-200'}`}
        >
          For Rent
        </button>
        <button 
          onClick={() => setPropertyType('buy')}
          className={`px-4 py-2 rounded ${filters.propertyType === 'buy' ? 'bg-brand-green text-white' : 'bg-gray-200'}`}
        >
          For Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="col-span-1">
          <h3 className="font-bold mb-4">Categories</h3>
          <select 
            value={filters.category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">All Properties</option>
            <option value="apartment">Apartments</option>
            <option value="duplex">Duplex</option>
          </select>
        </aside>

        {/* Results Area */}
        <main className="col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Properties in {filters.location || 'All Locations'}
            </h2>
            <span className="text-gray-500">{resultsCount} results found</span>
          </div>
          
          {/* Property cards would be mapped here */}
          <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-200 text-center">
            Results for {filters.propertyType} category: {filters.category}
          </div>
        </main>
      </div>
    </div>
  );
}