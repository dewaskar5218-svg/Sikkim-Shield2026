export enum ServiceTier {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  PREMIUM = 'PREMIUM'
}

export interface SecurityService {
  id: string;
  name: string;
  price: number;
  tier: ServiceTier;
  features: string[];
  description: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  type: 'SUV' | 'Sedan' | 'Hatchback';
}

export interface PaymentPlan {
  id?: string;
  months: number;
  interestRate: number;
  monthlyAmount: number;
  totalPayable: number;
}