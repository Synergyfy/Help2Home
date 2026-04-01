'use client';

import React, { useState } from 'react';
import { MdPhone } from 'react-icons/md';
import {
    HiOutlineChatBubbleLeftRight,
    HiOutlineUserCircle
} from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import LeadProfileModal, { Lead } from './LeadProfileModal';

const leadsData: Lead[] = [
    { 
        id: 'lead_1', 
        name: 'Olawale Johnson', 
        interest: 'Investor', 
        budget: '₦200M+', 
        status: 'Hot', 
        joined: '2 hrs ago',
        email: 'olawale.j@example.com',
        phone: '+234 803 123 4567',
        location: 'Victoria Island, Lagos',
        occupation: 'Senior Portfolio Manager',
        verified: true,
        notes: 'Interested in luxury apartments in Ikoyi and V.I. Prefers high ROI projects.'
    },
    { 
        id: 'lead_2', 
        name: 'Chidi Okafor', 
        interest: 'Buyer', 
        budget: '₦50M - ₦80M', 
        status: 'Warm', 
        joined: 'Yesterday',
        email: 'chidi.okafor@gmail.com',
        phone: '+234 812 987 6543',
        location: 'Lekki Phase 1, Lagos',
        occupation: 'Software Architect',
        verified: false,
        notes: 'Looking for a 3-bedroom duplex for personal use. Schools nearby are a priority.'
    },
];

const Leads = () => {
    const router = useRouter();
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleChat = (lead: Lead) => {
        router.push(`/dashboard/agent/support/inbox?leadId=${lead.id}`);
    };

    const handleViewProfile = (lead: Lead) => {
        setSelectedLead(lead);
        setIsProfileModalOpen(true);
    };

    return (
        <div className="space-y-10 pb-12">
            <section>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Leads Pipeline</h1>
                        <p className="text-sm text-gray-500">Track and engage with prospective clients.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {leadsData.map((lead) => (
                            <div key={lead.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50/50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center font-semibold text-brand-green text-lg">
                                        {lead.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{lead.name}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest ${lead.status === 'Hot' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                                }`}>
                                                {lead.status}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{lead.interest} • {lead.joined}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-4 sm:pt-0">
                                    <div className="text-right mr-6 hidden lg:block">
                                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.2em] mb-1">Budget Range</div>
                                        <div className="text-sm font-semibold text-gray-900">{lead.budget}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewProfile(lead)}
                                            className="px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 hover:text-brand-green transition-all flex items-center gap-2 text-xs font-bold"
                                        >
                                            <HiOutlineUserCircle size={18} />
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => handleChat(lead)}
                                            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            title="Chat with lead"
                                        >
                                            <HiOutlineChatBubbleLeftRight size={18} strokeWidth={2} />
                                        </button>
                                        <button 
                                            onClick={() => window.location.href = `tel:${lead.phone}`}
                                            className="p-2.5 bg-brand-green/10 text-brand-green rounded-xl hover:bg-brand-green hover:text-white transition-all shadow-sm"
                                            title="Call lead"
                                        >
                                            <MdPhone size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LeadProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                lead={selectedLead}
            />
        </div>
    );
};

export default Leads;
