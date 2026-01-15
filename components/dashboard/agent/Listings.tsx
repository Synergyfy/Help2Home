'use client';

import React from 'react';
import { MdSearch, MdFilterList, MdLocationOn, MdBed, MdSquareFoot } from 'react-icons/md';

const properties = [
    { id: 1, title: 'Luxury 4-Bed Penthouse', loc: 'Ikoyi, Lagos', price: '₦450M', status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400' },
    { id: 2, title: 'Modern Studio Apartment', loc: 'Lekki Phase 1', price: '₦85M', status: 'Sold', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400' },
];

export default function MyListingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <div className="flex gap-2">
                    <div className="relative flex-1 md:w-64">
                        <MdSearch className="absolute left-3 top-1/2 -tranbrand-green-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search listings..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><MdFilterList size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group">
                        <div className="relative h-48">
                            <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${prop.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                {prop.status}
                            </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 truncate">{prop.title}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                <MdLocationOn size={14} className="text-brand-green" /> {prop.loc}
                            </div>
                            <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className="text-xl font-bold text-brand-green">$1,200,000</span>
                                <button className="text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest">Manage</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
