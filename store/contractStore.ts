import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Contract, MOCK_CONTRACTS } from '@/lib/mockContractData';

interface ContractState {
    contracts: Contract[];
    addContract: (contract: Contract) => void;
    updateContract: (id: string, updates: Partial<Contract>) => void;
    deleteContract: (id: string) => void;
}

export const useContractStore = create<ContractState>()(
    persist(
        (set) => ({
            contracts: MOCK_CONTRACTS,
            addContract: (contract) =>
                set((state) => ({ contracts: [contract, ...state.contracts] })),
            updateContract: (id, updates) =>
                set((state) => ({
                    contracts: state.contracts.map((c) =>
                        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
                    ),
                })),
            deleteContract: (id) =>
                set((state) => ({
                    contracts: state.contracts.filter((c) => c.id !== id),
                })),
        }),
        {
            name: 'help2home-contracts-storage',
        }
    )
);
