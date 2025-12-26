'use client';

import FadeIn from './FadeIn';

const steps = [
    { title: "Create Your Help2Home Account", description: "Sign up quickly to access our platform and start your journey.", icon: "1" },
    { title: "Explore Available Properties", description: "Browse our verified listings to find a home that suits your needs and budget.", icon: "2" },
    { title: "Book a Property Inspection", description: "Schedule a visit to see the property in person and ensure it's the right fit.", icon: "3" },
    { title: "Start Your Rent Financing Application", description: "Begin the application process for flexible rent payment options.", icon: "4" },
    { title: "Fill in the Application Form", description: "Provide necessary details and upload required documents for verification.", icon: "5" },
    { title: "Financial Institution Review", description: "Our partner bank reviews your application, creditworthiness, and affordability.", icon: "6" },
    { title: "Receive Approval & Sign Agreements", description: "Once approved, review and sign the tenancy and financing agreements.", icon: "7" },
    { title: "Landlord Receives the Rent Payment", description: "Our partner bank pays the full rent directly to the landlord upfront.", icon: "8" },
    { title: "Move Into Your Home", description: "Collect your keys and move into your new home immediately.", icon: "9" },
    { title: "Start Making Your Monthly or Weekly Repayments", description: "Begin repaying the loan in convenient installments over the agreed period.", icon: "10" },
    { title: "Late Payments and Penalties", description: "Avoid penalties by paying on time. Missed payments may incur fees.", icon: "11" },
    { title: "Earn Rewards for On-Time Payments", description: "Build a positive credit history and earn rewards for consistent payments.", icon: "12" },
    { title: "Renewal or New Application", description: "Easily renew your lease or apply for a new property when your term ends.", icon: "13" },
    { title: "Built-in Support", description: "Access our support team anytime for assistance with your tenancy or payments.", icon: "14" }
];

export default function TenantSteps() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Step-by-Step Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A simple guide showing everything you need to know to move into your dream home.
                        </p>
                    </div>
                </FadeIn>

                {/* Mobile Slider */}
                <div className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 pb-4 -mx-6 px-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="min-w-[85%] snap-center"
                        >
                            <FadeIn delay={index * 0.03}>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg mb-6">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">
                                        {step.description}
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    ))}
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <FadeIn key={index} delay={index * 0.05}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
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
