import React from 'react';
import Image from 'next/image';

interface EmptyStateProps {
    title: string;
    description: string;
    imageSrc?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    imageSrc,
    icon,
    actionLabel = "Okay",
    onAction
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center p-6 animate-fade-in">
            {icon ? (
                <div className="mb-6 p-6 bg-green-50 rounded-full">
                    {icon}
                </div>
            ) : imageSrc ? (
                <div className="mb-8 relative w-64 h-64">
                    <Image
                        src={imageSrc}
                        alt="Empty State"
                        fill
                        className="object-contain"
                    />
                </div>
            ) : null}

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {title}
            </h2>

            <p className="text-gray-500 mb-8 max-w-md text-lg">
                {description}
            </p>

            <button
                onClick={onAction}
                className="px-12 py-3 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
                {actionLabel}
            </button>
        </div>
    );
}
