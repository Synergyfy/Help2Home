'use client';

import { useState } from 'react';
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiCloseLine,
} from 'react-icons/ri';
import heroBg from '@/About us assets/Rectangle 103.png';

type PropertyType = 'rent' | 'buy';
type PropertyCategory =
  | 'residential'
  | 'corporate'
  | 'student'
  | 'residential-buy'
  | 'commercial-buy'
  | 'rent-to-own';

const allCategories: {
  name: PropertyCategory;
  label: string;
  type: PropertyType;
}[] = [
  { name: 'residential', label: 'Residential', type: 'rent' },
  { name: 'corporate', label: 'Corporate', type: 'rent' },
  { name: 'student', label: 'Student / Corpers', type: 'rent' },
  { name: 'rent-to-own', label: 'Rent To Own', type: 'rent' },
  { name: 'residential-buy', label: 'Residential (Buy)', type: 'buy' },
  { name: 'commercial-buy', label: 'Commercial (Buy)', type: 'buy' },
];

interface MarketplaceHeroProps {
  onOpenFilterModal?: () => void;
}

export default function MarketplaceHero({ onOpenFilterModal }: MarketplaceHeroProps) {
  const [propertyType, setPropertyType] = useState<PropertyType>('rent');
  const [selectedCategories, setSelectedCategories] = useState<PropertyCategory[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = allCategories.filter((c) => c.type === propertyType);

  const addCategory = (cat: PropertyCategory) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories((prev) => [...prev, cat]);
    }
    setIsDropdownOpen(false);
  };

  const removeCategory = (cat: PropertyCategory) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  return (
    <section className="relative min-h-[650px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Find Your <span className="text-green-400">Dream Home</span>
        </h1>
        <p className="text-white/80 max-w-xl mb-10">
          Browse verified listings across trusted property categories.
        </p>

        {/* Search Card */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Rent / Buy */}
          <div className="flex justify-center gap-2">
            {(['rent', 'buy'] as PropertyType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPropertyType(type);
                  setSelectedCategories([]);
                }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                  propertyType === type
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Selected Tags */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {selectedCategories.map((cat) => {
                const label = allCategories.find((c) => c.name === cat)?.label;
                return (
                  <span
                    key={cat}
                    className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {label}
                    <button
                      onClick={() => removeCategory(cat)}
                      className="hover:text-green-900"
                    >
                      <RiCloseLine />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Category Dropdown */}
          <div className="relative max-w-md mx-auto">
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400"
            >
              Add category
              <RiArrowDownSLine className="text-xl" />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => addCategory(cat.name)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenFilterModal}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-md transition"
            >
              <RiSearchLine className="text-lg" />
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
