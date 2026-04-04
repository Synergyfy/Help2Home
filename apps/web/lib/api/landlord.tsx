import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import type { Property } from "@/utils/properties";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

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
    const { data } = await axios.post(`${API_URL}/landlord-dashboard/properties`, newPropertyData, {
      headers: getAuthHeader()
    });
    return data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
}

export async function fetchLandlordProperties(): Promise<Property[]> {
  try {
    const { data } = await axios.get(`${API_URL}/landlord-dashboard/properties`, {
      headers: getAuthHeader()
    });
    return data;
  } catch (error) {
    console.error('Error fetching landlord properties:', error);
    return [];
  }
}
