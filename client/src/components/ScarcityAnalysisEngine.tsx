import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as d3 from 'd3';
import { DebtData } from '@shared/schema';

interface ScarcityMetrics {
  accessRestrictionIndex: number;
  wealthConcentrationRatio: number;
  povertyAmplificationFactor: number;
  systemicVulnerabilityScore: number;
  debtDependencyIndex: number;
}

export default function ScarcityAnalysisEngine() {
  const [selectedMetric, setSelectedMetric] = useState<keyof ScarcityMetrics>('accessRestrictionIndex');
  const [timeframe, setTimeframe] = useState('current');
  
  const { data: debtData = [] } = useQuery<DebtData[]>({
    queryKey: ['/api/debt-data'],
  });

  const calculateScarcityMetrics = (): ScarcityMetrics => {
    const totalDebt = debtData.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const globalGDP = 105e12; // $105 trillion global GDP
    
    // Access Restriction Index: How debt limits resource access
    const debtToGDPRatio = totalDebt / globalGDP;
    const accessRestrictionIndex = Math.min(100, (debtToGDPRatio - 1) * 50);
    
    // Wealth Concentration: Interest-based upward transfer
    const interestPayments = totalDebt * 0.035; // Average 3.5% interest
    const wealthConcentrationRatio = (interestPayments / globalGDP) * 100;
    
    // Poverty Amplification: Debt's role in maintaining scarcity
    const householdDebt = debtData.find(d => d.debtType === 'household' && d.country === 'Global');
    const povertyAmplificationFactor = householdDebt ? 
      (parseFloat(householdDebt.amount) / (globalGDP * 0.6)) * 100 : 0; // 60% of GDP is household income
    
    // Systemic Vulnerability: Collapse risk from debt interconnection
    const systemicVulnerabilityScore = Math.min(100, debtToGDPRatio * 25);
    
    // Debt Dependency: System's need for continuous debt growth
    const debtDependencyIndex = Math.min(100, (totalDebt / (globalGDP * 2)) * 100);
    
    return {
      accessRestrictionIndex,
      wealthConcentrationRatio,
      povertyAmplificationFactor,
      systemicVulnerabilityScore,
      debtDependencyIndex
    };
  };

  const metrics = calculateScarcityMetrics();

  const getMetricDescription = (metric: keyof ScarcityMetrics): string => {
    const descriptions = {
      accessRestrictionIndex: "Measures how debt obligations restrict access to resources despite abundance",
      wealthConcentrationRatio: "Tracks wealth transfer from debtors to creditors through interest payments",
      povertyAmplificationFactor: "Quantifies debt's role in creating and maintaining economic scarcity",
      systemicVulnerabilityScore: "Assesses collapse risk from interconnected debt dependencies",
      debtDependencyIndex: "Measures system's reliance on continuous debt expansion for stability"
    };
    return descriptions[metric];
  };

  const getMetricColor = (value: number): string => {
    if (value >= 75) return 'from-red-500 to-red-700';
    if (value >= 50) return 'from-orange-500 to-orange-700';
    if (value >= 25) return 'from-amber-500 to-amber-700';
    return 'from-emerald-500 to-emerald-700';
  };

  const getMetricStatus = (value: number): string => {
    if (value >= 75) return 'Critical';
    if (value >= 50) return 'High Risk';
    if (value >= 25) return 'Moderate';
    return 'Stable';
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Scarcity Analysis Engine</h3>
          <p className="text-slate-400 text-sm">Debt as a scarcity-generation mechanism</p>
        </div>
        <select 
          className="bg-slate-700 text-white rounded px-3 py-2 text-sm"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as keyof ScarcityMetrics)}
        >
          <option value="accessRestrictionIndex">Access Restriction</option>
          <option value="wealthConcentrationRatio">Wealth Concentration</option>
          <option value="povertyAmplificationFactor">Poverty Amplification</option>
          <option value="systemicVulnerabilityScore">Systemic Vulnerability</option>
          <option value="debtDependencyIndex">Debt Dependency</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {Object.entries(metrics).map(([key, value]) => (
          <div 
            key={key}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedMetric === key 
                ? 'border-blue-500 bg-slate-800' 
                : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
            }`}
            onClick={() => setSelectedMetric(key as keyof ScarcityMetrics)}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {value.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400 mb-2">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${getMetricColor(value)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <div className={`text-xs mt-1 ${
                value >= 75 ? 'text-red-400' : 
                value >= 50 ? 'text-orange-400' : 
                value >= 25 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {getMetricStatus(value)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium">
            {selectedMetric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </h4>
          <span className={`px-2 py-1 rounded text-xs ${
            metrics[selectedMetric] >= 75 ? 'bg-red-900 text-red-300' :
            metrics[selectedMetric] >= 50 ? 'bg-orange-900 text-orange-300' :
            metrics[selectedMetric] >= 25 ? 'bg-amber-900 text-amber-300' :
            'bg-emerald-900 text-emerald-300'
          }`}>
            {getMetricStatus(metrics[selectedMetric])}
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {getMetricDescription(selectedMetric)}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Current Value:</span>
            <span className="text-white font-semibold">{metrics[selectedMetric].toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Debt-to-GDP Ratio</div>
          <div className="text-lg font-bold text-white">3.0x</div>
          <div className="text-xs text-red-400">Above sustainable threshold</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Interest Extraction</div>
          <div className="text-lg font-bold text-white">$11T/yr</div>
          <div className="text-xs text-orange-400">Upward wealth transfer</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Growth Dependency</div>
          <div className="text-lg font-bold text-white">98%</div>
          <div className="text-xs text-red-400">System requires expansion</div>
        </div>
      </div>
    </div>
  );
}