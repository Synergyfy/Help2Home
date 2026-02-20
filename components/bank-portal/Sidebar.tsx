'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    HiOutlineViewGrid, 
    HiOutlineDocumentText, 
    HiOutlineUserGroup, 
    HiOutlineCash, 
    HiOutlinePresentationChartLine,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle,
    HiOutlineClipboardList
} from 'react-icons/hi';
import { toast } from 'react-toastify';

const navItems = [
    { name: 'Dashboard', href: '/bank-portal/dashboard', icon: HiOutlineViewGrid },
    { name: 'Loan Applications', href: '/bank-portal/applications', icon: HiOutlineDocumentText },
    { name: 'Accounts', href: '/bank-portal/accounts', icon: HiOutlineUserGroup },
    { name: 'Disbursements', href: '/bank-portal/disbursements', icon: HiOutlineCash },
    { name: 'Monitoring', href: '/bank-portal/monitoring', icon: HiOutlineClipboardList },
    { name: 'Reports', href: '/bank-portal/reports', icon: HiOutlinePresentationChartLine },
    { name: 'Settings', href: '/bank-portal/settings', icon: HiOutlineCog },
    { name: 'Support', href: '/bank-portal/support', icon: HiOutlineQuestionMarkCircle },
];

export default function BankSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        toast.success('Signed out successfully');
        router.push('/bank-portal/signin');
    };

    return (
        <aside className="w-64 bg-[#003366] text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-semibold text-xl">
                        A
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold leading-none">Access Bank</h1>
                        <p className="text-[10px] text-orange-200 mt-1 uppercase tracking-widest font-semibold">Partner Portal</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                                isActive 
                                ? 'bg-white/10 text-white shadow-sm' 
                                : 'text-blue-100 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] font-semibold text-orange-200 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-semibold">John Bank Manager</p>
                    <button 
                        onClick={handleLogout}
                        className="text-[10px] text-red-400 font-semibold hover:text-red-300 transition-colors mt-2 uppercase tracking-widest"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
