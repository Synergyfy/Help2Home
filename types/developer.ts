export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  videos?: string[];
  status: 'completed' | 'in-progress' | 'planned';
  completionDate?: string;
  projectValue?: number;
  location?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentCondition {
  id: string;
  propertyId: string;
  minAmount: number;
  maxAmount: number;
  expectedROI: number; // percentage
  timeline: number; // months
  riskLevel: 'low' | 'medium' | 'high';
  paymentSchedule: 'monthly' | 'quarterly' | 'bi-annual' | 'annual';
  totalInvestmentTarget: number;
  currentInvestmentSecured: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RepaymentScheduleItem {
  id: string;
  dueDate: string;
  amount: number;
  principal: number;
  interest: number;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: string;
}

export interface RepaymentSchedule {
  investmentConditionId: string;
  investmentAmount: number;
  totalRepaymentAmount: number;
  schedule: RepaymentScheduleItem[];
  createdAt: string;
}

export interface ProjectTimeline {
  phase: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  progress: number; // 0-100
}

export interface InvestorApplication {
  id: string;
  investorId: string;
  investorName: string;
  investorEmail: string;
  propertyId: string;
  investmentAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  message?: string;
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface DeveloperProject {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  totalValue: number;
  images: string[];
  investmentCondition?: InvestmentCondition;
  timeline: ProjectTimeline[];
  status: 'planning' | 'fundraising' | 'in-progress' | 'completed';
  investors: number;
  fundingProgress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface DeveloperStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestmentSecured: number;
  totalInvestors: number;
  portfolioValue: number;
  averageROI: number;
}

// Helper function to calculate repayment schedule
export function calculateRepaymentSchedule(
  investmentAmount: number,
  roi: number,
  timelineMonths: number,
  paymentSchedule: InvestmentCondition['paymentSchedule']
): RepaymentSchedule {
  const totalReturn = investmentAmount * (1 + roi / 100);
  const scheduleItems: RepaymentScheduleItem[] = [];

  // Determine payment frequency
  const paymentsPerYear = {
    monthly: 12,
    quarterly: 4,
    'bi-annual': 2,
    annual: 1,
  }[paymentSchedule];

  const totalPayments = Math.ceil((timelineMonths / 12) * paymentsPerYear);
  const paymentAmount = totalReturn / totalPayments;
  const principal = investmentAmount / totalPayments;
  const interest = (totalReturn - investmentAmount) / totalPayments;

  // Generate schedule
  const startDate = new Date();
  const monthsPerPayment = 12 / paymentsPerYear;

  for (let i = 0; i < totalPayments; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + monthsPerPayment * (i + 1));

    scheduleItems.push({
      id: `payment-${i + 1}`,
      dueDate: dueDate.toISOString(),
      amount: paymentAmount,
      principal,
      interest,
      status: 'pending',
    });
  }

  return {
    investmentConditionId: '',
    investmentAmount,
    totalRepaymentAmount: totalReturn,
    schedule: scheduleItems,
    createdAt: new Date().toISOString(),
  };
}

// Helper function to calculate total expected return
export function calculateExpectedReturn(principal: number, roi: number): number {
  return principal * (1 + roi / 100);
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
