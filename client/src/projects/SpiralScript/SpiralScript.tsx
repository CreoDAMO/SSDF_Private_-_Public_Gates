import React, { useState } from 'react';
import { Code2, Play, Save, FileCode } from 'lucide-react';

interface SpiralScriptProps {
  coherence: number;
}

export default function SpiralScript({ coherence }: SpiralScriptProps) {
  const [activeScript, setActiveScript] = useState('quantum_gate');
  const [scriptOutput, setScriptOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const scripts = {
    quantum_gate: {
      name: 'Quantum Gate',
      code: `// SpiralScript - Quantum Gate Implementation
spiral quantum_gate(coherence: φ${coherence.toFixed(3)}) {
  let superposition = ∞.state([|0⟩, |1⟩]);
  let entanglement = spiral.bridge(coherence);
  
  return spiral.transform(
    input: debt_matrix,
    algorithm: QASF.nullify(),
    output: trust_units
  );
}

// Execute transformation
let result = quantum_gate(φ${coherence.toFixed(3)});
spiral.log("Debt transformed:", result.tu_generated);`
    },
    debt_nullifier: {
      name: 'Debt Nullifier',
      code: `// SpiralScript - Debt Nullification Algorithm
spiral nullify_debt(amount: BigInt, coherence: φ${coherence.toFixed(3)}) {
  let scarcity_index = spiral.calculate_sri(amount);
  let transformation_rate = coherence * 7;
  let trust_units = (amount / scarcity_index) * transformation_rate;
  
  spiral.broadcast({
    action: "debt_nullified",
    original_amount: amount,
    tu_generated: trust_units,
    beneficiaries: spiral.calculate_reach(trust_units)
  });
  
  return trust_units;
}

// Nullify $324T global debt
let global_debt = 324_000_000_000_000n;
let result = nullify_debt(global_debt, φ${coherence.toFixed(3)});`
    },
    ubi_distributor: {
      name: 'UBI Distributor',
      code: `// SpiralScript - Universal Basic Income Distribution
spiral distribute_ubi(pool: BigInt, recipients: BigInt) {
  let per_person = pool / recipients;
  let distribution_map = spiral.create_map(recipients);
  
  for (recipient in distribution_map) {
    spiral.transfer({
      to: recipient.address,
      amount: per_person,
      currency: "TU",
      memo: "Universal Basic Income - SSDF∞"
    });
  }
  
  return {
    distributed: pool,
    recipients: recipients,
    per_person: per_person
  };
}

// Distribute $25T UBI to 8B people
let result = distribute_ubi(25_000_000_000_000n, 8_000_000_000n);`
    }
  };

  const runScript = () => {
    setIsRunning(true);
    setScriptOutput('Executing SpiralScript...\n');
    
    setTimeout(() => {
      const script = scripts[activeScript as keyof typeof scripts];
      const output = `
SpiralScript Execution Results:
===============================
Script: ${script.name}
Coherence: φ${coherence.toFixed(3)}
Status: SUCCESS

Output:
- Quantum gates initialized
- QASF algorithm activated
- Mathematical simulation complete
- Trust Units generated: ${(coherence * 1000).toFixed(0)} TU

Transaction ID: spiral-script-${Date.now()}
Timestamp: ${new Date().toISOString()}
`;
      setScriptOutput(output);
      setIsRunning(false);
      
      console.log('SpiralScript executed:', {
        script: script.name,
        coherence,
        txId: `spiral-script-${Date.now()}`
      });
    }, 2000);
  };

  const saveScript = () => {
    const script = scripts[activeScript as keyof typeof scripts];
    console.log('SpiralScript saved to SpiralVault:', {
      name: script.name,
      coherence,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Code2 className="w-5 h-5 mr-2" />
          SpiralScript
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* Script Selection */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">Script Template</div>
        <select 
          value={activeScript} 
          onChange={(e) => setActiveScript(e.target.value)}
          className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700 text-sm"
        >
          {Object.entries(scripts).map(([key, script]) => (
            <option key={key} value={key}>{script.name}</option>
          ))}
        </select>
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">SpiralScript Code</div>
        <textarea
          value={scripts[activeScript as keyof typeof scripts].code}
          readOnly
          className="w-full bg-slate-800 text-green-400 text-xs font-mono p-3 rounded border border-slate-700 h-40 resize-none"
        />
      </div>

      {/* Controls */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={runScript}
          disabled={isRunning}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
            isRunning
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? 'Running...' : 'Execute'}</span>
        </button>
        
        <button
          onClick={saveScript}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center space-x-1"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>

      {/* Output */}
      {scriptOutput && (
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <FileCode className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-slate-400">Script Output</span>
          </div>
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
            {scriptOutput}
          </pre>
        </div>
      )}

      {isRunning && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-900/30 border border-green-700 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Executing SpiralScript</span>
          </div>
        </div>
      )}
    </div>
  );
}