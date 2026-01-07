'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NearbyProperties from '@/components/NearbyProperties';
import BookingModal from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { mockProperties } from '@/utils/properties';
import { FaShower } from "react-icons/fa";
import { FaHome } from 'react-icons/fa';

export default function PropertyDetailsPage() {
    const params = useParams();

    // Ensure params.id is a string, not an array
    const idString = Array.isArray(params.id) ? params.id[0] : params.id;
    const propertyId = idString ? parseInt(idString, 10) : null;

    const property = mockProperties.find(p => p.id === propertyId);

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700 text-lg">Property not found.</p>
            </div>
        );
    }

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBookingModalOpen(false);
        setIsConfirmationModalOpen(true);
    };


    // Optional chaining for images array
    const images = property.images && property.images.length > 0 ? [property.images[0]] : [];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        <Link href="/marketplace" className="hover:text-gray-900 transition-colors">Marketplace</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
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
                            <div className="relative h-[400px] md:h-[500px] w-full bg-gray-100">
                                <Image
                                    src={images[selectedImage]}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-brand-green' : 'border-transparent hover:border-gray-300'}`}
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
                            <div className="text-gray-900 text-2xl font-semibold mb-4">
                                {property.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </div>
                            <div className="text-gray-600 mb-4">{property.description}</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-2xl"><FaHome className='w-4 h-4 text-green-700' /></span>
                                    <span className="text-sm font-medium text-gray-700">{property.bedrooms} Bedrooms</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-2xl"><FaShower className='w-4 h-4 text-green-700' /></span>
                                    <span className="text-sm font-medium text-gray-700">{property.bathrooms} Bathrooms</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <button
                                    onClick={() => setIsBookingModalOpen(true)}
                                    className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md"
                                >
                                    Book a Viewing
                                </button>

                                {/* Rent Now Button - Only for Rental Property Types */}
                                {(property.propertyType === 'rent' || property.propertyType === 'service-apartment' || property.propertyType === 'rent-to-own') && (
                                    <Link
                                        href={propertyId ? `/dashboard/tenant/apply?propertyId=${propertyId}` : '/signup'}
                                        onClick={(e) => {
                                            // Optional: If you want to handle the "redirect" logic manually for non-Link transitions
                                            // But for Link, we can just ensure they land on Apply which should be protected by middleware or an internal check
                                        }}
                                        className="block w-full text-center border-2 border-brand-green text-brand-green font-bold py-4 rounded-xl hover:bg-green-50 transition-colors mt-3"
                                    >
                                        Rent Now
                                    </Link>
                                )}

                                <Link
                                    href={`/tenant-rent-calculator?amount=${property.price}&propertyId=${property.id}`}
                                    className="block w-full bg-brand-green text-white font-bold py-4 mt-3 text-center rounded-xl hover:bg-green-600 transition-colors shadow-md"
                                >
                                    Calculate Rent
                                </Link>
                            </div>

                            {/* Nearby Properties */}
                            <div className="mt-6">
                                <NearbyProperties currentPropertyId={property.id}
                                    location={property.location} />
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
