'use client';

import React, { useState } from 'react';
import AnalyticsFilterBar from '@/components/dashboard/landlord/reports/AnalyticsFilterBar';
import KPIGrid from '@/components/dashboard/landlord/reports/KPIGrid';
import IncomeChart from '@/components/dashboard/landlord/reports/IncomeChart';
import OccupancyChart from '@/components/dashboard/landlord/reports/OccupancyChart';
import MaintenanceChart from '@/components/dashboard/landlord/reports/MaintenanceChart';
import ReportsSidebar from '@/components/dashboard/landlord/reports/ReportsSidebar';
import { useLandlordAnalytics } from '@/hooks/useLandlordAnalytics';

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('30d');
    const [propertyFilter, setPropertyFilter] = useState('all');
    const { data, isLoading } = useLandlordAnalytics();

    const handleExport = () => {
        alert('Export logic will be integrated via backend PDF generator.');
    };

    return (
        <div className="pb-20">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-500">Track your portfolio performance and financial health.</p>
            </div>

            <AnalyticsFilterBar
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                propertyFilter={propertyFilter}
                onPropertyFilterChange={setPropertyFilter}
                onExport={handleExport}
            />

            {isLoading ? (
                <div className="space-y-6 animate-pulse mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-[2.5rem]"></div>
                        <div className="h-[400px] bg-gray-200 rounded-[2.5rem]"></div>
                    </div>
                </div>
            ) : !data ? (
                <div className="mt-12 text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium">No analytics data available yet. Add properties and collect rent to see trends.</p>
                </div>
            ) : (
                <>
                    <KPIGrid data={data.summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                        {/* Main Charts Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <IncomeChart data={data.incomeData} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <OccupancyChart data={data.occupancyData} />
                                <MaintenanceChart data={data.maintenanceData} />
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1">
                            <ReportsSidebar />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
