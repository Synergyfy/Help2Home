'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema, PropertySchema } from '@/lib/validations/propertySchema';
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

    const methods = useForm<PropertySchema>({
        resolver: zodResolver(propertySchema),
        defaultValues: initialData || {
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
            terms: { availableFrom: '', minTenancy: '12' },
            status: 'available'
        },
        mode: 'onChange'
    });

    const { trigger, handleSubmit, getValues } = methods;

    const handleNext = async () => {
        let isValid = false;

        // Per-step validation
        if (currentStep === 0) {
            isValid = await trigger(['title', 'type', 'listingType', 'address']);
        } else if (currentStep === 1) {
            isValid = await trigger(['price', 'installments']);
        } else if (currentStep === 2) {
            isValid = await trigger(['specs', 'amenities']);
        } else if (currentStep === 3) {
            isValid = await trigger(['images']);
            if (!isValid) toast.error("Please upload at least one image.");
        } else {
            isValid = true;
        }

        if (isValid) {
            if (currentStep < STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
            } else {
                // Submit only triggered by button if on last step
                onSubmit(getValues());
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const onSubmit: SubmitHandler<PropertySchema> = (data) => {
        createProperty(data, {
            onSuccess: () => {
                toast.success(isEditing ? 'Property updated successfully!' : 'Property published successfully!');
                // router.refresh(); // Removed to avoid reload issues
                router.push('/dashboard/landlord/properties');
            },
            onError: (error: any) => {
                toast.error(error?.message || 'Failed to save property.');
            }
        });
    };

    const handleSaveDraft = () => {
        const data = getValues();
        if (!data.title) {
            toast.error('Title is required to save a draft.');
            return;
        }

        createProperty({ ...data, status: 'draft' }, {
            onSuccess: () => {
                toast.success('Draft saved successfully!');
                router.push('/dashboard/landlord/properties');
            },
            onError: (error: any) => {
                toast.error(error?.message || 'Failed to save draft.');
            }
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <BasicsStep />;
            case 1: return <FinancialsStep />;
            case 2: return <DetailsAmenitiesStep />;
            case 3: return <MediaStep />;
            case 4: return <TermsPreviewStep />;
            default: return null;
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="pb-20">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Property' : 'Add New Property'}
                    </h1>
                    <StepIndicator steps={STEPS} currentStep={currentStep} />
                </div>

                <div className="min-h-[400px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {renderStep()}
                    </form>
                </div>

                <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white border-t border-gray-200 p-4 z-10 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        disabled={isPending}
                        className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 0 || isPending}
                            className={`px-6 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${currentStep === 0 || isPending ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Back
                        </button>
                        <button
                            type="button"
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
        </FormProvider>
    );
}