import { MarketplaceFilters } from '@/store/marketplaceStore';

export function filtersToSearchParams(
  filters: MarketplaceFilters,
  page: number
) {
  const params = new URLSearchParams();

  params.set('type', filters.propertyType);

  if (filters.location) params.set('location', filters.location);
  if (filters.category !== 'all') params.set('category', filters.category);

  if (filters.bedrooms) params.set('beds', String(filters.bedrooms));
  if (filters.bathrooms) params.set('baths', String(filters.bathrooms));

  params.set('min', String(filters.priceRange.min));
  params.set('max', String(filters.priceRange.max));

  if (filters.radius) params.set('radius', String(filters.radius));

  if (filters.furnished !== null)
    params.set('furnished', filters.furnished ? '1' : '0');

  if (filters.parking !== null)
    params.set('parking', filters.parking ? '1' : '0');

  if (filters.garden !== null)
    params.set('garden', filters.garden ? '1' : '0');

  if (filters.pool !== null)
    params.set('pool', filters.pool ? '1' : '0');

  params.set('sort', filters.sortBy);
  params.set('page', String(page));

  return params.toString();
}
