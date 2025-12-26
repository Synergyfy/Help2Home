'use client';

import { JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSchemaByRole, fullSchema } from '@/lib/validation/onboardingSchema';
import { useOnboardingStore } from '@/store/onboardingStore';
import FadeIn from '@/components/FadeIn';
import OnboardingStep from './OnboardingStep';
import InfoIcon from '@/components/lib/InfoIcon';
import { z } from 'zod';
import { useCountries, useStates, useCities } from '@/hooks/useCountries';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Props {
    role: string;
    onComplete: (data: any) => void;
}

export default function OnboardingForm({ role, onComplete }: Props) {
    const { formData, setFormData, currentStep, setStep, reset } = useOnboardingStore();
    type FormData = z.infer<typeof fullSchema>;

    const schema = getSchemaByRole(role);

    const { register, handleSubmit, getValues, trigger, formState: { errors }, watch, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: formData,
        mode: 'onBlur',
        shouldUnregister: false,
    });

    const selectedCountry = watch('country');
    const selectedState = watch('state');

    const { countries } = useCountries();
    const { states } = useStates(selectedCountry || null);
    const { cities } = useCities(selectedCountry || null, selectedState || null);

    const router = useRouter();

    // Base Steps
    const baseSteps = [
        {
            title: 'Basic Info',
            fields: (
                <FadeIn>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input {...register('firstName')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input {...register('lastName')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input {...register('phone')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <Controller
                                    control={control}
                                    name="country"
                                    render={({ field }) => (
                                        <select {...field} className="w-full px-4 py-3 border rounded-lg">
                                            <option value="">Select Country</option>
                                            {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                        </select>
                                    )}
                                />
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                <Controller
                                    control={control}
                                    name="state"
                                    render={({ field }) => (
                                        <select {...field} className="w-full px-4 py-3 border rounded-lg">
                                            <option value="">Select State</option>
                                            {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                        </select>
                                    )}
                                />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <Controller
                                    control={control}
                                    name="city"
                                    render={({ field }) => (
                                        <select {...field} className="w-full px-4 py-3 border rounded-lg">
                                            <option value="">Select City</option>
                                            {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                        </select>
                                    )}
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                            <textarea {...register('fullAddress')} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                            {errors.fullAddress && <p className="text-red-500 text-xs mt-1">{errors.fullAddress.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                            <input {...register('postalCode')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                        </div>
                    </div>
                </FadeIn>
            ),
            fieldsNames: ['firstName', 'lastName', 'phone', 'country', 'state', 'city', 'fullAddress', 'postalCode'] as (keyof FormData)[],
        },
    ];

    // Role-specific steps
    const roleStepsMap: Record<string, { title: string; fields: JSX.Element; fieldsNames?: (keyof FormData)[] }[]> = {
        tenant: [
            {
                title: 'Employment & Responsibilities',
                fields: (
                    <FadeIn>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select {...register('gender')} className="w-full px-4 py-3 border rounded-lg">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}

                            <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Employment Status</label>
                            <select {...register('employmentStatus')} className="w-full px-4 py-3 border rounded-lg">
                                <option value="">Select Employment Status</option>
                                <option value="employed">Employed</option>
                                <option value="self-employed">Self-Employed</option>
                                <option value="student">Student</option>
                                <option value="unemployed">Unemployed</option>
                            </select>
                            {errors.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors.employmentStatus.message}</p>}

                            <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Monthly Income</label>
                            <input {...register('monthlyIncome')} className="w-full px-4 py-3 border rounded-lg" placeholder="e.g., 200000" />
                            {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome.message}</p>}

                            <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Main Responsibilities</label>
                            <select {...register('responsibilities')} className="w-full px-4 py-3 border rounded-lg">
                                <option value="">Select Responsibilities</option>
                                <option value="tenant">Tenant</option>
                                <option value="student">Student</option>
                                <option value="worker">Worker</option>
                            </select>
                            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
                        </div>
                    </FadeIn>
                ),
                fieldsNames: ['gender', 'employmentStatus', 'monthlyIncome', 'responsibilities'],
            },
        ],
        landlord: [
            {
                title: 'Portfolio',
                fields: (
                    <FadeIn>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Portfolio Size
                                <InfoIcon tooltip="The total number of properties you own or manage." />
                            </label>
                            <select {...register('portfolioSize', { valueAsNumber: true })} className="w-full px-4 py-3 border rounded-lg">
                                <option value="">Select Portfolio Size</option>
                                <option value={1}>1-5</option>
                                <option value={6}>6-10</option>
                                <option value={11}>11-20</option>
                                <option value={21}>21+</option>
                            </select>
                            {errors.portfolioSize && <p className="text-red-500 text-xs mt-1">{errors.portfolioSize.message}</p>}
                        </div>
                    </FadeIn>
                ),
                fieldsNames: ['portfolioSize'],
            },
        ],
        agent: [
            {
                title: 'Responsibilities',
                fields: (
                    <FadeIn>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Responsibilities
                                <InfoIcon tooltip="Describe your key responsibilities as an agent." />
                            </label>
                            <textarea {...register('responsibilities')} rows={4} className="w-full px-4 py-3 border rounded-lg" placeholder="e.g., Managing tenants, property listings" />
                            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
                        </div>
                    </FadeIn>
                ),
                fieldsNames: ['responsibilities'],
            },
        ],
        caretaker: [
            {
                title: 'Tasks & Experience',
                fields: (
                    <FadeIn>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience / Key Tasks
                                <InfoIcon tooltip="Detail your caretaker experience and typical tasks." />
                            </label>
                            <textarea {...register('responsibilities')} rows={4} className="w-full px-4 py-3 border rounded-lg" placeholder="e.g., Maintenance, tenant support, cleaning" />
                            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
                        </div>
                    </FadeIn>
                ),
                fieldsNames: ['responsibilities'],
            },
        ],
        investor: [
            {
                title: 'Investment Details',
                fields: (
                    <FadeIn>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Investment Budget
                                <InfoIcon tooltip="Specify the amount you are willing to invest in properties." />
                            </label>
                            <input type="number" {...register('investmentBudget', { valueAsNumber: true })} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter your investment budget" />
                            {errors.investmentBudget && <p className="text-red-500 text-xs mt-1">{errors.investmentBudget.message}</p>}
                        </div>
                    </FadeIn>
                ),
                fieldsNames: ['investmentBudget'],
            },
        ],
    };

    const steps = [...baseSteps, ...(roleStepsMap[role] || [])];
    const safeStep = Math.min(currentStep, steps.length - 1);
    const isLastStep = safeStep === steps.length - 1;

    const nextStep = async () => {
        const stepFields = steps[safeStep].fieldsNames || [];
        const valid = await trigger(stepFields);
        if (!valid) return;
        setFormData(getValues() as Partial<FormData>);
        setStep(Math.min(currentStep + 1, steps.length - 1));
    };

  const submitForm = (data: FormData) => {
    setFormData(data);
    onComplete(data);
    reset();
};

    return (
        <div className="w-full h-full overflow-y-auto p-6 md:p-12">
            <form onSubmit={handleSubmit(submitForm)} className="bg-white rounded-2xl shadow-xl p-6 md:p-12 w-full max-w-2xl space-y-6">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">{steps[safeStep].title}</h1>
                </div>

                <OnboardingStep step={steps[safeStep]} />

                <div className="flex justify-between mt-6">
                    {safeStep > 0 && (
                        <button type="button" onClick={() => setStep(Math.max(currentStep - 1, 0))} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                            Previous
                        </button>
                    )}
                    {!isLastStep && (
                        <button type="button" onClick={nextStep} className="ml-auto px-6 py-3 bg-[#00853E] text-white rounded-lg hover:bg-green-700">
                            Next
                        </button>
                    )}
                    {isLastStep && (
                        <button type="submit" className="ml-auto px-6 py-3 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-bold">
                            Complete Onboarding
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
