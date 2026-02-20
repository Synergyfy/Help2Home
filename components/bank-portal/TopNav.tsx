'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    HiOutlineBell, 
    HiOutlineSearch, 
    HiOutlineUserCircle, 
    HiOutlineLogout,
    HiOutlineUser,
    HiOutlineCog,
    HiOutlineShieldCheck,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function BankTopNav() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        toast.success('Signed out successfully');
        router.push('/bank-portal/signin');
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#003366] transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search applications, tenants, properties..."
                        className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all">
                    <HiOutlineBell size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-2xl transition-all cursor-pointer group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900 leading-tight">Access Bank PLC</p>
                            <p className="text-[10px] text-gray-500 font-medium">Head Office - Lagos</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDropdownOpen ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                            <HiOutlineUserCircle size={28} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
                            >
                                <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Authenticated Session</p>
                                    <p className="text-sm font-semibold text-gray-900">John Bank Manager</p>
                                    <p className="text-xs text-gray-500">manager@accessbank.com</p>
                                </div>

                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#003366] rounded-xl transition-all font-medium">
                                        <HiOutlineUser size={18} />
                                        My Profile
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#003366] rounded-xl transition-all font-medium">
                                        <HiOutlineCog size={18} />
                                        Settings
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#003366] rounded-xl transition-all font-medium">
                                        <HiOutlineShieldCheck size={18} />
                                        Security
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#003366] rounded-xl transition-all font-medium">
                                        <HiOutlineQuestionMarkCircle size={18} />
                                        Support
                                    </button>
                                </div>

                                <div className="p-2 bg-gray-50/50">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold"
                                    >
                                        <HiOutlineLogout size={18} />
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
