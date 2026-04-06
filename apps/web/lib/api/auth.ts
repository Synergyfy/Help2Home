import { Role } from '@/store/userStore';
import apiClient from './apiClient';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: Role[];
    verified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  onboarding?: {
    roleOnboardingCompleted: Record<Role, boolean>;
    draftData: any;
    onboardingCompleted: boolean;
  };
}

export const loginUser = async (email: string, password?: string): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signin', { email, password });
  const { accessToken, refreshToken, user } = response.data;

  // Store tokens securely
  if (typeof window !== 'undefined') {
    localStorage.setItem('help2home_access_token', accessToken);
    localStorage.setItem('help2home_refresh_token', refreshToken);
  }

  return response.data;
};

export const registerUser = async (data: {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: Role[];
}): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signup', data);
  const { accessToken, refreshToken } = response.data;

  if (typeof window !== 'undefined') {
    localStorage.setItem('help2home_access_token', accessToken);
    localStorage.setItem('help2home_refresh_token', refreshToken);
  }

  return response.data;
};

export const verifyUser = async (): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post('/users/verify');
  return response.data;
};
