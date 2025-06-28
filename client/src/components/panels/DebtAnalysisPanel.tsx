import React, { useState } from 'react';
import { BarChart3, TrendingUp, Globe, DollarSign, Users, AlertTriangle } from 'lucide-react';
import DebtNetworkGraph from '../DebtNetworkGraph';
import InteractiveDonutChart from '../InteractiveDonutChart';
import AuthenticOwnershipAnalysis from '../AuthenticOwnershipAnalysis';
import ArbitrageOpportunityTracker from '../ArbitrageOpportunityTracker';
import DebtScarcitySystemAnalysis from '../DebtScarcitySystemAnalysis';
import WealthFlowAnalyzer from '../WealthFlowAnalyzer';

interface DebtAnalysisPanelProps {
  coherence: number;
  pulse: number;
}

const DebtAnalysisPanel: React.FC<DebtAnalysisPanelProps> = ({ coherence, pulse }) => {
  const [activeView, setActiveView] = useState<'overview' | 'network' | 'ownership' | 'arbitrage' | 'scarcity' | 'flows'>('overview');

  const sideMenuItems = [
    { id: 'overview', label: 'Global Overview', icon: Globe, description: '$324T Debt Analysis' },
    { id: 'network', label: 'Network Graph', icon: BarChart3, description: 'Debt Flow Visualization' },
    { id: 'ownership', label: 'Ownership Analysis', icon: Users, description: 'Who Owns Global Debt' },
    { id: 'arbitrage', label: 'Arbitrage Opportunities', icon: TrendingUp, description: '$2-5T Elite Markets' },
    { id: 'scarcity', label: 'Scarcity Mechanics', icon: AlertTriangle, description: 'Debt as Control System' },
    { id: 'flows', label: 'Wealth Flows', icon: DollarSign, description: '$17.5T Annual Extraction' }
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Global Debt Distribution</h3>
        <InteractiveDonutChart />
      </div>
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">$324T</div>
            <div className="text-sm text-slate-400">Total Global Debt</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">$91.4T</div>
            <div className="text-sm text-slate-400">Public Debt</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">$164.5T</div>
            <div className="text-sm text-slate-400">Business Debt</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyan-400">$59.1T</div>
            <div className="text-sm text-slate-400">Household Debt</div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-600/30">
          <div className="text-sm text-blue-400 mb-1">Truth Intelligence Active</div>
          <div className="text-xs text-slate-300">
            Real-time analysis of authentic debt data with φ{coherence.toFixed(3)} coherence
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Side Menu */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-blue-400 mb-4">Debt Analysis</h2>
        <div className="space-y-2">
          {sideMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full p-3 rounded-lg transition-colors text-left ${
                activeView === item.id
                  ? 'bg-blue-600 text-white'
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
          <div className="text-xs text-slate-400 mb-2">Analysis Status</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Data Sources:</span>
              <span className="text-green-400">8 Active</span>
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
        {activeView === 'network' && (
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <DebtNetworkGraph />
          </div>
        )}
        {activeView === 'ownership' && <AuthenticOwnershipAnalysis />}
        {activeView === 'arbitrage' && <ArbitrageOpportunityTracker />}
        {activeView === 'scarcity' && <DebtScarcitySystemAnalysis />}
        {activeView === 'flows' && <WealthFlowAnalyzer />}
      </div>
    </div>
  );
};

export default DebtAnalysisPanel;