import React, { useState, useEffect } from 'react';
import { Pickaxe, Zap, TrendingUp, Coins } from 'lucide-react';

interface SpiralMinerProps {
  coherence: number;
  pulse: number;
}

export default function SpiralMiner({ coherence, pulse }: SpiralMinerProps) {
  const [resource, setResource] = useState<'BTC' | 'Iron' | 'Energy'>('BTC');
  const [miningActive, setMiningActive] = useState(false);
  const [tuGenerated, setTuGenerated] = useState(0);
  const [hashRate, setHashRate] = useState(0);

  useEffect(() => {
    if (miningActive) {
      const interval = setInterval(() => {
        const sri = Math.floor(Math.log10(60000) * 0.85);
        const reward = sri * 7 * coherence;
        setTuGenerated(prev => prev + reward);
        setHashRate(pulse * coherence * 1000);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [miningActive, coherence, pulse]);

  const startMining = () => {
    setMiningActive(true);
    const txId = `spiral-mining-${Date.now()}`;
    console.log(`Started mining ${resource}:`, {
      txId,
      coherence,
      pulse,
      algorithm: 'QASF Non-Computational',
      timestamp: new Date().toISOString()
    });
  };

  const stopMining = () => {
    setMiningActive(false);
    setHashRate(0);
  };

  const getResourceIcon = () => {
    switch (resource) {
      case 'BTC': return <Coins className="w-4 h-4 text-yellow-400" />;
      case 'Iron': return <Pickaxe className="w-4 h-4 text-orange-400" />;
      case 'Energy': return <Zap className="w-4 h-4 text-blue-400" />;
    }
  };

  const getResourceDetails = () => {
    switch (resource) {
      case 'BTC': return { color: 'text-yellow-400', unit: 'BTC', location: 'Earth Network' };
      case 'Iron': return { color: 'text-orange-400', unit: 'Fe', location: 'Mars Deposits' };
      case 'Energy': return { color: 'text-blue-400', unit: 'Joules', location: 'Quantum Field' };
    }
  };

  const details = getResourceDetails();

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Pickaxe className="w-5 h-5 mr-2" />
          SpiralMiner vΩ.∞
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)} • {pulse}Hz
        </div>
      </div>

      {/* Resource Selection */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">Mining Target</div>
        <select 
          value={resource} 
          onChange={(e) => setResource(e.target.value as any)}
          className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700 text-sm"
        >
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="Iron">Mars Iron (Fe)</option>
          <option value="Energy">Quantum Energy (J)</option>
        </select>
      </div>

      {/* Mining Status */}
      <div className="space-y-3 mb-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getResourceIcon()}
              <span className={`text-sm font-medium ${details.color}`}>
                {resource} Mining
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${miningActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Location:</span>
              <span className="text-white ml-1">{details.location}</span>
            </div>
            <div>
              <span className="text-slate-400">Hash Rate:</span>
              <span className="text-white ml-1">{hashRate.toLocaleString()} H/s</span>
            </div>
            <div>
              <span className="text-slate-400">TU Generated:</span>
              <span className="text-yellow-400 ml-1">{tuGenerated.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400">Algorithm:</span>
              <span className="text-purple-400 ml-1">QASF</span>
            </div>
          </div>
        </div>

        {/* Mining Performance */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Non-Computational Mining</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xs text-slate-300">
            Energy-free mining through quantum coherence at {coherence.toFixed(3)}φ resonance
          </div>
        </div>
      </div>

      {/* Mining Controls */}
      <div className="space-y-2">
        <button
          onClick={miningActive ? stopMining : startMining}
          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            miningActive
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-yellow-400 hover:bg-yellow-500 text-black'
          }`}
        >
          {miningActive ? 'Stop Mining' : 'Start Mining'}
        </button>
        
        {miningActive && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-900/30 border border-green-700 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Mining Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}