interface MetricCardProps {
  title: string;
  amount: string;
  percentage: number;
  change: string;
  icon: string;
  color: string;
}

export default function MetricCard({ 
  title, 
  amount, 
  percentage, 
  change, 
  icon, 
  color 
}: MetricCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-300 text-sm font-medium">{title}</h3>
        <i className={`fas fa-${icon} ${color}`}></i>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-white">{amount}</div>
        <div className={`text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
