'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    HiOutlineHome,
    HiOutlineMapPin,
    HiOutlineCheckCircle,
    HiOutlinePencilSquare,
    HiOutlineShieldCheck
} from 'react-icons/hi2';

// Mock property data - in production, fetch based on token
const MOCK_PROPERTY = {
    id: '4921',
    title: 'The Green Valley Loft',
    address: '4502 Woodland Dr, Austin, TX 78745',
    rent: 2500,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    amenities: ['Parking', 'WiFi', 'Air Conditioning', 'Furnished'],
    description: 'Beautiful modern loft in the heart of Green Valley with stunning views and premium finishes.',
    submittedBy: 'Sarah Jenkins',
    submittedRole: 'Caretaker'
};

export default function PropertyVerificationPage() {
    const params = useParams();
    const router = useRouter();
    const [isApproving, setIsApproving] = useState(false);
    const token = params.token as string;

    const handleApprove = async () => {
        setIsApproving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Redirect to success page or show confirmation
        router.push(`/verify/property/${token}/approved`);
    };

    const handleRequestChanges = () => {
        router.push(`/verify/property/${token}/request-changes`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-[#102210] rounded-t-4xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-green/20 rounded-full blur-3xl" />
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="size-10 rounded-full bg-brand-green flex items-center justify-center text-[#102210]">
                            <HiOutlineHome size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-white">
                            Help2<span className="text-brand-green">Home</span>
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-b-4xl shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Property Listing Review</h2>
                            <p className="text-gray-600">Please review the details below and confirm they are accurate before publishing.</p>
                        </div>

                        {/* Property Preview */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-8">
                            <div className="relative h-64 bg-gray-200">
                                <img
                                    src={MOCK_PROPERTY.image}
                                    alt={MOCK_PROPERTY.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-black rounded-full uppercase tracking-widest">
                                        Pending Review
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-black text-gray-900 mb-2">{MOCK_PROPERTY.title}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <HiOutlineMapPin size={20} />
                                    <span>{MOCK_PROPERTY.address}</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="text-2xl font-black text-gray-900">₦{MOCK_PROPERTY.rent.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Monthly Rent</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="text-2xl font-black text-gray-900">{MOCK_PROPERTY.bedrooms}</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Bedrooms</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="text-2xl font-black text-gray-900">{MOCK_PROPERTY.bathrooms}</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Bathrooms</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="text-2xl font-black text-gray-900">{MOCK_PROPERTY.sqft}</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Sq Ft</div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">Description</h4>
                                    <p className="text-gray-600 leading-relaxed">{MOCK_PROPERTY.description}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">Amenities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {MOCK_PROPERTY.amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-lg"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submitted By */}
                        <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 flex gap-3 mb-8">
                            <HiOutlineShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={24} />
                            <div className="text-sm text-blue-900">
                                <span className="font-bold block mb-1">Submitted by:</span>
                                {MOCK_PROPERTY.submittedBy} ({MOCK_PROPERTY.submittedRole}) on behalf of your property portfolio.
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4">
                            <button
                                onClick={handleRequestChanges}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                            >
                                <HiOutlinePencilSquare size={20} />
                                Request Changes
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={isApproving}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-brand-green/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isApproving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Approving...
                                    </>
                                ) : (
                                    <>
                                        <HiOutlineCheckCircle size={20} />
                                        Approve & Publish
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
