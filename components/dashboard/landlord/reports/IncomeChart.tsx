'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer as RechartsResponsiveContainer, Legend } from 'recharts';

const ResponsiveContainer = RechartsResponsiveContainer as any;
import { IncomeData } from '@/lib/mockAnalyticsData';

interface IncomeChartProps {
    data: IncomeData[];
}

export default function IncomeChart({ data }: IncomeChartProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
            notation: 'compact',
            compactDisplay: 'short'
        }).format(val);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Rental Income Over Time</h3>
                    <p className="text-sm text-gray-500">Gross vs Net income performance.</p>
                </div>
                <button className="text-sm text-[#00853E] hover:underline">View Table</button>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00853E" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#00853E" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                    <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <Tooltip
                        formatter={(value: number | undefined) => {
                            if (typeof value === 'number') {
                                return [new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value), ''];
                            }
                            return ['', '']; // Return an empty array of strings if value is undefined
                        }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area type="monotone" dataKey="gross" name="Gross Income" stroke="#00853E" fillOpacity={1} fill="url(#colorGross)" strokeWidth={2} />
                    <Area type="monotone" dataKey="net" name="Net Income" stroke="#10B981" fillOpacity={1} fill="url(#colorNet)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
