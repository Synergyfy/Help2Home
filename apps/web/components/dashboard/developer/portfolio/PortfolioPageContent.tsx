'use client';

import React from 'react';
import Link from 'next/link';
import { MdAdd, MdFilterList } from 'react-icons/md';
import { useUserStore } from '@/store/userStore';
import { PortfolioCard } from '@/components/dashboard/developer/portfolio/PortfolioCard';

export default function PortfolioPageContent() {
    const { roleData, updateRoleProfileData } = useUserStore();
    const developerData = roleData.developer || { portfolio: [] };
    const portfolio = developerData.portfolio || [];

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const updatedPortfolio = portfolio.filter(item => item.id !== id);
            updateRoleProfileData('developer', { portfolio: updatedPortfolio });
        }
    };

    return (
        <div className="h-full py-6 px-2 md:px-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Portfolio</h1>
                    <p className="text-gray-500">Showcase your past work to attract new investors.</p>
                </div>
                <Link
                    href="/dashboard/developer/portfolio/create"
                    className="py-3 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    <MdAdd size={20} />
                    Add Project
                </Link>
            </div>

            {/* Filters (Placeholder) */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold whitespace-nowrap">All Projects</button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 whitespace-nowrap">Completed</button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 whitespace-nowrap">In Progress</button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 whitespace-nowrap">Planned</button>
            </div>

            {portfolio.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map((item) => (
                        <PortfolioCard
                            key={item.id}
                            item={item}
                            onDelete={handleDelete}
                        // onEdit will be implemented later or via Link wrapper
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <MdFilterList size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No Projects Yet</h3>
                    <p className="text-gray-500 mb-6 text-center max-w-sm">Start building your portfolio to show investors track record.</p>
                    <Link
                        href="/dashboard/developer/portfolio/create"
                        className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg"
                    >
                        Create First Project
                    </Link>
                </div>
            )}
        </div>
    );
}
