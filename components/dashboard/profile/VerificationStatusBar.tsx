import React from 'react';

interface VerificationStep {
    id: number;
    title: string;
    status: 'Pending' | 'In Review' | 'Verified' | 'Rejected';
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

interface VerificationStatusBarProps {
    currentStep: number;
    steps: VerificationStep[];
}

export default function VerificationStatusBar({ currentStep, steps }: VerificationStatusBarProps) {
    const completedSteps = steps.filter(s => s.status === 'Verified').length;
    const progressPercent = Math.round((completedSteps / steps.length) * 100);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Verification progress</h3>
                <span className="text-sm font-medium text-[#6D28D9] bg-purple-50 px-3 py-1 rounded-full">
                    {progressPercent}% complete
                </span>
            </div>

            <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100 md:hidden"></div>
                <div className="hidden md:block absolute top-4 left-4 right-4 h-0.5 bg-gray-100"></div>

                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-4">
                    {steps.map((step, index) => {
                        const isCompleted = step.status === 'Verified';
                        const isCurrent = index + 1 === currentStep;
                        const isRejected = step.status === 'Rejected';
                        const isInReview = step.status === 'In Review';

                        let statusColor = 'bg-gray-200 text-gray-500';
                        let icon = (
                            <span className="text-xs font-bold">{index + 1}</span>
                        );

                        if (isCompleted) {
                            statusColor = 'bg-green-500 text-white';
                            icon = (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            );
                        } else if (isRejected) {
                            statusColor = 'bg-red-500 text-white';
                            icon = (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            );
                        } else if (isInReview) {
                            statusColor = 'bg-yellow-500 text-white';
                            icon = (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            );
                        } else if (isCurrent) {
                            statusColor = 'bg-[#6D28D9] text-white ring-4 ring-purple-100';
                        }

                        return (
                            <div key={step.id} className="flex md:flex-col items-start md:items-center md:text-center gap-4 md:gap-2 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${statusColor}`}>
                                    {icon}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {step.title}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                                    )}
                                    {step.actionLabel && (
                                        <button
                                            onClick={step.onAction}
                                            className="mt-2 text-xs font-medium text-[#6D28D9] hover:text-purple-700 underline"
                                        >
                                            {step.actionLabel}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
