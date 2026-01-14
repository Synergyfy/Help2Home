'use client';

import React from 'react';

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between relative">
                {/* Background Line */}
                <div className="absolute left-0 top-5 transform -tranbrand-green-y-1/2 w-full h-[2px] bg-gray-200 -z-10"></div>

                {/* Progress Line */}
                <div
                    className="absolute left-0 top-5 transform -tranbrand-green-y-1/2 h-[2px] bg-brand-green -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={step} className="flex flex-col items-center relative min-w-[100px]">
                            {/* Step Circle */}
                            <div className="z-10">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border
                    ${isCompleted
                                            ? 'bg-brand-green border-brand-green text-white'
                                            : isCurrent
                                                ? 'bg-white border-brand-green border-2 ring-4 ring-brand-green/10 text-brand-green shadow-sm'
                                                : 'bg-gray-50 border-gray-200 text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="mt-4 flex flex-col items-center">
                                <span className={`text-sm font-bold ${isCurrent ? 'text-brand-green' : isCompleted ? 'text-gray-700' : 'text-gray-500'}`}>
                                    {step}
                                </span>

                                {/* Status Text */}
                                {isCompleted && (
                                    <span className="text-[10px] font-black text-brand-green tracking-wider uppercase">
                                        COMPLETED
                                    </span>
                                )}
                                {isCurrent && (
                                    <span className="text-[10px] font-black text-brand-green tracking-wider uppercase">
                                        IN PROGRESS
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
