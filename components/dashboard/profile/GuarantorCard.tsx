import React, { useState } from 'react';
import { Guarantor } from './types';

interface GuarantorCardProps {
    guarantors: Guarantor[];
    onAdd: (guarantor: Omit<Guarantor, 'id' | 'status'>) => void;
    onRemove: (id: string) => void;
}

export default function GuarantorCard({ guarantors, onAdd, onRemove }: GuarantorCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGuarantor, setNewGuarantor] = useState({
        name: '',
        phone: '',
        relationship: '',
        email: '',
        notes: ''
    });

    const handleAdd = () => {
        if (newGuarantor.name && newGuarantor.phone) {
            onAdd(newGuarantor);
            setNewGuarantor({ name: '', phone: '', relationship: '', email: '', notes: '' });
            setIsModalOpen(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Guarantor</h2>
                    <p className="text-gray-500 mt-1">Optional — add someone who can guarantee your tenancy.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-brand-green text-white text-sm font-bold rounded-xl hover:bg-green-700 shadow-md shadow-green-100 transition-all active:scale-[0.98]"
                >
                    Add guarantor
                </button>
            </div>

            {guarantors.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="text-gray-500">No guarantors added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {guarantors.map(g => (
                        <div key={g.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-gray-900">{g.name}</h4>
                                <p className="text-sm text-gray-500">{g.relationship} • {g.phone}</p>
                                <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${g.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                    g.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {g.status}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onRemove(g.id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-400 mt-4">A guarantor may be contacted to confirm their willingness to act as guarantor.</p>

            {/* Add Guarantor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4">Add Guarantor</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                value={newGuarantor.name}
                                onChange={e => setNewGuarantor({ ...newGuarantor, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number *"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                value={newGuarantor.phone}
                                onChange={e => setNewGuarantor({ ...newGuarantor, phone: e.target.value })}
                            />
                            <select
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                value={newGuarantor.relationship}
                                onChange={e => setNewGuarantor({ ...newGuarantor, relationship: e.target.value })}
                            >
                                <option value="">Relationship</option>
                                <option value="Family">Family</option>
                                <option value="Friend">Friend</option>
                                <option value="Employer">Employer</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="email"
                                placeholder="Email (Optional)"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none"
                                value={newGuarantor.email}
                                onChange={e => setNewGuarantor({ ...newGuarantor, email: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-6 py-2 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-[0.95]"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
