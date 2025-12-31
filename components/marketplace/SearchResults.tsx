'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useSearchProperties } from '@/hooks/useMarketplaceQueries';
import AdvancedFilterBar from '@/components/marketplace/AdvancedFilterBar';
import { useMarketplaceUrlSync } from '@/hooks/useMarketplaceUrlSync';
import FadeIn from '@/components/FadeIn';

// Icons
import {
    HiOutlineLocationMarker,
    HiOutlineHeart,
    HiCheckCircle,
    HiOutlineChevronLeft,
    HiOutlineChevronRight
} from 'react-icons/hi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';

const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    return `₦${amount.toLocaleString()}`;
};

export default function MarketplacePage() {
    useMarketplaceUrlSync();

    const {
        filters,
        currentPage,
        nextPage,
        prevPage,
        setSortBy,
    } = useMarketplaceStore();

    // Preserved exactly as requested
    const {
        data: searchResults,
        isLoading,
        isFetching,
        error,
    } = useSearchProperties(
        {
            ...filters,
            location: filters.location?.trim() || undefined,
            category: filters.category !== 'all' ? filters.category : undefined,
            status: filters.status !== 'all' ? filters.status : undefined,

            bedrooms: (filters.bedrooms?.min ?? 0) > 0 ? (filters.bedrooms.min as number) : undefined,
            bathrooms: (filters.bathrooms?.min ?? 0) > 0 ? (filters.bathrooms.min as number) : undefined,
            priceMin: filters.priceRange.min > 0 ? filters.priceRange.min : undefined,
            priceMax: filters.priceRange.max < 1000000000 ? filters.priceRange.max : undefined,

            newBuild: filters.newBuild === 'show-only' ? 'only' : filters.newBuild,
            sharedOwnership: filters.sharedOwnership === 'show-only' ? 'only' : filters.sharedOwnership,
            retirementHomes: filters.retirementHomes === 'show-only' ? 'only' : filters.retirementHomes,
            auctions: filters.auction === 'show-only' ? 'only' : filters.auction,
            offPlan: filters.offPlan === 'show-only' ? 'only' : filters.offPlan,

            verified: filters.isVerified || undefined,
            garden: filters.garden || undefined,
            parking: filters.parking || undefined,
            balcony: filters.balcony || undefined,
            serviced: filters.serviced || undefined,
            electricity: filters.electricity || undefined,
            waterSupply: filters.waterSupply || undefined,
            security: filters.security || undefined,
            gym: filters.gym || undefined,
            pool: filters.pool || undefined,
            furnished: filters.furnished || undefined,

            chainFree: filters.chainFree || undefined,
            reducedPrice: filters.reducedPrice || undefined,
            underOffer: filters.underOffer || undefined,

            keywords: filters.keywords?.trim() || undefined,
            ownership: filters.ownership !== 'all' ? filters.ownership : undefined,
            addedToZoopla: filters.dateAdded !== 'anytime' ? filters.dateAdded : undefined,

            sortBy: filters.sortBy,
        },
        currentPage
    );

    const properties = searchResults?.properties || [];
    const total = searchResults?.total || 0;
    const totalPages = Math.ceil(total / 12);

    return (
        <div className="min-h-screen bg-white pb-20">
            <AdvancedFilterBar />

            <div className="container mx-auto px-6 md:px-12 py-10">
                <FadeIn direction="up">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Listings</h1>
                            <p className="text-gray-600">
                                {isLoading
                                    ? 'Loading properties...'
                                    : `Showing ${total} ${filters.isVerified ? 'verified' : 'total'} listings.`}
                            </p>
                        </div>

                        <select
                            value={filters.sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none transition-all"
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest Listed</option>
                        </select>
                    </div>
                </FadeIn>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-red-600 font-bold">Error fetching properties.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {properties.map((property, index) => (
                            <PropertyCard key={property.id} property={property} index={index} />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-4">
                        <PaginationButton onClick={prevPage} disabled={currentPage === 1} icon={<HiOutlineChevronLeft size={20} />} />
                        <span className="text-sm font-bold text-gray-500">Page {currentPage} of {totalPages}</span>
                        <PaginationButton onClick={nextPage} disabled={currentPage === totalPages} icon={<HiOutlineChevronRight size={20} />} />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isFetching && !isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase z-50 shadow-2xl">
                        Updating Results...
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function PropertyCard({ property, index }: { property: any; index: number }) {
    return (
        <FadeIn delay={index * 0.05} direction="up" className="h-full">
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={property.images?.[0] || '/placeholder.jpg'}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {property.verified && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-brand-green/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                <HiCheckCircle size={12} /> VERIFIED
                            </span>
                        </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <HiOutlineHeart size={18} />
                    </button>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-bold text-gray-900 truncate text-sm">{property.title}</h3>
                        <p className="text-brand-green font-bold text-sm whitespace-nowrap">{formatCurrency(property.price)}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate flex items-center gap-1">
                        <HiOutlineLocationMarker size={14} className="text-gray-400" />
                        {property.location}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            <IoBedOutline size={14} /> <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            <IoWaterOutline size={14} /> <span>{property.bathrooms} Baths</span>
                        </div>
                    </div>
                    <Link href={`/marketplace/${property.id}`} className="block w-full text-center border border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-2.5 rounded-lg font-bold transition-all text-xs mt-auto">
                        View Listing
                    </Link>
                </div>
            </div>
        </FadeIn>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl h-[380px] animate-pulse border border-gray-100 overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-5 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-10 bg-gray-50 rounded w-full mt-4" />
            </div>
        </div>
    );
}

function PaginationButton({ onClick, disabled, icon }: any) {
    return (
        <button onClick={onClick} disabled={disabled} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-brand-green hover:text-brand-green disabled:opacity-30 bg-white shadow-sm transition-all">
            {icon}
        </button>
    );
}