import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEducationContent, createEducationContent, updateEducationContent, deleteEducationContent, EducationContent } from '@/lib/api/adminEducation';
import { toast } from 'react-toastify';

export const useAdminEducation = () => {
    return useQuery({
        queryKey: ['admin-education'],
        queryFn: fetchEducationContent,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

export const useCreateEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<EducationContent>) => createEducationContent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
            toast.success('Educational post created successfully');
        }
    });
};

export const useUpdateEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<EducationContent> }) => updateEducationContent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
            toast.success('Educational post updated successfully');
        }
    });
};

export const useDeleteEducation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteEducationContent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
            toast.success('Educational post deleted');
        }
    });
};
