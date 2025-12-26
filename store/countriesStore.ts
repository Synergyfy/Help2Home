// store/countriesStore.ts
import { create } from 'zustand';

// Define proper types based on what country-state-city returns
export interface CountryType {
  name: string;
  isoCode: string;
  phonecode?: string;
}

export interface StateType {
  name: string;
  isoCode: string;
  countryCode: string;
}

export interface CityType {
  name: string;
  countryCode: string;
  stateCode: string;
}

interface CountriesState {
  countries: CountryType[];
  states: StateType[];
  cities: CityType[];
  setCountries: (countries: CountryType[]) => void;
  setStates: (states: StateType[]) => void;
  setCities: (cities: CityType[]) => void;
}

export const useCountriesStore = create<CountriesState>((set) => ({
  countries: [],
  states: [],
  cities: [],
  setCountries: (countries) => set({ countries }),
  setStates: (states) => set({ states }),
  setCities: (cities) => set({ cities }),
}));
