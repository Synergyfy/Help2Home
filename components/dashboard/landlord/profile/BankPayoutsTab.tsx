'use client';

import { BankAccount } from '@/lib/mockLandlordData';

export default function BankPayoutsTab({ accounts }: { accounts: BankAccount[] }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Bank Accounts</h3>
                    <p className="text-sm text-gray-500">Manage your accounts for receiving payouts.</p>
                </div>
                <button className="bg-[#00853E] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Account
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.map((account) => (
                    <div key={account.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                        {account.isPrimary && (
                            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                                Primary
                            </span>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                {account.bankName[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{account.bankName}</h4>
                                <p className="text-sm text-gray-500">{account.accountNumber}</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex justify-between">
                                <span>Account Name:</span>
                                <span className="font-medium text-gray-900">{account.accountHolder}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Type:</span>
                                <span className="font-medium text-gray-900">{account.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status:</span>
                                <span className={`font-medium ${account.status === 'verified' ? 'text-green-600' :
                                        account.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                                    }`}>
                                    {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                            <button className="flex-1 text-sm font-medium text-gray-600 hover:text-gray-900 py-2 rounded hover:bg-gray-50 transition-colors">
                                Edit
                            </button>
                            {!account.isPrimary && (
                                <button className="flex-1 text-sm font-medium text-gray-600 hover:text-[#00853E] py-2 rounded hover:bg-gray-50 transition-colors">
                                    Set Primary
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
