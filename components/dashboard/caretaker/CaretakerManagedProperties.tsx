'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineMapPin, HiOutlineUserGroup, HiOutlineChevronRight } from 'react-icons/hi2';
import { Property } from '@/utils/properties';

interface CaretakerManagedPropertiesProps {
    properties: Property[];
    role: string;
}

export default function CaretakerManagedProperties({ properties, role }: CaretakerManagedPropertiesProps) {
    const displayProperties = properties.slice(0, 3);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <HiOutlineHome size={20} className="text-brand-green" />
                    Managed Properties
                </h2>
                <Link
                    href={`/dashboard/${role}/properties`}
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1"
                >
                    View All <HiOutlineChevronRight />
                </Link>
            </div>

            <div className="divide-y divide-gray-50">
                {displayProperties.length > 0 ? (
                    displayProperties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/dashboard/${role}/properties/${property.id}`}
                            className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="size-16 rounded-xl overflow-hidden relative bg-gray-100 shrink-0">
                                {property.images?.[0] ? (
                                    <img src={property.images[0]} alt="" className="size-full object-cover" />
                                ) : (
                                    <div className="size-full flex items-center justify-center text-gray-400">
                                        <HiOutlineHome size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-brand-green transition-colors">
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1 text-gray-500 text-[10px] mt-1">
                                    <HiOutlineMapPin size={12} className="text-gray-400" />
                                    <span className="truncate">{property.location}, {property.city}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${property.status === 'available' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                    }`}>
                                    {property.status}
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 mt-2">
                                    {property.views || 0} views
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-sm text-gray-500">No properties under your management yet.</p>
                        <Link
                            href={`/dashboard/${role}/properties/add`}
                            className="inline-block mt-4 text-xs font-bold text-brand-green hover:underline"
                        >
                            Add your first property
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
