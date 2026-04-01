'use client';

import FadeIn from './FadeIn';
import Logo from '@/components/shared/Logo';

const steps = [
    {
        title: 'Search',
        description: 'Browse thousands of verified listings to find your perfect home.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        )
    },
    {
        title: 'Book viewing',
        description: 'Schedule a physical or virtual tour directly with the agent or landlord.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        )
    },
    {
        title: 'Move in / Pay rent',
        description: 'Sign the lease digitally and pay your rent securely online.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        )
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn direction="up">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
                        <p className="text-gray-600 flex items-center justify-center gap-2">
                            Your journey to a new home is simple and secure with <Logo width={24} height={24} textClassName="text-base font-bold text-brand-green" />
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

                    {steps.map((step, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.2}
                            direction="up"
                            className="h-full"
                        >
                            <div className="flex flex-col items-center text-center h-full group">
                                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center text-brand-green mb-6 border-4 border-gray-50 group-hover:scale-110 transition-transform duration-300 group-hover:border-brand-green/20">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
