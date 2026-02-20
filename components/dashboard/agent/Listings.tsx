'use client';

import React from 'react';
import { MdSearch, MdFilterList, MdLocationOn } from 'react-icons/md';
import { HiOutlinePlus, HiOutlineHome, HiOutlineEye } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const properties = [
    { id: 1, title: 'Luxury 4-Bed Penthouse', loc: 'Ikoyi, Lagos', price: '₦450M', status: 'Active', views: 1240, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400' },
    { id: 2, title: 'Modern Studio Apartment', loc: 'Lekki Phase 1', price: '₦85M', status: 'Sold', views: 856, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400' },
];

export default function MyListingsPage() {
    const router = useRouter();

    const handleAddListing = () => {
        router.push('/dashboard/agent/properties/add');
    };

    const handleManage = (id: number, title: string) => {
        toast.info(`Opening management for ${title}...`);
        router.push(`/dashboard/agent/properties/${id}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
                    <p className="text-sm text-gray-500">Track and manage your listed properties.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search listings..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all" />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-all"><MdFilterList size={20} /></button>
                    <button
                        onClick={handleAddListing}
                        className="flex items-center gap-2 bg-brand-green text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95"
                    >
                        <HiOutlinePlus size={18} strokeWidth={2.5} />
                        New Listing
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Inventory</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.filter(p => p.status === 'Active').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Listings</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.filter(p => p.status === 'Sold').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sold/Let</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineEye size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Views</div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="relative h-56">
                            <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border backdrop-blur-md ${prop.status === 'Active'
                                        ? 'bg-green-500/90 text-white border-green-400'
                                        : 'bg-gray-500/90 text-white border-gray-400'
                                    }`}>
                                    {prop.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 truncate text-lg group-hover:text-brand-green transition-colors">{prop.title}</h3>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mt-2">
                                <MdLocationOn size={16} className="text-brand-green" /> {prop.loc}
                            </div>
                            
                            <div className="flex items-center justify-between pt-5 mt-6 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Price</p>
                                    <p className="text-lg font-semibold text-gray-900">{prop.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Views</p>
                                    <p className="text-lg font-semibold text-gray-900">{prop.views.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                                <button
                                    onClick={() => handleManage(prop.id, prop.title)}
                                    className="text-[10px] font-black text-gray-400 hover:text-brand-green uppercase tracking-[0.2em] transition-colors"
                                >
                                    Manage Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {properties.length === 0 && (
                <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                    <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <HiOutlineHome size={40} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No active listings</h2>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">Start growing your inventory by adding your first property listing.</p>
                    <button
                        onClick={handleAddListing}
                        className="bg-brand-green text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all"
                    >
                        Create Listing
                    </button>
                </div>
            )}
        </div>
    );
}
