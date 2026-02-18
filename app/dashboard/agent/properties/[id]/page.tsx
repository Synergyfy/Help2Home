'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlinePencilSquare, HiOutlineTrash, MdLocationOn, MdTrendingUp, MdPeople } from '@/components/shared/Icons';
import { toast } from 'react-toastify';

export default function AgentPropertyManagementPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // In a real app, fetch property by ID
    const property = {
        id,
        title: 'Luxury 4-Bed Penthouse',
        loc: 'Ikoyi, Lagos',
        price: '₦450M',
        status: 'Active',
        views: '1.2k',
        leads: 45
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this listing?')) {
            toast.success('Listing deleted successfully');
            router.push('/dashboard/agent/properties');
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-brand-green transition-all shadow-sm"
                >
                    <HiOutlineArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">{property.title}</h1>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                        <MdLocationOn className="text-brand-green" /> {property.loc}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <MdTrendingUp className="text-brand-green mb-3" size={24} />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Views</p>
                            <p className="text-2xl font-black text-gray-900">{property.views}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <MdPeople className="text-blue-600 mb-3" size={24} />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Leads</p>
                            <p className="text-2xl font-black text-gray-900">{property.leads}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <HiOutlineHome className="text-orange-500 mb-3" size={24} />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                            <p className="text-2xl font-black text-gray-900">{property.status}</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
                        <div className="size-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6 text-gray-300">
                            <MdTrendingUp size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Performance Analytics</h2>
                        <p className="text-gray-500 max-w-sm">Detailed charts and engagement metrics will be available here soon.</p>
                    </div>
                </div>

                {/* Actions Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Management</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => toast.info('Edit feature coming soon...')}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95"
                            >
                                <HiOutlinePencilSquare size={20} />
                                Edit Listing
                            </button>
                            <button
                                onClick={() => toast.info('Promotion tools coming soon...')}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
                            >
                                <MdTrendingUp size={20} />
                                Boost Listing
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all active:scale-95"
                            >
                                <HiOutlineTrash size={20} />
                                Remove Listing
                            </button>
                        </div>
                    </div>

                    <div className="bg-brand-green/5 p-8 rounded-[2.5rem] border border-brand-green/10">
                        <h4 className="font-bold text-brand-green mb-2">Agent Note</h4>
                        <p className="text-xs text-brand-green/70 leading-relaxed font-medium">
                            Keep your listing updated with high-quality images to attract 3x more leads.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
