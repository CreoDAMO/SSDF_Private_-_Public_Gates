import React, { useState } from 'react';
import { GitBranch, ArrowLeftRight, Layers, Network } from 'lucide-react';

interface SpiralBridgeProps {
  coherence: number;
}

export default function SpiralBridge({ coherence }: SpiralBridgeProps) {
  const [activeRealities, setActiveRealities] = useState(['Reality-0', 'Reality-1']);
  const [bridgeStatus, setBridgeStatus] = useState<'inactive' | 'connecting' | 'active'>('inactive');
  const [dataTransferred, setDataTransferred] = useState(0);

  const realities = [
    { id: 'Reality-0', name: 'Physical Reality', color: 'text-blue-400' },
    { id: 'Reality-1', name: 'Digital Reality', color: 'text-green-400' },
    { id: 'Reality-2', name: 'Quantum Reality', color: 'text-purple-400' },
    { id: 'Reality-3', name: 'Financial Reality', color: 'text-yellow-400' },
    { id: 'Reality-4', name: 'Temporal Reality', color: 'text-red-400' },
    { id: 'Reality-5', name: 'Consciousness Reality', color: 'text-pink-400' },
    { id: 'Reality-6', name: 'Truth Reality', color: 'text-white' }
  ];

  const establishBridge = () => {
    setBridgeStatus('connecting');
    console.log('SpiralBridge: Establishing multi-reality bridge', {
      realities: activeRealities,
      coherence,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setBridgeStatus('active');
      setDataTransferred(coherence * 1000);
    }, 3000);
  };

  const toggleReality = (realityId: string) => {
    setActiveRealities(prev => {
      if (prev.includes(realityId)) {
        return prev.filter(id => id !== realityId);
      } else {
        return [...prev, realityId];
      }
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          SpiralBridge
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* Reality Selection */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">Reality Layers</div>
        <div className="grid grid-cols-2 gap-2">
          {realities.map(reality => (
            <button
              key={reality.id}
              onClick={() => toggleReality(reality.id)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                activeRealities.includes(reality.id)
                  ? 'bg-slate-700 border border-slate-600'
                  : 'bg-slate-800 border border-transparent hover:border-slate-700'
              }`}
            >
              <div className={`font-medium ${reality.color}`}>
                {reality.name}
              </div>
              <div className="text-slate-400 text-xs">
                {reality.id}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bridge Status */}
      <div className="space-y-3 mb-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Network className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Bridge Status</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              bridgeStatus === 'active' ? 'bg-green-400 animate-pulse' :
              bridgeStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
              'bg-red-400'
            }`} />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Connected:</span>
              <span className="text-white ml-1">{activeRealities.length} realities</span>
            </div>
            <div>
              <span className="text-slate-400">Data Flow:</span>
              <span className="text-green-400 ml-1">{dataTransferred.toLocaleString()} KB</span>
            </div>
            <div>
              <span className="text-slate-400">Coherence:</span>
              <span className="text-yellow-400 ml-1">φ{coherence.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-slate-400">Protocol:</span>
              <span className="text-purple-400 ml-1">QBRIDGE</span>
            </div>
          </div>
        </div>

        {/* Active Connections */}
        {activeRealities.length >= 2 && (
          <div className="bg-slate-800 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-2">Active Connections</div>
            <div className="space-y-1">
              {activeRealities.slice(0, -1).map((realityId, index) => {
                const sourceReality = realities.find(r => r.id === realityId);
                const targetReality = realities.find(r => r.id === activeRealities[index + 1]);
                
                return (
                  <div key={`${realityId}-${activeRealities[index + 1]}`} className="flex items-center text-xs">
                    <span className={sourceReality?.color}>{sourceReality?.name}</span>
                    <ArrowLeftRight className="w-3 h-3 mx-2 text-slate-500" />
                    <span className={targetReality?.color}>{targetReality?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bridge Controls */}
      <button
        onClick={establishBridge}
        disabled={activeRealities.length < 2 || bridgeStatus === 'connecting'}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeRealities.length < 2
            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
            : bridgeStatus === 'connecting'
            ? 'bg-yellow-600 text-white cursor-not-allowed'
            : bridgeStatus === 'active'
            ? 'bg-green-600 text-white'
            : 'bg-yellow-400 hover:bg-yellow-500 text-black'
        }`}
      >
        {bridgeStatus === 'connecting' ? 'Establishing Bridge...' :
         bridgeStatus === 'active' ? 'Bridge Active' :
         activeRealities.length < 2 ? 'Select 2+ Realities' :
         'Establish Bridge'}
      </button>

      {bridgeStatus === 'active' && (
        <div className="mt-3 space-y-2">
          <div className="p-2 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-600/30 rounded-lg">
            <div className="text-xs text-green-400 mb-1">Multi-Reality Bridge Active</div>
            <div className="text-xs text-slate-300">
              Bridging {activeRealities.length} reality layers through quantum coherence
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800 rounded p-2 text-center">
              <Layers className="w-3 h-3 text-blue-400 mx-auto mb-1" />
              <div className="text-slate-400">Layers</div>
              <div className="text-blue-400">{activeRealities.length}</div>
            </div>
            <div className="bg-slate-800 rounded p-2 text-center">
              <ArrowLeftRight className="w-3 h-3 text-green-400 mx-auto mb-1" />
              <div className="text-slate-400">Bandwidth</div>
              <div className="text-green-400">∞ Mbps</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}