'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlinePlusCircle,
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineLightBulb,
    HiOutlineBanknotes
} from 'react-icons/hi2';

const STATUS_CONFIG = {
    planning: { label: 'Planning', color: 'bg-purple-50 text-purple-700', icon: HiOutlineLightBulb },
    fundraising: { label: 'Fundraising', color: 'bg-orange-50 text-orange-700', icon: HiOutlineBanknotes },
    'in-progress': { label: 'In Progress', color: 'bg-blue-50 text-blue-700', icon: HiOutlineClock },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700', icon: HiOutlineCheckCircle }
};

// Mock data
const PROJECTS = [
    {
        id: '1',
        title: 'Lekki Waterfront Residences',
        description: 'Luxury waterfront development with 50 units',
        category: 'Residential',
        location: 'Lekki Phase 1, Lagos',
        totalValue: 350000000,
        status: 'in-progress' as const,
        fundingProgress: 65,
        investors: 12,
        targetInvestment: 200000000,
        securedInvestment: 130000000,
        hasInvestmentCondition: true,
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800']
    },
    {
        id: '2',
        title: 'Ikoyi Luxury Apartments',
        description: 'High-end apartment complex with premium amenities',
        category: 'Luxury',
        location: 'Ikoyi, Lagos',
        totalValue: 500000000,
        status: 'fundraising' as const,
        fundingProgress: 35,
        investors: 8,
        targetInvestment: 300000000,
        securedInvestment: 105000000,
        hasInvestmentCondition: true,
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800']
    },
    {
        id: '3',
        title: 'Victoria Island Business Park',
        description: 'Modern commercial space with co-working facilities',
        category: 'Commercial',
        location: 'Victoria Island, Lagos',
        totalValue: 450000000,
        status: 'planning' as const,
        fundingProgress: 0,
        investors: 0,
        targetInvestment: 250000000,
        securedInvestment: 0,
        hasInvestmentCondition: false,
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800']
    }
];

export default function ProjectsPage() {
    const [filter, setFilter] = useState<'all' | 'planning' | 'fundraising' | 'in-progress' | 'completed'>('all');

    const filteredProjects = filter === 'all'
        ? PROJECTS
        : PROJECTS.filter(p => p.status === filter);

    return (
        <FadeIn>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">My Projects</h1>
                        <p className="text-gray-500 mt-1">Manage all your development projects</p>
                    </div>
                    <Link
                        href="/dashboard/landlord/properties/add"
                        className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                    >
                        <HiOutlinePlusCircle size={20} />
                        Add New Project
                    </Link>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm overflow-x-auto">
                    {(['all', 'planning', 'fundraising', 'in-progress', 'completed'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all uppercase tracking-wider whitespace-nowrap ${filter === status
                                ? 'bg-brand-green text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {status === 'all' ? 'All Projects' : STATUS_CONFIG[status].label}
                        </button>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Total Projects</p>
                        <p className="text-3xl font-black text-gray-900 italic">{PROJECTS.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Active Projects</p>
                        <p className="text-3xl font-black text-brand-green italic">
                            {PROJECTS.filter(p => p.status === 'in-progress').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Total Investors</p>
                        <p className="text-3xl font-black text-gray-900 italic">
                            {PROJECTS.reduce((sum, p) => sum + p.investors, 0)}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Funds Secured</p>
                        <p className="text-3xl font-black text-gray-900 italic">
                            ₦{(PROJECTS.reduce((sum, p) => sum + p.securedInvestment, 0) / 1000000).toFixed(0)}M
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                            <HiOutlineLightBulb className="size-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No Projects Found</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first development project</p>
                        <Link
                            href="/dashboard/landlord/properties/add"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all"
                        >
                            <HiOutlinePlusCircle size={20} />
                            Add Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredProjects.map((project) => {
                            const StatusIcon = STATUS_CONFIG[project.status].icon;

                            return (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                            <span className={`flex items-center gap-1.5 px-3 py-1.5 ${STATUS_CONFIG[project.status].color} rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm`}>
                                                <StatusIcon className="size-3.5" />
                                                {STATUS_CONFIG[project.status].label}
                                            </span>
                                            {project.hasInvestmentCondition && (
                                                <span className="px-3 py-1.5 bg-brand-green/90 text-white rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                                                    Investment Ready
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-bold">
                                                    {project.category}
                                                </span>
                                                <span className="text-xs text-gray-500">{project.location}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Project Value</span>
                                                <span className="font-black text-gray-900 italic">
                                                    ₦{(project.totalValue / 1000000).toFixed(0)}M
                                                </span>
                                            </div>

                                            {project.status !== 'planning' && (
                                                <>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-500">Investment Secured</span>
                                                        <span className="font-black text-brand-green">
                                                            ₦{(project.securedInvestment / 1000000).toFixed(0)}M
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="text-gray-500 font-bold">Funding Progress</span>
                                                            <span className="font-black text-gray-900">{project.fundingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className="bg-linear-to-r from-brand-green to-green-600 h-2 rounded-full transition-all duration-500"
                                                                style={{ width: `${project.fundingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm pt-2">
                                                        <span className="text-gray-500">Investors</span>
                                                        <span className="font-black text-gray-900">{project.investors}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/marketplace/${project.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-green text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all"
                                            >
                                                <HiOutlineEye className="size-4" />
                                                View
                                            </Link>
                                            <Link
                                                href={`/dashboard/landlord/properties/${project.id}/edit`}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                                            >
                                                <HiOutlinePencilSquare className="size-4" />
                                                Edit
                                            </Link>
                                        </div>

                                        {!project.hasInvestmentCondition && project.status !== 'planning' && (
                                            <Link
                                                href="/dashboard/developer/investments"
                                                className="block mt-3 text-center px-4 py-2.5 bg-orange-50 text-orange-700 rounded-xl font-bold text-sm hover:bg-orange-100 transition-all"
                                            >
                                                Set Investment Conditions
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </FadeIn>
    );
}
