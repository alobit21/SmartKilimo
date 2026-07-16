import React, { useEffect } from 'react';
import { useLatestWeather, useFetchWeather } from '../../features/weather/useWeather';
import { useFarms } from '../../features/farms/useFarms';

export const WeatherWidget = () => {
  const { data: farms, isLoading: farmsLoading } = useFarms();
  const farmId = farms?.[0]?.id;

  const { data: weather, isLoading: weatherLoading, error: weatherError } = useLatestWeather(farmId);
  const fetchWeatherMutation = useFetchWeather();

  useEffect(() => {
    // If no weather exists for this farm yet (404), fetch it automatically once!
    if (farmId && weatherError && (weatherError as any).response?.status === 404 && !fetchWeatherMutation.isPending) {
      fetchWeatherMutation.mutate(farmId);
    }
  }, [farmId, weatherError]);

  const isLoading = farmsLoading || weatherLoading || fetchWeatherMutation.isPending;

  return (
    <div className="md:col-span-4 bg-sky-set rounded-xl p-6 soft-lift flex flex-col justify-between min-h-[220px]">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
            {farms?.[0]?.name ? `Hali ya Hewa: ${farms[0].name}` : 'Hali ya Hewa'}
          </p>
          {isLoading ? (
            <h3 className="font-display-lg text-display-lg font-bold mt-1 text-on-surface/50 text-2xl">Inapakia...</h3>
          ) : (
            <>
              <h3 className="font-display-lg text-display-lg font-bold mt-1">
                {weather ? `${Math.round(weather.temperature)}°C` : '--°C'}
              </h3>
              <p className="font-body-md text-body-md">
                {weather?.rainfall > 0 ? `Mvua: ${weather.rainfall}mm` : 'Hakuna Mvua'}
              </p>
            </>
          )}
        </div>
        <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          {weather?.rainfall > 0 ? 'rainy' : 'cloudy_filled'}
        </span>
      </div>
      
      {!isLoading && weather && (
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Unyevu</p>
            <p className="font-title-md">{Math.round(weather.humidity)}%</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Upepo</p>
            <p className="font-title-md">{Math.round(weather.windSpeed)}m/s</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Mvua</p>
            <p className="font-title-md">{weather.rainfall}mm</p>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => farmId && fetchWeatherMutation.mutate(farmId)}
        disabled={fetchWeatherMutation.isPending || !farmId}
        className="mt-4 text-xs bg-white/20 hover:bg-white/30 transition-colors py-1 px-3 rounded-full self-start disabled:opacity-50"
      >
        {fetchWeatherMutation.isPending ? 'Inasasisha...' : 'Sasisha Sasa'}
      </button>
    </div>
  );
};
