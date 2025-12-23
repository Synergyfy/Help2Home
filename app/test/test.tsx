'use client';

import React, { useMemo } from 'react';
import MarketplaceHero from '@/components/MarketplaceHero';
import PropertyCard from '@/components/PropertyCard';
import AdvancedFilterSidebar from '@/components/marketplace/FilterModal';
import { useMarketplaceStore } from '@/store/marketplaceStore';

const allProperties = [
    {
        id: 1,
        image: '/assets/marketplace assets/home1.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        state: 'Abuja FCT',
        bedrooms: 3,
        bathrooms: 4,
        description: 'A spacious 3-bedroom flat located in a serene environment.',
        price: 2500000,
        monthlyPrice: 250000,
        featured: true,
        verified: true,
        isNew: false,
        propertyType: 'rent',
        category: 'property-to-rent'
    },
    {
        id: 2,
        image: '/assets/marketplace assets/Home2.png',
        title: 'Student Apartment, Victoria Island, Lagos',
        location: 'Prime location near Eko Hotel',
        state: 'Lagos',
        bedrooms: 2,
        bathrooms: 2,
        description: 'Perfect for students with modern amenities.',
        price: 1500000,
        monthlyPrice: 150000,
        featured: false,
        verified: true,
        isNew: true,
        propertyType: 'rent',
        category: 'student-property'
    },
    {
        id: 3,
        image: '/assets/marketplace assets/Home3.png',
        title: 'Corporate Flat, Lekki Phase 1, Lagos',
        location: 'Close to Lekki Toll Gate',
        state: 'Lagos',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Ideal for corporate executives and professionals.',
        price: 4000000,
        monthlyPrice: 400000,
        featured: true,
        verified: true,
        isNew: true,
        propertyType: 'rent',
        category: 'corporate-property'
    },
    {
        id: 4,
        image: '/assets/marketplace assets/Home4.png',
        title: '4 Bedroom Duplex, Maitama, Abuja',
        location: 'Exclusive Maitama District',
        state: 'Abuja FCT',
        bedrooms: 4,
        bathrooms: 5,
        description: 'Luxury living at its finest. Rent to own option available.',
        price: 7500000,
        monthlyPrice: 750000,
        featured: true,
        verified: true,
        isNew: false,
        propertyType: 'rent',
        category: 'rent-to-own'
    },
    {
        id: 5,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-4.png',
        title: '3 Bedroom House for Sale, Ikeja, Lagos',
        location: 'Near Ikeja City Mall',
        state: 'Lagos',
        bedrooms: 3,
        bathrooms: 3,
        description: 'Beautiful house available for purchase.',
        price: 55000000,
        monthlyPrice: 0,
        featured: false,
        verified: true,
        isNew: false,
        propertyType: 'buy',
        category: 'property-to-rent'
    },
    {
        id: 6,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-5.png',
        title: 'Service Apartment, Gwarinpa, Abuja',
        location: 'Gwarinpa Estate',
        state: 'Abuja FCT',
        bedrooms: 2,
        bathrooms: 2,
        description: 'Fully furnished service apartment with daily housekeeping.',
        price: 3500000,
        monthlyPrice: 350000,
        featured: false,
        verified: true,
        isNew: false,
        propertyType: 'service-apartment',
        category: 'property-to-rent'
    }
];

const categories = [
    { name: 'all', label: 'All Properties' },
    { name: 'property-to-rent', label: 'Property to Rent' },
    { name: 'student-property', label: 'Student Property' },
    { name: 'corporate-property', label: 'Corporate Property' },
    { name: 'rent-to-own', label: 'Rent To Own' },
];

