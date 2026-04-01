'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { MdAdd, MdDelete, MdCalendarToday } from 'react-icons/md';

interface ProjectTimelineStepProps {
    navigation?: {
        onNext: () => void;
        onBack: () => void;
        isPending: boolean;
        isFirstStep: boolean;
        isLastStep: boolean;
        submitLabel: string;
    };
}

export default function ProjectTimelineStep({ navigation }: ProjectTimelineStepProps) {
    const { register, control, formState: { errors } } = useFormContext<PropertySchema>();

    // Milestones field array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "projectTimeline.milestones"
    });

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
                <h3 className="font-bold text-blue-800 text-sm mb-1">Project Timeline & Status</h3>
                <p className="text-blue-600 text-sm">Define the lifecycle of your development project to keep investors informed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Status (Optional)</label>
                    <select
                        {...register("projectTimeline.status")}
                        className={`w-full p-4 rounded-xl border-2 ${errors.projectTimeline?.status ? 'border-red-500 ring-red-500' : 'border-gray-100'} focus:border-brand-green outline-none bg-white font-medium`}
                    >
                        <option value="planning">Planning Phase</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="halted">Halted / On Hold</option>
                    </select>
                    {errors.projectTimeline?.status && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.projectTimeline.status.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Start Date (Optional)</label>
                        <div className="relative">
                            <input
                                type="date"
                                {...register("projectTimeline.startDate")}
                                className={`w-full p-4 pl-10 rounded-xl border-2 ${errors.projectTimeline?.startDate ? 'border-red-500 ring-red-500' : 'border-gray-100'} focus:border-brand-green outline-none font-medium`}
                            />
                            <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        {errors.projectTimeline?.startDate && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.projectTimeline.startDate.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Completion (Est.) (Optional)</label>
                        <div className="relative">
                            <input
                                type="date"
                                {...register("projectTimeline.completionDate")}
                                className={`w-full p-4 pl-10 rounded-xl border-2 ${errors.projectTimeline?.completionDate ? 'border-red-500 ring-red-500' : 'border-gray-100'} focus:border-brand-green outline-none font-medium`}
                            />
                            <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        {errors.projectTimeline?.completionDate && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.projectTimeline.completionDate.message}</p>}
                    </div>
                </div>
            </div>

            {/* Milestones Section */}
            <div>
                <div className="flex items-center justify-between mb-4 mt-6 border-t border-gray-100 pt-6">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Key Milestones</label>
                    <button
                        type="button"
                        onClick={() => append({ title: '', date: '', completed: false })}
                        className="text-sm font-bold text-brand-green hover:text-green-600 flex items-center gap-1"
                    >
                        <MdAdd size={16} /> Add Milestone
                    </button>
                </div>

                <div className="space-y-3">
                    {fields.length === 0 && (
                        <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                            No milestones added. Add key dates like "Foundation Laying", "Roofing", etc.
                        </div>
                    )}

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        {...register(`projectTimeline.milestones.${index}.title` as const)}
                                        placeholder="Milestone Title (e.g. Excavation)"
                                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand-green outline-none"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        {...register(`projectTimeline.milestones.${index}.date` as const)}
                                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand-green outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <MdDelete size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* IN-PAGE NAVIGATION BUTTONS */}
            {navigation && (
                <div className="flex items-center justify-between pt-12 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={navigation.onBack}
                        disabled={navigation.isFirstStep}
                        className={`px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${
                            navigation.isFirstStep 
                            ? 'opacity-0 pointer-events-none' 
                            : 'text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={navigation.onNext}
                        disabled={navigation.isPending}
                        className="px-12 py-4 bg-brand-green text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {navigation.isPending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            navigation.isLastStep ? navigation.submitLabel : 'Continue'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
