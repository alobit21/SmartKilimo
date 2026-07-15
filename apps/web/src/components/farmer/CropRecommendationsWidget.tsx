import React from 'react';
import { Card } from '../ui/Card';
import { Leaf, ChevronRight, Sprout, AlertCircle } from 'lucide-react';

export const CropRecommendationsWidget = () => {
  return (
    <Card className="p-6 shadow-lg border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sprout className="text-primary" /> AI Crop Recommendations
        </h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center group">
          View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Recommendation Item */}
        <div className="group relative p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-gradient-to-r hover:from-green-50 hover:to-white dark:hover:from-green-900/10 dark:hover:to-slate-800 transition-all cursor-pointer overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Sorghum (Macci)</h4>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900/50 dark:text-green-400">98% Match</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                Ideal for upcoming dry season. Expected yield is high based on your soil pH.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <Leaf className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Alert Item */}
        <div className="group relative p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-500">Apply Fertilizer</h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold dark:bg-amber-800 dark:text-amber-200">Due Today</span>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-600/80 max-w-sm">
                Farm Block A (Maize) requires NPK top-dressing for optimal growth phase.
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
