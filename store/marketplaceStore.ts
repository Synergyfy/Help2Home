import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PropertyType = 'rent' | 'buy' | 'service-apartment' | 'rent-to-own';

export type PropertyCategory = 
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

export type InclusionMode = 'include' | 'exclude' | 'show-only';
export type AddedTimeframe = 'anytime' | '24h' | '3d' | '7d' | '14d' | '30d';
export type OwnershipType = 'all' | 'freehold' | 'leasehold' | 'share-of-freehold';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';
export type Status = 'all'| 'available' | 'sold';

interface MinMax {
  min: number | null;
  max: number | null;
}

interface MarketplaceFilters {
  propertyType: PropertyType;
  categories: PropertyCategory[]; 
  location: string;
  radius: number;
  bedrooms: MinMax;
  bathrooms: MinMax;
  priceRange: { min: number; max: number };
  category: string;
  status: Status;
  
  newBuild: InclusionMode;
  sharedOwnership: InclusionMode;
  retirementHomes: InclusionMode;
  auction: InclusionMode;
  offPlan: InclusionMode; 

  garden: boolean;
  parking: boolean;
  balcony: boolean;
  chainFree: boolean;
  reducedPrice: boolean;
  underOffer: boolean;
  
  serviced: boolean;
  electricity: boolean;
  waterSupply: boolean;
  security: boolean;
  gym: boolean;
  pool: boolean;

  furnished: boolean;
  features: string[]; 
  ownership: OwnershipType;
  dateAdded: AddedTimeframe;
  keywords: string;
  
  floorLevel?: number;
  totalArea?: number;
  isVerified: boolean;
  
  sortBy: SortOption;
  searchQuery: string;

  [key: string]: any;
}

interface MarketplaceState {
  filters: MarketplaceFilters;
  currentPage: number;
  showFilterModal: boolean;
  resultsCount: number;
  
  setFilters: (filters: Partial<MarketplaceFilters>) => void;
  setPropertyType: (type: PropertyType) => void; 
  setLocation: (location: string) => void; 
  setCategory: (newCategory: string) => void; // Defined here
  setSortBy: (sort: SortOption) => void;
  toggleCategory: (category: PropertyCategory) => void;
  toggleFeature: (feature: string) => void;
  setCurrentPage: (page: number) => void;
  setResultsCount: (count: number) => void;
  resetAdvancedFilters: () => void;
  nextPage: () => void;
  prevPage: () => void;
  resetFilters: () => void;
  toggleFilterModal: () => void;
}

const defaultFilters: MarketplaceFilters = {
  propertyType: 'rent',
  categories: [],
  location: '',
  radius: 0,
  category: 'all',
  bedrooms: { min: 0, max: 0 },
  bathrooms: { min: 0, max: 0 },
  priceRange: { min: 0, max: 1000000000 },
  status: 'all',
  newBuild: 'include',
  sharedOwnership: 'include',
  retirementHomes: 'include',
  auction: 'include',
  offPlan: 'include', 
  garden: false,
  parking: false,
  balcony: false,
  chainFree: false,
  reducedPrice: false,
  underOffer: false,
  serviced: false,
  electricity: false, 
  waterSupply: false, 
  security: false,
  gym: false,
  pool: false,
  furnished: false,
  isVerified: false,
  features: [],
  ownership: 'all', 
  dateAdded: 'anytime',
  keywords: '',
  sortBy: 'featured',
  searchQuery: '',
};

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({ 
      filters: defaultFilters,
      currentPage: 1,
      showFilterModal: false,
      resultsCount: 0,

      setResultsCount: (count) => set({ resultsCount: count }),
      
      setFilters: (newFilters) => 
        set((state) => ({ 
          filters: { ...state.filters, ...newFilters }, 
          currentPage: 1 
        })),

      setPropertyType: (type) =>
        set((state) => ({
          filters: { ...state.filters, propertyType: type },
          currentPage: 1
        })),

      setLocation: (location) =>
        set((state) => ({
          filters: { ...state.filters, location },
          currentPage: 1
        })),

      // FIX: Added the missing setCategory implementation
      setCategory: (newCategory) =>
        set((state) => ({
          filters: { ...state.filters, category: newCategory },
          currentPage: 1
        })),

      setSortBy: (sort) =>
        set((state) => ({
          filters: { ...state.filters, sortBy: sort }
        })),

      toggleCategory: (category) =>
        set((state) => {
          const current = state.filters.categories;
          const categories = current.includes(category)
            ? current.filter((c) => c !== category)
            : [...current, category];
          return { filters: { ...state.filters, categories }, currentPage: 1 };
        }),

      toggleFeature: (feature) =>
        set((state) => {
          const current = state.filters.features;
          const features = current.includes(feature)
            ? current.filter((f) => f !== feature)
            : [...current, feature];
          return { filters: { ...state.filters, features }, currentPage: 1 };
        }),

      resetAdvancedFilters: () => set((state) => ({
        filters: {
          ...state.filters,
          categories: [], 
          keywords: '',
          newBuild: 'include',
          sharedOwnership: 'include',
          retirementHomes: 'include',
          auction: 'include',
          dateAdded: 'anytime',
          isVerified: false
        }
      })),

      setCurrentPage: (page) => set({ currentPage: page }),
      nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
      prevPage: () => set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) })),
      toggleFilterModal: () => set((state) => ({ showFilterModal: !state.showFilterModal })),
      resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),
    }),
    {
      name: 'marketplace-storage',
      partialize: (state) => ({ filters: state.filters, currentPage: state.currentPage }),
    }
  )
);