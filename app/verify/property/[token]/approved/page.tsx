'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineCheckCircle, HiOutlineHome } from 'react-icons/hi2';

const MOCK_PROPERTY = {
    title: 'The Green Valley Loft',
    address: '4502 Woodland Dr, Austin, TX 78745',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
};

export default function PropertyApprovedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full">
                {/* Header */}
                <div className="bg-[#102210] rounded-t-[2rem] p-6 flex justify-between items-center border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-brand-green flex items-center justify-center text-[#102210]">
                            <HiOutlineHome size={20} />
                        </div>
                        <h1 className="text-lg font-black text-white">
                            Help2<span className="text-brand-green">Home</span>
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-b-[2rem] shadow-2xl overflow-hidden">
                    <div className="p-12 text-center">
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-6 animate-in fade-in zoom-in duration-300">
                            <HiOutlineCheckCircle className="text-brand-green" size={64} />
                        </div>

                        <h2 className="text-3xl font-black text-gray-900 mb-4">Property Approved!</h2>
                        <p className="text-gray-600 mb-8 text-base leading-relaxed">
                            Your property has been successfully approved and is now <span className="font-bold text-brand-green">live on the marketplace</span>.
                            Potential tenants can now view and apply for this listing.
                        </p>

                        <div className="text-left mb-10 max-w-md mx-auto">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center sm:text-left">Published Property</p>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex gap-3 items-center shadow-sm">
                                <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                    <img
                                        src={MOCK_PROPERTY.image}
                                        alt={MOCK_PROPERTY.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{MOCK_PROPERTY.title}</h3>
                                    <p className="text-gray-600 text-xs mt-0.5">{MOCK_PROPERTY.address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center w-full">
                            <button
                                onClick={() => window.close()}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-bold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => router.push('/dashboard/landlord/properties')}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-brand-green hover:bg-green-700 transition-all"
                            >
                                View My Properties
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
