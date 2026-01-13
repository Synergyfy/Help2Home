import { useQueryClient, useMutation,useQuery } from "@tanstack/react-query";
import { searchProperties } from '@/lib/api/marketPlace';
import { createProperty } from "@/lib/api/landlord";
import { marketplaceKeys } from "./useMarketplaceQueries";
import { useUserStore } from "@/store/userStore"; 
import type { Property } from "@/utils/properties";

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id); 

  return useMutation({
    // Changed to 'any' to accept PropertySchema from the wizard
    mutationFn: (data: any) => createProperty(data, userId),
    onSuccess: () => {
      // Invalidate everything to be safe during debugging
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.all });
      
      // Explicitly invalidate the user's specific list
      queryClient.invalidateQueries({ 
        queryKey: [...marketplaceKeys.all, 'mine', userId] 
      });

      // Also invalidate the standard search query which might be used elsewhere
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
      // Fetch properties using the ownerId filter (so we get pagination correct for this user)
      const response = await searchProperties({ ownerId: userId });
      return response.properties;
    },
    // Only run the query if we actually have a userId
    enabled: !!userId,
  });
}
