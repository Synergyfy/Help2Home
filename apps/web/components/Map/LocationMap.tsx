"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type PropertyLoc = {
    id: number;
    title: string;
    latitude?: number;
    longitude?: number;
    price: number;
    images: string[];
    slug?: string; // or id for link
    currency?: string;
};

interface LocationMapProps {
    properties: PropertyLoc[];
    center?: [number, number];
    zoom?: number;
}

// Component to update map view when properties change
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function LocationMap({ properties, center = [6.4549, 3.4246], zoom = 13 }: LocationMapProps) {
    // Filter properties that have coordinates
    const validProperties = properties.filter(p => p.latitude && p.longitude);

    return (
        <div className="h-full w-full relative z-0">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={center} zoom={zoom} />

                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latitude!, property.longitude!]}
                        icon={customIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="w-[200px] p-1">
                                <div className="relative h-24 w-full rounded-md overflow-hidden mb-2">
                                    <Image
                                        src={property.images[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                                <p className="text-brand-green font-bold text-sm">
                                    {property.currency || '₦'}{property.price.toLocaleString()}
                                </p>
                                <Link
                                    href={`/marketplace/${property.id}`}
                                    className="block mt-2 text-center bg-gray-900 text-white text-xs py-1.5 rounded hover:bg-brand-green transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
