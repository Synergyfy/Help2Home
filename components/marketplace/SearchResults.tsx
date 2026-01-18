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
import PropertyCard from '@/components/shared/PropertyCard';

// Icons
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi';
import { useState } from 'react';
import InvestmentDetailsModal from '@/components/dashboard/investor/InvestmentDetailsModal';

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
        setCurrentPage,
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

    const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
    const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

    const handleInvest = (property: any) => {
        setSelectedInvestment(property);
        setIsInvestModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <AdvancedFilterBar />

            <div className="container mx-auto px-6 md:px-12 py-10">
                <FadeIn direction="up">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {filters.propertyType === 'invest' ? 'Investment Opportunities' : 'Property Listings'}
                            </h1>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-red-600 font-bold">Error fetching properties.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {properties.map((property, index) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                                onInvest={handleInvest}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center mt-20 gap-3">
                        <PaginationButton
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            icon={<HiOutlineChevronLeft size={18} />}
                        />

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Show first, last, current, and pages around current
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === page
                                                ? 'bg-brand-green text-white shadow-lg shadow-green-100 scale-110'
                                                : 'bg-white border border-gray-100 text-gray-500 hover:border-brand-green hover:text-brand-green'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className="text-gray-400 font-bold px-1">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <PaginationButton
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            icon={<HiOutlineChevronRight size={18} />}
                        />
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

            <InvestmentDetailsModal
                isOpen={isInvestModalOpen}
                onClose={() => setIsInvestModalOpen(false)}
                property={selectedInvestment}
            />
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="h-48 md:h-56 bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                <div className="flex gap-2">
                    <div className="h-8 bg-gray-50 rounded-xl w-20" />
                    <div className="h-8 bg-gray-50 rounded-xl w-20" />
                </div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-100 rounded-full w-10" />
                        <div className="h-6 bg-gray-100 rounded-full w-24" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-100 rounded-full w-10 text-right" />
                        <div className="h-4 bg-gray-100 rounded-full w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaginationButton({ onClick, disabled, icon }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-brand-green hover:text-brand-green disabled:opacity-30 bg-white shadow-sm transition-all"
        >
            {icon}
        </button>
    );
}
