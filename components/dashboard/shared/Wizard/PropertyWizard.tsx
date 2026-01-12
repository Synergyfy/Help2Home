'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler, Resolver } from 'react-hook-form';
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
import { useUserStore } from '@/store/userStore';
import { STEP_CONFIG, ROLE_ACTIONS } from '@/config/propertyConfig';

import SuccessStep from './SuccessStep';

interface PropertyWizardProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function PropertyWizard({ initialData, isEditing = false }: PropertyWizardProps) {
    const router = useRouter();
    const { activeRole } = useUserStore();
    const [currentStep, setCurrentStep] = useState(0);

    const pathname = usePathname();

    // Derive role from URL to support deep linking and immediate context switching
    // /dashboard/[role]/properties/add
    const pathSegments = pathname?.split('/') || [];
    const urlRole = pathSegments[2]; // dashboard is 1, role is 2

    // Determine available steps based on role, default to landlord if undefined
    const roleKey = (urlRole && ['landlord', 'agent', 'caretaker'].includes(urlRole)
        ? urlRole
        : activeRole || 'landlord') as 'landlord' | 'agent' | 'caretaker';
    const availableStepsKeys = STEP_CONFIG[activeRole as string] || STEP_CONFIG['landlord'];

    // Map keys to readable labels and component indices
    // We keep a mapping of all possible steps to their components/labels
    const ALL_STEPS_MAP: Record<string, { label: string; component: React.ReactNode }> = {
        'basics': { label: 'Basics', component: <BasicsStep /> },
        'location': { label: 'Location', component: <BasicsStep /> }, // Reusing Basics for now
        'financials': { label: 'Financials', component: <FinancialsStep /> },
        'details': { label: 'Details', component: <DetailsAmenitiesStep /> },
        'media': { label: 'Media', component: <MediaStep /> },
        'preview': { label: 'Preview', component: <TermsPreviewStep /> },
        'client-info': { label: 'Client Info', component: <BasicsStep /> }, // Placeholder for Agent
    };

    // Filter valid steps
    const activeSteps = availableStepsKeys
        .filter(key => ALL_STEPS_MAP[key])
        .map(key => ({ key, ...ALL_STEPS_MAP[key] }));

    const stepsForIndicator = [...activeSteps.map(s => s.label), 'Complete'];

    const { mutate: createProperty, isPending } = useCreateProperty();

    const methods = useForm<PropertySchema>({
        resolver: zodResolver(propertySchema) as Resolver<PropertySchema>,
        defaultValues: initialData || {
            title: '',
            posterRole: roleKey as 'landlord' | 'agent' | 'caretaker',
            propertyCategory: 'Residential',
            propertyType: '',
            listingType: 'Rent',
            address: { street: '', city: '', state: '' },
            price: { amount: 0, currency: 'NGN', period: 'year' },
            specs: { bedrooms: 0, bathrooms: 0, area: 0, areaUnit: 'sqm', furnishing: '' },
            amenities: [],
            images: [],
            installments: { enabled: false, tenures: [] },
            description: { short: '', long: '' },
            terms: { availableFrom: '', minTenancy: '12' },
            status: 'draft' as const
        },
        mode: 'onChange'
    });

    const { trigger, handleSubmit, getValues } = methods;

    const handleNext = async () => {
        let isValid = false;
        const currentStepKey = activeSteps[currentStep]?.key;

        // Dynamic validation based on the current step key
        // This mapping needs to cover all keys used in ALL_STEPS_MAP
        const validationFields: Record<string, any[]> = {
            'basics': ['title', 'listingType', 'propertyCategory', 'propertyType', 'address'],
            'financials': ['price', 'installments'],
            'details': ['specs', 'amenities'],
            'media': ['images'],
            'preview': [], // No validation needed for preview usually
        };

        const fieldsToValidate = validationFields[currentStepKey];
        if (fieldsToValidate && fieldsToValidate.length > 0) {
            isValid = await trigger(fieldsToValidate as any);
            if (currentStepKey === 'media' && !isValid) toast.error("Please upload at least one image.");
        } else {
            isValid = true;
        }

        if (isValid) {
            if (currentStep < activeSteps.length - 1) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
            } else {
                // Determine implicit 'submit' action
                // If we are at the last step (Preview mostly), we submit.
                // But wait, the button says "Publish Property" or "Send Request"
                // So we trigger submit.
                await handleSubmit(onSubmit)();
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
        const roleAction = ROLE_ACTIONS[roleKey] || ROLE_ACTIONS['landlord'];

        // If caretaker, maybe we flag it differently in the backend or status
        // For now, we use the same createProperty mutation but maybe change status if needed
        // The prompt asked for "Send Mail" simulation.
        // We can simulate that in the onSuccess or by changing status to 'pending_review'

        const submissionData = { ...data };
        if (roleKey === 'caretaker') {
            submissionData.status = 'pending_review' as any; // Assuming schema allows or we cast
        }

        createProperty(submissionData, {
            onSuccess: () => {
                toast.success(isEditing ? 'Property updated!' : roleAction.successMessage);
                setCurrentStep(activeSteps.length); // Move to Success Step (index = length)
                window.scrollTo(0, 0);
            },
            onError: (error: any) => {
                toast.error(error?.message || 'Failed to process request.');
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
                router.push(`/dashboard/${roleKey}/properties`);
            },
            onError: (error: any) => {
                toast.error(error?.message || 'Failed to save draft.');
            }
        });
    };

    if (activeSteps.length === 0) {
        return <div className="p-8 text-center text-red-500">Error: No configuration found for role {activeRole}</div>;
    }

    const isSuccessStep = currentStep === activeSteps.length;

    return (
        <FormProvider {...methods}>
            <div className="pb-20">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Property' : 'Add New Property'}
                    </h1>
                    <StepIndicator steps={stepsForIndicator} currentStep={currentStep} />
                </div>

                <div className="min-h-[400px]">
                    {isSuccessStep ? (
                        <SuccessStep />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {activeSteps[currentStep]?.component}
                        </form>
                    )}
                </div>

                {!isSuccessStep && (
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
                                className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm disabled:opacity-50 min-w-[140px]"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </span>
                                ) : (
                                    currentStep === activeSteps.length - 1
                                        ? (isEditing ? 'Update Property' : (ROLE_ACTIONS[roleKey]?.submitLabel || 'Publish'))
                                        : 'Next Step'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </FormProvider>
    );
}