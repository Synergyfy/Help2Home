'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineWrenchScrewdriver,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineExclamationTriangle,
    HiOutlineFunnel,
    HiOutlineMagnifyingGlass,
    HiOutlineChevronRight,
    HiOutlineCalendarDays,
    HiOutlineMapPin,
    HiOutlineUser,
    HiOutlineBanknotes,
    HiOutlineUserGroup // New import for assigned artisan icon
} from 'react-icons/hi2';
import { MOCK_MAINTENANCE_REQUESTS, MaintenanceRequest, MaintenanceStatus } from '@/lib/mockMaintenanceData';
import { toast } from 'react-toastify';
import { formatCurrency } from '@/utils/helpers';
import RejectionReasonModal from '@/components/dashboard/landlord/maintenance/RejectionReasonModal';
import FindArtisanModal from '@/components/dashboard/landlord/maintenance/FindArtisanModal'; // Import new modal
import { MOCK_ARTISANS } from '@/lib/mockArtisanData'; // Import artisan data

export default function MaintenancePageContent() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>(MOCK_MAINTENANCE_REQUESTS);
    const [filter, setFilter] = useState<'All' | MaintenanceStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
    const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false); // State for rejection modal
    const [currentRequestToReject, setCurrentRequestToReject] = useState<MaintenanceRequest | null>(null);
    const [isRejecting, setIsRejecting] = useState(false);
    const [isFindArtisanModalOpen, setIsFindArtisanModalOpen] = useState(false); // State for Find Artisan modal
    const [currentRequestForArtisan, setCurrentRequestForArtisan] = useState<MaintenanceRequest | null>(null); // Request to assign artisan to
    const [isHiringArtisan, setIsHiringArtisan] = useState(false);

    const filteredRequests = requests.filter(req => {
        const matchesFilter = filter === 'All' || req.status === filter;
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.tenant.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleUpdateStatus = (id: string, newStatus: MaintenanceStatus, reason?: string, assignedArtisanId?: string) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: newStatus, rejectionReason: reason, assignedArtisanId: assignedArtisanId } : req
        ));
        toast.success(`Request ${newStatus.toLowerCase()} successfully`);
        setSelectedRequest(null);
        setIsRejectionModalOpen(false);
        setCurrentRequestToReject(null);
        setIsFindArtisanModalOpen(false); // Close Find Artisan modal
        setCurrentRequestForArtisan(null); // Clear request for artisan
    };

    const handleRejectClick = (request: MaintenanceRequest) => {
        setCurrentRequestToReject(request);
        setIsRejectionModalOpen(true);
    };

    const handleConfirmReject = async (reason: string) => {
        if (currentRequestToReject) {
            setIsRejecting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            handleUpdateStatus(currentRequestToReject.id, 'Rejected', reason);
            setIsRejecting(false);
        }
    };

    const handleFindArtisanClick = (request: MaintenanceRequest) => {
        setCurrentRequestForArtisan(request);
        setIsFindArtisanModalOpen(true);
    };

    const handleHireArtisan = async (artisanId: string) => {
        if (currentRequestForArtisan) {
            setIsHiringArtisan(true);
            // Simulate API call for hiring
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Assuming 'Approved' or 'In Progress' when an artisan is hired
            handleUpdateStatus(currentRequestForArtisan.id, 'In Progress', undefined, artisanId);
            setIsHiringArtisan(false);
        }
    };

    const getStatusColor = (status: MaintenanceStatus) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Approved': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'In Progress': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'Completed': return 'bg-green-50 text-green-600 border-green-100';
            case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Emergency': return 'bg-red-500 text-white';
            case 'High': return 'bg-orange-500 text-white';
            case 'Medium': return 'bg-amber-500 text-white';
            case 'Low': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getArtisanName = (artisanId: string | undefined) => {
        const artisan = MOCK_ARTISANS.find(a => a.id === artisanId);
        return artisan ? artisan.name : 'Unassigned';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Maintenance Requests</h1>
                    <p className="text-gray-500 mt-1">Review and manage maintenance issues reported by your tenants.</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', count: requests.length, icon: HiOutlineWrenchScrewdriver, color: 'text-gray-600', bg: 'bg-gray-50' },
                    { label: 'Pending', count: requests.filter(r => r.status === 'Pending').length, icon: HiOutlineClock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'In Progress', count: requests.filter(r => r.status === 'In Progress').length, icon: HiOutlineWrenchScrewdriver, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Emergency', count: requests.filter(r => r.priority === 'Emergency').length, icon: HiOutlineExclamationTriangle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`size-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900">{stat.count}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title, property or tenant..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-brand-green outline-none font-medium transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-brand-green outline-none font-bold text-sm cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Requests List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredRequests.map((req) => (
                        <motion.div
                            key={req.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={() => setSelectedRequest(req)}
                            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 ${getPriorityColor(req.priority)} shadow-lg`}>
                                        <HiOutlineWrenchScrewdriver size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{req.title}</h3>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${getStatusColor(req.status)}`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <HiOutlineMapPin size={16} />
                                                <span>{req.property} • {req.unit}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <HiOutlineUser size={16} />
                                                <span>{req.tenant}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <HiOutlineCalendarDays size={16} />
                                                <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            {req.assignedArtisanId && (
                                                <div className="flex items-center gap-1.5">
                                                    <HiOutlineUserGroup size={16} />
                                                    <span>Assigned to: {getArtisanName(req.assignedArtisanId)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {req.estimatedCost && (
                                        <div className="text-right hidden sm:block">
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Cost</div>
                                            <div className="font-bold text-gray-900">{formatCurrency(req.estimatedCost)}</div>
                                        </div>
                                    )}
                                    <HiOutlineChevronRight size={24} className="text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                        <HiOutlineWrenchScrewdriver size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No requests found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className={`p-8 ${getPriorityColor(selectedRequest.priority)} relative`}>
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-all"
                                >
                                    <HiOutlineXCircle size={24} />
                                </button>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                        {selectedRequest.priority} Priority
                                    </span>
                                    <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                        ID: {selectedRequest.id}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black text-white leading-tight">{selectedRequest.title}</h2>
                                {selectedRequest.status === 'Rejected' && selectedRequest.rejectionReason && (
                                    <p className="text-sm text-white/80 mt-2">
                                        Reason for rejection: <span className="font-medium">{selectedRequest.rejectionReason}</span>
                                    </p>
                                )}
                                {selectedRequest.assignedArtisanId && (
                                    <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
                                        <HiOutlineUserGroup size={18} />
                                        Assigned to: <span className="font-medium">{getArtisanName(selectedRequest.assignedArtisanId)}</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Property & Unit</div>
                                        <div className="font-bold text-gray-900">{selectedRequest.property}</div>
                                        <div className="text-sm text-gray-500">{selectedRequest.unit}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tenant</div>
                                        <div className="font-bold text-gray-900">{selectedRequest.tenant}</div>
                                        <div className="text-sm text-gray-500">Occupant</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Reported</div>
                                        <div className="font-bold text-gray-900">{new Date(selectedRequest.createdAt).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-500">{new Date(selectedRequest.createdAt).toLocaleTimeString()}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border-2 border-brand-green/10">
                                        <div className="text-[10px] font-black text-brand-green uppercase tracking-widest mb-1">Estimated Cost</div>
                                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(selectedRequest.estimatedCost || 0)}</div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Description</div>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-3xl font-medium border border-gray-100">
                                        {selectedRequest.description}
                                    </p>
                                </div>

                                {/* Images */}
                                {selectedRequest.images && selectedRequest.images.length > 0 && (
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Photos</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedRequest.images.map((img, i) => (
                                                <div key={i} className="aspect-video rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
                                                    <img src={img} alt="Repair" className="size-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                                {selectedRequest.status === 'Pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleRejectClick(selectedRequest)}
                                            className="flex-1 py-4 px-6 border-2 border-red-100 text-red-600 font-black rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <HiOutlineXCircle size={20} />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleFindArtisanClick(selectedRequest)} // New Find Artisan button
                                            className="flex-1 py-4 px-6 border-2 border-blue-100 text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <HiOutlineUserGroup size={20} />
                                            Find Artisan
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(selectedRequest.id, 'Approved')}
                                            className="flex-[2] py-4 px-6 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2"
                                        >
                                            <HiOutlineCheckCircle size={20} />
                                            Approve Repair
                                        </button>
                                    </>
                                ) : selectedRequest.status === 'In Progress' && !selectedRequest.assignedArtisanId ? (
                                    <button
                                        onClick={() => handleFindArtisanClick(selectedRequest)} // Allow assigning if In Progress but no artisan
                                        className="w-full py-4 px-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                                    >
                                        <HiOutlineUserGroup size={20} />
                                        Assign Artisan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setSelectedRequest(null)}
                                        className="w-full py-4 px-6 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all"
                                    >
                                        Back to List
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Rejection Reason Modal */}
            {currentRequestToReject && (
                <RejectionReasonModal
                    isOpen={isRejectionModalOpen}
                    onClose={() => {
                        setIsRejectionModalOpen(false);
                        setCurrentRequestToReject(null);
                    }}
                    onConfirm={handleConfirmReject}
                    isLoading={isRejecting}
                />
            )}

            {/* Find Artisan Modal */}
            {currentRequestForArtisan && (
                <FindArtisanModal
                    isOpen={isFindArtisanModalOpen}
                    onClose={() => {
                        setIsFindArtisanModalOpen(false);
                        setCurrentRequestForArtisan(null);
                    }}
                    onHireArtisan={handleHireArtisan}
                    isLoading={isHiringArtisan}
                    currentMaintenanceRequestSpecialization={currentRequestForArtisan?.title.includes('Faucet') ? 'Plumbing' : undefined} // Example specialization based on title
                />
            )}
        </div>
    );
}
