import apiClient from './apiClient';

export const fetchAdminUsers = async (search?: string) => {
    const { data } = await apiClient.get('/dashboard/admin/users', {
        params: { search }
    });
    return data;
};

export const updateUserStatus = async (id: string, status: string) => {
    const { data } = await apiClient.patch(`/dashboard/admin/users/${id}`, { status });
    return data;
};

export const deleteUser = async (id: string) => {
    const { data } = await apiClient.delete(`/dashboard/admin/users/${id}`);
    return data;
};
