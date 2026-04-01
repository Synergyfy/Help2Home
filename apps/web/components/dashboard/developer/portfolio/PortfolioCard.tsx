'use client';

import React from 'react';
import Image from 'next/image';
import { MdEdit, MdDelete, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import { PortfolioItem } from '@/store/userStore';

interface PortfolioCardProps {
    item: PortfolioItem;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const PortfolioCard = ({ item, onEdit, onDelete }: PortfolioCardProps) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-48 w-full bg-gray-200">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                        No Image
                    </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit?.(item.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white text-gray-700 hover:text-brand-green shadow-sm transition-colors"
                    >
                        <MdEdit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete?.(item.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white text-gray-700 hover:text-red-500 shadow-sm transition-colors"
                    >
                        <MdDelete size={16} />
                    </button>
                </div>
                <div className="absolute bottom-3 right-3">
                    <span className={`
                        px-3 py-1 rounded-full text-xs font-bold shadow-sm
                        ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                            item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'}
                    `}>
                        {item.status === 'in-progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>

                <div className="border-t border-gray-50 pt-4 flex items-center justify-between text-xs text-gray-400 font-medium">
                    {/* Placeholder data since PortfolioItem is simple for now */}
                    <span className="flex items-center gap-1">
                        <MdLocationOn size={14} /> Lagos, NG
                    </span>
                    <span className="flex items-center gap-1">
                        <MdCalendarToday size={14} /> 2024
                    </span>
                </div>
            </div>
        </div>
    );
};
