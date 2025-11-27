import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import HelpCenterSearch from '@/components/HelpCenterSearch';
import HelpCategoryGrid from '@/components/HelpCategoryGrid';

export const metadata: Metadata = {
    title: 'Help Center - Help2Home',
    description: 'Find answers to your questions about Help2Home, payments, listings, and more.',
};

const popularArticles = [
    { title: 'How do I verify my identity?', slug: 'how-to-verify-identity', category: 'Account' },
    { title: 'What are the fees for landlords?', slug: 'landlord-fees', category: 'Landlords' },
    { title: 'How does the rent installment plan work?', slug: 'rent-installment-explained', category: 'Tenants' },
    { title: 'When will I receive my investment returns?', slug: 'investment-returns-schedule', category: 'Investors' },
    { title: 'Can I cancel my subscription?', slug: 'cancel-subscription', category: 'Billing' },
    { title: 'How to report a listing issue', slug: 'report-listing', category: 'Listings' },
];

export default function HelpCenterPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white pt-24 pb-20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        How can we help you?
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Search our knowledge base or browse categories to find the answers you need.
                    </p>
                    <HelpCenterSearch />
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn delay={0.1}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                            Browse by Category
                        </h2>
                        <HelpCategoryGrid />
                    </FadeIn>
                </div>
            </section>

            {/* Popular Articles Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn delay={0.2}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Popular Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularArticles.map((article, index) => (
                                <Link
                                    href={`/faq/${article.slug}`}
                                    key={index}
                                    className="group block p-6 rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-md transition-all"
                                >
                                    <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded mb-3 inline-block">
                                        {article.category}
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-brand-green transition-colors">
                                        {article.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-brand-green/5">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <FadeIn delay={0.3}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Still can't find what you're looking for?
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            Our support team is here to help. Send us a message and we'll get back to you as soon as possible.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                        >
                            Contact Support
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
