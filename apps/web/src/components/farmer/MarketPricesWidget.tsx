import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Mon', Maize: 4000, Beans: 8000 },
  { name: 'Tue', Maize: 4200, Beans: 8100 },
  { name: 'Wed', Maize: 4100, Beans: 8300 },
  { name: 'Thu', Maize: 4300, Beans: 8200 },
  { name: 'Fri', Maize: 4500, Beans: 8500 },
  { name: 'Sat', Maize: 4600, Beans: 8400 },
  { name: 'Sun', Maize: 4800, Beans: 8600 },
];

export const MarketPricesWidget = () => {
  return (
    <Card className="p-6 h-full shadow-lg border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <DollarSign className="text-green-600" /> Market Prices (TZS)
        </h3>
        <select className="text-sm bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Dar es Salaam</option>
          <option>Arusha</option>
          <option>Mwanza</option>
          <option>Dodoma</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-1">Maize (90kg)</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">4,800</span>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.3%
            </span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">Beans (90kg)</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">8,600</span>
            <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded">
              <TrendingDown className="w-3 h-3 mr-1" /> -1.2%
            </span>
          </div>
        </div>
      </div>

      <div className="h-48 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line type="monotone" dataKey="Maize" stroke="#1E6B45" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Beans" stroke="#B9762A" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
