'use client';

import React from 'react';
import KPITile from './KPITile';
import { AnalyticsSummary } from '@/lib/api/analytics';

interface KPIGridProps {
    data: AnalyticsSummary;
}

export default function KPIGrid({ data }: KPIGridProps) {
    const isUp = data.revenueGrowth?.startsWith('+');
    const trendDir = isUp ? 'up' : data.revenueGrowth?.startsWith('-') ? 'down' : 'neutral';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPITile
                label="Total Revenue"
                value={data.totalRevenue}
                trend={trendDir}
                trendValue={data.revenueGrowth}
                tooltip="Gross revenue across all properties."
            />
            <KPITile
                label="Occupancy Rate"
                value={data.occupancyRate}
                tooltip="Percentage of occupied units."
            />
            <KPITile
                label="Active Maintenance"
                value={data.activeMaintenance.toString()}
                tooltip="Number of active maintenance requests."
            />
        </div>
    );
}
