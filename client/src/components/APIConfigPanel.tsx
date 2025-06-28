import { useQuery } from '@tanstack/react-query';
import { ApiSource } from '@shared/schema';

export default function APIConfigPanel() {
  const { data: apiSources = [] } = useQuery<ApiSource[]>({
    queryKey: ['/api/sources'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-400';
      case 'inactive':
        return 'bg-slate-400';
      case 'error':
        return 'bg-red-400';
      default:
        return 'bg-amber-400';
    }
  };

  const totalRequests = apiSources.reduce((sum, source) => sum + (source.requestsToday || 0), 0);

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-4">API Data Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {apiSources.map((source) => (
          <div key={source.id} className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{source.name}</h4>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`}></div>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Endpoint: {source.endpoint}</div>
              <div>Rate: {source.rateLimit} req/hour</div>
              <div>Last sync: {
                source.lastSync 
                  ? new Date(source.lastSync).toLocaleTimeString()
                  : 'Never'
              }</div>
              <div>Today: {source.requestsToday || 0} requests</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div className="text-sm text-slate-400">
          Total API calls today: <span className="text-white">{totalRequests.toLocaleString()}</span>
        </div>
        <button className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors">
          Configure APIs
        </button>
      </div>
    </div>
  );
}
