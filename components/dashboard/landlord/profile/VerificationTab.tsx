'use client';

import React, { useState, useEffect } from 'react';
import { VerificationDocument, MOCK_DOCUMENTS_LANDLORD, MOCK_DOCUMENTS_DEVELOPER, MOCK_DOCUMENTS_INVESTOR, MOCK_DOCUMENTS_AGENT, MOCK_DOCUMENTS_TENANT, MOCK_DOCUMENTS_CARETAKER } from '@/lib/mockLandlordData';
import { useUserStore, Role } from '@/store/userStore';
import { useUpdateProfile } from '@/hooks/useProfile';
import { IoCheckmarkCircle, IoInformationCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import LivenessCapture from '@/components/dashboard/profile/LivenessCapture';

export default function VerificationTab({ role: activeRole = 'tenant' }: { role?: Role }) {
    const { roleData, updateRoleProfileData } = useUserStore();
    const { mutate: updateProfile } = useUpdateProfile(activeRole);
    const roleSpecificData = roleData[activeRole as keyof typeof roleData];

    const [idType, setIdType] = useState('National ID');
    const [idNumber, setIdNumber] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Liveness state
    const [livenessStatus, setLivenessStatus] = useState<'pending' | 'verified' | 'failed' | 'in_review'>('pending');
    const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);

    // Dedicated BVN state
    const [bvn, setBvn] = useState((roleSpecificData as any)?.bvn || '');
    const [isSavingBvn, setIsSavingBvn] = useState(false);
    const [bvnSaveSuccess, setBvnSaveSuccess] = useState(false);

    const idTypes = [
        'National ID',
        'Driver\'s License',
        'International Passport',
        'Voter\'s Card'
    ];

    useEffect(() => {
        if (roleSpecificData) {
            setBvn((roleSpecificData as any).bvn || '');
        }
    }, [roleSpecificData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleSaveBvn = () => {
        setIsSavingBvn(true);
        setTimeout(() => {
            updateRoleProfileData(activeRole, { bvn });
            setIsSavingBvn(false);
            setBvnSaveSuccess(true);
            setTimeout(() => setBvnSaveSuccess(false), 3000);
        }, 1000);
    };

    const handleSelfieCapture = (image: string) => {
        setCapturedSelfie(image);
        setLivenessStatus('in_review');
        
        // Simulate background KYC check
        setTimeout(() => {
            setLivenessStatus('verified');
            toast.success("Identity biometrics verified against records.");
        }, 3000);
    };

    const handleSaveIdentification = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            // Update store with new data
            const updateObj: any = {};
            if (idType === 'National ID') updateObj.nin = idNumber;
            
            updateRoleProfileData(activeRole, updateObj);
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
                setIdNumber('');
                setUploadedFile(null);
            }, 3000);
        }, 1500);
    };

    const getDocsByRole = () => {
        switch (activeRole) {
            case 'landlord': return MOCK_DOCUMENTS_LANDLORD;
            case 'developer': return MOCK_DOCUMENTS_DEVELOPER;
            case 'investor': return MOCK_DOCUMENTS_INVESTOR;
            case 'agent': return MOCK_DOCUMENTS_AGENT;
            case 'tenant': return MOCK_DOCUMENTS_TENANT;
            case 'caretaker': return MOCK_DOCUMENTS_CARETAKER;
            default: return MOCK_DOCUMENTS_LANDLORD;
        }
    };

    const documents = getDocsByRole();
    const completedCount = documents.filter(d => d.status === 'approved').length;
    const totalCount = documents.length;
    const progress = (completedCount / totalCount) * 100;

    const handleMockVerify = (docId: string) => {
        // Just a mock interaction to show we can update the store
        // In a real app, this would be an upload + backend verification
        toast.success('Document uploaded and sent for review!');
        
        if (activeRole === 'landlord') {
            updateProfile({ isIdentityVerified: true });
        } else if (activeRole === 'developer') {
            updateProfile({ isBusinessVerified: true });
        } else if (activeRole === 'investor') {
            updateProfile({ isIdentityVerified: true });
        } else if (activeRole === 'agent') {
            updateProfile({ isLicenseVerified: true });
        } else if (activeRole === 'caretaker') {
            updateProfile({ isIdentityVerified: true });
        }
    };

    return (
        <div className="space-y-6">
            {/* Safety Notice */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4 animate-in fade-in duration-500">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-sm font-black text-blue-900">Your Data is Secure</h4>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed mt-1">
                        All uploaded documents are encrypted and stored securely. We use this information strictly for identity verification and to protect your account. Your data is never shared with third parties without your explicit consent.
                    </p>
                </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Verification Progress</h3>
                        <p className="text-sm text-gray-500">Complete all steps to verify your account.</p>
                    </div>
                    <span className="text-sm font-bold text-brand-green">{completedCount} of {totalCount} complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-brand-green h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Liveness Section */}
            {(activeRole === 'tenant' || activeRole === 'landlord' || activeRole === 'agent' || activeRole === 'caretaker' || activeRole === 'investor' || activeRole === 'developer') && (
                <LivenessCapture 
                    status={livenessStatus}
                    onCapture={handleSelfieCapture}
                />
            )}

            {/* Identity Verification (All relevant roles) */}
            {(activeRole === 'tenant' || activeRole === 'landlord' || activeRole === 'agent' || activeRole === 'caretaker' || activeRole === 'investor' || activeRole === 'developer') && (
                <div className="space-y-6">
                    {/* BVN Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Bank Verification Number (BVN)</h3>
                                <p className="text-sm text-gray-500">Provide your 11-digit BVN for instant identity validation.</p>
                            </div>
                            <div className="text-brand-green bg-green-50 p-2 rounded-full">
                                <IoInformationCircleOutline size={24} />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-end gap-4">
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">BVN Number</label>
                                    <input
                                        type="text"
                                        value={bvn}
                                        onChange={(e) => setBvn(e.target.value)}
                                        placeholder="Enter 11-digit BVN"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                        maxLength={11}
                                    />
                                </div>
                                <button
                                    onClick={handleSaveBvn}
                                    disabled={isSavingBvn || bvn.length < 11}
                                    className={`px-10 py-4 rounded-xl font-black transition-all whitespace-nowrap ${isSavingBvn || bvn.length < 11
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-brand-green text-white hover:bg-green-700 shadow-xl shadow-green-100'
                                        }`}
                                >
                                    {isSavingBvn ? 'Validating...' : 'Verify BVN'}
                                </button>
                            </div>
                            {bvnSaveSuccess && (
                                <div className="mt-4 flex items-center gap-2 text-green-600 font-black animate-in fade-in slide-in-from-top-2">
                                    <IoCheckmarkCircle size={20} />
                                    <span>BVN Linked Successfully</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Other IDs Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Means of Identity</h3>
                                <p className="text-sm text-gray-500">Select and upload a valid government-issued ID.</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Identity Type</label>
                                    <select
                                        value={idType}
                                        onChange={(e) => setIdType(e.target.value)}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                                    >
                                        {idTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{idType} Number</label>
                                    <input
                                        type="text"
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        placeholder={`Enter your ${idType} number`}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* File Upload Area */}
                            <div>
                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Upload {idType} Image</label>
                                {!uploadedFile ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-10 h-10 mb-3 text-gray-400 group-hover:text-brand-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 font-bold">
                                                <span className="text-brand-green">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400">PNG, JPG or PDF (MAX. 10MB)</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-between bg-green-50 p-5 rounded-2xl border border-green-100 animate-in fade-in zoom-in duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-green shadow-sm">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 truncate max-w-[200px]">{uploadedFile.name}</p>
                                                <p className="text-xs text-gray-500 font-bold">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setUploadedFile(null)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleSaveIdentification}
                                    disabled={isSaving || !idNumber || !uploadedFile}
                                    className={`px-10 py-4 rounded-xl font-black transition-all ${isSaving || !idNumber || !uploadedFile
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-brand-green text-white hover:bg-green-700 shadow-xl shadow-green-100 scale-[1.02] active:scale-[0.98]'
                                        }`}
                                >
                                    {isSaving ? 'Verifying...' : 'Submit for Verification'}
                                </button>
                                {saveSuccess && (
                                    <div className="flex items-center gap-2 text-green-600 font-black animate-in fade-in slide-in-from-left-4">
                                        <IoCheckmarkCircle size={24} />
                                        <span>Identity Submitted!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Documents List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Required Documents</h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                        <div key={doc.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${doc.status === 'approved' ? 'bg-green-100 text-green-600' :
                                    doc.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                        doc.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                            'bg-gray-100 text-gray-400'
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{doc.label}</h4>
                                    {doc.filename ? (
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            {doc.filename}
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            {doc.uploadedAt}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Accepted: jpg, png, pdf (Max 10MB)</p>
                                    )}

                                    {doc.status === 'rejected' && (
                                        <p className="text-sm text-red-600 mt-1">
                                            Reason: {doc.rejectionReason || 'Document unclear or expired.'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {doc.status === 'approved' ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Approved
                                    </span>
                                ) : doc.status === 'pending' ? (
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                                        Under Review
                                    </span>
                                ) : (
                                    <label className="cursor-pointer">
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*,.pdf"
                                            onChange={() => handleMockVerify(doc.id)} 
                                        />
                                        <div className={`px-4 py-2 bg-white border rounded-lg text-sm font-medium transition-colors ${
                                            doc.status === 'rejected' 
                                            ? 'border-red-200 text-red-600 hover:bg-red-50' 
                                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}>
                                            {doc.status === 'rejected' ? 'Re-upload' : 'Upload'}
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

