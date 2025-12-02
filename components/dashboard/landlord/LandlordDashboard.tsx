'use client';

import { useState } from 'react';
import SummaryTiles from './SummaryTiles';
import ActivityFeed from './ActivityFeed';
import OpenTasks from './OpenTasks';
import RecentPayments from './RecentPayments';
import QuickActions from './QuickActions';
import VerificationStatus from './VerificationStatus';
import PerformanceSnapshot from './PerformanceSnapshot';
import HelpSupport from './HelpSupport';
import {
    MOCK_SUMMARY_TILES,
    MOCK_ACTIVITY,
    MOCK_TASKS,
    MOCK_PAYMENTS,
    MOCK_VERIFICATION
} from '@/lib/mockLandlordData';

export default function LandlordDashboard() {
    const [role, setRole] = useState('Landlord');
    const [dateRange, setDateRange] = useState('30d');
    const [propertyFilter, setPropertyFilter] = useState('All');

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm">Welcome back, here's what's happening today.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* Role Switcher */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#00853E] focus:border-[#00853E] block p-2.5"
                    >
                        <option value="Landlord">Landlord</option>
                        <option value="Agent">Agent</option>
                        <option value="Caretaker">Caretaker</option>
                    </select>

                    {/* Date Range */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#00853E] focus:border-[#00853E] block p-2.5"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>

                    {/* Property Filter */}
                    <select
                        value={propertyFilter}
                        onChange={(e) => setPropertyFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#00853E] focus:border-[#00853E] block p-2.5"
                    >
                        <option value="All">All Properties</option>
                        <option value="1">15B Bourdillon St</option>
                        <option value="2">10C Akerele Rd</option>
                    </select>
                </div>
            </div>

            {/* Summary Tiles */}
            <SummaryTiles tiles={MOCK_SUMMARY_TILES} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Main) */}
                <div className="lg:col-span-2">
                    <ActivityFeed activities={MOCK_ACTIVITY} />
                    <OpenTasks tasks={MOCK_TASKS} />
                    <RecentPayments payments={MOCK_PAYMENTS} />
                </div>

                {/* Right Column (Side Rail) */}
                <div className="space-y-6">
                    <QuickActions />
                    <VerificationStatus items={MOCK_VERIFICATION} />
                    <PerformanceSnapshot />
                    <HelpSupport />
                </div>
            </div>
        </div>
    );
}
