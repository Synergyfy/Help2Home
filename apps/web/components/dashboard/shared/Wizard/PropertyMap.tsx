'use client';

import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
}) : undefined;

const DEFAULT_CENTER: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria

export default function PropertyMap({ position }: { position: [number, number] }) {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    const isValid = position && !isNaN(position[0]) && !isNaN(position[1]);

    // Initial Mount
    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) return;

        // CRITICAL: Cleanup any existing instance on this DOM node before starting
        const container = containerRef.current;
        if ((container as any)._leaflet_id) {
            (container as any)._leaflet_id = null;
        }

        // Initialize Map
        const center = isValid ? position : DEFAULT_CENTER;
        const initialMap = L.map(container, {
            center: center,
            zoom: isValid ? 15 : 13,
            zoomControl: false,
            scrollWheelZoom: false,
            attributionControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(initialMap);

        if (isValid) {
            markerRef.current = L.marker(position, { icon: customIcon }).addTo(initialMap);
        }

        mapRef.current = initialMap;

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            if (markerRef.current) {
                markerRef.current = null;
            }
            if ((container as any)._leaflet_id) {
                (container as any)._leaflet_id = null;
            }
        };
    }, []);

    // Update Position
    useEffect(() => {
        if (!mapRef.current || !isValid) return;

        const map = mapRef.current;
        map.setView(position, 15, { animate: true });

        if (markerRef.current) {
            markerRef.current.setLatLng(position);
        } else if (customIcon) {
            markerRef.current = L.marker(position, { icon: customIcon }).addTo(map);
        }
    }, [position, isValid]);

    return (
        <div className="h-full w-full relative overflow-hidden rounded-xl">
            <div ref={containerRef} className="h-full w-full z-0" />

            {!isValid && isMounted && (
                <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center text-gray-400 z-[1000]">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm font-medium">Pinpointing location...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
