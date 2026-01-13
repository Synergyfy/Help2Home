// @/lib/api/landlord.ts
import { delay } from "./marketPlace";
import type { Property } from "@/utils/properties";
import { addPropertyToMockDb, getMockProperties } from "@/utils/properties";

export async function createProperty(
  newPropertyData: any,
  userId: string
): Promise<Property> {
  await delay(1000);

  // Map the form data (which has nested objects) to the flat Property structure
  const mappedProperty: Partial<Property> = {
    ...newPropertyData,
    title: newPropertyData.title || 'Untitled Property',
    price: newPropertyData.price?.amount || 0,
    currency: newPropertyData.price?.currency || 'NGN',
    address: newPropertyData.address?.street || '',
    city: newPropertyData.address?.city || '',
    state: newPropertyData.address?.state || '',
    location: newPropertyData.address?.city || '',

    // Map Listing Type to Property propertyType
    propertyType: (newPropertyData.listingType === 'Rent' ? 'rent' :
      newPropertyData.listingType === 'Sale' ? 'buy' :
        newPropertyData.listingType === 'Service-Apartment' ? 'service-apartment' :
          'rent-to-own') as any,

    // Map Specs
    bedrooms: Number(newPropertyData.specs?.bedrooms) || 0,
    bathrooms: Number(newPropertyData.specs?.bathrooms) || 0,
    floorSize: Number(newPropertyData.specs?.area) || 0,

    // Map Images (extract URLs from our new object structure)
    images: newPropertyData.images?.map((img: any) => img.url) || [],

    // Map Installments
    isInstallmentAllowed: newPropertyData.installments?.enabled || false,
    installmentConfig: {
      depositPercent: newPropertyData.installments?.depositPercent,
      period: newPropertyData.price?.period,
    },

    serviceCharge: newPropertyData.price?.serviceCharge || 0,

    // Ensure amenities are passed with their prices
    amenities: newPropertyData.amenities || [],
  };

  const newProperty: Property = {
    ...mappedProperty,
    id: Math.floor(Math.random() * 100000),
    createdBy: userId,
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    featured: false,
    verified: false,
    status: newPropertyData.status || 'available',
    isNew: true,
    isOffPlan: false,
    isNewBuild: true,
    ownership: 'freehold',
  } as Property;

  // Simulate sending invitation email if landlord details are provided
  if (newPropertyData.landlord?.email && newPropertyData.posterRole === 'caretaker') {
    console.log(`
      --- EMAIL SIMULATION ---
      TO: ${newPropertyData.landlord.email}
      SUBJECT: Your property "${newPropertyData.title}" has been listed!
      BODY: 
      Hello ${newPropertyData.landlord.fullName || 'Landlord'},
      
      A caretaker (${userId}) has listed your property on Help2Home.
      You have been automatically signed up for an account. 
      
      Listing Details:
      - Title: ${newPropertyData.title}
      - Address: ${newPropertyData.address?.street}, ${newPropertyData.address?.city}
      - Price: ${newPropertyData.price?.amount} ${newPropertyData.price?.currency || 'NGN'}
      
      Click here to access your dashboard and manage your property:
      https://help2home.com/dashboard/landlord/login?email=${encodeURIComponent(newPropertyData.landlord.email)}
      
      Welcome to Help2Home!
      ------------------------
    `);
  }

  addPropertyToMockDb(newProperty);
  console.log('[createProperty] Added property to mock DB:', newProperty);
  console.log('[createProperty] New mock DB length:', getMockProperties().length);

  return newProperty;
}