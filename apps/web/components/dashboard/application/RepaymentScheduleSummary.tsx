import React from 'react';
import { RepaymentSchedule } from './types';

interface RepaymentScheduleSummaryProps {
    schedule?: RepaymentSchedule;
}

export default function RepaymentScheduleSummary({ schedule }: RepaymentScheduleSummaryProps) {
    if (!schedule) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Repayment Schedule</h3>
                <button className="text-sm font-medium text-[#6D28D9] hover:underline">
                    View full schedule
                </button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-center justify-between">
                <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">Next Payment Due</p>
                    <p className="text-2xl font-bold text-blue-900">₦ {schedule.nextAmount.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">Due on {schedule.nextDueDate}</p>
                </div>

                <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${schedule.status === 'Paid' ? 'bg-green-100 text-green-700' :
                            schedule.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                        }`}>
                        {schedule.status}
                    </span>
                    <button className="block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}
