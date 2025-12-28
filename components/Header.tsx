'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem('user_session');
            setIsLoggedIn(!!session);
        };

        checkAuth();
        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, []);

    const handleCategoryClick = (type: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own', category?: string) => {
        setIsMenuOpen(false);
        
        // Build query string
        let queryString = `type=${type}`;
        if (category) {
            queryString += `&category=${category}`;
        }
        
        // Navigate to marketplace with query params
        router.push(`/marketplace?${queryString}`);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
            <div className="container mx-auto flex items-center justify-between px-6 md:px-12 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-brand-green">Help2Home</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
                    {/* Rent Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-brand-green transition-colors py-4">
                            Rent
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <button 
                                onClick={() => handleCategoryClick('rent', 'residential-properties-to-rent')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Residential Property to Rent
                            </button>
                            <button 
                                onClick={() => handleCategoryClick('rent', 'corporate-properties-to-rent')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Corporate Property
                            </button>
                            <button 
                                onClick={() => handleCategoryClick('rent', 'student-properties-to-rent')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Student / Corpers Property
                            </button>
                        </div>
                    </div>

                    {/* Buy Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-brand-green transition-colors py-4">
                            Buy
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <button 
                                onClick={() => handleCategoryClick('buy', 'residential-properties-for-sale')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Residential Property for Sale
                            </button>
                            <button 
                                onClick={() => handleCategoryClick('buy', 'commercial-properties-for-sale')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Commercial Property for Sale
                            </button>
                            <button 
                                onClick={() => handleCategoryClick('buy', 'corporate-properties-for-sale')}
                                className="block w-full text-left text-gray-600 hover:text-brand-green hover:bg-green-50 py-3 px-4 transition-colors"
                            >
                                Corporate Property for Sale
                            </button>
                        </div>
                    </div>

                    {/* Standalone Menu Items */}
                    <button 
                        onClick={() => handleCategoryClick('service-apartment')}
                        className="hover:text-brand-green transition-colors"
                    >
                        Service Apartments
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('rent-to-own')}
                        className="hover:text-brand-green transition-colors"
                    >
                        Rent to Own
                    </button>
                    <Link href="/find-developers" className="hover:text-brand-green transition-colors">Find Developers</Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-brand-green">Sign In</Link>
                            <Link href="/signup" className="bg-brand-green text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">Sign Up</Link>
                        </>
                    ) : (
                        <Link href="/dashboard/tenant/profile" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-green">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span>My Account</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="lg:hidden flex items-center gap-4">
                    <button className="p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg p-4 flex flex-col gap-4 z-50 max-h-[80vh] overflow-y-auto">
                    <div className="border-b border-gray-100 pb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Rent</p>
                        <button 
                            onClick={() => handleCategoryClick('rent', 'residential-properties-to-rent')}
                            className="block w-full text-left text-gray-600 hover:text-brand-green py-2 pl-4"
                        >
                            Residential Property
                        </button>
                        <button 
                            onClick={() => handleCategoryClick('rent', 'corporate-properties-to-rent')}
                            className="block w-full text-left text-gray-600 hover:text-brand-green py-2 pl-4"
                        >
                            Corporate Property
                        </button>
                        <button 
                            onClick={() => handleCategoryClick('rent', 'student-properties-to-rent')}
                            className="block w-full text-left text-gray-600 hover:text-brand-green py-2 pl-4"
                        >
                            Student / Corpers Property
                        </button>
                    </div>

                    <div className="border-b border-gray-100 pb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Buy</p>
                        <button 
                            onClick={() => handleCategoryClick('buy', 'residential-properties-for-sale')}
                            className="block w-full text-left text-gray-600 hover:text-brand-green py-2 pl-4"
                        >
                            Residential Property for Sale
                        </button>
                        <button 
                            onClick={() => handleCategoryClick('buy', 'commercial-properties-for-sale')}
                            className="block w-full text-left text-gray-600 hover:text-brand-green py-2 pl-4"
                        >
                            Commercial Property for Sale
                        </button>
                    </div>

                    <button 
                        onClick={() => handleCategoryClick('service-apartment')}
                        className="text-left text-gray-600 hover:text-brand-green py-2"
                    >
                        Service Apartments
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('rent-to-own')}
                        className="text-left text-gray-600 hover:text-brand-green py-2"
                    >
                        Rent to Own
                    </button>
                    <Link href="/find-developers" className="text-gray-600 hover:text-brand-green py-2" onClick={() => setIsMenuOpen(false)}>Find Developers</Link>

                    {!isLoggedIn ? (
                        <>
                            <hr className="border-gray-100" />
                            <Link href="/signin" className="text-gray-600 hover:text-brand-green py-2" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                            <Link href="/signup" className="bg-brand-green text-white px-6 py-3 rounded-full text-center font-medium hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <hr className="border-gray-100" />
                            <Link href="/dashboard/tenant/profile" className="flex items-center gap-2 text-gray-600 hover:text-brand-green py-2" onClick={() => setIsMenuOpen(false)}>
                                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <span>My Account</span>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}