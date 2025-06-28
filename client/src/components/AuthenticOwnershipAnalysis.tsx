import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DebtOwnership } from '@shared/schema';

interface OwnershipStructure {
  domesticNonBanks: number;  // Investment funds, pension funds, insurance (39%)
  foreignNonBanks: number;   // Foreign investment funds and institutions (23%)
  foreignBanks: number;      // Foreign banking institutions (5%)
  domesticBanks: number;     // Domestic banking sector (33%)
}

interface BeyondCorporateVeils {
  centralBanks: { entity: string; holdings: string; purpose: string }[];
  investmentFunds: { type: string; beneficiaries: string; percentage: number }[];
  ultimateBeneficiaries: string[];
}

export default function AuthenticOwnershipAnalysis() {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [viewMode, setViewMode] = useState<'standard' | 'marginal' | 'beneficiaries'>('standard');

  const { data: ownershipData = [] } = useQuery<DebtOwnership[]>({
    queryKey: ['/api/debt-ownership/debtor', selectedCountry],
  });

  // Research-based marginal debt absorption patterns
  const marginalStructure: OwnershipStructure = {
    domesticNonBanks: 39,  // CEPR research: 39% of marginal increase
    foreignNonBanks: 23,   // CEPR research: 23% of marginal increase  
    foreignBanks: 5,       // CEPR research: 5% of marginal increase
    domesticBanks: 33      // Remainder absorbed by domestic banks
  };

  // Beyond corporate veils - ultimate beneficiaries research
  const ultimateBeneficiaries: BeyondCorporateVeils = {
    centralBanks: [
      { entity: "Bank of Japan", holdings: "$1.0T US Treasuries", purpose: "Reserve asset management" },
      { entity: "People's Bank of China", holdings: "$1.1T US Treasuries", purpose: "Currency stabilization" },
      { entity: "European Central Bank", holdings: "$240B cross-border", purpose: "Monetary policy tools" }
    ],
    investmentFunds: [
      { type: "Money Market Funds", beneficiaries: "Institutional & retail investors", percentage: 34 },
      { type: "Pension Funds", beneficiaries: "Retirees & future pensioners", percentage: 28 },
      { type: "Insurance Companies", beneficiaries: "Policyholders", percentage: 22 },
      { type: "Hedge Funds", beneficiaries: "High net worth individuals", percentage: 16 }
    ],
    ultimateBeneficiaries: [
      "Central banks benefiting sovereign governments",
      "Pension fund beneficiaries (retirees and workers)",
      "Insurance policyholders across demographics", 
      "Wealthy individuals through investment vehicles",
      "Institutional investors managing pooled assets"
    ]
  };

  const calculateOwnership = () => {
    const domestic = ownershipData.find(d => d.creditorType === 'domestic');
    const foreign = ownershipData.filter(d => d.creditorType === 'foreign');
    
    return {
      domestic: domestic ? parseFloat(domestic.percentage || '0') : 0,
      foreign: foreign.reduce((sum, d) => sum + parseFloat(d.percentage || '0'), 0),
      foreignHolders: foreign.map(d => ({
        country: d.creditorCountry || 'Unknown',
        amount: `$${(parseFloat(d.amount) / 1e12).toFixed(1)}T`
      }))
    };
  };

  const ownership = calculateOwnership();

  const renderMarginalAnalysis = () => (
    <div className="space-y-4">
      <div className="text-sm text-slate-400 mb-3">
        Based on CEPR research: "Who holds sovereign debt and why it matters"
      </div>
      
      <div className="space-y-3">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Domestic Non-Banks</span>
            <span className="text-emerald-400 font-semibold">{marginalStructure.domesticNonBanks}%</span>
          </div>
          <div className="text-xs text-slate-500">Investment funds, pension funds, insurance companies</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${marginalStructure.domesticNonBanks}%`}}></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Foreign Non-Banks</span>
            <span className="text-blue-400 font-semibold">{marginalStructure.foreignNonBanks}%</span>
          </div>
          <div className="text-xs text-slate-500">Foreign investment funds and institutions</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: `${marginalStructure.foreignNonBanks}%`}}></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Domestic Banks</span>
            <span className="text-yellow-400 font-semibold">{marginalStructure.domesticBanks}%</span>
          </div>
          <div className="text-xs text-slate-500">Domestic banking institutions</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${marginalStructure.domesticBanks}%`}}></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Foreign Banks</span>
            <span className="text-red-400 font-semibold">{marginalStructure.foreignBanks}%</span>
          </div>
          <div className="text-xs text-slate-500">Foreign banking institutions</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div className="bg-red-500 h-2 rounded-full" style={{width: `${marginalStructure.foreignBanks}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBeneficiaryAnalysis = () => (
    <div className="space-y-4">
      <div className="text-sm text-slate-400 mb-3">
        Beyond corporate veils: Ultimate beneficiaries of debt ownership
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Central Bank Holdings</h4>
        <div className="space-y-2">
          {ultimateBeneficiaries.centralBanks.map((bank, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div>
                <div className="text-slate-300">{bank.entity}</div>
                <div className="text-xs text-slate-500">{bank.purpose}</div>
              </div>
              <div className="text-emerald-400 font-semibold">{bank.holdings}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Investment Fund Distribution</h4>
        <div className="space-y-3">
          {ultimateBeneficiaries.investmentFunds.map((fund, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-sm">{fund.type}</span>
                <span className="text-blue-400 font-semibold">{fund.percentage}%</span>
              </div>
              <div className="text-xs text-slate-500 mb-2">{fund.beneficiaries}</div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${fund.percentage}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Ultimate Beneficiaries</h4>
        <div className="space-y-2">
          {ultimateBeneficiaries.ultimateBeneficiaries.map((beneficiary, index) => (
            <div key={index} className="flex items-center text-sm text-slate-300">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              {beneficiary}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Authentic Debt Ownership Analysis</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('standard')}
            className={`px-3 py-1 text-xs rounded ${viewMode === 'standard' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Standard
          </button>
          <button
            onClick={() => setViewMode('marginal')}
            className={`px-3 py-1 text-xs rounded ${viewMode === 'marginal' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Marginal
          </button>
          <button
            onClick={() => setViewMode('beneficiaries')}
            className={`px-3 py-1 text-xs rounded ${viewMode === 'beneficiaries' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Beneficiaries
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Selected Country/Region</span>
          <select 
            className="bg-slate-800 text-white rounded px-3 py-1 text-sm"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option>United States</option>
            <option>European Union</option>
            <option>China</option>
            <option>Japan</option>
            <option>United Kingdom</option>
            <option>India</option>
            <option>Brazil</option>
          </select>
        </div>
        
        {viewMode === 'standard' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Domestic Holdings</span>
                <span className="text-white">{ownership.domestic.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${ownership.domestic}%`}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Foreign Holdings</span>
                <span className="text-white">{ownership.foreign.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: `${ownership.foreign}%`}}></div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Top Foreign Holders</h4>
              <div className="space-y-2">
                {ownership.foreignHolders.slice(0, 4).map((holder, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-slate-300">{holder.country}</span>
                    <span className="text-white">{holder.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'marginal' && renderMarginalAnalysis()}
        {viewMode === 'beneficiaries' && renderBeneficiaryAnalysis()}
      </div>
    </div>
  );
}