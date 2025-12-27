// store/marketplaceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PropertyType = 'rent' | 'buy' | 'service-apartment' | 'rent-to-own';
export type PropertyCategory = 
  | 'all' 
  | 'residential-properties-to-rent'
  | 'student-properties-to-rent'
  | 'corporate-properties-to-rent'
  | 'residential-properties-for-sale'
  | 'commercial-properties-for-sale'
  | 'student-properties-for-sale'
  | 'corporate-properties-for-sale'
  | 'short-term'
  | 'corporate'
  | 'luxury'
  | 'family-home'
  | 'duplex'
  | 'apartment'
  | 'terrace-house'
  | 'detached-house'
  | 'semi-detached'
  | 'townhouse';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

interface PriceRange {
  min: number;
  max: number;
}

interface MarketplaceFilters {
  propertyType: PropertyType;
  category: PropertyCategory;
  location: string;
  radius: number; // in miles
  bedrooms: number | null;
  bathrooms: number | null;
  priceRange: PriceRange;
  furnished: boolean | null;
  parking: boolean | null;
  garden: boolean | null;
  pool: boolean | null;
  sortBy: SortOption;
  searchQuery: string;
}

interface MarketplaceState {
  // Filters
  filters: MarketplaceFilters;
  
  // Pagination
  currentPage: number;
  
  // UI State
  showFilterModal: boolean;
  
  // Actions - Filters
  setPropertyType: (type: PropertyType) => void;
  setCategory: (category: PropertyCategory) => void;
  setLocation: (location: string) => void;
  setRadius: (radius: number) => void;
  setBedrooms: (bedrooms: number | null) => void;
  setBathrooms: (bathrooms: number | null) => void;
  setPriceRange: (range: PriceRange) => void;
  setFurnished: (furnished: boolean | null) => void;
  setParking: (parking: boolean | null) => void;
  setGarden: (garden: boolean | null) => void;
  setPool: (pool: boolean | null) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<MarketplaceFilters>) => void;
  
  // Actions - Pagination
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  
  // Actions - UI
  toggleFilterModal: () => void;
  setFilterModal: (show: boolean) => void;
  
  // Actions - Reset
  resetFilters: () => void;
  resetAll: () => void;
}

const defaultFilters: MarketplaceFilters = {
  propertyType: 'rent',
  category: 'all',
  location: '',
  radius: 1, // Default 1 mile radius
  bedrooms: null,
  bathrooms: null,
  priceRange: { min: 0, max: 500000000 }, // NGN 500M max
  furnished: null,
  parking: null,
  garden: null,
  pool: null,
  sortBy: 'featured',
  searchQuery: '',
};

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set) => ({
      // Initial State
      filters: defaultFilters,
      currentPage: 1,
      showFilterModal: false,
      
      // Filter Actions
      setPropertyType: (type) =>
        set((state) => ({
          filters: { ...state.filters, propertyType: type },
          currentPage: 1, // Reset to page 1 when filter changes
        })),
      
      setCategory: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
          currentPage: 1,
        })),
      
      setLocation: (location) =>
        set((state) => ({
          filters: { ...state.filters, location },
          currentPage: 1,
        })),
      
      setRadius: (radius) =>
        set((state) => ({
          filters: { ...state.filters, radius },
          currentPage: 1,
        })),
      
      setBedrooms: (bedrooms) =>
        set((state) => ({
          filters: { ...state.filters, bedrooms },
          currentPage: 1,
        })),
      
      setBathrooms: (bathrooms) =>
        set((state) => ({
          filters: { ...state.filters, bathrooms },
          currentPage: 1,
        })),
      
      setPriceRange: (range) =>
        set((state) => ({
          filters: { ...state.filters, priceRange: range },
          currentPage: 1,
        })),
      
      setFurnished: (furnished) =>
        set((state) => ({
          filters: { ...state.filters, furnished },
          currentPage: 1,
        })),
      
      setParking: (parking) =>
        set((state) => ({
          filters: { ...state.filters, parking },
          currentPage: 1,
        })),
      
      setGarden: (garden) =>
        set((state) => ({
          filters: { ...state.filters, garden },
          currentPage: 1,
        })),
      
      setPool: (pool) =>
        set((state) => ({
          filters: { ...state.filters, pool },
          currentPage: 1,
        })),
      
      setSortBy: (sortBy) =>
        set((state) => ({
          filters: { ...state.filters, sortBy },
          currentPage: 1,
        })),
      
      setSearchQuery: (searchQuery) =>
        set((state) => ({
          filters: { ...state.filters, searchQuery },
          currentPage: 1,
        })),
      
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1,
        })),
      
      // Pagination Actions
      setCurrentPage: (page) => set({ currentPage: page }),
      
      nextPage: () =>
        set((state) => ({ currentPage: state.currentPage + 1 })),
      
      prevPage: () =>
        set((state) => ({ 
          currentPage: Math.max(1, state.currentPage - 1) 
        })),
      
      // UI Actions
      toggleFilterModal: () =>
        set((state) => ({ showFilterModal: !state.showFilterModal })),
      
      setFilterModal: (show) => set({ showFilterModal: show }),
      
      // Reset Actions
      resetFilters: () => 
        set({ filters: defaultFilters, currentPage: 1 }),
      
      resetAll: () => 
        set({ 
          filters: defaultFilters, 
          currentPage: 1,
          showFilterModal: false 
        }),
    }),
    {
      name: 'marketplace-storage',
      partialize: (state) => ({ 
        filters: state.filters,
        currentPage: state.currentPage,
      }),
    }
  )
);