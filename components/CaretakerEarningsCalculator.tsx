'use client';

import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

// Info Icon Component
const InfoIcon = ({ tooltip }: { tooltip: string }) => (
    <div className="group relative inline-block ml-2 cursor-help">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-brand-green transition-colors">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48 text-center z-10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
    </div>
);

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
};

export default function CaretakerEarningsCalculator() {
    const [numberOfProperties, setNumberOfProperties] = useState(5);
    const [feePerProperty, setFeePerProperty] = useState(25000);
    const [hoursPerProperty, setHoursPerProperty] = useState(8);
    const [bonusPercentage, setBonusPercentage] = useState(10);

    const [results, setResults] = useState({
        monthlyEarnings: 0,
        annualEarnings: 0,
        hourlyRate: 0,
        totalHoursPerMonth: 0,
        bonusAmount: 0,
        totalWithBonus: 0
    });

    useEffect(() => {
        const baseMonthly = numberOfProperties * feePerProperty;
        const bonusAmount = (baseMonthly * bonusPercentage) / 100;
        const monthlyWithBonus = baseMonthly + bonusAmount;
        const annual = monthlyWithBonus * 12;
        const totalHours = numberOfProperties * hoursPerProperty;
        const hourlyRate = totalHours > 0 ? baseMonthly / totalHours : 0;

        setResults({
            monthlyEarnings: baseMonthly,
            annualEarnings: annual,
            hourlyRate,
            totalHoursPerMonth: totalHours,
            bonusAmount,
            totalWithBonus: monthlyWithBonus
        });
    }, [numberOfProperties, feePerProperty, hoursPerProperty, bonusPercentage]);

    return (
        <section id="calculator" className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your Potential Earnings</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                See how much you could earn as a caretaker based on the number of properties you manage.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                            {/* Input Section */}
                            <div className="p-8 lg:p-10 lg:w-1/2 space-y-8 bg-gray-50/50">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Number of Properties
                                            <InfoIcon tooltip="How many properties you plan to manage" />
                                        </label>
                                        <span className="text-brand-green font-bold">{numberOfProperties} {numberOfProperties === 1 ? 'Property' : 'Properties'}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="1"
                                        value={numberOfProperties}
                                        onChange={(e) => setNumberOfProperties(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1 Property</span>
                                        <span>20 Properties</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Fee Per Property
                                            <InfoIcon tooltip="Monthly management fee you earn per property" />
                                        </label>
                                        <span className="text-brand-green font-bold">{formatCurrency(feePerProperty)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="15000"
                                        max="50000"
                                        step="5000"
                                        value={feePerProperty}
                                        onChange={(e) => setFeePerProperty(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₦15,000</span>
                                        <span>₦50,000</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Hours Per Property/Month
                                            <InfoIcon tooltip="Estimated hours you'll spend per property monthly" />
                                        </label>
                                        <span className="text-brand-green font-bold">{hoursPerProperty} Hours</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="2"
                                        max="20"
                                        step="2"
                                        value={hoursPerProperty}
                                        onChange={(e) => setHoursPerProperty(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>2 Hours</span>
                                        <span>20 Hours</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Performance Bonus
                                            <InfoIcon tooltip="Potential bonus for excellent service and tenant satisfaction" />
                                        </label>
                                        <span className="text-brand-green font-bold">{bonusPercentage}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="25"
                                        step="5"
                                        value={bonusPercentage}
                                        onChange={(e) => setBonusPercentage(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0% (None)</span>
                                        <span>25% (Excellent)</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                        <div className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mt-0.5 mr-3 flex-shrink-0">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                            <div className="text-sm text-blue-900">
                                                <p className="font-semibold mb-1">Earnings Disclaimer</p>
                                                <p className="text-xs text-blue-700">Actual earnings may vary based on property location, condition, and service quality. Bonuses are performance-based.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results Section */}
                            <div className="lg:w-1/2 bg-brand-green text-white p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <h3 className="text-green-100 text-sm font-medium mb-1 uppercase tracking-wider">Your Potential Earnings</h3>
                                        <div className="h-px w-12 bg-green-400 mb-6"></div>
                                    </div>

                                    <div>
                                        <p className="text-green-100 text-sm mb-1">Monthly Earnings (with bonus)</p>
                                        <p className="text-4xl font-bold">{formatCurrency(results.totalWithBonus)}</p>
                                        <p className="text-green-100 text-xs mt-1">Base: {formatCurrency(results.monthlyEarnings)} + Bonus: {formatCurrency(results.bonusAmount)}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-green-100 text-xs mb-1">Annual Earnings</p>
                                            <p className="text-xl font-bold">{formatCurrency(results.annualEarnings)}</p>
                                        </div>
                                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-green-100 text-xs mb-1">Effective Hourly Rate</p>
                                            <p className="text-xl font-bold">{formatCurrency(results.hourlyRate)}/hr</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm text-green-50 border-t border-white/10 pt-4">
                                        <div className="flex justify-between">
                                            <span>Properties Managed</span>
                                            <span className="font-semibold">{numberOfProperties}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Hours/Month</span>
                                            <span className="font-semibold">{results.totalHoursPerMonth} hours</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Fee Per Property</span>
                                            <span className="font-semibold">{formatCurrency(feePerProperty)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs opacity-70">
                                            <span>Performance Bonus Rate</span>
                                            <span>{bonusPercentage}%</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => window.location.href = '/caretaker-signup'}
                                        className="w-full bg-white text-brand-green py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg mt-2"
                                    >
                                        Apply to Become a Caretaker
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Direct Deposit</h4>
                                <p className="text-gray-600 text-sm">Get paid directly to your bank account monthly</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Bonus Opportunities</h4>
                                <p className="text-gray-600 text-sm">Earn extra through excellent service ratings</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Growth Potential</h4>
                                <p className="text-gray-600 text-sm">Scale your income by managing more properties</p>
                            </div>
                        </div>
                        
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}