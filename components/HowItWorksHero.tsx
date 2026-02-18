'use client';

import FadeIn from './FadeIn';
import Link from 'next/link';
import Logo from '@/components/shared/Logo';

export default function HowItWorksHero() {
    return (
        <section className="bg-white pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight flex flex-wrap items-center justify-center gap-x-4">
                        How <Logo width={60} height={60} textClassName="text-4xl md:text-6xl font-bold text-brand-green" className="inline-flex" /> Works for <span className="text-brand-green">Everyone</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Whether you're a tenant looking for flexible rent payments, a landlord wanting guaranteed income,
                        or an investor seeking attractive returns — <span className="inline-flex align-middle translate-y-[-2px]"><Logo width={24} height={24} textClassName="text-lg md:text-xl font-bold text-brand-green" /></span> makes real estate simple and profitable.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/how-it-works/tenants"
                            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 w-full sm:w-auto"
                        >
                            For Tenants
                        </Link>
                        <Link
                            href="/how-it-works/landlords"
                            className="bg-white text-gray-900 border-2 border-brand-green px-8 py-4 rounded-full font-bold hover:bg-brand-green hover:text-white transition-colors w-full sm:w-auto"
                        >
                            For Landlords
                        </Link>
                        <Link
                            href="/how-it-works/investors"
                            className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors w-full sm:w-auto"
                        >
                            For Investors
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
