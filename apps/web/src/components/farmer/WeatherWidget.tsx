import React from 'react';
import { Card } from '../ui/Card';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export const WeatherWidget = () => {
  // In a real app, this would fetch from OpenWeatherMap API using the useQuery hook
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-slate-900 border-none shadow-md overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sun size={120} />
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <CloudRain className="w-5 h-5" /> Today's Forecast
        </h3>
        
        <div className="flex items-end gap-4 mb-6">
          <span className="text-5xl font-bold text-blue-900 dark:text-white">24°</span>
          <span className="text-lg text-blue-700 dark:text-blue-200 mb-1">Partly Cloudy</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
            <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">65%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
            <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Wind</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">12 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
