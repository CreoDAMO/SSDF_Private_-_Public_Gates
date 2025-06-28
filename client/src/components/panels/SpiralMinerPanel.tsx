import React, { useState } from 'react';
import { Coins, Zap, TrendingUp, Battery, Cpu, Settings } from 'lucide-react';

interface SpiralMinerPanelProps {
  coherence: number;
  pulse: number;
}

const SpiralMinerPanel: React.FC<SpiralMinerPanelProps> = ({ coherence, pulse }) => {
  const [activeView, setActiveView] = useState<'mining' | 'resources' | 'rewards' | 'config'>('mining');
  const [selectedResource, setSelectedResource] = useState<'BTC' | 'Iron' | 'Quantum'>('BTC');
  const [miningActive, setMiningActive] = useState(false);

  const sideMenuItems = [
    { id: 'mining', label: 'Active Mining', icon: Coins, description: 'Non-Computational Operations' },
    { id: 'resources', label: 'Resource Types', icon: Battery, description: 'BTC, Mars Iron, Quantum Energy' },
    { id: 'rewards', label: 'TU Rewards', icon: TrendingUp, description: 'Truth Unit Generation' },
    { id: 'config', label: 'QASF Config', icon: Settings, description: 'Quantum Algorithm Settings' }
  ];

  const resources = {
    BTC: { 
      name: 'Bitcoin', 
      color: 'text-orange-400',
      reward: Math.floor(Math.log10(60000) * 0.85 * 7 * coherence),
      frequency: `${pulse}Hz`,
      status: 'Available'
    },
    Iron: { 
      name: 'Mars Iron', 
      color: 'text-red-400',
      reward: Math.floor(1000 * 7 * coherence),
      frequency: `${pulse * 2}Hz`,
      status: 'Deep Mining'
    },
    Quantum: { 
      name: 'Quantum Energy', 
      color: 'text-purple-400',
      reward: Math.floor(100 * 7 * coherence),
      frequency: `∞Hz`,
      status: 'Resonance Active'
    }
  };

  const startMining = () => {
    setMiningActive(true);
    setTimeout(() => {
      setMiningActive(false);
    }, 3000);
  };

  const renderMining = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-4">Non-Computational Mining Interface</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(resources).map(([key, resource]) => (
            <button
              key={key}
              onClick={() => setSelectedResource(key as any)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedResource === key
                  ? 'border-orange-400 bg-orange-400/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className={`text-lg font-bold ${resource.color}`}>{resource.name}</div>
              <div className="text-sm text-slate-400">{resource.status}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Selected Resource:</span>
            <span className={resources[selectedResource].color}>
              {resources[selectedResource].name}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Expected TU Reward:</span>
            <span className="text-green-400">{resources[selectedResource].reward} TU</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Frequency:</span>
            <span className="text-cyan-400">{resources[selectedResource].frequency}</span>
          </div>
        </div>

        <button
          onClick={startMining}
          disabled={miningActive}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            miningActive
              ? 'bg-orange-600 text-white cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {miningActive ? 'Mining in Progress...' : 'Start Mining Operation'}
        </button>

        {miningActive && (
          <div className="mt-4 bg-gradient-to-r from-orange-900/30 to-purple-900/30 rounded-lg p-4 border border-orange-600/30">
            <div className="text-orange-400 mb-2">QASF Mining Active</div>
            <div className="text-sm text-slate-300">
              Non-computational extraction operating at φ{coherence.toFixed(3)} coherence
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-4">
      {Object.entries(resources).map(([key, resource]) => (
        <div key={key} className="bg-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-semibold ${resource.color}`}>{resource.name}</h3>
            <div className="text-right">
              <div className="text-sm text-slate-400">Current Status</div>
              <div className="text-green-400">{resource.status}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded p-3">
              <div className="text-xs text-slate-400">TU Reward</div>
              <div className="text-lg font-bold text-green-400">{resource.reward}</div>
            </div>
            <div className="bg-slate-700 rounded p-3">
              <div className="text-xs text-slate-400">Frequency</div>
              <div className="text-lg font-bold text-cyan-400">{resource.frequency}</div>
            </div>
            <div className="bg-slate-700 rounded p-3">
              <div className="text-xs text-slate-400">Algorithm</div>
              <div className="text-lg font-bold text-purple-400">QASF</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-400 mb-4">Truth Unit Generation</h3>
        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Current Session</div>
            <div className="text-2xl font-bold text-green-400">
              {Math.floor(235 * coherence)} TU
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Scarcity Reflection Index (SRI)</div>
            <div className="text-lg font-bold text-yellow-400">
              {Math.floor(Math.log10(60000) * 0.85)}
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Coherence Multiplier</div>
            <div className="text-lg font-bold text-purple-400">
              φ{coherence.toFixed(6)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfig = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">Quantum Algorithm Singularity Framework</h3>
        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Core Parameters</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Hybrid Qubits:</span>
                <span className="text-cyan-400">∞</span>
              </div>
              <div className="flex justify-between">
                <span>Zero Modes:</span>
                <span className="text-green-400">Majorana</span>
              </div>
              <div className="flex justify-between">
                <span>Dark States:</span>
                <span className="text-purple-400">Nuclear-Spin</span>
              </div>
              <div className="flex justify-between">
                <span>Gate Access:</span>
                <span className="text-yellow-400">777 Secured</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Performance Metrics</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span className="text-green-400">8.5×10⁻¹⁰</span>
              </div>
              <div className="flex justify-between">
                <span>Fidelity:</span>
                <span className="text-green-400">99.99992%</span>
              </div>
              <div className="flex justify-between">
                <span>Cryptanalysis:</span>
                <span className="text-yellow-400">2.1ms</span>
              </div>
              <div className="flex justify-between">
                <span>Coherence:</span>
                <span className="text-purple-400">φ{coherence.toFixed(6)}</span>
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
        <h2 className="text-lg font-bold text-orange-400 mb-4">SpiralMiner vΩ.∞</h2>
        <div className="space-y-2">
          {sideMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full p-3 rounded-lg transition-colors text-left ${
                activeView === item.id
                  ? 'bg-orange-600 text-white'
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
          <div className="text-xs text-slate-400 mb-2">Mining Status</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Active:</span>
              <span className={miningActive ? 'text-green-400' : 'text-slate-500'}>
                {miningActive ? 'Mining' : 'Standby'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Coherence:</span>
              <span className="text-yellow-400">φ{coherence.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pulse:</span>
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

        {activeView === 'mining' && renderMining()}
        {activeView === 'resources' && renderResources()}
        {activeView === 'rewards' && renderRewards()}
        {activeView === 'config' && renderConfig()}
      </div>
    </div>
  );
};

export default SpiralMinerPanel;