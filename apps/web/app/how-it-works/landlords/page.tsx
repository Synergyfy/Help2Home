import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import LandlordSteps from '@/components/LandlordSteps';
import LandlordEarningsCalculator from '@/components/LandlordEarningsCalculator';
import HowItWorksFAQs from '@/components/HowItWorksFAQs';

export const metadata: Metadata = {
    title: 'How It Works for Landlords - Help2Home',
    description: 'Learn how to list your property, manage tenants, and receive full rent upfront with Help2Home.',
};

export default function LandlordHowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white pt-20 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    How Help2Home Works for <span className="text-brand-green">Landlords</span>
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    List your property, manage tenants effortlessly, and receive your full rent upfront while we handle the financing.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/list-property"
                                        className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 text-center"
                                    >
                                        List Your Property
                                    </Link>
                                    <Link
                                        href="#calculator"
                                        className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors text-center"
                                    >
                                        Calculate Earnings
                                    </Link>
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-4/3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                {/* Placeholder for Hero Illustration - In a real app, this would be an image */}
                                <div className="absolute inset-0 bg-linear-to-br from-brand-green/5 to-brand-purple/5 flex items-center justify-center">
                                    <span className="text-gray-400 font-medium">Landlord Journey Illustration</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Calculator Section */}

            <LandlordEarningsCalculator />


            {/* Steps Section */}
            <LandlordSteps />


            {/* CTA Section */}
            <section className="py-20 bg-linear-to-br from-brand-green/5 to-brand-purple/5">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ready to Maximize Your Rental Income?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/list-property"
                                className="bg-brand-green text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 w-full sm:w-auto"
                            >
                                List Your Property
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors w-full sm:w-auto"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ Section */}
            <HowItWorksFAQs />
        </main>
    );
}
