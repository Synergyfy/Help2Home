// hooks/useMarketplaceQueries.ts
import { useQuery, useQueryClient,useMutation, keepPreviousData } from '@tanstack/react-query';
import {
  fetchLocations,
  searchProperties,
  fetchFeaturedProperties,
  fetchPropertyById,
  fetchPriceStats,
  SearchFilters,
  PropertySearchResult,
  Location,
} from '@/lib/api/marketPlace';
import { Property } from '@/utils/properties'; 

const BASE_KEY = ['marketplace'] as const;

export const marketplaceKeys = {
  all: BASE_KEY,
  locations: (query?: string) => [...BASE_KEY, 'locations', query] as const,
  // Use a spread of filters to ensure React Query detects changes in nested objects
  properties: (filters: SearchFilters, page: number) => 
    [...BASE_KEY, 'properties', { ...filters }, page] as const,
  featured: (propertyType?: string) => 
    [...BASE_KEY, 'featured', propertyType] as const,
  property: (id: number) => [...BASE_KEY, 'property', id] as const,
  priceStats: (location: string) => 
    [...BASE_KEY, 'priceStats', location] as const,
};

export function useLocations(query?: string) {
  return useQuery<Location[]>({
    queryKey: marketplaceKeys.locations(query),
    queryFn: () => fetchLocations(query),
    enabled: !!query && query.length > 1, 
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchProperties(filters: SearchFilters, page: number = 1) {
  return useQuery<PropertySearchResult>({
    queryKey: marketplaceKeys.properties(filters, page),
    queryFn: () => searchProperties(filters, page),
    // Setting staleTime higher as properties don't change every second
    staleTime: 1 * 60 * 1000, 
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedProperties(
  propertyType?: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own',
  limit: number = 3 // Provide a default
) {
  return useQuery<Property[]>({
    queryKey: marketplaceKeys.featured(propertyType),
    queryFn: () => fetchFeaturedProperties(limit), 
    staleTime: 10 * 60 * 1000,
  });
}

export function useProperty(id: number) {
  return useQuery<Property | null>({
    queryKey: marketplaceKeys.property(id),
    queryFn: () => fetchPropertyById(id),
    staleTime: 5 * 60 * 1000,
  });
}



export function usePriceStats(location: string) {
  return useQuery({
    queryKey: marketplaceKeys.priceStats(location),
    queryFn: () => fetchPriceStats(location),
    enabled: !!location && location.trim().length > 0,
    staleTime: 24 * 60 * 60 * 1000, // Price stats are stable, cache for 24h
  });
}

export function usePrefetchNextPage(filters: SearchFilters, currentPage: number) {
  const queryClient = useQueryClient();

  return () => {
    // Prefetching ensures smoother pagination
    queryClient.prefetchQuery({
      queryKey: marketplaceKeys.properties(filters, currentPage + 1),
      queryFn: () => searchProperties(filters, currentPage + 1),
    });
  };
}