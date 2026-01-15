'use client';

import { getMockProperties } from '@/utils/properties';
import CaretakerManagedProperties from '@/components/dashboard/caretaker/CaretakerManagedProperties';
import Link from 'next/link';
import { HiOutlinePlus, HiOutlineHome } from 'react-icons/hi2';

export default function CaretakerPropertiesPage() {
    const properties = getMockProperties();

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Properties</h1>
                    <p className="text-gray-500 mt-1">Manage all properties under your care.</p>
                </div>
                <Link
                    href="/dashboard/caretaker/properties/add"
                    className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
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
                    <div className="text-2xl font-black text-gray-900">{properties.length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Properties</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{properties.filter(p => p.status === 'available').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{properties.filter(p => p.status === 'let-agreed').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Occupied</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{properties.reduce((acc, p) => acc + (p.views || 0), 0)}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Views</div>
                </div>
            </div>

            {/* Properties List */}
            <CaretakerManagedProperties properties={properties} role="caretaker" />
        </div>
    );
}
