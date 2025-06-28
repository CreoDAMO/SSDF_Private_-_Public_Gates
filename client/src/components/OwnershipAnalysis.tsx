import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DebtOwnership } from '@shared/schema';

export default function OwnershipAnalysis() {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const { data: ownershipData = [] } = useQuery<DebtOwnership[]>({
    queryKey: ['/api/debt-ownership/debtor', selectedCountry],
  });

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

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-4">Debt Ownership Distribution</h3>
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
          </select>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Domestic Holdings</span>
              <span className="text-white">{ownership.domestic.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="bg-blue-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${ownership.domestic}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Foreign Holdings</span>
              <span className="text-white">{ownership.foreign.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="bg-emerald-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${ownership.foreign}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-300 mb-3">Top Foreign Holders</div>
          <div className="space-y-2">
            {ownership.foreignHolders.length > 0 ? (
              ownership.foreignHolders.map((holder, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-slate-400">{holder.country}</span>
                  <span className="text-white">{holder.amount}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-sm text-center py-2">
                No foreign ownership data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
