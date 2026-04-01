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

const categories = [
    { name: 'All', active: true },
    { name: 'Apartments', active: false },
    { name: 'Duplexes', active: false },
    { name: 'Bungalows', active: false },
    { name: 'Villas', active: false },
    { name: 'Office Space', active: false },
];

export default function BrowsePage() {
    const [sortBy, setSortBy] = useState('featured');

    return (
        <div className="min-h-screen bg-gray-50">
            <MarketplaceHero />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
                {/* Featured Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-brand-green font-bold tracking-wider uppercase text-sm">Handpicked for you</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Featured Properties</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-brand-green font-medium transition-colors">
                            View all featured
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {properties.filter(p => p.featured).slice(0, 3).map((property) => (
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

                {/* Main Listings */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                    {/* Category Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${cat.active
                                        ? 'bg-gray-900 text-white shadow-lg'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <span className="text-gray-500 text-sm font-medium whitespace-nowrap">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                        >
                            <option value="featured">Featured</option>
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

                {/* Pagination */}
                <div className="flex justify-center mt-16">
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
            </div>
        </div>
    );
}
