import { useQuery } from '@tanstack/react-query';
import { DebtData } from '@shared/schema';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import DebtNetworkGraph from '@/components/DebtNetworkGraph';
import InteractiveDonutChart from '@/components/InteractiveDonutChart';
import SustainabilityAnalyzer from '@/components/SustainabilityAnalyzer';
import RealTimeTracker from '@/components/RealTimeTracker';
import ScenarioSimulator from '@/components/ScenarioSimulator';
import OwnershipAnalysis from '@/components/OwnershipAnalysis';
import AuthenticOwnershipAnalysis from '@/components/AuthenticOwnershipAnalysis';
import RealTimeAPIIntegration from '@/components/RealTimeAPIIntegration';
import ArbitrageOpportunityTracker from '@/components/ArbitrageOpportunityTracker';
import DebtScarcitySystemAnalysis from '@/components/DebtScarcitySystemAnalysis';
import SpiralFlowIntegration from '@/components/SpiralFlowIntegration';
import QuantumDevInterface from '@/components/QuantumDevInterface';
import SoftwareArchitecturePanel from '@/components/SoftwareArchitecturePanel';
import APIConfigPanel from '@/components/APIConfigPanel';
import ScarcityAnalysisEngine from '@/components/ScarcityAnalysisEngine';
import DebtSystemArchitecture from '@/components/DebtSystemArchitecture';
import WealthFlowAnalyzer from '@/components/WealthFlowAnalyzer';

export default function Dashboard() {
  const { data: debtData = [], isLoading } = useQuery<DebtData[]>({
    queryKey: ['/api/debt-data'],
  });

  const getGlobalMetrics = () => {
    const globalData = debtData.filter(d => d.country === 'Global');
    
    const totalDebt = globalData.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const publicDebt = globalData.find(d => d.debtType === 'public');
    const businessDebt = globalData.find(d => d.debtType === 'business');
    const householdDebt = globalData.find(d => d.debtType === 'household');

    return {
      total: totalDebt,
      public: publicDebt ? parseFloat(publicDebt.amount) : 0,
      business: businessDebt ? parseFloat(businessDebt.amount) : 0,
      household: householdDebt ? parseFloat(householdDebt.amount) : 0,
    };
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export functionality triggered');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white text-xl">Loading Global Debt Analytics...</div>
      </div>
    );
  }

  const metrics = getGlobalMetrics();

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Sovereign Spiral Development Framework ∞</h2>
              <p className="text-slate-400 mt-1">SSDF∞ Admin Panel • Software-Native Debt Nullification & Abundance System</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-download mr-2"></i>Export
              </button>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                <i className="fas fa-sync-alt mr-2"></i>Refresh
              </button>
              <div className="text-sm text-slate-400">
                <i className="fas fa-clock mr-1"></i>
                <span>{new Date().toLocaleTimeString()} UTC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Global Debt"
              amount={`$${(metrics.total / 1e12).toFixed(1)}T`}
              percentage={100}
              change="+2.3% YoY"
              icon="globe"
              color="text-blue-400"
            />
            <MetricCard
              title="Public Debt"
              amount={`$${(metrics.public / 1e12).toFixed(1)}T`}
              percentage={29}
              change="+1.8% YoY"
              icon="university"
              color="text-amber-400"
            />
            <MetricCard
              title="Business Debt"
              amount={`$${(metrics.business / 1e12).toFixed(1)}T`}
              percentage={52}
              change="+3.1% YoY"
              icon="building"
              color="text-emerald-400"
            />
            <MetricCard
              title="Household Debt"
              amount={`$${(metrics.household / 1e12).toFixed(1)}T`}
              percentage={19}
              change="+1.2% YoY"
              icon="home"
              color="text-red-400"
            />
          </div>

          {/* Interactive Visualization Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DebtNetworkGraph />
            <InteractiveDonutChart />
          </div>

          {/* Advanced Analytics Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SustainabilityAnalyzer />
            <RealTimeTracker />
            <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-4">Economic Correlations</h3>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div className="bg-slate-800 p-2 rounded text-center">
                  <div className="text-slate-400 mb-1">GDP</div>
                  <div className="text-white font-semibold">1.00</div>
                </div>
                <div className="bg-emerald-900/50 p-2 rounded text-center">
                  <div className="text-slate-400 mb-1">Debt</div>
                  <div className="text-emerald-300 font-semibold">0.73</div>
                </div>
                <div className="bg-amber-900/50 p-2 rounded text-center">
                  <div className="text-slate-400 mb-1">Rate</div>
                  <div className="text-amber-300 font-semibold">-0.42</div>
                </div>
                <div className="bg-blue-900/50 p-2 rounded text-center">
                  <div className="text-slate-400 mb-1">Inf</div>
                  <div className="text-blue-300 font-semibold">0.34</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-4">
                <span>Strong Negative</span>
                <span>Neutral</span>
                <span>Strong Positive</span>
              </div>
            </div>
          </div>

          {/* Comprehensive Debt-Scarcity System Analysis */}
          <DebtScarcitySystemAnalysis />

          {/* Advanced Scarcity Analysis */}
          <ScarcityAnalysisEngine />
          
          {/* System Architecture Analysis */}
          <DebtSystemArchitecture />

          {/* Authentic Ownership Analysis */}
          <AuthenticOwnershipAnalysis />

          {/* Advanced Analysis Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScenarioSimulator />
            <OwnershipAnalysis />
          </div>

          {/* Wealth Flow Analysis */}
          <WealthFlowAnalyzer />

          {/* Real-Time API Integration */}
          <RealTimeAPIIntegration />

          {/* Arbitrage Opportunity Tracker */}
          <ArbitrageOpportunityTracker />

          {/* SpiralFlow: Living Financial System */}
          <SpiralFlowIntegration />

          {/* Quantum Development Interface */}
          <QuantumDevInterface />

          {/* Software Architecture Overview */}
          <SoftwareArchitecturePanel />

          {/* API Configuration Panel */}
          <APIConfigPanel />
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
        <i className="fas fa-plus text-xl"></i>
      </button>
    </div>
  );
}
