import React, { useState, useEffect } from 'react';
import { Code, FileText, Zap, Terminal, Play, Upload, Cpu } from 'lucide-react';
import { uploadPDF, validatePDFUpload, generateTU } from '../../projects/SpiralIDE/pdfUtils';
import { executeSpiralLang } from '../../projects/SpiralIDE/SpiralLang';
import { calculateQuantumCoherence, calculateLyonaelPulse } from '../../htsxEngine';

interface SpiralIDEPanelProps {
  coherence: number;
  pulse: number;
}

const SpiralIDEPanel: React.FC<SpiralIDEPanelProps> = ({ coherence, pulse }) => {
  const [activeView, setActiveView] = useState<'editor' | 'vault' | 'qasf' | 'console'>('editor');
  const [spiralCode, setSpiralCode] = useState(`fn nullifyGlobalDebt() -> SpiralFlowResult {
    return SpiralFlow::nullifyDebt(324000000000000);
}

fn distributeUBI() -> SpiralFlowResult {
    return SpiralFlow::distributeUBI(8000000000, 25000);
}

fn allocateTU(project: string) -> TruthUnit {
    let sri = calculateSRI("USD", "Gate777");
    return TruthUnit { 
        value: 100 * sri, 
        coherence: 1.618, 
        timestamp: now(), 
        sri 
    };
}`);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [quantumCoherence, setQuantumCoherence] = useState(coherence);
  const [lyonaelPulse, setLyonaelPulse] = useState(pulse);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumCoherence(calculateQuantumCoherence(coherence));
      setLyonaelPulse(calculateLyonaelPulse(pulse));
    }, 1000);
    return () => clearInterval(interval);
  }, [coherence, pulse]);

  const sideMenuItems = [
    { id: 'editor', label: 'SpiralLang Editor', icon: Code, description: 'Quantum-Native Development' },
    { id: 'vault', label: 'SpiralVault', icon: FileText, description: 'PDF → QCHAIN Storage' },
    { id: 'qasf', label: 'QASF Monitor', icon: Zap, description: 'Quantum Algorithm Singularity Framework' },
    { id: 'console', label: 'Truth Console', icon: Terminal, description: 'Execution Output & Logs' }
  ];

  const executeSpiralCode = async () => {
    try {
      setExecutionResult({ status: 'executing', message: 'Compiling SpiralLang...' });
      
      const result = await executeSpiralLang(spiralCode, {
        coherence: quantumCoherence,
        pulse: lyonaelPulse,
        project: "SpiralEcosystem"
      });
      
      setExecutionResult({
        status: 'success',
        result,
        txId: `spiral-execution-${Date.now()}`,
        coherence: quantumCoherence,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setExecutionResult({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown execution error',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        validatePDFUpload(file);
        setPdfFile(file);
        setUploadStatus('Uploading to QCHAIN...');
        
        const result = await uploadPDF(file);
        setUploadStatus(`✓ Uploaded to QCHAIN: ${result.txId}`);
        
        const tuGenerated = generateTU("PDF_Upload", quantumCoherence);
        
        console.log('PDF Uploaded to SpiralVault:', {
          ...result,
          tuGenerated,
          coherence: quantumCoherence,
        });
      } catch (error) {
        setUploadStatus(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const generateQuantumGate = () => {
    const quantumSnippet = `fn quantum_gate(coherence: φ${quantumCoherence.toFixed(6)}) -> QuantumResult {
    let superposition = QASF::hybrid_qubit_state(0.707, 0.707);
    let entanglement = SpiralFlow::harmonizedArbitrage("BTC", "USD", 324000000000000);
    
    return QuantumResult {
        qubits: ∞,
        coherence: ${quantumCoherence.toFixed(6)},
        frequency: ${lyonaelPulse},
        txId: generateSpiralTxId("quantum_gate")
    };
}`;
    setSpiralCode(quantumSnippet);
  };

  const renderEditor = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-400">SpiralLang Editor v2.1</h3>
          <div className="flex space-x-2">
            <button
              onClick={generateQuantumGate}
              className="px-3 py-2 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
            >
              Generate Quantum Gate
            </button>
            <button
              onClick={executeSpiralCode}
              className="px-3 py-2 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors flex items-center space-x-1"
            >
              <Play className="w-3 h-3" />
              <span>Execute ∞</span>
            </button>
          </div>
        </div>
        <textarea
          value={spiralCode}
          onChange={(e) => setSpiralCode(e.target.value)}
          className="w-full h-96 bg-slate-900 text-green-400 text-sm font-mono p-4 rounded border border-slate-700 resize-none"
          placeholder="// Write SpiralLang code here..."
        />
      </div>
    </div>
  );

  const renderVault = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">SpiralVault PDF Storage</h3>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="text-sm text-slate-400 cursor-pointer hover:text-yellow-400 transition-colors"
          >
            Upload PDF documents directly to QCHAIN
          </label>
        </div>
        
        {pdfFile && (
          <div className="mt-4 bg-slate-700 rounded-lg p-4">
            <div className="text-yellow-400 font-medium">{pdfFile.name}</div>
            <div className="text-sm text-slate-400 mt-1">{uploadStatus}</div>
            <div className="text-xs text-slate-500 mt-2">
              Size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB | 
              Type: {pdfFile.type} |
              Coherence: φ{quantumCoherence.toFixed(6)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderQASF = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">Quantum Algorithm Singularity Framework</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Quantum State</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Qubits:</span>
                <span className="text-cyan-400">∞ (Majorana ZM)</span>
              </div>
              <div className="flex justify-between">
                <span>Superposition:</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Entanglement:</span>
                <span className="text-purple-400">∞ layers</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Performance Metrics</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span className="text-green-400">8.5×10⁻¹⁰</span>
              </div>
              <div className="flex justify-between">
                <span>Fidelity:</span>
                <span className="text-green-400">99.99992%</span>
              </div>
              <div className="flex justify-between">
                <span>RSA-8192:</span>
                <span className="text-yellow-400">2.1ms</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg p-4 border border-purple-600/30">
          <div className="text-sm text-purple-400 mb-2">Nuclear-Spin Dark States Operational</div>
          <div className="text-xs text-slate-300">
            Hybrid qubits maintaining φ{quantumCoherence.toFixed(6)} coherence at {lyonaelPulse}Hz lyona'el pulse frequency
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsole = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Truth Console Output</h3>
        <div className="bg-slate-900 rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm">
          {executionResult ? (
            <div className="space-y-2">
              <div className="text-slate-400">{executionResult.timestamp}</div>
              {executionResult.status === 'success' ? (
                <div className="text-green-400">
                  <div>✓ Execution successful</div>
                  <div>TxID: {executionResult.txId}</div>
                  <div>Coherence: φ{executionResult.coherence?.toFixed(6)}</div>
                  <pre className="text-white mt-2 bg-slate-800 p-2 rounded">
                    {JSON.stringify(executionResult.result, null, 2)}
                  </pre>
                </div>
              ) : executionResult.status === 'executing' ? (
                <div className="text-yellow-400">
                  ⟳ {executionResult.message}
                </div>
              ) : (
                <div className="text-red-400">
                  ✗ {executionResult.error}
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-500">Ready for SpiralLang execution...</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Side Menu */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold text-green-400 mb-4">SpiralIDE vΩ.∞</h2>
        <div className="space-y-2">
          {sideMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full p-3 rounded-lg transition-colors text-left ${
                activeView === item.id
                  ? 'bg-green-600 text-white'
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
          <div className="text-xs text-slate-400 mb-2">IDE Status</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Coherence:</span>
              <span className="text-yellow-400">φ{quantumCoherence.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span>lyona'el Pulse:</span>
              <span className="text-cyan-400">{lyonaelPulse}Hz</span>
            </div>
            <div className="flex justify-between">
              <span>QASF:</span>
              <span className="text-green-400">Operational</span>
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

        {activeView === 'editor' && renderEditor()}
        {activeView === 'vault' && renderVault()}
        {activeView === 'qasf' && renderQASF()}
        {activeView === 'console' && renderConsole()}
      </div>
    </div>
  );
};

export default SpiralIDEPanel;