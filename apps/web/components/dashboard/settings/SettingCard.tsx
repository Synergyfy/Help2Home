'use client';

import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';

interface SettingCardProps {
    title: string;
    description: string;
    icon: IconType;
    href: string;
    badge?: string;
    badgeColor?: string;
}

export default function SettingCard({
    title,
    description,
    icon: Icon,
    href,
    badge,
    badgeColor = 'bg-blue-100 text-blue-700'
}: SettingCardProps) {
    return (
        <Link
            href={href}
            className="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                    <Icon size={24} />
                </div>
                {badge && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                        {badge}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 group-hover:text-brand-green transition-colors">
                        {title}
                    </h3>
                    <FiChevronRight className="text-gray-300 group-hover:text-brand-green transform transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
}
