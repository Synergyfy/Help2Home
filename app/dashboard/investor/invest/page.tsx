'use client';

import React, { useState } from 'react';
import { MdSearch, MdFilterList, MdTrendingUp, MdVerified, MdLocationOn } from 'react-icons/md';
import InvestmentDetailsModal from '@/components/dashboard/investor/InvestmentDetailsModal';
import PartnerApplicationModal from '@/components/dashboard/investor/PartnerApplicationModal';

// Mock Data for "Marketplace"
const MOCK_OPPORTUNITIES = [
    {
        id: '1',
        title: 'Lekki Gardens Phase V',
        developer: 'Zenith Developments',
        location: 'Lekki, Lagos',
        image: '/assets/portfolio/1.jpg',
        investmentTerms: {
            minInvestment: 5000000,
            roi: 25,
            duration: 18,
            expectedReturn: '25% p.a',
            timeline: '18 Months',
            riskLevel: 'medium',
            roiFrequency: 'annually'
        },
        tags: ['Residential', 'High Yield']
    },
    {
        id: '2',
        title: 'Tech Hub Towers',
        developer: 'Urban Prime',
        location: 'Yaba, Lagos',
        image: '/assets/portfolio/2.jpg',
        investmentTerms: {
            minInvestment: 2000000,
            roi: 18,
            duration: 12,
            expectedReturn: '18% p.a',
            timeline: '12 Months',
            riskLevel: 'low',
            roiFrequency: 'quarterly'
        },
        tags: ['Commercial', 'Steady Income']
    },
    {
        id: '3',
        title: 'Banana Island Heights',
        developer: 'Zenith Developments',
        location: 'Banana Island, Lagos',
        image: '/assets/portfolio/1.jpg', // Reusing placeholder
        investmentTerms: {
            minInvestment: 20000000,
            roi: 40,
            duration: 24,
            expectedReturn: '40% total',
            timeline: '24 Months',
            riskLevel: 'high',
            roiFrequency: 'end-of-term'
        },
        tags: ['Luxury', 'Long Term']
    }
];

export default function InvestmentMarketplace() {
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [showPartnerModal, setShowPartnerModal] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState('');

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <InvestmentDetailsModal
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
                property={selectedProperty}
            />

            <PartnerApplicationModal
                isOpen={showPartnerModal}
                onClose={() => setShowPartnerModal(false)}
                developerName={selectedDeveloper}
            />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#111811] mb-2">Investment Marketplace</h1>
                <p className="text-gray-500">Discover high-yield real estate opportunities from vetted developers.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects, locations, or developers..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-brand-green outline-none"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
                    <MdFilterList /> Filter
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_OPPORTUNITIES.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        {/* Image Placeholder */}
                        <div className="h-48 bg-gray-200 relative">
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                {item.investmentTerms.riskLevel === 'low' ? '🛡️ Low Risk' : item.investmentTerms.riskLevel === 'medium' ? '⚖️ Balanced' : '🚀 High Growth'}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <MdLocationOn size={14} /> {item.location}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 bg-green-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">Target ROI</p>
                                    <p className="text-lg font-bold text-brand-green">{item.investmentTerms.roi}%</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">Min Entry</p>
                                    <p className="text-lg font-bold text-blue-600">₦{(item.investmentTerms.minInvestment / 1000000).toFixed(1)}M</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => {
                                        setSelectedDeveloper(item.developer);
                                        setShowPartnerModal(true);
                                    }}
                                    className="text-xs font-bold text-gray-500 flex items-center gap-1 hover:text-brand-green transition-colors"
                                >
                                    <MdVerified className="text-brand-green" /> {item.developer}
                                </button>
                                <button
                                    onClick={() => setSelectedProperty(item)}
                                    className="px-6 py-2 bg-[#111811] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors"
                                >
                                    View Deal
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
