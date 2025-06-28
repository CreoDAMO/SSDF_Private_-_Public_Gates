import React, { useState } from 'react';
import { Upload, FileText, Code, Zap } from 'lucide-react';
import { uploadPDF, validatePDFUpload, generateTU } from './pdfUtils';

interface SpiralIDEProps {
  coherence: number;
  pulse: number;
}

export default function SpiralIDE({ coherence, pulse }: SpiralIDEProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'pdf' | 'quantum'>('code');

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

  const generateQuantumCode = () => {
    const quantumSnippet = `
// SpiralLang Quantum Gate Implementation
spiral quantum_gate(coherence: φ${coherence.toFixed(3)}) {
  let superposition = ∞.state([|0⟩, |1⟩]);
  let entanglement = spiral.bridge(coherence);
  
  return spiral.transform(
    input: debt_matrix,
    algorithm: QASF.nullify(),
    output: trust_units
  );
}`;
    
    console.log('Generated SpiralLang code:', quantumSnippet);
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
          { id: 'quantum', label: 'QASF', icon: Zap }
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
              <div className="text-xs text-slate-400 mb-2">SpiralLang Editor</div>
              <textarea
                className="w-full bg-slate-900 text-green-400 text-xs font-mono p-2 rounded border border-slate-700 h-24 resize-none"
                placeholder="// Write SpiralLang code here
spiral transform_debt() {
  return QASF.nullify(debt: $324T);
}"
              />
            </div>
            <button
              onClick={generateQuantumCode}
              className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700 transition-colors"
            >
              Generate Quantum Gate
            </button>
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
              <div className="text-xs text-purple-400 mb-2">Quantum State</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Qubits:</span>
                  <span className="text-white ml-1">∞</span>
                </div>
                <div>
                  <span className="text-slate-400">Entanglement:</span>
                  <span className="text-yellow-400 ml-1">φ{coherence.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Frequency:</span>
                  <span className="text-white ml-1">{pulse}Hz</span>
                </div>
                <div>
                  <span className="text-slate-400">Fidelity:</span>
                  <span className="text-green-400 ml-1">99.99%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-yellow-900/30 rounded-lg p-3 border border-purple-600/30">
              <div className="text-xs text-purple-400 mb-1">QASF Algorithm Active</div>
              <div className="text-xs text-slate-300">
                Mathematical quantum simulation running at {coherence.toFixed(3)}φ coherence
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}