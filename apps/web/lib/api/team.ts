export interface Partner {
    id: string;
    name: string;
    role: string;
    email: string;
    phone?: string;
    properties?: number | string[]; // Count or list of associated properties
    status: 'Active' | 'Pending' | 'Inactive';
    joinedDate: string;
    avatar?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const landlordTeamApi = {
    getTeam: async (): Promise<Partner[]> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/team`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch team');
        return response.json();
    },

    addMember: async (email: string, role?: string): Promise<Partner> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/team`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email, role })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add member');
        }
        return response.json();
    },

    updateRole: async (memberId: string, role: string): Promise<Partner> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/team/${memberId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ role })
        });
        if (!response.ok) throw new Error('Failed to update role');
        return response.json();
    },

    removeMember: async (memberId: string): Promise<void> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/team/${memberId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to remove member');
    }
};
