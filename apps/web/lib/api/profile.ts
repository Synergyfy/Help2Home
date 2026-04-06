import apiClient from './apiClient';
import { Role, useUserStore } from '@/store/userStore';

export interface UserProfileResponse {
  role: Role;
  data: any;
}

export const fetchProfile = async (role: Role): Promise<UserProfileResponse> => {
    const { data } = await apiClient.get(`/profile/me`);
    return {
      role,
      data
    };
};

export const fetchProfileActivity = async (): Promise<any[]> => {
    const { data } = await apiClient.get(`/profile/activity`);
    return data;
};

export const updateProfile = async (role: Role, updateData: any): Promise<UserProfileResponse> => {
    const { data } = await apiClient.patch(`/profile/me`, updateData);
    
    // Optimistic store sync
    const state = useUserStore.getState();
    const { firstName, lastName, dob, gender, maritalStatus, address, state: userState, image, ...roleData } = updateData;
    const commonData = { firstName, lastName, dob, gender, maritalStatus, address, state: userState, image };
    state.updateProfile(commonData);
    state.updateRoleProfileData(role, roleData);
    
    return {
      role,
      data
    };
};
