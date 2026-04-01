export interface BankRedirectResponse {
    redirectUrl: string;
    sessionId: string;
    expiresAt: string;
}

export interface BankStatusResponse {
    status: 'pending' | 'success' | 'failed' | 'cancelled';
    details?: string;
    lastUpdated: string;
}

// Simulate backend state using localStorage for cross-tab sync
const getMockStatus = (applicationId: string) => {
    if (typeof window === 'undefined') return 'pending';
    const status = JSON.parse(localStorage.getItem('mockBankStatus') || '{}');
    return status[applicationId] || 'pending';
};

const setMockStatus = (applicationId: string, status: 'pending' | 'success' | 'failed') => {
    if (typeof window === 'undefined') return;
    const current = JSON.parse(localStorage.getItem('mockBankStatus') || '{}');
    current[applicationId] = status;
    localStorage.setItem('mockBankStatus', JSON.stringify(current));
};

export const initiateBankRedirect = async (applicationId: string): Promise<BankRedirectResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const sessionId = `sess_${Date.now()}`;
    setMockStatus(applicationId, 'pending');

    return {
        redirectUrl: `/bank-portal?applicationId=${applicationId}`,
        sessionId,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 mins expiry
    };
};

export const checkBankStatus = async (applicationId: string): Promise<BankStatusResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const status = getMockStatus(applicationId);

    return {
        status,
        lastUpdated: new Date().toISOString()
    };
};

export const manualConfirmBank = async (applicationId: string): Promise<BankStatusResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Force success for manual check in demo
    setMockStatus(applicationId, 'success');

    return {
        status: 'success',
        lastUpdated: new Date().toISOString()
    };
};
