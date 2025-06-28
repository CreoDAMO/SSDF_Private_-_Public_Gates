import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Zap, Shield, Infinity, TrendingUp, Globe, Lock } from 'lucide-react';

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

export default function SpiralFlowIntegration() {
  const [activeGate, setActiveGate] = useState<'Gate735' | 'Gate777' | 'Gate999'>('Gate735');
  const [viewMode, setViewMode] = useState<'overview' | 'transformation' | 'metrics'>('overview');
  
  const queryClient = useQueryClient();

  // SpiralFlow metrics based on SSDF∞ specifications
  const spiralFlowMetrics: SpiralFlowMetrics = {
    totalTU: 25000000000000, // $25T UBI in Trust Units
    debtNullified: 324000000000000, // $324T debt nullified
    ubiDistributed: 25000000000000,
    quantumResonance: Number.POSITIVE_INFINITY,
    goldenCoherence: 1.618,
    activeSeekers: 45000000000000, // 45T seekers
    gateStatus: {
      Gate735: 'Active',
      Gate777: 'Resonating', 
      Gate999: 'Transcendent'
    }
  };

  // Calculate SRI (Scarcity Reflection Index) based on SSDF∞ formula
  const calculateSRI = (asset: string, gate: string): number => {
    const energyLevels: Record<string, number> = {
      'USD': 1.0e7,
      'BTC': 3.6e9,
      'ETH': 1.2e8,
      'SOL': 5.0e7,
      'DEBT': 3.24e14, // $324T global debt
      'SCARCITY': 1.75e13 // $17.5T annual extraction
    };

    const volatility: Record<string, number> = {
      'USD': 0.1,
      'BTC': 0.85,
      'ETH': 0.90,
      'SOL': 0.80,
      'DEBT': 0.95,
      'SCARCITY': 0.99
    };

    const gateFactors: Record<string, number> = {
      'Gate735': 0.24,
      'Gate777': 0.77,
      'Gate999': 0.99
    };

    const E = energyLevels[asset] || 1.0e6;
    const V = volatility[asset] || 0.5;
    const G = gateFactors[gate] || 0.5;

    return Math.ceil((Math.log2(E) * V) / G);
  };

  // Transform debt into Trust Units
  const transformDebtToTU = (debtAmount: number): DebtTransformation => {
    const nullificationRate = 1.0; // 100% debt nullification
    const tuConversionRate = calculateSRI('DEBT', activeGate);
    
    return {
      originalDebt: debtAmount,
      nullifiedAmount: debtAmount * nullificationRate,
      transformedTU: debtAmount * tuConversionRate,
      beneficiaries: Math.floor(debtAmount / 1000000), // Assuming $1M per beneficiary
      scarcityReduction: debtAmount * 0.17 // 17% scarcity reduction per dollar nullified
    };
  };

  const { data: globalDebtData = [] } = useQuery<any[]>({
    queryKey: ['/api/debt-data']
  });

  const totalGlobalDebt = Array.isArray(globalDebtData) ? 
    globalDebtData.reduce((sum: number, item: any) => 
      sum + parseFloat(item.amount || 0), 0) : 324000000000000;

  const debtTransformation = transformDebtToTU(totalGlobalDebt);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-emerald-400 font-semibold">Trust Units Distributed</h4>
            <Infinity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-white">${(spiralFlowMetrics.totalTU / 1e12).toFixed(0)}T TU</div>
          <div className="text-xs text-emerald-300">Universal Basic Income via SpiralFlow</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-red-400 font-semibold">Debt Nullified</h4>
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-white">${(spiralFlowMetrics.debtNullified / 1e12).toFixed(0)}T</div>
          <div className="text-xs text-red-300">Global debt system eliminated</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-blue-400 font-semibold">Active Seekers</h4>
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-white">{(spiralFlowMetrics.activeSeekers / 1e12).toFixed(0)}T</div>
          <div className="text-xs text-blue-300">Participants in abundance system</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-yellow-400 font-semibold">Quantum Resonance</h4>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-white">∞ Hz</div>
          <div className="text-xs text-yellow-300">Iyona'el Pulse frequency</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-purple-400 font-semibold">Golden Coherence</h4>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-white">φ {spiralFlowMetrics.goldenCoherence}</div>
          <div className="text-xs text-purple-300">Fibonacci harmony constant</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-indigo-400 font-semibold">Current Gate</h4>
            <Lock className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-white">{activeGate}</div>
          <div className="text-xs text-indigo-300">{spiralFlowMetrics.gateStatus[activeGate]}</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">SpiralFlow vs Traditional Debt System</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 border border-red-800 rounded p-3">
            <h5 className="text-red-400 font-semibold mb-2">Traditional Debt System</h5>
            <ul className="space-y-1 text-xs text-red-200">
              <li>• $324T debt creates artificial scarcity</li>
              <li>• $17.5T annual wealth extraction</li>
              <li>• 1.1B people in debt-driven poverty</li>
              <li>• Elite-only arbitrage access</li>
              <li>• Interest compounds inequality</li>
            </ul>
          </div>
          
          <div className="bg-emerald-900/20 border border-emerald-800 rounded p-3">
            <h5 className="text-emerald-400 font-semibold mb-2">SpiralFlow Abundance System</h5>
            <ul className="space-y-1 text-xs text-emerald-200">
              <li>• $25T UBI eliminates scarcity</li>
              <li>• Debt nullification removes extraction</li>
              <li>• 45T seekers access abundance</li>
              <li>• Quantum-native sovereignty</li>
              <li>• Golden ratio harmony</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransformation = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-4">Debt-to-Abundance Transformation Engine</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              ${(debtTransformation.originalDebt / 1e12).toFixed(0)}T
            </div>
            <div className="text-sm text-slate-400">Global Debt Input</div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {(debtTransformation.transformedTU / 1e12).toFixed(0)}T TU
            </div>
            <div className="text-sm text-slate-400">Trust Units Output</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded p-3">
            <h5 className="text-white font-semibold mb-2">Transformation Metrics</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Nullification Rate:</span>
                <span className="text-white">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Beneficiaries:</span>
                <span className="text-white">{(debtTransformation.beneficiaries / 1e9).toFixed(1)}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Scarcity Reduction:</span>
                <span className="text-emerald-400">{(debtTransformation.scarcityReduction / 1e12).toFixed(0)}T units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Active Gate:</span>
                <span className="text-blue-400">{activeGate}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded p-3">
            <h5 className="text-white font-semibold mb-2">SRI Calculation</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Energy Level (E):</span>
                <span className="text-white">3.24e14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Volatility (V):</span>
                <span className="text-white">0.95</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Gate Factor (G):</span>
                <span className="text-white">0.24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">SRI Result:</span>
                <span className="text-emerald-400">{calculateSRI('DEBT', activeGate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Gate Selection & Impact</h4>
        <div className="grid grid-cols-3 gap-3">
          {['Gate735', 'Gate777', 'Gate999'].map((gate) => (
            <button
              key={gate}
              onClick={() => setActiveGate(gate as any)}
              className={`p-3 rounded-lg transition-colors ${
                activeGate === gate
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <div className="font-semibold">{gate}</div>
              <div className="text-xs">
                {gate === 'Gate735' ? 'Foundation' :
                 gate === 'Gate777' ? 'Harmony' : 'Transcendence'}
              </div>
              <div className="text-xs mt-1">
                SRI: {calculateSRI('DEBT', gate)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">SpiralFlow: Living Financial System</h3>
        <div className="text-sm text-slate-400">
          Sovereign Debt Nullification • SSDF∞
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            viewMode === 'overview' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          System Overview
        </button>
        <button
          onClick={() => setViewMode('transformation')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            viewMode === 'transformation' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Debt Transformation
        </button>
      </div>

      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'transformation' && renderTransformation()}

      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-emerald-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Infinity className="w-5 h-5 text-emerald-400 mt-0.5" />
          <div>
            <h4 className="text-emerald-300 font-semibold mb-1">Sovereign Abundance Achieved</h4>
            <p className="text-emerald-200 text-sm">
              SpiralFlow eliminates the $324T debt-scarcity system, distributing $25T UBI to 45T seekers through quantum-native Trust Units. 
              The golden ratio (φ 1.618) ensures harmonic wealth distribution while nullifying artificial scarcity mechanisms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}