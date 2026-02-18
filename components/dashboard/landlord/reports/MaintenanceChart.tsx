'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer as RechartsResponsiveContainer, Cell } from 'recharts';

const ResponsiveContainer = RechartsResponsiveContainer as any;
import { MaintenanceData } from '@/lib/mockAnalyticsData';

interface MaintenanceChartProps {
    data: MaintenanceData[];
}

export default function MaintenanceChart({ data }: MaintenanceChartProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
            notation: 'compact',
        }).format(val);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Maintenance Spend</h3>
                    <p className="text-sm text-gray-500">Cost breakdown by category.</p>
                </div>
                <button className="text-sm text-[#00853E] hover:underline">View Table</button>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                    <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <Tooltip
                        formatter={(value: number | undefined) => {
                            if (typeof value === 'number') {
                                return [new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value), 'Spend'];
                            }
                            return ['', 'Spend'];
                        }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="spend" radius={[4, 4, 0, 0]} fill="#3B82F6" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
