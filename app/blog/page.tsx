import React from 'react';
import { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
    title: 'Blog & News - Help2Home',
    description: 'Latest updates, renting tips, and success stories from Help2Home.',
};

// Mock Data
const posts = [
    {
        title: '5 Tips for First-Time Renters in Lagos',
        excerpt: 'Navigating the rental market can be tricky. Here are our top tips for securing your dream apartment without the stress.',
        slug: '5-tips-first-time-renters',
        date: 'Oct 24, 2023',
        author: 'Chidinma O.',
        category: 'Renting Tips',
        imageUrl: '/assets/images/Frame 604.png', // Using existing placeholder
        readTime: '5 min read',
    },
    {
        title: 'Understanding the New Landlord Verification Process',
        excerpt: 'We have updated our verification process to ensure even greater security for all parties. Here is what you need to know.',
        slug: 'landlord-verification-update',
        date: 'Oct 20, 2023',
        author: 'Team Help2Home',
        category: 'Company News',
        imageUrl: '/assets/images/Frame 605.png',
        readTime: '3 min read',
    },
    {
        title: 'Why Monthly Rent Payments are the Future',
        excerpt: 'The traditional annual rent model is changing. Discover the benefits of flexible monthly payments for tenants and landlords.',
        slug: 'monthly-rent-benefits',
        date: 'Oct 15, 2023',
        author: 'David A.',
        category: 'Market Insights',
        imageUrl: '/assets/images/Frame 608.png',
        readTime: '7 min read',
    },
    {
        title: 'Investment Opportunities in Lekki Phase 1',
        excerpt: 'Our latest analysis of the Lekki property market reveals high-yield opportunities for smart investors.',
        slug: 'lekki-investment-opportunities',
        date: 'Oct 10, 2023',
        author: 'Investment Team',
        category: 'Investing',
        imageUrl: '/assets/images/Rectangle 38.png',
        readTime: '6 min read',
    },
    {
        title: 'Success Story: How Sarah Moved into Her Dream Home',
        excerpt: 'Meet Sarah, a young professional who used Help2Home to finance her rent and move into a serviced apartment in Yaba.',
        slug: 'sarah-success-story',
        date: 'Oct 05, 2023',
        author: 'Community Team',
        category: 'Success Stories',
        imageUrl: '/assets/images/Rectangle 42.png',
        readTime: '4 min read',
    },
    {
        title: 'How to Prepare Your Property for Listing',
        excerpt: 'A checklist for landlords looking to attract high-quality tenants and maximize their rental income.',
        slug: 'prepare-property-listing',
        date: 'Sep 28, 2023',
        author: 'Property Mgmt',
        category: 'Landlord Tips',
        imageUrl: '/assets/images/Rectangle 1301.png',
        readTime: '5 min read',
    },
];

const categories = ['All', 'Company News', 'Renting Tips', 'Landlord Tips', 'Investing', 'Market Insights', 'Success Stories'];

export default function BlogIndexPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            News & <span className="text-brand-green">Insights</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10">
                            The latest updates, guides, and stories from the Help2Home team.
                        </p>

                        {/* Category Filter (Visual only for now) */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${index === 0
                                            ? 'bg-brand-green text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post (First one) */}
                    <div className="mb-16">
                        {/* Could be a special layout for the first post */}
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <FadeIn key={index} delay={index * 0.05}>
                                <BlogCard post={post} />
                            </FadeIn>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 flex justify-center gap-2">
                        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-400 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 rounded-lg bg-brand-green text-white">1</button>
                        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">2</button>
                        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">3</button>
                        <span className="px-2 py-2 text-gray-400">...</span>
                        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
