'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplaceStore } from '@/store/marketplaceStore';

export function useMarketplaceUrlSync() {
  const searchParams = useSearchParams();
  const store = useMarketplaceStore();

  useEffect(() => {
    if (!searchParams) return;

    store.setFilters({
      propertyType: (searchParams.get('type') as any) ?? 'rent',
      location: searchParams.get('location') ?? '',
      category: (searchParams.get('category') as any) ?? 'all',
      bedrooms: searchParams.get('beds')
        ? Number(searchParams.get('beds'))
        : null,
      bathrooms: searchParams.get('baths')
        ? Number(searchParams.get('baths'))
        : null,
      priceRange: {
        min: Number(searchParams.get('min') ?? 0),
        max: Number(searchParams.get('max') ?? 500000000),
      },
      radius: Number(searchParams.get('radius') ?? 1),
      furnished:
        searchParams.get('furnished') === null
          ? null
          : searchParams.get('furnished') === '1',
      parking:
        searchParams.get('parking') === null
          ? null
          : searchParams.get('parking') === '1',
      garden:
        searchParams.get('garden') === null
          ? null
          : searchParams.get('garden') === '1',
      pool:
        searchParams.get('pool') === null
          ? null
          : searchParams.get('pool') === '1',
      sortBy: (searchParams.get('sort') as any) ?? 'featured',
    });

    store.setCurrentPage(Number(searchParams.get('page') ?? 1));
  }, [searchParams]);
}
