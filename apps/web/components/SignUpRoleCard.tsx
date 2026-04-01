import React from 'react';
import Link from 'next/link';

interface SignUpRoleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    colorClass: string;
}

export default function SignUpRoleCard({ title, description, icon, href, colorClass }: SignUpRoleCardProps) {
    return (
        <Link
            href={href}
            className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
        >
            <div className={`absolute top-0 left-0 w-full h-1 ${colorClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>

            <div className={`w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${colorClass.replace('bg-', 'text-')}`}>
                {icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900">
                {title}
            </h3>

            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                {description}
            </p>

            <span className={`mt-auto font-semibold text-sm ${colorClass.replace('bg-', 'text-')} flex items-center gap-2`}>
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </span>
        </Link>
    );
}
