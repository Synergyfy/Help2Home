'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from './StepIndicator';
import BasicsStep from './BasicsStep';
import FinancialsStep from './FinancialsStep';
import DetailsAmenitiesStep from './DetailsAmenitiesStep';
import MediaStep from './MediaStep';
import TermsPreviewStep from './TermsPreviewStep';
import { useCreateProperty } from '@/hooks/useLandlordQueries';
import { toast } from 'react-toastify';

const STEPS = ['Basics', 'Financials', 'Details', 'Media', 'Preview'];

interface PropertyWizardProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function PropertyWizard({ initialData, isEditing = false }: PropertyWizardProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const { mutate: createProperty, isPending } = useCreateProperty();

    const [formData, setFormData] = useState(initialData || {
        title: '',
        type: '',
        listingType: 'Rent',
        address: { street: '', city: '', state: '' },
        price: { amount: 0, currency: 'NGN', period: 'year' },
        specs: { bedrooms: 0, bathrooms: 0, area: 0, areaUnit: 'sqm', furnishing: '' },
        amenities: [],
        images: [],
        installments: { enabled: false, tenures: [] },
        description: { short: '', long: '' },
        terms: { availableFrom: '', minTenancy: '12' }
    });

    const updateFormData = (updates: any) => {
        setFormData((prev: any) => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            handlePublish();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePublish = async () => {
        //  Validation Check 
        if (!formData.title || !formData.price.amount || formData.images.length === 0) {
            toast.error('Please fill in required fields: Title, Price, and Images');
            return;
        }

        createProperty(formData, {
            onSuccess: () => {
                // Success Toast
                toast.success(isEditing ? 'Property updated successfully!' : 'Property published successfully!');
                router.push('/dashboard/landlord/properties');
            },
            onError: (error: any) => {
                // Error Toast
                toast.error(error?.message || 'Failed to save property. Please try again.');
            }
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <BasicsStep data={formData} updateData={updateFormData} />;
            case 1: return <FinancialsStep data={formData} updateData={updateFormData} />;
            case 2: return <DetailsAmenitiesStep data={formData} updateData={updateFormData} />;
            case 3: return <MediaStep data={formData} updateData={updateFormData} />;
            case 4: return <TermsPreviewStep data={formData} updateData={updateFormData} />;
            default: return null;
        }
    };

    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Edit Property' : 'Add New Property'}
                </h1>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
            </div>

            <div className="min-h-[400px]">
                {renderStep()}
            </div>

            <div className="fixed bottom-0 left-0 md:left-56 right-0 bg-white border-t border-gray-200 p-4 z-10 flex justify-between items-center">
                <button
                    onClick={() => toast.info('Draft saving is not implemented yet')}
                    disabled={isPending}
                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                    Save Draft
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0 || isPending}
                        className={`px-6 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${currentStep === 0 || isPending ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isPending}
                        className="px-6 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm disabled:opacity-50 min-w-[140px]"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Processing...
                            </span>
                        ) : (
                            currentStep === STEPS.length - 1 ? (isEditing ? 'Update Property' : 'Publish Property') : 'Next Step'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}