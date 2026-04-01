'use client';

import React from 'react';
import { 
    HiOutlineQuestionMarkCircle, 
    HiOutlineBookOpen, 
    HiOutlinePhone,
    HiOutlineExclamationCircle,
    HiOutlineCash
} from 'react-icons/hi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { IconType } from 'react-icons';

interface SupportCategory {
    label: string;
    icon: IconType;
    color: string;
}

export default function BankSupportPage() {
    const categories: SupportCategory[] = [
        { label: 'Technical API', icon: HiOutlineBookOpen, color: 'bg-blue-50 text-blue-600' },
        { label: 'Loan Disputes', icon: HiOutlineExclamationCircle, color: 'bg-orange-50 text-orange-600' },
        { label: 'Billing/Fees', icon: HiOutlineCash, color: 'bg-green-50 text-green-600' },
        { label: 'Platform Help', icon: HiOutlineQuestionMarkCircle, color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Institutional Support</h1>
                <p className="text-gray-500 font-medium">Get assistance with technical issues or loan reconciliation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <button key={cat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left">
                        <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center mb-4`}>
                            <cat.icon size={20} />
                        </div>
                        <p className="font-semibold text-gray-900">{cat.label}</p>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <HiOutlineChatBubbleLeftRight className="text-blue-600" /> Open a Support Ticket
                    </h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Issue Priority</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#003366]/10">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>Urgent (Blocking)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Related Application ID</label>
                                <input type="text" placeholder="e.g. APP-1001" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#003366]/10" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                            <textarea placeholder="Describe your issue in detail..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#003366]/10 h-40 resize-none"></textarea>
                        </div>
                        <button className="px-8 py-4 bg-[#003366] text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">Submit Ticket</button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#003366] text-white p-8 rounded-2xl shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Urgent Help?</h3>
                        <p className="text-blue-100 text-sm mb-6 leading-relaxed">For production-level blocking issues, please call your dedicated Help2Home account manager directly.</p>
                        <div className="flex items-center gap-3 font-semibold text-xl">
                            <HiOutlinePhone className="text-orange-400" /> +234 1 234 5678
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
