'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { loginUser, MockUserResponse } from '@/lib/api/auth';

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const setUser = useUserStore((state) => state.setUser);
  
  const { 
    setRoles, 
    updateRoleData, 
    completeRoleOnboarding, 
    setOnboardingCompleted, 
    goToStep,
    setCurrentEmail
  } = useOnboardingStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
        loginUser(email, password),
    
    onSuccess: (data: MockUserResponse) => {
      // 1. Sync User Session
      setUser({
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        phone: data.user.phone,
        roles: data.user.roles,
        verified: data.user.verified,
        activeRole: data.user.roles[0],
        onboardingCompleted: data.onboarding.onboardingCompleted,
        roleOnboardingCompleted: data.onboarding.roleOnboardingCompleted,
        draftData: data.onboarding.draftData,
      });

      // 2. Sync Onboarding Store
      setCurrentEmail(data.user.email);
      setRoles(data.user.roles);
      setOnboardingCompleted(data.onboarding.onboardingCompleted);
      
      Object.entries(data.onboarding.roleOnboardingCompleted).forEach(([role, isFinished]) => {
        if (isFinished) completeRoleOnboarding(role as any);
      });
      
      Object.entries(data.onboarding.draftData).forEach(([role, roleData]) => {
        updateRoleData(role as any, roleData);
      });

      // 3. Smart Navigation Fix
      const primaryRole = data.user.roles[0];

      if (redirect) {
        router.push(redirect);
        return;
      }

      const isPrimaryDone = data.onboarding.roleOnboardingCompleted[primaryRole];

      if (!isPrimaryDone) {
        goToStep(4); 
        router.push('/onboarding');
      } else {
        router.push(`/dashboard/${primaryRole}`);
      }
    },
  });

  return {
    signIn: (email: string, password: string) => loginMutation.mutate({ email, password }),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess
  };
};