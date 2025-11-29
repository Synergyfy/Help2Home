'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertySummaryCard from '@/components/dashboard/apply/PropertySummaryCard';
import InstallmentPlanCard from '@/components/dashboard/apply/InstallmentPlanCard';
import FinancingInputs from '@/components/dashboard/apply/FinancingInputs';
import ApplicationTenantInfo from '@/components/dashboard/apply/ApplicationTenantInfo';
import ApplicationDocuments from '@/components/dashboard/apply/ApplicationDocuments';
import { PropertyDetails, InstallmentPlan, ApplicationData, ApplicationDocument } from '@/components/dashboard/apply/types';

export default function ApplyPage() {
    const router = useRouter();

    // --- Mock Data ---
    const mockProperty: PropertyDetails = {
        id: 'prop_123',
        name: 'Sunnyvale Apartments',
        location: '15, Admiralty Way, Lekki Phase 1, Lagos',
        rentPrice: 3500000,
        paymentOption: 'Installment',
        landlordName: 'Lekki Gardens Ltd',
        image: '/assets/marketplace assets/home1.png'
    };

    // --- State ---
    const [applicationData, setApplicationData] = useState<ApplicationData>({
        propertyId: mockProperty.id,
        financing: {
            downPaymentPercent: 25,
            repaymentDuration: 12,
            acceptedTerms: false
        },
        tenantInfo: {
            firstName: 'Mercy',
            lastName: 'Okoli',
            email: 'mercyokoli@gmail.com',
            phone: '08128860774',
            employmentStatus: 'Employed',
            employerName: 'Tech Solutions Ltd',
            monthlySalary: '350,000'
        },
        guarantor: {
            name: '',
            phone: '',
            relationship: '',
            email: ''
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    // --- Effects ---
    useEffect(() => {
        // Calculate Installment Plan
        const rent = mockProperty.rentPrice;
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
    }, [applicationData.financing.downPaymentPercent, applicationData.financing.repaymentDuration]);

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
        if (!applicationData.guarantor.name) newErrors.push("Guarantor name is required.");
        if (!applicationData.guarantor.phone) newErrors.push("Guarantor phone is required.");

        const pendingDocs = applicationData.documents.filter(d => d.status !== 'Uploaded');
        if (pendingDocs.length > 0) newErrors.push(`Please upload all required documents: ${pendingDocs.map(d => d.name).join(', ')}`);

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Redirect to status page
                router.push('/dashboard/tenant/applications/A-000123');
            } catch (error) {
                console.error('Error submitting application:', error);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSaveDraft = () => {
        // Mock save draft
        alert("Application saved as draft!");
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
                    <h1 className="text-3xl font-bold text-gray-900">Rent Financing Application</h1>
                </div>

                {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <h4 className="text-red-800 font-bold mb-2">Please fix the following errors:</h4>
                        <ul className="list-disc list-inside text-red-700 text-sm">
                            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <PropertySummaryCard property={mockProperty} />

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
