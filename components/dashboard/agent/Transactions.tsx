'use client';

import { MdCheckCircle, MdPending, MdReceipt } from 'react-icons/md';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Financial Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Commission Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Expected Commission</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">₦12,450,000</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-xs font-semibold bg-green-50 w-fit px-3 py-1 rounded-full">
                        <MdCheckCircle /> Payout scheduled for Jan 15
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Closing Velocity</h3>
                        <MdReceipt className="text-gray-300" />
                    </div>
                    <div className="h-2 bg-brand-green/20 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-green w-[65%]" />
                    </div>
                    <div className="h-16 flex items-end gap-2">
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-green/20 rounded-t-sm" style={{ height: `${h}%` }}>
                                {h === 100 && <div className="w-full h-1/2 bg-brand-green rounded-t-sm" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* List of Recent Payments */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-50 font-semibold text-sm text-gray-900">Recent Payouts</div>
                <div className="p-0">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="p-4 flex items-center justify-between border-b last:border-0 border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg"><MdReceipt className="text-gray-400" /></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Ref: #INV-00{i + 89}</p>
                                    <p className="text-[10px] text-gray-400">Paid on Dec 20, 2025</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">₦1,200,000</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
