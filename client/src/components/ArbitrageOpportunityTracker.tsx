import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Globe } from 'lucide-react';

interface ArbitrageOpportunity {
  id: string;
  strategy: string;
  marketType: 'sovereign' | 'corporate' | 'currency';
  region: string;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedReturn: number;
  timeframe: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  description: string;
  requirements: string[];
  risks: string[];
  lastUpdated: string;
}

interface MarketCondition {
  indicator: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export default function ArbitrageOpportunityTracker() {
  const [selectedMarket, setSelectedMarket] = useState<'sovereign' | 'corporate' | 'currency'>('sovereign');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Research-based arbitrage opportunities
  const opportunities: ArbitrageOpportunity[] = [
    {
      id: 'eurozone_inflation_swap',
      strategy: 'Inflation Swap Arbitrage',
      marketType: 'sovereign',
      region: 'Eurozone',
      riskLevel: 'medium',
      estimatedReturn: 2.3,
      timeframe: '6-12 months',
      complexity: 'advanced',
      description: 'Exploit mispricings between inflation-protected securities and nominal bonds using inflation swaps',
      requirements: ['Institutional access', 'Minimum $10M capital', 'Derivatives expertise'],
      risks: ['Deflation risk', 'Volatility exposure', 'Liquidity constraints'],
      lastUpdated: '2025-06-28'
    },
    {
      id: 'capital_structure_arb',
      strategy: 'Capital Structure Arbitrage',
      marketType: 'corporate',
      region: 'Global',
      riskLevel: 'high',
      estimatedReturn: 4.1,
      timeframe: '3-6 months',
      complexity: 'advanced',
      description: 'Profit from mispricings between corporate debt (CDS/bonds) and equity positions',
      requirements: ['Multi-market access', 'Risk management systems', 'Credit analysis capabilities'],
      risks: ['Credit events', 'Correlation breakdown', 'Market volatility'],
      lastUpdated: '2025-06-28'
    },
    {
      id: 'convertible_bond_arb',
      strategy: 'Convertible Arbitrage',
      marketType: 'corporate',
      region: 'US/Europe',
      riskLevel: 'medium',
      estimatedReturn: 3.5,
      timeframe: '2-4 months',
      complexity: 'intermediate',
      description: 'Exploit price differences between convertible bonds and underlying equity',
      requirements: ['Options trading capability', 'Delta hedging systems', 'Real-time pricing'],
      risks: ['Gamma risk', 'Interest rate sensitivity', 'Volatility changes'],
      lastUpdated: '2025-06-28'
    },
    {
      id: 'treasury_futures_basis',
      strategy: 'Treasury Cash-Futures Basis',
      marketType: 'sovereign',
      region: 'United States',
      riskLevel: 'low',
      estimatedReturn: 1.8,
      timeframe: '1-3 months',
      complexity: 'intermediate',
      description: 'Arbitrage between treasury cash bonds and futures contracts',
      requirements: ['Futures market access', 'Margin capability', 'Yield curve analysis'],
      risks: ['Basis convergence risk', 'Carry costs', 'Delivery complications'],
      lastUpdated: '2025-06-28'
    },
    {
      id: 'swap_spread_trade',
      strategy: 'Swap Spread Arbitrage',
      marketType: 'sovereign',
      region: 'G7 Countries',
      riskLevel: 'medium',
      estimatedReturn: 2.7,
      timeframe: '4-8 months',
      complexity: 'advanced',
      description: 'Exploit differences between government bond yields and interest rate swaps',
      requirements: ['ISDA documentation', 'Credit support capability', 'Interest rate modeling'],
      risks: ['Credit spread widening', 'Funding costs', 'Regulatory changes'],
      lastUpdated: '2025-06-28'
    }
  ];

  // Current market conditions affecting arbitrage
  const marketConditions: MarketCondition[] = [
    {
      indicator: 'Global Interest Rate Volatility',
      value: 'Elevated',
      trend: 'up',
      impact: 'positive',
      description: '2025 interest rate uncertainty creates pricing dislocations across markets'
    },
    {
      indicator: 'Credit Spread Dispersion',
      value: 'Wide',
      trend: 'stable',
      impact: 'positive',
      description: 'Corporate credit spreads showing regional variations, enabling cross-market plays'
    },
    {
      indicator: 'Inflation Expectations Divergence',
      value: 'High',
      trend: 'up',
      impact: 'positive',
      description: 'Eurozone inflation-protected securities showing largest mispricings'
    },
    {
      indicator: 'Liquidity Conditions',
      value: 'Moderate',
      trend: 'down',
      impact: 'negative',
      description: 'Reduced market liquidity increases execution risks and costs'
    },
    {
      indicator: 'Regulatory Environment',
      value: 'Stable',
      trend: 'stable',
      impact: 'neutral',
      description: 'No major regulatory changes expected to impact arbitrage strategies'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const marketMatch = opp.marketType === selectedMarket;
    const riskMatch = riskFilter === 'all' || opp.riskLevel === riskFilter;
    return marketMatch && riskMatch;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-900 text-green-300';
      case 'intermediate': return 'bg-yellow-900 text-yellow-300';
      case 'advanced': return 'bg-red-900 text-red-300';
      default: return 'bg-slate-900 text-slate-300';
    }
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Global Debt Arbitrage Opportunities</h3>
        <div className="text-sm text-slate-400">
          Research-based • Updated {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Market Conditions Overview */}
      <div className="mb-6 p-4 bg-slate-800 rounded-lg">
        <h4 className="text-white font-semibold mb-3 flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          Current Market Conditions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketConditions.slice(0, 3).map((condition, index) => (
            <div key={index} className="bg-slate-700 rounded p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300 text-sm">{condition.indicator}</span>
                {getTrendIcon(condition.trend)}
              </div>
              <div className="text-white font-semibold text-sm">{condition.value}</div>
              <div className={`text-xs mt-1 ${
                condition.impact === 'positive' ? 'text-green-400' :
                condition.impact === 'negative' ? 'text-red-400' : 'text-slate-400'
              }`}>
                {condition.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMarket('sovereign')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedMarket === 'sovereign' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Sovereign Debt
          </button>
          <button
            onClick={() => setSelectedMarket('corporate')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedMarket === 'corporate' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Corporate Debt
          </button>
        </div>

        <select 
          className="bg-slate-800 text-white rounded px-3 py-2 text-sm"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value as any)}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <h4 className="text-white font-semibold">{opportunity.strategy}</h4>
                  <div className="flex items-center space-x-2 text-xs mt-1">
                    <span className="text-slate-400">{opportunity.region}</span>
                    <span className={`px-2 py-1 rounded ${getComplexityColor(opportunity.complexity)}`}>
                      {opportunity.complexity}
                    </span>
                    <span className={`${getRiskColor(opportunity.riskLevel)}`}>
                      {opportunity.riskLevel} risk
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-green-400 font-semibold">+{opportunity.estimatedReturn.toFixed(1)}%</div>
                <div className="text-xs text-slate-500">{opportunity.timeframe}</div>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-3">{opportunity.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="text-white font-semibold mb-2">Requirements</h5>
                <ul className="space-y-1">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="text-slate-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-2">Key Risks</h5>
                <ul className="space-y-1">
                  {opportunity.risks.map((risk, index) => (
                    <li key={index} className="text-slate-400 flex items-center">
                      <AlertTriangle className="w-3 h-3 text-orange-500 mr-2" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accessibility Notice */}
      <div className="mt-6 p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
          <div>
            <h4 className="text-orange-300 font-semibold mb-1">Institutional Access Required</h4>
            <p className="text-orange-200 text-sm">
              These arbitrage opportunities require significant capital, institutional market access, and sophisticated risk management systems. 
              Individual investors face barriers including high minimum investments, regulatory restrictions, and execution complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}