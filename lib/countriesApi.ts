import type { Country } from '@/store/countriesStore';

const BASE_URL = 'https://api.countrystatecity.in/v1';
const API_KEY = process.env.NEXT_PUBLIC_COUNTRIES_API_KEY || '';

interface CountryResponse {
  name: string;
  iso2: string;
}

interface StateResponse {
  name: string;
  iso2: string;
}

export const countriesApi = {
  getCountries: async (): Promise<Country[]> => {
    try {
      const response = await fetch(`${BASE_URL}/countries`, {
        headers: {
          'X-CSCAPI-KEY': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }

      const data: CountryResponse[] = await response.json();
      
      return data.map((country) => ({
        name: country.name,
        code: country.iso2,
        states: [],
      }));
    } catch (error) {
      console.error('Error fetching countries:', error);
      return getFallbackCountries();
    }
  },

  getStates: async (countryCode: string): Promise<StateResponse[]> => {
    try {
      const response = await fetch(`${BASE_URL}/countries/${countryCode}/states`, {
        headers: {
          'X-CSCAPI-KEY': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch states');
      }

      const data: StateResponse[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching states:', error);
      return [];
    }
  },
};

function getFallbackCountries(): Country[] {
  return [
    { name: 'Nigeria', code: 'NG', states: [] },
    { name: 'United States', code: 'US', states: [] },
    { name: 'United Kingdom', code: 'GB', states: [] },
    { name: 'Canada', code: 'CA', states: [] },
    { name: 'Ghana', code: 'GH', states: [] },
    { name: 'South Africa', code: 'ZA', states: [] },
    { name: 'Kenya', code: 'KE', states: [] },
  ];
}