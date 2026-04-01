import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplaceStore, PropertyType, AddedTimeframe, OwnershipType, SortOption, Status } from '@/store/marketplaceStore';

export function useMarketplaceUrlSync() {
  const searchParams = useSearchParams();
  const { setFilters} = useMarketplaceStore();

  useEffect(() => {
    if (!searchParams) return;

    const newFilters: any = {};

    // 1. Basic Strings
    const type = searchParams.get('type') as PropertyType;
    if (type) newFilters.propertyType = type;

    const location = searchParams.get('location');
    if (location) newFilters.location = decodeURIComponent(location);

    const category = searchParams.get('category');
    if (category) newFilters.category = category;

    const status = searchParams.get('status') as Status;
    if (status) newFilters.status = status;

    // 2. Ranges (MinMax Objects)
    const minBed = searchParams.get('minBed');
    const maxBed = searchParams.get('maxBed');
    if (minBed || maxBed) {
      newFilters.bedrooms = {
        min: minBed ? parseInt(minBed) : 0,
        max: maxBed ? parseInt(maxBed) : 0,
      };
    }

    const minBath = searchParams.get('minBath');
    const maxBath = searchParams.get('maxBath');
    if (minBath || maxBath) {
      newFilters.bathrooms = {
        min: minBath ? parseInt(minBath) : 0,
        max: maxBath ? parseInt(maxBath) : 0,
      };
    }

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      newFilters.priceRange = {
        min: minPrice ? parseInt(minPrice) : 0,
        max: maxPrice ? parseInt(maxPrice) : 1000000000,
      };
    }

    // 3. Inclusion Modes (Tri-state)
    const inclusionKeys = ['newBuild', 'sharedOwnership', 'retirementHomes', 'auction', 'offPlan'] as const;
    inclusionKeys.forEach(key => {
      const val = searchParams.get(key);
      if (val === 'include' || val === 'exclude' || val === 'show-only') {
        newFilters[key] = val;
      }
    });

    // 4. Booleans (Infrastructure & Features)
    const boolKeys = [
      'garden', 'parking', 'balcony', 'chainFree', 'reducedPrice', 
      'underOffer', 'serviced', 'electricity', 'waterSupply', 
      'security', 'gym', 'pool', 'furnished', 'isVerified'
    ] as const;
    
    boolKeys.forEach(key => {
      if (searchParams.has(key)) {
        newFilters[key] = searchParams.get(key) === 'true';
      }
    });

    // 5. Enums & Others
    const dateAdded = searchParams.get('dateAdded') as AddedTimeframe;
    if (dateAdded) newFilters.dateAdded = dateAdded;

    const ownership = searchParams.get('ownership') as OwnershipType;
    if (ownership) newFilters.ownership = ownership;

    const sort = searchParams.get('sort') as SortOption;
    if (sort) newFilters.sortBy = sort;

    const q = searchParams.get('q');
    if (q) newFilters.searchQuery = q;

    // Batch update store
    if (Object.keys(newFilters).length > 0) {
      setFilters(newFilters);
    }
  }, [searchParams, setFilters]);
}
