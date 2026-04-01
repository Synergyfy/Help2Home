'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    avatarUrl?: string;
    role: 'tenant' | 'landlord' | 'investor';
    isVerified: boolean;
}

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    updateUser: (updates: Partial<User>) => void;
    logout: () => void;
    getDefaultAvatar: () => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Load user data from local storage
        const loadUser = () => {
            const storedUser = localStorage.getItem('user_data');
            const firstName = localStorage.getItem('user_firstName');
            const lastName = localStorage.getItem('user_lastName');

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else if (firstName && lastName) {
                // Migrate old data
                const newUser: User = {
                    firstName,
                    lastName,
                    email: localStorage.getItem('user_email') || 'user@example.com',
                    gender: 'other',
                    role: 'tenant',
                    isVerified: false,
                    avatarUrl: undefined
                };
                setUser(newUser);
                localStorage.setItem('user_data', JSON.stringify(newUser));
            }
            setIsLoading(false);
        };

        loadUser();
    }, []);

    const getDefaultAvatar = () => {
        if (!user) return '/assets/profile man.png';
        if (user.avatarUrl) return user.avatarUrl;
        return user.gender === 'female'
            ? '/assets/Profile woman.png'
            : '/assets/profile man.png';
    };

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            localStorage.setItem('user_data', JSON.stringify(updated));
            // Also update old format for compatibility
            if (updates.firstName) localStorage.setItem('user_firstName', updates.firstName);
            if (updates.lastName) localStorage.setItem('user_lastName', updates.lastName);
            if (updates.email) localStorage.setItem('user_email', updates.email);
            return updated;
        });
    };

    const logout = () => {
        localStorage.clear(); // Comprehensive clear
        setUser(null);
        router.push('/signin');
    };

    return (
        <UserContext.Provider value={{ user, isLoading, updateUser, logout, getDefaultAvatar }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
