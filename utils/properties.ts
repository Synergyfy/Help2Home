import type { PropertyCategory, OwnershipType, AddedTimeframe } from "@/store/marketplaceStore";
import { DeveloperProject, InvestmentCondition } from '@/types/developer';
import Img1 from '@/assets/alexander-andrews-A3DPhhAL6Zg-unsplash(1).jpg'
import Img2 from '@/About us assets/heroImg.jpg'

export type Property = {
  id: number;
  title: string;
  description: string;
  propertyType: 'rent' | 'buy' | 'service-apartment' | 'rent-to-own' | 'invest';
  category: PropertyCategory; 
  address: string;
  location: string;
  city: string;
  state: string;
  postcode?: string;
  images: string[];
  createdBy?: string;
  posterRole: 'landlord' | 'agent' | 'caretaker' | 'developer';
  listerName?: string;
  listerImage?: string;
  listerVerified?: boolean;
  videoUrl?: string;
  floorPlanUrl?: string;

  // --- Specifications ---
  bedrooms: number;
  bathrooms: number;
  floorSize?: number;

  // --- Amenities ---
  amenities?: (string | { name: string; price: number })[]; 
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
  isInstallmentAllowed?: boolean;
  serviceCharge?: number;
  installmentConfig?: {
    depositPercent?: number;
    period?: string;
  };
  interestRate?: number;
  isInterestEnabled?: boolean;

  serviced?: boolean;
  electricity?: boolean;
  waterSupply?: boolean;
  security?: boolean;
  installments?: {
    enabled: boolean;
    interestRate?: number;
  };
  
  // --- Status & Analytics ---
  featured: boolean;
  verified: boolean;
  isNew: boolean;         
  availableFrom?: string;
  status?: 'available' | 'sold' | 'let-agreed' | 'draft';
  keywords?: string[];
  views?: number;
  inquiries?: number;
  
  // --- Search Flags ---
  isOffPlan: boolean;     
  isNewBuild: boolean;

  // --- Billing ---
  billingCycle?: 'day' | 'week' | 'month' | 'year';

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
  communityLink?: string;
  investmentTerms?: {
    enabled: boolean;
    roi: number;
    duration: number; // in months
    minInvestment: number;
    maxInvestment?: number;
    roiFrequency: 'monthly' | 'quarterly' | 'annually';
    riskLevel: 'Low' | 'Medium' | 'High';
    timeline?: string;
    expectedReturn?: string;
  };
};

export interface Developer {
  id: string;
  name: string;
  logo: string;
  description: string;
  verified: boolean;
  email: string;
  phone: string;
  office: string;
  website: string;
  location: string;
  totalProjects: number;
  activeProjects: number;
  yearsActive: number;
  rating: number;
  projects: DeveloperProject[];
}

