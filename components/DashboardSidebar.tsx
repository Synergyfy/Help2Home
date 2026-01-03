'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore'; 
import {
    MdDashboard, MdPerson, MdFavorite, MdDescription, MdHistory,
    MdPayment, MdSupportAgent, MdSettings, MdNotifications,
    MdSchool, MdHomeWork, MdGroup, MdTrendingUp, MdPieChart,
    MdFolder, MdStorefront, MdAssignment, MdLogout, MdClose
} from 'react-icons/md';
import { RxDashboard } from "react-icons/rx";

import { toast } from 'react-toastify';

const NAV_CONFIG = {

    tenant: [

        { label: 'Dashboard', href: '/dashboard/tenant', icon: RxDashboard },

        { label: 'Profile & Verification', href: '/dashboard/tenant/profile', icon: MdPerson },

        { label: 'Wishlist', href: '/dashboard/tenant/wishlist', icon: MdFavorite },

        { label: 'Apply for Rent', href: '/dashboard/tenant/apply', icon: MdDescription },

        { label: 'Applications', href: '/dashboard/tenant/applications', icon: MdHistory },

        { label: 'Payments', href: '/dashboard/tenant/payments', icon: MdPayment },

        { label: 'Support', href: '/dashboard/tenant/support', icon: MdSupportAgent },

        { label: 'Education Hub', href: '/dashboard/tenant/education', icon: MdSchool },

        { label: 'Settings', href: '/dashboard/tenant/settings', icon: MdSettings },

    ],

    landlord: [

        { label: 'Dashboard', href: '/dashboard/landlord', icon: MdDashboard },

        { label: 'Properties', href: '/dashboard/landlord/properties', icon: MdHomeWork },

        { label: 'Tenants', href: '/dashboard/landlord/tenants', icon: MdGroup },

        { label: 'Payments', href: '/dashboard/landlord/payments', icon: MdPayment },

        { label: 'Contracts', href: '/dashboard/landlord/contracts', icon: MdDescription },

        { label: 'Support', href: '/dashboard/landlord/support', icon: MdSupportAgent },

        { label: 'Settings', href: '/dashboard/landlord/settings', icon: MdSettings },

    ],

    investor: [

        { label: 'Dashboard', href: '/dashboard/investor', icon: MdDashboard },

        { label: 'Opportunities', href: '/dashboard/investor/opportunities', icon: MdTrendingUp },

        { label: 'Portfolio', href: '/dashboard/investor/portfolio', icon: MdPieChart },

        { label: 'Reports', href: '/dashboard/investor/reports', icon: MdDescription },

        { label: 'Documents', href: '/dashboard/investor/documents', icon: MdFolder },

        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },

        { label: 'Settings', href: '/dashboard/investor/settings', icon: MdSettings },

    ],

    admin: [

        { label: 'Users', href: '/dashboard/admin/users', icon: MdGroup },

        { label: 'Roles', href: '/dashboard/admin/roles', icon: MdSettings },

        { label: 'Audit Logs', href: '/dashboard/admin/audit', icon: MdHistory },

        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },

    ],

    caretaker: [

        { label: 'Dashboard', href: '/dashboard/caretaker', icon: MdDashboard },

        { label: 'My Tasks', href: '/dashboard/caretaker/tasks', icon: MdAssignment },

        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },

    ],

    agent: [

        { label: 'Dashboard', href: '/dashboard/agent', icon: RxDashboard },

        { label: 'My Listings', href: '/dashboard/agent/listings', icon: MdHomeWork },

        { label: 'Leads & Clients', href: '/dashboard/agent/leads', icon: MdGroup },

        { label: 'Viewings/Schedule', href: '/dashboard/agent/schedule', icon: MdAssignment },

        { label: 'Transactions', href: '/dashboard/agent/transactions', icon: MdPayment },

        { label: 'Marketing Tools', href: '/dashboard/agent/marketing', icon: MdTrendingUp },

        { label: 'Documents', href: '/dashboard/agent/documents', icon: MdFolder },

        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront }, { label: 'Settings', href: '/dashboard/agent/settings', icon: MdSettings },

    ]

};

export default function DashboardSidebar({ isOpen = false, onClose }: { isOpen?: boolean, onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    
    const { activeRole, resetUser } = useUserStore();

    // We prioritize the role in the URL to keep the UI consistent if a user deep-links
    const urlRole = pathname.split('/')[2] as Role;
    const currentRole = (urlRole && NAV_CONFIG[urlRole] ? urlRole : activeRole || 'tenant') as keyof typeof NAV_CONFIG;
    
    const navItems = NAV_CONFIG[currentRole];

    const handleLogout = () => {
        resetUser(); 
        toast.success('Signed out successfully');
        router.replace('/signin'); 
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-40 
            w-64 m-4 
            bg-[#00853E] text-white 
            rounded-2xl 
            transition-transform duration-300 ease-in-out
            flex flex-col shadow-2xl
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            {/* Logo */}
            <div className="p-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight">Help2Home</Link>
                <button onClick={onClose} className="md:hidden p-2 hover:bg-white/10 rounded-lg">
                    <MdClose size={24} />
                </button>
            </div>

            {/* Nav List */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems?.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-white text-[#00853E] font-bold shadow-lg shadow-black/10'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            <Icon size={20} className={isActive ? 'text-[#00853E]' : 'text-white/70 group-hover:text-white'} />
                            <span className="text-[13px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 mt-auto border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-white/80 hover:bg-red-500/20 hover:text-white rounded-xl transition-all"
                >
                    <MdLogout size={20} />
                    <span className="text-[13px] font-medium">Log Out</span>
                </button>
            </div>
        </aside>
    );
}