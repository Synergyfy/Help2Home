'use client';

import React from 'react';
import { PaymentTransaction } from '@/lib/mockPaymentData';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { 
    HiOutlineChatBubbleLeftRight, 
    HiOutlineDocumentArrowDown, 
    HiOutlinePrinter,
    HiOutlineExclamationCircle
} from 'react-icons/hi2';
import Logo from '@/components/shared/Logo';

interface PaymentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    payment: PaymentTransaction | null;
}

export default function PaymentDrawer({ isOpen, onClose, payment }: PaymentDrawerProps) {
    const router = useRouter();

    if (!isOpen || !payment) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-NG', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const handleMessageTenant = () => {
        toast.info(`Opening conversation with ${payment.tenant.name}...`);
        router.push(`/dashboard/landlord/support/inbox?tenantId=${payment.tenant.email}`);
    };

    const handleDownloadReceipt = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                pending: 'Generating high-resolution receipt...',
                success: 'Receipt downloaded successfully! 📄',
                error: 'Failed to generate receipt.'
            }
        );
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #receipt-content, #receipt-content * {
                        visibility: visible;
                    }
                    #receipt-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 20px !important;
                        background: white !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm print:hidden" onClick={onClose}></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right print:shadow-none print:w-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0 print:border-none print:bg-white">
                    <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all print:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div id="receipt-content" className="flex-1 overflow-y-auto p-6 space-y-8 print:p-0">
                    <div className="hidden print:flex flex-col items-center mb-8 border-b-2 border-gray-100 pb-6">
                        <Logo width={45} height={45} textClassName="text-2xl font-black text-brand-green" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Official Transaction Receipt</p>
                    </div>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center relative overflow-hidden">
                        {payment.status === 'Failed' && (
                            <div className="absolute top-0 inset-x-0 h-1 bg-red-500"></div>
                        )}
                        <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                        <div className="text-3xl font-black text-gray-900 mb-2">{formatCurrency(payment.amount)}</div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${payment.status === 'Cleared' ? 'bg-green-100 text-green-800' :
                                payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {payment.status}
                        </span>
                    </div>

                    {/* FAILED PAYMENT WARNING */}
                    {payment.status === 'Failed' && (
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                            <HiOutlineExclamationCircle className="text-red-600 shrink-0" size={24} />
                            <div>
                                <h4 className="text-sm font-bold text-red-900">Transaction Failed</h4>
                                <p className="text-xs text-red-700/80 leading-relaxed font-medium mt-0.5">
                                    The tenant's bank declined this transaction. You should contact them to resolve this issue.
                                </p>
                                <button 
                                    onClick={handleMessageTenant}
                                    className="mt-3 flex items-center gap-2 text-xs font-black text-red-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-all"
                                >
                                    <HiOutlineChatBubbleLeftRight size={14} />
                                    Message Tenant Now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Details List */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction Info</h3>

                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-sm font-medium text-gray-500">Date</span>
                            <span className="text-sm font-bold text-gray-900 text-right">{formatDate(payment.date)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-sm font-medium text-gray-500">Reference ID</span>
                            <span className="text-sm font-bold text-gray-900 font-mono tracking-tighter uppercase">{payment.referenceId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-sm font-medium text-gray-500">Payment Method</span>
                            <span className="text-sm font-bold text-gray-900">{payment.method}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-sm font-medium text-gray-500">Tenant</span>
                            <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{payment.tenant.name}</div>
                                <div className="text-xs font-medium text-gray-400">{payment.tenant.email}</div>
                            </div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-sm font-medium text-gray-500">Property</span>
                            <span className="text-sm font-bold text-gray-900 text-right max-w-[200px] truncate">{payment.property.name}</span>
                        </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Financial Breakdown</h3>

                        <div className="bg-gray-50 rounded-2xl p-5 space-y-3 border border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Gross Amount</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(payment.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-600">
                                <span className="font-medium">Platform Fee</span>
                                <span className="font-bold">-{formatCurrency(payment.fees.platformFee)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-600">
                                <span className="font-medium">Processing Fee</span>
                                <span className="font-bold">-{formatCurrency(payment.fees.processingFee)}</span>
                            </div>
                            {payment.fees.commission && (
                                <div className="flex justify-between text-sm text-red-600">
                                    <span className="font-medium">Commission</span>
                                    <span className="font-bold">-{formatCurrency(payment.fees.commission)}</span>
                                </div>
                            )}
                            <div className="pt-4 mt-1 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-gray-900 font-black uppercase text-[10px] tracking-widest">Net Payout</span>
                                <span className="text-[#00853E] font-black text-xl">{formatCurrency(payment.netAmount)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                            <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payout Schedule</p>
                                <p className="text-sm font-bold text-blue-700">{payment.payoutStatus}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contract Link */}
                    <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Associated Contract</h3>
                        <div className="group border-2 border-gray-100 rounded-2xl p-4 flex justify-between items-center hover:border-brand-green/30 hover:bg-green-50/10 cursor-pointer transition-all">
                            <div>
                                <div className="font-bold text-gray-900 group-hover:text-brand-green transition-colors">{payment.contract.name}</div>
                                <div className="text-xs font-medium text-gray-400">{payment.contract.startDate} — {payment.contract.endDate}</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3 shrink-0 print:hidden">
                    <button 
                        onClick={handleDownloadReceipt}
                        className="w-full py-4 bg-[#00853E] text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex justify-center items-center gap-2 active:scale-95"
                    >
                        <HiOutlineDocumentArrowDown size={20} strokeWidth={2.5} />
                        Download Receipt
                    </button>
                    <button 
                        onClick={handlePrintReceipt}
                        className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-black text-sm hover:bg-white hover:border-gray-300 transition-all flex justify-center items-center gap-2 active:scale-95"
                    >
                        <HiOutlinePrinter size={20} strokeWidth={2.5} />
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}