export const initialProperties: Property[] = [
  {
    id: 1,
    title: "The Glass House - 5 Bed Detached",
    description: "A breathtaking smart home with a private cinema and elevator.",
    propertyType: 'buy',
    category: 'residential-properties-for-sale',
    address: "Banana Island",
    location: "Ikoyi",
    latitude: 6.4549,
    longitude: 3.4246,
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src, Img2.src],
    bedrooms: 5,
    bathrooms: 6,
    floorSize: 1200,
    price: 1500000000,
    currency: 'NGN',
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
    keywords: ['luxury', 'automated', 'waterfront'],
    amenities: [
      { name: 'Legal Fees (Standard)', price: 30000000 },
      { name: 'Private Garden', price: 150000 },
      { name: 'Ample Parking', price: 50000 },
      { name: '24/7 Security', price: 100000 },
      { name: 'Private Cinema', price: 500000 },
      { name: 'Smart Home System', price: 300000 },
      { name: 'Elevator', price: 400000 },
      { name: 'Wine Cellar', price: 200000 }
    ],
    isInstallmentAllowed: true,
    serviceCharge: 0,
    views: 1240,
    inquiries: 18,
    posterRole: 'landlord',
    listerName: "Chief Lawrence Okoro",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=lawrence"
  },
  {
    id: 2,
    title: "Apex Corporate Plaza",
    description: "Modern office complex with open-plan floors in CBD.",
    propertyType: 'buy',
    category: 'commercial-properties-for-sale',
    address: "Adetokunbo Ademola",
    location: "Wuse 2",
    latitude: 9.0765,
    longitude: 7.4726,
    city: "Abuja",
    state: "FCT",
    images: [Img2.src, Img1.src],
    bedrooms: 0,
    bathrooms: 10,
    floorSize: 2500,
    price: 2800000000,
    currency: 'NGN',
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
    isUnderOffer: false,
    amenities: [
      { name: 'Legal Fees (Standard)', price: 140000000 },
      { name: 'Fiber Optic Internet', price: 75000 },
      { name: 'CCTV Security', price: 120000 },
      { name: 'Central AC', price: 250000 },
      { name: 'Ample Parking', price: 100000 }
    ],
    isInstallmentAllowed: false,
    views: 850,
    inquiries: 5,
    posterRole: 'agent',
    listerName: "Musa Ibrahim",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=musa"
  },
  {
    id: 3,
    title: "3 Bedroom Modern Terrace",
    description: "Spacious terrace house in a gated, secure community.",
    propertyType: 'rent',
    category: 'residential-properties-to-rent',
    address: "Orchid Road",
    location: "Lekki",
    latitude: 6.4500,
    longitude: 3.4600,
    city: "Lagos",
    state: "Lagos",
    images: [Img2.src,Img1.src],
    bedrooms: 3,
    bathrooms: 3,
    price: 4500000,
    currency: 'NGN',
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
    isUnderOffer: false,
    amenities: [
        { name: 'Service Charge', price: 150000 },
        { name: 'Legal Fees (Standard)', price: 450000 },
        { name: 'Tenancy Agreement', price: 450000 },
        { name: '24/7 Security', price: 45000 },
        { name: 'Ample Parking', price: 20000 },
        { name: 'Stable Electricity', price: 60000 },
        { name: 'Water Treatment', price: 35000 }
    ],
    serviceCharge: 0,
    isInstallmentAllowed: false,
    interestRate: 15,
    isInterestEnabled: true,
    posterRole: 'caretaker',
    listerName: "Sarah Adeniran",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 4,
    title: "Luxury Studio for Students",
    description: "Newly built self-contain with stable power near campus.",
    propertyType: 'rent',
    category: 'student-properties-to-rent',
    address: "Akoka Road",
    location: "Yaba",
    latitude: 6.5173,
    longitude: 3.3903,
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 1,
    bathrooms: 1,
    price: 1200000,
    monthlyPrice: 100000,
    featured: false,
    verified: false, 
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
    isUnderOffer: false,
    amenities: [
        { name: 'Service Charge', price: 50000 },
        { name: 'Legal Fees (Standard)', price: 120000 },
        { name: 'Tenancy Agreement', price: 120000 },
        { name: 'Power Backup', price: 40000 },
        { name: 'Water Supply', price: 15000 },
        { name: 'Security Patrol', price: 25000 },
        { name: 'Waste Disposal', price: 10000 }
    ],
    serviceCharge: 0,
    isInstallmentAllowed: false,
    posterRole: 'agent',
    listerName: "Samuel Nwosu",
    listerVerified: false,
    listerImage: "https://i.pravatar.cc/150?u=samuel"
  },
  {
    id: 5,
    title: "VI Executive Staff Quarters",
    description: "8-bedroom mansion kitted for corporate housing.",
    propertyType: 'rent',
    category: 'corporate-properties-to-rent',
    address: "Adeola Odeku",
    location: "VI",
    latitude: 6.4281,
    longitude: 3.4219,
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
    isUnderOffer: false,
    amenities: [
        { name: 'Service Charge', price: 2500000 },
        { name: 'Legal Fees (Standard)', price: 3500000 },
        { name: 'Tenancy Agreement', price: 3500000 },
        { name: '24/7 Elite Security', price: 500000 },
        { name: 'Executive Lounge', price: 1000000 }
    ],
    serviceCharge: 0,
    isInstallmentAllowed: false,
    interestRate: 20,
    isInterestEnabled: true,
    posterRole: 'landlord',
    listerName: "Madam Ngozi",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=ngozi"
  },
  {
    id: 6,
    title: "The Penthouse Short-Let",
    description: "Panoramic city views with 24/7 concierge and power.",
    propertyType: 'service-apartment',
    category: 'apartment',
    address: "Maitama Hills",
    location: "Maitama",
    latitude: 9.0882,
    longitude: 7.4934,
    city: "Abuja",
    state: "FCT",
    images: [Img1.src, Img2.src],
    bedrooms: 2,
    bathrooms: 2,
    price: 150000,
    billingCycle: 'day',
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
    isUnderOffer: false,
    amenities: [
      { name: 'Caution Deposit (Refundable)', price: 50000 },
      { name: 'Cleaning Fee', price: 15000 },
      { name: 'Concierge Service', price: 25000 }
    ],
    isInstallmentAllowed: false,
    posterRole: 'caretaker',
    listerName: "Benson Ogundipe",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=benson"
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
    isUnderOffer: false,
    amenities: [
        { name: 'Processing Fee', price: 250000 },
        { name: 'Legal Fees (Standard)', price: 1500000 }
    ],
    isInstallmentAllowed: true,
    posterRole: 'agent',
    listerName: "Grace Emeka",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=grace",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
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
    isUnderOffer: false,
    amenities: [
        { name: 'Agency Fee', price: 225000000 },
        { name: 'Legal Fees (Standard)', price: 225000000 }
    ],
    isInstallmentAllowed: false,
    posterRole: 'caretaker',
    listerName: "Philip Adams",
    listerVerified: false,
    listerImage: "https://i.pravatar.cc/150?u=philip"
  },
  {
    id: 9,
    title: "Eko Atlantic Waterfront Studio",
    description: "Premium studio for expatriates and short-term business stay.",
    propertyType: 'service-apartment',
    category: 'short-term',
    address: "Eko Atlantic City",
    location: "VI",
    latitude: 6.4167,
    longitude: 3.4000,
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src,Img2.src],
    bedrooms: 1,
    bathrooms: 1,
    price: 95000,
    billingCycle: 'day',
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
    isUnderOffer: false,
    amenities: [
        { name: 'Security Deposit', price: 50000 },
        { name: 'Cleaning Fee', price: 10000 }
    ],
    isInstallmentAllowed: false,
    posterRole: 'landlord',
    listerName: "Chief Dr. Ezeribe",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=ezeribe",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    floorPlanUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "Serene Gwarinpa Bungalow",
    description: "Peaceful retirement bungalow with a massive garden.",
    propertyType: 'buy',
    category: 'residential-properties-for-sale',
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
    isUnderOffer: false,
    amenities: [
        { name: 'Legal Fees (Standard)', price: 4250000 },
        { name: 'Agency Fee', price: 4250000 }
    ],
    isInstallmentAllowed: false,
    posterRole: 'agent',
    listerName: "Tunde Bakare",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=tunde"
  },
  {
    id: 15,
    title: "Lekki Luxury Serviced Suite",
    description: "Premium fully serviced apartment with 24/7 power and security.",
    propertyType: 'service-apartment',
    category: 'luxury',
    address: "Admiralty Way",
    location: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800'],
    bedrooms: 2,
    bathrooms: 2,
    price: 120000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: false,
    isNewBuild: false,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'agent',
    listerName: "Grace Emeka",
    amenities: [
      { name: 'Cleaning Service', price: 5000 },
      { name: 'Internet', price: 2000 }
    ]
  },
  {
    id: 16,
    title: "Eco-Friendly Rent-to-Own Semi-D",
    description: "Modern semi-detached house with solar power, available on rent-to-own.",
    propertyType: 'rent-to-own',
    category: 'semi-detached',
    address: "Green Estate",
    location: "Ibeju Lekki",
    city: "Lagos",
    state: "Lagos",
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800'],
    bedrooms: 3,
    bathrooms: 3,
    price: 45000000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: false,
    isNewBuild: true,
    garden: true,
    electricity: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: true,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'developer',
    listerName: "Green Build Collective"
  },
  {
    id: 17,
    title: "Central Abuja Business Studio",
    description: "Perfect for business travelers, located in the CBD.",
    propertyType: 'service-apartment',
    category: 'corporate',
    address: "CBD Towers",
    location: "CBD",
    city: "Abuja",
    state: "FCT",
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'],
    bedrooms: 1,
    bathrooms: 1,
    price: 85000,
    featured: false,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: new Date().toISOString(),
    listingAge: '3d',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'agent',
    listerName: "Samuel Nwosu"
  },
  {
    id: 18,
    title: "Spacious 4 Bed Detached - Sale",
    description: "Beautiful family home in a quiet neighborhood.",
    propertyType: 'buy',
    category: 'residential-properties-for-sale',
    address: "Kuje Road",
    location: "Kuje",
    city: "Abuja",
    state: "FCT",
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800'],
    bedrooms: 4,
    bathrooms: 4,
    price: 45000000,
    featured: false,
    verified: true,
    isNew: false,
    isOffPlan: false,
    isNewBuild: false,
    garden: true,
    parking: true,
    status: 'available',
    ownership: 'freehold',
    dateAdded: new Date().toISOString(),
    listingAge: 'anytime',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'agent',
    listerName: "Tunde Bakare"
  },
  {
    id: 19,
    title: "Luxury 2 Bed Apartment - Rent",
    description: "Modern apartment with all amenities in a prime location.",
    propertyType: 'rent',
    category: 'residential-properties-to-rent',
    address: "Bourdillon Road",
    location: "Ikoyi",
    city: "Lagos",
    state: "Lagos",
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800'],
    bedrooms: 2,
    bathrooms: 2,
    price: 8000000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: false,
    isNewBuild: false,
    serviced: true,
    electricity: true,
    security: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'landlord',
    listerName: "Madam Ngozi"
  },
  {
    id: 11,
    createdBy: 'user_clt02landlord002', // Lawrence Landlord
    title: "The Glass House - 5 Bed Detached",
    description: "A breathtaking smart home with a private cinema and elevator.",
    propertyType: 'buy', 
    category: 'residential-properties-for-sale',
    address: "Banana Island",
    location: "Ikoyi",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src, Img2.src],
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
    keywords: ['luxury', 'automated', 'waterfront'],
    amenities: [
        { name: 'Legal Fees (Standard)', price: 30000000 },
        { name: 'Smart Home Hub', price: 150000 }
    ],
    isInstallmentAllowed: true,
    posterRole: 'landlord',
    listerName: "Chief Lawrence Okoro",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=lawrence"
  },
  {
    id: 12,
    createdBy: 'user_clt02landlord002', // Lawrence Landlord
    title: "3 Bedroom Modern Terrace",
    description: "Spacious terrace house in a gated, secure community.",
    propertyType: 'rent', 
    category: 'residential-properties-to-rent',
    address: "Orchid Road",
    location: "Lekki",
    city: "Lagos",
    state: "Lagos",
    images: [Img2.src, Img1.src],
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
    isUnderOffer: false,
    amenities: [
        { name: 'Service Charge', price: 200000 },
        { name: 'Legal Fees (Standard)', price: 450000 },
        { name: 'Tenancy Agreement', price: 450000 }
    ],
    isInstallmentAllowed: false,
    posterRole: 'landlord',
    listerName: "Chief Lawrence Okoro",
    listerVerified: true,
    listerImage: "https://i.pravatar.cc/150?u=lawrence"
  },
  {
    id: 13,
    title: "Zenith Heights - Investment",
    description: "High-yield residential development plot in the heart of Lekki. Perfect for passive investors.",
    propertyType: 'invest',
    category: 'residential-properties-for-sale',
    address: "Lekki Phase 1",
    location: "Lekki",
    city: "Lagos",
    state: "Lagos",
    images: [Img1.src, Img2.src],
    bedrooms: 0,
    bathrooms: 0,
    price: 50000000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: true,
    isNewBuild: true,
    status: 'available',
    ownership: 'freehold',
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'developer',
    listerName: "Zenith Developments",
    investmentTerms: {
        enabled: true,
        roi: 25,
        duration: 18,
        minInvestment: 5000000,
        roiFrequency: 'annually',
        riskLevel: 'Low',
        timeline: '18 Months',
        expectedReturn: '25% APY'
    }
  },
  {
    id: 14,
    title: "Eco-Tech Park Abuja",
    description: "Participate in the development of Abuja's first sustainable tech hub. Guaranteed buy-back after 2 years.",
    propertyType: 'invest',
    category: 'commercial-properties-for-sale',
    address: "Central Business District",
    location: "CBD",
    city: "Abuja",
    state: "FCT",
    images: [Img2.src],
    bedrooms: 0,
    bathrooms: 0,
    price: 150000000,
    featured: true,
    verified: true,
    isNew: true,
    isOffPlan: true,
    isNewBuild: true,
    status: 'available',
    ownership: 'leasehold',
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    isRetirementHome: false,
    isSharedOwnership: false,
    isAuction: false,
    isChainFree: true,
    hasReducedPrice: false,
    isUnderOffer: false,
    posterRole: 'developer',
    listerName: "GreenTech Infra",
    investmentTerms: {
        enabled: true,
        roi: 30,
        duration: 24,
        minInvestment: 10000000,
        roiFrequency: 'annually',
        riskLevel: 'Medium',
        timeline: '24 Months',
        expectedReturn: '30% Fixed'
    }
  }
];

