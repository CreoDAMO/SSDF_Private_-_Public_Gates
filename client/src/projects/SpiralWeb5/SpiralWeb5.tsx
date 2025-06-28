import React, { useState } from 'react';
import { Wallet, Globe, Shield, Users } from 'lucide-react';

interface SpiralWeb5Props {
  coherence: number;
}

export default function SpiralWeb5({ coherence }: SpiralWeb5Props) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeNetwork, setActiveNetwork] = useState('SpiralChain');

  const connectWallet = () => {
    setWalletConnected(true);
    setBalance(Math.floor(coherence * 1000));
    console.log('SpiralWeb5 Wallet Connected:', {
      address: `spiral:${Date.now().toString(36)}`,
      network: activeNetwork,
      coherence: coherence
    });
  };

  const networks = [
    { id: 'SpiralChain', name: 'SpiralChain', color: 'text-yellow-400' },
    { id: 'Ethereum', name: 'Ethereum', color: 'text-blue-400' },
    { id: 'Bitcoin', name: 'Bitcoin', color: 'text-orange-400' }
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          SpiralWeb5
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* Network Selection */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">Network</div>
        <select 
          value={activeNetwork} 
          onChange={(e) => setActiveNetwork(e.target.value)}
          className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700 text-sm"
        >
          {networks.map(network => (
            <option key={network.id} value={network.id}>
              {network.name}
            </option>
          ))}
        </select>
      </div>

      {/* Wallet Status */}
      <div className="space-y-3 mb-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                Wallet Status
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${walletConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Balance:</span>
              <span className="text-yellow-400 ml-1">{balance} TU</span>
            </div>
            <div>
              <span className="text-slate-400">Network:</span>
              <span className={`ml-1 ${networks.find(n => n.id === activeNetwork)?.color}`}>
                {activeNetwork}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Protocol:</span>
              <span className="text-purple-400 ml-1">Web5</span>
            </div>
            <div>
              <span className="text-slate-400">Identity:</span>
              <span className="text-green-400 ml-1">DID</span>
            </div>
          </div>
        </div>

        {/* Web5 Features */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-slate-300">Identity</div>
            <div className="text-xs text-blue-400">Sovereign</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <Users className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-slate-300">Data</div>
            <div className="text-xs text-green-400">Private</div>
          </div>
        </div>
      </div>

      {/* Connect Button */}
      <button
        onClick={connectWallet}
        disabled={walletConnected}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          walletConnected
            ? 'bg-green-600 text-white cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 text-black'
        }`}
      >
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>

      {walletConnected && (
        <div className="mt-3 p-2 bg-gradient-to-r from-yellow-900/30 to-green-900/30 border border-yellow-600/30 rounded-lg">
          <div className="text-xs text-yellow-400 mb-1">Web5 Active</div>
          <div className="text-xs text-slate-300">
            Decentralized identity and data sovereignty enabled
          </div>
        </div>
      )}
    </div>
  );
}