'use client';

import dynamic from 'next/dynamic';

const Apply = dynamic(() => import('@/components/dashboard/tenant/ApplyPage'), { ssr: false });

export default function DynamicApplyPageWrapper() {
    return <Apply />;
}
