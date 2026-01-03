import type { PropertyCategory, OwnershipType, AddedTimeframe } from "@/store/marketplaceStore";

import Img1 from '@/assets/alexander-andrews-A3DPhhAL6Zg-unsplash(1).jpg'
import Img2 from '@/About us assets/heroImg.jpg'

export type Property = {
  id: number;
  title: string;
  description: string;
  propertyType: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own';
  category: PropertyCategory; 
  address: string;
  location: string;
  city: string;
  state: string;
  postcode?: string;
  images: string[];

  // --- Specifications ---
  bedrooms: number;
  bathrooms: number;
  floorSize?: number;

  // --- Amenities ---
  furnished?: boolean;
  parking?: boolean;
  garden?: boolean;
  pool?: boolean;
  gym?: boolean;
  balcony?: boolean;

  // --- Financials ---
  price: number; 
  monthlyPrice?: number;
  deposit?: number;
  fees?: number;
  currency?: string;

  serviced?: boolean;
  electricity?: boolean;
  waterSupply?: boolean;
  security?: boolean;
  
  // --- Search Flags ---
  isOffPlan: boolean;     
  isNewBuild: boolean;

  // --- Status & Search Flags ---
  featured: boolean;
  verified: boolean;
  isNew: boolean;        
  availableFrom?: string;
  status?: 'available' | 'sold' | 'let-agreed';
  keywords?: string[];
  
  // --- Map/Radius Data ---
  latitude?: number;
  longitude?: number;

  // --- Agent & Agency Info ---
  agentName?: string;
  agentContact?: string;
  agency?: string;

  // --- Location Insights ---
  schoolsNearby?: string[];
  transportLinks?: string[];

  // --- Zoopla-Style Extended Metadata ---
  ownership: OwnershipType; 
  dateAdded: string;        
  listingAge: AddedTimeframe; 
  isRetirementHome: boolean;
  isSharedOwnership: boolean;
  isAuction: boolean;
  isChainFree: boolean;
  hasReducedPrice: boolean;
  isUnderOffer: boolean;
};

