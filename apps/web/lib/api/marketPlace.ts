import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { Property } from '@/utils/properties';

export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'area' | 'city' | 'state';
  propertyCount: number;
}

export interface SearchFilters {
  propertyType?: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own' | 'invest';
  location?: string;
  category?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  priceMin?: number;
  priceMax?: number;
  radius?: number;
  status?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'newest';
  keywords?: string;
  newBuild?: string | boolean;
  sharedOwnership?: string | boolean;
  retirementHomes?: string | boolean;
  auctions?: string | boolean;
  offPlan?: string | boolean;
  verified?: boolean;
  garden?: boolean;
  parking?: boolean;
  balcony?: boolean;
  serviced?: boolean;
  electricity?: boolean;
  waterSupply?: boolean;
  security?: boolean;
  gym?: boolean;
  pool?: boolean;
  furnished?: boolean;
  chainFree?: boolean;
  reducedPrice?: boolean;
  underOffer?: boolean;
  ownership?: string;
  addedToZoopla?: string;
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function fetchLocations(query?: string): Promise<Location[]> {
  try {
    const { data } = await axios.get(`${API_URL}/properties/locations`, {
      params: { query }
    });
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export async function searchProperties(
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 12
): Promise<PropertySearchResult> {
  try {
    const { data } = await axios.get(`${API_URL}/properties`, {
      params: { ...filters, page, pageSize }
    });
    return {
      properties: data.properties,
      total: data.total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('Error searching properties:', error);
    return { properties: [], total: 0, page, pageSize };
  }
}

export async function fetchPropertyById(id: string | number): Promise<Property | null> {
  try {
    const { data } = await axios.get(`${API_URL}/properties/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching property by id:', error);
    return null;
  }
}

export async function fetchFeaturedProperties(
  limit: number = 6, 
  propertyType?: string
): Promise<Property[]> {
  try {
    const { data } = await axios.get(`${API_URL}/properties/featured`, {
      params: { limit, type: propertyType }
    });
    return data;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

export async function updateProperty(id: string | number, updates: Partial<Property>): Promise<Property> {
  try {
    const { data } = await axios.patch(`${API_URL}/properties/${id}`, updates, {
      headers: getAuthHeader()
    });
    return data;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
}

export async function fetchPriceStats(location: string): Promise<any> {
    try {
        // This endpoint might not exist yet in the backend, but we're adding the export to fix the build error
        const { data } = await axios.get(`${API_URL}/properties/stats/price`, {
            params: { location }
        });
        return data;
    } catch (error) {
        console.error('Error fetching price stats:', error);
        throw error;
    }
}

