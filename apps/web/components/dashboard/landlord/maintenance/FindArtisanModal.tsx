'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineXCircle, HiOutlineMagnifyingGlass, HiOutlineStar, HiOutlineUserCircle } from 'react-icons/hi2';
import { Artisan, MOCK_ARTISANS } from '@/lib/mockArtisanData'; // Import mock artisan data

interface FindArtisanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHireArtisan: (artisanId: string) => void;
    isLoading: boolean;
    currentMaintenanceRequestSpecialization?: string;
}

export default function FindArtisanModal({ isOpen, onClose, onHireArtisan, isLoading, currentMaintenanceRequestSpecialization }: FindArtisanModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>(null);

    if (!isOpen) return null;

    const filteredArtisans = MOCK_ARTISANS.filter(artisan => {
        const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artisan.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artisan.bio.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialization = currentMaintenanceRequestSpecialization ?
            artisan.specialization.toLowerCase().includes(currentMaintenanceRequestSpecialization.toLowerCase()) : true;

        return matchesSearch && matchesSpecialization;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-8 bg-brand-green relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-all"
                        disabled={isLoading}
                    >
                        <HiOutlineXCircle size={24} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <HiOutlineUserCircle size={24} className="text-white" />
                        <h2 className="text-2xl font-black text-white leading-tight">Find an Artisan</h2>
                    </div>
                    <p className="text-white/80 text-sm">Search and select a suitable artisan for this maintenance request.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                    {/* Search Bar */}
                    <div className="relative">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or specialization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-brand-green outline-none font-medium transition-all"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Artisan List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredArtisans.length > 0 ? (
                            filteredArtisans.map(artisan => (
                                <motion.div
                                    key={artisan.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => setSelectedArtisanId(artisan.id)}
                                    className={`bg-white p-6 rounded-[2rem] border-2 shadow-sm hover:shadow-md transition-all cursor-pointer group
                                        ${selectedArtisanId === artisan.id ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-brand-green/30'}
                                    `}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className={`size-12 rounded-full flex items-center justify-center text-sm font-bold ${selectedArtisanId === artisan.id ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            {artisan.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{artisan.name}</h3>
                                            <p className="text-sm text-gray-500">{artisan.specialization}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-yellow-500 mb-3">
                                        <HiOutlineStar />
                                        <span>{artisan.rating.toFixed(1)} ({artisan.experience})</span>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2">{artisan.bio}</p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="md:col-span-2 text-center py-10 text-gray-500">
                                <HiOutlineMagnifyingGlass size={48} className="mx-auto mb-4" />
                                No artisans found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 px-6 border-2 border-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-all"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => selectedArtisanId && onHireArtisan(selectedArtisanId)}
                        className="flex-1 py-3 px-6 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2"
                        disabled={isLoading || !selectedArtisanId}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Hiring...
                            </>
                        ) : (
                            'Hire Selected Artisan'
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}