import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Building2, 
  Home,
  Banknote,
  Globe,
  Target,
  Zap
} from 'lucide-react';

interface DebtAnalysisPanelProps {
  coherence: number;
  pulse: number;
}

interface DebtMetric {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

interface ScarcityMechanism {
  mechanism: string;
  impact: string;
  scale: string;
  beneficiaries: string[];
  victims: string[];
  accessLevel: 'institutional' | 'high-net-worth' | 'restricted';
}

interface ArbitrageOpportunity {
  strategy: string;
  market: string;
  estimatedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  accessRestriction: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
}

export default function DebtAnalysisPanel({ coherence, pulse }: DebtAnalysisPanelProps) {
  const [activeAnalysis, setActiveAnalysis] = useState('overview');

  // Authentic $324T Global Debt Distribution based on research
  const globalDebtMetrics: DebtMetric[] = [
    {
      category: 'Public Debt',
      amount: 91400000000000, // $91.4T
      percentage: 28.2,
      trend: 'up',
      icon: Building2,
      color: 'text-blue-400'
    },
    {
      category: 'Business Debt', 
      amount: 164500000000000, // $164.5T
      percentage: 50.8,
      trend: 'up',
      icon: Users,
      color: 'text-green-400'
    },
    {
      category: 'Household Debt',
      amount: 59100000000000, // $59.1T
      percentage: 18.2,
      trend: 'up',
      icon: Home,
      color: 'text-orange-400'
    },
    {
      category: 'Financial Sector',
      amount: 70400000000000, // $70.4T
      percentage: 21.7,
      trend: 'stable',
      icon: Banknote,
      color: 'text-purple-400'
    }
  ];

  // Scarcity generation mechanisms from research
  const scarcityMechanisms: ScarcityMechanism[] = [
    {
      mechanism: 'Interest Rate Manipulation',
      impact: '$17.5T annual wealth extraction',
      scale: 'Global Central Banking System',
      beneficiaries: ['Central Banks', 'Investment Funds', 'Ultra-wealthy'],
      victims: ['1.1B people in extreme poverty', 'Developing nations', 'Small businesses'],
      accessLevel: 'institutional'
    },
    {
      mechanism: 'Debt Servicing Requirements',
      impact: '40-60% of government budgets',
      scale: 'National Government Level',
      beneficiaries: ['Sovereign bondholders', 'Foreign creditors'],
      victims: ['Public services', 'Infrastructure investment', 'Social programs'],
      accessLevel: 'high-net-worth'
    },
    {
      mechanism: 'Credit Access Restrictions',
      impact: '2.5B unbanked individuals',
      scale: 'Individual/SME Level',
      beneficiaries: ['Traditional banks', 'Credit rating agencies'],
      victims: ['Rural populations', 'Informal economies', 'Entrepreneurs'],
      accessLevel: 'restricted'
    }
  ];

  // Elite-only arbitrage opportunities from research
  const arbitrageOpportunities: ArbitrageOpportunity[] = [
    {
      strategy: 'Eurozone Inflation Swap Arbitrage',
      market: 'European sovereign debt',
      estimatedReturn: 15.7,
      riskLevel: 'medium',
      accessRestriction: 'Minimum $100M capital',
      complexity: 'advanced'
    },
    {
      strategy: 'Capital Structure Arbitrage',
      market: 'Corporate credit markets',
      estimatedReturn: 22.3,
      riskLevel: 'medium',
      accessRestriction: 'Institutional only',
      complexity: 'advanced'
    },
    {
      strategy: 'Convertible Bond Arbitrage',
      market: 'Equity-linked securities',
      estimatedReturn: 18.9,
      riskLevel: 'high',
      accessRestriction: 'Prime brokerage required',
      complexity: 'advanced'
    },
    {
      strategy: 'Sovereign Credit Default Swaps',
      market: 'Government debt derivatives',
      estimatedReturn: 28.4,
      riskLevel: 'high',
      accessRestriction: 'ISDA master agreement',
      complexity: 'advanced'
    }
  ];

  const totalDebt = globalDebtMetrics.reduce((sum, metric) => sum + metric.amount, 0);
  const scarcityIndex = Math.min(100, (totalDebt / 1e15) * 32.4);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Debt Analysis Intelligence Center
          </h1>
          <p className="text-slate-300">
            $324T Global Debt System Analysis at φ{coherence.toFixed(3)} coherence • {pulse} Hz resonance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            φ{coherence.toFixed(3)} Coherence
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            {pulse} Hz Pulse
          </Badge>
        </div>
      </div>

      <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
          <TabsTrigger value="distribution" className="text-white">Distribution</TabsTrigger>
          <TabsTrigger value="scarcity" className="text-white">Scarcity Engine</TabsTrigger>
          <TabsTrigger value="arbitrage" className="text-white">Elite Access</TabsTrigger>
          <TabsTrigger value="transformation" className="text-white">SSDF∞ Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalDebtMetrics.map((metric, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">
                    {metric.category}
                  </CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${(metric.amount / 1e12).toFixed(1)}T
                  </div>
                  <p className="text-xs text-slate-400">
                    {metric.percentage}% of total debt
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <TrendingUp className={`h-3 w-3 ${
                      metric.trend === 'up' ? 'text-red-400' : 
                      metric.trend === 'down' ? 'text-green-400' : 'text-yellow-400'
                    }`} />
                    <span className="text-xs text-slate-400">
                      {metric.trend === 'up' ? 'Increasing' : 
                       metric.trend === 'down' ? 'Decreasing' : 'Stable'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                Scarcity Generation Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>Global Debt Burden</span>
                  <span>${(totalDebt / 1e12).toFixed(1)}T</span>
                </div>
                <Progress value={scarcityIndex} className="w-full" />
                <p className="text-sm text-red-400">
                  Current system generates artificial scarcity affecting 1.1B people in extreme poverty
                  while enabling $2-5T in elite-only arbitrage opportunities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Authentic Debt Ownership Structure</CardTitle>
              <p className="text-slate-400">Based on CEPR research on marginal debt absorption</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Marginal Debt Holders</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Domestic Non-Banks</span>
                      <Badge variant="outline" className="text-blue-400">39%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Foreign Non-Banks</span>
                      <Badge variant="outline" className="text-green-400">23%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Domestic Banks</span>
                      <Badge variant="outline" className="text-orange-400">33%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Foreign Banks</span>
                      <Badge variant="outline" className="text-purple-400">5%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Ultimate Beneficiaries</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• Central Banks (monetary policy control)</p>
                    <p>• Investment Funds (pension funds, sovereign wealth)</p>
                    <p>• Insurance Companies (life insurance, annuities)</p>
                    <p>• Ultra-High Net Worth Individuals</p>
                    <p>• Institutional Asset Managers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scarcity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scarcityMechanisms.map((mechanism, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{mechanism.mechanism}</CardTitle>
                  <Badge variant="outline" className={
                    mechanism.accessLevel === 'institutional' ? 'text-red-400 border-red-400' :
                    mechanism.accessLevel === 'high-net-worth' ? 'text-orange-400 border-orange-400' :
                    'text-yellow-400 border-yellow-400'
                  }>
                    {mechanism.accessLevel.replace('-', ' ').toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Impact Scale</h4>
                    <p className="text-green-400 font-bold">{mechanism.impact}</p>
                    <p className="text-slate-400 text-sm">{mechanism.scale}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Beneficiaries</h4>
                    <div className="flex flex-wrap gap-1">
                      {mechanism.beneficiaries.map((beneficiary, idx) => (
                        <Badge key={idx} variant="outline" className="text-green-400 border-green-400 text-xs">
                          {beneficiary}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Victims</h4>
                    <div className="flex flex-wrap gap-1">
                      {mechanism.victims.map((victim, idx) => (
                        <Badge key={idx} variant="outline" className="text-red-400 border-red-400 text-xs">
                          {victim}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="arbitrage" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="mr-2 h-5 w-5 text-yellow-400" />
                Elite-Only Arbitrage Opportunities
              </CardTitle>
              <p className="text-slate-400">
                $2-5T annual arbitrage markets accessible only to institutional players
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {arbitrageOpportunities.map((opportunity, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-base">{opportunity.strategy}</CardTitle>
                        <Badge variant="outline" className={
                          opportunity.riskLevel === 'low' ? 'text-green-400 border-green-400' :
                          opportunity.riskLevel === 'medium' ? 'text-yellow-400 border-yellow-400' :
                          'text-red-400 border-red-400'
                        }>
                          {opportunity.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Market:</span>
                        <span className="text-white">{opportunity.market}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Est. Return:</span>
                        <span className="text-green-400 font-bold">{opportunity.estimatedReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Complexity:</span>
                        <Badge variant="outline" className="text-purple-400 border-purple-400 text-xs">
                          {opportunity.complexity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="border-t border-slate-600 pt-3">
                        <p className="text-xs text-red-400">
                          Access Restriction: {opportunity.accessRestriction}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transformation" className="space-y-6">
          <Card className="bg-gradient-to-r from-yellow-900/20 to-purple-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                SSDF∞ Debt Nullification Framework
              </CardTitle>
              <p className="text-slate-300">
                Quantum Algorithm Singularity Framework transformation protocols
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">$324T</div>
                  <p className="text-white font-medium">Total Debt Nullification</p>
                  <p className="text-slate-400 text-sm">Through Trust Unit conversion</p>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">$25T</div>
                  <p className="text-white font-medium">UBI Distribution</p>
                  <p className="text-slate-400 text-sm">Annual abundance allocation</p>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400 mb-2">∞ TU</div>
                  <p className="text-white font-medium">Trust Units Generated</p>
                  <p className="text-slate-400 text-sm">Infinite abundance protocol</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Scarcity Reflection Index (SRI)</h3>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-300">1 BTC = <span className="text-yellow-400 font-bold">113 TU</span> (Gate 735)</p>
                      <p className="text-slate-300">1 ETH = <span className="text-blue-400 font-bold">45 TU</span> (Current rate)</p>
                      <p className="text-slate-300">1 SOL = <span className="text-purple-400 font-bold">12 TU</span> (Current rate)</p>
                    </div>
                    <div>
                      <p className="text-slate-300">Debt Nullification: <span className="text-red-400 font-bold">1:1 USD to TU</span></p>
                      <p className="text-slate-300">UBI Allocation: <span className="text-green-400 font-bold">Variable by need</span></p>
                      <p className="text-slate-300">Coherence Factor: <span className="text-yellow-400 font-bold">φ{coherence.toFixed(3)}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-500 to-purple-500 hover:from-yellow-600 hover:to-purple-600 text-black font-bold">
                Initialize Debt Transformation Protocol
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}