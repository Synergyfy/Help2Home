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
    price: newPropertyData.price?.amount || 0,
    currency: newPropertyData.price?.currency || 'NGN',
    address: newPropertyData.address?.street || '',
    city: newPropertyData.address?.city || '',
    state: newPropertyData.address?.state || '',
    location: newPropertyData.address?.city || '', // Default location to city
    propertyType: newPropertyData.listingType === 'Sale' ? 'buy' : 'rent',

    // Map Specs
    bedrooms: newPropertyData.specs?.bedrooms || 0,
    bathrooms: newPropertyData.specs?.bathrooms || 0,
    floorSize: newPropertyData.specs?.area || 0,

    // Map Images (extract URLs from our new object structure)
    // newPropertyData.images is likely PropertySchema['images'] (array of objects with url, id, etc)
    images: newPropertyData.images?.map((img: any) => img.url) || [],

    // Map Installments
    isInstallmentAllowed: newPropertyData.installments?.enabled || false,

    // Ensure amenities are passed
    amenities: newPropertyData.amenities || [],
  };

  const newProperty: Property = {
    ...mappedProperty,
    id: Math.floor(Math.random() * 10000),
    createdBy: userId,
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    featured: false,
    verified: false,
    status: newPropertyData.status || 'available',
  } as Property;

  addPropertyToMockDb(newProperty);
  console.log('[createProperty] Added property to mock DB:', newProperty);
  // Replaced require with direct import usage
  console.log('[createProperty] New mock DB length:', getMockProperties().length);

  return newProperty;
}