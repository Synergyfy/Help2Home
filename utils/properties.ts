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
  createdBy?: string;
  posterRole: 'landlord' | 'agent' | 'caretaker';
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
};
const initialProperties: Property[] = [
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
    city: "Abuja",
    state: "FCT",
    images: [Img1.src, Img2.src],
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
];

const STORAGE_KEY = 'help2home_properties_db_v1';
export let mockProperties: Property[] = [...initialProperties];
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

export const getMockProperties = () => {
  loadFromStorage();
  return mockProperties;
};