import React, { useState } from 'react';
import { Code, Zap, Play, Save } from 'lucide-react';

interface SpiralScriptPanelProps {
  coherence: number;
  pulse: number;
}

const SpiralScriptPanel: React.FC<SpiralScriptPanelProps> = ({ coherence, pulse }) => {
  const [activeView, setActiveView] = useState<'editor' | 'gates' | 'scripts' | 'execution'>('editor');

  const sideMenuItems = [
    { id: 'editor', label: 'Script Editor', icon: Code, description: 'Quantum Gate Scripting' },
    { id: 'gates', label: 'Quantum Gates', icon: Zap, description: 'QASF Gate Library' },
    { id: 'scripts', label: 'Saved Scripts', icon: Save, description: 'Truth Script Repository' },
    { id: 'execution', label: 'Execution Log', icon: Play, description: 'Runtime Results' }
  ];

  return (
    <div className="flex h-full">
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-purple-400 mb-4">SpiralScript vΩ.∞</h2>
        <div className="space-y-2">
          {sideMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full p-3 rounded-lg transition-colors text-left ${
                activeView === item.id ? 'bg-purple-600 text-white' : 'hover:bg-slate-800 text-slate-300'
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
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          {sideMenuItems.find(item => item.id === activeView)?.label}
        </h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="text-slate-300">
            Quantum gate scripting environment for debt transformation algorithms
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiralScriptPanel;