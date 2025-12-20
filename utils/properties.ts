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
        image: '/assets/marketplace assets/Home2.png',
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
        image: '/assets/marketplace assets/Home3.png',
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
        image: '/assets/marketplace assets/Home4.png',
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
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-4.png',
        title: '3 Bedroom House for Sale, Ikeja, Lagos',
        location: 'Near Ikeja City Mall',
        state: 'Lagos',
        bedrooms: 3,
        bathrooms: 3,
        description: 'Beautiful house available for purchase.',
        price: 55000000,
        monthlyPrice: 0,
        featured: false,
        verified: true,
        isNew: false,
        propertyType: 'buy',
        category: 'property-to-rent'
    },
    {
        id: 6,
        image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-5.png',
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
        propertyType: 'service-apartment',
        category: 'property-to-rent'
    },
  {
    id: 7,
    image: '/assets/marketplace assets/3 Bedroom Flat, Lokogoma. Abuja-5.png',
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
    propertyType: 'service-apartment',
    category: 'service-apartments'
  }
];
