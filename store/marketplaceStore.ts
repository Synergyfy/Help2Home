// store/marketplaceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PropertyType = 'rent' | 'buy' | 'service-apartment';
export type PropertyCategory = 
  | 'all' 
  | 'property-to-rent' 
  | 'student-property' 
  | 'corporate-property' 
  | 'rent-to-own'
  | 'service-apartment';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

interface PriceRange {
  min: number;
  max: number;
}

interface MarketplaceFilters {
  propertyType: PropertyType;
  category: PropertyCategory;
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  priceRange: PriceRange;
  sortBy: SortOption;
  searchQuery: string;
}

interface MarketplaceState {
  filters: MarketplaceFilters;
  setPropertyType: (type: PropertyType) => void;
  setCategory: (category: PropertyCategory) => void;
  setLocation: (location: string) => void;
  setBedrooms: (bedrooms: number | null) => void;
  setBathrooms: (bathrooms: number | null) => void;
  setPriceRange: (range: PriceRange) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<MarketplaceFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: MarketplaceFilters = {
  propertyType: 'rent',
  category: 'all',
  location: '',
  bedrooms: null,
  bathrooms: null,
  priceRange: { min: 0, max: 10000000 },
  sortBy: 'featured',
  searchQuery: '',
};

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      
      setPropertyType: (type) =>
        set((state) => ({
          filters: { ...state.filters, propertyType: type },
        })),
      
      setCategory: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),
      
      setLocation: (location) =>
        set((state) => ({
          filters: { ...state.filters, location },
        })),
      
      setBedrooms: (bedrooms) =>
        set((state) => ({
          filters: { ...state.filters, bedrooms },
        })),
      
      setBathrooms: (bathrooms) =>
        set((state) => ({
          filters: { ...state.filters, bathrooms },
        })),
      
      setPriceRange: (range) =>
        set((state) => ({
          filters: { ...state.filters, priceRange: range },
        })),
      
      setSortBy: (sortBy) =>
        set((state) => ({
          filters: { ...state.filters, sortBy },
        })),
      
      setSearchQuery: (searchQuery) =>
        set((state) => ({
          filters: { ...state.filters, searchQuery },
        })),
      
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: 'marketplace-filters',
    }
  )
);