'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertySummaryCard from '@/components/dashboard/apply/PropertySummaryCard';
import InstallmentPlanCard from '@/components/dashboard/apply/InstallmentPlanCard';
import FinancingInputs from '@/components/dashboard/apply/FinancingInputs';
import ApplicationTenantInfo from '@/components/dashboard/apply/ApplicationTenantInfo';
import ApplicationDocuments from '@/components/dashboard/apply/ApplicationDocuments';
import VerificationModal from '@/components/dashboard/apply/VerificationModal';
import { PropertyDetails, InstallmentPlan, ApplicationData, ApplicationDocument } from '@/components/dashboard/apply/types';

import { useApplications } from '@/hooks/useApplications';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { Application } from '@/store/applicationStore';
import { mockProperties } from '@/utils/properties';

export default function Apply() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const propertyIdParam = searchParams.get('propertyId');

    const { id: userId, fullName: userName, email: userEmail, phone: userPhone, profile, roleData, verified: isVerified } = useUserStore();
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(!isVerified);
    const tenantProfile = roleData.tenant;
    const { addNotification } = useNotificationStore();
    const { submitApplication, isSubmitting } = useApplications();

    // Find property from mock data
    const selectedProperty = mockProperties.find(p => p.id.toString() === propertyIdParam);

    const property: PropertyDetails = selectedProperty ? {
        id: selectedProperty.id.toString(),
        name: selectedProperty.title,
        location: selectedProperty.location,
        rentPrice: selectedProperty.price,
        paymentOption: (selectedProperty.propertyType === 'rent' || selectedProperty.propertyType === 'service-apartment') ? 'Installment' : 'Outright',
        landlordName: 'Authorized Owner',
        image: (selectedProperty.images && selectedProperty.images.length > 0) ? selectedProperty.images[0] : '/assets/marketplace assets/home1.png'
    } : {
        id: 'manual',
        name: 'Custom Application',
        location: 'TBD',
        rentPrice: 0,
        paymentOption: 'Outright',
        landlordName: 'TBD',
        image: '/assets/marketplace assets/home1.png'
    };

    // --- State ---
    const [applicationData, setApplicationData] = useState<ApplicationData>({
        propertyId: property.id,
        financing: {
            downPaymentPercent: 25,
            repaymentDuration: 12,
            acceptedTerms: false
        },
        tenantInfo: {
            firstName: profile.firstName || userName?.split(' ')[0] || '',
            lastName: profile.lastName || userName?.split(' ')[1] || '',
            email: userEmail || '',
            phone: userPhone || '',
            employmentStatus: tenantProfile?.employmentStatus || 'Employed',
            employerName: tenantProfile?.employerName || '',
            monthlySalary: tenantProfile?.monthlySalary || ''
        },
        guarantor: {
            name: tenantProfile?.guarantor?.name || '',
            phone: tenantProfile?.guarantor?.phone || '',
            relationship: tenantProfile?.guarantor?.relationship || '',
            email: tenantProfile?.guarantor?.email || ''
        },
        notes: '',
        documents: [
            { id: '1', type: 'ID', name: 'Government ID', status: 'Pending' },
            { id: '2', type: 'Income', name: '3 Months Payslips', status: 'Pending' },
            { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Pending' },
            { id: '4', type: 'Address', name: 'Proof of Address', status: 'Pending' }
        ]
    });

    const [installmentPlan, setInstallmentPlan] = useState<InstallmentPlan>({
        downPaymentPercent: 25,
        downPaymentAmount: 0,
        repaymentDuration: 12,
        monthlyRepayment: 0,
        totalPayable: 0,
        interestRate: 15,
        serviceFee: 50000
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    // --- Effects ---
    useEffect(() => {
        // Calculate Installment Plan
        const rent = property.rentPrice;
        const downPayment = (rent * applicationData.financing.downPaymentPercent) / 100;
        const principal = rent - downPayment;
        const interestRate = 0.15; // 15% flat for simplicity
        const interest = principal * interestRate;
        const totalLoan = principal + interest;
        const monthly = totalLoan / applicationData.financing.repaymentDuration;
        const totalPayable = downPayment + totalLoan + 50000; // + Service Fee

        setInstallmentPlan({
            downPaymentPercent: applicationData.financing.downPaymentPercent,
            downPaymentAmount: downPayment,
            repaymentDuration: applicationData.financing.repaymentDuration,
            monthlyRepayment: Math.round(monthly),
            totalPayable: Math.round(totalPayable),
            interestRate: 15,
            serviceFee: 50000
        });
    }, [applicationData.financing.downPaymentPercent, applicationData.financing.repaymentDuration, property.rentPrice]);

    // --- Handlers ---
    const handleFinancingChange = (field: string, value: any) => {
        setApplicationData(prev => ({
            ...prev,
            financing: { ...prev.financing, [field]: value }
        }));
    };

    const handleTenantInfoChange = (section: 'tenantInfo' | 'guarantor' | 'notes', field: string, value: any) => {
        if (section === 'notes') {
            setApplicationData(prev => ({ ...prev, notes: value }));
        } else {
            setApplicationData(prev => ({
                ...prev,
                [section]: { ...prev[section as 'tenantInfo' | 'guarantor'], [field]: value }
            }));
        }
    };

    const handleUploadDocument = (id: string, file: File) => {
        setApplicationData(prev => ({
            ...prev,
            documents: prev.documents.map(doc =>
                doc.id === id ? { ...doc, status: 'Uploaded', file, size: file.size } : doc
            )
        }));
    };

    const handleRemoveDocument = (id: string) => {
        setApplicationData(prev => ({
            ...prev,
            documents: prev.documents.map(doc =>
                doc.id === id ? { ...doc, status: 'Pending', file: undefined, size: undefined } : doc
            )
        }));
    };

    const validate = () => {
        const newErrors: string[] = [];
        if (!applicationData.financing.acceptedTerms) newErrors.push("You must accept the terms and conditions.");

        // Basic Info Validation
        if (!applicationData.tenantInfo.firstName || !applicationData.tenantInfo.lastName) newErrors.push("Basic personal details are missing from your profile.");

        // Work Info Validation
        if (applicationData.tenantInfo.employmentStatus !== 'Unemployed' && !applicationData.tenantInfo.employerName) {
            newErrors.push("Work information is incomplete. Please update your profile.");
        }

        // Next of Kin Validation (from store)
        if (!tenantProfile?.nextOfKin?.name) {
            newErrors.push("Next of Kin details are required. Please update your profile.");
        }

        // Guarantor Validation
        if (!applicationData.guarantor.name || !applicationData.guarantor.phone) {
            newErrors.push("Guarantor details are incomplete.");
        }

        // Credit Score / Eligibility Check
        const isEligible = (profile.firstName && profile.lastName && userPhone && tenantProfile?.isBvnVerified);
        if (!isEligible) {
            newErrors.push("Your profile must be fully verified (including BVN) to apply for financing.");
        }

        const pendingDocs = applicationData.documents.filter(d => d.status !== 'Uploaded');
        if (pendingDocs.length > 0) newErrors.push(`Please upload all required documents: ${pendingDocs.map(d => d.name).join(', ')}`);

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            const newApp: Application = {
                id: `A-${Math.floor(Math.random() * 900000) + 100000}`,
                propertyId: property.id,
                propertyTitle: property.name,
                propertyAddress: property.location,
                propertyImage: property.image,
                landlordId: selectedProperty?.createdBy || 'landlord_1',
                tenantId: userId || 'unknown',
                tenantName: `${applicationData.tenantInfo.firstName} ${applicationData.tenantInfo.lastName}`,
                tenantEmail: applicationData.tenantInfo.email,
                tenantPhone: applicationData.tenantInfo.phone,
                status: 'Pending',
                submittedAt: new Date().toISOString(),
                progress: 25,
                financing: {
                    downPaymentPercent: applicationData.financing.downPaymentPercent,
                    repaymentDuration: applicationData.financing.repaymentDuration
                },
                details: {
                    employmentStatus: applicationData.tenantInfo.employmentStatus,
                    employerName: applicationData.tenantInfo.employerName,
                    monthlySalary: applicationData.tenantInfo.monthlySalary
                }
            };

            submitApplication(newApp, {
                onSuccess: () => {
                    setShowSuccess(true);
                    addNotification({
                        title: 'Application Submitted',
                        message: `Your application for "${property.name}" has been sent for review.`,
                        type: 'success'
                    });
                }
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSaveDraft = () => {
        const newApp: Application = {
            id: `A-${Math.floor(Math.random() * 900000) + 100000}`,
            propertyId: property.id,
            propertyTitle: property.name,
            propertyAddress: property.location,
            propertyImage: property.image,
            landlordId: selectedProperty?.createdBy || 'landlord_1',
            tenantId: userId || 'unknown',
            tenantName: `${applicationData.tenantInfo.firstName} ${applicationData.tenantInfo.lastName}`,
            tenantEmail: applicationData.tenantInfo.email,
            tenantPhone: applicationData.tenantInfo.phone,
            status: 'Draft',
            submittedAt: '',
            progress: 10,
            financing: {
                downPaymentPercent: applicationData.financing.downPaymentPercent,
                repaymentDuration: applicationData.financing.repaymentDuration
            },
            details: {
                employmentStatus: applicationData.tenantInfo.employmentStatus,
                employerName: applicationData.tenantInfo.employerName,
                monthlySalary: applicationData.tenantInfo.monthlySalary
            }
        };
        submitApplication(newApp, {
            onSuccess: () => {
                addNotification({
                    title: 'Draft Saved',
                    message: `Application for "${property.name}" has been saved to your drafts.`,
                    type: 'info'
                });
                router.push('/dashboard/tenant/applications');
            }
        });
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Our team will now review your documents. You can track progress on the Application Status page.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/tenant')}
                        className="w-full py-3 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <nav className="text-sm text-gray-500 mb-2">
                        Home / <span className="text-gray-900 font-medium">Apply for Rent</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">Rent Financing Application</h1>
                        {!isVerified && (
                            <button
                                onClick={() => setIsVerificationModalOpen(true)}
                                className="px-4 py-2 bg-amber-50 text-amber-700 text-sm font-bold rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
                            >
                                Complete Verification
                            </button>
                        )}
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <h4 className="text-red-800 font-bold mb-2">Please fix the following errors:</h4>
                        <ul className="list-disc list-inside text-red-700 text-sm">
                            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    </div>
                )}

                {(!tenantProfile?.isBvnVerified) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-amber-900 font-bold text-lg mb-1">Increase your eligibility</h3>
                            <p className="text-amber-800 text-sm mb-4">
                                Your BVN is not yet verified. Verifying your BVN and completing your profile increases your credit score and application approval rate.
                            </p>
                            <button
                                onClick={() => router.push('/dashboard/tenant/profile')}
                                className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 transition-colors"
                            >
                                Complete Profile
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <PropertySummaryCard property={property} />

                        <FinancingInputs
                            downPaymentPercent={applicationData.financing.downPaymentPercent}
                            repaymentDuration={applicationData.financing.repaymentDuration}
                            acceptedTerms={applicationData.financing.acceptedTerms}
                            onChange={handleFinancingChange}
                        />

                        <ApplicationTenantInfo
                            data={applicationData}
                            onChange={handleTenantInfoChange}
                        />

                        <ApplicationDocuments
                            documents={applicationData.documents}
                            onUpload={handleUploadDocument}
                            onRemove={handleRemoveDocument}
                        />

                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                            <button
                                onClick={handleSaveDraft}
                                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex-1"
                            >
                                Save as Draft
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex-1 flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Submit Application'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <InstallmentPlanCard plan={installmentPlan} />

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
                                <p className="text-sm text-blue-800 mb-3">
                                    If you have questions about the application process, our support team is here to help.
                                </p>
                                <button className="text-sm font-medium text-blue-700 hover:underline">
                                    Contact Support →
                                </button>
                            </div>

                            <div className="mt-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-3 text-lg">Financing Eligibility</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Profile Score</span>
                                        <span className="text-brand-green font-bold">Good</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-[70%]" />
                                    </div>
                                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                        You are eligible for <span className="text-brand-green font-bold">up to ₦10M</span> in rent financing based on your current profile data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
            />
        </div>
    );
}
