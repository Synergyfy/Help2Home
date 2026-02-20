'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Chatbot from '@/components/Chatbot';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isBankPortal = pathname?.startsWith('/bank-portal');
    const hideLayout = isDashboard || isBankPortal;

    return (
        <>
            {!hideLayout && <Header />}
            {children}
            {!hideLayout && <CookieConsent />}
            {!hideLayout && <Footer />}
            <Chatbot />
        </>
    );
}
