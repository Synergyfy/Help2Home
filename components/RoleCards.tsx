'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

const roles = [
    {
        title: 'Landlord / Agent',
        description: 'List your property, verify tenants, and receive rent upfront or monthly guaranteed.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        ),
        roleParam: 'landlord'
    },
    {
        title: 'Tenant',
        description: 'Find verified homes, pay rent monthly, and build your credit score.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        ),
        roleParam: 'tenant'
    },
    {
        title: 'Investor',
        description: 'Invest in real estate portfolios and earn attractive returns on verified properties.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="1" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
        ),
        roleParam: 'investor'
    }
];

export default function RoleCards() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn direction="up">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your path</h2>
                        <p className="text-gray-600">
                            Whether you own property or are looking for one, we have a solution for you.
                        </p>
                    </div>
                </FadeIn>

                {/* Grid on desktop, horizontal scroll on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 snap-x">
                    {roles.map((role, index) => (
                        <FadeIn
                            key={role.title}
                            delay={index * 0.1}
                            direction="up"
                            className="h-full"
                        >
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-start min-w-[260px] snap-center group h-full">
                                <div className="mb-4 p-3 bg-brand-green/10 text-brand-green rounded-lg group-hover:bg-brand-green group-hover:text-white transition-colors">
                                    {role.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                                    {role.description}
                                </p>
                                <div className="flex gap-3 w-full mt-auto">
                                    <Link href={`/signup?role=${role.roleParam}`} className="flex-1 text-center bg-brand-green text-white py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
                                        Get started
                                    </Link>
                                    <Link href={`/roles/${role.roleParam}`} className="flex-1 text-center border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
