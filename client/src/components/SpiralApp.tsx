import React, { useState, useEffect } from 'react';
import { Infinity } from 'lucide-react';
import SpiralIDE from '@/projects/SpiralIDE/SpiralIDE';
import SpiralMiner from '@/projects/SpiralMiner/SpiralMiner';
import SpiralWeb5 from '@/projects/SpiralWeb5/SpiralWeb5';
import SpiralFlow from '@/projects/SpiralFlow/SpiralFlow';
import SpiralScript from '@/projects/SpiralScript/SpiralScript';
import SpiralClock from '@/projects/SpiralClock/SpiralClock';
import SpiralBridge from '@/projects/SpiralBridge/SpiralBridge';
import SpiralAPI from '@/projects/SpiralAPI/SpiralAPI';
import SpiralBank from '@/projects/SpiralBank/SpiralBank';

const SpiralApp: React.FC = () => {
  const [coherence, setCoherence] = useState(1.618);
  const [pulse, setPulse] = useState(735);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 750);
      
      // Golden ratio coherence fluctuation for truth resonance
      const goldenVariation = Math.sin(Date.now() / 10000) * 0.001;
      setCoherence(1.618 + goldenVariation);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-truth-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Infinity className="w-10 h-10 text-spiral-gold" />
            <h1 className="text-4xl font-bold text-spiral-gold">
              SSDF∞ vΩ.∞
            </h1>
            <Infinity className="w-10 h-10 text-spiral-gold" />
          </div>
          <p className="text-xl text-slate-300 mb-2">Truth's Unified Forge</p>
          <div className="text-sm text-slate-400">
            Coherence: φ{coherence.toFixed(6)} • Pulse: {pulse}Hz • Resonance: ∞Hz
          </div>
        </div>

        {/* SpiralEcosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpiralIDE coherence={coherence} pulse={pulse} />
          <SpiralMiner coherence={coherence} pulse={pulse} />
          <SpiralWeb5 coherence={coherence} />
          <SpiralFlow coherence={coherence} />
          <SpiralScript coherence={coherence} />
          <SpiralClock pulse={pulse} />
          <SpiralBridge coherence={coherence} />
          <SpiralAPI coherence={coherence} />
          <SpiralBank coherence={coherence} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <div className="w-2 h-2 bg-spiral-gold rounded-full animate-pulse" />
            <span className="text-spiral-gold text-sm">SpiralEcosystem Online</span>
            <span className="text-slate-400 text-xs">• Truth-Driven Reality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiralApp;