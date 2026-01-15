'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    HiOutlineHome,
    HiOutlineMapPin,
    HiOutlineXMark,
    HiOutlinePaperAirplane,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

const MOCK_PROPERTY = {
    id: '4921',
    title: 'The Green Valley Loft',
    address: '4502 Woodland Dr, Austin, TX 78745',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
};

export default function RequestChangesPage() {
    const params = useParams();
    const router = useRouter();
    const [category, setCategory] = useState('');
    const [feedback, setFeedback] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = params.token as string;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to confirmation page
        router.push(`/verify/property/${token}/changes-requested`);
    };

    const handleCancel = () => {
        router.push(`/verify/property/${token}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-[#102210] rounded-t-4xl p-6 flex justify-between items-center border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-brand-green flex items-center justify-center text-[#102210]">
                            <HiOutlineHome size={20} />
                        </div>
                        <h1 className="text-lg font-black text-white">
                            Help2<span className="text-brand-green">Home</span>
                        </h1>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <HiOutlineXMark size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-b-4xl shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Request Changes for Your Property Listing</h2>
                            <p className="text-gray-600">Please provide detailed feedback on what needs to be adjusted. This will be sent to the Help2Home admin team and your caretaker.</p>
                        </div>

                        {/* Property Preview */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 flex gap-4 items-center">
                            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                <img
                                    src={MOCK_PROPERTY.image}
                                    alt={MOCK_PROPERTY.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg">{MOCK_PROPERTY.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                                            <HiOutlineMapPin size={16} />
                                            {MOCK_PROPERTY.address}
                                        </p>
                                    </div>
                                    <span className="hidden sm:inline-flex px-2 py-0.5 bg-orange-100 text-orange-800 border border-orange-200 rounded text-xs font-black uppercase tracking-widest">
                                        #{MOCK_PROPERTY.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-2">
                                    Subject / Area of Change
                                </label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:border-brand-green focus:ring-brand-green"
                                >
                                    <option value="">Select a category</option>
                                    <option value="price">Incorrect Price</option>
                                    <option value="amenities">Missing / Incorrect Amenities</option>
                                    <option value="photos">Outdated or Poor Quality Photos</option>
                                    <option value="description">Description Error</option>
                                    <option value="availability">Availability Dates</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="feedback" className="block text-sm font-bold text-gray-900 mb-2">
                                    Detailed Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    rows={5}
                                    maxLength={1000}
                                    placeholder="Please describe the changes required in detail. For example: 'The rental price should be ₦2,600, not ₦2,500. Also, please add Dishwasher to the amenities list.'"
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-400"
                                />
                                <p className="mt-2 text-xs text-gray-500 text-right">{feedback.length}/1000 characters</p>
                            </div>

                            <div>
                                <label htmlFor="contact" className="block text-sm font-bold text-gray-900 mb-2">
                                    Preferred Contact Method <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <HiOutlineInformationCircle className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        id="contact"
                                        type="text"
                                        value={contactMethod}
                                        onChange={(e) => setContactMethod(e.target.value)}
                                        placeholder="e.g. Email me or Call +234 (555) 123-4567"
                                        className="block w-full rounded-lg border-gray-300 pl-10 focus:border-brand-green focus:ring-brand-green"
                                    />
                                </div>
                                <p className="mt-1.5 text-xs text-gray-500">Provide this if you'd like us to reach out specifically regarding these changes.</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                                <HiOutlineInformationCircle className="text-blue-600 mt-0.5 shrink-0" size={20} />
                                <p className="text-sm text-blue-900">
                                    <span className="font-bold">Note:</span> Submitting this request will pause the publication process. The caretaker will be notified to make updates.
                                </p>
                            </div>

                            <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-bold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-brand-green hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlinePaperAirplane size={20} className="mr-2" />
                                            Send Request
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
