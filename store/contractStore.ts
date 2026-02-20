import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Contract, Signer, MOCK_CONTRACTS } from '@/lib/mockContractData';

interface ContractState {
    contracts: Contract[];
    addContract: (contract: Contract) => void;
    updateContract: (id: string, updates: Partial<Contract>) => void;
    deleteContract: (id: string) => void;
    updateSignerStatus: (contractId: string, signerId: string, newStatus: Signer['status'], signedAt?: string, signatureMethod?: Signer['signatureMethod'], signatureContent?: Signer['signatureContent']) => void;
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
            updateSignerStatus: (contractId, signerId, newStatus, signedAt, signatureMethod, signatureContent) =>
                set((state) => ({
                    contracts: state.contracts.map((contract) =>
                        contract.id === contractId
                            ? {
                                ...contract,
                                signers: contract.signers.map((signer) =>
                                    signer.id === signerId
                                        ? {
                                            ...signer,
                                            status: newStatus,
                                            signedAt: signedAt || signer.signedAt,
                                            signatureMethod: signatureMethod || signer.signatureMethod,
                                            signatureContent: signatureContent || signer.signatureContent,
                                        }
                                        : signer
                                ),
                                updatedAt: new Date().toISOString(),
                            }
                            : contract
                    ),
                })),
        }),
        {
            name: 'help2home-contracts-storage',
        }
    )
);
