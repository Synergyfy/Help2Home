'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function TenantDashboard() {
    // Mock data - replace with API calls later
    const stats = {
        ongoingApplications: 1,
        approvedHomes: 0,
        nextRepayment: {
            amount: 150000,
            dueDate: '2025-12-01',
        },
        repaymentProgress: 45, // percentage
    };

    const recentApplications = [
        {
            id: 1,
            property: 'Modern 2-Bedroom Apartment',
            location: 'Lekki Phase 1, Lagos',
            status: 'Under Review',
            date: '2025-11-20',
            image: '/images/apartment-1.jpg', // Placeholder
        },
    ];

    const educationArticle = {
        title: 'Understanding Rent Financing',
        category: 'Financial Literacy',
        readTime: '5 min read',
        image: '/images/education-1.jpg', // Placeholder
    };

    return (
        <div className="space-y-8 pb-12">
            <FadeIn>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Tenant!</h1>
                        <p className="text-gray-500 mt-1">Here's what's happening with your housing journey.</p>
                    </div>
                    <Link
                        href="/dashboard/tenant/marketplace"
                        className="bg-[#00853E] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#006c32] transition-colors shadow-sm"
                    >
                        Browse Properties
                    </Link>
                </div>

                {/* Hero Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Ongoing Applications */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.ongoingApplications}</span>
                        </div>
                        <h3 className="text-gray-500 font-medium">Ongoing Applications</h3>
                        <Link href="/dashboard/tenant/applications" className="text-[#00853E] text-sm font-semibold mt-2 inline-block hover:underline">
                            View details &rarr;
                        </Link>
                    </div>

                    {/* Approved Homes */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#00853E]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stats.approvedHomes}</span>
                        </div>
                        <h3 className="text-gray-500 font-medium">Approved Homes</h3>
                        <Link href="/dashboard/tenant/marketplace" className="text-[#00853E] text-sm font-semibold mt-2 inline-block hover:underline">
                            Find a home &rarr;
                        </Link>
                    </div>

                    {/* Next Repayment */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500">Due: {stats.nextRepayment.dueDate}</span>
                                <span className="text-xl font-bold text-gray-900">₦{stats.nextRepayment.amount.toLocaleString()}</span>
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-medium">Next Repayment</h3>
                        <button className="text-[#00853E] text-sm font-semibold mt-2 hover:underline">
                            Pay Now &rarr;
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Repayment Progress */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Repayment Progress</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#00853E] bg-green-100">
                                            On Track
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-[#00853E]">
                                            {stats.repaymentProgress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                                    <div style={{ width: `${stats.repaymentProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#00853E]"></div>
                                </div>
                                <p className="text-sm text-gray-500">You have paid 45% of your total rent for this year. Keep it up!</p>
                            </div>
                        </div>

                        {/* Recent Applications */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
                                <Link href="/dashboard/tenant/applications" className="text-sm text-[#00853E] font-medium hover:underline">
                                    View All
                                </Link>
                            </div>

                            {recentApplications.length > 0 ? (
                                <div className="space-y-4">
                                    {recentApplications.map((app) => (
                                        <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                {/* <img src={app.image} alt={app.property} className="w-full h-full object-cover" /> */}
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">Img</div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{app.property}</h4>
                                                <p className="text-sm text-gray-500">{app.location}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    {app.status}
                                                </span>
                                                <p className="text-xs text-gray-400 mt-1">{app.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No recent applications.</p>
                                    <Link href="/dashboard/tenant/marketplace" className="text-[#00853E] font-medium mt-2 inline-block">
                                        Start browsing &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Quick Links */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/dashboard/tenant/marketplace" className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-[#00853E] transition-colors text-center group">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Browse</span>
                                </Link>
                                <Link href="/dashboard/tenant/applications" className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-[#00853E] transition-colors text-center group">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Applications</span>
                                </Link>
                                <Link href="/dashboard/tenant/payments" className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-[#00853E] transition-colors text-center group">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Payments</span>
                                </Link>
                                <Link href="/dashboard/tenant/support" className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-[#00853E] transition-colors text-center group">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Support</span>
                                </Link>
                            </div>
                        </div>

                        {/* Education Hub Preview */}
                        <div className="bg-[#00853E] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-3">
                                    {educationArticle.category}
                                </span>
                                <h3 className="text-lg font-bold mb-2">{educationArticle.title}</h3>
                                <p className="text-white/80 text-sm mb-4">{educationArticle.readTime}</p>
                                <button className="bg-white text-[#00853E] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                                    Learn More
                                </button>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10"></div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
