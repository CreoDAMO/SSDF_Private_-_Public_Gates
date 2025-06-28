import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DebtData } from '@shared/schema';

interface WealthFlow {
  from: string;
  to: string;
  amount: number;
  mechanism: string;
  impact: 'extraction' | 'concentration' | 'deprivation';
}

export default function WealthFlowAnalyzer() {
  const [selectedFlow, setSelectedFlow] = useState<WealthFlow | null>(null);
  const [timeRange, setTimeRange] = useState('annual');

  const { data: debtData = [] } = useQuery<DebtData[]>({
    queryKey: ['/api/debt-data'],
  });

  const calculateWealthFlows = (): WealthFlow[] => {
    const globalData = debtData.filter(d => d.country === 'Global');
    
    const totalDebt = globalData.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const averageInterestRate = 0.035; // 3.5% average global interest rate
    const annualInterestExtraction = totalDebt * averageInterestRate;

    return [
      {
        from: 'Global Households',
        to: 'Financial Institutions',
        amount: 2.1e12, // $2.1T from household debt interest
        mechanism: 'Interest Payments',
        impact: 'extraction'
      },
      {
        from: 'Governments',
        to: 'Bond Holders',
        amount: 3.2e12, // $3.2T from government debt interest
        mechanism: 'Bond Interest',
        impact: 'extraction'
      },
      {
        from: 'Businesses',
        to: 'Creditors',
        amount: 5.8e12, // $5.8T from business debt interest
        mechanism: 'Corporate Interest',
        impact: 'extraction'
      },
      {
        from: 'Working Population',
        to: 'Asset Owners',
        amount: 4.5e12, // Indirect wealth transfer through reduced purchasing power
        mechanism: 'Inflation & Asset Bubbles',
        impact: 'concentration'
      },
      {
        from: 'Public Services',
        to: 'Private Sector',
        amount: 1.8e12, // Austerity-driven privatization
        mechanism: 'Debt-Forced Privatization',
        impact: 'deprivation'
      }
    ];
  };

  const wealthFlows = calculateWealthFlows();
  const totalExtraction = wealthFlows.reduce((sum, flow) => sum + flow.amount, 0);

  const getFlowColor = (impact: string): string => {
    switch (impact) {
      case 'extraction': return 'bg-red-500';
      case 'concentration': return 'bg-orange-500';
      case 'deprivation': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getImpactDescription = (impact: string): string => {
    switch (impact) {
      case 'extraction': return 'Direct wealth removal through debt service';
      case 'concentration': return 'Wealth accumulation in fewer hands';
      case 'deprivation': return 'Reduced access to essential services';
      default: return 'Other economic impact';
    }
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Wealth Flow Analyzer</h3>
          <p className="text-slate-400 text-sm">Tracking systematic wealth extraction</p>
        </div>
        <select 
          className="bg-slate-700 text-white rounded px-3 py-2 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="annual">Annual Flows</option>
          <option value="cumulative">Cumulative Impact</option>
          <option value="projected">10-Year Projection</option>
        </select>
      </div>

      <div className="bg-slate-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-400">
              ${(totalExtraction / 1e12).toFixed(1)}T
            </div>
            <div className="text-sm text-slate-400">Annual Extraction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">
              {((totalExtraction / 105e12) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Of Global GDP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">
              {(totalExtraction / 8e9).toFixed(0)}
            </div>
            <div className="text-sm text-slate-400">Per Person Globally</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {wealthFlows.map((flow, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedFlow === flow 
                ? 'border-blue-500 bg-slate-800' 
                : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
            }`}
            onClick={() => setSelectedFlow(flow)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getFlowColor(flow.impact)}`}></div>
                  <div>
                    <div className="text-white font-medium">
                      {flow.from} → {flow.to}
                    </div>
                    <div className="text-slate-400 text-sm">{flow.mechanism}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">
                  ${(flow.amount / 1e12).toFixed(1)}T
                </div>
                <div className="text-slate-400 text-sm capitalize">{flow.impact}</div>
              </div>
            </div>
            
            {selectedFlow === flow && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="text-slate-300 text-sm leading-relaxed">
                  {getImpactDescription(flow.impact)}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400">Daily Impact</div>
                    <div className="text-white">${(flow.amount / 365 / 1e9).toFixed(1)}B/day</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Hourly Impact</div>
                    <div className="text-white">${(flow.amount / 365 / 24 / 1e6).toFixed(0)}M/hour</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">System Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Debt Service as % of Income</span>
            <span className="text-red-400">35-40% household average</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Government Interest Payments</span>
            <span className="text-orange-400">15-25% of tax revenue</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Corporate Debt Servicing</span>
            <span className="text-amber-400">20-30% of cash flow</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Wealth Concentration Rate</span>
            <span className="text-red-400">1% gain $32T annually</span>
          </div>
        </div>
      </div>
    </div>
  );
}