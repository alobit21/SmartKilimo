import React from 'react';
import { useTranslation } from '../lib/i18n';
import { useCrops } from '../features/crops/useCrops';
import { useMarketPrices } from '../features/marketplace/useMarketplace';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#c084fc', '#fb923c'];

export const OfficerMarket = () => {
  const { t } = useTranslation();
  const { data: prices, isLoading } = useMarketPrices();

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Mwenendo wa Soko (Market Trends)</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama bei za mazao sokoni kuwapa wakulima ushauri sahihi.</p>
      </header>
      
      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia mwenendo wa soko...</div>
      ) : !prices || prices.length === 0 ? (
        <div className="bg-surface rounded-xl p-8 text-center text-on-surface-variant border border-dashed border-outline-variant">
          Hakuna taarifa za bei za sokoni kwa sasa.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface border border-outline-variant rounded-xl p-6 h-[350px]">
              <h2 className="text-title-md font-bold mb-4">Wastani wa Bei Sokoni (TZS)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prices} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="cropName" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} TZS`} />
                  <Bar dataKey="avgPrice" name="Wastani" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-6 h-[350px]">
              <h2 className="text-title-md font-bold mb-4">Upatikanaji Sokoni (Wauzaji)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={prices} dataKey="listingCount" nameKey="cropName" cx="50%" cy="50%" outerRadius={100} label>
                    {prices.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((item: any) => (
            <div key={item.cropName} className="bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">local_florist</span>
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">{item.cropName}</h3>
                </div>
                <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant">
                  Wauzaji {item.listingCount}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/50">
                  <p className="text-label-sm text-on-surface-variant mb-1">Bei ya Wastani</p>
                  <p className="text-2xl font-bold text-primary">
                    {Number(item.avgPrice).toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">TZS</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                    <p className="text-label-sm text-on-surface-variant mb-1">Bei ya Chini</p>
                    <p className="font-bold text-on-surface">{Number(item.minPrice).toLocaleString()} TZS</p>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                    <p className="text-label-sm text-on-surface-variant mb-1">Bei ya Juu</p>
                    <p className="font-bold text-on-surface">{Number(item.maxPrice).toLocaleString()} TZS</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export const OfficerCrops = () => {
  const { t } = useTranslation();
  const { data: crops, isLoading } = useCrops();

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Rejea za Mazao (Crop Reference)</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Mwongozo wa kitaalamu kuhusu mahitaji ya mazao mbalimbali.</p>
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops?.map(crop => (
            <div key={crop.id} className="bg-surface border border-outline-variant rounded-xl p-6 hover:border-primary transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">psychiatry</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">{crop.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
                  <span className="text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">thermostat</span> Joto (Temp)</span>
                  <span className="font-bold text-sm">{crop.temperatureRangeMin}°C - {crop.temperatureRangeMax}°C</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
                  <span className="text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">water_drop</span> Mvua (Rain)</span>
                  <span className="font-bold text-sm">{crop.rainfallRequirementMin} - {crop.rainfallRequirementMax} mm</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">science</span> pH ya Udongo</span>
                  <span className="font-bold text-sm">{crop.soilPhMin} - {crop.soilPhMax}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
