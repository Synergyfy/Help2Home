import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { Application, ApplicationStatus } from '@/store/applicationStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const fetchApplications = async (role: 'tenant' | 'landlord', id: string): Promise<Application[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/landlord-dashboard/applications`, {
      headers: getAuthHeader(),
      params: { role }
    });
    return data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const updateApplicationStatusApi = async (id: string, status: ApplicationStatus): Promise<boolean> => {
  try {
    await axios.patch(`${API_URL}/landlord-dashboard/applications/${id}/status`, { status }, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    return false;
  }
};

export const submitApplicationApi = async (application: Application): Promise<Application> => {
  try {
    const { data } = await axios.post(`${API_URL}/application`, application, {
      headers: getAuthHeader()
    });
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};
