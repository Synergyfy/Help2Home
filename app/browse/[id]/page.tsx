'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NearbyProperties from '@/components/NearbyProperties';
import BookingModal from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useUserStore } from '@/store/userStore';

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const { id: userId, activeRole } = useUserStore();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock data
    const property = {
        id: params.id,
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        price: '₦2,300,000',
        monthlyPrice: '₦250,000',
        renewalPrice: '₦2,300,000',
        bedrooms: 3,
        bathrooms: 4,
        images: [
            '/assets/marketplace assets/home1.png',
            '/assets/marketplace assets/Home2.png',
            '/assets/marketplace assets/Home3.png',
            '/assets/marketplace assets/Home4.png',
        ],
        description: `Current rent is at a slashed discounted price for the first year, new rent is at ₦2,300,000 at renewal.

This spacious three-bedroom apartment in Eleganza Estate, Opposite VGC is a befitting home for a family or group of friends/colleagues.

It is fully serviced with all rooms ensuite and a host of other amenities.
It is two minutes away from VGC bustop for those looking to stay on the island. With Chicken Republic just around the corner, you are a few steps away from a filled stomach anytime.

The Lekki Conservation Centre, Movie Cinemas, a Gym, and a host of other neighboring estates are spots you get access to easily.`,
        features: [
            { icon: '🏠', label: '3 Bedrooms' },
            { icon: '🚿', label: '4 Bathrooms' },
            { icon: '📏', label: '1,200 sqft' },
            { icon: '🚗', label: 'Parking' },
            { icon: '⚡', label: '24/7 Power' },
            { icon: '🔒', label: 'Security' },
        ],
        additionalInfo: {
            agencyFees: '₦230,000',
            legalFees: '₦230,000',
            cautionFee: '₦230,000 (Refundable Deposit)',
            serviceCharge: '₦500,000 per annum (exclusive of PHCN and diesel costs)',
        },
        serviceChargeBreakdown: [
            'Security',
            'Waste disposal',
            'Gardening',
            'Common area generator maintenance',
            'Common area plumbing',
            'Lighting and electricals',
            'Common area cleaning',
            'Water treatment',
            'Power: Pay-as-you-use',
            'Power base fee: ₦50,000 monthly',
        ]
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBookingModalOpen(false);
        setIsConfirmationModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        <Link href="/browse" className="hover:text-gray-900 transition-colors">Marketplace</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{property.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-6">
                            {/* Main Image */}
                            <div className="relative h-[400px] md:h-[500px] w-full bg-gray-100">
                                <Image
                                    src={property.images[selectedImage]}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50">
                                {property.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-brand-green' : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`View ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Features */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {property.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Agency Fees</span>
                                    <span className="font-semibold text-gray-900">{property.additionalInfo.agencyFees}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Legal Fees</span>
                                    <span className="font-semibold text-gray-900">{property.additionalInfo.legalFees}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Caution Fee</span>
                                    <span className="font-semibold text-gray-900">{property.additionalInfo.cautionFee}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-gray-600">Service Charge</span>
                                    <span className="font-semibold text-gray-900">{property.additionalInfo.serviceCharge}</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Charge Breakdown */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Service Charge Breakdown</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {property.serviceChargeBreakdown.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-5 h-5 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar - Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{property.price}</div>
                                    <div className="text-sm text-gray-500">or {property.monthlyPrice}/month</div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={() => setIsBookingModalOpen(true)}
                                        className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md"
                                    >
                                        Book a Viewing
                                    </button>
                                    <Link
                                        href={userId ? `/dashboard/tenant/apply?propertyId=${params.id}` : `/signin?redirect=/browse/${params.id}`}
                                        className="block w-full text-center border-2 border-brand-green text-brand-green font-bold py-4 rounded-xl hover:bg-green-50 transition-colors"
                                    >
                                        Apply for Rent
                                    </Link>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Contact Agent</h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Help2Home Agent</div>
                                            <div className="text-sm text-gray-500">Verified Agent</div>
                                        </div>
                                    </div>
                                    <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        Send Message
                                    </button>
                                </div>
                            </div>

                            {/* Nearby Properties */}
                            <div className="mt-6">
                                <NearbyProperties />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSubmit={handleBookingSubmit}
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
            />
        </div>
    );
}
