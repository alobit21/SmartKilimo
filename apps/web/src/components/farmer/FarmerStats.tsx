import React from 'react';
import { Card } from '../ui/Card';
import { Activity, Tractor, Wallet, ShieldCheck } from 'lucide-react';

export const FarmerStats = () => {
  const stats = [
    {
      title: "Total Farm Size",
      value: "12.5",
      unit: "Acres",
      icon: <Tractor className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+2.5 this year"
    },
    {
      title: "Active Crops",
      value: "4",
      unit: "Types",
      icon: <Activity className="text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      trend: "Optimal health"
    },
    {
      title: "Expected Revenue",
      value: "3.2M",
      unit: "TZS",
      icon: <Wallet className="text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      trend: "+15% vs last season"
    },
    {
      title: "Advisory Status",
      value: "Good",
      unit: "Standing",
      icon: <ShieldCheck className="text-indigo-500" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      trend: "0 pending issues"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, i) => (
        <Card key={i} className="p-5 border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                {stat.value} <span className="text-sm font-semibold text-slate-400">{stat.unit}</span>
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-500 relative z-10">{stat.trend}</p>
          
          <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${stat.bg} opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out pointer-events-none`}></div>
        </Card>
      ))}
    </div>
  );
};
