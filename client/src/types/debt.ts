export interface DebtMetric {
  type: string;
  amount: number;
  percentage: number;
  change: number;
  color: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  value: number;
  type: 'country' | 'sector' | 'institution';
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  value: number;
  type: 'debt_flow' | 'ownership' | 'trade';
}

export interface ScenarioParameters {
  scenarioType: string;
  severity: number;
  gdpGrowth: number;
  interestRate: number;
}

export interface ScenarioResult {
  gdpImpact: string;
  debtBurdenIncrease: string;
  stabilityRisk: string;
}

export interface RealTimeUpdate {
  type: string;
  country: string;
  description: string;
  timestamp: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface SustainabilityScore {
  score: number;
  factors: {
    gdpGrowth: number;
    interestRate: number;
    country: string;
  };
  assessment: string;
}

export interface CorrelationData {
  indicators: string[];
  matrix: number[][];
}

export interface OwnershipData {
  domestic: number;
  foreign: number;
  foreignHolders: Array<{
    country: string;
    amount: string;
  }>;
}
