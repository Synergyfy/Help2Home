// @/lib/api/landlord.ts
import { delay } from "./marketPlace";
import type { Property } from "@/utils/properties";
import { addPropertyToMockDb } from "@/utils/properties";

export async function createProperty(
  newPropertyData: Partial<Property>, 
  userId: string 
): Promise<Property> {
  await delay(1000); 

  const newProperty: Property = {
    ...newPropertyData,
    id: Math.floor(Math.random() * 10000), 
    createdBy: userId, 
    dateAdded: new Date().toISOString(),
    listingAge: '24h',
    featured: false,
    verified: false,
    status: 'available', 
  } as Property;

  addPropertyToMockDb(newProperty);

  return newProperty;
}