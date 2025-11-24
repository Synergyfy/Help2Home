import TenantSteps from '@/components/TenantSteps';
import TenantTimeline from '@/components/TenantTimeline';
import TenantCallouts from '@/components/TenantCallouts';
import HowItWorksFAQs from '@/components/HowItWorksFAQs';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How It Works for Tenants - Help2Home',
    description: 'A simple guide showing everything you need to know to move into your dream home using flexible rent financing.',
};

export default function TenantHowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white pt-20 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-6 md:px-12">
                    <FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    How Help2Home Works for <span className="text-brand-green">Tenants</span>
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    A simple guide showing everything you need to know to move into your dream home using flexible rent financing.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/browse"
                                        className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors text-center"
                                    >
                                        Browse Properties
                                    </Link>
                                    <Link
                                        href="/apply"
                                        className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 text-center"
                                    >
                                        Start Application
                                    </Link>
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
                                {/* Placeholder for Hero Illustration */}
                                <span className="text-gray-400 font-medium">Tenant Journey Illustration</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <TenantSteps />
            <TenantTimeline />
            <TenantCallouts />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-brand-green/5 to-brand-purple/5">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ready to Move Into Your New Home?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/apply"
                                className="bg-brand-green text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 w-full sm:w-auto"
                            >
                                Start Application
                            </Link>
                            <Link
                                href="/browse"
                                className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors w-full sm:w-auto"
                            >
                                Browse Properties
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <HowItWorksFAQs />
        </main>
    );
}
