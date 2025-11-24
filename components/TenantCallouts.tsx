'use client';

import FadeIn from './FadeIn';

export default function TenantCallouts() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FadeIn direction="right">
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 h-full">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Important to Know Before You Start</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>You must have a valid ID and proof of income.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Employment verification is required.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Contact support if you have issues with document upload.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="left">
                        <div className="bg-green-50 p-8 rounded-2xl border border-green-100 h-full">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-100 rounded-full text-brand-green">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Why Tenants Choose Help2Home</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-brand-green mt-1">•</span>
                                            <span>Quick, flexible rent financing options.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-brand-green mt-1">•</span>
                                            <span>Lower upfront rent burden (pay 50% vs 100%).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-brand-green mt-1">•</span>
                                            <span>Easy and transparent approval process.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-brand-green mt-1">•</span>
                                            <span>Trusted by landlords across Nigeria.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
