import React from 'react';
import Image from 'next/image';

interface PropertyQuickCardProps {
    propertyName: string;
    propertyAddress: string;
    propertyImage: string;
    landlordName: string;
    financials: {
        downPayment: number;
        duration: number;
        monthlyPayment: number;
        totalPayable: number;
    };
}

export default function PropertyQuickCard({ propertyName, propertyAddress, propertyImage, landlordName, financials }: PropertyQuickCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                        src={propertyImage}
                        alt={propertyName}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{propertyName}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{propertyAddress}</p>
                    <p className="text-xs text-gray-400 mt-1">Managed by {landlordName}</p>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Down Payment</span>
                    <span className="font-medium text-gray-900">₦ {financials.downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">{financials.duration} Months</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly</span>
                    <span className="font-medium text-gray-900">₦ {financials.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-[#6D28D9]">₦ {financials.totalPayable.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="text-sm text-[#6D28D9] font-medium hover:underline block mb-2">
                    View Property Details
                </a>
                <a href="/marketplace" className="text-sm text-gray-500 hover:text-gray-900 block">
                    Return to Marketplace
                </a>
            </div>
        </div>
    );
}
