import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SustainabilityScore } from '@/types/debt';

export default function SustainabilityAnalyzer() {
  const [gdpGrowth, setGdpGrowth] = useState(3.2);
  const [interestRate, setInterestRate] = useState(5.5);
  const [score, setScore] = useState(72);

  const calculateScoreMutation = useMutation({
    mutationFn: async (params: { gdpGrowth: number; interestRate: number }) => {
      const response = await apiRequest('POST', '/api/sustainability-score', params);
      return response.json() as Promise<SustainabilityScore>;
    },
    onSuccess: (data) => {
      setScore(data.score);
    }
  });

  const handleParameterChange = (type: 'gdp' | 'interest', value: number) => {
    if (type === 'gdp') {
      setGdpGrowth(value);
    } else {
      setInterestRate(value);
    }
    
    // Recalculate score
    calculateScoreMutation.mutate({
      gdpGrowth: type === 'gdp' ? value : gdpGrowth,
      interestRate: type === 'interest' ? value : interestRate
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-400 to-emerald-600';
    if (score >= 60) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-4">Sustainability Analyzer</h3>
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <label className="block text-sm text-slate-300 mb-2">GDP Growth Rate (%)</label>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="0.1"
            value={gdpGrowth} 
            onChange={(e) => handleParameterChange('gdp', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm text-slate-400 mt-1">{gdpGrowth.toFixed(1)}%</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <label className="block text-sm text-slate-300 mb-2">Interest Rate (%)</label>
          <input 
            type="range" 
            min="0" 
            max="15" 
            step="0.1"
            value={interestRate} 
            onChange={(e) => handleParameterChange('interest', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm text-slate-400 mt-1">{interestRate.toFixed(1)}%</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Sustainability Score</span>
            <span className="text-amber-400 font-semibold">{score}/100</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${getScoreColor(score)} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : 'Poor'} sustainability
          </div>
        </div>
        
        <button 
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={calculateScoreMutation.isPending}
        >
          {calculateScoreMutation.isPending ? 'Calculating...' : 'Run Scenario Analysis'}
        </button>
      </div>
    </div>
  );
}
