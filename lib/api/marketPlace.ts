import { mockProperties as _unused, updateMockDb, Property, getMockProperties } from '@/utils/properties';

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

  // Booleans (Amenities & Infrastructure)
  furnished?: boolean | null;
  parking?: boolean | null;
  garden?: boolean | null;
  gym?: boolean | null;
  pool?: boolean | null;
  verified?: boolean | null;
  serviced?: boolean | null;
  electricity?: boolean | null;
  waterSupply?: boolean | null;
  security?: boolean | null;
  balcony?: boolean | null;
  chainFree?: boolean | null;
  reducedPrice?: boolean | null;
  underOffer?: boolean | null;

  // Tri-State (InclusionMode)
  retirementHomes?: 'include' | 'exclude' | 'only';
  sharedOwnership?: 'include' | 'exclude' | 'only';
  ownership?: 'freehold' | 'leasehold' | 'share-of-freehold',
  auctions?: 'include' | 'exclude' | 'only';
  newBuild?: 'include' | 'exclude' | 'only';
  offPlan?: 'include' | 'exclude' | 'only';

  addedToZoopla?: string;
  ownerId?: string;
}

// ... (PropertySearchResult interface)
export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchLocations(query?: string): Promise<Location[]> {
  await delay(200);
  const locationMap = new Map<string, Location>();

  const allProperties = getMockProperties();

  allProperties.forEach(property => {
    const areaKey = `area-${property.location}`;
    if (!locationMap.has(areaKey)) {
      locationMap.set(areaKey, {
        id: areaKey.toLowerCase().replace(/\s+/g, '-'),
        name: property.location, city: property.city, state: property.state,
        type: 'area', propertyCount: 1,
      });
    } else { locationMap.get(areaKey)!.propertyCount++; }

    const cityKey = `city-${property.city}`;
    if (!locationMap.has(cityKey)) {
      locationMap.set(cityKey, {
        id: cityKey.toLowerCase().replace(/\s+/g, '-'),
        name: property.city, city: property.city, state: property.state,
        type: 'city', propertyCount: 1,
      });
    } else { locationMap.get(cityKey)!.propertyCount++; }
  });

  let locations = Array.from(locationMap.values());
  if (query?.trim()) {
    const q = query.toLowerCase().trim();
    locations = locations.filter(l => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q));
  }
  return locations.sort((a, b) => b.propertyCount - a.propertyCount);
}

export async function searchProperties(
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 12
): Promise<PropertySearchResult> {
  await delay(400);

    const allProperties = getMockProperties();
    let filtered = [...allProperties];
    console.log(`[searchProperties] Total properties in mock DB: ${allProperties.length}`);
    console.log(`[searchProperties] Initial Filters:`, JSON.stringify(filters, null, 2));
  
    // Modify Section 1: Basic Filters
    if (filters.propertyType && filters.propertyType !== 'all' as any) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
      console.log(`[searchProperties] After propertyType(${filters.propertyType}): ${filtered.length}`);
    }
    
    if (filters.category && filters.category !== 'all' && filters.category !== 'undefined') {
      const categoryFilter = filters.category;
      filtered = filtered.filter(p => p.category === categoryFilter || categoryFilter.includes(p.category));
      console.log(`[searchProperties] After category(${filters.category}): ${filtered.length}`);
    }
  
    // 2. Location Search
    if (filters.location?.trim()) {
      const q = filters.location.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q)
      );
      console.log(`[searchProperties] After location(${filters.location}): ${filtered.length}`);
    }
    // 3. Keywords
  if (filters.keywords?.trim()) {
    const k = filters.keywords.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(k) ||
      p.description.toLowerCase().includes(k) ||
      p.keywords?.some(kw => kw.toLowerCase().includes(k))
    );
  }

  // 4. Numeric Ranges
  if (filters.bedrooms && filters.bedrooms > 0) {
    filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
  }
  if (filters.priceMin && filters.priceMin > 0) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  if (filters.priceMax && filters.priceMax < 1000000000) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }

  // 5. Amenities & Infrastructure (Booleans)
  const booleanMapping: Record<string, keyof Property> = {
    furnished: 'furnished',
    parking: 'parking',
    garden: 'garden',
    pool: 'pool',
    gym: 'gym',
    isVerified: 'verified', // Maps store UI key to data key
    serviced: 'serviced',
    electricity: 'electricity',
    waterSupply: 'waterSupply',
    security: 'security',
    balcony: 'balcony',
    chainFree: 'isChainFree',
    reducedPrice: 'hasReducedPrice',
    underOffer: 'isUnderOffer'
  };

  Object.entries(booleanMapping).forEach(([filterKey, propertyKey]) => {
    const filterValue = (filters as any)[filterKey];
    // ONLY filter if the toggle is explicitly ON (true). 
    // If it's false, we want to see BOTH verified and unverified.
    if (filterValue === true) {
      filtered = filtered.filter(p => p[propertyKey] === true);
    }
  });

  // 6. Tri-State Logic (Status/Inclusion)
  const applyTriState = (field: keyof Property, val?: string) => {
    if (!val || val === 'include') return; // Default: Show everything
    if (val === 'exclude') {
      filtered = filtered.filter(p => !p[field]);
    } else if (val === 'only' || val === 'show-only') {
      filtered = filtered.filter(p => p[field] === true);
    }
  };

  applyTriState('isRetirementHome', filters.retirementHomes);
  applyTriState('isSharedOwnership', filters.sharedOwnership);
  applyTriState('isAuction', filters.auctions);
  applyTriState('isNewBuild', filters.newBuild);
  applyTriState('isOffPlan', filters.offPlan);

  // 7. Sorting
  switch (filters.sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
    default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return { properties: paginated, total, page, pageSize };
}

export async function fetchPropertyById(id: number): Promise<Property | null> {
  await delay(200);
  const allProperties = getMockProperties();
  return allProperties.find(p => p.id === id) || null;
}

export async function fetchFeaturedProperties(limit: number = 3, propertyType?: string): Promise<Property[]> {
  await delay(200);
  const allProperties = getMockProperties();
  let featured = allProperties.filter(p => p.featured);
  if (propertyType) featured = featured.filter(p => p.propertyType === propertyType);
  return featured.slice(0, limit);
}

export async function fetchPriceStats(location: string) {
  await delay(200);
  const allProperties = getMockProperties();
  const props = allProperties.filter(p => p.city.toLowerCase() === location.toLowerCase());
  if (props.length === 0) return null;
  const avg = props.reduce((acc, p) => acc + p.price, 0) / props.length;
  return { averagePrice: avg, count: props.length };
}

export async function updateProperty(id: number, updates: Partial<Property>): Promise<Property> {
  await delay(800);

  const allProperties = getMockProperties();
  const index = allProperties.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Property not found");

  const updatedProperty = { ...allProperties[index], ...updates };

  const newDb = [...allProperties];
  newDb[index] = updatedProperty;
  updateMockDb(newDb);

  return updatedProperty;
}
