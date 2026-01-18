'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema, PropertySchema } from '@/lib/validations/propertySchema';
import { toast } from 'react-toastify';
import StepIndicator from './StepIndicator';
import BasicsStep from './BasicsStep';
import LocationStep from './LocationStep';
import FinancialsStep from './FinancialsStep';
import DetailsAmenitiesStep from './DetailsAmenitiesStep';
import MediaStep from './MediaStep';
import ProjectTimelineStep from './ProjectTimelineStep';
import InvestmentTermsStep from './InvestmentTermsStep';
import TermsPreviewStep from './TermsPreviewStep';
import SuccessStep from './SuccessStep';
import { useCreateProperty } from '@/hooks/useLandlordQueries';
import { useNotificationStore } from '@/store/notificationStore';

const ROLE_ACTIONS: Record<string, { submitLabel: string; successMessage: string }> = {
    landlord: {
        submitLabel: 'Publish Property',
        successMessage: 'Property published successfully!'
    },
    agent: {
        submitLabel: 'Publish Listing',
        successMessage: 'Listing published successfully!'
    },
    developer: {
        submitLabel: 'Publish Project',
        successMessage: 'Project published successfully!'
    },
    caretaker: {
        submitLabel: 'Submit for Review',
        successMessage: 'Property submitted for review.'
    }
};

interface PropertyWizardProps {
    roleKey: 'landlord' | 'agent' | 'caretaker' | 'developer';
    availableStepsKeys: string[];
    initialData?: Partial<PropertySchema>;
    isEditing?: boolean;
}

export default function PropertyWizard({
    roleKey,
    availableStepsKeys,
    initialData,
    isEditing = false
}: PropertyWizardProps) {
    const router = useRouter();
    const { addNotification } = useNotificationStore();
    const { mutate: createProperty, isPending } = useCreateProperty();
    const [currentStep, setCurrentStep] = useState(0);

    // Map keys to readable labels and component indices
    const ALL_STEPS_MAP: Record<string, { label: string; component: React.ReactNode }> = {
        'basics': { label: 'Basics', component: <BasicsStep role={roleKey} /> },
        'location': { label: 'Location', component: <LocationStep /> },
        'financials': { label: 'Financials', component: <FinancialsStep role={roleKey} /> },
        'details': { label: 'Details', component: <DetailsAmenitiesStep role={roleKey} /> },
        'media': { label: 'Media', component: <MediaStep role={roleKey} /> },
        'project-timeline': { label: 'Timeline', component: <ProjectTimelineStep /> },
        'investment-terms': { label: 'Investment', component: <InvestmentTermsStep /> },
        'preview': { label: 'Preview', component: <TermsPreviewStep role={roleKey} /> },
        'client-info': { label: 'Client Info', component: <BasicsStep role={roleKey} /> }, // Placeholder depending on requirements
    };


    // Filter valid steps
    const activeSteps = availableStepsKeys
        .filter(key => ALL_STEPS_MAP[key])
        .map(key => ({ key, ...ALL_STEPS_MAP[key] }));

    const stepsForIndicator = [...activeSteps.map(s => s.label), 'Complete'];

    const methods = useForm<PropertySchema>({
        resolver: zodResolver(propertySchema) as Resolver<PropertySchema>,
        defaultValues: initialData || {
            title: '',
            posterRole: roleKey,
            propertyCategory: 'Residential',
            projectTimeline: { status: 'planning', milestones: [] },
            investmentTerms: { enabled: false },
        },
        mode: 'onChange'
    });

    const { trigger, handleSubmit, getValues, formState: { errors } } = methods;

    const handleNext = async () => {
        let isValid = false;
        const currentStepKey = activeSteps[currentStep]?.key;

        const validationFields: Record<string, any[]> = {
            'basics': ['title', 'listingType', 'propertyCategory', 'propertyType'],
            'location': ['address'],
            'financials': ['price', 'installments'],
            'details': ['specs', 'amenities'],
            'media': ['images'],
            'project-timeline': ['projectTimeline'],
            'investment-terms': ['investmentTerms'],
            'preview': [],
        };

        const fieldsToValidate = validationFields[currentStepKey];
        if (fieldsToValidate && fieldsToValidate.length > 0) {
            isValid = await trigger(fieldsToValidate as any);

            if (!isValid) {
                fieldsToValidate.forEach(field => {
                    const error = (errors as any)[field];
                    if (error) {
                        if (error.message) {
                            toast.error(error.message);
                        } else if (typeof error === 'object') {
                            Object.values(error).forEach((nestedError: any) => {
                                if (nestedError.message) toast.error(nestedError.message);
                            });
                        }
                    }
                });

                if (currentStepKey === 'media' && !isValid) {
                    toast.error("Please upload at least one image.");
                }
            }
        } else {
            isValid = true;
        }

        if (isValid) {
            if (currentStep < activeSteps.length - 1) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
            } else {
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

        const submissionData = { ...data };
        if (roleKey === 'caretaker') {
            submissionData.status = 'pending_review' as any;
        }

        createProperty(submissionData, {
            onSuccess: () => {
                toast.success(isEditing ? 'Property updated!' : roleAction.successMessage);

                addNotification({
                    title: 'Priority Broadcast Successful',
                    message: `Your "Early Bird" priority list has been notified about "${data.title}".`,
                    type: 'success'
                });

                setCurrentStep(activeSteps.length);
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
        return <div className="p-8 text-center text-red-500">Error: No configuration found for role {roleKey}</div>;
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
                            {activeSteps[currentStep]?.key === 'preview'
                                ? React.cloneElement(activeSteps[currentStep]?.component as React.ReactElement<any>, { onEditStep: setCurrentStep })
                                : activeSteps[currentStep]?.component
                            }
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
