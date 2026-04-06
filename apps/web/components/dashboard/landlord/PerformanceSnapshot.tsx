'use client';

import Link from 'next/link';
import { formatNumber } from '@/utils/helpers';
import { PerformanceData } from '@/types/dashboard';

interface Props {
    data?: PerformanceData;
}

export default function PerformanceSnapshot({ data }: Props) {
    const occupancyRate = data?.occupancyRate || 0;
    const unitsOccupied = data?.unitsOccupied || 0;
    const totalUnits = data?.totalUnits || 0;
    const monthlyIncome = data?.monthlyIncome || 0;
    const incomeTrend = data?.incomeTrend || 0;
    const avgTimeToRent = data?.avgTimeToRent || '-- ';

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance snapshot</h3>

            <div className="space-y-6">
                {/* Occupancy Rate */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Occupancy rate</span>
                        <span className="font-bold text-gray-900">{occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-brand-green h-2 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{unitsOccupied}/{totalUnits} units occupied</p>
                </div>

                {/* Avg Time to Rent */}
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Avg. time to rent</span>
                        <span className="font-bold text-gray-900">{avgTimeToRent} days</span>
                    </div>
                    <div className="h-8 flex items-end gap-1">
                        {/* Fake Sparkline */}
                        <div className="w-1/6 bg-green-100 h-2 rounded-t"></div>
                        <div className="w-1/6 bg-green-200 h-4 rounded-t"></div>
                        <div className="w-1/6 bg-green-300 h-3 rounded-t"></div>
                        <div className="w-1/6 bg-green-400 h-6 rounded-t"></div>
                        <div className="w-1/6 bg-green-500 h-5 rounded-t"></div>
                        <div className="w-1/6 bg-brand-green h-4 rounded-t"></div>
                    </div>
                </div>

                {/* Income */}
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Income this month</span>
                        <span className="font-bold text-gray-900">₦{formatNumber(monthlyIncome)}</span>
                    </div>
                    <p className={`text-xs font-medium ${incomeTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {incomeTrend >= 0 ? '+' : ''}{incomeTrend}% vs last month
                    </p>
                </div>
            </div>

            <Link href="/dashboard/landlord/reports" className="w-full mt-4 text-sm text-brand-green font-medium hover:underline text-center block">
                View full report
            </Link>
        </div>
    );
}
