'use client';

import React from 'react';

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#00853E] -z-10 transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={step} className="flex flex-col items-center bg-white px-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isCompleted ? 'bg-[#00853E] border-[#00853E] text-white' :
                                        isCurrent ? 'bg-white border-[#00853E] text-[#00853E]' :
                                            'bg-white border-gray-300 text-gray-400'
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-[#00853E]' : 'text-gray-500'}`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
