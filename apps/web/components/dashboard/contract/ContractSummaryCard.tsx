import React from 'react';
import { ContractData } from './types';

interface ContractSummaryCardProps {
    summary: ContractData['summary'];
}

export default function ContractSummaryCard({ summary }: ContractSummaryCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick summary</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Rent / Purchase Price</span>
                    <span className="font-medium text-gray-900">₦ {summary.rentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Contract Type</span>
                    <span className="font-medium text-gray-900">{summary.contractType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Tenure / Duration</span>
                    <span className="font-medium text-gray-900">{summary.tenure}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Monthly Repayment</span>
                    <span className="font-medium text-gray-900">₦ {summary.monthlyRepayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Down Payment</span>
                    <span className="font-medium text-gray-900">₦ {summary.downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Interest Rate</span>
                    <span className="font-medium text-gray-900">{summary.interestRate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Start Date</span>
                    <span className="font-medium text-gray-900">{summary.startDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Next Payment</span>
                    <span className="font-medium text-[#6D28D9]">{summary.nextPayment}</span>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <h4 className="text-sm font-bold text-yellow-800 mb-2">Important Notes</h4>
                <ul className="list-disc list-inside text-xs text-yellow-700 space-y-1">
                    <li>Missing payments may trigger penalties ({summary.penalty}) and affect your credit score.</li>
                    <li>This signed contract is legally binding. Please read carefully before signing.</li>
                </ul>
            </div>
        </div>
    );
}
