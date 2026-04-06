'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlinePlus, HiOutlineHome } from 'react-icons/hi2';
import { useCaretakerDashboard } from '@/hooks/useCaretakerDashboard';
import CaretakerManagedProperties from '@/components/dashboard/caretaker/CaretakerManagedProperties';

export default function CaretakerPropertiesPage() {
    const { properties, isLoading } = useCaretakerDashboard();

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-xl w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-4xl"></div>)}
                </div>
                <div className="h-96 bg-gray-200 rounded-[2.5rem] mt-8"></div>
            </div>
        );
    }

    const availableCount = properties.filter((p: any) => p.status === 'available').length;
    const occupiedCount = properties.filter((p: any) => p.status === 'let-agreed' || p.status === 'rented').length;
    const totalViews = properties.reduce((acc: number, p: any) => acc + (p.views || 0), 0);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">My Properties</h1>
                    <p className="text-gray-500 mt-1">Manage all properties under your care.</p>
                </div>
                <Link
                    href="/dashboard/caretaker/properties/add"
                    className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                >
                    <HiOutlinePlus size={20} />
                    Add Property
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.length}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total Properties</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{availableCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Available</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{occupiedCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Occupied</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{totalViews}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total Views</div>
                </div>
            </div>

            {/* Properties List */}
            <CaretakerManagedProperties properties={properties} role="caretaker" />
        </div>
    );
}
