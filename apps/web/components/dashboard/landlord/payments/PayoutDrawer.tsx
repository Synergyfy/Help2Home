import React from 'react';
import { PayoutTransaction } from '@/lib/api/payments';

interface PayoutDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    payout: PayoutTransaction | null;
}

export default function PayoutDrawer({ isOpen, onClose, payout }: PayoutDrawerProps) {
    if (!isOpen || !payout) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    const formatDate = (dateStr: string | Date) => {
        return new Date(dateStr).toLocaleString('en-NG', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end text-sm">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Payout Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 block p-2 hover:bg-gray-100 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Summary */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Amount Sent</p>
                        <div className="text-3xl font-black text-gray-900 mb-2">{formatCurrency(payout.amount)}</div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${payout.status === 'Success' || payout.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                payout.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {payout.status}
                        </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payout Info</h3>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Date Initiated</span>
                            <span className="text-gray-900 font-bold text-right">{formatDate(payout.date)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Reference</span>
                            <span className="text-gray-900 font-bold font-mono tracking-tight uppercase">{payout.reference || payout.referenceId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Method</span>
                            <span className="text-gray-900 font-bold">{payout.method || 'Bank Transfer'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Destination</span>
                            <div className="text-right">
                                <div className="text-gray-900 font-bold">{payout.destinationAccount?.bankName || payout.bankAccount || 'Bank Account'}</div>
                                <div className="text-xs text-gray-400 font-medium">
                                    {payout.destinationAccount?.accountNumber ? `•••• ${payout.destinationAccount.accountNumber.slice(-4)}` : 'Verified Account'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deductions if any */}
                    {payout.deductions && payout.deductions.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deductions</h3>
                            <div className="bg-gray-50/50 rounded-2xl p-5 space-y-3 border border-gray-100">
                                {payout.deductions.map((d, i) => (
                                    <div key={i} className="flex justify-between text-sm text-red-600 font-medium">
                                        <span>{d.label}</span>
                                        <span className="font-bold">-{formatCurrency(d.amount)}</span>
                                    </div>
                                ))}
                                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-gray-900 font-black uppercase text-[10px] tracking-widest">Total Deductions</span>
                                    <span className="text-red-700 font-black text-lg">
                                        -{formatCurrency(payout.deductions.reduce((acc, d) => acc + d.amount, 0))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <button className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-sm">
                        Download Settlement Ledger
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-4 font-medium uppercase tracking-widest">Help2Home Settlement Engine • Version 2.0</p>
                </div>
            </div>
        </div>
    );
}
