'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { OccupancyData } from '@/lib/mockAnalyticsData';

interface OccupancyChartProps {
    data: OccupancyData[];
}

export default function OccupancyChart({ data }: OccupancyChartProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Occupancy by Property</h3>
                    <p className="text-sm text-gray-500">Percentage of units currently occupied.</p>
                </div>
                <button className="text-sm text-[#00853E] hover:underline">View Table</button>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart layout="vertical" data={data} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="property" type="category" width={100} tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        cursor={{ fill: '#F3F4F6' }}
                        formatter={(value: number) => [`${value}%`, 'Occupancy']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="occupancy" radius={[0, 4, 4, 0]} barSize={32}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.occupancy >= 90 ? '#00853E' : entry.occupancy >= 70 ? '#FBBF24' : '#EF4444'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
