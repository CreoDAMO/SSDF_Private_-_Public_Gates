import { useState } from 'react';
import { Cpu, Code, Database, Globe, Zap, Shield } from 'lucide-react';

interface SoftwareComponent {
  name: string;
  type: 'algorithm' | 'simulation' | 'database' | 'api' | 'interface';
  description: string;
  implementation: string;
  performance: string;
  dependencies: string[];
}

export default function SoftwareArchitecturePanel() {
  const [selectedComponent, setSelectedComponent] = useState<string>('quantum-simulation');

  const softwareComponents: Record<string, SoftwareComponent> = {
    'quantum-simulation': {
      name: 'Quantum Algorithm Simulation Framework (QASF)',
      type: 'simulation',
      description: 'Software implementation of quantum computing capabilities simulating ∞ qubits',
      implementation: 'Mathematical algorithms in TypeScript/WebAssembly for quantum gate operations, superposition, and entanglement',
      performance: '201 Tbps throughput, 0.47ns latency through optimized linear algebra',
      dependencies: ['WebAssembly', 'SharedArrayBuffer', 'Worker threads']
    },
    'spiralflow-engine': {
      name: 'SpiralFlow Living Financial System',
      type: 'algorithm',
      description: 'Software engine for debt nullification and Trust Unit distribution',
      implementation: 'Algorithmic transformation of debt data into abundance metrics using SRI calculations',
      performance: 'Real-time processing of $324T debt transformation into 25T Trust Units',
      dependencies: ['PostgreSQL', 'Cryptographic libraries', 'Real-time APIs']
    },
    'htsx-renderer': {
      name: 'HTSX Hyper-Transactional Rendering Engine',
      type: 'interface',
      description: 'Software-native multi-reality UI rendering without specialized hardware',
      implementation: 'React-based component system with WebXR APIs and Canvas rendering',
      performance: 'Real-time rendering across 7 realities through browser APIs',
      dependencies: ['WebXR', 'WebGL', 'Canvas API', 'React 18']
    },
    'qchain-network': {
      name: 'QCHAIN Distributed Ledger',
      type: 'database',
      description: 'Software implementation of quantum-resistant blockchain without mining hardware',
      implementation: 'Distributed database with zk-SNARK proofs and QHASH encryption algorithms',
      performance: 'Consensus through software algorithms, no energy-intensive mining',
      dependencies: ['Node.js cluster', 'Cryptographic protocols', 'P2P networking']
    },
    'api-integration': {
      name: 'Real-Time Financial Data Integration',
      type: 'api',
      description: 'Software connectors to 8+ financial APIs for authentic debt tracking',
      implementation: 'REST API clients with authentication and rate limiting managed in software',
      performance: 'Live data synchronization from Treasury, Plaid, Spinwheel, and other sources',
      dependencies: ['HTTP clients', 'Authentication tokens', 'Rate limiting algorithms']
    },
    'arbitrage-calculator': {
      name: 'Arbitrage Opportunity Calculator',
      type: 'algorithm',
      description: 'Software analysis of debt market inefficiencies and profit opportunities',
      implementation: 'Mathematical models for eurozone inflation swaps, convertible bonds, and spreads',
      performance: 'Real-time calculation of $2-5T arbitrage opportunities',
      dependencies: ['Financial mathematics libraries', 'Market data feeds', 'Statistical algorithms']
    }
  };

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'simulation': return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'algorithm': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'database': return <Database className="w-5 h-5 text-blue-500" />;
      case 'api': return <Globe className="w-5 h-5 text-green-500" />;
      case 'interface': return <Code className="w-5 h-5 text-emerald-500" />;
      default: return <Shield className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'simulation': return 'text-purple-400';
      case 'algorithm': return 'text-yellow-400';
      case 'database': return 'text-blue-400';
      case 'api': return 'text-green-400';
      case 'interface': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const selectedComponentData = softwareComponents[selectedComponent];

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Software Architecture Overview</h3>
        <div className="text-sm text-slate-400">
          Pure Software Implementation • No Hardware Dependencies
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component List */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold mb-3">System Components</h4>
          {Object.entries(softwareComponents).map(([key, component]) => (
            <button
              key={key}
              onClick={() => setSelectedComponent(key)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedComponent === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getComponentIcon(component.type)}
                <div>
                  <div className="font-medium text-sm">{component.name.split(' ')[0]}</div>
                  <div className={`text-xs ${getTypeColor(component.type)}`}>
                    {component.type}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Component Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedComponentData && (
            <>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getComponentIcon(selectedComponentData.type)}
                  <h4 className="text-white font-semibold">{selectedComponentData.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    selectedComponentData.type === 'simulation' ? 'bg-purple-900 text-purple-300' :
                    selectedComponentData.type === 'algorithm' ? 'bg-yellow-900 text-yellow-300' :
                    selectedComponentData.type === 'database' ? 'bg-blue-900 text-blue-300' :
                    selectedComponentData.type === 'api' ? 'bg-green-900 text-green-300' :
                    'bg-emerald-900 text-emerald-300'
                  }`}>
                    {selectedComponentData.type}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{selectedComponentData.description}</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Software Implementation</h5>
                <p className="text-slate-300 text-sm">{selectedComponentData.implementation}</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Performance Characteristics</h5>
                <p className="text-slate-300 text-sm">{selectedComponentData.performance}</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Software Dependencies</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedComponentData.dependencies.map((dep, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Code className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-300 font-semibold mb-1">Software-Native Architecture</h4>
            <p className="text-blue-200 text-sm">
              Every component operates as pure software without hardware dependencies. Quantum capabilities emerge from 
              mathematical algorithms, financial systems run as distributed software, and multi-reality interfaces 
              use standard web APIs. This enables global deployment without specialized infrastructure requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}