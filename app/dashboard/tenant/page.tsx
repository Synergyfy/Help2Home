'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import { useApplications } from '@/hooks/useApplications';
import { 
    HiOutlineKey, 
    HiOutlineShieldCheck, 
    HiOutlineArrowRight 
} from 'react-icons/hi2';
import {
    SummaryCard,
    RepaymentProgress,
    ApplicationsFeed,
    QuickLinksGrid,
    EducationPreview,
    MarketplaceFundingTracker
} from '@/components/dashboard/DashboardWidgets';

export default function TenantDashboard() {
    const router = useRouter();
    const { applications, isLoading: appsLoading } = useApplications();

    // Mock Funding Data for the new tracker
    const marketplaceFunding = [
        {
            id: 'fund_1',
            propertyTitle: 'The Glass House - 5 Bed Detached',
            targetAmount: 15000000,
            raisedAmount: 9750000,
            investorCount: 12,
            status: 'Funding' as const
        }
    ];

    // Derived stats from real data
    const stats = {
        ongoingApplications: applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length,
        approvedHomes: applications.filter(a => a.status === 'Approved' || a.status === 'Funded').length,
        fundedApplications: applications.filter(a => a.status === 'Funded'),
        nextRepayment: {
            amount: 45200,
            dueDate: 'Mar 3, 2026',
        },
        unreadMessages: 3,
        repaymentProgress: 40,
    };

    const recentApplications = applications.slice(0, 5).map(app => ({
        id: app.id,
        propertyTitle: app.propertyTitle,
        propertyImage: app.propertyImage,
        status: (app.status === 'Pending' ? 'Submitted' : (app.status === 'Approved' ? 'Active' : app.status)) as any,
        statusMessage: app.status === 'Pending' ? 'Your application has been received.' :
            app.status === 'Under Review' ? 'Our team is reviewing your documents.' :
                app.status === 'Approved' ? 'Congratulations! Your application is approved.' :
                    app.status === 'Rejected' ? 'Unfortunately, your application was not successful.' : 'Draft saved.',
        updatedAt: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Draft'
    }));
    const [educationArticle, setEducationArticle] = useState<any>(null);

    useEffect(() => {
        // Simulate API fetch for other data
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setEducationArticle({
                id: '6',
                title: 'Financial Literacy for Renters',
                category: 'Financial Literacy',
                readTime: '7 min read',
                image: '/images/education-1.jpg',
            });
        };

        fetchData();
    }, []);

    if (appsLoading && applications.length === 0) {
        return (
            <div className="space-y-8 pb-12 animate-pulse">
                {/* Header Skeleton */}
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>

                {/* Summary Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="h-48 bg-gray-200 rounded-2xl"></div>
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
                    </div>
                    <div className="space-y-8">
                        <div className="h-64 bg-gray-200 rounded-2xl"></div>
                        <div className="h-48 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-24 md:pb-12">
            <FadeIn>
                {/* Page Title & Breadcrumb */}
                <div className="mb-8">
                    <nav className="text-sm text-gray-500 mb-1">Home / Dashboard</nav>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {useUserStore.getState().profile.firstName || 'User'} — Dashboard
                    </h1>
                </div>

                {/* Handover Verification Alert */}
                {stats.fundedApplications.length > 0 && (
                    <div className="mb-8 p-6 bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-200 animate-in fade-in slide-in-from-top-4 duration-700 relative overflow-hidden group">
                        <HiOutlineKey className="absolute right-[-20px] bottom-[-20px] size-40 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                                    <HiOutlineShieldCheck size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Property Handover Required</h2>
                                    <p className="text-blue-100 text-sm mt-1 max-w-xl">
                                        Good news! Investors have fully funded your application for <span className="font-bold text-white">"{stats.fundedApplications[0].propertyTitle}"</span>. 
                                        Please confirm you have received the keys to release funds to the landlord.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => router.push(`/dashboard/tenant/applications/${stats.fundedApplications[0].id}`)}
                                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl text-sm hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                            >
                                Confirm Handover
                                <HiOutlineArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Hero Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: Ongoing Applications */}
                    <SummaryCard
                        title="Ongoing applications"
                        value={stats.ongoingApplications}
                        subtext="Applications in progress"
                        ctaText="View all"
                        ctaLink="/dashboard/tenant/applications"
                        tooltip="Applications currently under review or awaiting bank action"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        }
                        isEmpty={stats.ongoingApplications === 0}
                        emptyText="No active applications — start one now."
                        emptyCtaText="Browse properties"
                        emptyCtaLink="/marketplace"
                        variant="blue"
                    />

                    {/* Card 2: Approved Homes */}
                    <SummaryCard
                        title="Approved homes"
                        value={stats.approvedHomes}
                        subtext="Homes ready for move-in"
                        ctaText="View approved"
                        ctaLink="/dashboard/tenant/applications" // Or a specific filter
                        tooltip="Homes where your application has been approved"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        }
                        isEmpty={stats.approvedHomes === 0}
                        emptyText="0 — No approved homes yet. Keep applying!"
                        variant="green"
                    />

                    {/* Card 3: Next Repayment */}
                    <SummaryCard
                        title="Next repayment due"
                        value={`₦ ${stats.nextRepayment.amount.toLocaleString()}`}
                        subtext={`Due ${stats.nextRepayment.dueDate}`}
                        ctaText="Pay Now"
                        ctaLink="/dashboard/tenant/payments"
                        tooltip="Pay your next scheduled installment to avoid penalties"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        isEmpty={stats.nextRepayment.amount === 0}
                        emptyText="No upcoming repayments"
                        emptyCtaText="View payments"
                        emptyCtaLink="/dashboard/tenant/payments"
                        variant="orange"
                    />

                    {/* Card 4: Unread Messages */}
                    <SummaryCard
                        title="Unread messages"
                        value={stats.unreadMessages}
                        subtext="Messages from landlords or support"
                        ctaText="Open messages"
                        ctaLink="/dashboard/tenant/support" // Or messages page if it existed
                        tooltip="New messages may include requests or important updates"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        }
                        isEmpty={stats.unreadMessages === 0}
                        emptyText="You're all caught up — no unread messages!"
                        variant="purple"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Repayment Progress */}
                        <RepaymentProgress
                            percentage={stats.repaymentProgress}
                            nextDueDate={stats.nextRepayment.dueDate}
                            nextAmount={`₦ ${stats.nextRepayment.amount.toLocaleString()}`}
                        />

                        {/* Applications Feed */}
                        <ApplicationsFeed applications={recentApplications} />
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Marketplace Funding Tracker */}
                        <MarketplaceFundingTracker items={marketplaceFunding} />

                        {/* Quick Links */}
                        <QuickLinksGrid />

                        {/* Education Hub Preview */}
                        <EducationPreview article={educationArticle} />
                    </div>
                </div>

                {/* Mobile Footer Action Bar (Visible only on small screens) */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden flex items-center justify-between z-50">
                    <Link href="/dashboard/tenant/support" className="flex items-center gap-2 text-gray-600">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            {stats.unreadMessages > 0 && (
                                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            )}
                        </div>
                        <span className="text-sm font-medium">Messages</span>
                    </Link>
                    <Link href="/marketplace" className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#006c32] transition-colors">
                        Browse Properties
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
}
