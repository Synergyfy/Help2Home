'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineArrowTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineClock,
    HiOutlineFunnel,
    HiOutlineMagnifyingGlass,
    HiOutlineHome,
    HiOutlineUserGroup
} from 'react-icons/hi2';
import { RentalOpportunity } from '@/types/rentalInvestment';
import Link from 'next/link';

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
    },
    {
        id: 4,
        title: "Centenary City Commercial Hub",
        category: "Real Estate Equity",
        roi: "22.0%",
        tenure: "48 Months",
        minInvestment: 5000000,
        targetAmount: 2500000000,
        raisedAmount: 1200000000,
        type: "Growth",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        developer: "Zenith Developments",
        isDeveloperListed: true
    }
];

const RENTAL_OPPORTUNITIES: RentalOpportunity[] = [
    {
        id: 'rent_001',
        propertyImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
        propertyLocation: 'Surulere, Lagos',
        monthlyInstallment: 150000,
        totalPropertyValue: 35000000,
        amountRequired: 25000000,
        amountRaised: 15000000,
        tenantAffordabilityScore: 82,
        riskLevel: 'Low',
        repaymentDuration: 24,
        expectedROI: 12.5,
        repaymentSuccessProjection: 95,
        tenantProfile: {
            employmentStatus: 'Employed (Full-time)',
            monthlyIncomeRange: '₦500k - ₦750k',
            incomeStabilityScore: 88,
            rentToIncomeRatio: 20,
            householdSize: 3,
            employmentDuration: '4 Years'
        },
        affordabilityResults: {
            incomeVsRepaymentRatio: 4.5,
            expenseAnalysis: 'Healthy savings buffer',
            debtObligations: 'Minimal (Low)',
            disposableIncomeEstimate: 350000,
            status: 'Pass'
        },
        defaultRisk: {
            probabilityOfFullRepayment: 96,
            probabilityOfDefault: 4,
            stressTestedConfidence: 92,
            paymentReliabilityScore: 90,
            behavioralRiskIndicators: ['Steady income history', 'Verified rental references']
        },
        investmentTerms: {
            duration: 24,
            monthlyRepaymentSchedule: 'Monthly auto-deduction',
            investorReturn: 12.5,
            paymentDistributionFrequency: 'Monthly',
            platformServiceFee: 5,
            latePaymentPenalty: '10% of installment',
            exitTerms: 'Flexible after 12 months'
        }
    },
    {
        id: 'rent_002',
        propertyImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
        propertyLocation: 'Ikeja Gra, Lagos',
        monthlyInstallment: 250000,
        totalPropertyValue: 55000000,
        amountRequired: 40000000,
        amountRaised: 32000000,
        tenantAffordabilityScore: 75,
        riskLevel: 'Medium',
        repaymentDuration: 36,
        expectedROI: 14.0,
        repaymentSuccessProjection: 88,
        tenantProfile: {
            employmentStatus: 'Self-Employed (Verified Business)',
            monthlyIncomeRange: '₦800k - ₦1.2M',
            incomeStabilityScore: 72,
            rentToIncomeRatio: 25,
            householdSize: 4,
            employmentDuration: '6 Years'
        },
        affordabilityResults: {
            incomeVsRepaymentRatio: 3.8,
            expenseAnalysis: 'Moderate business overhead',
            debtObligations: 'Business loan (Active)',
            disposableIncomeEstimate: 450000,
            status: 'Pass'
        },
        defaultRisk: {
            probabilityOfFullRepayment: 89,
            probabilityOfDefault: 11,
            stressTestedConfidence: 85,
            paymentReliabilityScore: 82,
            behavioralRiskIndicators: ['Stable business revenue', 'Occasional payment delays in credit history']
        },
        investmentTerms: {
            duration: 36,
            monthlyRepaymentSchedule: 'Monthly auto-deduction',
            investorReturn: 14.0,
            paymentDistributionFrequency: 'Monthly',
            platformServiceFee: 5,
            latePaymentPenalty: '12% of installment',
            exitTerms: 'Secondary market listing available'
        }
    }
];

