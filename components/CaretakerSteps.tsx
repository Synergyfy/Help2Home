'use client';

import FadeIn from './FadeIn';

const steps = [
    {
        number: '01',
        title: 'Register & Get Verified',
        description: 'Sign up as a caretaker, complete your profile, and verify your identity. Provide references and background information.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
            </svg>
        )
    },
    {
        number: '02',
        title: 'Get Assigned Properties',
        description: 'Once approved, you\'ll be assigned properties in your area to manage. View property details and responsibilities.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
        )
    },
    {
        number: '03',
        title: 'Manage & Maintain',
        description: 'Conduct property inspections, handle maintenance requests, coordinate repairs, and ensure tenant satisfaction.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        )
    },
    {
        number: '04',
        title: 'Earn & Grow',
        description: 'Receive consistent monthly payments for each property managed. Grow your portfolio and increase your earnings.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        )
    }
];

export default function CaretakerSteps() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Your Journey as a Caretaker
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From registration to earning, here's how you can start managing properties and building a steady income stream.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 relative group"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                    {step.number}
                                </div>
                                
                                <div className="mb-6 text-brand-green group-hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-br from-brand-green/5 to-brand-purple/5 rounded-2xl p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Flexible Schedule</h4>
                                <p className="text-gray-600 text-sm">Manage properties on your own time and schedule</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Steady Income</h4>
                                <p className="text-gray-600 text-sm">Earn consistent monthly payments per property</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Full Support</h4>
                                <p className="text-gray-600 text-sm">Get training and ongoing support from our team</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}