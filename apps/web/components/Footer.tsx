'use client';

import Link from 'next/link';
import Logo from '@/components/shared/Logo';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:w-1/4">
                        <Link href="/" className="mb-6 block">
                            <Logo 
                                width={40} 
                                height={40} 
                                className="brightness-0 invert" 
                                textClassName="text-xl font-black text-white"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Making housing accessible and stress-free for everyone in Nigeria.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400">
                        <div>
                            <h3 className="font-bold text-white mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
                                <li><Link href="/locations" className="hover:text-brand-green transition-colors">Popular Locations</Link></li>
                                <li><Link href="/careers" className="hover:text-brand-green transition-colors">Careers</Link></li>
                                <li><Link href="/blog" className="hover:text-brand-green transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Help</h3>
                            <ul className="space-y-3">
                                <li><Link href="/how-it-works" className="hover:text-brand-green transition-colors">How It Works</Link></li>
                                <li><Link href="/faq" className="hover:text-brand-green transition-colors">FAQ</Link></li>
                                <li><Link href="/contact" className="hover:text-brand-green transition-colors">Contact Us</Link></li>
                                <li><Link href="/support" className="hover:text-brand-green transition-colors">Support Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">How It Works</h3>
                            <ul className="space-y-3">
                                <li><Link href="/how-it-works/tenants" className="hover:text-brand-green transition-colors">Tenants</Link></li>
                                <li><Link href="/how-it-works/landlords" className="hover:text-brand-green transition-colors">Landlords</Link></li>
                                <li><Link href="/how-it-works/investors" className="hover:text-brand-green transition-colors">Investors</Link></li>
                                <li><Link href="/how-it-works/caretakers" className="hover:text-brand-green transition-colors">Caretakers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link href="/terms" className="hover:text-brand-green transition-colors">Terms of Service</Link></li>
                                <li><Link href="/privacy" className="hover:text-brand-green transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Help2Home. All rights reserved.</p>
                    <div className="flex gap-6">
                        <button className="hover:text-white transition-colors">English (NG)</button>
                        <button className="hover:text-white transition-colors">NGN (₦)</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
