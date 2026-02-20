'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineArrowLeft,
    HiOutlineMapPin,
    HiOutlineBriefcase,
    HiOutlineScale,
    HiOutlineShieldCheck,
    HiOutlineArrowDownTray,
    HiOutlineEye,
    HiOutlineInformationCircle,
    HiOutlineChartBar,
    HiOutlineLockClosed,
    HiOutlineUserGroup,
    HiOutlineClock
} from 'react-icons/hi2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock Data
const RENTAL_OPPORTUNITIES = [
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
            behavioralRiskIndicators: ['Steady income history', 'Verified rental references'],
            projectionData: [
                { month: 'Month 1', repayment: 98, default: 2 },
                { month: 'Month 4', repayment: 97, default: 3 },
                { month: 'Month 8', repayment: 96, default: 4 },
                { month: 'Month 12', repayment: 96, default: 4 },
                { month: 'Month 16', repayment: 95, default: 5 },
                { month: 'Month 20', repayment: 95, default: 5 },
                { month: 'Month 24', repayment: 94, default: 6 },
            ]
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
    }
];

export default function RentalOpportunityDetailPage() {
    const { id } = useParams();
    const opportunity = RENTAL_OPPORTUNITIES.find(o => o.id === id) || RENTAL_OPPORTUNITIES[0];

    return (
        <FadeIn>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                {/* Back Button & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/dashboard/investor/opportunities"
                            className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest gap-2"
                        >
                            <HiOutlineArrowLeft size={16} />
                            Back to Opportunities
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-blue-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                                    Rental-Backed Investment
                                </span>
                                <span className={`bg-${opportunity.riskLevel === 'Low' ? 'green' : opportunity.riskLevel === 'Medium' ? 'yellow' : 'red'}-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest`}>
                                    {opportunity.riskLevel} Risk
                                </span>
                            </div>
                            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">{opportunity.propertyLocation}</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-2">
                                <HiOutlineMapPin className="text-brand-green" />
                                Lagos, Nigeria • ID: {opportunity.id}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link 
                            href={`/dashboard/investor/opportunities/rental/${opportunity.id}/invest`}
                            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl text-sm  hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all"
                        >
                            Invest in this Tenant
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Property & Tenant Details */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* 1. Property Summary */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                            <div className="h-96 relative">
                                <img src={opportunity.propertyImage} alt="Property" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Property Value</p>
                                    <p className="text-lg font-semibold text-gray-900 ">₦{(opportunity.totalPropertyValue / 1000000).toFixed(1)}M</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Funding Gap</p>
                                    <p className="text-lg font-semibold text-blue-600 ">₦{((opportunity.amountRequired - opportunity.amountRaised) / 1000000).toFixed(1)}M</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Monthly Installment</p>
                                    <p className="text-lg font-semibold text-gray-900 ">₦{opportunity.monthlyInstallment.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Duration</p>
                                    <p className="text-lg font-semibold text-gray-900 ">{opportunity.repaymentDuration} Months</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Tenant Profile (Anonymized) */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-blue-50 rounded-2xl">
                                    <HiOutlineLockClosed className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Tenant Dossier (KYC Approved)</h2>
                                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Verified Identity • Identity Protected</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineBriefcase className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Employment</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 ">{opportunity.tenantProfile.employmentStatus}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineChartBar className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Monthly Income</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 ">{opportunity.tenantProfile.monthlyIncomeRange}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineShieldCheck className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Stability Score</span>
                                        </div>
                                        <span className="text-sm font-semibold text-brand-green ">{opportunity.tenantProfile.incomeStabilityScore}/100</span>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineScale className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Rent-to-Income</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 ">{opportunity.tenantProfile.rentToIncomeRatio}%</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineUserGroup className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Household Size</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 ">{opportunity.tenantProfile.householdSize} Persons</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <HiOutlineClock className="text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-tight">Employment Tenure</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 ">{opportunity.tenantProfile.employmentDuration}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Affordability Results */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-8">Affordability Analysis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                                    <p className="text-[10px] font-semibold text-green-600 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-2xl font-semibold text-green-700  flex items-center gap-2">
                                        {opportunity.affordabilityResults.status}
                                        <HiOutlineShieldCheck size={24} />
                                    </p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 col-span-2">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Disposable Income Est.</p>
                                    <p className="text-2xl font-semibold text-gray-900 ">₦{opportunity.affordabilityResults.disposableIncomeEstimate.toLocaleString()}<span className="text-sm font-medium not- text-gray-400"> / month</span></p>
                                </div>
                                <div className="col-span-full space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Expense Analysis</p>
                                        <p className="text-sm text-gray-700 font-medium">{opportunity.affordabilityResults.expenseAnalysis}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Debt Obligations</p>
                                        <p className="text-sm text-gray-700 font-medium">{opportunity.affordabilityResults.debtObligations}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Repayment Waterfall */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-8">Repayment Waterfall</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm font-semibold text-gray-900">Monthly Flow: ₦{opportunity.monthlyInstallment.toLocaleString()}</p>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Auto-Deduction Model</p>
                                </div>
                                <div className="w-full h-12 flex rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                                    <div className="bg-red-500 h-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ width: '5%' }}>5% Fee</div>
                                    <div className="bg-blue-600 h-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ width: '15%' }}>15% ROI</div>
                                    <div className="bg-brand-green h-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ width: '80%' }}>80% Principal Recovery</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Platform Fee (5%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Investor Return (15%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-brand-green" />
                                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Principal Recovery (80%)</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Risk & Terms */}
                    <div className="space-y-10">
                        
                        {/* 4. Default Risk & Repayment Projection */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-8">Risk Projection</h2>
                            
                            {/* Gauge (Simplified) */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="12" 
                                                strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * opportunity.defaultRisk.probabilityOfFullRepayment / 100)} 
                                                strokeLinecap="round" transform="rotate(-90 50 50)" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-semibold text-gray-900">{opportunity.defaultRisk.probabilityOfFullRepayment}%</span>
                                        <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest text-center px-6 leading-tight">Repayment Confidence</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 mt-6">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Prob. of Default</span>
                                    <span className="text-sm font-semibold text-red-600 ">{opportunity.defaultRisk.probabilityOfDefault}%</span>
                                </div>
                                
                                <div className="h-40 w-full mt-4">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Repayment vs Default Projection</p>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={opportunity.defaultRisk.projectionData}>
                                            <defs>
                                                <linearGradient id="colorRepayment" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                            <XAxis dataKey="month" hide />
                                            <YAxis hide domain={[0, 100]} />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                labelStyle={{ fontWeight: '900', fontSize: '10px', textTransform: 'uppercase' }}
                                            />
                                            <Area type="monotone" dataKey="repayment" stroke="#2563EB" fillOpacity={1} fill="url(#colorRepayment)" strokeWidth={3} />
                                            <Area type="monotone" dataKey="default" stroke="#EF4444" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Risk Indicators</p>
                                    <div className="flex flex-wrap gap-2">
                                        {opportunity.defaultRisk.behavioralRiskIndicators.map((indicator, idx) => (
                                            <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-3 py-1 rounded-full">
                                                {indicator}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Investment Terms */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-8">Investment Terms</h2>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Expected Return</p>
                                    <p className="text-sm font-semibold text-gray-900 ">{opportunity.investmentTerms.investorReturn}% Annually</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Payout Frequency</p>
                                    <p className="text-sm font-semibold text-gray-900 ">{opportunity.investmentTerms.paymentDistributionFrequency}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Platform Fee</p>
                                    <p className="text-sm font-semibold text-gray-900 ">{opportunity.investmentTerms.platformServiceFee}% of distributions</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Exit Strategy</p>
                                    <p className="text-sm font-semibold text-gray-900 ">{opportunity.investmentTerms.exitTerms}</p>
                                </div>
                            </div>
                        </section>

                        {/* 7. Legal & Agreement Docs */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-8">Legal Documents</h2>
                            <div className="space-y-4">
                                <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineArrowDownTray className="text-gray-400" />
                                        <span className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Repayment Agreement</span>
                                    </div>
                                    <HiOutlineEye className="text-gray-400" />
                                </button>
                                <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineArrowDownTray className="text-gray-400" />
                                        <span className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Participation Terms</span>
                                    </div>
                                    <HiOutlineEye className="text-gray-400" />
                                </button>
                                <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineArrowDownTray className="text-gray-400" />
                                        <span className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Risk Disclosure</span>
                                    </div>
                                    <HiOutlineEye className="text-gray-400" />
                                </button>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </FadeIn>
    );
}
