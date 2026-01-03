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
    mutationFn: (data: Partial<Property>) => createProperty(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.all });
      
      queryClient.invalidateQueries({ 
        queryKey: [...marketplaceKeys.all, 'mine', userId] 
      });
    },
  });
}



export function useLandlordProperties() {
  const userId = useUserStore((state) => state.id);

  return useQuery({
    queryKey: [...marketplaceKeys.all, 'mine', userId],
    queryFn: async () => {
      // Fetch all properties from the mock DB
      const response = await searchProperties({});
      
      // Filter the list to only include properties created by the current user
      return response.properties.filter(
        (property) => property.createdBy === userId
      );
    },
    // Only run the query if we actually have a userId
    enabled: !!userId,
  });
}