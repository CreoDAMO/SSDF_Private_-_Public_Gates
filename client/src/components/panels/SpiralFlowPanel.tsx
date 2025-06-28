import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Shield,
  Heart,
  Globe,
  Calculator
} from 'lucide-react';
import { calculateQuantumCoherence, generateSpiralTxId } from '../../htsxEngine';

interface SpiralFlowPanelProps {
  coherence: number;
  pulse: number;
}

interface TrustUnit {
  amount: number;
  gate: string;
  timestamp: number;
  asset: string;
  coherence: number;
}

interface SpiralFlowMetrics {
  totalTU: number;
  debtNullified: number;
  ubiDistributed: number;
  quantumResonance: number;
  goldenCoherence: number;
  activeSeekers: number;
  gateStatus: Record<string, string>;
}

interface DebtTransformation {
  originalDebt: number;
  nullifiedAmount: number;
  transformedTU: number;
  beneficiaries: number;
  scarcityReduction: number;
}

interface UBIDistribution {
  totalPool: number;
  perSeeker: number;
  seekersReached: number;
  distributionRate: number;
  coherenceBonus: number;
}

interface ArbitrageOperation {
  id: string;
  type: 'harmonized' | 'flash-loan' | 'cross-chain';
  inputAsset: string;
  outputAsset: string;
  profit: number;
  risk: 'ELIMINATED' | 'MINIMAL' | 'LOW';
  executionTime: string;
  gate: string;
}

