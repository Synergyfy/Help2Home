import { Role, useUserStore } from '@/store/userStore';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface UserProfileResponse {
  role: Role;
  data: any;
}

export const fetchProfile = async (role: Role): Promise<UserProfileResponse> => {
  await delay(800); // Simulate network latency

  // In a real app, this would be an API call like: axios.get(`/api/profile/${role}`)
  // Here we read from the persist store to simulate "server" state that matches client state
  const state = useUserStore.getState();
  
  // Merge common profile with role-specific data
  const common = state.profile;
  const roleSpecific = state.roleData[role as keyof typeof state.roleData] || {};

  return {
    role,
    data: {
      ...common,
      ...roleSpecific
    }
  };
};

export const updateProfile = async (role: Role, data: any): Promise<UserProfileResponse> => {
  await delay(1200); // Simulate saving delay

  const state = useUserStore.getState();
  
  // Separate common fields from role-specific fields
  const { firstName, lastName, dob, gender, maritalStatus, address, state: userState, image, ...roleData } = data;
  
  const commonData = { firstName, lastName, dob, gender, maritalStatus, address, state: userState, image };
  
  // Update Store (Optimistic / Post-request sync)
  state.updateProfile(commonData);
  state.updateRoleProfileData(role, roleData);
  
  return {
    role,
    data: {
      ...state.profile,
      ...state.roleData[role as keyof typeof state.roleData]
    }
  };
};