const STORAGE_KEY = 'help2home_properties_db_v1';
export let mockProperties: Property[] = [...initialProperties];

// Mock developer data
export const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Lagos Luxury Developments',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Building sustainable and luxury homes across Nigeria for over 15 years. Dedicated to quality, innovative architecture, and community-focused living.',
    verified: true,
    email: 'info@lagosluxury.com',
    phone: '+234 800 LUXURY',
    office: '15 Adeola Odeku Street, Victoria Island, Lagos',
    website: 'www.lagosluxury.com',
    location: 'Lagos, Nigeria',
    totalProjects: 25,
    activeProjects: 15,
    yearsActive: 15,
    rating: 4.9,
    projects: [
      {
        id: 'p1',
        title: 'Ikoyi Heights',
        description: 'Luxury residential towers with panoramic city views',
        category: 'Residential',
        location: 'Ikoyi, Lagos',
        totalValue: 85000000,
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'],
        status: 'in-progress',
        investors: 12,
        fundingProgress: 65,
        investmentCondition: {
          id: 'ic1',
          propertyId: 'p1',
          minAmount: 5000000,
          maxAmount: 50000000,
          expectedROI: 22,
          timeline: 18,
          riskLevel: 'medium',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 85000000,
          currentInvestmentSecured: 55250000,
          isActive: true,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        },
        timeline: [
          {
            phase: 'Foundation',
            description: 'Site preparation and foundation work',
            startDate: '2024-01-01',
            endDate: '2024-06-30',
            status: 'completed',
            progress: 100,
          },
          {
            phase: 'Structure',
            description: 'Main building structure',
            startDate: '2024-07-01',
            endDate: '2025-03-31',
            status: 'in-progress',
            progress: 60,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 'p2',
        title: 'Victoria Island Plaza',
        description: 'Premium commercial and residential complex',
        category: 'Mixed-Use',
        location: 'Victoria Island, Lagos',
        totalValue: 120000000,
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'],
        status: 'fundraising',
        investors: 8,
        fundingProgress: 45,
        investmentCondition: {
          id: 'ic2',
          propertyId: 'p2',
          minAmount: 10000000,
          maxAmount: 80000000,
          expectedROI: 25,
          timeline: 24,
          riskLevel: 'low',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 120000000,
          currentInvestmentSecured: 54000000,
          isActive: true,
          createdAt: '2024-02-01T00:00:00Z',
          updatedAt: '2024-02-01T00:00:00Z',
        },
        timeline: [],
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
      },
    ]
  },
  {
    id: '2',
    name: 'Abuja Urban Planners',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Innovative commercial space developers focusing on Maitama and Central Business District developments. Creating modern workspaces and residential communities.',
    verified: true,
    email: 'contact@abujaurban.com',
    phone: '+234 811 ABUJA',
    office: '45 Cadastral Zone, Maitama, Abuja',
    website: 'www.abujaurban.com',
    location: 'Abuja, Nigeria',
    totalProjects: 18,
    activeProjects: 8,
    yearsActive: 12,
    rating: 4.7,
    projects: [
      {
        id: 'p5',
        title: 'Maitama Business Hub',
        description: 'State-of-the-art commercial complex',
        category: 'Commercial',
        location: 'Maitama, Abuja',
        totalValue: 95000000,
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'],
        status: 'in-progress',
        investors: 15,
        fundingProgress: 70,
        investmentCondition: {
          id: 'ic5',
          propertyId: 'p5',
          minAmount: 8000000,
          maxAmount: 60000000,
          expectedROI: 24,
          timeline: 20,
          riskLevel: 'medium',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 95000000,
          currentInvestmentSecured: 66500000,
          isActive: true,
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-10T00:00:00Z',
        },
        timeline: [],
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
      },
    ],
  },
  {
    id: '3',
    name: 'Eko Atlantic Creators',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'The primary developers for the waterfront districts of Eko Atlantic City. Smart city pioneers bringing world-class infrastructure and sustainable development.',
    verified: true,
    email: 'hello@ekoatlantic.com',
    phone: '+234 900 EKO',
    office: 'Eko Atlantic City, Lagos',
    website: 'www.ekoatlantic.com',
    location: 'Lagos, Nigeria',
    totalProjects: 32,
    activeProjects: 24,
    yearsActive: 18,
    rating: 4.8,
    projects: [
      {
        id: 'p6',
        title: 'Eko Pearl Towers',
        description: 'Iconic twin towers in the heart of Eko Atlantic',
        category: 'Mixed-Use',
        location: 'Eko Atlantic, Lagos',
        totalValue: 180000000,
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'],
        status: 'fundraising',
        investors: 18,
        fundingProgress: 55,
        investmentCondition: {
          id: 'ic6',
          propertyId: 'p6',
          minAmount: 12000000,
          maxAmount: 90000000,
          expectedROI: 26,
          timeline: 24,
          riskLevel: 'low',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 180000000,
          currentInvestmentSecured: 99000000,
          isActive: true,
          createdAt: '2024-02-15T00:00:00Z',
          updatedAt: '2024-02-15T00:00:00Z',
        },
        timeline: [],
        createdAt: '2024-02-15T00:00:00Z',
        updatedAt: '2024-02-15T00:00:00Z',
      },
    ],
  },
  {
    id: '4',
    name: 'Green Build Collective',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Eco-friendly residential developers specializing in sustainable architecture and green building practices across Nigeria.',
    verified: true,
    email: 'info@greenbuild.ng',
    phone: '+234 802 GREEN',
    office: '28 Admiralty Way, Lekki Phase 1, Lagos',
    website: 'www.greenbuild.ng',
    location: 'Lagos, Nigeria',
    totalProjects: 14,
    activeProjects: 8,
    yearsActive: 8,
    rating: 4.6,
    projects: [],
  },
  {
    id: '5',
    name: 'Heritage Homes Ltd',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Premium residential developers with a focus on family-oriented communities and quality craftsmanship.',
    verified: true,
    email: 'contact@heritagehomes.ng',
    phone: '+234 803 HERITAGE',
    office: '12 Opebi Road, Ikeja, Lagos',
    website: 'www.heritagehomes.ng',
    location: 'Lagos, Nigeria',
    totalProjects: 20,
    activeProjects: 12,
    yearsActive: 10,
    rating: 4.9,
    projects: [],
  },
  {
    id: '6',
    name: 'Apex Residential Group',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Leading developers of affordable luxury housing estates with modern amenities and excellent infrastructure.',
    verified: false,
    email: 'info@apexresidential.com',
    phone: '+234 805 APEX',
    office: '45 Allen Avenue, Ikeja, Lagos',
    website: 'www.apexresidential.com',
    location: 'Lagos, Nigeria',
    totalProjects: 16,
    activeProjects: 10,
    yearsActive: 7,
    rating: 4.5,
    projects: [],
  },
  {
    id: '7',
    name: 'Coastal Prime Realty',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Waterfront property specialists developing premium coastal residences and resort-style communities.',
    verified: true,
    email: 'hello@coastalprime.ng',
    phone: '+234 806 COAST',
    office: '8 Ligali Ayorinde Street, Victoria Island, Lagos',
    website: 'www.coastalprime.ng',
    location: 'Lagos, Nigeria',
    totalProjects: 11,
    activeProjects: 6,
    yearsActive: 9,
    rating: 4.2,
    projects: [],
  },
  {
    id: '8',
    name: 'Modern Living Co.',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=200&h=200&auto=format&fit=crop',
    description: 'Contemporary apartment developers creating smart living spaces with cutting-edge technology and design.',
    verified: true,
    email: 'info@modernliving.ng',
    phone: '+234 807 MODERN',
    office: '22 Awolowo Road, Ikoyi, Lagos',
    website: 'www.modernliving.ng',
    location: 'Lagos, Nigeria',
    totalProjects: 28,
    activeProjects: 18,
    yearsActive: 11,
    rating: 4.7,
    projects: [],
  },
];

