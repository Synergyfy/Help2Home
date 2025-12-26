// hooks/useCountries.ts
import { useQuery } from '@tanstack/react-query';
import { Country, State, City } from 'country-state-city';
import { useCountriesStore } from '@/store/countriesStore';

export function useCountries() {
  const setCountries = useCountriesStore((state) => state.setCountries);
  const countries = useCountriesStore((state) => state.countries);

  const query = useQuery({
    queryKey: ['countries'],
    queryFn: () => {
      const all = Country.getAllCountries();
      setCountries(all);
      return all;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  return { ...query, countries };
}

export function useStates(countryCode: string | null) {
  const setStates = useCountriesStore((state) => state.setStates);
  const states = useCountriesStore((state) => state.states);

  const query = useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => {
      if (!countryCode) return [];
      const all = State.getStatesOfCountry(countryCode);
      setStates(all);
      return all;
    },
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { ...query, states };
}

export function useCities(countryCode: string | null, stateCode: string | null) {
  const setCities = useCountriesStore((state) => state.setCities);
  const cities = useCountriesStore((state) => state.cities);

  const query = useQuery({
    queryKey: ['cities', countryCode, stateCode],
    queryFn: () => {
      if (!countryCode || !stateCode) return [];
      const all = City.getCitiesOfState(countryCode, stateCode);
      setCities(all);
      return all;
    },
    enabled: !!countryCode && !!stateCode,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { ...query, cities };
}
