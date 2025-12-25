import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Country {
  name: string;
  code: string;
  states?: State[];
}

export interface State {
  name: string;
  code: string;
}

interface CountriesState {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
  getCountryByName: (name: string) => Country | undefined;
  getStatesByCountry: (countryName: string) => State[];
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useCountriesStore = create<CountriesState>()(
  persist(
    (set, get) => ({
      countries: [],
      hasHydrated: false,
      
      setCountries: (countries) => set({ countries }),
      
      getCountryByName: (name) => {
        return get().countries.find((c) => c.name === name);
      },
      
      getStatesByCountry: (countryName) => {
        const country = get().getCountryByName(countryName);
        return country?.states || [];
      },
      
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'countries-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);