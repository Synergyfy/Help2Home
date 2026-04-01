'use client';

import FadeIn from './FadeIn';

const milestones = [
    "Investor Account Created",
    "Investment Opportunity Selected",
    "Investment Amount Confirmed",
    "Compliance & Verification Completed",
    "Funds Successfully Deployed",
    "Property Management Activated",
    "Rental Income Generated",
    "Returns Paid Out"
];

export default function InvestorTimeline() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
                        Your Investment Journey
                    </h2>
                </FadeIn>

                <div className="relative">
                    {/* Horizontal Line (Desktop) */}
                    <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                    {/* Vertical Line (Mobile) */}
                    <div className="md:hidden absolute top-0 left-6 h-full w-1 bg-gray-200 rounded-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-0">
                        {milestones.map((milestone, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div className="relative flex md:flex-col items-center md:text-center pl-16 md:pl-0">
                                    
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 md:top-4 w-5 h-5 rounded-full bg-brand-green border-4 border-white shadow-sm z-10"></div>

                                    {/* Content */}
                                    <div className="md:pt-12">
                                        <p className="text-sm font-bold text-gray-800">
                                            {milestone}
                                        </p>
                                    </div>

                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