export default function MarketplacePage() {
    const filters = useMarketplaceStore((state) => state.filters);
    const setCategory = useMarketplaceStore((state) => state.setCategory);
    const setSortBy = useMarketplaceStore((state) => state.setSortBy);

    // Filter and sort properties
    const filteredProperties = useMemo(() => {
        let filtered = allProperties.filter((property) => {
            // Property Type Filter
            if (property.propertyType !== filters.propertyType) return false;

            // Category Filter - only apply if we're on rent and category is not 'all'
            if (filters.propertyType === 'rent' && filters.category !== 'all' && property.category !== filters.category) {
                return false;
            }

            // Location Filter
            if (filters.location && property.state !== filters.location) return false;

            // Bedrooms Filter
            if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) return false;

            // Bathrooms Filter
            if (filters.bathrooms !== null && property.bathrooms < filters.bathrooms) return false;

            // Price Range Filter
            if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) return false;

            return true;
        });

        // Sort
        switch (filters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'featured':
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        return filtered;
    }, [filters]);

    const featuredProperties = useMemo(() => {
        return filteredProperties.filter(p => p.featured).slice(0, 3);
    }, [filteredProperties]);

    const getPropertyTypeLabel = () => {
        switch (filters.propertyType) {
            case 'rent': return 'Rent';
            case 'buy': return 'Buy';
            case 'service-apartment': return 'Service Apartments';
            default: return 'Properties';
        }
    };

    const getCategoryLabel = () => {
        const category = categories.find(c => c.name === filters.category);
        return category ? category.label : 'All Properties';
    };

    // Show category filters only for 'rent' type
    const showCategoryFilters = filters.propertyType === 'rent';

    return (
        <div className="min-h-screen bg-gray-50">
            <MarketplaceHero />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1">
                        <AdvancedFilterSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Section - Only show if there are featured properties */}
                        {featuredProperties.length > 0 && (
                            <div className="mb-12">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <span className="text-brand-green font-bold tracking-wider uppercase text-sm">
                                            Handpicked for you
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                                            Featured {getPropertyTypeLabel()}
                                        </h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredProperties.map((property) => (
                                        <PropertyCard
                                            key={property.id}
                                            id={property.id}
                                            image={property.image}
                                            title={property.title}
                                            location={property.location}
                                            bedrooms={property.bedrooms}
                                            bathrooms={property.bathrooms}
                                            description={property.description}
                                            price={`₦${property.price.toLocaleString()}`}
                                            monthlyPrice={property.monthlyPrice > 0 ? `₦${property.monthlyPrice.toLocaleString()}` : undefined}
                                            featured={property.featured}
                                            verified={property.verified}
                                            isNew={property.isNew}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Main Listings Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {getPropertyTypeLabel()} Properties
                                    {showCategoryFilters && filters.category !== 'all' && (
                                        <span className="text-brand-green"> - {getCategoryLabel()}</span>
                                    )}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                                </p>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="text-gray-500 text-sm font-medium whitespace-nowrap">Sort by:</span>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Filters - Only show for Rent */}
                        {showCategoryFilters && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setCategory(cat.name as any)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                            filters.category === cat.name
                                                ? 'bg-gray-900 text-white shadow-lg'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Properties Grid */}
                        {filteredProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        id={property.id}
                                        image={property.image}
                                        title={property.title}
                                        location={property.location}
                                        bedrooms={property.bedrooms}
                                        bathrooms={property.bathrooms}
                                        description={property.description}
                                        price={`₦${property.price.toLocaleString()}`}
                                        monthlyPrice={property.monthlyPrice > 0 ? `₦${property.monthlyPrice.toLocaleString()}` : undefined}
                                        featured={property.featured}
                                        verified={property.verified}
                                        isNew={property.isNew}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🏠</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your filters to see more results
                                </p>
                                <button
                                    onClick={() => useMarketplaceStore.getState().resetFilters()}
                                    className="px-6 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination - Only show if there are properties */}
                        {filteredProperties.length > 0 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2">
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-900 text-white font-bold shadow-lg">
                                        1
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                        2
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                        3
                                    </button>
                                    <span className="w-12 h-12 flex items-center justify-center text-gray-400 font-medium">...</span>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                        10
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}