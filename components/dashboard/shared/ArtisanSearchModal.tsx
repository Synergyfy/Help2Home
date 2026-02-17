'use client';

import React, { useState } from 'react';
import { 
    HiOutlineXMark, 
    HiOutlineMagnifyingGlass, 
    HiOutlineStar,
    HiOutlineMapPin,
    HiOutlineCheckBadge,
    HiOutlineWrench
} from 'react-icons/hi2';
import Image from 'next/image';

interface Artisan {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    location: string;
    verified: boolean;
    image: string;
    priceRange: string;
    availability: 'Available Now' | 'Available Tomorrow' | 'Booked';
}

const MOCK_ARTISANS: Artisan[] = [
    {
        id: '1',
        name: 'Samuel Adebayo',
        category: 'Plumber',
        rating: 4.8,
        reviews: 124,
        location: 'Lekki, Lagos',
        verified: true,
        image: 'https://i.pravatar.cc/150?u=samuel',
        priceRange: '₦5,000 - ₦15,000',
        availability: 'Available Now'
    },
    {
        id: '2',
        name: 'John Okafor',
        category: 'Electrician',
        rating: 4.9,
        reviews: 89,
        location: 'Victoria Island, Lagos',
        verified: true,
        image: 'https://i.pravatar.cc/150?u=john',
        priceRange: '₦7,000 - ₦20,000',
        availability: 'Available Now'
    },
    {
        id: '3',
        name: 'Musa Ibrahim',
        category: 'Carpenter',
        rating: 4.7,
        reviews: 56,
        location: 'Surulere, Lagos',
        verified: false,
        image: 'https://i.pravatar.cc/150?u=musa',
        priceRange: '₦10,000 - ₦30,000',
        availability: 'Available Tomorrow'
    },
    {
        id: '4',
        name: 'Blessing Udoh',
        category: 'Painter',
        rating: 4.6,
        reviews: 42,
        location: 'Ikeja, Lagos',
        verified: true,
        image: 'https://i.pravatar.cc/150?u=blessing',
        priceRange: '₦15,000 - ₦50,000',
        availability: 'Available Now'
    },
    {
        id: '5',
        name: 'Tunde Lawson',
        category: 'AC Technician',
        rating: 5.0,
        reviews: 210,
        location: 'Ikoyi, Lagos',
        verified: true,
        image: 'https://i.pravatar.cc/150?u=tunde',
        priceRange: '₦12,000 - ₦25,000',
        availability: 'Available Now'
    }
];

interface ArtisanSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskTitle?: string;
}

export default function ArtisanSearchModal({ isOpen, onClose, taskTitle }: ArtisanSearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'AC Technician', 'Cleaner'];

    const filteredArtisans = MOCK_ARTISANS.filter(artisan => {
        const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             artisan.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || artisan.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                            <HiOutlineWrench className="text-brand-green" />
                            Find an Artisan
                        </h2>
                        {taskTitle && (
                            <p className="text-sm text-gray-500 font-medium">To fix: <span className="text-brand-green">{taskTitle}</span></p>
                        )}
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <HiOutlineXMark size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="p-6 space-y-4 bg-gray-50/50 border-b border-gray-100">
                    <div className="relative">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by name or skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border-2 ${
                                    selectedCategory === cat 
                                    ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-green-100' 
                                    : 'bg-white border-gray-100 text-gray-500 hover:border-brand-green/30 hover:text-brand-green'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {filteredArtisans.length > 0 ? (
                        filteredArtisans.map(artisan => (
                            <div key={artisan.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:border-brand-green/30 transition-all group">
                                <div className="relative size-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                                    <img src={artisan.image} alt={artisan.name} className="size-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-black text-gray-900 flex items-center gap-1 group-hover:text-brand-green transition-colors">
                                                {artisan.name}
                                                {artisan.verified && <HiOutlineCheckBadge className="text-brand-green" />}
                                            </h4>
                                            <p className="text-xs font-bold text-brand-green uppercase tracking-wider">{artisan.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                                                <HiOutlineStar className="fill-current" />
                                                {artisan.rating}
                                                <span className="text-gray-400 font-medium text-xs">({artisan.reviews})</span>
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-1">{artisan.availability}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                            <HiOutlineMapPin size={14} className="text-gray-400" />
                                            {artisan.location}
                                        </div>
                                        <div className="text-sm font-black text-gray-900">
                                            {artisan.priceRange}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-2 bg-brand-green text-white text-xs font-black rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-100">
                                            Hire Now
                                        </button>
                                        <button className="flex-1 py-2 bg-gray-50 text-gray-700 text-xs font-black rounded-xl hover:bg-gray-100 transition-all border border-gray-100">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center">
                            <HiOutlineWrench size={48} className="text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-bold">No artisans found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-brand-green/5 border-t border-brand-green/10 flex items-center justify-center gap-2">
                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">Powered by Artisan Platform</p>
                </div>
            </div>
        </div>
    );
}
