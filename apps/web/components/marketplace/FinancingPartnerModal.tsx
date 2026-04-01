'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiCheckBadge, HiOutlineShieldCheck, HiArrowRight } from 'react-icons/hi2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface FinancingPartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: {
        id: number | string;
        title: string;
        price: number;
        type: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own' | 'invest';
    };
}

const PARTNERS = [
    {
        id: 'access-bank',
        name: 'Access Bank PLC',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Access_Bank_Logo.svg/1200px-Access_Bank_Logo.svg.png',
        interestRate: '12.5%',
        maxTerm: '24 Months',
        note: 'Fast verification, Instant disbursement',
        color: '#003366',
        loanTypes: ['rent', 'mortgage']
    },
    {
        id: 'gtbank',
        name: 'GTBank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Guaranty_Trust_Bank_logo.svg/1200px-Guaranty_Trust_Bank_logo.svg.png',
        interestRate: '14.0%',
        maxTerm: '12 Months',
        note: 'Requires KYC video, High approval rate',
        color: '#f36d21',
        loanTypes: ['rent']
    },
    {
        id: 'zenith-bank',
        name: 'Zenith Bank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Zenith_Bank_logo.svg/1200px-Zenith_Bank_logo.svg.png',
        interestRate: '13.2%',
        maxTerm: '36 Months',
        note: 'Competitive rates, Document-based verification',
        color: '#e31d23',
        loanTypes: ['rent', 'mortgage']
    }
];

export default function FinancingPartnerModal({ isOpen, onClose, property }: FinancingPartnerModalProps) {
    const router = useRouter();
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [isLaunching, setIsLaunching] = useState(false);

    const isMortgage = property.type === 'buy';
    const loanTypeLabel = isMortgage ? 'Mortgage' : 'Rent Financing';

    const handleLaunch = () => {
        if (!selectedPartner) return;
        
        setIsLaunching(true);
        const partnerName = PARTNERS.find(p => p.id === selectedPartner)?.name;
        toast.info(`Initiating secure handshake with ${partnerName}...`);

        // Simulate API call to get redirect URL
        setTimeout(() => {
            const amount = isMortgage ? property.price * 0.8 : property.price; // 80% mortgage vs full rent
            router.push(`/bank-portal/sso/launch?sso_token=mock_token_123&propertyId=${property.id}&partnerId=${selectedPartner}&type=${isMortgage ? 'mortgage' : 'rent'}&amount=${amount}`);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Select {loanTypeLabel} Partner</h2>
                                <p className="text-sm text-gray-500 font-medium">Choose an institution to fund your {isMortgage ? 'purchase' : 'rent'} for <span className="text-brand-green">{property.title}</span></p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <HiXMark size={24} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-1 gap-4">
                                {PARTNERS.filter(p => isMortgage ? p.loanTypes.includes('mortgage') : p.loanTypes.includes('rent')).map((partner) => (
                                    <button
                                        key={partner.id}
                                        onClick={() => setSelectedPartner(partner.id)}
                                        className={`group relative flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left ${
                                            selectedPartner === partner.id
                                                ? 'border-brand-green bg-green-50/50 ring-4 ring-green-50'
                                                : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }`}
                                    >
                                        <div className="relative size-16 shrink-0 bg-white rounded-2xl border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                                            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">{partner.name}</h3>
                                                {selectedPartner === partner.id && <HiCheckBadge className="text-brand-green" />}
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium line-clamp-1">{partner.note}</p>
                                            
                                            <div className="flex gap-4 mt-3">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rate</p>
                                                    <p className="text-sm font-black text-brand-green">{partner.interestRate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isMortgage ? 'Max Tenure' : 'Max Term'}</p>
                                                    <p className="text-sm font-black text-gray-900">{isMortgage ? '25 Years' : partner.maxTerm}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                            selectedPartner === partner.id ? 'bg-brand-green border-brand-green' : 'border-gray-200 group-hover:border-gray-300'
                                        }`}>
                                            {selectedPartner === partner.id && <div className="size-2 bg-white rounded-full" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                                <HiOutlineShieldCheck className="text-blue-600 shrink-0" size={20} />
                                <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                                    Your personal and property details will be securely pre-filled in the partner portal to save you time. 
                                    Help2Home uses bank-grade encryption for all data exchanges.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="text-center sm:text-left">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{isMortgage ? 'Estimated Monthly Payment' : 'Estimated Monthly'}</p>
                                <p className="text-xl font-black text-gray-900">₦{(isMortgage ? (property.price * 0.008) : (property.price / 12 * 1.13)).toLocaleString()}<span className="text-xs text-gray-400 font-medium lowercase"> / mo</span></p>
                            </div>

                            <button
                                disabled={!selectedPartner || isLaunching}
                                onClick={handleLaunch}
                                className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                                    selectedPartner && !isLaunching
                                        ? 'bg-brand-green text-white shadow-xl shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isLaunching ? (
                                    <>
                                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Launching...
                                    </>
                                ) : (
                                    <>
                                        Launch Partner Portal
                                        <HiArrowRight />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
