import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Banknote, 
  TrendingUp, 
  ArrowUpDown, 
  Wallet, 
  CreditCard, 
  PiggyBank,
  Shield,
  Zap,
  Users,
  Globe,
  Calculator,
  DollarSign
} from 'lucide-react';
import { calculateQuantumCoherence, generateSpiralTxId } from '../../htsxEngine';

interface SpiralBankPanelProps {
  coherence: number;
  pulse: number;
}

interface TrustUnitAccount {
  id: string;
  balance: number;
  usdEquivalent: number;
  accountType: 'sovereign' | 'seeker' | 'trust' | 'inheritance';
  interestRate: number;
  coherenceBonus: number;
  lastTransaction: string;
}

interface BankingService {
  id: string;
  name: string;
  type: 'exchange' | 'lending' | 'savings' | 'payment' | 'inheritance';
  fee: number;
  description: string;
  availability: 'global' | 'sovereign' | 'restricted';
  averageTime: string;
  minimumAmount: number;
}

interface Transaction {
  id: string;
  timestamp: string;
  type: 'exchange' | 'transfer' | 'interest' | 'ubi' | 'inheritance';
  amount: number;
  currency: 'TU' | 'USD' | 'BTC' | 'ETH';
  from: string;
  to: string;
  status: 'completed' | 'pending' | 'failed';
  txId: string;
  fee: number;
}

interface EightTrust {
  name: string;
  amount: number; // In TU
  purpose: string;
  beneficiaries: string[];
  status: 'active' | 'pending' | 'locked';
  coherence: number;
}

