import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Zap, Infinity } from 'lucide-react';

interface SpiralClockProps {
  pulse: number;
}

export default function SpiralClock({ pulse }: SpiralClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [spiralTime, setSpiralTime] = useState(0);
  const [resonancePhase, setResonancePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setSpiralTime(prev => prev + 1);
      setResonancePhase(prev => (prev + 1) % 360);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatSpiralTime = (spiral: number) => {
    const hours = Math.floor(spiral / 3600);
    const minutes = Math.floor((spiral % 3600) / 60);
    const seconds = spiral % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getResonanceColor = () => {
    const phase = (resonancePhase / 360) * 2 * Math.PI;
    const intensity = (Math.sin(phase) + 1) / 2;
    return `rgba(255, 215, 0, ${0.3 + intensity * 0.7})`;
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          SpiralClock
        </h2>
        <div className="text-xs text-slate-400">
          ∞ Hz
        </div>
      </div>

      {/* Time Displays */}
      <div className="space-y-4 mb-4">
        {/* Standard Time */}
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Earth Time</span>
            </div>
          </div>
          <div className="text-lg font-mono text-white">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-xs text-slate-400">
            {currentTime.toLocaleDateString()}
          </div>
        </div>

        {/* Spiral Time */}
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Spiral Time</span>
            </div>
            <div className="text-xs text-yellow-400">
              {pulse} Hz
            </div>
          </div>
          <div className="text-lg font-mono text-yellow-400">
            {formatSpiralTime(spiralTime)}
          </div>
          <div className="text-xs text-slate-400">
            Cycles: {spiralTime.toLocaleString()}
          </div>
        </div>

        {/* Quantum Resonance */}
        <div 
          className="bg-slate-800 rounded-lg p-3 border"
          style={{ 
            borderColor: getResonanceColor(),
            boxShadow: `0 0 20px ${getResonanceColor()}`
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Infinity className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Quantum Resonance</span>
            </div>
            <div className="text-xs text-purple-400">
              ∞ Hz
            </div>
          </div>
          <div className="text-lg font-mono text-purple-400">
            {resonancePhase}°
          </div>
          <div className="text-xs text-slate-400">
            Phase Angle: {(resonancePhase / 360 * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Time Synchronization Status */}
      <div className="space-y-2">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-3 border border-blue-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-400">Multi-Reality Sync</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="text-xs text-slate-300">
            Synchronized across {Math.floor(pulse / 100)} reality layers
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-800 rounded p-2 text-center">
            <div className="text-slate-400">Pulse</div>
            <div className="text-yellow-400 font-mono">{pulse}</div>
          </div>
          <div className="bg-slate-800 rounded p-2 text-center">
            <div className="text-slate-400">Coherence</div>
            <div className="text-purple-400 font-mono">φ1.618</div>
          </div>
          <div className="bg-slate-800 rounded p-2 text-center">
            <div className="text-slate-400">Frequency</div>
            <div className="text-blue-400 font-mono">∞ Hz</div>
          </div>
        </div>
      </div>
    </div>
  );
}