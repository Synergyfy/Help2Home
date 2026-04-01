'use client';

import React from 'react';
import { useUserStore } from '@/store/userStore';
import { mockProperties } from '@/utils/properties';
import PropertyCard from '@/components/shared/PropertyCard';
import Link from 'next/link';
import { IoHeartDislikeOutline } from 'react-icons/io5';

export default function WishlistPage() {
    const { wishlist } = useUserStore();

    // Filter properties that are in the wishlist
    const wishlistProperties = mockProperties.filter(p => 
        wishlist.includes(p.id.toString())
    );

    return (
        <div className="p-4 md:p-8 font-sans min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Saved Properties</h1>
                    <p className="text-gray-500 mt-2 font-medium text-lg">Manage your favorite listings and apply when you're ready.</p>
                </div>

                {wishlistProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistProperties.map((property, index) => (
                            <PropertyCard 
                                key={property.id} 
                                property={property} 
                                index={index} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm px-6 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                            <IoHeartDislikeOutline size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3">Your wishlist is empty</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium leading-relaxed">
                            You haven't saved any properties yet. Browse our marketplace to find your dream home.
                        </p>
                        <Link 
                            href="/marketplace" 
                            className="px-10 py-4 bg-brand-green text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
                        >
                            Explore Marketplace
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
