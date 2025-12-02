'use client';

import React from 'react';
import AuditLogViewer from '@/components/dashboard/admin/audit/AuditLogViewer';

export default function AdminAuditPage() {
    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
                <p className="text-gray-500">Track system activities and security events.</p>
            </div>

            <AuditLogViewer />
        </div>
    );
}
