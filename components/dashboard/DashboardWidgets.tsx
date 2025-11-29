import React from 'react';
import Link from 'next/link';

// --- Summary Card ---
interface SummaryCardProps {
    title: string;
    value: string | number;
    subtext: string;
    ctaText: string;
    ctaLink: string;
    tooltip?: string;
    icon?: React.ReactNode;
    isEmpty?: boolean;
    emptyText?: string;
    emptyCtaText?: string;
    emptyCtaLink?: string;
    variant?: 'blue' | 'green' | 'orange' | 'purple';
}

export function SummaryCard({
    title,
    value,
    subtext,
    ctaText,
    ctaLink,
    tooltip,
    icon,
    isEmpty,
    emptyText,
    emptyCtaText,
    emptyCtaLink,
    variant = 'blue',
}: SummaryCardProps) {
    const variantStyles = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
        green: { bg: 'bg-green-50', text: 'text-[#00853E]' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
    };

    const styles = variantStyles[variant];

    if (isEmpty) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-full ${styles.bg} flex items-center justify-center ${styles.text}`}>
                            {icon}
                        </div>
                        <span className="text-2xl font-bold text-gray-400">0</span>
                    </div>
                    <h3 className="text-gray-500 font-medium">{title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{emptyText}</p>
                </div>
                {emptyCtaText && emptyCtaLink && (
                    <Link href={emptyCtaLink} className="text-[#00853E] text-sm font-semibold mt-4 inline-block hover:underline">
                        {emptyCtaText} &rarr;
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between" title={tooltip}>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full ${styles.bg} flex items-center justify-center ${styles.text}`}>
                        {icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                </div>
                <h3 className="text-gray-500 font-medium">{title}</h3>
                <p className="text-xs text-gray-400 mt-1">{subtext}</p>
            </div>
            <Link href={ctaLink} className="text-[#00853E] text-sm font-semibold mt-4 inline-block hover:underline">
                {ctaText} &rarr;
            </Link>
        </div>
    );
}

// --- Repayment Progress ---
interface RepaymentProgressProps {
    percentage: number;
    nextDueDate: string;
    nextAmount: string;
}

export function RepaymentProgress({ percentage, nextDueDate, nextAmount }: RepaymentProgressProps) {
    const isLowProgress = percentage < 30;

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">This month's progress</h3>
                <Link href="/dashboard/tenant/payments" className="text-sm text-[#00853E] font-medium hover:underline">
                    View full schedule
                </Link>
            </div>

            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${isLowProgress ? 'text-orange-600 bg-orange-100' : 'text-[#00853E] bg-green-100'}`}>
                            {isLowProgress ? 'Action Needed' : 'On Track'}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[#00853E]">
                            {percentage}% paid
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                    <div style={{ width: `${percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isLowProgress ? 'bg-orange-500' : 'bg-[#00853E]'}`}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">Next due: <span className="font-medium text-gray-900">{nextDueDate}</span></p>
                    <p className="font-bold text-gray-900">{nextAmount}</p>
                </div>
                {isLowProgress && (
                    <p className="text-xs text-orange-600 mt-2">
                        You're behind on payments. <Link href="/dashboard/tenant/support" className="underline">Contact support</Link> or pay now.
                    </p>
                )}
            </div>
        </div>
    );
}

// --- Applications Feed ---
interface Application {
    id: string;
    propertyTitle: string;
    propertyImage: string; // Placeholder or URL
    status: 'Submitted' | 'Under Review' | 'Bank Approval' | 'Funded' | 'Active' | 'Completed';
    statusMessage: string;
    updatedAt: string;
}

interface ApplicationsFeedProps {
    applications: Application[];
}

export function ApplicationsFeed({ applications }: ApplicationsFeedProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-100 text-blue-800';
            case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'Bank Approval': return 'bg-purple-100 text-purple-800';
            case 'Funded': return 'bg-green-100 text-green-800';
            case 'Active': return 'bg-[#00853E] text-white';
            case 'Completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (applications.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">You don't have any active applications yet.</h3>
                <p className="text-gray-500 mb-6">Find a home you like and apply with flexible payment options.</p>
                <Link href="/dashboard/tenant/marketplace" className="bg-[#00853E] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#006c32] transition-colors shadow-sm inline-block">
                    Browse properties
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {applications.map((app) => (
                    <div key={app.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="w-full sm:w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                            {/* In a real app, use next/image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 text-xs">
                                Img
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                                <Link href={`/dashboard/tenant/applications/${app.id}`} className="font-semibold text-gray-900 hover:text-[#00853E] transition-colors line-clamp-1 break-all">
                                    {app.propertyTitle}
                                </Link>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(app.status)}`}>
                                    {app.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 font-mono">{app.id}</p>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{app.statusMessage}</p>
                            <div className="flex items-center justify-between">
                                <Link href={`/dashboard/tenant/applications/${app.id}`} className="text-xs font-bold text-[#00853E] hover:underline">
                                    View details
                                </Link>
                                <span className="text-xs text-gray-400">{app.updatedAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Quick Links Grid ---
export function QuickLinksGrid() {
    const links = [
        {
            title: 'Browse Properties',
            subtitle: 'Search homes and compare plans',
            href: '/dashboard/tenant/marketplace',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            title: 'My Applications',
            subtitle: 'Track status and upload docs',
            href: '/dashboard/tenant/applications',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: 'Payments',
            subtitle: 'Make down payments and installments',
            href: '/dashboard/tenant/payments',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            title: 'Support',
            subtitle: 'Get help with applications or payments',
            href: '/dashboard/tenant/support',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {links.map((link) => (
                    <Link
                        key={link.title}
                        href={link.href}
                        className="group p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:shadow-sm transition-all border border-transparent hover:border-green-100 flex items-start gap-3 sm:gap-4"
                        aria-label={link.title}
                        title="Tap to open"
                    >
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:text-[#00853E] group-hover:scale-110 transition-transform flex-shrink-0">
                            {link.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-[#00853E] transition-colors text-sm break-words">{link.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 break-words leading-relaxed">{link.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// --- Education Preview ---
interface EducationPreviewProps {
    article: {
        title: string;
        category: string;
        readTime: string;
        image?: string;
    } | null;
}

export function EducationPreview({ article }: EducationPreviewProps) {
    if (!article) {
        return (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-gray-500 text-sm">No learning content available right now. Check back later.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#00853E] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        {article.category}
                    </span>
                    <span className="text-xs text-white/80">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:underline decoration-white/50 underline-offset-4 transition-all">{article.title}</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">Learn more about how to manage your finances and get the best out of your rental agreement.</p>
                <button className="bg-white text-[#00853E] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm">
                    Learn more
                </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500 delay-75"></div>
        </div>
    );
}
