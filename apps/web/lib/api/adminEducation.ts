import apiClient from './apiClient';
export { type EducationContent } from '@/components/dashboard/education/types';
import { EducationContent } from '@/components/dashboard/education/types';

export const fetchEducationContent = async (): Promise<EducationContent[]> => {
    const { data } = await apiClient.get('/dashboard/admin/education');
    return data;
};

export const createEducationContent = async (postData: any): Promise<EducationContent> => {
    const { data } = await apiClient.post('/dashboard/admin/education', postData);
    return data;
};

export const updateEducationContent = async (id: string, postData: any): Promise<EducationContent> => {
    const { data } = await apiClient.patch(`/dashboard/admin/education/${id}`, postData);
    return data;
};

export const deleteEducationContent = async (id: string): Promise<void> => {
    await apiClient.delete(`/dashboard/admin/education/${id}`);
};
