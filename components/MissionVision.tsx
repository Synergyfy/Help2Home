'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

export default function MissionVision() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        <FadeIn direction="right">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our Vision at Help2Home is to create an affordable means of renting and managing homes for residents, landlords, and agents. Developing and implementing a simple, lucrative method for finding and managing properties, making housing aspirations come true.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To help individuals in achieving "the better life," including residents, landlords, and agents. Developing and implementing a simple, lucrative method for renting and managing properties, making their aspirations come true.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Image Content */}
                    <div className="w-full lg:w-1/2 relative">
                        <FadeIn direction="left">
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/images/about/Rectangle 103.png"
                                    alt="Tobiloba Oyelakin, CEO"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                                    <h4 className="text-xl font-bold">Tobiloba Oyelakin</h4>
                                    <p className="text-sm opacity-90">CEO, Help2Home</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
