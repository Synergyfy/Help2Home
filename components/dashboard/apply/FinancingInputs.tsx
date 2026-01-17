import React from 'react';

interface FinancingInputsProps {
    downPaymentPercent: number;
    repaymentDuration: number;
    acceptedTerms: boolean;
    onChange: (field: string, value: any) => void;
}

export default function FinancingInputs({ downPaymentPercent, repaymentDuration, acceptedTerms, onChange }: FinancingInputsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Financing Options</h3>

            <div className="space-y-6">
                {/* Down Payment Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Down Payment Percentage</label>
                        <span className="text-brand-green font-bold">{downPaymentPercent}%</span>
                    </div>
                    <input
                        type="range"
                        min="25"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => onChange('downPaymentPercent', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>25%</span>
                        <span>50%</span>
                    </div>
                </div>

                {/* Repayment Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Duration</label>
                    <select
                        value={repaymentDuration}
                        onChange={(e) => onChange('repaymentDuration', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
                    >
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                    </select>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => onChange('acceptedTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        I accept the <a href="#" className="text-brand-green hover:underline">loan terms</a> and repayment obligations. I understand that failure to repay may result in penalties.
                    </label>
                </div>
            </div>
        </div>
    );
}
