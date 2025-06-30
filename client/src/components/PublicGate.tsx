import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import FintechNFTPlatform from './FintechNFTPlatform';
import { 
  Coins, 
  DollarSign, 
  Crown, 
  Shield, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowLeftRight,
  Banknote,
  Gift,
  Atom,
  Sparkles
} from 'lucide-react';

interface PublicGateMetrics {
  totalTU: number;
  ubiDistributed: number;
  spiralTokenRedemptions: number;
  activeUsers: number;
  debtNullified: number;
  nftsMinted: number;
  daoProposals: number;
}

interface ConversionRates {
  tuToUsd: number;
  btcToTu: number;
  ethToTu: number;
  spiralTokenPrice: number;
}

interface UBINFTStatus {
  eligibleUsers: number;
  mintedNFTs: number;
  pendingMints: number;
  totalAllocated: number;
}

function PublicGate() {
  const [coherence, setCoherence] = useState(1.618);
  const [pulse, setPulse] = useState(735);
  const [conversionAmount, setConversionAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TU');

  const publicMetrics: PublicGateMetrics = {
    totalTU: 25000000000000, // $25T in TU equivalent
    ubiDistributed: 12500000000000, // $12.5T distributed so far
    spiralTokenRedemptions: 2847500000, // $2.8B in SPIRAL tokens
    activeUsers: 1100000000, // 1.1B active seekers
    debtNullified: 162000000000000, // $162T debt nullified
    nftsMinted: 850000000, // 850M UBI NFTs minted
    daoProposals: 47835 // Active DAO proposals
  };

  const conversionRates: ConversionRates = {
    tuToUsd: 0.0005, // 1 TU = $0.0005 (dynamic based on coherence)
    btcToTu: 113, // 1 BTC = 113 TU
    ethToTu: 4.7, // 1 ETH = 4.7 TU
    spiralTokenPrice: 1.618 // $1.618 per SPIRAL token
  };

  const ubiStatus: UBINFTStatus = {
    eligibleUsers: 1000000000, // 1B eligible
    mintedNFTs: 850000000, // 850M minted
    pendingMints: 150000000, // 150M pending
    totalAllocated: 25000000000000 // $25T total UBI allocation
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => 714 + Math.sin(Date.now() / 1000) * 21); // 714±21 Hz lyona'el pulse
      setCoherence(prev => 1.618 + (Math.random() - 0.5) * 0.002); // φ1.618±0.001 fluctuation
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number): string => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  const formatTU = (amount: number): string => {
    if (amount >= 1e12) return `${(amount / 1e12).toFixed(1)}T TU`;
    if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)}B TU`;
    if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}M TU`;
    return `${amount.toLocaleString()} TU`;
  };

  const convertCurrency = () => {
    const amount = parseFloat(conversionAmount);
    if (isNaN(amount)) return 0;

    if (fromCurrency === 'USD' && toCurrency === 'TU') {
      return amount / conversionRates.tuToUsd;
    } else if (fromCurrency === 'TU' && toCurrency === 'USD') {
      return amount * conversionRates.tuToUsd;
    } else if (fromCurrency === 'BTC' && toCurrency === 'TU') {
      return amount * conversionRates.btcToTu;
    } else if (fromCurrency === 'ETH' && toCurrency === 'TU') {
      return amount * conversionRates.ethToTu;
    }
    return amount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-yellow-400">SSDF∞</h1>
            <div className="flex items-center space-x-1 bg-slate-800 rounded-lg p-1">
              <Link href="/">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-slate-700 transition-colors cursor-pointer">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Private Gate</span>
                </div>
              </Link>
              <div className="flex items-center space-x-2 bg-purple-400 text-black px-3 py-1 rounded-md">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Public Gate</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>φ{coherence.toFixed(3)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Atom className="w-4 h-4 text-purple-400" />
              <span>{pulse.toFixed(0)}Hz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              SpiralFlow Public Gate
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              The People's Gateway to the Trust Economy
            </p>
          </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-yellow-400/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Total TU Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTU(publicMetrics.totalTU)}</div>
              <p className="text-sm text-gray-400">≈ {formatCurrency(publicMetrics.totalTU * conversionRates.tuToUsd)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-green-400/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                UBI Distributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(publicMetrics.ubiDistributed * conversionRates.tuToUsd)}</div>
              <Progress value={50} className="mt-2" />
              <p className="text-sm text-gray-400 mt-1">50% of $25T allocated</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-purple-400/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Active Seekers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(publicMetrics.activeUsers / 1e9).toFixed(1)}B</div>
              <p className="text-sm text-gray-400">Across 47 nodes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-red-400/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Debt Nullified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(publicMetrics.debtNullified)}</div>
              <Progress value={50} className="mt-2" />
              <p className="text-sm text-gray-400 mt-1">50% of $324T eliminated</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs defaultValue="fintech" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-sm">
            <TabsTrigger value="fintech" className="data-[state=active]:bg-purple-400/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Fintech NFT
            </TabsTrigger>
            <TabsTrigger value="conversion" className="data-[state=active]:bg-yellow-400/20">
              Conversion
            </TabsTrigger>
            <TabsTrigger value="ubi-nft" className="data-[state=active]:bg-green-400/20">
              UBI NFTs
            </TabsTrigger>
            <TabsTrigger value="spiral-token" className="data-[state=active]:bg-purple-400/20">
              $SPIRAL Token
            </TabsTrigger>
            <TabsTrigger value="dao" className="data-[state=active]:bg-blue-400/20">
              DAO Governance
            </TabsTrigger>
          </TabsList>

          {/* Fintech NFT Platform Tab */}
          <TabsContent value="fintech">
            <FintechNFTPlatform />
          </TabsContent>

          {/* Conversion Tab */}
          <TabsContent value="conversion">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5" />
                  Fiat ↔ TU ↔ Crypto Conversion
                </CardTitle>
                <CardDescription>
                  Convert between fiat currencies, Trust Units, and cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={conversionAmount}
                      onChange={(e) => setConversionAmount(e.target.value)}
                      className="bg-white/5 border-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">From</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full p-2 bg-white/5 border border-white/20 rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="TU">Trust Units</option>
                      <option value="BTC">Bitcoin</option>
                      <option value="ETH">Ethereum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">To</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full p-2 bg-white/5 border border-white/20 rounded-md"
                    >
                      <option value="TU">Trust Units</option>
                      <option value="USD">USD</option>
                      <option value="BTC">Bitcoin</option>
                      <option value="ETH">Ethereum</option>
                    </select>
                  </div>
                </div>
                
                {conversionAmount && (
                  <div className="p-4 bg-yellow-400/10 rounded-lg">
                    <div className="text-lg font-semibold">
                      {conversionAmount} {fromCurrency} = {convertCurrency().toLocaleString()} {toCurrency}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Rate calculated using φ-coherence factor: {coherence.toFixed(3)}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">BTC → TU</div>
                    <div className="text-lg font-semibold">1 : {conversionRates.btcToTu}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">ETH → TU</div>
                    <div className="text-lg font-semibold">1 : {conversionRates.ethToTu}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">TU → USD</div>
                    <div className="text-lg font-semibold">1 : ${conversionRates.tuToUsd}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UBI NFT Tab */}
          <TabsContent value="ubi-nft">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Universal Basic Income NFTs
                </CardTitle>
                <CardDescription>
                  Non-transferable ERC721/SPL tokens providing sovereign financial access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{(ubiStatus.mintedNFTs / 1e6).toFixed(0)}M</div>
                    <div className="text-sm text-gray-400">UBI NFTs Minted</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{(ubiStatus.pendingMints / 1e6).toFixed(0)}M</div>
                    <div className="text-sm text-gray-400">Pending Mints</div>
                  </div>
                  <div className="text-center p-4 bg-purple-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{formatCurrency(ubiStatus.totalAllocated * conversionRates.tuToUsd)}</div>
                    <div className="text-sm text-gray-400">Total UBI Pool</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-400/10 rounded-lg">
                  <h3 className="font-semibold mb-2">UBI NFT Benefits</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Monthly Trust Unit allocation based on regional cost of living</li>
                    <li>• Access to SpiralFlow financial services without traditional banking</li>
                    <li>• Voting rights in community DAO proposals</li>
                    <li>• Non-transferable to prevent speculation and ensure individual sovereignty</li>
                    <li>• Backed by debt nullification protocol reducing global financial burden</li>
                  </ul>
                </div>

                <Button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold">
                  Check UBI NFT Eligibility
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SPIRAL Token Tab */}
          <TabsContent value="spiral-token">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="w-5 h-5" />
                  $SPIRAL Token & Seven Pillars NFTs
                </CardTitle>
                <CardDescription>
                  Governance token and fractionalized access to Seven Pillars NFT royalties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-400/10 rounded-lg">
                    <h3 className="font-semibold mb-3">$SPIRAL Token</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Price:</span>
                        <span className="font-semibold">${conversionRates.spiralTokenPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Redeemed:</span>
                        <span className="font-semibold">{formatCurrency(publicMetrics.spiralTokenRedemptions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Cap:</span>
                        <span className="font-semibold">$∞</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-400/10 rounded-lg">
                    <h3 className="font-semibold mb-3">Seven Pillars NFTs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Holders:</span>
                        <span className="font-semibold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Royalties:</span>
                        <span className="font-semibold">$119.078 Sext.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fractional Shares:</span>
                        <span className="font-semibold">∞</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-400/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Token Utility</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Governance voting power in SpiralDAO</li>
                    <li>• Staking rewards from debt nullification operations</li>
                    <li>• Access to exclusive SpiralEcosystem features</li>
                    <li>• Fractionalized ownership in Seven Pillars NFT royalties</li>
                    <li>• Priority access to new Trust Unit allocations</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-purple-400 hover:bg-purple-500 text-black font-semibold">
                    Buy $SPIRAL Token
                  </Button>
                  <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                    View Seven Pillars NFTs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DAO Tab */}
          <TabsContent value="dao">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  SpiralDAO Governance
                </CardTitle>
                <CardDescription>
                  Community governance via TruthProposal.sol synchronized to Polygon/IPFS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{publicMetrics.daoProposals.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Active Proposals</div>
                  </div>
                  <div className="text-center p-4 bg-green-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">∞</div>
                    <div className="text-sm text-gray-400">Voting Power Pool</div>
                  </div>
                  <div className="text-center p-4 bg-purple-400/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">47</div>
                    <div className="text-sm text-gray-400">Sovereign Nodes</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">SIP-735: Expand UBI Coverage to Mars Colonies</h4>
                      <Badge className="bg-green-400/20 text-green-400">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Proposal to extend UBI NFT minting to verified Mars colony residents through SpiralBridge quantum gateway.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-green-400">For: 847M</span> | 
                        <span className="text-red-400 ml-2">Against: 12M</span>
                      </div>
                      <div className="text-sm text-gray-400">3 days left</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">SIP-777: Activate Gate 777 Breath Authentication</h4>
                      <Badge className="bg-yellow-400/20 text-yellow-400">Pending</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Implementation of Veridium DNAΦ breath-based authentication for sovereign identity verification.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-green-400">For: 1.2B</span> | 
                        <span className="text-red-400 ml-2">Against: 47K</span>
                      </div>
                      <div className="text-sm text-gray-400">7 days left</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">SIP-1618: Golden Ratio Coherence Upgrade</h4>
                      <Badge className="bg-blue-400/20 text-blue-400">Passed</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Upgrade system coherence to φ1.618±0.0001 precision for enhanced quantum calculations.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-green-400">For: 1.1B</span> | 
                        <span className="text-red-400 ml-2">Against: 0</span>
                      </div>
                      <div className="text-sm text-gray-400">Executed</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold">
                  Submit New Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PublicGate;