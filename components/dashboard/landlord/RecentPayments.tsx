'use client';

import { PaymentItem } from '@/lib/mockLandlordData';

export default function RecentPayments({ payments }: { payments: PaymentItem[] }) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent payments</h3>
                <button className="text-sm text-[#00853E] font-medium hover:underline">View all payments</button>
            </div>

            {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No payments found. When tenants pay rent it will show here.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-gray-500 border-b border-gray-100">
                                <th className="pb-3 font-medium">Date</th>
                                <th className="pb-3 font-medium">Property</th>
                                <th className="pb-3 font-medium">Tenant</th>
                                <th className="pb-3 font-medium">Amount</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="py-4 pr-4 text-gray-600">{payment.date}</td>
                                    <td className="py-4 pr-4 text-gray-900 font-medium">{payment.property}</td>
                                    <td className="py-4 pr-4 text-gray-600">{payment.tenant}</td>
                                    <td className="py-4 pr-4 text-gray-900">{formatCurrency(payment.amount)}</td>
                                    <td className="py-4">
                                        <span className={`flex items-center gap-1.5 text-xs font-medium ${
                                            payment.status === 'Cleared' ? 'text-green-700' :
                                            payment.status === 'Pending' ? 'text-amber-700' :
                                            'text-red-700'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                payment.status === 'Cleared' ? 'bg-green-500' :
                                                payment.status === 'Pending' ? 'bg-amber-500' :
                                                'bg-red-500'
                                            }`}></span>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
