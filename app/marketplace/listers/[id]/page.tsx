'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HiCheckCircle, HiOutlineLocationMarker } from 'react-icons/hi';
import { MdVerified, MdCall, MdMail, MdMap, MdOutlineVilla } from 'react-icons/md';
import FadeIn from '@/components/FadeIn';
import { getPropertiesByLister, getListerInfo } from '@/utils/properties';
import PropertyCard from '@/components/shared/PropertyCard';

export default function ListerPortfolioPage() {
    const params = useParams();
    const listerName = decodeURIComponent(params.id as string);
    const lister = getListerInfo(listerName);
    const properties = getPropertiesByLister(listerName);

    if (!lister) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Lister Not Found</h1>
                    <p className="text-gray-500 mb-6">The profile you're looking for doesn't exist.</p>
                    <Link href="/marketplace" className="text-brand-green font-bold hover:underline">
                        ← Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
                    <Link href="/marketplace" className="text-brand-green font-bold text-sm hover:underline mb-4 inline-block">
                        ← Back to Marketplace
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-12">
                {/* Identity Header Section */}
                <FadeIn>
                    <section className="flex flex-col lg:flex-row gap-10 items-start">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-2xl bg-white shadow-sm border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-full">
                                    {lister.image ? (
                                        <Image
                                            src={lister.image}
                                            alt={lister.name || 'Lister'}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="size-full flex items-center justify-center text-brand-green bg-brand-green/5 rounded-lg">
                                            <MdOutlineVilla size={64} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {lister.verified && (
                                <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
                                    <MdVerified className="text-brand-green text-3xl" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight">{lister.name}</h1>
                                {lister.verified && (
                                    <span className="flex items-center gap-1 bg-green-50 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        <HiCheckCircle className="text-sm" />
                                        Verified {lister.role}
                                    </span>
                                )}
                            </div>

                            <div className="max-w-2xl">
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Professional {lister.role} managing {properties.length} properties {lister.agency ? `with ${lister.agency}` : ''}.
                                    Dedicated to providing quality housing solutions and excellent service in the region.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button className="bg-brand-green text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-green-600 transition-all">
                                    Contact {lister.role}
                                </button>
                                <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </section>
                </FadeIn>

                {/* Properties Grid */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-bold">Managed Properties</h2>
                        <span className="text-brand-green text-sm font-bold">{properties.length} listings available</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property, index) => (
                            <PropertyCard key={property.id} property={property} index={index} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
