'use client';

import React, { useState } from 'react';
import { BankAccount } from '@/lib/mockLandlordData';
import AddBankAccountModal from './AddBankAccountModal';
import { HiOutlinePlus, HiOutlineStar, HiOutlineBanknotes, HiOutlineTrash } from 'react-icons/hi2';

export default function BankPayoutsTab({ accounts: initialAccounts }: { accounts: BankAccount[] }) {
    const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddAccount = (newAccount: BankAccount) => {
        setAccounts(prev => [...prev, newAccount]);
    };

    const handleSetPrimary = (id: string) => {
        setAccounts(prev => prev.map(acc => ({
            ...acc,
            isPrimary: acc.id === id
        })));
    };

    const handleDeleteAccount = (id: string) => {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Bank Accounts</h3>
                    <p className="text-sm text-gray-500">Manage your accounts for receiving payouts.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#00853E] text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 flex items-center gap-2 active:scale-95"
                >
                    <HiOutlinePlus size={20} strokeWidth={2.5} />
                    Add Account
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((account) => (
                    <div key={account.id} className={`bg-white p-6 rounded-3xl border-2 transition-all relative group overflow-hidden ${
                        account.isPrimary ? 'border-brand-green shadow-xl shadow-green-900/5' : 'border-gray-100 shadow-sm'
                    }`}>
                        {account.isPrimary && (
                            <div className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                                Primary Account
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`size-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-sm ${
                                account.isPrimary ? 'bg-brand-green text-white' : 'bg-gray-50 text-gray-400'
                            }`}>
                                <HiOutlineBanknotes size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 leading-tight">{account.bankName}</h4>
                                <p className="text-sm font-bold text-gray-400 tracking-widest">{account.accountNumber}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-2xl">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Name</span>
                                <span className="text-sm font-bold text-gray-900">{account.accountHolder}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${
                                    account.status === 'verified' ? 'bg-green-50 text-green-600 border-green-100' :
                                    account.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    'bg-red-50 text-red-600 border-red-100'
                                }`}>
                                    {account.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {!account.isPrimary && (
                                <button 
                                    onClick={() => handleSetPrimary(account.id)}
                                    className="flex-1 flex items-center justify-center gap-2 text-xs font-black text-gray-500 hover:text-brand-green hover:bg-green-50 py-3 rounded-xl transition-all"
                                >
                                    <HiOutlineStar size={16} />
                                    Make Primary
                                </button>
                            )}
                            <button 
                                onClick={() => handleDeleteAccount(account.id)}
                                className="flex-1 flex items-center justify-center gap-2 text-xs font-black text-gray-400 hover:text-red-600 hover:bg-red-50 py-3 rounded-xl transition-all"
                            >
                                <HiOutlineTrash size={16} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {accounts.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                        <HiOutlineBanknotes size={48} className="text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No bank accounts linked</h3>
                        <p className="text-gray-500 mt-1 mb-6">Add an account to start receiving your rental payouts.</p>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-3 rounded-2xl font-black hover:border-brand-green hover:text-brand-green transition-all"
                        >
                            Link New Account
                        </button>
                    </div>
                )}
            </div>

            <AddBankAccountModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddAccount}
            />
        </div>
    );
}
