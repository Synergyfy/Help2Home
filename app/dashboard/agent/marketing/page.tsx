'use client';

import { MdCampaign, MdBolt, MdInsights, MdArrowUpward } from 'react-icons/md';

export default function MarketingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Marketing Hub</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#00853E] p-6 rounded-3xl text-white">
                    <MdBolt size={32} className="mb-4" />
                    <h3 className="font-bold text-lg">Boost Listing</h3>
                    <p className="text-white/70 text-xs mt-1">Get 5x more visibility on the marketplace.</p>
                    <button className="mt-4 bg-white text-[#00853E] w-full py-2 rounded-xl font-bold text-xs uppercase">Activate Now</button>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-bold text-gray-900">Audience Reach</h3>
                            <p className="text-xs text-gray-400">Past 30 days performance</p>
                        </div>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                            <MdArrowUpward /> +24%
                        </span>
                    </div>
                    {/* Visual Bar Graph Placeholder */}
                    <div className="h-20 flex items-end gap-2">
                        {[30, 50, 40, 80, 60, 90, 70, 100, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group">
                                <div className="absolute bottom-0 w-full bg-[#00853E] rounded-t-lg transition-all duration-500" style={{ height: `${h}%` }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-50 font-bold text-sm">Campaign History</div>
                <div className="divide-y divide-gray-50">
                    {['Facebook Retargeting', 'Newsletter Featured', 'Marketplace Top Spot'].map((name, i) => (
                        <div key={i} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-gray-900">{name}</p>
                                <p className="text-[10px] text-gray-400">Completed • Dec {10 + i}, 2025</p>
                            </div>
                            <span className="text-xs font-bold text-gray-900">₦25,000</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}