export default function OpportunitiesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeTab, setActiveTab] = useState<'PROJECTS' | 'RENTAL'>('PROJECTS');

    return (
        <FadeIn>
            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Investment Opportunities</h1>
                        <p className="text-gray-500 mt-1">Institutional-grade property ventures for the modern investor.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search ventures..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:border-brand-green outline-none shadow-sm transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                            <HiOutlineFunnel className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Main Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('PROJECTS')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${activeTab === 'PROJECTS' ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <HiOutlineHome size={20} />
                        Property Projects
                        {activeTab === 'PROJECTS' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green rounded-t-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('RENTAL')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${activeTab === 'RENTAL' ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <HiOutlineUserGroup size={20} />
                        Tenant Rental Financing
                        {activeTab === 'RENTAL' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green rounded-t-full" />
                        )}
                    </button>
                </div>

                {/* Quick Stats Banner (Optional: could vary by tab) */}
                {activeTab === 'PROJECTS' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-brand-green p-6 rounded-3xl text-white shadow-xl shadow-brand-green/20 relative overflow-hidden group">
                            <HiOutlineArrowTrendingUp className="absolute right-[-10px] bottom-[-10px] size-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                            <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1">Average Portfolio ROI</p>
                            <h3 className="text-3xl font-semibold ">14.8% <span className="text-sm font-medium not- opacity-80">Annually</span></h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                            <HiOutlineShieldCheck className="absolute right-[-10px] bottom-[-10px] size-32 text-gray-50 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Total Assets Under Mgmt</p>
                            <h3 className="text-3xl font-semibold text-gray-900 ">₦4.2B <span className="text-sm font-medium not- text-gray-400 uppercase tracking-tighter">NGN</span></h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                            <HiOutlineClock className="absolute right-[-10px] bottom-[-10px] size-32 text-gray-50 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Upcoming Distributions</p>
                            <h3 className="text-3xl font-semibold text-gray-900 ">Feb 15 <span className="text-sm font-medium not- text-gray-400 uppercase tracking-tighter">2026</span></h3>
                        </div>
                    </div>
                )}


                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {(activeTab === 'PROJECTS'
                        ? ['All', 'Real Estate Equity', 'Commercial Debt', 'Residential Yield', 'Infrastructure']
                        : ['All', 'Low Risk', 'Medium Risk', 'High Risk', 'Short Term', 'High ROI', 'Lagos', 'Under ₦5M']
                    ).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedCategory === cat
                                ? (activeTab === 'PROJECTS' ? 'bg-brand-green border-brand-green' : 'bg-blue-600 border-blue-600') + ' text-white shadow-lg'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeTab === 'PROJECTS' ? (
                        OPPORTUNITIES.map((item) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-brand-green/90 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                                            {item.type}
                                        </span>
                                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100">
                                            {item.roi} ROI
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="mb-6">
                                        <p className="text-brand-green text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">{item.category}</p>
                                        <h3 className="text-xl font-semibold text-gray-900 leading-tight">{item.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Min. Entry</p>
                                            <p className="text-sm font-semibold text-gray-900 ">₦{(item.minInvestment / 1000).toFixed(0)}k</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Tenure</p>
                                            <p className="text-sm font-semibold text-gray-900 ">{item.tenure}</p>
                                        </div>
                                    </div>

                                    {/* Funding Progress */}
                                    <div className="space-y-3 mb-8">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Raised</p>
                                                <p className="text-lg font-semibold text-brand-green ">₦{(item.raisedAmount / 1000000).toFixed(1)}M</p>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-400 mb-1">{((item.raisedAmount / item.targetAmount) * 100).toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
                                            <div
                                                className="bg-brand-green h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(item.raisedAmount / item.targetAmount) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/marketplace/${item.id}`}
                                        className="w-full py-4 bg-brand-green text-white font-semibold rounded-2xl text-sm  hover:bg-brand-green/90 hover:shadow-xl hover:shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Investment Details
                                        <HiOutlineArrowTrendingUp size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        RENTAL_OPPORTUNITIES.map((item) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img src={item.propertyImage} alt={item.propertyLocation} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`bg-${item.riskLevel === 'Low' ? 'green' : item.riskLevel === 'Medium' ? 'yellow' : 'red'}-600/90 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest`}>
                                            {item.riskLevel} Risk
                                        </span>
                                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100">
                                            {item.expectedROI}% ROI
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-gray-100">
                                            <p className="text-[8px] font-semibold text-gray-400 uppercase leading-none mb-1">Tenant Score</p>
                                            <p className="text-sm font-semibold text-brand-green leading-none">{item.tenantAffordabilityScore}/100</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="mb-6">
                                        <p className="text-blue-600 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">Rental-Backed Investment</p>
                                        <h3 className="text-xl font-semibold text-gray-900 leading-tight">Tenant in {item.propertyLocation}</h3>
                                        <p className="text-xs font-medium text-gray-500 mt-1">{item.tenantProfile.employmentStatus}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Monthly Repayment</p>
                                            <p className="text-sm font-semibold text-gray-900 ">₦{item.monthlyInstallment.toLocaleString()}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Repayment Tenure</p>
                                            <p className="text-sm font-semibold text-gray-900 ">{item.repaymentDuration} Months</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Success Projection</p>
                                            <p className="text-sm font-semibold text-brand-green ">{item.repaymentSuccessProjection}%</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Financing Required</p>
                                            <p className="text-sm font-semibold text-blue-600 ">₦{(item.amountRequired / 1000000).toFixed(1)}M</p>
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/dashboard/investor/opportunities/rental/${item.id}`}
                                        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl text-sm  hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Tenant Application
                                        <HiOutlineArrowTrendingUp size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </FadeIn>
    );
}
