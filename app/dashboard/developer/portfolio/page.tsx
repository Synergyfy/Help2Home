'use client';

import dynamic from 'next/dynamic';

const DynamicPortfolioPageContent = dynamic(() => import('@/components/dashboard/developer/portfolio/PortfolioPageContent'), { ssr: false });

export default function PortfolioPage() {
    return <DynamicPortfolioPageContent />;
}
