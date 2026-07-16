import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useMarketPrices } from '../../features/marketplace/useMarketplace';

export const MarketPricesWidget = () => {
  const { data: prices, isLoading } = useMarketPrices();

  return (
    <Card className="p-6 h-full shadow-lg border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <DollarSign className="text-green-600" /> Bei za Soko (Soko Mkuu)
        </h3>
        <select className="text-sm bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Tanzania Zote</option>
          <option>Dodoma</option>
          <option>Morogoro</option>
          <option>Arusha</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-slate-500">Inapakia bei...</div>
      ) : !prices || prices.length === 0 ? (
        <div className="text-center py-8 text-slate-500">Hakuna takwimu za soko kwa sasa.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {prices.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between hover:bg-slate-100 transition-colors">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">{item.cropName} (kwa {item.unit})</p>
              <div className="flex items-center justify-between gap-2 mt-2">
                <span className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{item.averagePrice.toLocaleString()}/=</span>
                {item.trend === 'up' ? (
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3 mr-1" />
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded">
                    <TrendingDown className="w-3 h-3 mr-1" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