export let mockProperties: Property[] = [
  {
    id: 1,
    title: "The Glass House - 5 Bed Detached",
    description: "A breathtaking smart home with a private cinema and elevator.",
    propertyType: 'buy',
    category: 'residential-properties-for-sale',
    address: "Banana Island",
    location: "Ikoyi",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 5,
    bathrooms: 6,
    floorSize: 1200,
    price: 1500000000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: false,
    isNewBuild: true,
    pool: true,
    gym: true,
    garden: true,
    parking: true,
    balcony: true,
    serviced: true,
    electricity: true,
    waterSupply: true,
    security: true,
    status: 'available',
    ownership: 'freehold',
    dateAdded: "2023-12-28T10:00:00Z",
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    keywords: ['luxury', 'automated', 'waterfront']
  },
  {
    id: 2,
    title: "Apex Corporate Plaza",
    description: "Modern office complex with open-plan floors in CBD.",
    propertyType: 'buy',
    category: 'commercial-properties-for-sale',
    address: "Adetokunbo Ademola",
    location: "Wuse 2",
    city: "Abuja",
    state: "FCT",
    images: [Img2.src,Img1.src],
    bedrooms: 0,
    bathrooms: 10,
    floorSize: 2500,
    price: 2800000000,
    featured: true,
    verified: false, 
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    parking: true,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-20T08:00:00Z",
    listingAge: '14d',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: true,
    isChainFree: false,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 3,
    title: "3 Bedroom Modern Terrace",
    description: "Spacious terrace house in a gated, secure community.",
    propertyType: 'rent',
    category: 'residential-properties-to-rent',
    address: "Orchid Road",
    location: "Lekki",
    city: "Lagos",
    state: "Lagos",
    images: [Img2.src,Img1.src],
    bedrooms: 3,
    bathrooms: 3,
    price: 4500000,
    monthlyPrice: 375000,
    featured: false,
    verified: true,
    isNew: true,
    isOffPlan: false,
    isNewBuild: true,
    garden: true,
    parking: true,
    electricity: true,
    waterSupply: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-25T12:00:00Z",
    listingAge: '3d',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 4,
    title: "Luxury Studio for Students",
    description: "Newly built self-contain with stable power near campus.",
    propertyType: 'rent',
    category: 'student-properties-to-rent',
    address: "Akoka Road",
    location: "Yaba",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 1,
    bathrooms: 1,
    price: 1200000,
    monthlyPrice: 100000,
    featured: false,
    verified: false, // Changed to false for testing
    isNew: true,
    isOffPlan: false,
    isNewBuild: true,
    electricity: true,
    waterSupply: true,
    security: false,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-11-30T10:00:00Z",
    listingAge: 'anytime',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: false,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 5,
    title: "VI Executive Staff Quarters",
    description: "8-bedroom mansion kitted for corporate housing.",
    propertyType: 'rent',
    category: 'corporate-properties-to-rent',
    address: "Adeola Odeku",
    location: "VI",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 8,
    bathrooms: 8,
    price: 35000000,
    monthlyPrice: 2900000,
    furnished: true,
    featured: true,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    pool: true,
    gym: true,
    parking: true,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-27T08:00:00Z",
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: false,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 6,
    title: "The Penthouse Short-Let",
    description: "Panoramic city views with 24/7 concierge and power.",
    propertyType: 'service-apartment',
    category: 'apartment',
    address: "Maitama Hills",
    location: "Maitama",
    city: "Abuja",
    state: "FCT",
    images: [Img1.src,Img2.src],
    bedrooms: 2,
    bathrooms: 2,
    price: 150000,
    monthlyPrice: 4000000,
    furnished: true,
    featured: true,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    pool: true,
    balcony: true,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-28T09:00:00Z",
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 7,
    title: "Family Home - Rent to Own",
    description: "Start paying for your home today with our flexible scheme.",
    propertyType: 'rent-to-own',
    category: 'semi-detached',
    address: "Ibeju-Lekki",
    location: "Epe",
    city: "Lagos",
    state: "Lagos",
    images: [Img2.src,Img1.src],
    bedrooms: 3,
    bathrooms: 3,
    price: 65000000,
    monthlyPrice: 450000,
    deposit: 5000000,
    featured: false,
    verified: true,
    isNew: true,
    isOffPlan: true, 
    isNewBuild: true,
    garden: true,
    electricity: false,
    waterSupply: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-26T10:00:00Z",
    listingAge: '3d',
    isRetirementHome: false,
    isSharedOwnership: true,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 8,
    title: "High-Rise Development Site",
    description: "Commercial land with architectural plans for corporate towers.",
    propertyType: 'buy',
    category: 'corporate-properties-for-sale',
    address: "Central Business District",
    location: "CBD",
    city: "Abuja",
    state: "FCT",
    images: [Img1.src,Img2.src],
    bedrooms: 0,
    bathrooms: 0,
    floorSize: 5000,
    price: 4500000000,
    featured: false,
    verified: false, 
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    electricity: true,
    status: 'available',
    ownership: 'freehold',
    dateAdded: "2023-10-15T08:00:00Z",
    listingAge: 'anytime',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: false,
    hasReducedPrice: false,
    isUnderOffer: false
  },
  {
    id: 9,
    title: "Eko Atlantic Waterfront Studio",
    description: "Premium studio for expatriates and short-term business stay.",
    propertyType: 'service-apartment',
    category: 'short-term',
    address: "Eko Atlantic City",
    location: "VI",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 1,
    bathrooms: 1,
    price: 95000,
    monthlyPrice: 2500000,
    furnished: true,
    featured: false,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    pool: true,
    gym: true,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: "2023-12-21T11:00:00Z",
    listingAge: '7d',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: false,
    hasReducedPrice: true,
    isUnderOffer: false
  },
  {
    id: 10,
    title: "Serene Gwarinpa Bungalow",
    description: "Peaceful retirement bungalow with a massive garden.",
    propertyType: 'buy',
    category: 'family-home',
    address: "Estate Road 2",
    location: "Gwarinpa",
    city: "Abuja",
    state: "FCT",
    images: [Img1.src,Img2.src],
    bedrooms: 4,
    bathrooms: 3,
    price: 85000000,
    featured: false,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    garden: true,
    parking: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'freehold',
    dateAdded: "2023-09-01T08:00:00Z",
    listingAge: 'anytime',
    isRetirementHome: true,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false
  }
];

export const updateMockDb = (newData: Property[]) => {
  mockProperties = newData;
};

export const addPropertyToMockDb = (property: Property) => {
  mockProperties = [property, ...mockProperties];
};