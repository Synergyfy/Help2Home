'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiCheckCircle, HiOutlineMail, HiOutlinePhone, HiOutlineGlobeAlt, HiOutlineArrowRight } from 'react-icons/hi';
import FadeIn from '@/components/FadeIn';

const developers = [
    {
        id: 1,
        name: "Lagos Luxury Developments",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop",
        description: "Specializing in high-end residential towers in Ikoyi and Victoria Island. Known for the 'Glass House' series.",
        projects: 12,
        verified: true,
        email: "info@lagosluxury.com",
        phone: "+234 800 LUXURY",
        website: "www.lagosluxury.com",
        rating: 4.9
    },
    {
        id: 2,
        name: "Abuja Urban Planners",
        logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=200&h=200&auto=format&fit=crop",
        description: "Innovative commercial space developers focusing on Maitama and Central Business District developments.",
        projects: 8,
        verified: true,
        email: "contact@abujaurban.com",
        phone: "+234 811 ABUJA",
        website: "www.abujaurban.com",
        rating: 4.7
    },
    {
        id: 3,
        name: "Eko Atlantic Creators",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&h=200&auto=format&fit=crop",
        description: "The primary developers for the waterfront districts of Eko Atlantic City. Smart city pioneers.",
        projects: 24,
        verified: true,
        email: "hello@ekoatlantic.com",
        phone: "+234 900 EKO",
        website: "www.ekoatlantic.com",
        rating: 4.8
    }
];

export default function FindDevelopersPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                    alt="Modern Real Estate Development"
                    fill
                    className="object-cover brightness-[0.3]"
                />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <FadeIn direction="up">
                        <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Help2Home Partnership</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Partner With Top Developers</h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">Connect with West Africa&apos;s most trusted real estate developers for your next investment or dream home.</p>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {developers.map((dev, index) => (
                        <FadeIn key={dev.id} delay={index * 0.1} direction="up">
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-50 hover:border-brand-green/30 transition-all group h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                        <Image
                                            src={dev.logo}
                                            alt={dev.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {dev.verified && (
                                        <span className="bg-brand-green/10 text-brand-green text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                            <HiCheckCircle size={14} /> Verified
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-brand-green transition-colors">{dev.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">{dev.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Projects</p>
                                        <p className="text-lg font-black text-gray-900">{dev.projects}+</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rating</p>
                                        <p className="text-lg font-black text-brand-green">{dev.rating}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <HiOutlineMail className="text-brand-green" />
                                        <span>{dev.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <HiOutlinePhone className="text-brand-green" />
                                        <span>{dev.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <HiOutlineGlobeAlt className="text-brand-green" />
                                        <span>{dev.website}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-gray-900 text-white hover:bg-brand-green py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn">
                                    View Portfolio <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Developer CTA */}
                <FadeIn direction="up" delay={0.4}>
                    <div className="mt-20 bg-brand-green rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-green/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Are You a Developer?</h2>
                            <p className="text-green-50 max-w-xl mx-auto mb-10 text-lg opacity-90">Join Help2Home&apos;s exclusive developer network and showcase your premium projects to thousands of qualified leads.</p>
                            <button className="bg-white text-brand-green px-10 py-5 rounded-2xl font-black hover:bg-green-50 transition-all shadow-xl uppercase tracking-widest text-sm">
                                Register Your Agency
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
