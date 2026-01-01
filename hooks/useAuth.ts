'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { loginUser, MockUserResponse } from '@/lib/api/auth';

export const useAuth = () => {
  const router = useRouter();
  
  // User Session Store
  const setUser = useUserStore((state) => state.setUser);
  
  // Onboarding Wizard Store
  const { 
    setRoles, 
    updateRoleData, 
    completeRoleOnboarding, 
    setOnboardingCompleted, 
    goToStep 
  } = useOnboardingStore();

  const loginMutation = useMutation({
    mutationFn: (email: string) => loginUser(email),
    onSuccess: (data: MockUserResponse) => {
      // 1. Sync User Session
      setUser({
        email: data.user.email,
        fullName: data.user.fullName,
        phone: data.user.phone,
        roles: data.user.roles,
        verified: data.user.verified,
        activeRole: data.user.roles[0],
      });

      // 2. Sync Onboarding State
      setRoles(data.user.roles);
      setOnboardingCompleted(data.onboarding.onboardingCompleted);
      
      // Populate completion status for each role
      Object.entries(data.onboarding.roleOnboardingCompleted).forEach(([role, isFinished]) => {
        if (isFinished) completeRoleOnboarding(role as any);
      });
      
      // Populate saved draft data
      Object.entries(data.onboarding.draftData).forEach(([role, roleData]) => {
        updateRoleData(role as any, roleData);
      });

      // 3. Navigate based on status
      const primaryRole = data.user.roles[0];
      const isPrimaryDone = data.onboarding.roleOnboardingCompleted[primaryRole];

      if (!isPrimaryDone) {
        goToStep(4); // Resume at Role Chooser
        router.push('/onboarding');
      } else {
        router.push(`/dashboard/${primaryRole}`);
      }
    },
  });

  return {
    signIn: (email: string) => loginMutation.mutate(email),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess
  };
};