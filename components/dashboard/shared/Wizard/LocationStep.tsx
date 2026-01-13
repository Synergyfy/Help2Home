'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormContext, useWatch } from 'react-hook-form';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { PropertySchema } from '@/lib/validations/propertySchema';
import 'leaflet/dist/leaflet.css';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function LocationStep() {
    const { register, setValue, control } = useFormContext<PropertySchema>();

    const street = useWatch({ control, name: 'address.street' });
    const city = useWatch({ control, name: 'address.city' });
    const state = useWatch({ control, name: 'address.state' });

    const [coords, setCoords] = useState<[number, number]>([6.5244, 3.3792]);

    const inputClasses = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[#111811] focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all placeholder:text-gray-400 shadow-sm";
    const labelClasses = "block text-sm font-bold text-[#111811] mb-2";
    const cardClasses = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8";

    // Logic: Geocoding
    useEffect(() => {
        const fullAddress = `${street || ''} ${city || ''} ${state || ''}`.trim();
        if (fullAddress.length < 5) return;

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`);
                const data = await res.json();
                if (data && data[0]) {
                    setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                }
            } catch (error) {
                console.error("Geocoding failed", error);
            }
        }, 1200);
        return () => clearTimeout(timer);
    }, [street, city, state]);

    return (
        <div className="max-w-4xl mx-auto pt-4">
            <section className={cardClasses}>
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlineMapPin size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">Property Location</h2>
                        <p className="text-sm text-gray-500">Provide the pin-point address details.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="md:col-span-2">
                        <label className={labelClasses}>Street Address</label>
                        <input
                            {...register('address.street')}
                            className={inputClasses}
                            placeholder="e.g., 123 Real Estate Ave, Phase 1"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>City</label>
                        <input
                            {...register('address.city')}
                            className={inputClasses}
                            placeholder="e.g., Lekki"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>State</label>
                        <input
                            {...register('address.state')}
                            className={inputClasses}
                            placeholder="e.g., Lagos"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Interactive Map Preview</p>
                        <p className="text-[10px] text-brand-green font-bold">Auto-pin enabled</p>
                    </div>
                    <div className="rounded-4xl overflow-hidden border-4 border-gray-50 shadow-inner h-[400px] w-full relative z-0">
                        <PropertyMap position={coords} />
                    </div>
                    <p className="text-xs text-center text-gray-400 italic mt-4">
                        We use the address above to automatically pinpoint your property on the map.
                    </p>
                </div>
            </section>
        </div>
    );
}
