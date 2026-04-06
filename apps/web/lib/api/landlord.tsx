import apiClient from './apiClient';
import type { Property } from "@/utils/properties";

export async function createProperty(
  newPropertyData: any,
  userId: string,
  listerName?: string,
  listerImage?: string
): Promise<Property> {
  // Simulate sending invitation email if landlord details are provided (keep for now)
  if (newPropertyData.landlord?.email && newPropertyData.posterRole === 'caretaker') {
    console.log(`
      --- EMAIL SIMULATION ---
      TO: ${newPropertyData.landlord.email}
      SUBJECT: Your property "${newPropertyData.title}" has been listed!
      ...
    `);
  }

  try {
    // Flatten nested frontend payload into strictly expected backend DTO shape
    const payload = {
      title: newPropertyData.title || 'Untitled Property',
      description: typeof newPropertyData.description === 'object' ? newPropertyData.description.short || newPropertyData.description.long || 'No description' : newPropertyData.description || '',
      propertyType: newPropertyData.listingType?.toLowerCase() || 'rent', // DTO expects: 'rent', 'buy', 'service-apartment'
      category: newPropertyData.propertyType || newPropertyData.propertyCategory || 'Apartment',
      address: typeof newPropertyData.address === 'object' ? newPropertyData.address.street || 'Unknown Address' : newPropertyData.address || 'Unknown Address',
      location: typeof newPropertyData.address === 'object' ? newPropertyData.address.city || 'Unknown' : 'Unknown',
      city: typeof newPropertyData.address === 'object' ? newPropertyData.address.city || 'Unknown' : 'Unknown',
      state: typeof newPropertyData.address === 'object' ? newPropertyData.address.state || 'Unknown' : 'Unknown',
      bedrooms: Number(newPropertyData.specs?.bedrooms) || 0,
      bathrooms: Number(newPropertyData.specs?.bathrooms) || 0,
      floorSize: Number(newPropertyData.specs?.area) || 0,
      price: Number(newPropertyData.price?.amount) || 0,
      currency: newPropertyData.price?.currency || 'NGN',
      posterRole: newPropertyData.posterRole || 'landlord',
      images: Array.isArray(newPropertyData.images) ? newPropertyData.images.map((img: any) => typeof img === 'string' ? img : img.url || '').filter(Boolean) : []
    };

    const { data } = await apiClient.post(`/landlord-dashboard/properties`, payload);
    return data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
}

export async function fetchLandlordProperties(): Promise<Property[]> {
  try {
    const { data } = await apiClient.get(`/landlord-dashboard/properties`);
    return data;
  } catch (error) {
    console.error('Error fetching landlord properties:', error);
    return [];
  }
}
