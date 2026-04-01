import { DeveloperProject, InvestmentCondition } from '@/types/developer';

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

// Mock developer data
const developers: Developer[] = [
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
      {
        id: 'p3',
        title: 'Lekki Seaside Villas',
        description: 'Beachfront luxury villas with private access',
        category: 'Residential',
        location: 'Lekki, Lagos',
        totalValue: 150000000,
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'],
        status: 'completed',
        investors: 20,
        fundingProgress: 100,
        investmentCondition: {
          id: 'ic3',
          propertyId: 'p3',
          minAmount: 15000000,
          maxAmount: 100000000,
          expectedROI: 20,
          timeline: 12,
          riskLevel: 'low',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 150000000,
          currentInvestmentSecured: 150000000,
          isActive: false,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-12-31T00:00:00Z',
        },
        timeline: [],
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-31T00:00:00Z',
      },
      {
        id: 'p4',
        title: 'Banana Island Residences',
        description: 'Ultra-luxury waterfront residences',
        category: 'Residential',
        location: 'Banana Island, Lagos',
        totalValue: 250000000,
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'],
        status: 'planning',
        investors: 0,
        fundingProgress: 0,
        investmentCondition: {
          id: 'ic4',
          propertyId: 'p4',
          minAmount: 20000000,
          maxAmount: 150000000,
          expectedROI: 28,
          timeline: 36,
          riskLevel: 'medium',
          paymentSchedule: 'annual',
          totalInvestmentTarget: 250000000,
          currentInvestmentSecured: 0,
          isActive: true,
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: '2024-03-01T00:00:00Z',
        },
        timeline: [],
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z',
      },
    ],
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

// Helper functions
export function getAllDevelopers(): Developer[] {
  return developers;
}

export function getDeveloperById(id: string): Developer | undefined {
  return developers.find(dev => dev.id === id);
}

export function getVerifiedDevelopers(): Developer[] {
  return developers.filter(dev => dev.verified);
}

export function searchDevelopers(query: string): Developer[] {
  const lowerQuery = query.toLowerCase();
  return developers.filter(dev => 
    dev.name.toLowerCase().includes(lowerQuery) ||
    dev.description.toLowerCase().includes(lowerQuery) ||
    dev.location.toLowerCase().includes(lowerQuery)
  );
}

export function filterDevelopersByLocation(location: string): Developer[] {
  return developers.filter(dev => 
    dev.location.toLowerCase().includes(location.toLowerCase())
  );
}

export function filterDevelopersByRating(minRating: number): Developer[] {
  return developers.filter(dev => dev.rating >= minRating);
}
