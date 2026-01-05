'use client';

import CalculatorCTA from '@/components/lib/CalculatorCTA';

export default function PurpleBanner() {
    return (
        <section className="py-20 px-4 md:px-0">
            <div className="container mx-auto mx-4 md:mx-8">
                <div className="bg-gradient-to-r from-brand-purple to-blue-900 rounded-[2.5rem] overflow-hidden relative flex flex-col md:flex-row items-center shadow-2xl min-h-[500px]">

                    {/* Left: Image Section */}
                    <div className="w-full md:w-1/2 h-64 md:h-full absolute md:relative inset-0">
                        <img
                            src="/assets/Rectangle 1301.png"
                            alt="Luxury life"
                            className="w-full h-full object-cover opacity-60 md:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/40 to-brand-purple/10"></div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 text-white relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            Find Your Perfect Home Without Breaking the Bank
                        </h2>
                        <p className="text-white/90 mb-8 leading-relaxed text-sm md:text-base font-medium">
                            Discover apartments that fit your budget. Pay monthly, live comfortably,
                            and make your dream home a reality.
                        </p>

                        {/* Use the Minimal Variant here */}
                        <div className="max-w-md">
                            <CalculatorCTA
                                variant="minimal"
                                placeholder="Enter Annual Rent (₦)"
                                redirectPath="/check-rent-affordability"
                                ctaText="Check Affordability"
                            />
                        </div>

                        <p className="text-white/60 text-xs mt-4">
                            *Quick estimates based on your annual income.
                        </p>
                    </div>

                    {/* Decorative Curve (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-24 bg-white/5 -translate-x-1/2 skew-x-12 origin-bottom backdrop-blur-sm"></div>
                </div>
            </div>
        </section>
    );
}