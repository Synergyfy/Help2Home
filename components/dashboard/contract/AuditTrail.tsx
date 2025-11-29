import React from 'react';
import { ContractData } from './types';

interface AuditTrailProps {
    audit: ContractData['audit'];
}

export default function AuditTrail({ audit }: AuditTrailProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Audit Trail</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                    <span className="text-gray-400 block mb-1">Created Date</span>
                    <span className="font-medium text-gray-700">{audit.createdDate}</span>
                </div>
                <div>
                    <span className="text-gray-400 block mb-1">Version</span>
                    <span className="font-medium text-gray-700">{audit.version}</span>
                </div>
                <div>
                    <span className="text-gray-400 block mb-1">Last Modified By</span>
                    <span className="font-medium text-gray-700">{audit.lastModifiedBy}</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
                <button className="text-[#6D28D9] hover:underline text-xs font-medium">
                    View full changelog
                </button>
            </div>
        </div>
    );
}
