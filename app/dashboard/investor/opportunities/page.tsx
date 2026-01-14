'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineFilter,
    HiOutlineSearch
} from 'react-icons/hi2';

const OPPORTUNITIES = [
    {
        id: 1,
        title: "Lekki Phase 1 Luxury Penthouses",
        category: "Real Estate Equity",
        roi: "18.5%",
        tenure: "24 Months",
        minInvestment: 1000000,
        targetAmount: 500000000,
        raisedAmount: 375000000,
        type: "Growth",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Victoria Island Business Park",
        category: "Commercial Debt",
        roi: "12.0%",
        tenure: "12 Months",
        minInvestment: 500000,
        targetAmount: 1200000000,
        raisedAmount: 980000000,
        type: "Fixed Income",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Student Housing REIT - Yaba",
        category: "Residential Yield",
        roi: "15.2%",
        tenure: "36 Months",
        minInvestment: 250000,
        targetAmount: 300000000,
        raisedAmount: 45000000,
        type: "Income",
        image: "https://images.unsplash.com/photo-1555636222-3109ce4a7d2b?auto=format&fit=crop&q=80&w=800"
    }
];

export default function OpportunitiesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <FadeIn>
            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Investment Opportunities</h1>
                        <p className="text-gray-500 mt-1">Institutional-grade property ventures for the modern investor.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search ventures..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:border-brand-green outline-none shadow-sm transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                            <HiOutlineFilter className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Quick Stats Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-brand-green p-6 rounded-3xl text-white shadow-xl shadow-brand-green/20 relative overflow-hidden group">
                        <HiOutlineTrendingUp className="absolute right-[-10px] bottom-[-10px] size-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Average Portfolio ROI</p>
                        <h3 className="text-3xl font-black italic">14.8% <span className="text-sm font-medium not-italic opacity-80">Annually</span></h3>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <HiOutlineShieldCheck className="absolute right-[-10px] bottom-[-10px] size-32 text-gray-50 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Assets Under Mgmt</p>
                        <h3 className="text-3xl font-black text-gray-900 italic">₦4.2B <span className="text-sm font-medium not-italic text-gray-400 uppercase tracking-tighter">NGN</span></h3>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <HiOutlineClock className="absolute right-[-10px] bottom-[-10px] size-32 text-gray-50 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Upcoming Distributions</p>
                        <h3 className="text-3xl font-black text-gray-900 italic">Feb 15 <span className="text-sm font-medium not-italic text-gray-400 uppercase tracking-tighter">2026</span></h3>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['All', 'Real Estate Equity', 'Commercial Debt', 'Residential Yield', 'Infrastructure'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedCategory === cat
                                    ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {OPPORTUNITIES.map((item) => (
                        <div key={item.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-brand-green/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        {item.type}
                                    </span>
                                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100">
                                        {item.roi} ROI
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="mb-6">
                                    <p className="text-brand-green text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.category}</p>
                                    <h3 className="text-xl font-black text-gray-900 leading-tight">{item.title}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Min. Entry</p>
                                        <p className="text-sm font-black text-gray-900 italic">₦{(item.minInvestment / 1000).toFixed(0)}k</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tenure</p>
                                        <p className="text-sm font-black text-gray-900 italic">{item.tenure}</p>
                                    </div>
                                </div>

                                {/* Funding Progress */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Raised</p>
                                            <p className="text-lg font-black text-brand-green italic">₦{(item.raisedAmount / 1000000).toFixed(1)}M</p>
                                        </div>
                                        <span className="text-xs font-black text-gray-400 mb-1">{((item.raisedAmount / item.targetAmount) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
                                        <div
                                            className="bg-brand-green h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${(item.raisedAmount / item.targetAmount) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-brand-green text-white font-black rounded-2xl text-sm italic hover:bg-brand-green/90 hover:shadow-xl hover:shadow-brand-green/20 transition-all flex items-center justify-center gap-2">
                                    View Investment Details
                                    <HiOutlineTrendingUp size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    );
}
