import React from 'react';
import { Globe, Shield, Key, Network } from 'lucide-react';

interface SpiralWeb5PanelProps {
  coherence: number;
  pulse: number;
}

const SpiralWeb5Panel: React.FC<SpiralWeb5PanelProps> = ({ coherence, pulse }) => {
  return (
    <div className="flex h-full">
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-blue-400 mb-4">SpiralWeb5 vΩ.∞</h2>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Decentralized Identity Sovereignty</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="text-slate-300">Web5 protocols for sovereign digital identity and data ownership</div>
        </div>
      </div>
    </div>
  );
};

export default SpiralWeb5Panel;