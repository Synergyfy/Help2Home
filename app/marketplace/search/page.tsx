'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useSearchProperties, useFeaturedProperties } from '@/hooks/useMarketplaceQueries';
import AdvancedFilterBar from '@/components/marketplace/AdvancedFilterBar';
import { useMarketplaceUrlSync } from '@/hooks/useMarketplaceUrlSync';


export default function MarketplacePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    useMarketplaceUrlSync();


    // Zustand store
    const {
        filters,
        currentPage,
        setPropertyType,
        setLocation,
        setCurrentPage,
        nextPage,
        prevPage,
        setSortBy,
    } = useMarketplaceStore();

  
   


    // Fetch properties with TanStack Query
    const {
        data: searchResults,
        isLoading,
        isFetching,
        error,
    } = useSearchProperties(
        {
            propertyType: filters.propertyType,
            location: filters.location,
            category: filters.category !== 'all' ? filters.category : undefined,
            bedrooms: filters.bedrooms,
            bathrooms: filters.bathrooms,
            priceMin: filters.priceRange.min,
            priceMax: filters.priceRange.max,
            radius: filters.radius,
            furnished: filters.furnished,
            parking: filters.parking,
            garden: filters.garden,
            pool: filters.pool,
            sortBy: filters.sortBy,
        },
        currentPage
    );

    // Fetch featured properties
    const { data: featuredProperties } = useFeaturedProperties(filters.propertyType, 3);

    const properties = searchResults?.properties || [];
    const total = searchResults?.total || 0;
    const totalPages = Math.ceil(total / 12);

    const getPropertyTypeLabel = () => {
        switch (filters.propertyType) {
            case 'rent': return 'Rent';
            case 'buy': return 'Buy';
            case 'service-apartment': return 'Service Apartments';
            case 'rent-to-own': return 'Rent to Own';
            default: return 'Properties';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Advanced Filter Bar */}
            <AdvancedFilterBar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Featured Properties Section */}
                {featuredProperties && featuredProperties.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Featured {getPropertyTypeLabel()} Properties
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Results Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {getPropertyTypeLabel()} Properties
                            {filters.location && ` in ${filters.location}`}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {isLoading ? 'Searching...' : `${total} ${total === 1 ? 'property' : 'properties'} found`}
                        </p>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={filters.sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                                <div className="h-64 bg-gray-200"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600 font-medium">Failed to load properties</p>
                        <p className="text-red-500 text-sm mt-1">Please try again later</p>
                    </div>
                )}

                {/* Properties Grid */}
                {!isLoading && !error && properties.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && !error && properties.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search filters or location</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && !error && totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl border ${currentPage === pageNum
                                            ? 'bg-purple-600 text-white font-bold shadow-lg border-purple-600'
                                            : 'border-gray-200 text-gray-700 hover:bg-gray-50 font-medium'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Loading overlay during pagination */}
                {isFetching && !isLoading && (
                    <div className="fixed bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-600">Updating...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Property Card Component
function PropertyCard({ property }: { property: any }) {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            onClick={() => router.push(`/marketplace/${property.id}`)}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.images[0] || '/placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {property.featured && (
                    <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                    </div>
                )}
                {property.isNew && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        New
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {property.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">{property.location}, {property.city}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.bedrooms} beds
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {property.bathrooms} baths
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-purple-600">
                            ₦{(property.price / 1000000).toFixed(1)}M
                        </div>
                        {property.monthlyPrice && (
                            <div className="text-xs text-gray-500">₦{(property.monthlyPrice / 1000).toFixed(0)}k/month</div>
                        )}
                    </div>
                    {property.verified && (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}