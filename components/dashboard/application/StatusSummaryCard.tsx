import React from 'react';

interface StatusSummaryCardProps {
    status: string;
    progressPercent: number;
    lastUpdated: string;
    onUploadClick: () => void;
    onContactSupport: () => void;
}

export default function StatusSummaryCard({ status, progressPercent, lastUpdated, onUploadClick, onContactSupport }: StatusSummaryCardProps) {
    return (
        <div className="bg-[#6D28D9] rounded-xl shadow-lg p-6 text-white mb-6 sticky top-8">
            <div className="mb-6">
                <p className="text-white/80 text-sm uppercase tracking-wider font-medium mb-1">Current Status</p>
                <h2 className="text-3xl font-bold">{status}</h2>
                <p className="text-white/60 text-xs mt-2">Last updated: {lastUpdated}</p>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={onUploadClick}
                    className="w-full py-3 bg-white text-[#6D28D9] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Upload Document
                </button>
                <button
                    onClick={onContactSupport}
                    className="w-full py-3 bg-[#5b21b6] text-white font-medium rounded-lg hover:bg-[#4c1d95] transition-colors border border-white/10"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
}
