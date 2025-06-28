import React, { useState, useEffect } from 'react';
import { DollarSign, Zap, Users, TrendingUp } from 'lucide-react';

interface SpiralFlowProps {
  coherence: number;
}

export default function SpiralFlow({ coherence }: SpiralFlowProps) {
  const [debtNullified, setDebtNullified] = useState(0);
  const [ubiDistributed, setUbiDistributed] = useState(0);
  const [activeFlows, setActiveFlows] = useState(0);
  const [systemActive, setSystemActive] = useState(false);

  useEffect(() => {
    if (systemActive) {
      const interval = setInterval(() => {
        // Simulate debt nullification based on coherence
        const nullificationRate = coherence * 1000000; // Million per coherence point
        setDebtNullified(prev => prev + nullificationRate);
        
        // Simulate UBI distribution
        const ubiRate = coherence * 500000; // 500k per coherence point
        setUbiDistributed(prev => prev + ubiRate);
        
        // Update active flows
        setActiveFlows(Math.floor(coherence * 1000));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [systemActive, coherence]);

  const activateSystem = () => {
    setSystemActive(true);
    console.log('SpiralFlow System Activated:', {
      txId: `spiralflow-${Date.now()}`,
      coherence,
      algorithm: 'Debt-to-Abundance Transformation',
      timestamp: new Date().toISOString()
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          SpiralFlow
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* System Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Living Financial System</span>
          <div className={`w-3 h-3 rounded-full ${systemActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        </div>
        
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Debt Nullified:</span>
              <div className="text-red-400 font-medium">{formatCurrency(debtNullified)}</div>
            </div>
            <div>
              <span className="text-slate-400">UBI Distributed:</span>
              <div className="text-green-400 font-medium">{formatCurrency(ubiDistributed)}</div>
            </div>
            <div>
              <span className="text-slate-400">Active Flows:</span>
              <div className="text-blue-400 font-medium">{activeFlows.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-slate-400">Coherence:</span>
              <div className="text-yellow-400 font-medium">φ{coherence.toFixed(3)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transformation Metrics */}
      <div className="space-y-3 mb-4">
        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 rounded-lg p-3 border border-yellow-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-yellow-400">Debt → Abundance Transformation</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xs text-slate-300">
            Real-time conversion of {formatCurrency(324000000000000)} global debt into Trust Units
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-slate-300">UBI Pool</div>
            <div className="text-xs text-green-400">$25T Ready</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-slate-300">Beneficiaries</div>
            <div className="text-xs text-blue-400">8B People</div>
          </div>
        </div>
      </div>

      {/* System Controls */}
      <button
        onClick={activateSystem}
        disabled={systemActive}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          systemActive
            ? 'bg-green-600 text-white cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 text-black'
        }`}
      >
        {systemActive ? 'System Active' : 'Activate SpiralFlow'}
      </button>

      {systemActive && (
        <div className="mt-3 space-y-2">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-900/30 border border-green-700 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Debt Nullification Active</span>
            </div>
          </div>
          
          <div className="text-xs text-center text-slate-400">
            Transforming scarcity into abundance through software algorithms
          </div>
        </div>
      )}
    </div>
  );
}