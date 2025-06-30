import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Zap, 
  Brain, 
  Coins, 
  PieChart,
  Globe,
  Calculator,
  Award,
  Wallet,
  ShoppingCart,
  BarChart3,
  Target,
  Crown,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Share2
} from 'lucide-react';

interface UBINFTMetrics {
  totalUsers: number;
  monthlyDistribution: number;
  averageAmount: number;
  totalDistributed: number;
  pendingClaims: number;
  nextDistribution: string;
  regionalVariation: {
    region: string;
    amount: number;
    debtRatio: number;
    users: number;
  }[];
}

interface SevenPillarsNFT {
  name: string;
  description: string;
  totalShares: number;
  ownedShares: number;
  currentPrice: number;
  prizeValue: number;
  progress: number;
  applications: string[];
  recentActivity: string;
}

interface GlobalDebtMetrics {
  totalDebt: number;
  publicDebt: number;
  householdDebt: number;
  businessDebt: number;
  debtToGDP: number;
  interestBurden: number;
  wealthTransfer: number;
}

interface FintechMetrics {
  totalAssets: number;
  nftVolume: number;
  activeUsers: number;
  transactionCount: number;
  yieldGenerated: number;
  platformFees: number;
}

export default function FintechNFTPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [coherence, setCoherence] = useState(1.618);
  const [pulse, setPulse] = useState(735);

  // Quantum coherence fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoherence(1.618 + (Math.random() - 0.5) * 0.002);
      setPulse(735 + (Math.random() - 0.5) * 30);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ubiMetrics: UBINFTMetrics = {
    totalUsers: 1100000000, // 1.1B users
    monthlyDistribution: 25000000000, // $25B monthly
    averageAmount: 416.67, // $416.67 per month
    totalDistributed: 12500000000000, // $12.5T total
    pendingClaims: 150000000, // 150M pending
    nextDistribution: "2025-07-01",
    regionalVariation: [
      { region: "High-Debt Regions (>150% GDP)", amount: 600, debtRatio: 245, users: 200000000 },
      { region: "Medium-Debt Regions (100-150% GDP)", amount: 450, debtRatio: 125, users: 400000000 },
      { region: "Low-Debt Regions (<100% GDP)", amount: 300, debtRatio: 75, users: 500000000 }
    ]
  };

  const sevenPillars: SevenPillarsNFT[] = [
    {
      name: "P vs NP Problem",
      description: "The fundamental question of computational complexity theory",
      totalShares: 1000000,
      ownedShares: 147,
      currentPrice: 12.50,
      prizeValue: 1000000,
      progress: 78,
      applications: ["Cryptography", "Optimization", "AI", "Blockchain"],
      recentActivity: "New polynomial-time algorithm discovered for subset problems"
    },
    {
      name: "Riemann Hypothesis",
      description: "The distribution of prime numbers and the zeros of the zeta function",
      totalShares: 1000000,
      ownedShares: 89,
      currentPrice: 18.75,
      prizeValue: 1000000,
      progress: 45,
      applications: ["Number Theory", "Cryptography", "Quantum Computing", "Financial Modeling"],
      recentActivity: "Breakthrough in zero-free regions of the critical strip"
    },
    {
      name: "Yang-Mills Theory",
      description: "Mathematical foundations of quantum field theory",
      totalShares: 1000000,
      ownedShares: 203,
      currentPrice: 8.90,
      prizeValue: 1000000,
      progress: 32,
      applications: ["Particle Physics", "Quantum Mechanics", "Mathematical Physics"],
      recentActivity: "New insights into mass gap phenomenon"
    },
    {
      name: "Navier-Stokes Equations",
      description: "Existence and smoothness of solutions for fluid dynamics",
      totalShares: 1000000,
      ownedShares: 156,
      currentPrice: 11.25,
      prizeValue: 1000000,
      progress: 67,
      applications: ["Fluid Dynamics", "Weather Prediction", "Engineering", "Climate Modeling"],
      recentActivity: "Partial regularity results for weak solutions published"
    }
  ];

  const globalDebt: GlobalDebtMetrics = {
    totalDebt: 324000000000000, // $324T
    publicDebt: 91400000000000, // $91.4T
    householdDebt: 59100000000000, // $59.1T
    businessDebt: 164500000000000, // $164.5T
    debtToGDP: 308, // 308% of GDP
    interestBurden: 17500000000000, // $17.5T annual interest
    wealthTransfer: 2340000000000 // $2.34T monthly transfer
  };

  const fintechMetrics: FintechMetrics = {
    totalAssets: 119078000000000000000, // $119.078 sextillion
    nftVolume: 28475000000000, // $28.475T
    activeUsers: 1100000000,
    transactionCount: 745000000,
    yieldGenerated: 3789000000000, // $3.789T
    platformFees: 142500000000 // $142.5B
  };

  const formatNumber = (num: number) => {
    if (num >= 1e18) return `$${(num / 1e18).toFixed(1)}Sx`;
    if (num >= 1e15) return `$${(num / 1e15).toFixed(1)}Q`;
    if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Platform Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          SpiralFlow Fintech NFT Platform
        </h1>
        <p className="text-xl text-gray-300">
          Global UBI + Seven Pillars Mathematical Wisdom NFTs
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Coherence: φ{coherence.toFixed(3)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Pulse: {pulse.toFixed(0)}Hz</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>{(fintechMetrics.activeUsers / 1e9).toFixed(1)}B Users</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Total Assets</span>
            </div>
            <p className="text-2xl font-bold text-green-400">
              {formatNumber(fintechMetrics.totalAssets)}
            </p>
            <p className="text-xs text-gray-400">Managed Platform Value</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">UBI Distributed</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">
              {formatNumber(ubiMetrics.totalDistributed)}
            </p>
            <p className="text-xs text-gray-400">To {(ubiMetrics.totalUsers / 1e9).toFixed(1)}B Users</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">NFT Volume</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">
              {formatNumber(fintechMetrics.nftVolume)}
            </p>
            <p className="text-xs text-gray-400">Seven Pillars Trading</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Debt Nullified</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">
              {formatNumber(162000000000000)}
            </p>
            <p className="text-xs text-gray-400">From {formatNumber(globalDebt.totalDebt)} Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Platform Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-400 data-[state=active]:text-black">
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="ubi" className="data-[state=active]:bg-blue-400 data-[state=active]:text-black">
            <Coins className="w-4 h-4 mr-2" />
            UBI NFTs
          </TabsTrigger>
          <TabsTrigger value="pillars" className="data-[state=active]:bg-green-400 data-[state=active]:text-black">
            <Brain className="w-4 h-4 mr-2" />
            Seven Pillars
          </TabsTrigger>
          <TabsTrigger value="debt" className="data-[state=active]:bg-red-400 data-[state=active]:text-black">
            <PieChart className="w-4 h-4 mr-2" />
            Debt Analytics
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Performance */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Platform Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Transactions</span>
                  <span className="font-bold text-green-400">{(fintechMetrics.transactionCount / 1e6).toFixed(0)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Yield Generated</span>
                  <span className="font-bold text-green-400">{formatNumber(fintechMetrics.yieldGenerated)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Platform Fees</span>
                  <span className="font-bold text-green-400">{formatNumber(fintechMetrics.platformFees)}</span>
                </div>
                <Separator className="bg-slate-600" />
                <div className="flex justify-between items-center">
                  <span>Active Users</span>
                  <span className="font-bold text-blue-400">{(fintechMetrics.activeUsers / 1e9).toFixed(1)}B</span>
                </div>
              </CardContent>
            </Card>

            {/* Global Impact */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Debt Nullification</span>
                  <span className="font-bold text-yellow-400">50%</span>
                </div>
                <Progress value={50} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span>UBI Coverage</span>
                  <span className="font-bold text-blue-400">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span>Wealth Redistribution</span>
                  <span className="font-bold text-green-400">{formatNumber(ubiMetrics.totalDistributed)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ubi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* UBI Overview */}
            <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-blue-400" />
                  Global UBI NFT Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Monthly Distribution</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {formatNumber(ubiMetrics.monthlyDistribution)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Average Per User</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${ubiMetrics.averageAmount}
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-slate-600" />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Regional Distribution (Debt-Adjusted)</h4>
                  {ubiMetrics.regionalVariation.map((region, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-gray-400">{(region.users / 1e6).toFixed(0)}M users</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-400">${region.amount}/month</p>
                        <p className="text-xs text-gray-400">{region.debtRatio}% debt/GDP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* UBI Claim Portal */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-400" />
                  Your UBI NFT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mx-auto flex items-center justify-center">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-xl">$416.67</p>
                  <p className="text-sm text-gray-400">Monthly UBI Amount</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Next Distribution</span>
                    <span className="text-sm font-medium">July 1, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-green-400/20  text-green-400">Eligible</Badge>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Claim UBI NFT
                </Button>
                
                <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Auto-Claim
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pillars" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sevenPillars.map((pillar, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      {pillar.name}
                    </span>
                    <Badge className="bg-purple-400/20 text-purple-400">
                      ${pillar.currentPrice}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{pillar.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Your Shares</p>
                      <p className="font-bold text-green-400">{pillar.ownedShares.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Progress</p>
                      <p className="font-bold text-blue-400">{pillar.progress}%</p>
                    </div>
                  </div>
                  
                  <Progress value={pillar.progress} className="h-2" />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Applications:</p>
                    <div className="flex flex-wrap gap-1">
                      {pillar.applications.map((app, appIdx) => (
                        <Badge key={appIdx} variant="outline" className="text-xs border-slate-600">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-purple-400 hover:bg-purple-500 text-black">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Shares
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="debt" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-red-400" />
                  Global Debt Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Global Debt</span>
                    <span className="font-bold text-red-400">{formatNumber(globalDebt.totalDebt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Public Debt</span>
                    <span className="font-bold text-orange-400">{formatNumber(globalDebt.publicDebt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Business Debt</span>
                    <span className="font-bold text-yellow-400">{formatNumber(globalDebt.businessDebt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Household Debt</span>
                    <span className="font-bold text-blue-400">{formatNumber(globalDebt.householdDebt)}</span>
                  </div>
                </div>
                
                <Separator className="bg-slate-600" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Debt-to-GDP Ratio</span>
                    <span className="font-bold text-red-400">{globalDebt.debtToGDP}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Interest Burden</span>
                    <span className="font-bold text-red-400">{formatNumber(globalDebt.interestBurden)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  SpiralFlow Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">Debt Nullified</p>
                  <p className="text-3xl font-bold text-green-400">
                    {formatNumber(162000000000000)}
                  </p>
                  <p className="text-sm text-gray-400">50% of Total Global Debt</p>
                </div>
                
                <Progress value={50} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-400">Wealth Redistributed</p>
                    <p className="font-bold text-blue-400">{formatNumber(ubiMetrics.totalDistributed)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">People Empowered</p>
                    <p className="font-bold text-purple-400">{(ubiMetrics.totalUsers / 1e9).toFixed(1)}B</p>
                  </div>
                </div>
                
                <Button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  View Full Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marketplace Overview */}
            <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-yellow-400" />
                  NFT Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-400">Volume (24h)</p>
                    <p className="font-bold text-yellow-400">{formatNumber(28475000000)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Transactions</p>
                    <p className="font-bold text-green-400">{(745000000 / 1e6).toFixed(0)}M</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active NFTs</p>
                    <p className="font-bold text-blue-400">7.2M</p>
                  </div>
                </div>
                
                <Separator className="bg-slate-600" />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Trending Collections</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded"></div>
                        <div>
                          <p className="font-medium">Global UBI NFTs</p>
                          <p className="text-xs text-gray-400">Monthly Distribution</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">+147%</p>
                        <p className="text-xs text-gray-400">24h change</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded"></div>
                        <div>
                          <p className="font-medium">Seven Pillars Shares</p>
                          <p className="text-xs text-gray-400">Mathematical Wisdom</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">+89%</p>
                        <p className="text-xs text-gray-400">24h change</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold">
                  <Coins className="w-4 h-4 mr-2" />
                  Claim UBI NFT
                </Button>
                
                <Button className="w-full bg-purple-400 hover:bg-purple-500 text-black font-semibold">
                  <Brain className="w-4 h-4 mr-2" />
                  Buy Pillar Shares
                </Button>
                
                <Button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold">
                  <Award className="w-4 h-4 mr-2" />
                  Stake for Yield
                </Button>
                
                <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Governance
                </Button>
                
                <Separator className="bg-slate-600" />
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">Your Portfolio Value</p>
                  <p className="text-2xl font-bold text-yellow-400">$47,892</p>
                  <p className="text-xs text-green-400">+$2,347 (24h)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}