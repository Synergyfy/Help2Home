import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/useProfile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

const SPECIALIZATIONS = [
    "Residential",
    "Commercial",
    "Industrial",
    "Luxury",
    "Short-let",
    "Land/Plots",
    "Property Management",
];

export default function AgentInfoTab({ profile: initialProfile }: { profile: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile('agent');

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
        defaultValues: {
            ...initialProfile,
            // Ensure specialization is handled correctly for the dropdown logic
            specializationType: SPECIALIZATIONS.includes(initialProfile.specialization?.[0] || initialProfile.specialization) 
                ? (initialProfile.specialization?.[0] || initialProfile.specialization)
                : initialProfile.specialization ? "Other" : ""
        }
    });

    const selectedType = useWatch({ control, name: 'specializationType' });

    const onSubmit = (data: any) => {
        // Prepare data for API: use custom specialization if "Other" is picked
        const finalSpecialization = data.specializationType === "Other" 
            ? data.customSpecialization 
            : data.specializationType;
            
        const submissionData = {
            ...data,
            specialization: [finalSpecialization] // Keep as array for schema consistency
        };
        
        updateProfile(submissionData, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleCancel = () => {
        reset(initialProfile);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Professional Details</h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-brand-green text-sm font-medium hover:underline transition-all"
                    >
                        <FiEdit2 /> Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <FiX /> Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isPending}
                            className="flex items-center gap-2 bg-brand-green text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Saving...' : <><FiSave /> Save</>}
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        {...register('firstName')} 
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                        type="text"
                        {...register('licenseNumber')}
                        disabled={!isEditing}
                        placeholder="e.g., REL-123456"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                        type="number"
                        {...register('yearsExperience')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div className={selectedType === "Other" ? "col-span-1" : "col-span-2"}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Specialization</label>
                    <select
                        {...register('specializationType')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 bg-white"
                    >
                        <option value="">Select a specialization...</option>
                        {SPECIALIZATIONS.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                </div>

                {selectedType === "Other" && (
                    <div className="col-span-1 animate-in fade-in slide-in-from-left-2 duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specify Specialization</label>
                        <input
                            type="text"
                            {...register('customSpecialization', { required: selectedType === "Other" })}
                            disabled={!isEditing}
                            placeholder="e.g. Agricultural Land"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>
                )}

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas Served</label>
                    <textarea
                        {...register('areasServed')}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Lekki Phase 1, Victoria Island, Ikoyi..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    />
                </div>
            </form>
        </div>
    );
}
