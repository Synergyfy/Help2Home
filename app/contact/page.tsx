import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
    title: 'Contact Us - Help2Home',
    description: 'Get in touch with Help2Home for support, inquiries, or feedback.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
            {/* Left Column - Visual */}
            <div className="lg:w-1/2 bg-[#005C29] relative flex items-center justify-center p-12 min-h-[400px] lg:min-h-screen">
                <div className="relative z-10 w-full max-w-lg">
                    <FadeIn>
                        <div className="relative aspect-[3/4] w-full transform scale-110 lg:tranbrand-green-x-12">
                            <Image
                                src="/assets/contact/phone-illustration.png"
                                alt="Contact Help2Home"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-20 relative z-20">
                <div className="w-full max-w-lg">
                    <FadeIn delay={0.2}>
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Contact Us
                            </h1>
                            <p className="text-lg text-gray-600">
                                Need Support? Do not hesitate to send us a message
                            </p>
                        </div>

                        <ContactForm />
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
