// hooks/useMarketplaceQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLocations,
  searchProperties,
  fetchFeaturedProperties,
  fetchPropertyById,
  fetchPriceStats,
  SearchFilters,
} from '@/lib/api/marketPlace';

// Query keys
export const marketplaceKeys = {
  all: ['marketplace'] as const,
  locations: (query?: string) => [...marketplaceKeys.all, 'locations', query] as const,
  properties: (filters: SearchFilters, page: number) => 
    [...marketplaceKeys.all, 'properties', filters, page] as const,
  featured: (propertyType?: string) => 
    [...marketplaceKeys.all, 'featured', propertyType] as const,
  property: (id: number) => [...marketplaceKeys.all, 'property', id] as const,
  priceStats: (location: string) => 
    [...marketplaceKeys.all, 'priceStats', location] as const,
};

// Hook to fetch locations with autocomplete
export function useLocations(query?: string) {
  return useQuery({
    queryKey: marketplaceKeys.locations(query),
    queryFn: () => fetchLocations(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

// Hook to search properties
export function useSearchProperties(filters: SearchFilters, page: number = 1) {
  return useQuery({
    queryKey: marketplaceKeys.properties(filters, page),
    queryFn: () => searchProperties(filters, page),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while fetching new
  });
}

// Hook to fetch featured properties
export function useFeaturedProperties(
  propertyType?: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own',
  limit?: number
) {
  return useQuery({
    queryKey: marketplaceKeys.featured(propertyType),
    queryFn: () => fetchFeaturedProperties(propertyType, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook to fetch single property
export function useProperty(id: number) {
  return useQuery({
    queryKey: marketplaceKeys.property(id),
    queryFn: () => fetchPropertyById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook to fetch price statistics
export function usePriceStats(location: string) {
  return useQuery({
    queryKey: marketplaceKeys.priceStats(location),
    queryFn: () => fetchPriceStats(location),
    enabled: !!location && location.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Custom hook to prefetch next page (for pagination)
export function usePrefetchNextPage(filters: SearchFilters, currentPage: number) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: marketplaceKeys.properties(filters, currentPage + 1),
      queryFn: () => searchProperties(filters, currentPage + 1),
    });
  };
}