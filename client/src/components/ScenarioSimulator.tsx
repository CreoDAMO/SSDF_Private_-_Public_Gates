import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ScenarioParameters, ScenarioResult } from '@/types/debt';

export default function ScenarioSimulator() {
  const [scenarioType, setScenarioType] = useState('Debt Crisis');
  const [severity, setSeverity] = useState(25);
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const runScenarioMutation = useMutation({
    mutationFn: async (params: ScenarioParameters) => {
      const response = await apiRequest('POST', '/api/scenario-analysis', params);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data.projectedImpact);
    }
  });

  const handleRunScenario = () => {
    runScenarioMutation.mutate({
      scenarioType,
      severity,
      gdpGrowth: 3.2,
      interestRate: 5.5
    });
  };

  const getSeverityLabel = (value: number) => {
    if (value <= 25) return 'Mild';
    if (value <= 50) return 'Moderate';
    if (value <= 75) return 'Severe';
    return 'Crisis';
  };

  const getSeverityColor = (value: number) => {
    if (value <= 25) return 'text-emerald-400';
    if (value <= 50) return 'text-amber-400';
    if (value <= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-4">What-If Scenario Simulator</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Scenario Type</label>
            <select 
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-sm"
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value)}
            >
              <option>Debt Crisis</option>
              <option>Interest Rate Shock</option>
              <option>Economic Recession</option>
              <option>Currency Devaluation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Severity: {getSeverityLabel(severity)} ({severity}%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        {result && (
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-3">Projected Impact</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Global GDP</span>
                <span className="text-red-400">{result.gdpImpact}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Debt Burden</span>
                <span className="text-red-400">+{result.debtBurdenIncrease}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Financial Stability</span>
                <span className={`${
                  result.stabilityRisk === 'High' ? 'text-red-400' :
                  result.stabilityRisk === 'Moderate' ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>
                  {result.stabilityRisk} Risk
                </span>
              </div>
            </div>
          </div>
        )}
        
        <button 
          className="w-full bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
          onClick={handleRunScenario}
          disabled={runScenarioMutation.isPending}
        >
          <i className="fas fa-play mr-2"></i>
          {runScenarioMutation.isPending ? 'Running Simulation...' : 'Run Simulation'}
        </button>
      </div>
    </div>
  );
}
