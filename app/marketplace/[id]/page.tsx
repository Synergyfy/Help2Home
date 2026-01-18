'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import NearbyProperties from '@/components/NearbyProperties';
import BookingModal from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ChatDrawer from '@/components/marketplace/ChatDrawer';
import ListerProfileModal from '@/components/marketplace/ListerProfileModal';
import InvestmentDetailsModal from '@/components/dashboard/investor/InvestmentDetailsModal';
import { mockProperties } from '@/utils/properties';
import { FaShower, FaHome } from "react-icons/fa";
import { formatNumber } from '@/utils/helpers';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
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

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { activeRole, followedListers, toggleFollowLister } = useUserStore();
    const { addNotification } = useNotificationStore();

    // Ensure params.id is a string, not an array
    const idString = Array.isArray(id) ? id[0] : id;
    const propertyId = idString ? parseInt(idString, 10) : null;

    const property = mockProperties.find(p => p.id === propertyId);

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
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

        addNotification({
            title: 'Viewing Booked',
            message: `Your viewing request for "${property.title}" has been submitted successfully.`,
            type: 'success'
        });
    };

    const handleChatClick = () => {
        setIsChatOpen(true);
    };

    const handleViewProfile = () => {
        setIsProfileModalOpen(true);
    };


    // Optional chaining and normalization for images (handle both string[] and object[])
    const rawImages = property.images && property.images.length > 0 ? property.images : [];
    const images = rawImages.map(img => typeof img === 'string' ? img : (img as any).url);

    // Financial Calculations - handle both number and object formats
    const propertyPrice = typeof property.price === 'number'
        ? property.price
        : (property.price as any)?.amount || 0;
    const serviceCharge = property.serviceCharge || 0;

    // Process Amenities (handle both string and object formats)
    const processedAmenities = (property.amenities || []).map(amenity => {
        if (typeof amenity === 'string') return { name: amenity, price: 0 };
        return amenity;
    });

    const amenitiesTotal = processedAmenities.reduce((acc, curr) => acc + (curr.price || 0), 0);
    const totalInitialOutlay = propertyPrice + serviceCharge + amenitiesTotal;

    // Specific Fee Extractions
    const legalFees = processedAmenities.find(a => a.name.toLowerCase().includes('legal'))?.price || 0;
    const tenancyAgreement = processedAmenities.find(a => a.name.toLowerCase().includes('agreement'))?.price || 0;
    const powerBackup = processedAmenities.find(a => a.name.toLowerCase().includes('power') || a.name.toLowerCase().includes('backup'))?.price || 0;
    const waterSupply = processedAmenities.find(a => a.name.toLowerCase().includes('water'))?.price || 0;
    const securityPatrol = processedAmenities.find(a => a.name.toLowerCase().includes('security'))?.price || 0;
    const wasteDisposal = processedAmenities.find(a => a.name.toLowerCase().includes('waste'))?.price || 0;


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
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery & Carousel */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group/gallery">
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

                        {/* Title & Info */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                            <div className="text-gray-900 text-2xl font-semibold mb-4">
                                {typeof propertyPrice === 'number'
                                    ? propertyPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })
                                    : (propertyPrice as any).amount?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) || 'Price on Request'
                                }
                            </div>
                            <div className="text-gray-600 mb-6">
                                {typeof property.description === 'string'
                                    ? property.description
                                    : (property.description as any)?.long || (property.description as any)?.short || ''
                                }
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-2xl"><FaHome className='w-4 h-4 text-green-700' /></span>
                                    <span className="text-sm font-medium text-gray-700">{(property.bedrooms ?? (property as any).specs?.bedrooms) || 0} Bedrooms</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-2xl"><FaShower className='w-4 h-4 text-green-700' /></span>
                                    <span className="text-sm font-medium text-gray-700">{(property.bathrooms ?? (property as any).specs?.bathrooms) || 0} Bathrooms</span>
                                </div>
                                {(property.floorSize || (property as any).specs?.area) && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <HiOutlineCube className="w-4 h-4 text-green-700" />
                                        <span className="text-sm font-medium text-gray-700">{property.floorSize || (property as any).specs?.area} {(property as any).specs?.areaUnit || 'sqm'}</span>
                                    </div>
                                )}
                            </div>

                            {/* Key Features */}
                            <div className="mb-10">
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

                            {/* Video & Floor Plan */}
                            {property.videoUrl && (
                                <div className="mb-10">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Video Tour</h2>
                                    <div className="aspect-video rounded-3xl overflow-hidden bg-black shadow-lg">
                                        <iframe width="100%" height="100%" src={property.videoUrl} title="Video Tour" frameBorder="0" allowFullScreen></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Property Facts */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Facts</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Status</p>
                                        <p className="font-medium text-gray-900 capitalize">{property.status || 'Available'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Ownership</p>
                                        <p className="font-medium text-gray-900 capitalize">{property.ownership || 'Verified Listing'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Category</p>
                                        <p className="font-medium text-gray-900 capitalize">
                                            {(property.category || (property as any).propertyCategory || 'Uncategorized').replace(/-/g, ' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="text-gray-900 text-3xl font-black mb-6">
                                    ₦{formatNumber(propertyPrice)}
                                    {property.propertyType !== 'buy' && <span className="text-sm font-medium text-gray-400 ml-1">/ year</span>}
                                </div>

                                <div className="space-y-3 mb-8">
                                    <button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                                        Book a Viewing
                                    </button>

                                    {(property.propertyType === 'rent' || property.propertyType === 'service-apartment' || property.propertyType === 'rent-to-own') && (
                                        <Link href={`/dashboard/tenant/apply?propertyId=${property.id}`} className="block w-full text-center bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                                            Apply for Rent
                                        </Link>
                                    )}

                                    {(property as any).investmentTerms?.enabled && (
                                        <button
                                            onClick={() => setIsInvestmentModalOpen(true)}
                                            className="w-full bg-[#111811] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <span className="text-brand-green"><MdOutlineVilla /></span>
                                            Invest Now
                                        </button>
                                    )}

                                    {(() => {
                                        const calcUrl = new URLSearchParams({
                                            amount: propertyPrice.toString(),
                                            serviceCharge: serviceCharge.toString(),
                                            legalFees: legalFees.toString(),
                                            tenancyAgreement: tenancyAgreement.toString(),
                                            powerBackup: powerBackup.toString(),
                                            waterSupply: waterSupply.toString(),
                                            securityPatrol: securityPatrol.toString(),
                                            wasteDisposal: wasteDisposal.toString(),
                                            propertyId: property.id.toString(),
                                            interestRate: (property.interestRate || 0).toString(),
                                            isInstallmentEnabled: (property.installments?.enabled || false).toString()
                                        }).toString();

                                        return (
                                            <Link
                                                href={`/tenant-rent-calculator?${calcUrl}`}
                                                className="block w-full bg-brand-green text-white font-bold py-4 text-center rounded-xl hover:bg-green-600 transition-colors shadow-lg"
                                            >
                                                Financial Calculator
                                            </Link>
                                        );
                                    })()}

                                    {property.communityLink && (
                                        <a
                                            href={property.communityLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-brand-green text-brand-green font-bold py-4 rounded-xl hover:bg-green-50 transition-all shadow-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Join Property Community
                                        </a>
                                    )}
                                </div>

                                {/* Pricing Breakdown */}
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
                                        {processedAmenities.map((amn, i) => amn.price > 0 && (
                                            <div key={i} className="flex justify-between text-sm text-gray-500 italic">
                                                <span>+ {amn.name}</span>
                                                <span>₦{formatNumber(amn.price)}</span>
                                            </div>
                                        ))}
                                        {serviceCharge > 0 && (
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Service Charge</span>
                                                <span className="font-bold">₦{formatNumber(serviceCharge)}</span>
                                            </div>
                                        )}
                                        {/* Added missing charges display */}
                                        {processedAmenities.filter(a => a.price > 0 && !['legal', 'agreement', 'service'].some(s => a.name.toLowerCase().includes(s))).map((amn, i) => (
                                            <div key={i} className="flex justify-between text-sm text-gray-500 italic">
                                                <span>+ {amn.name}</span>
                                                <span className="font-bold">₦{formatNumber(amn.price)}</span>
                                            </div>
                                        ))}
                                        {legalFees > 0 && (
                                            <div className="flex justify-between text-sm text-gray-500 italic">
                                                <span>+ Legal Fees</span>
                                                <span className="font-bold">₦{formatNumber(legalFees)}</span>
                                            </div>
                                        )}
                                        {tenancyAgreement > 0 && (
                                            <div className="flex justify-between text-sm text-gray-500 italic">
                                                <span>+ Tenancy Agreement</span>
                                                <span className="font-bold">₦{formatNumber(tenancyAgreement)}</span>
                                            </div>
                                        )}
                                        <div className="bg-green-50/50 p-4 rounded-xl border border-brand-green/10 mt-4">
                                            <div className="flex justify-between items-center text-brand-green">
                                                <p className="text-[10px] font-bold uppercase tracking-wider">Total Upfront</p>
                                                <p className="text-xl font-black">₦{formatNumber(totalInitialOutlay)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Lister Profile */}
                            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6 group hover:border-brand-green/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative size-12 rounded-xl bg-gray-50 border-2 border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                                            {property.listerImage ? (
                                                <img src={property.listerImage} alt={property.listerName} className="size-full object-cover" />
                                            ) : (
                                                <div className="size-full flex items-center justify-center text-brand-green bg-brand-green/5">
                                                    <MdOutlineVilla size={24} />
                                                </div>
                                            )}
                                            {property.listerVerified && (
                                                <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-white flex items-center justify-center shadow-md">
                                                    <HiOutlineShieldCheck className="text-brand-green" size={14} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900 leading-tight">
                                                {property.listerName || (property.posterRole === 'agent' ? property.agency : 'Verified User')}
                                            </h4>
                                            <p className="text-[10px] font-medium text-brand-green bg-brand-green/5 px-2 py-0.5 rounded-full inline-block capitalize mt-0.5">
                                                {property.posterRole}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={handleViewProfile} className="text-xs font-bold text-gray-400 hover:text-brand-green transition-colors">Profile</button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <div className="p-2.5 bg-gray-50 rounded-xl">
                                        <p className="text-[8px] uppercase tracking-wider text-gray-400 font-black mb-1">Trust Score</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-green w-[92%] rounded-full shadow-[0_0_8px_rgba(0,133,62,0.4)]" />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-700">92%</span>
                                        </div>
                                    </div>
                                    <div className="p-2.5 bg-gray-50 rounded-xl text-center">
                                        <p className="text-[8px] uppercase tracking-wider text-gray-400 font-black mb-1">Verified Since</p>
                                        <p className="text-[10px] font-black text-gray-700">Jan 2023</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            const listerId = property.listerName || 'Verified Lister';
                                            toggleFollowLister(listerId);
                                            const isFollowing = !followedListers.includes(listerId);

                                            addNotification({
                                                title: isFollowing ? 'Priority Access Granted' : 'Connection Removed',
                                                message: isFollowing
                                                    ? `You've joined ${listerId}'s priority list. You'll be the first to know about new listings.`
                                                    : `You have opted out of priority notifications from ${listerId}.`,
                                                type: isFollowing ? 'success' : 'info'
                                            });

                                            if (isFollowing) {
                                                toast.success(`You are now a top user for ${listerId}!`);
                                            }
                                        }}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all border-2 ${followedListers.includes(property.listerName || 'Verified Lister')
                                            ? 'bg-white border-brand-green text-brand-green hover:bg-green-50'
                                            : 'bg-white border-gray-100 text-gray-700 hover:border-brand-green hover:text-brand-green shadow-sm'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        {followedListers.includes(property.listerName || 'Verified Lister') ? 'Connected (Priority)' : 'Connect with Lister'}
                                    </button>

                                    <button onClick={handleChatClick} className="w-full flex items-center justify-center gap-2 py-3 bg-brand-green text-white rounded-xl font-bold text-xs hover:bg-green-700 transition-all shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Secure Chat
                                    </button>
                                </div>
                            </div>

                            {/* Safety Warning */}
                            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-orange-800 mb-0.5">Safety First</h4>
                                    <p className="text-[10px] text-orange-700/80 leading-tight">Never pay outside the platform. Use Help2Home's integrated system for secure dealings.</p>
                                </div>
                            </div>

                            {/* Nearby Properties */}
                            <NearbyProperties currentPropertyId={property.id} location={property.location} />
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSubmit={handleBookingSubmit}
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
            />
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                propertyTitle={property.title}
                listerName={property.listerName || (property.posterRole === 'agent' ? (property.agency || 'Professional Agent') : 'Verified User')}
                listerImage={property.listerImage}
                listerRole={property.posterRole}
                listerVerified={property.listerVerified}
            />
            <ListerProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                listerName={property.listerName || (property.posterRole === 'agent' ? (property.agency || 'Professional Agent') : 'Verified User')}
                listerImage={property.listerImage}
                listerRole={property.posterRole}
                listerVerified={property.listerVerified}
            />
            <InvestmentDetailsModal
                isOpen={isInvestmentModalOpen}
                onClose={() => setIsInvestmentModalOpen(false)}
                property={property}
            />
        </div >
    );
}
