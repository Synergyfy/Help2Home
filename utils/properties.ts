export type Property = {
  id: number;
  image: string;
  title: string;
  location: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  price: number;
  monthlyPrice: number;
  featured: boolean;
  verified: boolean;
  isNew: boolean;
  propertyType: 'rent' | 'buy' | 'service-apartment';
  category: string;
};

export const allProperties: Property[] = [
  // ===================== RENT =====================
  {
    id: 1,
    image: '/assets/marketplace assets/home1.png',
    title: '3 Bedroom Flat, Lokogoma, Abuja',
    location: 'Very close to Wuse Within Super Market',
    state: 'Abuja FCT',
    bedrooms: 3,
    bathrooms: 4,
    description: 'A spacious 3-bedroom flat located in a serene environment.',
    price: 2500000,
    monthlyPrice: 250000,
    featured: true,
    verified: true,
    isNew: false,
    propertyType: 'rent',
    category: 'property-to-rent'
  },
  {
    id: 2,
    image: '/assets/marketplace assets/home2.png',
    title: 'Student Apartment, Victoria Island, Lagos',
    location: 'Prime location near Eko Hotel',
    state: 'Lagos',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Perfect for students with modern amenities.',
    price: 1500000,
    monthlyPrice: 150000,
    featured: false,
    verified: true,
    isNew: true,
    propertyType: 'rent',
    category: 'student-property'
  },
  {
    id: 3,
    image: '/assets/marketplace assets/home3.png',
    title: 'Corporate Flat, Lekki Phase 1, Lagos',
    location: 'Close to Lekki Toll Gate',
    state: 'Lagos',
    bedrooms: 3,
    bathrooms: 4,
    description: 'Ideal for corporate executives and professionals.',
    price: 4000000,
    monthlyPrice: 400000,
    featured: true,
    verified: true,
    isNew: true,
    propertyType: 'rent',
    category: 'corporate-property'
  },
  {
    id: 4,
    image: '/assets/marketplace assets/home4.png',
    title: '4 Bedroom Duplex, Maitama, Abuja',
    location: 'Exclusive Maitama District',
    state: 'Abuja FCT',
    bedrooms: 4,
    bathrooms: 5,
    description: 'Luxury living at its finest. Rent to own option available.',
    price: 7500000,
    monthlyPrice: 750000,
    featured: true,
    verified: true,
    isNew: false,
    propertyType: 'rent',
    category: 'rent-to-own'
  },
  {
    id: 5,
    image: '/assets/marketplace assets/home5.png',
    title: '2 Bedroom Flat, Ikeja, Lagos',
    location: 'Near Ikeja City Mall',
    state: 'Lagos',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Comfortable flat with easy access to public transport.',
    price: 1800000,
    monthlyPrice: 180000,
    featured: false,
    verified: true,
    isNew: true,
    propertyType: 'rent',
    category: 'property-to-rent'
  },

  // ===================== BUY =====================
  {
    id: 6,
    image: '/assets/marketplace assets/home6.png',
    title: '5 Bedroom Mansion, Banana Island, Lagos',
    location: 'Luxury waterfront estate',
    state: 'Lagos',
    bedrooms: 5,
    bathrooms: 6,
    description: 'Exquisite mansion for high-end buyers.',
    price: 250000000,
    monthlyPrice: 0,
    featured: true,
    verified: true,
    isNew: false,
    propertyType: 'buy',
    category: 'luxury-property'
  },
  {
    id: 7,
    image: '/assets/marketplace assets/home7.png',
    title: '3 Bedroom Terrace, Wuse 2, Abuja',
    location: 'Quiet residential neighborhood',
    state: 'Abuja FCT',
    bedrooms: 3,
    bathrooms: 3,
    description: 'Modern terrace house in a gated community.',
    price: 50000000,
    monthlyPrice: 0,
    featured: false,
    verified: true,
    isNew: true,
    propertyType: 'buy',
    category: 'property-to-buy'
  },
  {
    id: 8,
    image: '/assets/marketplace assets/home8.png',
    title: '4 Bedroom Semi-Detached, Lekki, Lagos',
    location: 'Close to major highways',
    state: 'Lagos',
    bedrooms: 4,
    bathrooms: 4,
    description: 'Family-friendly semi-detached house.',
    price: 85000000,
    monthlyPrice: 0,
    featured: true,
    verified: true,
    isNew: false,
    propertyType: 'buy',
    category: 'property-to-buy'
  },
  {
    id: 9,
    image: '/assets/marketplace assets/home9.png',
    title: '2 Bedroom Bungalow, Jos, Plateau',
    location: 'Peaceful neighborhood',
    state: 'Plateau',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Cozy bungalow perfect for small families.',
    price: 18000000,
    monthlyPrice: 0,
    featured: false,
    verified: true,
    isNew: true,
    propertyType: 'buy',
    category: 'bungalow'
  },
  {
    id: 10,
    image: '/assets/marketplace assets/home10.png',
    title: '3 Bedroom Flat, Oniru, Lagos',
    location: 'Near shopping and entertainment',
    state: 'Lagos',
    bedrooms: 3,
    bathrooms: 3,
    description: 'Modern flat with parking and security.',
    price: 45000000,
    monthlyPrice: 0,
    featured: true,
    verified: true,
    isNew: false,
    propertyType: 'buy',
    category: 'property-to-buy'
  },

  // ===================== SERVICE APARTMENTS (under RENT) =====================
  {
    id: 11,
    image: '/assets/marketplace assets/home11.png',
    title: 'Service Apartment, Gwarinpa, Abuja',
    location: 'Gwarinpa Estate',
    state: 'Abuja FCT',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Fully furnished service apartment with daily housekeeping.',
    price: 3500000,
    monthlyPrice: 350000,
    featured: false,
    verified: true,
    isNew: false,
    propertyType: 'rent',
    category: 'service-apartment'
  },
  {
    id: 12,
    image: '/assets/marketplace assets/home12.png',
    title: 'Luxury Service Apartment, Ikoyi, Lagos',
    location: 'Prime location with gym and pool',
    state: 'Lagos',
    bedrooms: 3,
    bathrooms: 3,
    description: 'High-end fully furnished apartment for short/long stays.',
    price: 9000000,
    monthlyPrice: 900000,
    featured: true,
    verified: true,
    isNew: true,
    propertyType: 'rent',
    category: 'luxury-service'
  },
  {
    id: 13,
    image: '/assets/marketplace assets/home13.png',
    title: '1 Bedroom Studio, Victoria Island, Lagos',
    location: 'Near business district',
    state: 'Lagos',
    bedrooms: 1,
    bathrooms: 1,
    description: 'Compact studio perfect for business travelers.',
    price: 2500000,
    monthlyPrice: 250000,
    featured: false,
    verified: true,
    isNew: false,
    propertyType: 'rent',
    category: 'studio-apartment'
  },
  {
    id: 14,
    image: '/assets/marketplace assets/home14.png',
    title: '2 Bedroom Service Apartment, Ikeja, Lagos',
    location: 'Near malls and schools',
    state: 'Lagos',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Convenient apartment with all basic amenities.',
    price: 4000000,
    monthlyPrice: 400000,
    featured: false,
    verified: true,
    isNew: true,
    propertyType: 'rent',
    category: 'service-apartment'
  }
];


