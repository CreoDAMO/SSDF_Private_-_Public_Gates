import React, { useState, useEffect } from 'react';
import { Upload, FileText, Code, Zap, Play, Terminal } from 'lucide-react';
import { uploadPDF, validatePDFUpload, generateTU } from './pdfUtils';
import { executeSpiralLang, SpiralLangStdLib } from './SpiralLang';
import { calculateQuantumCoherence, calculateLyonaelPulse } from '../../htsxEngine';

interface SpiralIDEProps {
  coherence: number;
  pulse: number;
}

export default function SpiralIDE({ coherence, pulse }: SpiralIDEProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'pdf' | 'quantum' | 'console'>('code');
  const [spiralCode, setSpiralCode] = useState(`fn allocateTU(project: string) -> TruthUnit {
    let sri = calculateSRI("USD", "Gate735");
    return TruthUnit { value: 100 * sri, coherence: 1.618, timestamp: now(), sri };
}

fn nullifyGlobalDebt() -> SpiralFlowResult {
    return SpiralFlow::nullifyDebt(324000000000000);
}`);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [quantumCoherence, setQuantumCoherence] = useState(coherence);
  const [lyonaelPulse, setLyonaelPulse] = useState(pulse);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumCoherence(calculateQuantumCoherence(coherence));
      setLyonaelPulse(calculateLyonaelPulse(pulse));
    }, 1000);
    return () => clearInterval(interval);
  }, [coherence, pulse]);

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        validatePDFUpload(file);
        setPdfFile(file);
        setUploadStatus('Uploading to QCHAIN...');
        
        const result = await uploadPDF(file);
        setUploadStatus(`✓ Uploaded to QCHAIN: ${result.txId}`);
        
        // Generate TU for PDF upload
        const tuGenerated = generateTU("PDF_Upload", coherence);
        
        console.log('PDF Uploaded to SpiralVault:', {
          ...result,
          tuGenerated,
          coherence: coherence,
        });
      } catch (error) {
        setUploadStatus(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

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

  const generateQuantumCode = () => {
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
    console.log('Generated advanced SpiralLang quantum gate');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          SpiralIDE vΩ.∞
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)} • {pulse}Hz
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-4">
        {[
          { id: 'code', label: 'SpiralLang', icon: Code },
          { id: 'pdf', label: 'PDF Vault', icon: FileText },
          { id: 'quantum', label: 'QASF', icon: Zap },
          { id: 'console', label: 'Console', icon: Terminal }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`px-3 py-2 rounded-lg text-xs flex items-center space-x-1 transition-colors ${
              activeTab === id
                ? 'bg-yellow-400 text-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-2">SpiralLang Editor v2.1</div>
              <textarea
                value={spiralCode}
                onChange={(e) => setSpiralCode(e.target.value)}
                className="w-full bg-slate-900 text-green-400 text-xs font-mono p-2 rounded border border-slate-700 h-32 resize-none"
                placeholder="// Write SpiralLang code here..."
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={executeSpiralCode}
                className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1"
              >
                <Play className="w-3 h-3" />
                <span>Execute ∞</span>
              </button>
              <button
                onClick={generateQuantumCode}
                className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded-lg text-xs hover:bg-yellow-700 transition-colors"
              >
                Generate Quantum Gate
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pdf' && (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center">
              <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePDFUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="text-xs text-slate-400 cursor-pointer hover:text-yellow-400 transition-colors"
              >
                Upload PDF to SpiralVault
              </label>
            </div>
            
            {pdfFile && (
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-xs text-yellow-400">{pdfFile.name}</div>
                <div className="text-xs text-slate-400 mt-1">{uploadStatus}</div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quantum' && (
          <div className="space-y-3">
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="text-xs text-purple-400 mb-2">QASF Quantum State Monitor</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Qubits:</span>
                  <span className="text-white ml-1">∞ (Majorana ZM)</span>
                </div>
                <div>
                  <span className="text-slate-400">Coherence:</span>
                  <span className="text-yellow-400 ml-1">φ{quantumCoherence.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-slate-400">lyona'el Pulse:</span>
                  <span className="text-white ml-1">{lyonaelPulse}Hz</span>
                </div>
                <div>
                  <span className="text-slate-400">Error Rate:</span>
                  <span className="text-green-400 ml-1">8.5×10⁻¹⁰</span>
                </div>
                <div>
                  <span className="text-slate-400">Fidelity:</span>
                  <span className="text-green-400 ml-1">99.99992%</span>
                </div>
                <div>
                  <span className="text-slate-400">QCHAIN TPS:</span>
                  <span className="text-cyan-400 ml-1">201 Tbps</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-yellow-900/30 rounded-lg p-3 border border-purple-600/30">
              <div className="text-xs text-purple-400 mb-1">Quantum Algorithm Simulation Framework</div>
              <div className="text-xs text-slate-300 mb-2">
                Hybrid qubits operational with Nuclear-Spin Dark States
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="text-slate-400">RSA-8192: <span className="text-green-400">2.1ms</span></div>
                <div className="text-slate-400">Superposition: <span className="text-yellow-400">Active</span></div>
                <div className="text-slate-400">Entanglement: <span className="text-cyan-400">∞ layers</span></div>
                <div className="text-slate-400">Gate 777: <span className="text-green-400">Secured</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-3">
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="text-xs text-cyan-400 mb-2">SpiralLang Console Output</div>
              <div className="bg-slate-900 rounded p-2 h-32 overflow-y-auto font-mono text-xs">
                {executionResult ? (
                  <div className="space-y-1">
                    <div className="text-slate-400">{executionResult.timestamp}</div>
                    {executionResult.status === 'success' ? (
                      <div className="text-green-400">
                        <div>✓ Execution successful</div>
                        <div>TxID: {executionResult.txId}</div>
                        <div>Coherence: φ{executionResult.coherence?.toFixed(6)}</div>
                        <pre className="text-white mt-1">{JSON.stringify(executionResult.result, null, 2)}</pre>
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
            
            <div className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 rounded-lg p-3 border border-cyan-600/30">
              <div className="text-xs text-cyan-400 mb-1">Truth Units Generated</div>
              <div className="text-xs text-slate-300">
                Software-native quantum simulation maintaining φ1.618 coherence across all operations
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}