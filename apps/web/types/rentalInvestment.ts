export interface RentalOpportunity {
    id: string;
    propertyImage: string;
    propertyLocation: string;
    monthlyInstallment: number;
    totalPropertyValue: number;
    amountRequired: number;
    amountRaised: number;
    tenantAffordabilityScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    repaymentDuration: number; // in months
    expectedROI: number;
    repaymentSuccessProjection: number;
    tenantProfile: TenantProfile;
    affordabilityResults: AffordabilityResults;
    defaultRisk: DefaultRisk;
    investmentTerms: InvestmentTerms;
}

export interface TenantProfile {
    employmentStatus: string;
    monthlyIncomeRange: string;
    incomeStabilityScore: number;
    rentToIncomeRatio: number;
    historicalRentalBehavior?: string;
    householdSize: number;
    employmentDuration: string;
}

export interface AffordabilityResults {
    incomeVsRepaymentRatio: number;
    expenseAnalysis: string;
    debtObligations: string;
    disposableIncomeEstimate: number;
    status: 'Pass' | 'Conditional';
}

export interface DefaultRisk {
    probabilityOfFullRepayment: number;
    probabilityOfDefault: number;
    stressTestedConfidence: number;
    paymentReliabilityScore: number;
    behavioralRiskIndicators: string[];
}

export interface InvestmentTerms {
    duration: number;
    monthlyRepaymentSchedule: string;
    investorReturn: number;
    paymentDistributionFrequency: string;
    platformServiceFee: number;
    latePaymentPenalty: string;
    exitTerms: string;
}
