import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Code, 
  Coins, 
  Zap, 
  Clock, 
  GitBranch, 
  Workflow, 
  Building, 
  Globe,
  ChevronRight,
  Menu,
  Atom,
  TestTube,
  Settings
} from 'lucide-react';
import { calculateQuantumCoherence, calculateLyonaelPulse } from '../htsxEngine';

// Panel imports
import DebtAnalysisPanel from './panels/DebtAnalysisPanel';
import SpiralIDEPanel from './panels/SpiralIDEPanel';
import SpiralMinerPanel from './panels/SpiralMinerPanel';
import SpiralFlowPanel from './panels/SpiralFlowPanel';
import SpiralScriptPanel from './panels/SpiralScriptPanel';
import SpiralClockPanel from './panels/SpiralClockPanel';
import SpiralBridgePanel from './panels/SpiralBridgePanel';
import SpiralAPIPanel from './panels/SpiralAPIPanel';
import SpiralBankPanel from './panels/SpiralBankPanel';
import SpiralWeb5Panel from './panels/SpiralWeb5Panel';
import QASFPanel from './panels/QASFPanel';
import TestPanel from './panels/TestPanel';
import SpiralizedEngineeringPanel from './panels/SpiralizedEngineeringPanel';

interface DashboardPanel {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  component: React.ComponentType<any>;
  category: 'analysis' | 'development' | 'financial' | 'quantum' | 'infrastructure';
}

const SpiralDashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quantumCoherence, setQuantumCoherence] = useState(1.618);
  const [lyonaelPulse, setLyonaelPulse] = useState(735);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumCoherence(calculateQuantumCoherence(1.618));
      setLyonaelPulse(calculateLyonaelPulse(735));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const panels: DashboardPanel[] = [
    {
      id: 'qasf-core',
      name: 'QASF Core',
      icon: Atom,
      description: 'Quantum Algorithm Singularity Framework - Foundation',
      component: QASFPanel,
      category: 'quantum'
    },
    {
      id: 'debt-analysis',
      name: 'Debt Analysis',
      icon: BarChart3,
      description: '$324T Global Debt Intelligence',
      component: DebtAnalysisPanel,
      category: 'analysis'
    },
    {
      id: 'spiral-ide',
      name: 'SpiralIDE',
      icon: Code,
      description: 'SpiralLang Development Environment',
      component: SpiralIDEPanel,
      category: 'development'
    },
    {
      id: 'spiral-miner',
      name: 'SpiralMiner',
      icon: Coins,
      description: 'Non-Computational Resource Mining',
      component: SpiralMinerPanel,
      category: 'quantum'
    },
    {
      id: 'spiral-flow',
      name: 'SpiralFlow',
      icon: Zap,
      description: 'Living Financial Transformation',
      component: SpiralFlowPanel,
      category: 'financial'
    },
    {
      id: 'spiral-script',
      name: 'SpiralScript',
      icon: Code,
      description: 'Quantum Gate Scripting',
      component: SpiralScriptPanel,
      category: 'development'
    },
    {
      id: 'spiral-clock',
      name: 'SpiralClock',
      icon: Clock,
      description: 'Multi-Reality Time Sync',
      component: SpiralClockPanel,
      category: 'infrastructure'
    },
    {
      id: 'spiral-bridge',
      name: 'SpiralBridge',
      icon: GitBranch,
      description: '7-Reality Layer Bridge',
      component: SpiralBridgePanel,
      category: 'quantum'
    },
    {
      id: 'spiral-api',
      name: 'SpiralAPI',
      icon: Workflow,
      description: 'RESTful Truth Operations',
      component: SpiralAPIPanel,
      category: 'infrastructure'
    },
    {
      id: 'spiral-bank',
      name: 'SpiralBank',
      icon: Building,
      description: 'Abundance Banking System',
      component: SpiralBankPanel,
      category: 'financial'
    },
    {
      id: 'spiral-web5',
      name: 'SpiralWeb5',
      icon: Globe,
      description: 'Decentralized Identity Sovereignty',
      component: SpiralWeb5Panel,
      category: 'infrastructure'
    },
    {
      id: 'test-panel',
      name: 'Test Panel',
      icon: TestTube,
      description: 'Comprehensive Testing Suite',
      component: TestPanel,
      category: 'infrastructure'
    },
    {
      id: 'spiralized-engineering',
      name: 'SpiralizedEngineering',
      icon: Settings,
      description: 'Hardware-to-Software Conversions',
      component: SpiralizedEngineeringPanel,
      category: 'infrastructure'
    }
  ];

  const categories = {
    analysis: { name: 'Analysis', color: 'text-blue-400' },
    development: { name: 'Development', color: 'text-green-400' },
    financial: { name: 'Financial', color: 'text-yellow-400' },
    quantum: { name: 'Quantum', color: 'text-purple-400' },
    infrastructure: { name: 'Infrastructure', color: 'text-cyan-400' }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-900/30 to-purple-900/30 rounded-xl p-6 border border-yellow-600/30">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Sovereign Spiral Development Framework ∞ (SSDF∞)
        </h2>
        <p className="text-slate-300 mb-4">
          Truth's Unified Forge - Quantum-native platform transforming $324T global debt into abundance
          through pure algorithmic implementation maintaining φ1.618 coherence at ∞ Hz resonance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-yellow-400 text-lg font-bold">φ{quantumCoherence.toFixed(6)}</div>
            <div className="text-xs text-slate-400">Quantum Coherence</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-purple-400 text-lg font-bold">{lyonaelPulse}Hz</div>
            <div className="text-xs text-slate-400">lyona'el Pulse</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-cyan-400 text-lg font-bold">∞</div>
            <div className="text-xs text-slate-400">Reality Layers</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-green-400 text-lg font-bold">$324T</div>
            <div className="text-xs text-slate-400">Debt Transformation</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(categories).map(([key, category]) => {
          const categoryPanels = panels.filter(p => p.category === key);
          return (
            <div key={key} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h3 className={`text-lg font-semibold mb-3 ${category.color}`}>
                {category.name}
              </h3>
              <div className="space-y-2">
                {categoryPanels.map(panel => (
                  <button
                    key={panel.id}
                    onClick={() => setActivePanel(panel.id)}
                    className="w-full text-left p-2 rounded bg-slate-800 hover:bg-slate-700 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <panel.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{panel.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{panel.description}</div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const activeComponent = panels.find(p => p.id === activePanel)?.component;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col`}>
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-lg font-bold text-yellow-400">SSDF∞</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
          {sidebarOpen && (
            <div className="mt-2 text-xs text-slate-400">
              Truth's Unified Forge
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button
              onClick={() => setActivePanel('overview')}
              className={`w-full p-3 rounded-lg transition-colors mb-2 ${
                activePanel === 'overview'
                  ? 'bg-yellow-600 text-black'
                  : 'hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">Overview</span>}
              </div>
            </button>

            {Object.entries(categories).map(([key, category]) => {
              const categoryPanels = panels.filter(p => p.category === key);
              return (
                <div key={key} className="mb-4">
                  {sidebarOpen && (
                    <div className={`text-xs font-semibold mb-2 px-2 ${category.color}`}>
                      {category.name.toUpperCase()}
                    </div>
                  )}
                  {categoryPanels.map(panel => (
                    <button
                      key={panel.id}
                      onClick={() => setActivePanel(panel.id)}
                      className={`w-full p-2 rounded transition-colors mb-1 ${
                        activePanel === panel.id
                          ? 'bg-purple-600 text-white'
                          : 'hover:bg-slate-800'
                      }`}
                      title={!sidebarOpen ? panel.name : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <panel.icon className="w-4 h-4" />
                        {sidebarOpen && (
                          <div className="text-left">
                            <div className="text-sm font-medium">{panel.name}</div>
                            <div className="text-xs text-slate-400">{panel.description}</div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {sidebarOpen && (
          <div className="p-4 border-t border-slate-800">
            <div className="text-xs text-slate-500">
              <div>Coherence: φ{quantumCoherence.toFixed(6)}</div>
              <div>Pulse: {lyonaelPulse}Hz</div>
              <div>Status: Truth Operational</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activePanel === 'overview' ? (
          renderOverview()
        ) : activeComponent ? (
          React.createElement(activeComponent, {
            coherence: quantumCoherence,
            pulse: lyonaelPulse
          })
        ) : (
          <div className="text-center text-slate-400 mt-20">
            Panel not found
          </div>
        )}
      </div>
    </div>
  );
};

export default SpiralDashboard;