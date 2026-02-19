'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
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


type RoleKey = 'landlord' | 'agent' | 'caretaker' | 'developer';

interface PropertyWizardProps {
  roleKey: RoleKey;
  availableStepsKeys: string[];
  initialData?: Partial<PropertySchema>;
  isEditing?: boolean;
}

/* ================= CONSTANTS ================= */

const ROLE_ACTIONS: Record<
  RoleKey,
  { submitLabel: string; successMessage: string }
> = {
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

/* ================= COMPONENT ================= */

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

  const ALL_STEPS_MAP: Record<
    string,
    { label: string; component: React.ReactElement }
  > = {
    basics: { label: 'Basics', component: <BasicsStep role={roleKey} /> },
    location: { label: 'Location', component: <LocationStep /> },
    financials: { label: 'Financials', component: <FinancialsStep role={roleKey} /> },
    details: { label: 'Details', component: <DetailsAmenitiesStep role={roleKey} /> },
    media: { label: 'Media', component: <MediaStep role={roleKey} /> },
    'project-timeline': { label: 'Timeline', component: <ProjectTimelineStep /> },
    'investment-terms': { label: 'Investment', component: <InvestmentTermsStep /> },
    preview: { label: 'Preview', component: <TermsPreviewStep role={roleKey} /> }
  };

  const activeSteps = availableStepsKeys
    .filter(key => ALL_STEPS_MAP[key])
    .map(key => ({ key, ...ALL_STEPS_MAP[key] }));

  const stepsForIndicator = [...activeSteps.map(s => s.label), 'Complete'];

  const methods = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      posterRole: roleKey,
      propertyCategory: 'Residential',
      listingType: 'Rent',
      propertyType: '',
      status: 'draft',
      address: {
        street: '',
        city: '',
        state: '',
      },
      price: {
        amount: 0,
        currency: 'NGN',
      },
      isMortgageAvailable: false,
      isNewBuild: false,
      isSharedOwnership: false,
      isRetirementHome: false,
      isAuction: false,
      isOffPlan: false,
      isVerified: false,
      specs: {
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        areaUnit: 'sqm',
      },
      amenities: [],
      images: [],
      installments: {
        enabled: false,
        depositType: 'percentage',
        interestRate: 0,
      },
      projectTimeline: {
        status: 'planning',
        milestones: []
      },
      investmentTerms: {
        enabled: false,
        roiFrequency: 'annually',
      },
      landlord: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      caretaker: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      ...initialData
    },
    mode: 'onChange'
  });

  const { trigger, handleSubmit, getValues, formState: { errors } } = methods;

  const handleNext = async () => {
    const currentStepKey = activeSteps[currentStep]?.key;

    const validationFields: Record<string, (keyof PropertySchema)[]> = {
      basics: roleKey === 'caretaker'
        ? ['title', 'listingType', 'propertyCategory', 'propertyType', 'landlord']
        : ['title', 'listingType', 'propertyCategory', 'propertyType'],
      location: ['address'],
      financials: ['price'],
      details: ['specs'],
      media: ['images'],
      'project-timeline': ['projectTimeline'],
      'investment-terms': ['investmentTerms'],
      preview: []
    };

    const fields = validationFields[currentStepKey] || [];
    const isValid = fields.length === 0 || await trigger(fields);

    if (!isValid) {
      toast.error('Please fix the errors before continuing.');
      return;
    }

    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      await handleSubmit(onSubmit as any, (errors) => {
        console.error('Property Submission Errors:', errors);
        const firstError = Object.values(errors)[0];
        const errorMessage = typeof firstError?.message === 'string'
          ? firstError.message
          : 'Please check all required fields and try again.';
        toast.error(errorMessage);
      })();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit: SubmitHandler<PropertySchema> = (data) => {
    // Determine final status based on role
    const finalStatus = roleKey === 'caretaker' ? 'draft' : 'available';

    const submissionData = {
      ...data,
      status: finalStatus
    };

    createProperty(submissionData, {
      onSuccess: () => {
        toast.success(
          isEditing
            ? 'Property updated!'
            : ROLE_ACTIONS[roleKey].successMessage
        );

        addNotification({
          title: 'Priority Broadcast Successful',
          message: `Your priority list has been notified about "${data.title}".`,
          type: 'success'
        });

        setCurrentStep(activeSteps.length);
      },
      onError: (e: any) => toast.error(e?.message || 'Request failed')
    });
  };

  const isSuccessStep = currentStep === activeSteps.length;

  const navigation = {
    onNext: handleNext,
    onBack: handleBack,
    isPending,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === activeSteps.length - 1,
    submitLabel: ROLE_ACTIONS[roleKey].submitLabel
  };

  return (
    <FormProvider {...methods}>
      <div className="pb-20 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Follow the steps to list your property on Help2Home marketplace.</p>
        </div>

        <StepIndicator steps={stepsForIndicator} currentStep={currentStep} />

        <div className="mt-8">
          {isSuccessStep ? (
            <SuccessStep />
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              {activeSteps[currentStep]?.key === 'preview'
                ? React.cloneElement(
                  activeSteps[currentStep].component as React.ReactElement<any>,
                  { onEditStep: setCurrentStep, navigation }
                )
                : React.cloneElement(
                  activeSteps[currentStep].component as React.ReactElement<any>,
                  { navigation }
                )}
            </form>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
