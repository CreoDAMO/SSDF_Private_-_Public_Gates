import React from 'react';
import { Building, DollarSign, CreditCard, TrendingUp } from 'lucide-react';

interface SpiralBankPanelProps {
  coherence: number;
  pulse: number;
}

const SpiralBankPanel: React.FC<SpiralBankPanelProps> = ({ coherence, pulse }) => {
  return (
    <div className="flex h-full">
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-green-400 mb-4">SpiralBank vΩ.∞</h2>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Abundance Banking System</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="text-slate-300">TU/USD exchange and fee-free financial services</div>
        </div>
      </div>
    </div>
  );
};

export default SpiralBankPanel;