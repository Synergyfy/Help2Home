'use client';

import { MdEmail, MdPhone } from 'react-icons/md';

const leads = [
    { name: 'Olawale Johnson', interest: 'Investor', budget: '₦200M+', status: 'Hot', joined: '2 hrs ago' },
    { name: 'Chidi Okafor', interest: 'Buyer', budget: '₦50M - ₦80M', status: 'Warm', joined: 'Yesterday' },
];

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Leads Pipeline</h1>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="divide-y divide-gray-50">
                    {leads.map((lead, i) => (
                        <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-[#00853E]/10 flex items-center justify-center font-bold text-[#00853E]">
                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{lead.name}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded uppercase">{lead.status}</span>
                                        <span className="text-[10px] text-gray-400">{lead.interest} • {lead.joined}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0">
                                <div className="text-right mr-4 hidden md:block">
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Budget Range</div>
                                    <div className="text-sm font-bold text-gray-900">{lead.budget}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 bg-[#00853E] text-white rounded-xl hover:bg-green-700 transition-colors"><MdPhone /></button>
                                    <button className="p-2.5 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-100"><MdEmail /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}