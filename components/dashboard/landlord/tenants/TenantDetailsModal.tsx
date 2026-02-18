'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineXMark, 
    HiOutlineUser, 
    HiOutlineEnvelope, 
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineCalendarDays,
    HiOutlineCurrencyDollar,
    HiOutlineDocumentText,
    HiOutlineShieldCheck
} from 'react-icons/hi2';
import { Tenant } from '@/lib/mockLandlordData';
import { formatCurrency } from '@/utils/helpers';

interface TenantDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: Tenant | null;
}

export default function TenantDetailsModal({ isOpen, onClose, tenant }: TenantDetailsModalProps) {
    if (!tenant) return null;

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'Up to date': return 'bg-green-50 text-green-700 border-green-100';
            case 'Late': return 'bg-red-50 text-red-700 border-red-100';
            case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 bg-brand-green relative shrink-0">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white text-3xl font-black shadow-inner">
                                    {tenant.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white leading-tight">{tenant.name}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                            Tenant ID: {tenant.id}
                                        </span>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border ${tenant.status === 'Active' ? 'bg-white text-brand-green border-white' : 'bg-transparent text-white border-white/30'}`}>
                                            {tenant.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {/* Personal Info */}
                            <section>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
                                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-brand-green shadow-sm">
                                            <HiOutlineEnvelope size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                            <p className="text-sm font-bold text-gray-900">{tenant.email}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
                                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-brand-green shadow-sm">
                                            <HiOutlinePhone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="text-sm font-bold text-gray-900">{tenant.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Lease Details */}
                            <section>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Lease & Property</h3>
                                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                            <HiOutlineMapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Occupied Property</p>
                                            <p className="text-lg font-bold text-gray-900">{tenant.propertyName}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200/50">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Rent</p>
                                            <p className="text-lg font-black text-brand-green">₦{formatNumber(tenant.rentAmount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lease Start</p>
                                            <p className="text-sm font-bold text-gray-900">{tenant.leaseStart}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lease End</p>
                                            <p className="text-sm font-bold text-gray-900">{tenant.leaseEnd}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Payment Status Card */}
                            <section>
                                <div className={`p-6 rounded-[2rem] border-2 flex items-center justify-between ${getPaymentStatusColor(tenant.paymentStatus)}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-white/50 flex items-center justify-center">
                                            <HiOutlineCurrencyDollar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Payment Integrity</p>
                                            <p className="text-xl font-black">{tenant.paymentStatus}</p>
                                        </div>
                                    </div>
                                    <HiOutlineShieldCheck size={32} className="opacity-20" />
                                </div>
                            </section>

                            {/* Additional Details if available */}
                            {tenant.details && (
                                <section className="space-y-6">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Work & Verification</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Employment</p>
                                                <p className="text-sm font-bold text-gray-900">{tenant.details.employmentStatus} at {tenant.details.employerName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Income</p>
                                                <p className="text-sm font-bold text-gray-900">{tenant.details.monthlySalary}</p>
                                            </div>
                                        </div>
                                        {tenant.details.guarantor && (
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Primary Guarantor</p>
                                                <p className="text-sm font-bold text-gray-900">{tenant.details.guarantor.name}</p>
                                                <p className="text-xs text-gray-500">{tenant.details.guarantor.phone}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                            >
                                Close Details
                            </button>
                            <button 
                                className="flex-[2] py-4 px-6 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <HiOutlineEnvelope size={20} />
                                Message Tenant
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const formatNumber = (val: number | string) => {
  if (!val) return "0";
  const number = parseFloat(val.toString().replace(/,/g, ""));
  if (isNaN(number)) return "0";
  return new Intl.NumberFormat("en-US").format(number);
};
