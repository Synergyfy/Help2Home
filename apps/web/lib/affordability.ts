export interface AffordabilityInput {
    monthlyIncome: number;
    affordabilityRatio: number; // e.g., 0.30 for 30%
    durationMonths: number;
    monthlyInterestRate: number; // e.g., 0.02 for 2%
    existingLoanPayments?: number;
}

export interface AffordabilityResult {
    maxMonthlyRepayment: number;
    loanPrincipal: number;
    maxRent: number;
    upfrontPayment: number;
    qualify: boolean;
    reasons: string[];
    breakdown: {
        principal: number;
        interest: number;
        totalRepayable: number;
    };
}

/**
 * Calculates the maximum monthly repayment capacity.
 * Formula: (Income * Ratio) - ExistingLoans
 */
export function calculateMaxRepayment(
    income: number,
    ratio: number,
    existingLoans: number = 0
): number {
    const maxRepayment = (income * ratio) - existingLoans;
    return Math.max(0, Math.floor(maxRepayment));
}

/**
 * Calculates the maximum loan principal (Present Value of Annuity).
 * Formula: P = PMT * [ (1+r)^n - 1 ] / [ r(1+r)^n ]
 * If r = 0, P = PMT * n
 */
export function calculateLoanPrincipal(
    pmt: number,
    rate: number, // monthly rate in decimal (e.g. 0.02)
    months: number
): number {
    if (pmt <= 0) return 0;
    if (months <= 0) return 0;

    if (rate === 0) {
        return Math.floor(pmt * months);
    }

    const numerator = Math.pow(1 + rate, months) - 1;
    const denominator = rate * Math.pow(1 + rate, months);
    const principal = pmt * (numerator / denominator);

    return Math.floor(principal);
}

/**
 * Calculates the maximum annual rent qualified for.
 * Assumes bank finances 'financingShare' (default 50%).
 */
export function calculateMaxRent(
    principal: number,
    financingShare: number = 0.5
): number {
    if (financingShare <= 0 || financingShare > 1) return 0;
    return Math.floor(principal / financingShare);
}

/**
 * Calculates the upfront payment required.
 * Upfront = MaxRent * (1 - FinancingShare)
 */
export function calculateUpfront(
    maxRent: number,
    financingShare: number = 0.5
): number {
    return Math.ceil(maxRent * (1 - financingShare));
}

/**
 * Main calculation function that returns full result object.
 */
export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
    const {
        monthlyIncome,
        affordabilityRatio,
        durationMonths,
        monthlyInterestRate,
        existingLoanPayments = 0
    } = input;

    const financingShare = 0.5; // Fixed for now
    const minLoanAmount = 50000; // Backend param example

    const maxMonthlyRepayment = calculateMaxRepayment(monthlyIncome, affordabilityRatio, existingLoanPayments);

    const loanPrincipal = calculateLoanPrincipal(maxMonthlyRepayment, monthlyInterestRate, durationMonths);

    const maxRent = calculateMaxRent(loanPrincipal, financingShare);
    const upfrontPayment = calculateUpfront(maxRent, financingShare);

    // Qualification Logic
    const reasons: string[] = [];
    let qualify = true;

    if (maxMonthlyRepayment <= 0) {
        qualify = false;
        reasons.push("Income is too low relative to existing obligations.");
    } else if (loanPrincipal < minLoanAmount) {
        qualify = false; // Or "May not qualify"
        reasons.push(`Loan amount ₦${loanPrincipal.toLocaleString()} is below minimum ₦${minLoanAmount.toLocaleString()}.`);
    }

    // Breakdown for the loan (Total Repayable = PMT * n)
    // Note: This matches the "Show the monthly payment schedule" requirement roughly
    // Total Repayable is simply what they pay back over time.
    const totalRepayable = maxMonthlyRepayment * durationMonths;
    const totalInterest = totalRepayable - loanPrincipal;

    return {
        maxMonthlyRepayment,
        loanPrincipal,
        maxRent,
        upfrontPayment,
        qualify,
        reasons,
        breakdown: {
            principal: loanPrincipal,
            interest: totalInterest,
            totalRepayable
        }
    };
}
