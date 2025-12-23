'use client';

import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import heroBg from '@/About us assets/Rectangle 103.png';

type PropertyType = 'rent' | 'buy';
type PropertyCategory =
  | 'residential'
  | 'corporate'
  | 'student'
  | 'residential-buy'
  | 'commercial-buy'
  | 'rent-to-own';

const allCategories: { name: PropertyCategory; label: string; type: PropertyType | 'all' }[] = [
  { name: 'residential', label: 'Residential Property', type: 'rent' },
  { name: 'corporate', label: 'Corporate Property', type: 'rent' },
  { name: 'student', label: 'Student / Corpers Property', type: 'rent' },
  { name: 'residential-buy', label: 'Residential Property for Sale', type: 'buy' },
  { name: 'commercial-buy', label: 'Commercial Property for Sale', type: 'buy' },
  { name: 'rent-to-own', label: 'Rent To Own', type: 'rent' }, // optional
];

interface MarketplaceHeroProps {
  onOpenFilterModal?: () => void;
}

export default function MarketplaceHero({ onOpenFilterModal }: MarketplaceHeroProps) {
  const [propertyType, setPropertyType] = useState<PropertyType>('rent');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('residential');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = allCategories.filter(
    (c) => c.type === propertyType || c.type === 'all'
  );

  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 py-12">
        <div className="max-w-4xl w-full">
          {/* Badge */}
          <span className="inline-block py-1 px-3 rounded-full bg-green-600/20 text-green-500 border border-green-500/30 text-sm font-bold mb-4 backdrop-blur-sm">
            Verified Listings Only
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Find Your Future <br />
            <span className="text-green-500">Dream Home</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Discover thousands of verified properties. From cozy apartments to luxury villas, find the perfect space that fits your lifestyle.
          </p>

          {/* Search Panel */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl flex flex-col gap-4 md:gap-6">
            {/* Property Type Toggle */}
            <div className="flex justify-center gap-3">
              {(['rent', 'buy'] as PropertyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setPropertyType(type);
                    const defaultCategory = allCategories.find((c) => c.type === type)?.name;
                    setSelectedCategory(defaultCategory as PropertyCategory);
                  }}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    propertyType === type
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                  aria-pressed={propertyType === type}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full md:w-1/2 mx-auto">
              <button
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-all"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {categories.find((c) => c.name === selectedCategory)?.label || 'Select Category'}
                <span className="ml-2 transform transition-transform duration-200">
                  {isDropdownOpen ? '▲' : '▼'}
                </span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-30 overflow-hidden max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white transition-colors ${
                          selectedCategory === cat.name ? 'bg-green-500 text-white' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={onOpenFilterModal}
                className="bg-green-500 text-white px-12 py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
              >
                <RiSearchLine className="w-5 h-5" />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
