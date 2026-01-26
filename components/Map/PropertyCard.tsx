"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineLocationMarker, HiStar, HiOutlineHome, HiOutlineUserGroup, HiOutlineViewGrid } from "react-icons/hi";

interface PropertyCardProps {
    property: any;
    onClick?: () => void;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/marketplace/${property.id}`} className="block group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="relative w-full aspect-4/3 overflow-hidden">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {property.isNew && (
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                            Newly Built
                        </span>
                    )}
                    {property.featured && (
                        <span className="bg-brand-green text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-brand-green">
                        {property.currency || '₦'}{property.price.toLocaleString()}
                    </h4>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <HiStar className="text-yellow-400 text-sm" />
                        4.9
                    </div>
                </div>

                <p className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                    {property.title}
                </p>

                <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                    <HiOutlineLocationMarker className="text-xs" />
                    {property.location}, {property.city}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1">
                        <HiOutlineHome className="text-base" />
                        {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center gap-1">
                        <HiOutlineUserGroup className="text-base" />
                        {property.bathrooms} Baths
                    </div>
                    {property.floorSize && (
                        <div className="flex items-center gap-1">
                            <HiOutlineViewGrid className="text-base" />
                            {property.floorSize} sqm
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
