import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DebtData } from '@shared/schema';

export default function InteractiveDonutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedView, setSelectedView] = useState('Global View');
  
  const { data: debtData = [] } = useQuery<DebtData[]>({
    queryKey: ['/api/debt-data'],
  });

  const calculateTotals = () => {
    const globalData = debtData.filter(d => d.country === 'Global');
    const business = globalData.find(d => d.debtType === 'business')?.amount || '0';
    const publicDebt = globalData.find(d => d.debtType === 'public')?.amount || '0';
    const household = globalData.find(d => d.debtType === 'household')?.amount || '0';
    const financial = globalData.find(d => d.debtType === 'financial')?.amount || '0';

    return [
      { label: 'Business Debt', value: parseFloat(business), color: '#10B981', percentage: 52 },
      { label: 'Public Debt', value: parseFloat(publicDebt), color: '#F59E0B', percentage: 29 },
      { label: 'Household Debt', value: parseFloat(household), color: '#EF4444', percentage: 19 },
      { label: 'Financial Debt', value: parseFloat(financial), color: '#3B82F6', percentage: 22 }
    ];
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = calculateTotals();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const innerRadius = 60;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentAngle = -Math.PI / 2; // Start from top

    data.forEach((segment, index) => {
      const sliceAngle = (segment.percentage / 100) * 2 * Math.PI;
      
      // Draw outer arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      // Add hover effect (simplified for static implementation)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

  }, [debtData, selectedView]);

  const totals = calculateTotals();
  const totalDebt = totals.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Debt Composition</h3>
        <select 
          className="bg-slate-700 text-white rounded px-3 py-1 text-sm"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          <option>Global View</option>
          <option>By Region</option>
          <option>By Sector</option>
        </select>
      </div>
      <div className="relative h-80">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={320}
          className="w-full h-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-2xl font-bold text-white">
            ${(totalDebt / 1e12).toFixed(0)}T
          </div>
          <div className="text-sm text-slate-400">Total Debt</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        {totals.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-slate-300">
              {item.label.replace(' Debt', '')}: {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
