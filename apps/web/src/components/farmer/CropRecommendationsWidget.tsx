import React from 'react';
import { Card } from '../ui/Card';
import { Leaf, ChevronRight, Sprout, AlertCircle, Loader2 } from 'lucide-react';
import { useFarms } from '../../features/farms/useFarms';
import { useRecommendations, useGenerateRecommendations } from '../../features/recommendations/useRecommendations';

export const CropRecommendationsWidget = () => {
  const { data: farms } = useFarms();
  const selectedFarm = farms?.[0];
  
  const { data: recommendations, isLoading } = useRecommendations(selectedFarm?.id);
  const generateMutation = useGenerateRecommendations();

  const handleGenerate = () => {
    if (selectedFarm) {
      generateMutation.mutate(selectedFarm.id);
    }
  };

  return (
    <Card className="p-6 shadow-lg border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sprout className="text-primary" /> AI Crop Recommendations
        </h3>
        <button 
          onClick={handleGenerate}
          disabled={generateMutation.isPending || !selectedFarm}
          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center group disabled:opacity-50"
        >
          {generateMutation.isPending ? 'Kuchambua...' : 'Tathmini Sasa'}
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Inachambua udongo na hali ya hewa...</p>
          </div>
        ) : !recommendations || recommendations.length === 0 ? (
          <div className="text-center p-6 text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            Bofya "Tathmini Sasa" kupata mapendekezo ya mazao kwa kitalu chako kulingana na hali ya hewa (FAO Data).
          </div>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.id} className={`group relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
              rec.suitable 
                ? 'border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10 hover:shadow-md' 
                : 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10'
            }`}>
              <div className={`absolute top-0 left-0 w-1 h-full transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform ${rec.suitable ? 'bg-primary' : 'bg-amber-500'}`}></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
                      {rec.crop?.name} {rec.suitable ? '- Inafaa' : '- Hatari'}
                    </h4>
                  </div>
                  <p className={`text-sm max-w-[384px] ${rec.suitable ? 'text-slate-600 dark:text-slate-400' : 'text-amber-700/80 dark:text-amber-600/80'}`}>
                    {rec.suitable 
                      ? `Inafaa sana: Maji (${rec.weatherSnapshotJson.rainfall.toFixed(1)}mm) na Joto (${rec.weatherSnapshotJson.temperature.toFixed(1)}°C) viko sawa kulingana na FAO.`
                      : `Haishauriwi: Hali ya hewa haikidhi mahitaji ya zao hili. (Joto: ${rec.weatherSnapshotJson.temperature.toFixed(1)}°C)`}
                  </p>
                </div>
                
                <div className={`p-2 rounded-lg ${rec.suitable ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600'}`}>
                  {rec.suitable ? <Leaf className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
