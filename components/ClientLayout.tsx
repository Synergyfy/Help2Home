'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    // Check if we are on a dashboard page

    return (
        <>
            {!isDashboard && <Header />}
            {children}
            {!isDashboard && <CookieConsent />}
            {!isDashboard && <Footer />}
        </>
    );
}
