'use client';

import React from 'react';
import { MdTrendingUp, MdHomeWork, MdAttachMoney, MdShowChart } from 'react-icons/md';

export const DashboardWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Projects */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <MdHomeWork size={24} />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 new</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>

            {/* Total Investment */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                        <MdAttachMoney size={24} />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+15%</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Total Investment</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">₦45.2M</p>
            </div>

            {/* ROI Stats */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                        <MdTrendingUp size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">Avg</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Average ROI</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">22.5%</p>
            </div>

            {/* Portfolio Views */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                        <MdShowChart size={24} />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5.2k</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Portfolio Views</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">12.5k</p>
            </div>
        </div>
    );
};
