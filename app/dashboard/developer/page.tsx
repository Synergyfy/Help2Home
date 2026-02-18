'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardWidgets } from '@/components/dashboard/developer/DashboardWidgets';
import { MdAdd, MdArrowForward } from 'react-icons/md';

export default function DeveloperDashboardPage() {

    return (
        <div className="h-full py-6 px-2 md:px-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Developer Overview</h1>
                <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening with your projects.</p>
            </div>

            <DashboardWidgets />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects / Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
                            <button className="text-brand-green font-bold text-sm hover:underline flex items-center gap-1">
                                View All <MdArrowForward />
                            </button>
                        </div>

                        {/* Placeholder for project list */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50 hover:border-gray-100 cursor-pointer">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">Lekki Gardens Phase {item}</h3>
                                        <p className="text-sm text-gray-500">Residential • 85% Complete</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-brand-green rounded-full text-xs font-bold">
                                        In Progress
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold mb-2">Create New Project</h2>
                            <p className="text-white/70 text-sm mb-6">Launch a new development project and start attracting investors.</p>
                            <Link href="/dashboard/developer/projects" className="w-full">
                                <button className="w-full py-3 bg-brand-green hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                    <MdAdd size={20} />
                                    Start Project
                                </button>
                            </Link>
                        </div>
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/20 rounded-full blur-xl -ml-10 -mb-10"></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Tasks</h2>
                        <div className="space-y-3">
                            {['Update Portfolio Images', 'Review Investor Applications', 'Upload Progress Report'].map((task, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                                    <span className="text-sm text-gray-600 font-medium">{task}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
