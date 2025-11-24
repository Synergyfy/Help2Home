'use client';

import Link from 'next/link';

const locations = [
    {
        city: 'Lekki',
        image: '/assets/Rectangle 38.png', // Using existing asset as placeholder
        averageRent: '₦2.5M',
        count: 120,
        slug: 'lekki'
    },
    {
        city: 'Victoria Island',
        image: '/assets/Rectangle 42.png', // Using existing asset as placeholder
        averageRent: '₦4.5M',
        count: 85,
        slug: 'victoria-island'
    },
    {
        city: 'Ikoyi',
        image: '/assets/Rectangle 1301.png', // Using existing asset as placeholder
        averageRent: '₦6.0M',
        count: 45,
        slug: 'ikoyi'
    },
    {
        city: 'Yaba',
        image: '/assets/Rectangle 38.png', // Using existing asset as placeholder
        averageRent: '₦800k',
        count: 200,
        slug: 'yaba'
    }
];

export default function LocationsGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Locations</h2>
                        <p className="text-gray-600">Discover homes in the most sought-after neighborhoods.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {locations.map((location) => (
                        <Link
                            key={location.city}
                            href={`/browse?location=${location.slug}`}
                            className="group relative rounded-xl overflow-hidden aspect-[3/4] block"
                        >
                            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors z-10"></div>
                            <img src={location.image} alt={location.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                                <h3 className="text-xl font-bold mb-1">{location.city}</h3>
                                <p className="text-sm font-medium opacity-90 mb-2">{location.count} listings</p>
                                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                                    Avg. Rent: {location.averageRent}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
