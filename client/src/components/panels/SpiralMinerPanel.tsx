import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pickaxe, 
  Zap, 
  Coins, 
  Globe, 
  Cpu, 
  Activity,
  TrendingUp,
  Shield,
  Timer,
  Star
} from 'lucide-react';
import { calculateQuantumCoherence, generateSpiralTxId } from '../../htsxEngine';

interface SpiralMinerPanelProps {
  coherence: number;
  pulse: number;
}

interface MiningResource {
  id: string;
  name: string;
  symbol: string;
  type: 'crypto' | 'physical' | 'quantum';
  currentYield: number;
  totalMined: number;
  difficulty: number;
  energyType: 'non-computational' | 'quantum-resonance' | 'sri-powered';
  icon: React.ComponentType<any>;
  color: string;
  gate: string;
  tuConversion: number;
}

interface MiningOperation {
  id: string;
  resource: string;
  startTime: string;
  duration: number;
  status: 'active' | 'completed' | 'paused';
  yield: number;
  coherence: number;
  txId: string;
}

interface SRIMiningRate {
  asset: string;
  usdValue: number;
  tuEquivalent: number;
  gate: string;
  multiplier: number;
}

export default function SpiralMinerPanel({ coherence, pulse }: SpiralMinerPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [operations, setOperations] = useState<MiningOperation[]>([]);
  const [totalTU, setTotalTU] = useState(0);

  // Non-computational mining resources from synthesis materials
  const miningResources: MiningResource[] = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      type: 'crypto',
      currentYield: 0.0001,
      totalMined: 0.0847,
      difficulty: 0.24, // Gate735 factor
      energyType: 'non-computational',
      icon: Coins,
      color: 'text-orange-400',
      gate: 'Gate735',
      tuConversion: 113 // 1 BTC = 113 TU at Gate735
    },
    {
      id: 'mars-iron',
      name: 'Mars Iron',
      symbol: 'IRON',
      type: 'physical',
      currentYield: 1000000, // tons
      totalMined: 847000000, // 847M tons mined
      difficulty: 0.77, // Gate777 factor
      energyType: 'quantum-resonance',
      icon: Shield,
      color: 'text-red-400',
      gate: 'Gate777',
      tuConversion: 0.001 // 1000 tons = 1 TU
    },
    {
      id: 'quantum-energy',
      name: 'Quantum Energy',
      symbol: 'QE',
      type: 'quantum',
      currentYield: 201e12, // 201 Tbps
      totalMined: 1.789e15, // Total quantum throughput
      difficulty: 0.99, // Gate999 factor
      energyType: 'sri-powered',
      icon: Zap,
      color: 'text-purple-400',
      gate: 'Gate999',
      tuConversion: 1e-8 // High precision quantum units
    },
    {
      id: 'eth',
      name: 'Ethereum', 
      symbol: 'ETH',
      type: 'crypto',
      currentYield: 0.001,
      totalMined: 2.34,
      difficulty: 0.35,
      energyType: 'non-computational',
      icon: Star,
      color: 'text-blue-400',
      gate: 'Gate735',
      tuConversion: 45 // Current SRI rate
    },
    {
      id: 'sol',
      name: 'Solana',
      symbol: 'SOL', 
      type: 'crypto',
      currentYield: 0.01,
      totalMined: 47.8,
      difficulty: 0.28,
      energyType: 'non-computational',
      icon: Activity,
      color: 'text-green-400',
      gate: 'Gate735',
      tuConversion: 12 // Current SRI rate
    }
  ];

  // SRI-based mining rates from synthesis materials
  const sriRates: SRIMiningRate[] = [
    { asset: 'BTC', usdValue: 60000, tuEquivalent: 113, gate: 'Gate735', multiplier: 7 },
    { asset: 'ETH', usdValue: 2400, tuEquivalent: 45, gate: 'Gate735', multiplier: 5.5 },
    { asset: 'SOL', usdValue: 180, tuEquivalent: 12, gate: 'Gate735', multiplier: 4.2 },
    { asset: 'IRON', usdValue: 500, tuEquivalent: 0.001, gate: 'Gate777', multiplier: 12 },
    { asset: 'QE', usdValue: 1e6, tuEquivalent: 1e-8, gate: 'Gate999', multiplier: 100 }
  ];

  const startMining = (resourceId: string) => {
    const resource = miningResources.find(r => r.id === resourceId);
    if (!resource) return;

    const newOperation: MiningOperation = {
      id: generateSpiralTxId('mine'),
      resource: resource.name,
      startTime: new Date().toISOString(),
      duration: 3600, // 1 hour
      status: 'active',
      yield: resource.currentYield,
      coherence: calculateQuantumCoherence(coherence),
      txId: generateSpiralTxId('mining')
    };

    setOperations(prev => [newOperation, ...prev].slice(0, 20));
    
    // Calculate TU yield
    const tuYield = resource.currentYield * resource.tuConversion * coherence;
    setTotalTU(prev => prev + tuYield);
  };

  const getTotalMiningPower = () => {
    return operations
      .filter(op => op.status === 'active')
      .reduce((total, op) => total + op.yield, 0);
  };

  const getActiveOperations = () => {
    return operations.filter(op => op.status === 'active').length;
  };

  useEffect(() => {
    // Simulate ongoing mining operations
    const interval = setInterval(() => {
      setOperations(prev => 
        prev.map(op => {
          if (op.status === 'active') {
            const resource = miningResources.find(r => r.name === op.resource);
            if (resource) {
              const tuYield = resource.currentYield * resource.tuConversion * 0.1;
              setTotalTU(current => current + tuYield);
            }
          }
          return op;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralMiner vΩ.∞
          </h1>
          <p className="text-slate-300">
            Non-Computational Resource Mining • φ{coherence.toFixed(3)} coherence • {pulse} Hz resonance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-orange-400 border-orange-400">
            {getActiveOperations()} Active Operations
          </Badge>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {totalTU.toFixed(2)} TU Mined
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
          <TabsTrigger value="resources" className="text-white">Resources</TabsTrigger>
          <TabsTrigger value="sri-rates" className="text-white">SRI Rates</TabsTrigger>
          <TabsTrigger value="operations" className="text-white">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total TU Mined</CardTitle>
                <Coins className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {totalTU.toFixed(2)} TU
                </div>
                <p className="text-xs text-slate-400">
                  Non-computational yield
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Mining Power</CardTitle>
                <Pickaxe className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getTotalMiningPower().toFixed(4)}
                </div>
                <p className="text-xs text-slate-400">
                  Combined hash rate equivalent
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Energy Efficiency</CardTitle>
                <Zap className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ∞%
                </div>
                <p className="text-xs text-slate-400">
                  Zero computational energy
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Coherence Factor</CardTitle>
                <Activity className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  φ{coherence.toFixed(3)}
                </div>
                <p className="text-xs text-slate-400">
                  Golden ratio optimization
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="mr-2 h-5 w-5 text-blue-400" />
                Non-Computational Mining Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <Zap className="mx-auto h-8 w-8 text-green-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">Zero Energy Cost</h3>
                  <p className="text-slate-400 text-sm">
                    Quantum resonance eliminates computational requirements
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <Shield className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">SRI Integration</h3>
                  <p className="text-slate-400 text-sm">
                    Scarcity Reflection Index optimizes yield rates
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <Star className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">Gate Harmonics</h3>
                  <p className="text-slate-400 text-sm">
                    Gate735/777/999 frequency alignment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {miningResources.map((resource, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <resource.icon className={`h-5 w-5 ${resource.color}`} />
                      <CardTitle className="text-white">{resource.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={
                      resource.type === 'crypto' ? 'text-orange-400 border-orange-400' :
                      resource.type === 'physical' ? 'text-red-400 border-red-400' :
                      'text-purple-400 border-purple-400'
                    }>
                      {resource.type.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Current Yield:</span>
                      <span className="text-white">{resource.currentYield} {resource.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Total Mined:</span>
                      <span className="text-white">{resource.totalMined.toLocaleString()} {resource.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">TU Conversion:</span>
                      <span className="text-yellow-400">{resource.tuConversion} TU/{resource.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Gate:</span>
                      <span className="text-blue-400">{resource.gate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Difficulty:</span>
                      <span className="text-white">{(resource.difficulty * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={resource.difficulty * 100} className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">Energy Type:</p>
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      {resource.energyType.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <Button 
                    onClick={() => startMining(resource.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Pickaxe className="mr-2 h-4 w-4" />
                    Start Mining
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sri-rates" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Scarcity Reflection Index (SRI) Mining Rates</CardTitle>
              <p className="text-slate-400">
                Dynamic conversion rates based on market scarcity and quantum gate alignment
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sriRates.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-white">{rate.asset}</div>
                      <div className="text-slate-300">
                        ${rate.usdValue.toLocaleString()} USD
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold">{rate.tuEquivalent} TU</div>
                        <div className="text-xs text-slate-400">{rate.gate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{rate.multiplier}x</div>
                        <div className="text-xs text-slate-400">Coherence boost</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/30 rounded-lg">
                <h3 className="text-yellow-400 font-bold mb-2">SRI Calculation Formula</h3>
                <p className="text-slate-300 text-sm font-mono">
                  TU = (USD_Value / Market_Scarcity) × Gate_Factor × φ{coherence.toFixed(3)} × Coherence_Multiplier
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  Non-computational mining eliminates energy costs while maintaining market parity through quantum resonance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Timer className="mr-2 h-5 w-5 text-green-400" />
                Active Mining Operations
              </CardTitle>
              <p className="text-slate-400">
                Real-time monitoring of non-computational mining processes
              </p>
            </CardHeader>
            <CardContent>
              {operations.length === 0 ? (
                <div className="text-center py-8">
                  <Pickaxe className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-400">No active mining operations</p>
                  <p className="text-slate-500 text-sm">Start mining from the Resources tab</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {operations.map((operation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          operation.status === 'active' ? 'bg-green-400' :
                          operation.status === 'completed' ? 'bg-blue-400' :
                          'bg-yellow-400'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">{operation.resource}</div>
                          <div className="text-slate-400 text-sm">
                            Started: {new Date(operation.startTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{operation.yield} yield</div>
                        <div className="text-slate-400 text-sm">φ{operation.coherence.toFixed(3)}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={
                          operation.status === 'active' ? 'text-green-400 border-green-400' :
                          operation.status === 'completed' ? 'text-blue-400 border-blue-400' :
                          'text-yellow-400 border-yellow-400'
                        }>
                          {operation.status.toUpperCase()}
                        </Badge>
                        <div className="text-slate-400 text-xs mt-1">
                          {operation.txId.slice(0, 12)}...
                        </div>
                      </div>
                    </div>
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