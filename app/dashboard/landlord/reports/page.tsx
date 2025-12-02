'use client';

import React, { useState } from 'react';
import AnalyticsFilterBar from '@/components/dashboard/landlord/reports/AnalyticsFilterBar';
import KPIGrid from '@/components/dashboard/landlord/reports/KPIGrid';
import IncomeChart from '@/components/dashboard/landlord/reports/IncomeChart';
import OccupancyChart from '@/components/dashboard/landlord/reports/OccupancyChart';
import MaintenanceChart from '@/components/dashboard/landlord/reports/MaintenanceChart';
import ReportsSidebar from '@/components/dashboard/landlord/reports/ReportsSidebar';
import {
    MOCK_ANALYTICS_SUMMARY,
    MOCK_INCOME_DATA,
    MOCK_OCCUPANCY_DATA,
    MOCK_MAINTENANCE_DATA
} from '@/lib/mockAnalyticsData';

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('30d');
    const [propertyFilter, setPropertyFilter] = useState('all');

    const handleExport = () => {
        alert('Exporting report... (Mock)');
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

            <KPIGrid data={MOCK_ANALYTICS_SUMMARY} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Charts Column */}
                <div className="lg:col-span-2 space-y-6">
                    <IncomeChart data={MOCK_INCOME_DATA} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <OccupancyChart data={MOCK_OCCUPANCY_DATA} />
                        <MaintenanceChart data={MOCK_MAINTENANCE_DATA} />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1">
                    <ReportsSidebar />
                </div>
            </div>
        </div>
    );
}
