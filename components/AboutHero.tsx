'use client';

import FadeIn from './FadeIn';

export default function AboutHero() {
    return (
        <section className="bg-brand-green text-white py-20 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <FadeIn>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
                        <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl">
                            We are a property technology organization that offers a method of providing products and services on an installment basis, making renting and managing homes simple across Nigeria.
                        </p>
                    </div>
                </FadeIn>
            </div>

            {/* Decorative circle/pattern if needed to match design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </section>
    );
}
