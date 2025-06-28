import React, { useState } from 'react';
import { Zap, DollarSign, TrendingUp, Users, RefreshCw, CheckCircle } from 'lucide-react';

interface SpiralFlowPanelProps {
  coherence: number;
  pulse: number;
}

const SpiralFlowPanel: React.FC<SpiralFlowPanelProps> = ({ coherence, pulse }) => {
  const [activeView, setActiveView] = useState<'overview' | 'debt-nullify' | 'ubi' | 'arbitrage'>('overview');
  const [transformationActive, setTransformationActive] = useState(false);

  const sideMenuItems = [
    { id: 'overview', label: 'Flow Overview', icon: Zap, description: 'Living Financial System' },
    { id: 'debt-nullify', label: 'Debt Nullification', icon: RefreshCw, description: '$324T Transformation' },
    { id: 'ubi', label: 'UBI Distribution', icon: Users, description: '$25T Global Distribution' },
    { id: 'arbitrage', label: 'Harmonized Arbitrage', icon: TrendingUp, description: 'Elite Market Access' }
  ];

  const metrics = {
    totalDebt: 324000000000000,
    debtNullified: Math.floor(324000000000000 * 0.15),
    ubiDistributed: 25000000000000,
    recipients: 8000000000,
    trustUnits: Math.floor(Math.log10(324000000000000) * 0.85 * 7 * coherence),
    coherence: coherence,
    frequency: pulse
  };

  const executeTransformation = () => {
    setTransformationActive(true);
    setTimeout(() => {
      setTransformationActive(false);
    }, 5000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">$324T</div>
          <div className="text-sm text-slate-400">Global Debt Target</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {Math.floor(metrics.debtNullified / 1e12)}T
          </div>
          <div className="text-sm text-slate-400">Debt Nullified</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">$25T</div>
          <div className="text-sm text-slate-400">UBI Distributed</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{metrics.trustUnits}</div>
          <div className="text-sm text-slate-400">Trust Units Generated</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">SpiralFlow Transformation Engine</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Scarcity Reflection Index (SRI)</div>
              <div className="text-lg font-bold text-yellow-400">
                {Math.floor(Math.log10(324000000000000) * 0.85)}
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Quantum Coherence</div>
              <div className="text-lg font-bold text-purple-400">φ{coherence.toFixed(6)}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">lyona'el Pulse</div>
              <div className="text-lg font-bold text-cyan-400">{pulse}Hz</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Active Recipients</div>
              <div className="text-lg font-bold text-green-400">8B Seekers</div>
            </div>
          </div>
        </div>

        <button
          onClick={executeTransformation}
          disabled={transformationActive}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
            transformationActive
              ? 'bg-yellow-600 text-white cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          {transformationActive ? 'Transformation Active...' : 'Execute Global Transformation'}
        </button>
      </div>
    </div>
  );

  const renderDebtNullify = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-red-400 mb-4">Debt Nullification Engine</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Total Global Debt</div>
            <div className="text-2xl font-bold text-red-400">$324T</div>
            <div className="text-xs text-slate-500 mt-1">
              Public: $91.4T | Business: $164.5T | Household: $59.1T | Financial: $70.4T
            </div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Nullification Progress</div>
            <div className="text-2xl font-bold text-green-400">
              {Math.floor((metrics.debtNullified / metrics.totalDebt) * 100)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              ${Math.floor(metrics.debtNullified / 1e12)}T transformed to abundance
            </div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 mb-4">
          <div className="text-sm text-slate-400 mb-3">Transformation Algorithm</div>
          <div className="space-y-2 text-sm font-mono">
            <div className="text-green-400">SRI = log₁₀(debt_amount) × 0.85</div>
            <div className="text-yellow-400">TU = SRI × 7 × φ{coherence.toFixed(3)}</div>
            <div className="text-purple-400">Nullification = debt_amount → TU_abundance</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 rounded-lg p-4 border border-green-600/30">
          <div className="text-green-400 mb-2">Quantum Debt Transformation Active</div>
          <div className="text-sm text-slate-300">
            Converting artificial scarcity into mathematical abundance through QASF algorithms
          </div>
        </div>
      </div>
    </div>
  );

  const renderUBI = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Universal Basic Income Distribution</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Total Pool</div>
            <div className="text-2xl font-bold text-blue-400">$25T</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Recipients</div>
            <div className="text-2xl font-bold text-green-400">8B</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Per Person</div>
            <div className="text-2xl font-bold text-yellow-400">$3,125</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Distribution Mechanism</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Currency:</span>
                <span className="text-purple-400">Trust Units (TU)</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="text-cyan-400">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span>Eligibility:</span>
                <span className="text-green-400">Universal (All Seekers)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Regional Distribution</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Global South:</span>
                <span className="text-blue-400">40% ($10T)</span>
              </div>
              <div className="flex justify-between">
                <span>Developed Nations:</span>
                <span className="text-blue-400">35% ($8.75T)</span>
              </div>
              <div className="flex justify-between">
                <span>Transition Economies:</span>
                <span className="text-blue-400">25% ($6.25T)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArbitrage = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Harmonized Arbitrage Operations</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-3">Active Opportunities</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-white">Eurozone Inflation Swaps</div>
                  <div className="text-xs text-slate-400">Sovereign debt arbitrage</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">+4.2%</div>
                  <div className="text-xs text-slate-400">$2.1T volume</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-white">Corporate Structure Arbitrage</div>
                  <div className="text-xs text-slate-400">Capital optimization</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">+3.8%</div>
                  <div className="text-xs text-slate-400">$1.7T volume</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-white">Convertible Bond Strategy</div>
                  <div className="text-xs text-slate-400">Volatility capture</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">+5.6%</div>
                  <div className="text-xs text-slate-400">$0.9T volume</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Access Configuration</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Traditional Access:</span>
                <span className="text-red-400">Elite Only ($50M+ minimum)</span>
              </div>
              <div className="flex justify-between">
                <span>SpiralFlow Access:</span>
                <span className="text-green-400">Universal (TU holders)</span>
              </div>
              <div className="flex justify-between">
                <span>Profit Distribution:</span>
                <span className="text-blue-400">Automatic TU conversion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Side Menu */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-yellow-400 mb-4">SpiralFlow vΩ.∞</h2>
        <div className="space-y-2">
          {sideMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full p-3 rounded-lg transition-colors text-left ${
                activeView === item.id
                  ? 'bg-yellow-600 text-white'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4" />
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-slate-800 rounded-lg">
          <div className="text-xs text-slate-400 mb-2">Flow Status</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>System:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Coherence:</span>
              <span className="text-yellow-400">φ{coherence.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency:</span>
              <span className="text-cyan-400">{pulse}Hz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {sideMenuItems.find(item => item.id === activeView)?.label}
          </h1>
          <p className="text-slate-400">
            {sideMenuItems.find(item => item.id === activeView)?.description}
          </p>
        </div>

        {activeView === 'overview' && renderOverview()}
        {activeView === 'debt-nullify' && renderDebtNullify()}
        {activeView === 'ubi' && renderUBI()}
        {activeView === 'arbitrage' && renderArbitrage()}
      </div>
    </div>
  );
};

export default SpiralFlowPanel;