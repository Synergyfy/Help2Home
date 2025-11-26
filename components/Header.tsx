'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for auth session on mount and listen for changes
    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem('user_session');
            setIsLoggedIn(!!session);
        };

        checkAuth();

        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
            <div className="container mx-auto flex items-center justify-between px-6 md:px-12 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-brand-green">Help2Home</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600" aria-label="Main navigation">
                    {/* Browse Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-brand-green transition-colors py-4">
                            Browse
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <Link href="/dashboard/tenant/marketplace" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">Marketplace</Link>
                            <Link href="/browse/properties" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">All Properties</Link>
                        </div>
                    </div>
                    <Link href="/list-property" className="hover:text-brand-green transition-colors">List your property</Link>
                    <Link href="/about" className="hover:text-brand-green transition-colors">About Us</Link>

                    {/* How It Works Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-brand-green transition-colors py-4">
                            How it works
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full right-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <Link href="/how-it-works" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">Overview</Link>
                            <Link href="/how-it-works/tenants" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">For Tenants</Link>
                            <Link href="/how-it-works/landlords" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">For Landlords</Link>
                            <Link href="/how-it-works/investors" className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-green transition-colors">For Investors</Link>
                        </div>
                    </div>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Search Icon */}
                    <button aria-label="Search" className="text-gray-500 hover:text-brand-green">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>

                    {/* Language/Currency Placeholder */}
                    <div className="text-xs text-gray-500 font-medium">EN / NGN</div>

                    {!isLoggedIn ? (
                        <>
                            <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-brand-green">Sign In</Link>
                            <Link href="/signup" className="bg-brand-green text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <Link href="/dashboard/tenant/profile" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-green">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                {/* Placeholder for user avatar */}
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
                    <button aria-label="Search" className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>

                    <button
                        className="p-2 text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg p-4 flex flex-col gap-4 z-50">
                    <Link href="/browse" className="text-gray-600 hover:text-brand-green py-2">Browse</Link>
                    <Link href="/list-property" className="text-gray-600 hover:text-brand-green py-2">List your property</Link>
                    <Link href="/about" className="text-gray-600 hover:text-brand-green py-2">About Us</Link>

                    <div className="border-t border-gray-100 pt-2">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">How It Works</p>
                        <Link href="/how-it-works" className="block text-gray-600 hover:text-brand-green py-2 pl-4">Overview</Link>
                        <Link href="/how-it-works/tenants" className="block text-gray-600 hover:text-brand-green py-2 pl-4">For Tenants</Link>
                        <Link href="/how-it-works/landlords" className="block text-gray-600 hover:text-brand-green py-2 pl-4">For Landlords</Link>
                        <Link href="/how-it-works/investors" className="block text-gray-600 hover:text-brand-green py-2 pl-4">For Investors</Link>
                    </div>

                    {!isLoggedIn ? (
                        <>
                            <hr className="border-gray-100" />
                            <Link href="/signin" className="text-gray-600 hover:text-brand-green py-2">Sign In</Link>
                            <Link href="/signup" className="bg-brand-green text-white px-6 py-3 rounded-full text-center font-medium hover:bg-green-600">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <hr className="border-gray-100" />
                            <Link href="/dashboard/tenant/profile" className="flex items-center gap-2 text-gray-600 hover:text-brand-green py-2">
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
