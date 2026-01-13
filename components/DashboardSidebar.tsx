'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore';
import {
    MdDashboard, MdPerson, MdFavorite, MdDescription, MdHistory,
    MdPayment, MdSupportAgent, MdSettings, MdNotifications,
    MdSchool, MdHomeWork, MdGroup, MdTrendingUp, MdPieChart,
    MdFolder, MdStorefront, MdAssignment, MdLogout, MdClose, MdSecurity,
    MdChevronRight, MdExpandMore
} from 'react-icons/md';
import { GoChecklist } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { useState } from 'react';

import { toast } from 'react-toastify';

interface NavItem {
    label: string;
    href?: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    subItems?: NavItem[];
}

const NAV_CONFIG: Record<string, NavItem[]> = {
    admin: [
        { label: 'Dashboard', href: '/dashboard/admin', icon: RxDashboard },
        { label: 'My Profile', href: '/dashboard/admin/profile', icon: MdPerson },
        {
            label: 'User Management',
            icon: MdGroup,
            subItems: [
                {
                    label: 'Service Network',
                    icon: MdAssignment,
                    subItems: [
                        { label: 'Landlords', href: '/dashboard/admin/users?tab=landlords', icon: MdPerson },
                        { label: 'Caretakers', href: '/dashboard/admin/users?tab=caretakers', icon: MdSupportAgent },
                        { label: 'Agents', href: '/dashboard/admin/users?tab=agents', icon: MdGroup },
                    ]
                },
                { label: 'Resident Registry', href: '/dashboard/admin/users?tab=tenants', icon: MdPerson },
                { label: 'Venture Investors', href: '/dashboard/admin/users?tab=investors', icon: MdTrendingUp },
            ]
        },
        { label: 'Super Admin Tools', href: '/dashboard/admin/superrole', icon: MdSecurity },
        { label: 'Listings', href: '/dashboard/admin/listing', icon: GoChecklist },
        { label: 'Audit Logs', href: '/dashboard/admin/audit', icon: MdHistory },
        { label: 'Support Tickets', href: '/dashboard/admin/support', icon: MdSupportAgent },
        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },
    ],
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
        { label: 'My Profile', href: '/dashboard/landlord/profile', icon: MdPerson },
        { label: 'Properties', href: '/dashboard/landlord/properties', icon: MdHomeWork },
        { label: 'Tenants', href: '/dashboard/landlord/tenants', icon: MdGroup },
        { label: 'Applications', href: '/dashboard/landlord/applications', icon: MdAssignment },
        { label: 'Payments', href: '/dashboard/landlord/payments', icon: MdPayment },
        { label: 'Contracts', href: '/dashboard/landlord/contracts', icon: MdDescription },
        { label: 'Support', href: '/dashboard/landlord/support', icon: MdSupportAgent },
        { label: 'Settings', href: '/dashboard/landlord/settings', icon: MdSettings },
    ],
    investor: [
        { label: 'Dashboard', href: '/dashboard/investor', icon: MdDashboard },
        { label: 'My Profile', href: '/dashboard/investor/profile', icon: MdPerson },
        { label: 'Opportunities', href: '/dashboard/investor/opportunities', icon: MdTrendingUp },
        { label: 'Portfolio', href: '/dashboard/investor/portfolio', icon: MdPieChart },
        { label: 'Reports', href: '/dashboard/investor/reports', icon: MdDescription },
        { label: 'Documents', href: '/dashboard/investor/documents', icon: MdFolder },
        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },
        { label: 'Settings', href: '/dashboard/investor/settings', icon: MdSettings },
    ],
    caretaker: [
        { label: 'Dashboard', href: '/dashboard/caretaker', icon: MdDashboard },
        { label: 'My Profile', href: '/dashboard/caretaker/profile', icon: MdPerson },
        { label: 'Properties', href: '/dashboard/caretaker/properties', icon: MdHomeWork },
        { label: 'My Tasks', href: '/dashboard/caretaker/tasks', icon: MdAssignment },
        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },
    ],
    agent: [
        { label: 'Dashboard', href: '/dashboard/agent', icon: RxDashboard },
        { label: 'My Profile', href: '/dashboard/agent/profile', icon: MdPerson },
        { label: 'My Listings', href: '/dashboard/agent/properties', icon: MdHomeWork },
        { label: 'Leads & Clients', href: '/dashboard/agent/leads', icon: MdGroup },
        { label: 'Viewings/Schedule', href: '/dashboard/agent/schedule', icon: MdAssignment },
        { label: 'Transactions', href: '/dashboard/agent/transactions', icon: MdPayment },
        { label: 'Marketing Tools', href: '/dashboard/agent/marketing', icon: MdTrendingUp },
        { label: 'Documents', href: '/dashboard/agent/documents', icon: MdFolder },
        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },
        { label: 'Settings', href: '/dashboard/agent/settings', icon: MdSettings },
    ],
    superAdmin: [
        { label: 'Admin Dashboard', href: '/dashboard/admin', icon: RxDashboard },
        { label: 'Systems Health', href: '/dashboard/admin/health', icon: MdSecurity },
        { label: 'Marketplace', href: '/marketplace', icon: MdStorefront },
    ]
};

