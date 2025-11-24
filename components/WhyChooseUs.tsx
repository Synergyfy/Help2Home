'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

const features = [
    {
        title: "Empowering Flexibility",
        description: "Flexible payment options and management tools for everyone.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
        )
    },
    {
        title: "Seamless Experience",
        description: "A smooth, intuitive platform for finding and managing homes.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        )
    },
    {
        title: "Exclusive Offers",
        description: "Access to verified listings and premium management features.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        )
    },
    {
        title: "Transparent Terms",
        description: "Clear, honest pricing and policies. No hidden fees.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
        )
    },
    {
        title: "Enhanced Security",
        description: "Your data and transactions are protected with top-tier security.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        )
    },
    {
        title: "Exceptional Support",
        description: "Our dedicated team is here to help you every step of the way.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        )
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-green-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                        <FadeIn direction="right">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video lg:aspect-[4/3]">
                                <Image
                                    src="/images/about/Rectangle 104.png"
                                    alt="Team working together"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>

                    {/* Features */}
                    <div className="w-full lg:w-1/2">
                        <FadeIn direction="left">
                            <h2 className="text-3xl font-bold mb-10 text-gray-900">Why Choose Us</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center shadow-md">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
