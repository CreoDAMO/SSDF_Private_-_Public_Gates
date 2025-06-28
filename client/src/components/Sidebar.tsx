import { Link, useLocation } from "wouter";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  { path: "/", label: "Overview", icon: "chart-line" }
];

export default function Sidebar({ className = "" }: SidebarProps) {
  const [location] = useLocation();
  const [lastUpdate] = useState(new Date());

  return (
    <aside className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col ${className}`}>
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-gradient-blue-emerald">
          Global Debt Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">Advanced Economic Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              location === item.path 
                ? "bg-blue-600 text-white" 
                : "hover:bg-slate-800 text-slate-300"
            }`}>
              <i className={`fas fa-${item.icon}`}></i>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live Data</span>
          </div>
          <div className="text-xs text-slate-400">
            Last update: {Math.floor((Date.now() - lastUpdate.getTime()) / 60000)} min ago
          </div>
        </div>
      </div>
    </aside>
  );
}
