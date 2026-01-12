'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
}) : undefined;

function RecenterMap({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, 15, { animate: true });
        }
    }, [position, map]);
    return null;
}

export default function PropertyMap({ position }: { position: [number, number] }) {
    // Basic validation to prevent map crashes on null coords
    if (!position || isNaN(position[0]) || isNaN(position[1])) return null;

    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false} // Cleaner UI for onboarding
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon} />
            <RecenterMap position={position} />
        </MapContainer>
    );
}