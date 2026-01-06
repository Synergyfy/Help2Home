import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import { useApplicationStore, ApplicationStatus, Application } from '@/store/applicationStore';
import { fetchApplications, updateApplicationStatusApi, submitApplicationApi } from '@/lib/api/applications';
import { toast } from 'react-toastify';

export const useApplications = () => {
  const queryClient = useQueryClient();
  const { id: userId, activeRole, hasHydrated: userHydrated } = useUserStore();
  const { 
    addApplication: addToStore, 
    updateApplicationStatus: updateInStore,
    hasHydrated: appsHydrated 
  } = useApplicationStore();

  const queryKey = ['applications', activeRole, userId];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchApplications(activeRole as 'tenant' | 'landlord', userId),
    enabled: userHydrated && appsHydrated && !!userId && !!activeRole,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const submitMutation = useMutation({
    mutationFn: submitApplicationApi,
    onSuccess: (newApp) => {
      addToStore(newApp);
      queryClient.invalidateQueries({ queryKey });
      toast.success('Application submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit application.');
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) => 
      updateApplicationStatusApi(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousApps = queryClient.getQueryData<Application[]>(queryKey);

      // Optimistic update in cache
      queryClient.setQueryData<Application[]>(queryKey, (old) => 
        old?.map(app => app.id === id ? { ...app, status } : app)
      );

      // Also update in store
      updateInStore(id, status);

      return { previousApps };
    },
    onError: (err, variables, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(queryKey, context.previousApps);
      }
      toast.error('Failed to update application status.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: () => {
      toast.success('Application status updated.');
    }
  });

  return {
    applications: query.data || [],
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    submitApplication: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    refetch: query.refetch,
  };
};
