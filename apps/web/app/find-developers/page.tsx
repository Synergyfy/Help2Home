'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiSearch, HiChevronDown, HiStar, HiLocationMarker, HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import FadeIn from '@/components/FadeIn';
import { getAllDevelopers, searchDevelopers, filterDevelopersByLocation, filterDevelopersByRating } from '@/utils/properties';
import { HiOutlineLocationMarker, HiOutlineSearch, HiOutlineAdjustments, HiOutlineScale, HiOutlineStar } from 'react-icons/hi';

export default function FindDevelopersPage() {
    const developers = getAllDevelopers();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Calculate pagination
    const totalPages = Math.ceil(developers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDevelopers = developers.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-background-light pb-20">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                    alt="Modern Real Estate Development"
                    fill
                    className="object-cover brightness-[0.3]"
                />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <FadeIn direction="up">
                        <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Help2Home Partnership</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Property Developer Catalog</h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">Discover and connect with top-rated developers across the country. Filter by expertise and reputation.</p>
                    </FadeIn>
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-10">
                {/* Page Heading */}
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Developer Directory</h2>
                    <p className="text-gray-600 text-lg max-w-2xl">Browse verified developers and explore their investment opportunities</p>
                </div>

                {/* Search and Filter Ribbon */}
                <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-col lg:flex-row gap-2">
                    <div className="flex-1 relative">
                        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            className="w-full pl-12 pr-4 h-12 bg-transparent border-none focus:ring-0 text-base placeholder:text-gray-400"
                            placeholder="Search for developer or company name..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="h-auto lg:h-8 w-px bg-gray-200 hidden lg:block self-center"></div>
                    <div className="flex flex-wrap gap-2 p-1">
                        <button className="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-medium hover:bg-gray-200 transition-colors">
                            <span>Region</span>
                            <HiChevronDown className="text-sm" />
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-medium hover:bg-gray-200 transition-colors">
                            <span>Project Type</span>
                            <HiChevronDown className="text-sm" />
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-medium hover:bg-gray-200 transition-colors">
                            <span>Rating</span>
                            <HiChevronDown className="text-sm" />
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-lg bg-brand-green/10 text-brand-green px-4 text-sm font-bold hover:bg-brand-green/20 transition-colors ml-auto lg:ml-2">
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* Developer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentDevelopers.map((dev, index) => (
                        <FadeIn key={dev.id} delay={index * 0.05} direction="up">
                            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="p-4 flex flex-col h-full">
                                    <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${dev.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop'})` }}></div>
                                        {dev.verified && (
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                                <MdVerified className="text-brand-green" size={12} />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    <div className="grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold group-hover:text-brand-green transition-colors line-clamp-2">{dev.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                            <HiLocationMarker className="text-sm text-brand-green" />
                                            <span>{dev.location}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-gray-100 text-[11px] font-semibold px-2 py-1 rounded">{dev.activeProjects} Active Projects</span>
                                            <span className="bg-gray-100 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                                                <HiStar className="text-[12px] text-yellow-500" />
                                                {dev.rating} Rating
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/find-developers/${dev.id}`}>
                                        <button className="w-full bg-brand-green text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                                            View Portfolio
                                            <HiArrowRight className="text-sm" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <HiChevronLeft />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`size-10 flex items-center justify-center rounded-lg font-bold ${currentPage === pageNum
                                    ? 'bg-brand-green text-white'
                                    : 'border border-gray-200 hover:bg-gray-100 transition-colors'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                            <span className="mx-1 text-gray-400">...</span>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <HiChevronRight />
                    </button>
                </div>

                {/* Developer CTA */}
                <FadeIn direction="up" delay={0.4}>
                    <div className="mt-20 bg-brand-green rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-green/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Are You a Developer?</h2>
                            <p className="text-green-50 max-w-xl mx-auto mb-10 text-lg opacity-90">Join Help2Home&apos;s exclusive developer network and showcase your premium projects to thousands of qualified leads.</p>
                            <button className="bg-white text-brand-green px-10 py-5 rounded-2xl font-black hover:bg-green-50 transition-all shadow-xl uppercase tracking-widest text-sm">
                                Register Your Agency
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    );
}
