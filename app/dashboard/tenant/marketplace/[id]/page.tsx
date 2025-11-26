'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NearbyProperties from '@/components/NearbyProperties';
import BookingModal from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    // Mock data based on the design
    const property = {
        title: '3 Bedroom Flat, Lokogoma, Abuja',
        price: '₦2,300,000',
        renewalPrice: '₦2,300,000',
        images: [
            '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja.png',
            '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-1.png',
            '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-2.png',
        ],
        description: `Current rent is at a slashed discounted price for the first year, new rent is at ₦2,300,000 at renewal.
This spacious three-bedroom apartment in Eleganza Estate, Opposite VGC is a befitting home for a family or group of friends/colleagues.

It is fully serviced with all rooms ensuite and a host of other amenities.
It is two minutes away from VGC bustop for those looking to stay on the island. With Chicken Republic just around the corner, you are a few steps away from a filled stomach anytime.

The Lekki Conservation Centre, Movie Cinemas, a Gym, and a host of other neighboring estates are spots you get access to easily.`,
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
        <div className="p-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Hero Image */}
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-4">
                        <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {property.images.map((img, index) => (
                            <div key={index} className="relative h-32 rounded-xl overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`View ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-[#00853E] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#006c32] transition-colors"
                        >
                            Book a Viewing
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <div className="text-gray-600 space-y-4 whitespace-pre-line">
                            {property.description}
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>Agency Fees: {property.additionalInfo.agencyFees}</li>
                            <li>Legal Fees: {property.additionalInfo.legalFees}</li>
                            <li>Caution Fee: {property.additionalInfo.cautionFee}</li>
                            <li>Service Charge: {property.additionalInfo.serviceCharge}</li>
                        </ul>
                    </div>

                    {/* Service Charge Breakdown */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Service Charge Breakdown</h2>
                        <ul className="space-y-2 text-gray-600">
                            {property.serviceChargeBreakdown.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="bg-[#00853E] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#006c32] transition-colors">
                            Rent Now
                        </button>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="border border-[#00853E] text-[#00853E] font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Book a Viewing
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <NearbyProperties />
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
