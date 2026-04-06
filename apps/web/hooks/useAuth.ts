import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { loginUser, registerUser, AuthResponse } from '@/lib/api/auth';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();
  
  const { 
    setRoles, 
    updateRoleData, 
    completeRoleOnboarding, 
    setOnboardingCompleted, 
    goToStep,
    setCurrentEmail,
    setCurrentPhone
  } = useOnboardingStore();

  const handleAuthSuccess = (data: AuthResponse) => {
    // 1. Sync User Session to Zustand
    setUser({
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      fullName: `${data.user.firstName} ${data.user.lastName}`,
      phone: data.user.phone,
      roles: data.user.roles,
      verified: data.user.verified,
      activeRole: data.user.roles[0],
      token: data.accessToken,
      onboardingCompleted: data.onboarding?.onboardingCompleted || false,
      roleOnboardingCompleted: data.onboarding?.roleOnboardingCompleted || {},
      draftData: data.onboarding?.draftData || {},
    });

    // 2. Sync Onboarding Store
    setCurrentEmail(data.user.email);
    if (data.user.phone) setCurrentPhone(data.user.phone);
    setRoles(data.user.roles);
    
    if (data.onboarding) {
      setOnboardingCompleted(data.onboarding.onboardingCompleted);
      Object.entries(data.onboarding.roleOnboardingCompleted).forEach(([role, isFinished]) => {
        if (isFinished) completeRoleOnboarding(role as any);
      });
      Object.entries(data.onboarding.draftData).forEach(([role, roleData]) => {
        updateRoleData(role as any, roleData);
      });
    }

    // 3. Smart Navigation
    const primaryRole = data.user.roles[0];
    const isVerified = data.user.verified;
    
    if (redirect) {
      router.push(redirect);
      return;
    }

    // Determine if onboarding is truly needed
    // If backend doesn't provide onboarding status (common in current build), 
    // we infer it from roles and verification status.
    const isGloballyDone = data.onboarding?.onboardingCompleted ?? (isVerified && !!primaryRole);

    if (isGloballyDone) {
      router.push(`/dashboard/${primaryRole}`);
    } else if (!isVerified) {
      // If not verified, we must go to verification step (Step 1)
      // We skip Step 0 because we already have their email/contact info from login
      goToStep(1); 
      router.push('/onboarding');
    } else {
      // Verified but onboarding flag missing or false
      if (primaryRole) {
        // If they already have a role assigned, they've likely done the basic parts
        router.push(`/dashboard/${primaryRole}`);
      } else {
        // Fallback for brand new users without roles
        goToStep(0); 
        router.push('/onboarding');
      }
    }
    
    toast.success('Welcome to Help2Home!');
  };

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password?: string }) => 
        loginUser(email, password),
    onSuccess: handleAuthSuccess,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  });

  const signUpMutation = useMutation({
    mutationFn: (data: any) => registerUser(data),
    onSuccess: handleAuthSuccess,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed.');
    }
  });

  return {
    signIn: (email: string, password?: string) => loginMutation.mutateAsync({ email, password }),
    signUp: (data: any) => signUpMutation.mutateAsync(data),
    isLoading: loginMutation.isPending || signUpMutation.isPending,
    error: loginMutation.error || signUpMutation.error,
    isSuccess: loginMutation.isSuccess || signUpMutation.isSuccess
  };
};