const NavLink = ({ item, pathname, depth = 0, onClose }: { item: NavItem, pathname: string, depth?: number, onClose?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = item.href ? pathname === item.href || (item.href.includes('?') && pathname + (typeof window !== 'undefined' ? window.location.search : '') === item.href) : false;
    const Icon = item.icon;

    const handleClick = () => {
        if (hasSubItems) {
            setIsOpen(!isOpen);
        } else if (onClose) {
            onClose();
        }
    };

    return (
        <div className="space-y-1">
            {item.href ? (
                <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                        flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive
                            ? 'bg-white text-brand-green font-bold shadow-lg shadow-black/10'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'}
                        ${depth > 0 ? 'ml-4 py-2 text-[12px]' : 'text-[13px]'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <Icon size={depth > 0 ? 16 : 20} className={isActive ? 'text-brand-green' : 'text-white/70 group-hover:text-white'} />
                        <span className="font-medium">{item.label}</span>
                    </div>
                </Link>
            ) : (
                <button
                    onClick={handleClick}
                    className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                        text-white/80 hover:bg-white/10 hover:text-white
                        ${depth > 0 ? 'ml-4 py-2 text-[12px]' : 'text-[13px]'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <Icon size={depth > 0 ? 16 : 20} className="text-white/70 group-hover:text-white" />
                        <span className="font-medium text-left">{item.label}</span>
                    </div>
                    {hasSubItems && (
                        isOpen ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />
                    )}
                </button>
            )}

            {hasSubItems && isOpen && (
                <div className="space-y-1 border-l border-white/10 ml-6">
                    {item.subItems?.map((sub, idx) => (
                        <NavLink key={idx} item={sub} pathname={pathname} depth={depth + 1} onClose={onClose} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function DashboardSidebar({ isOpen = false, onClose }: { isOpen?: boolean, onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const { activeRole, resetUser, roles } = useUserStore();

    // Authorization Protection
    useEffect(() => {
        const isPathAdmin = pathname.startsWith('/dashboard/admin');
        const hasAdminRole = roles.includes('admin');

        if (isPathAdmin && !hasAdminRole) {
            toast.error("Unauthorized Access");
            if (activeRole) {
                router.replace(`/dashboard/${activeRole}`);
            } else {
                router.replace('/signin');
            }
        }
    }, [pathname, roles, activeRole, router]);

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
            bg-brand-green text-white 
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
                {navItems?.map((item, idx) => (
                    <NavLink key={idx} item={item} pathname={pathname} onClose={onClose} />
                ))}
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
