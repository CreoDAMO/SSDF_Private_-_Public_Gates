import { useState } from 'react';
import { TrendingUp, Users, DollarSign, AlertTriangle, Target, Zap } from 'lucide-react';

interface SystemMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface ScarcityMechanism {
  mechanism: string;
  description: string;
  scale: string;
  beneficiaries: string[];
  victims: string[];
  arbitrageOpportunity: string;
  accessLevel: 'institutional' | 'high-net-worth' | 'restricted';
}

export default function DebtScarcitySystemAnalysis() {
  const [activeView, setActiveView] = useState<'overview' | 'mechanisms' | 'arbitrage' | 'beneficiaries'>('overview');

  // Global debt system metrics based on your research
  const systemMetrics: SystemMetric[] = [
    {
      label: 'Total Global Debt',
      value: '$324 trillion',
      change: '+$9T from 2024',
      trend: 'up',
      impact: 'negative',
      description: 'Debt-to-GDP ratio now ~310%, creating systemic fragility and dependency'
    },
    {
      label: 'Annual Debt Servicing',
      value: '$17.5 trillion',
      change: '+15% annually',
      trend: 'up',
      impact: 'negative',
      description: 'Wealth extraction from debtors to creditors through interest payments'
    },
    {
      label: 'Marginal Debt Absorption',
      value: '39% Non-Bank Domestic',
      change: 'CEPR Research',
      trend: 'stable',
      impact: 'neutral',
      description: 'Investment funds, pension funds absorb most new sovereign debt'
    },
    {
      label: 'Arbitrage Market Size',
      value: '~$2-5 trillion',
      change: 'Institutional only',
      trend: 'up',
      impact: 'positive',
      description: 'Profit opportunities from debt market inefficiencies - elite access only'
    },
    {
      label: 'Poverty Amplification',
      value: '1.1 billion affected',
      change: 'Debt-driven scarcity',
      trend: 'up',
      impact: 'negative',
      description: 'Artificial scarcity through debt access restrictions creates poverty'
    },
    {
      label: 'Ultimate Beneficiaries',
      value: '<0.1% population',
      change: 'Hidden ownership',
      trend: 'stable',
      impact: 'negative',
      description: 'Wealthy individuals, central banks behind corporate veils'
    }
  ];

  // Scarcity generation mechanisms
  const scarcityMechanisms: ScarcityMechanism[] = [
    {
      mechanism: 'Interest-Based Wealth Extraction',
      description: 'Annual $17.5T transfer from debtors to creditors through interest payments',
      scale: 'Global - $324T debt base',
      beneficiaries: ['Central banks', 'Investment funds', 'Wealthy bondholders'],
      victims: ['Governments', 'Businesses', 'Households', 'Developing nations'],
      arbitrageOpportunity: 'Interest rate arbitrage, carry trades, yield curve positioning',
      accessLevel: 'institutional'
    },
    {
      mechanism: 'Artificial Access Restrictions',
      description: 'Credit requirements create barriers to basic needs (housing, education, healthcare)',
      scale: '$164.5T business debt + $59.1T household debt',
      beneficiaries: ['Banks', 'Credit agencies', 'Landlords', 'Healthcare systems'],
      victims: ['Low-income populations', 'Young adults', 'Rural communities'],
      arbitrageOpportunity: 'Credit spread arbitrage, distressed debt opportunities',
      accessLevel: 'high-net-worth'
    },
    {
      mechanism: 'Marginal Debt Absorption Control',
      description: '39% domestic non-banks control sovereign debt flow, steering policy',
      scale: '$91.4T public debt globally',
      beneficiaries: ['Pension funds', 'Insurance companies', 'Investment managers'],
      victims: ['Taxpayers', 'Public service recipients', 'Future generations'],
      arbitrageOpportunity: 'Sovereign debt arbitrage, inflation swap strategies',
      accessLevel: 'institutional'
    },
    {
      mechanism: 'Currency Debasement Pressure',
      description: 'Debt servicing forces currency devaluation, eroding purchasing power',
      scale: 'Global reserve currencies',
      beneficiaries: ['Hard asset holders', 'Foreign creditors', 'Commodity exporters'],
      victims: ['Savers', 'Fixed income earners', 'Import-dependent nations'],
      arbitrageOpportunity: 'Currency arbitrage, inflation hedging strategies',
      accessLevel: 'institutional'
    },
    {
      mechanism: 'Austerity Policy Enforcement',
      description: 'Debt obligations force cuts to social spending, privatization',
      scale: 'IMF/World Bank conditionality',
      beneficiaries: ['Private contractors', 'Foreign investors', 'Multinational corporations'],
      victims: ['Public sector workers', 'Welfare recipients', 'Local businesses'],
      arbitrageOpportunity: 'Distressed sovereign debt, privatization plays',
      accessLevel: 'institutional'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-sm text-slate-400 mb-4">
        Based on research showing debt as systematic scarcity-generation mechanism
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold text-sm">{metric.label}</h4>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
            <div className={`text-xs ${getImpactColor(metric.impact)} mb-2`}>
              {metric.change}
            </div>
            <p className="text-xs text-slate-400">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">System Architecture: Debt as Control Mechanism</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <Target className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <span className="text-white font-medium">Scarcity Creation:</span>
              <span className="text-slate-300 ml-2">$324T debt system artificially restricts access to resources</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DollarSign className="w-4 h-4 text-yellow-500 mt-0.5" />
            <div>
              <span className="text-white font-medium">Wealth Extraction:</span>
              <span className="text-slate-300 ml-2">$17.5T annual transfer from debtors to creditors</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <span className="text-white font-medium">Elite Concentration:</span>
              <span className="text-slate-300 ml-2">39% domestic non-banks control sovereign debt flow</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Zap className="w-4 h-4 text-purple-500 mt-0.5" />
            <div>
              <span className="text-white font-medium">Arbitrage Profits:</span>
              <span className="text-slate-300 ml-2">Elite-only access to $2-5T market inefficiency profits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMechanisms = () => (
    <div className="space-y-4">
      {scarcityMechanisms.map((mechanism, index) => (
        <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-white font-semibold">{mechanism.mechanism}</h4>
            <span className={`px-2 py-1 text-xs rounded ${
              mechanism.accessLevel === 'institutional' ? 'bg-red-900 text-red-300' :
              mechanism.accessLevel === 'high-net-worth' ? 'bg-orange-900 text-orange-300' :
              'bg-gray-900 text-gray-300'
            }`}>
              {mechanism.accessLevel.replace('-', ' ')}
            </span>
          </div>
          
          <p className="text-slate-300 text-sm mb-3">{mechanism.description}</p>
          
          <div className="text-xs text-slate-500 mb-3">Scale: {mechanism.scale}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h5 className="text-green-400 font-semibold mb-2">Beneficiaries</h5>
              <ul className="space-y-1">
                {mechanism.beneficiaries.map((beneficiary, idx) => (
                  <li key={idx} className="text-slate-400 flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    {beneficiary}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-red-400 font-semibold mb-2">Victims</h5>
              <ul className="space-y-1">
                {mechanism.victims.map((victim, idx) => (
                  <li key={idx} className="text-slate-400 flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                    {victim}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-slate-700 rounded text-xs">
            <span className="text-yellow-400 font-semibold">Arbitrage Opportunity: </span>
            <span className="text-slate-300">{mechanism.arbitrageOpportunity}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBeneficiaries = () => (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Ultimate Beneficiaries Behind Corporate Veils</h4>
        <div className="space-y-3">
          <div className="border-l-4 border-yellow-500 pl-4">
            <h5 className="text-yellow-400 font-semibold">Central Banks & Sovereign Wealth</h5>
            <p className="text-slate-300 text-sm">Bank of Japan ($1.0T US Treasuries), People's Bank of China ($1.1T), European Central Bank ($240B cross-border holdings)</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h5 className="text-blue-400 font-semibold">Investment Fund Complex</h5>
            <p className="text-slate-300 text-sm">Money market funds (34%), pension funds (28%), insurance companies (22%), hedge funds (16%) - managing assets for wealthy individuals</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h5 className="text-green-400 font-semibold">Institutional Arbitrageurs</h5>
            <p className="text-slate-300 text-sm">Hedge funds exploiting eurozone mispricings, banks profiting from capital structure arbitrage, institutional-only access to $2-5T opportunities</p>
          </div>
        </div>
      </div>
      
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
          <div>
            <h4 className="text-red-300 font-semibold mb-2">Systemic Exclusion</h4>
            <p className="text-red-200 text-sm">
              The debt-scarcity system creates a two-tier economy: elites profit from arbitrage opportunities worth trillions, 
              while 1.1 billion people face artificial scarcity. Access requires institutional status, millions in capital, 
              and sophisticated risk management systems - deliberately excluding the masses who bear the cost of the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Debt-Scarcity System Analysis</h3>
        <div className="text-sm text-slate-400">
          Research-based systemic critique
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'overview' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          System Overview
        </button>
        <button
          onClick={() => setActiveView('mechanisms')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'mechanisms' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Scarcity Mechanisms
        </button>
        <button
          onClick={() => setActiveView('beneficiaries')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'beneficiaries' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Ultimate Beneficiaries
        </button>
      </div>

      {activeView === 'overview' && renderOverview()}
      {activeView === 'mechanisms' && renderMechanisms()}
      {activeView === 'beneficiaries' && renderBeneficiaries()}
    </div>
  );
}