let isInitialized = false;

const syncToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProperties));
    } catch (error) {
      console.error('Failed to save properties to storage:', error);
    }
  }
};

const loadFromStorage = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(`[PropertiesDB] Loaded ${parsed.length} properties from storage.`);
          mockProperties = parsed;
        } else {
             // Storage exists but is empty/invalid? fall back to default
             console.log('[PropertiesDB] Storage empty or invalid, using defaults.');
             syncToStorage();
        }
      } else {
        // First run: save defaults
        console.log('[PropertiesDB] First run, initializing storage with defaults.');
        syncToStorage();
      }
    } catch (error) {
      console.error('Failed to load properties from storage:', error);
    } finally {
      isInitialized = true;
    }
  }
};

export const updateMockDb = (newData: Property[]) => {
  mockProperties = newData;
  syncToStorage();
};

export const addPropertyToMockDb = (property: Property) => {
  // Ensure we are up to date before adding
  loadFromStorage();
  mockProperties = [property, ...mockProperties];
  syncToStorage();
};

// Helper functions
export function getAllDevelopers(): Developer[] {
  return mockDevelopers;
}

export function getDeveloperById(id: string): Developer | undefined {
  return mockDevelopers.find(dev => dev.id === id);
}

export function getVerifiedDevelopers(): Developer[] {
  return mockDevelopers.filter(dev => dev.verified);
}

export function searchDevelopers(query: string): Developer[] {
  const lowerQuery = query.toLowerCase();
  return mockDevelopers.filter(dev => 
    dev.name.toLowerCase().includes(lowerQuery) ||
    dev.description.toLowerCase().includes(lowerQuery) ||
    dev.location.toLowerCase().includes(lowerQuery)
  );
}

export function filterDevelopersByLocation(location: string): Developer[] {
  return mockDevelopers.filter(dev => 
    dev.location.toLowerCase().includes(location.toLowerCase())
  );
}

export function filterDevelopersByRating(minRating: number): Developer[] {
  return mockDevelopers.filter(dev => dev.rating >= minRating);
}

export const getMockProperties = () => {
  loadFromStorage();
  return mockProperties;
};

export const getPropertiesByLister = (listerName: string) => {
  return mockProperties.filter(p => p.listerName === listerName);
};

export const getListerInfo = (listerName: string) => {
  const property = mockProperties.find(p => p.listerName === listerName);
  if (!property) return null;
  return {
    name: property.listerName,
    image: property.listerImage,
    role: property.posterRole,
    verified: property.listerVerified,
    agency: property.agency,
    agentName: property.agentName
  };
};