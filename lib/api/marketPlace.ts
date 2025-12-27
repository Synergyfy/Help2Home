// lib/api/marketplace.ts
// This simulates API calls - replace with real API endpoints later

import { Property } from '@/utils/properties';
import { allProperties } from '@/utils/properties';

// Types for our API responses
export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'area' | 'city' | 'state';
  propertyCount: number;
}

export interface SearchFilters {
  propertyType?: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own';
  location?: string;
  category?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  priceMin?: number;
  priceMax?: number;
  radius?: number;
  furnished?: boolean | null;
  parking?: boolean | null;
  garden?: boolean | null;
  pool?: boolean | null;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'newest';
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Extract unique locations from properties
export async function fetchLocations(query?: string): Promise<Location[]> {
  await delay(300); // Simulate network delay

  // Extract unique locations from properties
  const locationMap = new Map<string, Location>();

  allProperties.forEach(property => {
    // Add area/location
    const areaKey = `${property.location}-${property.city}`;
    if (!locationMap.has(areaKey)) {
      locationMap.set(areaKey, {
        id: areaKey.toLowerCase().replace(/\s+/g, '-'),
        name: property.location,
        city: property.city,
        state: property.state,
        type: 'area',
        propertyCount: 1,
      });
    } else {
      const existing = locationMap.get(areaKey)!;
      existing.propertyCount++;
    }

    // Add city
    const cityKey = `city-${property.city}`;
    if (!locationMap.has(cityKey)) {
      locationMap.set(cityKey, {
        id: cityKey.toLowerCase().replace(/\s+/g, '-'),
        name: property.city,
        city: property.city,
        state: property.state,
        type: 'city',
        propertyCount: 1,
      });
    } else {
      const existing = locationMap.get(cityKey)!;
      existing.propertyCount++;
    }

    // Add state
    const stateKey = `state-${property.state}`;
    if (!locationMap.has(stateKey)) {
      locationMap.set(stateKey, {
        id: stateKey.toLowerCase().replace(/\s+/g, '-'),
        name: property.state,
        city: '',
        state: property.state,
        type: 'state',
        propertyCount: 1,
      });
    } else {
      const existing = locationMap.get(stateKey)!;
      existing.propertyCount++;
    }
  });

  let locations = Array.from(locationMap.values());

  // Filter by query if provided
  if (query && query.trim()) {
    const lowerQuery = query.toLowerCase().trim();
    locations = locations.filter(loc => 
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.city.toLowerCase().includes(lowerQuery) ||
      loc.state.toLowerCase().includes(lowerQuery)
    );
  }

  // Sort: areas first, then cities, then states
  // Within each type, sort by property count (descending)
  const typeOrder = { area: 0, city: 1, state: 2 };
  locations.sort((a, b) => {
    if (a.type !== b.type) {
      return typeOrder[a.type] - typeOrder[b.type];
    }
    return b.propertyCount - a.propertyCount;
  });

  return locations;
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Search properties with filters
export async function searchProperties(
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 12
): Promise<PropertySearchResult> {
  await delay(500); // Simulate network delay

  let filtered = [...allProperties];

  // Filter by property type
  if (filters.propertyType) {
    filtered = filtered.filter(p => p.propertyType === filters.propertyType);
  }

  // Filter by location
  if (filters.location && filters.location.trim()) {
    const locationQuery = filters.location.toLowerCase().trim();
    filtered = filtered.filter(p => {
      const matchesLocation = p.location.toLowerCase().includes(locationQuery);
      const matchesCity = p.city.toLowerCase().includes(locationQuery);
      const matchesState = p.state.toLowerCase().includes(locationQuery);
      const matchesAddress = p.address.toLowerCase().includes(locationQuery);
      
      return matchesLocation || matchesCity || matchesState || matchesAddress;
    });

    // If radius is specified and we have lat/lng, filter by distance
    if (filters.radius && filtered.length > 0) {
      // Use first matching property's coordinates as reference
      const refProperty = filtered[0];
      if (refProperty.latitude && refProperty.longitude) {
        const radiusInKm = filters.radius * 1.60934; // Convert miles to km
        filtered = filtered.filter(p => {
          if (!p.latitude || !p.longitude) return false;
          const distance = calculateDistance(
            refProperty.latitude,
            refProperty.longitude,
            p.latitude,
            p.longitude
          );
          return distance <= radiusInKm;
        });
      }
    }
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by bedrooms
  if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
    filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
  }

  // Filter by bathrooms
  if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
    filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms!);
  }

  // Filter by price range
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }

  // Filter by amenities
  if (filters.furnished !== null && filters.furnished !== undefined) {
    filtered = filtered.filter(p => p.furnished === filters.furnished);
  }
  if (filters.parking !== null && filters.parking !== undefined) {
    filtered = filtered.filter(p => p.parking === filters.parking);
  }
  if (filters.garden !== null && filters.garden !== undefined) {
    filtered = filtered.filter(p => p.garden === filters.garden);
  }
  if (filters.pool !== null && filters.pool !== undefined) {
    filtered = filtered.filter(p => p.pool === filters.pool);
  }

  // Sort results
  switch (filters.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  // Pagination
  const total = filtered.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProperties = filtered.slice(startIndex, endIndex);

  return {
    properties: paginatedProperties,
    total,
    page,
    pageSize,
  };
}

// Get featured properties
export async function fetchFeaturedProperties(
  propertyType?: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own',
  limit: number = 3
): Promise<Property[]> {
  await delay(300);

  let featured = allProperties.filter(p => p.featured);

  if (propertyType) {
    featured = featured.filter(p => p.propertyType === propertyType);
  }

  return featured.slice(0, limit);
}

// Get property by ID
export async function fetchPropertyById(id: number): Promise<Property | null> {
  await delay(300);
  return allProperties.find(p => p.id === id) || null;
}

// Get price statistics for a location
export async function fetchPriceStats(location: string): Promise<{
  average: number;
  min: number;
  max: number;
  count: number;
}> {
  await delay(300);

  const locationQuery = location.toLowerCase().trim();
  const properties = allProperties.filter(p => {
    const matchesLocation = p.location.toLowerCase().includes(locationQuery);
    const matchesCity = p.city.toLowerCase().includes(locationQuery);
    const matchesState = p.state.toLowerCase().includes(locationQuery);
    return matchesLocation || matchesCity || matchesState;
  });

  if (properties.length === 0) {
    return { average: 0, min: 0, max: 0, count: 0 };
  }

  const prices = properties.map(p => p.price);
  return {
    average: prices.reduce((a, b) => a + b, 0) / prices.length,
    min: Math.min(...prices),
    max: Math.max(...prices),
    count: properties.length,
  };
}