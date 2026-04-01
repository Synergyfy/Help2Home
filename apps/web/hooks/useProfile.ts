import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfile, updateProfile } from '@/lib/api/profile';
import { Role } from '@/store/userStore';
import { toast } from 'react-toastify';

export const useProfile = (role: Role) => {
  return useQuery({
    queryKey: ['profile', role],
    queryFn: () => fetchProfile(role),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateProfile = (role: Role) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateProfile(role, data),
    onSuccess: (newData) => {
      // Update cache
      queryClient.setQueryData(['profile', role], newData);
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  });
};
