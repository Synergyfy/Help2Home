'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';
import Link from 'next/link';

const roles = [
    {
        id: 'tenant',
        label: 'For Tenants',
        steps: [
            "Search & choose a home",
            "Apply via platform",
            "Verification & Approval",
            "Choose repayment terms",
            "Pay down payment & move in",
            "Repay balance monthly"
        ],
        cta: "See Full Tenant Guide",
        link: "/how-it-works/tenants"
    },
    {
        id: 'landlord',
        label: 'For Landlords',
        steps: [
            "List your property",
            "Tenant applies & is verified",
            "Partner bank guarantees payment",
            "Receive full rent upfront",
            "Ongoing management via platform",
            "Enjoy consistent returns"
        ],
        cta: "List Your Property",
        link: "/list-property"
    },
    {
        id: 'investor',
        label: 'For Investors',
        steps: [
            "Discover opportunities",
            "Partner with landlords",
            "Fund rent-support programs",
            "Receive scheduled returns",
            "Track portfolio dashboard",
            "Re-invest or exit"
        ],
        cta: "Start Investing",
        link: "#" // Placeholder
    }
];

export default function RoleFlowTabs() {
    const [activeTab, setActiveTab] = useState('tenant');

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works for everyone</h2>
                        <p className="text-gray-600">Tailored processes for every stakeholder in the ecosystem.</p>
                    </div>
                </FadeIn>

                {/* Tabs Header */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 inline-flex">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setActiveTab(role.id)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === role.id
                                        ? 'bg-brand-green text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-4xl mx-auto">
                    {roles.map((role) => (
                        activeTab === role.id && (
                            <FadeIn key={role.id}>
                                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{role.label} Process</h3>
                                            <ul className="space-y-4">
                                                {role.steps.map((step, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-brand-green flex items-center justify-center text-xs font-bold mt-0.5">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="text-gray-700">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-8">
                                                <Link
                                                    href={role.link}
                                                    className="inline-block bg-brand-green text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
                                                >
                                                    {role.cta}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 rounded-xl aspect-square md:aspect-[4/3] flex items-center justify-center text-gray-400">
                                            {/* Placeholder for illustration */}
                                            <span className="text-sm font-medium">Illustration for {role.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}
