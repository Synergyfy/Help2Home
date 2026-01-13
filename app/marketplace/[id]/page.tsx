'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import NearbyProperties from '@/components/NearbyProperties';
import BookingModal from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ChatDrawer from '@/components/marketplace/ChatDrawer';
import ListerProfileModal from '@/components/marketplace/ListerProfileModal';
import { mockProperties } from '@/utils/properties';
import { FaShower } from "react-icons/fa";
import { FaHome } from 'react-icons/fa';
import { formatNumber } from '@/utils/helpers';
import {
    HiOutlineBanknotes,
    HiOutlineCalculator,
    HiOutlineShieldCheck,
    HiOutlineReceiptPercent,
    HiOutlineCreditCard,
    HiOutlineCube
} from 'react-icons/hi2';
import {
    MdOutlineRealEstateAgent,
    MdOutlineAssignmentInd,
    MdOutlineVilla
} from 'react-icons/md';

export default function PropertyDetailsPage() {
    const params = useParams();

    // Ensure params.id is a string, not an array
    const idString = Array.isArray(params.id) ? params.id[0] : params.id;
    const propertyId = idString ? parseInt(idString, 10) : null;

    const property = mockProperties.find(p => p.id === propertyId);

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
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

    const handleChatClick = () => {
        setIsChatOpen(true);
    };

    const handleViewProfile = () => {
        setIsProfileModalOpen(true);
    };


    // Optional chaining for images array
    const images = property.images && property.images.length > 0 ? property.images : [];

    // Financial Calculations
    const propertyPrice = property.price || 0;
    const serviceCharge = property.serviceCharge || 0;

    // Process Amenities (handle both string and object formats)
    const processedAmenities = (property.amenities || []).map(amenity => {
        if (typeof amenity === 'string') return { name: amenity, price: 0 };
        return amenity;
    });

    const amenitiesTotal = processedAmenities.reduce((acc, curr) => acc + (curr.price || 0), 0);

    // Deposit calculation (if installments are enabled)
    const isInstallmentsEnabled = property.isInstallmentAllowed;
    const depositPercent = property.installmentConfig?.depositPercent || 0;
    const upfrontDeposit = propertyPrice * (depositPercent / 100);

    const totalInitialOutlay = propertyPrice + serviceCharge + amenitiesTotal;


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        <Link href="/marketplace" className="hover:text-brand-green transition-colors">Marketplace</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{property.title}</span>
                    </div>
                    <Link href="/marketplace" className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-green hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back to Listings
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery & Carousel */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-6 group/gallery">
                            <div className="relative h-[400px] md:h-[500px] w-full bg-gray-100 overflow-hidden">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative size-full"
                                >
                                    <Image
                                        src={images[selectedImage]}
                                        alt={property.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>

                                {/* Carousel Controls */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white hover:text-brand-green transition-all shadow-lg opacity-0 group-hover/gallery:opacity-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white hover:text-brand-green transition-all shadow-lg opacity-0 group-hover/gallery:opacity-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Image Counter Badge */}
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50/50">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative h-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-brand-green shadow-md scale-[0.98]' : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'}`}
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
                                {property.floorSize && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <span className="text-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">{property.floorSize} sqft</span>
                                    </div>
                                )}
                            </div>

                            {/* Warning Banner */}
                            <div className="mb-8 p-4 bg-green-50 border border-brand-green/20 rounded-2xl flex items-start gap-3">
                                <HiOutlineBanknotes className="text-brand-green shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-brand-green mt-[-2px]">Notice: Amenities Pricing</p>
                                    <p className="text-xs text-brand-green/80">Every amenity is an itemized extra and contributes to the total upfront payment summary in the sidebar.</p>
                                </div>
                            </div>

                            {/* Key Features / Amenities */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features & Amenities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {processedAmenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                                                <span className="text-sm font-medium">{amenity.name}</span>
                                            </div>
                                            {amenity.price > 0 && (
                                                <span className="text-[10px] font-black text-brand-green bg-green-50 px-2 py-1 rounded-lg">
                                                    +₦{formatNumber(amenity.price)}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {property.pool && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">Swimming Pool</span></div>}
                                    {property.gym && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">Fitness Center / Gym</span></div>}
                                    {property.garden && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">Private Garden</span></div>}
                                    {property.parking && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">Ample Parking</span></div>}
                                    {property.serviced && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">Fully Serviced</span></div>}
                                    {property.security && <div className="flex items-center gap-2 text-gray-700 p-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div><span className="text-sm font-medium">24/7 Security</span></div>}
                                </div>
                            </div>

                            {/* Property Details Grid */}
                            <div className="mb-10">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Facts</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Status</p>
                                        <p className="font-medium text-gray-900 capitalize">{property.status || 'Available'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Ownership</p>
                                        <p className="font-medium text-gray-900 capitalize">{property.ownership}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Added</p>
                                        <p className="font-medium text-gray-900">{property.listingAge === '24h' ? 'Last 24 hours' : property.listingAge}</p>
                                    </div>
                                    {property.furnished !== undefined && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Furnishing</p>
                                            <p className="font-medium text-gray-900">{property.furnished ? 'Furnished' : 'Unfurnished'}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Category</p>
                                        <p className="font-medium text-gray-900 capitalize">{property.category.replace(/-/g, ' ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Listing ID</p>
                                        <p className="font-medium text-gray-900">#H2H-{property.id.toString().padStart(4, '0')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Video Tour Section */}
                            {property.videoUrl && (
                                <div className="mb-10">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Property Video Tour
                                    </h2>
                                    <div className="aspect-video rounded-3xl overflow-hidden bg-black shadow-lg border-4 border-white">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={property.videoUrl}
                                            title="Property Video Tour"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Property Plan Section */}
                            {(property.floorPlanUrl || property.propertyType === 'buy') && (
                                <div className="mb-10">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <HiOutlineCube className="text-brand-green" size={24} />
                                        Property Floor Plan
                                    </h2>
                                    {property.floorPlanUrl ? (
                                        <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 group/plan cursor-zoom-in">
                                            <Image
                                                src={property.floorPlanUrl}
                                                alt="Property Floor Plan"
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                        </div>
                                    ) : (
                                        <div className="p-8 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                            <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                                                <HiOutlineCube size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Floor Plan Not Yet Uploaded</p>
                                            <p className="text-xs text-gray-400 max-w-[280px]">We encourage landlords and agents to upload architectural plans for transparent viewing.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Safety & Trust Section */}
                            <div className="space-y-4">
                                {/* Lister Identity Card */}
                                <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-6 group hover:border-brand-green/30 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative size-16 rounded-2xl bg-gray-50 border-2 border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                                                {property.listerImage ? (
                                                    <img src={property.listerImage} alt={property.listerName} className="size-full object-cover" />
                                                ) : (
                                                    <div className="size-full flex items-center justify-center text-brand-green bg-brand-green/5">
                                                        <MdOutlineVilla size={32} />
                                                    </div>
                                                )}
                                                {property.listerVerified && (
                                                    <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-white flex items-center justify-center shadow-md">
                                                        <HiOutlineShieldCheck className="text-brand-green" size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h4 className="font-bold text-lg text-gray-900 leading-tight">
                                                        {property.listerName || (property.posterRole === 'agent' ? property.agency : 'Verified User')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs font-medium text-brand-green bg-brand-green/5 px-2 py-0.5 rounded-full inline-block capitalize">
                                                    {property.posterRole}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleViewProfile}
                                            className="text-sm font-bold text-gray-400 hover:text-brand-green transition-colors"
                                        >
                                            View Profile
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="p-3 bg-gray-50 rounded-2xl">
                                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Trust Score</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-green w-[92%] rounded-full shadow-[0_0_8px_rgba(0,133,62,0.4)]" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">92%</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl text-center">
                                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Verified Since</p>
                                            <p className="text-xs font-bold text-gray-700">Jan 2023</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleChatClick}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-green text-white rounded-2xl font-bold text-sm hover:bg-brand-green-dark transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Start Secure Chat
                                    </button>
                                </div>

                                {/* Safety Warning Card */}
                                <div className="p-6 bg-[#FFF9F3] border border-[#FFE7CC] rounded-2xl flex items-start gap-4">
                                    <div className="size-10 rounded-xl bg-[#FFE7CC] flex items-center justify-center text-[#FF8800] shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#995500] mb-1">Safety First: Deal on Help2Home</h4>
                                        <p className="text-xs text-[#995500]/80 leading-relaxed">
                                            To protect your payment and ensure a secure transaction, never pay outside the platform.
                                            We recommend using Help2Home's integrated payment and agreement system for all property dealings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                                <div className="text-gray-900 text-3xl font-black mb-6">
                                    ₦{formatNumber(property.price)}
                                    {property.propertyType !== 'buy' && <span className="text-sm font-medium text-gray-400 ml-1">/ year</span>}
                                </div>

                                <div className="space-y-3 mb-8">
                                    <button
                                        onClick={() => setIsBookingModalOpen(true)}
                                        className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-brand-green/20"
                                    >
                                        Book a Viewing
                                    </button>

                                    {/* Apply for Rent Button */}
                                    {(property.propertyType === 'rent' || property.propertyType === 'service-apartment' || property.propertyType === 'rent-to-own') && (
                                        <Link
                                            href={propertyId ? `/dashboard/tenant/apply?propertyId=${propertyId}` : '/signup'}
                                            className="block w-full text-center bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-brand-green/20"
                                        >
                                            Apply for Rent
                                        </Link>
                                    )}

                                    <Link
                                        href={`/tenant-rent-calculator?amount=${property.price}&propertyId=${property.id}`}
                                        className="block w-full bg-brand-green text-white font-bold py-4 text-center rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-brand-green/20"
                                    >
                                        Financial Calculator
                                    </Link>
                                </div>

                                {/* Detailed Cost Summary Restoration */}
                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <HiOutlineCalculator className="text-brand-green" />
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pricing & Fees Breakdown</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Base {property.propertyType === 'rent' ? 'Rent' : 'Price'}</span>
                                            <span className="font-bold">₦{formatNumber(propertyPrice)}</span>
                                        </div>

                                        {processedAmenities.length > 0 && processedAmenities.map((amn, i) => (
                                            amn.price > 0 && (
                                                <div key={i} className="flex justify-between text-sm text-gray-500 italic">
                                                    <span>+ {amn.name}</span>
                                                    <span>₦{formatNumber(amn.price)}</span>
                                                </div>
                                            )
                                        ))}

                                        {serviceCharge > 0 && (
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Total Service Charge</span>
                                                <span className="font-bold">₦{formatNumber(serviceCharge)}</span>
                                            </div>
                                        )}

                                        <div className="bg-green-50/50 p-4 rounded-xl border border-brand-green/10 mt-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-wider">Total Upfront Outlay</p>
                                                    <p className="text-xs text-gray-500">Includes all itemized extras</p>
                                                </div>
                                                <p className="text-xl font-black text-brand-green">
                                                    ₦{formatNumber(totalInitialOutlay)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

            {/* Chat Drawer */}
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                propertyTitle={property.title}
                listerName={property.listerName || (property.posterRole === 'agent' ? (property.agency || 'Professional Agent') : 'Verified User')}
                listerImage={property.listerImage}
                listerRole={property.posterRole}
                listerVerified={property.listerVerified}
            />

            {/* Lister Profile Modal */}
            <ListerProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                listerName={property.listerName || (property.posterRole === 'agent' ? (property.agency || 'Professional Agent') : 'Verified User')}
                listerImage={property.listerImage}
                listerRole={property.posterRole}
                listerVerified={property.listerVerified}
            />
        </div>
    );
}
