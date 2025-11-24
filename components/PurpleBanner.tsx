'use client';

import Link from 'next/link';

export default function PurpleBanner() {
    return (
        <section className="py-20 px-4 md:px-0">
            <div className="container mx-auto">
                <div className="bg-brand-purple rounded-[2.5rem] overflow-hidden relative flex flex-col md:flex-row items-center shadow-2xl">

                    {/* Image Section (Left) */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative min-h-[400px]">
                        <img src="/assets/Rectangle 1301.png" alt="Luxury life" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-purple/50 md:hidden"></div>
                    </div>

                    {/* Content Section (Right) */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 text-white relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            Sign up with us and live that luxury life that you desire
                        </h2>
                        <p className="text-purple-100 mb-8 leading-relaxed text-sm md:text-base">
                            Any day works to book your perfect apartment. We make it easy to find the home you love without the financial stress. Pay monthly, live better.
                        </p>
                        <Link href="/signup" className="inline-block bg-brand-green text-white px-8 py-3 rounded-md font-medium hover:bg-green-600 transition-colors shadow-lg">
                            Get Started
                        </Link>
                    </div>

                    {/* Decorative Curve (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-24 bg-brand-purple -translate-x-1/2 skew-x-12 origin-bottom"></div>
                </div>
            </div>
        </section>
    );
}
