import { useWebSocket } from '@/hooks/useWebSocket';
import { formatDistanceToNow } from 'date-fns';

export default function RealTimeTracker() {
  const { isConnected, updates } = useWebSocket();

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'fas fa-arrow-up text-emerald-400';
      case 'negative':
        return 'fas fa-arrow-down text-red-400';
      default:
        return 'fas fa-minus text-slate-400';
    }
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-4">Real-time Tracker</h3>
      <div className="space-y-4">
        <div className={`flex items-center justify-between p-3 border rounded-lg ${
          isConnected 
            ? 'bg-emerald-900/30 border-emerald-600' 
            : 'bg-red-900/30 border-red-600'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isConnected 
                ? 'bg-emerald-400 animate-pulse' 
                : 'bg-red-400'
            }`}></div>
            <span className={`text-sm ${
              isConnected ? 'text-emerald-300' : 'text-red-300'
            }`}>
              {isConnected ? 'API Connected' : 'API Disconnected'}
            </span>
          </div>
          <span className={`text-xs ${
            isConnected ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {isConnected ? '99.9% uptime' : 'Reconnecting...'}
          </span>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
          {updates.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-4">
              Waiting for real-time updates...
            </div>
          ) : (
            updates.map((update, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className={getImpactIcon(update.impact)}></i>
                  <div>
                    <div className="text-white text-sm font-medium">{update.country}</div>
                    <div className="text-slate-400 text-xs">{update.description}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-xs">
                  {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
                </div>
              </div>
            ))
          )}
        </div>
        
        <button className="w-full bg-slate-700 text-white rounded-lg py-2 text-sm hover:bg-slate-600 transition-colors">
          <i className="fas fa-history mr-2"></i>View Full History
        </button>
      </div>
    </div>
  );
}
