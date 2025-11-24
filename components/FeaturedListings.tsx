'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

const listings = [
    {
        id: 1,
        title: 'Modern 2-Bed Apartment',
        location: 'Lekki Phase 1, Lagos',
        price: '₦2,500,000',
        badges: ['Verified', '2 Beds', '2 Baths'],
        imageColor: 'bg-slate-200',
    },
    {
        id: 2,
        title: 'Luxury 3-Bed Duplex',
        location: 'Victoria Island, Lagos',
        price: '₦5,000,000',
        badges: ['Verified', '3 Beds', '4 Baths'],
        imageColor: 'bg-slate-300',
    },
    {
        id: 3,
        title: 'Cozy Studio Apartment',
        location: 'Yaba, Lagos',
        price: '₦800,000',
        badges: ['Verified', 'Studio', '1 Bath'],
        imageColor: 'bg-slate-200',
    },
    {
        id: 4,
        title: 'Serviced 4-Bed Terrace',
        location: 'Ikoyi, Lagos',
        price: '₦12,000,000',
        badges: ['Verified', '4 Beds', '5 Baths'],
        imageColor: 'bg-slate-300',
    }
];

export default function FeaturedListings() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn direction="up">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
                            <p className="text-gray-600">Explore our top verified properties available for rent.</p>
                        </div>
                        <Link href="/browse" className="hidden md:inline-block text-brand-green font-medium hover:underline">
                            View all listings &rarr;
                        </Link>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {listings.map((listing, index) => (
                        <FadeIn
                            key={listing.id}
                            delay={index * 0.1}
                            direction="up"
                            className="h-full"
                        >
                            <div className="group block bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                                {/* Image Area */}
                                <Link href={`/listing/${listing.id}`} className="relative block aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <div className={`w-full h-full ${listing.imageColor} flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                        <span className="bg-brand-green/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">Verified</span>
                                    </div>

                                    {/* Favorite Button */}
                                    <button
                                        className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
                                        aria-label="Save listing to favourites"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                    </button>
                                </Link>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 truncate pr-2">{listing.title}</h3>
                                        <p className="text-brand-green font-bold whitespace-nowrap">{listing.price}</p>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4 truncate flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {listing.location}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
                                        {listing.badges.slice(1).map((badge, i) => (
                                            <span key={i} className="bg-gray-100 px-2 py-1 rounded">{badge}</span>
                                        ))}
                                    </div>

                                    <Link href={`/listing/${listing.id}`} className="block w-full text-center border border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-2 rounded-md font-medium transition-colors text-sm mt-auto">
                                        View listing
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/browse" className="inline-block text-brand-green font-medium hover:underline">
                        View all listings &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
