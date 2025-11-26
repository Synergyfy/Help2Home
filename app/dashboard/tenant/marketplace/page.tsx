'use client';

import React from 'react';
import MarketplaceHero from '@/components/MarketplaceHero';
import PropertyCard from '@/components/PropertyCard';

const properties = [
    {
        id: 1,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'A spacious 3-bedroom flat located in a serene environment with excellent security and constant power supply.',
        price: '₦250,000.00 per year'
    },
    {
        id: 2,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-1.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Modern finishing with ample parking space and proximity to major markets and schools.',
        price: '₦650,000.00 per year'
    },
    {
        id: 3,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-2.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Newly built apartment with state-of-the-art facilities including a gym and swimming pool.',
        price: '₦400,000.00 per year'
    },
    {
        id: 4,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-3.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Luxury living at its finest. This property offers comfort, style, and convenience.',
        price: '₦750,000.00 per year'
    },
    {
        id: 5,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-4.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Affordable luxury in a prime location. Perfect for families and young professionals.',
        price: '₦550,000.00 per year'
    },
    {
        id: 6,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-5.png',
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        location: 'Very close to Wuse Within Super Market',
        bedrooms: 3,
        bathrooms: 4,
        description: 'Exquisite design and superior craftsmanship. A home you will be proud to own.',
        price: '₦750,000.00 per year'
    }
];

export default function MarketplacePage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <MarketplaceHero />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Houses For Rent</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        />
                    ))}
                </div>
            </div>

            {/* Pagination (Static for now) */}
            <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                        &lt;
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00853E] text-white font-bold">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        3
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        8
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        9
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        10
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
