import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchLandlordProperties, createProperty } from "@/lib/api/landlord";
import { marketplaceKeys } from "./useMarketplaceQueries";
import { useUserStore } from "@/store/userStore"; 
import type { Property } from "@/utils/properties";

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const { id: userId, fullName, profile } = useUserStore(); 

  return useMutation({
    mutationFn: (data: any) => createProperty(data, userId, fullName, profile.image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.all });
      queryClient.invalidateQueries({ 
        queryKey: [...marketplaceKeys.all, 'mine', userId] 
      });
      queryClient.invalidateQueries({
        queryKey: [...marketplaceKeys.all, 'properties']
      });
      console.log('[useCreateProperty] Cache invalidated for user:', userId);
    },
  });
}

export function useLandlordProperties() {
  const userId = useUserStore((state) => state.id);

  return useQuery({
    queryKey: [...marketplaceKeys.all, 'mine', userId],
    queryFn: async () => {
      return fetchLandlordProperties();
    },
    enabled: !!userId,
  });
}
