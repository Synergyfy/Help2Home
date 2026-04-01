import React from 'react';
import { InstallmentPlan } from './types';

interface InstallmentPlanCardProps {
    plan: InstallmentPlan;
}

export default function InstallmentPlanCard({ plan }: InstallmentPlanCardProps) {
    return (
        <div className="bg-[#6D28D9] rounded-xl shadow-lg p-6 text-white mb-6">
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Payment Breakdown</h3>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-white/80">Down Payment ({plan.downPaymentPercent}%)</span>
                    <span className="font-bold text-lg">₦ {plan.downPaymentAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/80">Monthly Repayment</span>
                    <span className="font-bold text-lg">₦ {plan.monthlyRepayment.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Duration</span>
                    <span>{plan.repaymentDuration} Months</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Interest Rate</span>
                    <span>{plan.interestRate}%</span>
                </div>

                <div className="pt-4 border-t border-white/20 mt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Total Payable</span>
                        <span className="font-bold text-xl">₦ {plan.totalPayable.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
