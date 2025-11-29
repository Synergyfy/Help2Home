'use client';

import React, { useState } from 'react';
import MarketplaceHero from '@/components/MarketplaceHero';
import PropertyCard from '@/components/PropertyCard';

const properties = [
    {
        id: 1,
        image: '/assets/marketplace assets/home1.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'A spacious 3-bedroom flat located in a serene environment with excellent security and constant power supply.',
        price: '₦2,500,000',
        monthlyPrice: '₦250,000',
        featured: true,
        verified: true,
        isNew: false
    },
    {
        id: 2,
        image: '/assets/marketplace assets/Home2.png',
        title: '3 Bedroom Flat, Victoria Island, Lagos',
        location: 'Prime location near Eko Hotel',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Modern finishing with ample parking space and proximity to major markets and schools.',
        price: '₦6,500,000',
        monthlyPrice: '₦650,000',
        featured: false,
        verified: true,
        isNew: true
    },
    {
        id: 3,
        image: '/assets/marketplace assets/Home3.png',
        title: '3 Bedroom Flat, Lekki Phase 1, Lagos',
        location: 'Close to Lekki Toll Gate',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Newly built apartment with state-of-the-art facilities including a gym and swimming pool.',
        price: '₦4,000,000',
        monthlyPrice: '₦400,000',
        featured: true,
        verified: true,
        isNew: true
    },
    {
        id: 4,
        image: '/assets/marketplace assets/Home4.png',
        title: '3 Bedroom Flat, Maitama, Abuja',
        location: 'Exclusive Maitama District',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Luxury living at its finest. This property offers comfort, style, and convenience.',
        price: '₦7,500,000',
        monthlyPrice: '₦750,000',
        featured: true,
        verified: true,
        isNew: false
    },
    {
        id: 5,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-4.png',
        title: '3 Bedroom Flat, Ikeja, Lagos',
        location: 'Near Ikeja City Mall',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Affordable luxury in a prime location. Perfect for families and young professionals.',
        price: '₦5,500,000',
        monthlyPrice: '₦550,000',
        featured: false,
        verified: true,
        isNew: false
    },
    {
        id: 6,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-5.png',
        title: '3 Bedroom Flat, Gwarinpa, Abuja',
        location: 'Gwarinpa Estate',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Exquisite design and superior craftsmanship. A home you will be proud to own.',
        price: '₦3,500,000',
        monthlyPrice: '₦350,000',
        featured: false,
        verified: true,
        isNew: false
    }
];

export default function MarketplacePage() {
    const [sortBy, setSortBy] = useState('featured');

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <MarketplaceHero />

            {/* Header with Filters */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Houses For Rent</h2>
                        <p className="text-gray-600">Showing {properties.length} verified properties</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            id={property.id}
                            image={property.image}
                            title={property.title}
                            location={property.location}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            description={property.description}
                            price={property.price}
                            monthlyPrice={property.monthlyPrice}
                            featured={property.featured}
                            verified={property.verified}
                            isNew={property.isNew}
                        />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                        &lt;
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00853E] text-white font-bold">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                        3
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                        10
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
