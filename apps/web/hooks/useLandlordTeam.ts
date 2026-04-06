import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landlordTeamApi } from '../lib/api/team';
import { Partner } from '../lib/mockPartnerData';
import { toast } from 'react-toastify';

export const useLandlordTeam = () => {
    const queryClient = useQueryClient();

    const { data: partners = [], isLoading, isError } = useQuery({
        queryKey: ['landlord-team'],
        queryFn: landlordTeamApi.getTeam,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const addMemberMutation = useMutation({
        mutationFn: ({ email, role }: { email: string, role?: string }) => 
            landlordTeamApi.addMember(email, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-team'] });
            toast.success('Partner invited successfully');
        },
        onError: (error: any) => {
            console.error('Failed to invite partner:', error);
            toast.error(error.response?.data?.message || 'Failed to invite partner');
        }
    });

    const updateRoleMutation = useMutation({
        mutationFn: ({ memberId, role }: { memberId: string, role: string }) => 
            landlordTeamApi.updateRole(memberId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-team'] });
            toast.success('Partner role updated');
        },
        onError: (error: any) => {
            console.error('Failed to update partner role:', error);
            toast.error('Failed to update partner role');
        }
    });

    const removeMemberMutation = useMutation({
        mutationFn: landlordTeamApi.removeMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-team'] });
            toast.success('Partner removed from network');
        },
        onError: (error: any) => {
            console.error('Failed to remove partner:', error);
            toast.error('Failed to remove partner');
        }
    });

    return {
        partners,
        isLoading,
        isError,
        addMember: addMemberMutation.mutate,
        isAdding: addMemberMutation.isPending,
        updateRole: updateRoleMutation.mutate,
        isUpdating: updateRoleMutation.isPending,
        removeMember: removeMemberMutation.mutate,
        isRemoving: removeMemberMutation.isPending,
    };
};
