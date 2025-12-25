import { useQuery } from '@tanstack/react-query';
import { countriesApi } from '@/lib/countriesApi';
import { useCountriesStore } from '@/store/countriesStore';
import { useEffect } from 'react';

export function useCountries() {
  const setCountries = useCountriesStore((state) => state.setCountries);
  const countries = useCountriesStore((state) => state.countries);

  const query = useQuery({
    queryKey: ['countries'],
    queryFn: countriesApi.getCountries,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  useEffect(() => {
    if (query.data) {
      setCountries(query.data);
    }
  }, [query.data, setCountries]);

  return {
    ...query,
    countries: query.data || countries,
  };
}

export function useCountryStates(countryCode: string | null) {
  return useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => countriesApi.getStates(countryCode!),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });
}