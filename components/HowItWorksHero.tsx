'use client';

import FadeIn from './FadeIn';
import Link from 'next/link';

export default function HowItWorksHero() {
    return (
        <section className="bg-white pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-6 md:px-12 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Rent now. Pay later.<br />
                        <span className="text-brand-green">Simple, fast and trusted.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Pay 50% upfront, move in today. Our banking partners pay landlords immediately — you repay the rest over 3–10 months.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#calculator"
                            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 w-full sm:w-auto"
                        >
                            Calculate Repayment
                        </a>
                        <Link
                            href="/how-it-works/tenants"
                            className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors w-full sm:w-auto"
                        >
                            For Tenants
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
