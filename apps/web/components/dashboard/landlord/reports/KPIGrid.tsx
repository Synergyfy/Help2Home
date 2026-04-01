'use client';

import React from 'react';
import KPITile from './KPITile';
import { AnalyticsSummary } from '@/lib/mockAnalyticsData';

interface KPIGridProps {
    data: AnalyticsSummary;
}

export default function KPIGrid({ data }: KPIGridProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <KPITile
                label="Total Rental Income"
                value={formatCurrency(data.totalIncome.value)}
                trend={data.totalIncome.trend}
                trendValue={data.totalIncome.trendValue}
                tooltip="Gross income from all properties before deductions."
            />
            <KPITile
                label="Occupancy Rate"
                value={`${data.occupancyRate.value}%`}
                trend={data.occupancyRate.trend}
                trendValue={data.occupancyRate.trendValue}
                tooltip={`${data.occupancyRate.occupiedUnits} of ${data.occupancyRate.totalUnits} units occupied.`}
            />
            <KPITile
                label="Avg. Time-to-Rent"
                value={`${data.avgTimeToRent.value} days`}
                trend={data.avgTimeToRent.trend}
                trendValue={data.avgTimeToRent.trendValue}
                tooltip="Average days a unit stays vacant."
            />
            <KPITile
                label="Tenant Churn"
                value={`${data.churnRate.value}%`}
                trend={data.churnRate.trend}
                trendValue={data.churnRate.trendValue}
                tooltip="Percentage of tenants who moved out."
            />
            <KPITile
                label="On-Time Payments"
                value={`${data.onTimePayments.value}%`}
                trend={data.onTimePayments.trend}
                trendValue={data.onTimePayments.trendValue}
                tooltip="Percentage of rent payments received by due date."
            />
            <KPITile
                label="Maintenance Spend"
                value={formatCurrency(data.maintenanceSpend.value)}
                trend={data.maintenanceSpend.trend}
                trendValue={data.maintenanceSpend.trendValue}
                tooltip="Total cost of completed maintenance requests."
            />
        </div>
    );
}
