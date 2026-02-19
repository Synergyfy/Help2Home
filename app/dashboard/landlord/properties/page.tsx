'use client';

import { getMockProperties, Property } from '@/utils/properties';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlinePlus, HiOutlineHome, HiOutlineEye, HiOutlineMapPin } from 'react-icons/hi2';

export default function LandlordPropertiesPage() {
    const properties = getMockProperties();

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">My Properties</h1>
                    <p className="text-gray-500 mt-1">Manage your property portfolio and track performance.</p>
                </div>
                <Link
                    href="/dashboard/landlord/properties/add"
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
                    <div className="text-2xl font-semibold text-gray-900">{properties.length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Properties</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.filter(p => p.status === 'available').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineHome size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.filter(p => p.status === 'let-agreed').length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Occupied</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineEye size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{properties.reduce((acc, p) => acc + (p.views || 0), 0)}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Views</div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <Link
                        key={property.id}
                        href={`/dashboard/landlord/properties/${property.id}`}
                        className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            {property.images?.[0] ? (
                                <Image
                                    src={property.images[0]}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <HiOutlineHome size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 right-4">
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${property.status === 'available'
                                    ? 'bg-green-500 text-white'
                                    : property.status === 'let-agreed'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-500 text-white'
                                    }`}>
                                    {property.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-brand-green transition-colors">
                                {property.title}
                            </h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                                <HiOutlineMapPin size={16} className="text-gray-400" />
                                <span>{property.location}, {property.city}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Rent</p>
                                    <p className="text-lg font-semibold text-gray-900">₦{property.price?.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Views</p>
                                    <p className="text-lg font-semibold text-gray-900">{property.views || 0}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {properties.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                    <HiOutlineHome className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium mb-4">No properties yet.</p>
                    <Link
                        href="/dashboard/landlord/properties/add"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all"
                    >
                        <HiOutlinePlus size={20} />
                        Add Your First Property
                    </Link>
                </div>
            )}
        </div>
    );
}