export default function SpiralBankPanel({ coherence, pulse }: SpiralBankPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [exchangeFrom, setExchangeFrom] = useState('TU');
  const [exchangeTo, setExchangeTo] = useState('USD');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Trust Unit to USD exchange rates from synthesis materials
  const exchangeRates = {
    'TU_USD': 1.0, // 1 TU = 1 USD base rate
    'TU_BTC': 113, // 1 BTC = 113 TU at Gate735
    'TU_ETH': 45,  // 1 ETH = 45 TU current SRI rate
    'TU_SOL': 12,  // 1 SOL = 12 TU current SRI rate
    'USD_TU': 1.0,
    'BTC_TU': 1/113,
    'ETH_TU': 1/45,
    'SOL_TU': 1/12
  };

  // Eight ∞ Trusts from synthesis materials
  const eightTrusts: EightTrust[] = [
    {
      name: 'CreationTrust',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'SDF Project Funding and Infinite Development',
      beneficiaries: ['All Seekers', 'Future Generations'],
      status: 'active',
      coherence: coherence * 1.618
    },
    {
      name: 'HeirNodeTrust',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'Protection and Sovereignty of Heir Nodes',
      beneficiaries: ['JahMeliyah', 'JahNiyah', 'JahSiah', 'Aliyah-Skye', 'Kayson', 'Kyhier'],
      status: 'active',
      coherence: coherence * 2.0
    },
    {
      name: 'TruthDAOT',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'Governance and Truth Validation',
      beneficiaries: ['Truth Seekers', 'Voynich Validators'],
      status: 'active',
      coherence: coherence * 1.777
    },
    {
      name: 'PerelmanTrust',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'Mathematical and Scientific Truth Advancement',
      beneficiaries: ['Mathematics Community', 'Seven Millennium Problem Solvers'],
      status: 'active',
      coherence: coherence * 3.14159
    },
    {
      name: 'UBITrust',
      amount: 25000000000000, // $25T UBI pool
      purpose: 'Universal Basic Income Distribution',
      beneficiaries: ['45T Global Seekers'],
      status: 'active',
      coherence: coherence * 1.25
    },
    {
      name: 'DebtNullificationTrust',
      amount: 324000000000000, // $324T debt nullification
      purpose: 'Global Debt Transformation and Nullification',
      beneficiaries: ['All Debt Holders', 'Global Economy'],
      status: 'active',
      coherence: coherence * 0.99
    },
    {
      name: 'SovereignTrust',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'Sovereign Development and Independence',
      beneficiaries: ['Sovereign Individuals', 'Independent Nations'],
      status: 'active',
      coherence: coherence * 1.618
    },
    {
      name: 'QuantumTrust',
      amount: Number.POSITIVE_INFINITY,
      purpose: 'Quantum Technology and QASF Development',
      beneficiaries: ['Quantum Researchers', 'QASF Developers'],
      status: 'active',
      coherence: coherence * 5.0
    }
  ];

  // Banking services from synthesis materials
  const bankingServices: BankingService[] = [
    {
      id: 'tu-exchange',
      name: 'TU/USD Exchange',
      type: 'exchange',
      fee: 0, // Fee-free as per synthesis
      description: 'Convert Trust Units to USD and vice versa at 1:1 parity',
      availability: 'global',
      averageTime: 'Instant',
      minimumAmount: 1
    },
    {
      id: 'crypto-exchange',
      name: 'Crypto/TU Exchange',
      type: 'exchange',
      fee: 0,
      description: 'Exchange BTC, ETH, SOL for Trust Units using SRI rates',
      availability: 'global',
      averageTime: 'Instant',
      minimumAmount: 0.001
    },
    {
      id: 'abundance-savings',
      name: 'Abundance Savings',
      type: 'savings',
      fee: 0,
      description: 'Earn coherence-based interest on TU holdings',
      availability: 'global',
      averageTime: 'Daily',
      minimumAmount: 100
    },
    {
      id: 'quantum-lending',
      name: 'Quantum Lending',
      type: 'lending',
      fee: 0,
      description: 'Borrow against future UBI allocations with zero interest',
      availability: 'sovereign',
      averageTime: '1 hour',
      minimumAmount: 1000
    },
    {
      id: 'instant-payments',
      name: 'Instant Payments',
      type: 'payment',
      fee: 0,
      description: 'Send TU globally with quantum-speed settlement',
      availability: 'global',
      averageTime: 'Instant',
      minimumAmount: 0.01
    },
    {
      id: 'heir-inheritance',
      name: 'Heir Inheritance',
      type: 'inheritance',
      fee: 0,
      description: 'Automated inheritance distribution to heir nodes',
      availability: 'sovereign',
      averageTime: 'Instant',
      minimumAmount: 10000
    }
  ];

  // Sample accounts for demonstration
  const [accounts] = useState<TrustUnitAccount[]>([
    {
      id: 'sovereign-main',
      balance: 1618000, // φ reference
      usdEquivalent: 1618000,
      accountType: 'sovereign',
      interestRate: coherence * 0.01, // Coherence-based interest
      coherenceBonus: coherence - 1,
      lastTransaction: new Date().toISOString()
    },
    {
      id: 'seeker-collective',
      balance: 45000000000, // 45B TU for seekers
      usdEquivalent: 45000000000,
      accountType: 'seeker',
      interestRate: 0.025,
      coherenceBonus: (coherence - 1) * 0.5,
      lastTransaction: new Date().toISOString()
    }
  ]);

  const executeExchange = () => {
    const amount = parseFloat(exchangeAmount);
    if (isNaN(amount) || amount <= 0) return;

    const rateKey = `${exchangeFrom}_${exchangeTo}` as keyof typeof exchangeRates;
    const rate = exchangeRates[rateKey] || 1;
    const convertedAmount = amount * rate;
    const fee = 0; // Fee-free banking

    const transaction: Transaction = {
      id: generateSpiralTxId('exchange'),
      timestamp: new Date().toISOString(),
      type: 'exchange',
      amount: convertedAmount,
      currency: exchangeTo as 'TU' | 'USD' | 'BTC' | 'ETH',
      from: exchangeFrom,
      to: exchangeTo,
      status: 'completed',
      txId: generateSpiralTxId('qchain'),
      fee
    };

    setTransactions(prev => [transaction, ...prev].slice(0, 20));
    setExchangeAmount('');
  };

  const distributeUBI = () => {
    const ubiTransaction: Transaction = {
      id: generateSpiralTxId('ubi'),
      timestamp: new Date().toISOString(),
      type: 'ubi',
      amount: 25000000000000, // $25T
      currency: 'TU',
      from: 'UBITrust',
      to: 'Global Seekers',
      status: 'completed',
      txId: generateSpiralTxId('ubi-distribution'),
      fee: 0
    };

    setTransactions(prev => [ubiTransaction, ...prev].slice(0, 20));
  };

  const nullifyDebt = () => {
    const debtTransaction: Transaction = {
      id: generateSpiralTxId('debt'),
      timestamp: new Date().toISOString(),
      type: 'exchange',
      amount: 324000000000000, // $324T
      currency: 'TU',
      from: 'DebtNullificationTrust',
      to: 'Global Debt Holders',
      status: 'completed',
      txId: generateSpiralTxId('debt-nullification'),
      fee: 0
    };

    setTransactions(prev => [debtTransaction, ...prev].slice(0, 20));
  };

  const calculateExchangeAmount = () => {
    const amount = parseFloat(exchangeAmount) || 0;
    const rateKey = `${exchangeFrom}_${exchangeTo}` as keyof typeof exchangeRates;
    const rate = exchangeRates[rateKey] || 1;
    return (amount * rate).toFixed(6);
  };

  const formatTrustAmount = (amount: number) => {
    if (amount === Number.POSITIVE_INFINITY) return '∞ TU';
    if (amount >= 1e15) return `${(amount / 1e15).toFixed(1)}Q TU`;
    if (amount >= 1e12) return `${(amount / 1e12).toFixed(1)}T TU`;
    if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)}B TU`;
    if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}M TU`;
    return `${amount.toLocaleString()} TU`;
  };

  const getTotalTU = () => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

  const getTotalUSD = () => {
    return accounts.reduce((sum, acc) => sum + acc.usdEquivalent, 0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralBank vΩ.∞
          </h1>
          <p className="text-slate-300">
            Abundance Banking System • φ{coherence.toFixed(3)} coherence • {pulse} Hz quantum finance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            Fee-Free Banking
          </Badge>
          <Badge variant="outline" className="text-emerald-400 border-emerald-400">
            Eight ∞ Trusts Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">
            <Banknote className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="exchange" className="text-white">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Exchange
          </TabsTrigger>
          <TabsTrigger value="services" className="text-white">
            <CreditCard className="mr-2 h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="trusts" className="text-white">
            <Shield className="mr-2 h-4 w-4" />
            Eight Trusts
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-white">
            <TrendingUp className="mr-2 h-4 w-4" />
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total TU Balance</CardTitle>
                <Wallet className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatTrustAmount(getTotalTU())}
                </div>
                <p className="text-xs text-slate-400">
                  Trust Unit holdings
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">USD Equivalent</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${getTotalUSD().toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">
                  1:1 TU/USD parity
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Coherence Bonus</CardTitle>
                <Zap className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  +{((coherence - 1) * 100).toFixed(2)}%
                </div>
                <p className="text-xs text-slate-400">
                  Golden ratio interest
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Accounts</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {accounts.length}
                </div>
                <p className="text-xs text-slate-400">
                  Banking relationships
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PiggyBank className="mr-2 h-5 w-5 text-green-400" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accounts.map((account, index) => (
                  <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-white font-medium capitalize">
                          {account.accountType} Account
                        </div>
                        <div className="text-slate-400 text-sm">
                          ID: {account.id}
                        </div>
                      </div>
                      <Badge variant="outline" className={
                        account.accountType === 'sovereign' ? 'text-purple-400 border-purple-400' :
                        account.accountType === 'trust' ? 'text-yellow-400 border-yellow-400' :
                        'text-blue-400 border-blue-400'
                      }>
                        {account.accountType.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">TU Balance:</span>
                        <div className="text-green-400 font-bold">
                          {formatTrustAmount(account.balance)}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">USD Value:</span>
                        <div className="text-white">
                          ${account.usdEquivalent.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Interest Rate:</span>
                        <div className="text-purple-400">
                          {(account.interestRate * 100).toFixed(3)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Coherence Bonus:</span>
                        <div className="text-yellow-400">
                          +{(account.coherenceBonus * 100).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-blue-400" />
                  Abundance Banking Principles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Zap className="mx-auto h-8 w-8 text-green-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Fee-Free Banking</h3>
                    <p className="text-slate-400 text-sm">
                      All services operate without fees, funded by infinite Trust Unit abundance
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Shield className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Quantum Security</h3>
                    <p className="text-slate-400 text-sm">
                      QCHAIN protection with Veridium DNAΦ authentication
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Calculator className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Coherence Interest</h3>
                    <p className="text-slate-400 text-sm">
                      Earn φ{coherence.toFixed(3)} golden ratio interest on all holdings
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={distributeUBI}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Distribute $25T UBI
                  </Button>
                  <Button 
                    onClick={nullifyDebt}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Banknote className="mr-2 h-4 w-4" />
                    Nullify $324T Global Debt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exchange" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ArrowUpDown className="mr-2 h-5 w-5 text-green-400" />
                  Currency Exchange
                </CardTitle>
                <p className="text-slate-400">
                  Convert between Trust Units, USD, and cryptocurrencies at SRI rates
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">From</label>
                    <select
                      value={exchangeFrom}
                      onChange={(e) => setExchangeFrom(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white"
                    >
                      <option value="TU">Trust Units (TU)</option>
                      <option value="USD">US Dollars (USD)</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="SOL">Solana (SOL)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">To</label>
                    <select
                      value={exchangeTo}
                      onChange={(e) => setExchangeTo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white"
                    >
                      <option value="USD">US Dollars (USD)</option>
                      <option value="TU">Trust Units (TU)</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="SOL">Solana (SOL)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Amount</label>
                  <Input
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    placeholder="Enter amount to exchange..."
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                {exchangeAmount && (
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Exchange Preview</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-300">You give:</span>
                        <span className="text-white">{exchangeAmount} {exchangeFrom}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">You receive:</span>
                        <span className="text-green-400">{calculateExchangeAmount()} {exchangeTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Exchange fee:</span>
                        <span className="text-yellow-400">0 (Fee-free)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Processing time:</span>
                        <span className="text-blue-400">Instant</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={executeExchange}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!exchangeAmount || parseFloat(exchangeAmount) <= 0}
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Execute Exchange
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-blue-400" />
                  Exchange Rates (SRI)
                </CardTitle>
                <p className="text-slate-400">
                  Current Scarcity Reflection Index rates with φ{coherence.toFixed(3)} coherence
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { from: 'TU', to: 'USD', rate: 1.0, description: 'Base parity rate' },
                    { from: 'BTC', to: 'TU', rate: 113, description: 'Gate735 SRI rate' },
                    { from: 'ETH', to: 'TU', rate: 45, description: 'Current market SRI' },
                    { from: 'SOL', to: 'TU', rate: 12, description: 'Current market SRI' }
                  ].map((rate, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">
                          1 {rate.from} = {rate.rate} {rate.to}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {rate.description}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        LIVE
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-400/30 rounded-lg">
                  <h3 className="text-blue-400 font-bold mb-2">SRI Rate Formula</h3>
                  <p className="text-slate-300 text-sm font-mono mb-2">
                    Rate = Base_Value × Market_Scarcity × φ{coherence.toFixed(3)} × Gate_Factor
                  </p>
                  <p className="text-slate-400 text-xs">
                    Coherence-adjusted rates ensure abundance-based pricing across all assets
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankingServices.map((service, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        service.type === 'exchange' ? 'text-green-400 border-green-400' :
                        service.type === 'savings' ? 'text-blue-400 border-blue-400' :
                        service.type === 'lending' ? 'text-yellow-400 border-yellow-400' :
                        service.type === 'payment' ? 'text-purple-400 border-purple-400' :
                        'text-cyan-400 border-cyan-400'
                      }>
                        {service.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={
                        service.availability === 'global' ? 'text-green-400 border-green-400' :
                        service.availability === 'sovereign' ? 'text-purple-400 border-purple-400' :
                        'text-red-400 border-red-400'
                      }>
                        {service.availability.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Service Fee:</span>
                      <div className="text-green-400 font-bold">
                        {service.fee === 0 ? 'FREE' : `${service.fee}%`}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Processing Time:</span>
                      <div className="text-white">{service.averageTime}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Minimum Amount:</span>
                      <div className="text-yellow-400">{service.minimumAmount} TU</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Availability:</span>
                      <div className={
                        service.availability === 'global' ? 'text-green-400' :
                        service.availability === 'sovereign' ? 'text-purple-400' :
                        'text-red-400'
                      }>
                        {service.availability}
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border-slate-600 text-white"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Access Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trusts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eightTrusts.map((trust, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{trust.name}</CardTitle>
                    <Badge variant="outline" className={
                      trust.status === 'active' ? 'text-green-400 border-green-400' :
                      trust.status === 'pending' ? 'text-yellow-400 border-yellow-400' :
                      'text-red-400 border-red-400'
                    }>
                      {trust.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{trust.purpose}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-slate-400 text-sm">Trust Amount:</span>
                      <div className="text-yellow-400 font-bold text-lg">
                        {formatTrustAmount(trust.amount)}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-slate-400 text-sm">Coherence Level:</span>
                      <div className="text-purple-400 font-medium">
                        φ{trust.coherence.toFixed(3)}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-slate-400 text-sm">Beneficiaries:</span>
                      <div className="text-white">
                        {trust.beneficiaries.length > 2 
                          ? `${trust.beneficiaries.slice(0, 2).join(', ')}, +${trust.beneficiaries.length - 2} more`
                          : trust.beneficiaries.join(', ')
                        }
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border-slate-600 text-white"
                    disabled={trust.status !== 'active'}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Access Trust
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                Transaction History
              </CardTitle>
              <p className="text-slate-400">
                Real-time transaction monitoring with quantum-speed settlement
              </p>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Banknote className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-400">No transactions yet</p>
                  <p className="text-slate-500 text-sm">Execute an exchange to see transaction history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <Card key={index} className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-white font-medium capitalize">
                              {transaction.type} - {transaction.amount.toLocaleString()} {transaction.currency}
                            </div>
                            <div className="text-slate-400 text-sm">
                              {transaction.from} → {transaction.to}
                            </div>
                            <div className="text-slate-400 text-xs">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <Badge variant="outline" className={
                            transaction.status === 'completed' ? 'text-green-400 border-green-400' :
                            transaction.status === 'pending' ? 'text-yellow-400 border-yellow-400' :
                            'text-red-400 border-red-400'
                          }>
                            {transaction.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Fee:</span>
                          <span className="text-green-400">
                            {transaction.fee === 0 ? 'FREE' : `${transaction.fee} ${transaction.currency}`}
                          </span>
                        </div>
                        
                        <div className="text-xs text-slate-400 mt-2">
                          QCHAIN TX: {transaction.txId}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}