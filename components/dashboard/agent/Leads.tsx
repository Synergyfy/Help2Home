'use client';

import React from 'react';
import { MdPhone } from 'react-icons/md';
import { 
    HiOutlineChatBubbleLeftRight, 
    HiOutlineUser 
} from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const leads = [
    { id: 'lead_1', name: 'Olawale Johnson', interest: 'Investor', budget: '₦200M+', status: 'Hot', joined: '2 hrs ago' },
    { id: 'lead_2', name: 'Chidi Okafor', interest: 'Buyer', budget: '₦50M - ₦80M', status: 'Warm', joined: 'Yesterday' },
];

const Leads = () => {
    const router = useRouter();

    const handleChat = (lead: any) => {
        router.push(`/dashboard/agent/support/inbox?leadId=${lead.id}`);
    };

    return (
        <div className="space-y-10 pb-12">
            <section>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Leads Pipeline</h1>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {leads.map((lead) => (
                            <div key={lead.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50/50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center font-black text-brand-green text-lg">
                                        {lead.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-brand-green transition-colors">{lead.name}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                                                lead.status === 'Hot' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                            }`}>
                                                {lead.status}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{lead.interest} • {lead.joined}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-4 sm:pt-0">
                                    <div className="text-right mr-6 hidden lg:block">
                                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Budget Range</div>
                                        <div className="text-sm font-black text-gray-900 italic">{lead.budget}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleChat(lead)}
                                            className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            title="Chat with lead"
                                        >
                                            <HiOutlineChatBubbleLeftRight size={20} strokeWidth={2} />
                                        </button>
                                        <button className="p-3 bg-brand-green/10 text-brand-green rounded-2xl hover:bg-brand-green hover:text-white transition-all shadow-sm">
                                            <MdPhone size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Leads;
