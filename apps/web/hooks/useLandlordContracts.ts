import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landlordContractsApi } from '../lib/api/contracts';
import { Contract } from '../lib/mockContractData';
import { toast } from 'react-toastify';

export const useLandlordContracts = () => {
    const queryClient = useQueryClient();

    const { data: contracts = [], isLoading, isError } = useQuery({
        queryKey: ['landlord-contracts'],
        queryFn: landlordContractsApi.getContracts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const createContractMutation = useMutation({
        mutationFn: (data: Partial<Contract>) => landlordContractsApi.createContract(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-contracts'] });
            toast.success('Contract created successfully');
        },
        onError: (error: any) => {
            console.error('Failed to create contract:', error);
            toast.error('Failed to create contract');
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => 
            landlordContractsApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-contracts'] });
            toast.success('Contract status updated');
        },
        onError: (error: any) => {
            console.error('Failed to update contract status:', error);
            toast.error('Failed to update contract status');
        }
    });

    return {
        contracts,
        isLoading,
        isError,
        createContract: createContractMutation.mutate,
        isCreating: createContractMutation.isPending,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
};
