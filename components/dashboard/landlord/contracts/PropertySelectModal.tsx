'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineXMark, 
    HiOutlineHome, 
    HiOutlineMagnifyingGlass,
    HiOutlineChevronRight,
    HiOutlineMapPin,
    HiOutlineBanknotes
} from 'react-icons/hi2';
import { useLandlordProperties } from '@/hooks/useLandlordQueries';
import { formatCurrency } from '@/utils/helpers';

interface PropertySelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (property: any) => void;
}

export default function PropertySelectModal({ isOpen, onClose, onSelect }: PropertySelectModalProps) {
    const { data: properties = [], isLoading } = useLandlordProperties();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = properties.filter((p: any) => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address?.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
                {/* Header */}
                <div className="p-8 bg-brand-green relative shrink-0">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                        <HiOutlineXMark size={24} />
                    </button>
                    <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 mb-4">
                        <HiOutlineHome className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-white leading-tight">Select Property</h2>
                    <p className="text-green-50/80 text-xs font-medium mt-1">Choose the property you are generating a contract for.</p>
                </div>

                {/* Search Bar */}
                <div className="p-6 border-b border-gray-100 shrink-0">
                    <div className="relative">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                        />
                    </div>
                </div>

                {/* Properties List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    {isLoading ? (
                        <div className="py-20 text-center">
                            <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Loading properties...</p>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        filteredProperties.map((prop: any) => (
                            <button
                                key={prop.id}
                                onClick={() => onSelect(prop)}
                                className="w-full p-5 rounded-3xl border-2 border-gray-50 hover:border-brand-green bg-white text-left transition-all duration-300 group flex items-center gap-5 shadow-sm hover:shadow-md"
                            >
                                <div className="size-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                                    <img 
                                        src={prop.images?.[0] || '/assets/marketplace assets/Home1.png'} 
                                        alt={prop.title} 
                                        className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-gray-900 truncate">{prop.title}</h4>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-1">
                                        <HiOutlineMapPin size={14} className="text-gray-400" />
                                        <span className="truncate">{prop.address?.street}, {prop.address?.city}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-brand-green font-black mt-2">
                                        <HiOutlineBanknotes size={14} />
                                        <span>₦{prop.price?.toLocaleString()} / {prop.listingType}</span>
                                    </div>
                                </div>
                                <HiOutlineChevronRight size={24} className="text-gray-200 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                            </button>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <HiOutlineHome size={48} className="text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
                            <p className="text-sm text-gray-500 mt-1">Try a different search or add a new property first.</p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
                        Need to list a new property? Go to the Properties page.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