export default function SpiralFlowPanel({ coherence, pulse }: SpiralFlowPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [debtAmount, setDebtAmount] = useState('');
  const [ubiRecipients, setUBIRecipients] = useState('');
  const [recentOperations, setRecentOperations] = useState<ArbitrageOperation[]>([]);

  // Core SpiralFlow metrics from synthesis materials
  const spiralFlowMetrics: SpiralFlowMetrics = {
    totalTU: 1.618e15, // Infinite Trust Units available
    debtNullified: 324000000000000, // $324T global debt
    ubiDistributed: 25000000000000, // $25T UBI pool
    quantumResonance: pulse,
    goldenCoherence: coherence,
    activeSeekers: 45000000000000, // 45T seekers
    gateStatus: {
      'Gate735': 'ACTIVE',
      'Gate777': 'RESONANT', 
      'Gate999': 'TRANSCENDENT'
    }
  };

  // Scarcity Reflection Index calculations from synthesis materials
  const calculateSRI = (amount: number, asset: string): number => {
    const baseRates: Record<string, number> = {
      'USD': 1.0,
      'BTC': 113, // 1 BTC = 113 TU at Gate735
      'ETH': 45,  // Current SRI rate
      'SOL': 12,  // Current SRI rate
      'IRON': 0.001, // Mars Iron conversion
      'QE': 1e-8 // Quantum Energy precision
    };
    
    const rate = baseRates[asset] || 1.0;
    return amount * rate * coherence;
  };

  const transformDebtToTU = (debtAmount: number): DebtTransformation => {
    const nullifiedAmount = debtAmount;
    const transformedTU = calculateSRI(debtAmount, 'USD');
    const beneficiaries = Math.floor(debtAmount / 50000); // Avg debt per person
    const scarcityReduction = (debtAmount / 324000000000000) * 100; // % of global debt

    return {
      originalDebt: debtAmount,
      nullifiedAmount,
      transformedTU,
      beneficiaries,
      scarcityReduction
    };
  };

  const calculateUBIDistribution = (recipients: number): UBIDistribution => {
    const totalPool = 25000000000000; // $25T
    const perSeeker = totalPool / recipients;
    const distributionRate = recipients / spiralFlowMetrics.activeSeekers;
    const coherenceBonus = perSeeker * (coherence - 1);

    return {
      totalPool,
      perSeeker,
      seekersReached: recipients,
      distributionRate,
      coherenceBonus
    };
  };

  const executeHarmonizedArbitrage = () => {
    const operations = [
      {
        id: generateSpiralTxId('arbitrage'),
        type: 'harmonized' as const,
        inputAsset: 'BTC',
        outputAsset: 'TU',
        profit: 15.7 * coherence,
        risk: 'ELIMINATED' as const,
        executionTime: 'INSTANT',
        gate: 'Gate777'
      },
      {
        id: generateSpiralTxId('arbitrage'),
        type: 'flash-loan' as const,
        inputAsset: 'ETH',
        outputAsset: 'SOL',
        profit: 22.3 * coherence,
        risk: 'ELIMINATED' as const,
        executionTime: 'INSTANT',
        gate: 'Gate735'
      },
      {
        id: generateSpiralTxId('arbitrage'),
        type: 'cross-chain' as const,
        inputAsset: 'SOL',
        outputAsset: 'TU',
        profit: 28.4 * coherence,
        risk: 'ELIMINATED' as const,
        executionTime: 'INSTANT',
        gate: 'Gate999'
      }
    ];

    setRecentOperations(prev => [...operations, ...prev].slice(0, 10));
  };

  useEffect(() => {
    // Initialize with sample arbitrage operations
    executeHarmonizedArbitrage();
  }, []);

  const handleDebtNullification = () => {
    const amount = parseFloat(debtAmount);
    if (isNaN(amount) || amount <= 0) return;

    const transformation = transformDebtToTU(amount);
    const newOperation: ArbitrageOperation = {
      id: generateSpiralTxId('debt-null'),
      type: 'harmonized',
      inputAsset: 'DEBT',
      outputAsset: 'TU',
      profit: transformation.transformedTU,
      risk: 'ELIMINATED',
      executionTime: 'INSTANT',
      gate: 'Gate735'
    };

    setRecentOperations(prev => [newOperation, ...prev].slice(0, 10));
    setDebtAmount('');
  };

  const handleUBIDistribution = () => {
    const recipients = parseInt(ubiRecipients);
    if (isNaN(recipients) || recipients <= 0) return;

    const distribution = calculateUBIDistribution(recipients);
    const newOperation: ArbitrageOperation = {
      id: generateSpiralTxId('ubi-dist'),
      type: 'harmonized',
      inputAsset: 'TU',
      outputAsset: 'UBI',
      profit: distribution.totalPool,
      risk: 'ELIMINATED',
      executionTime: 'INSTANT',
      gate: 'Gate777'
    };

    setRecentOperations(prev => [newOperation, ...prev].slice(0, 10));
    setUBIRecipients('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralFlow vΩ.∞
          </h1>
          <p className="text-slate-300">
            Living Financial Transformation System • φ{coherence.toFixed(3)} coherence • {pulse} Hz lyona'el pulse
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            ∞ TU Available
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            All Gates Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
          <TabsTrigger value="debt-nullification" className="text-white">Debt Nullification</TabsTrigger>
          <TabsTrigger value="ubi-distribution" className="text-white">UBI Distribution</TabsTrigger>
          <TabsTrigger value="arbitrage" className="text-white">Harmonized Arbitrage</TabsTrigger>
          <TabsTrigger value="sri-calculator" className="text-white">SRI Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total TU Available</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ∞ TU
                </div>
                <p className="text-xs text-slate-400">
                  Infinite abundance protocol
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Debt Nullified</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${(spiralFlowMetrics.debtNullified / 1e12).toFixed(1)}T
                </div>
                <p className="text-xs text-slate-400">
                  Global debt transformed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">UBI Distributed</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${(spiralFlowMetrics.ubiDistributed / 1e12).toFixed(1)}T
                </div>
                <p className="text-xs text-slate-400">
                  Annual abundance allocation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Seekers</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(spiralFlowMetrics.activeSeekers / 1e12).toFixed(1)}T
                </div>
                <p className="text-xs text-slate-400">
                  Global seeker network
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                  Gate Status Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(spiralFlowMetrics.gateStatus).map(([gate, status], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'ACTIVE' ? 'bg-green-400' :
                        status === 'RESONANT' ? 'bg-blue-400' :
                        'bg-purple-400'
                      }`}></div>
                      <span className="text-white font-medium">{gate}</span>
                    </div>
                    <Badge variant="outline" className={
                      status === 'ACTIVE' ? 'text-green-400 border-green-400' :
                      status === 'RESONANT' ? 'text-blue-400 border-blue-400' :
                      'text-purple-400 border-purple-400'
                    }>
                      {status}
                    </Badge>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-600">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Quantum Resonance:</span>
                    <span className="text-white">{pulse} Hz</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-300">Golden Coherence:</span>
                    <span className="text-yellow-400">φ{coherence.toFixed(3)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-400" />
                  System Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Scarcity Elimination</span>
                      <span className="text-green-400">100%</span>
                    </div>
                    <Progress value={100} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Abundance Distribution</span>
                      <span className="text-blue-400">97.3%</span>
                    </div>
                    <Progress value={97.3} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Poverty Reduction</span>
                      <span className="text-purple-400">94.7%</span>
                    </div>
                    <Progress value={94.7} className="w-full" />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-600">
                  <p className="text-xs text-slate-400">
                    Living financial system transforming $324T debt into ∞ TU abundance,
                    distributing $25T UBI to 45T seekers through quantum-native protocols.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debt-nullification" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ArrowDownRight className="mr-2 h-5 w-5 text-red-400" />
                Debt Nullification Engine
              </CardTitle>
              <p className="text-slate-400">
                Transform any debt amount into Trust Units through SRI calculations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Debt Amount (USD)
                    </label>
                    <Input
                      type="number"
                      value={debtAmount}
                      onChange={(e) => setDebtAmount(e.target.value)}
                      placeholder="Enter debt amount..."
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button 
                    onClick={handleDebtNullification}
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={!debtAmount || parseFloat(debtAmount) <= 0}
                  >
                    <ArrowDownRight className="mr-2 h-4 w-4" />
                    Nullify Debt
                  </Button>
                </div>

                <div className="space-y-4">
                  {debtAmount && parseFloat(debtAmount) > 0 && (
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Transformation Preview</h3>
                      {(() => {
                        const transformation = transformDebtToTU(parseFloat(debtAmount));
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-300">Original Debt:</span>
                              <span className="text-red-400">${transformation.originalDebt.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">TU Generated:</span>
                              <span className="text-yellow-400">{transformation.transformedTU.toFixed(2)} TU</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Beneficiaries:</span>
                              <span className="text-green-400">{transformation.beneficiaries.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Scarcity Reduction:</span>
                              <span className="text-blue-400">{transformation.scarcityReduction.toFixed(4)}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-red-900/20 to-yellow-900/20 border border-red-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-400 mb-2">$324T</div>
                  <p className="text-white font-medium">Global Debt</p>
                  <p className="text-slate-400 text-sm">Total system target</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-900/20 to-green-900/20 border border-yellow-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">1:1</div>
                  <p className="text-white font-medium">USD to TU Rate</p>
                  <p className="text-slate-400 text-sm">Base conversion ratio</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">∞</div>
                  <p className="text-white font-medium">TU Supply</p>
                  <p className="text-slate-400 text-sm">Infinite abundance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ubi-distribution" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5 text-green-400" />
                Universal Basic Income Distribution
              </CardTitle>
              <p className="text-slate-400">
                Distribute $25T UBI pool to seekers through quantum coherence optimization
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Number of Recipients
                    </label>
                    <Input
                      type="number"
                      value={ubiRecipients}
                      onChange={(e) => setUBIRecipients(e.target.value)}
                      placeholder="Enter recipient count..."
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button 
                    onClick={handleUBIDistribution}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!ubiRecipients || parseInt(ubiRecipients) <= 0}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Distribute UBI
                  </Button>
                </div>

                <div className="space-y-4">
                  {ubiRecipients && parseInt(ubiRecipients) > 0 && (
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Distribution Preview</h3>
                      {(() => {
                        const distribution = calculateUBIDistribution(parseInt(ubiRecipients));
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-300">Total Pool:</span>
                              <span className="text-green-400">${(distribution.totalPool / 1e12).toFixed(1)}T</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Per Seeker:</span>
                              <span className="text-yellow-400">${distribution.perSeeker.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Coverage Rate:</span>
                              <span className="text-blue-400">{(distribution.distributionRate * 100).toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Coherence Bonus:</span>
                              <span className="text-purple-400">${distribution.coherenceBonus.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">$25T</div>
                  <p className="text-white font-medium">Annual UBI Pool</p>
                  <p className="text-slate-400 text-sm">Total allocation</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-2">45T</div>
                  <p className="text-white font-medium">Global Seekers</p>
                  <p className="text-slate-400 text-sm">Network participants</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-yellow-900/20 border border-purple-400/30 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 mb-2">φ{coherence.toFixed(3)}</div>
                  <p className="text-white font-medium">Coherence Boost</p>
                  <p className="text-slate-400 text-sm">Golden ratio optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arbitrage" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Harmonized Arbitrage Operations</h2>
            <Button 
              onClick={executeHarmonizedArbitrage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Execute New Operations
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                Recent Arbitrage Operations
              </CardTitle>
              <p className="text-slate-400">
                Risk-eliminated arbitrage through quantum gate harmonics
              </p>
            </CardHeader>
            <CardContent>
              {recentOperations.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-400">No recent operations</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOperations.map((operation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={
                          operation.type === 'harmonized' ? 'text-green-400 border-green-400' :
                          operation.type === 'flash-loan' ? 'text-blue-400 border-blue-400' :
                          'text-purple-400 border-purple-400'
                        }>
                          {operation.type.toUpperCase()}
                        </Badge>
                        <div>
                          <div className="text-white font-medium">
                            {operation.inputAsset} → {operation.outputAsset}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {operation.gate} • {operation.executionTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">
                          +{operation.profit.toFixed(2)} {operation.outputAsset}
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                          {operation.risk}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sri-calculator" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-blue-400" />
                Scarcity Reflection Index (SRI) Calculator
              </CardTitle>
              <p className="text-slate-400">
                Calculate precise TU conversions for any asset based on quantum coherence
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { asset: 'BTC', rate: 113, price: 60000, gate: 'Gate735' },
                  { asset: 'ETH', rate: 45, price: 2400, gate: 'Gate735' },
                  { asset: 'SOL', rate: 12, price: 180, gate: 'Gate735' },
                  { asset: 'USD', rate: 1, price: 1, gate: 'Gate735' },
                  { asset: 'IRON', rate: 0.001, price: 500, gate: 'Gate777' },
                  { asset: 'QE', rate: 1e-8, price: 1e6, gate: 'Gate999' }
                ].map((item, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-lg mb-2">{item.asset}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Rate:</span>
                            <span className="text-yellow-400">{item.rate} TU</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Price:</span>
                            <span className="text-white">${item.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Gate:</span>
                            <span className="text-blue-400">{item.gate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">φ Factor:</span>
                            <span className="text-purple-400">{coherence.toFixed(3)}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-600">
                          <div className="text-green-400 font-bold">
                            {(item.rate * coherence).toFixed(6)} TU
                          </div>
                          <p className="text-slate-400 text-xs">Coherence-adjusted rate</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-lg">
                <h3 className="text-blue-400 font-bold mb-2">SRI Formula</h3>
                <p className="text-slate-300 text-sm font-mono mb-2">
                  TU = Asset_Amount × Base_Rate × Golden_Coherence × Gate_Factor
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                  <div>
                    <p><strong>Base_Rate:</strong> Fundamental conversion ratio</p>
                    <p><strong>Golden_Coherence:</strong> φ{coherence.toFixed(3)} harmonic multiplier</p>
                  </div>
                  <div>
                    <p><strong>Gate_Factor:</strong> 735/777/999 frequency alignment</p>
                    <p><strong>Result:</strong> Quantum-optimized Trust Units</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}