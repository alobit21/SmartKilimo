import React from 'react';
import { Card } from '../components/ui/Card';

import { FarmerStats } from '../components/farmer/FarmerStats';
import { WeatherWidget } from '../components/farmer/WeatherWidget';
import { MarketPricesWidget } from '../components/farmer/MarketPricesWidget';
import { CropRecommendationsWidget } from '../components/farmer/CropRecommendationsWidget';

export const FarmerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Weather Snapshot Card (Spans 4 columns) */}
      <div className="md:col-span-4 bg-sky-set rounded-xl p-6 soft-lift flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">Hali ya Hewa</p>
            <h3 className="font-display-lg text-display-lg font-bold mt-1">28°C</h3>
            <p className="font-body-md text-body-md">Mvua za hapa na pale</p>
          </div>
          <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cloudy_filled</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Unyevu</p>
            <p className="font-title-md">65%</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Upepo</p>
            <p className="font-title-md">12km/s</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">UV</p>
            <p className="font-title-md">7.2</p>
          </div>
        </div>
      </div>

      {/* Crop Recommendation Card (Spans 8 columns) */}
      <div className="md:col-span-8 bg-sprout-tint rounded-xl p-6 soft-lift flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-[160px]">eco</span>
        </div>
        <div className="w-full md:w-1/3 h-40 rounded-lg overflow-hidden flex-shrink-0 z-10">
          <img 
            className="w-full h-full object-cover" 
            alt="Close up of a vibrant, healthy maize cob" 
            src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80"
          />
        </div>
        <div className="flex-1 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-container text-white px-3 py-1 rounded-full font-label-sm text-label-sm">Pendekezo Jipya</span>
            <span className="text-on-secondary-container font-label-lg text-label-lg">Mahindi - Soko Kubwa</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Panda Mahindi msimu huu</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Takwimu zinaonyesha uhitaji mkubwa wa mahindi mwezi Agosti katika soko la Dodoma. Inashauriwa kupanda mbegu za aina ya SC419.</p>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-lg text-label-lg flex items-center gap-2 hover:opacity-90 transition-all min-h-[48px]">
            Soma Maelezo Zaidi
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* My Farms (List View) - Spans 7 columns */}
      <div className="md:col-span-7 bg-surface rounded-xl hairline-border p-6 soft-lift">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-title-md text-title-md text-on-surface">Mashamba Yangu</h3>
          <button className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80">
            <span className="material-symbols-outlined">add</span>
            Ongeza
          </button>
        </div>
        <div className="space-y-4">
          {/* Shamba 1 */}
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">agriculture</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Shamba la Morogoro Kusini</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Hekta 4.5 • Mahindi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hatua ya zao</p>
                <p className="font-label-lg text-label-lg text-secondary">Kuchipua</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
          
          {/* Shamba 2 */}
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">agriculture</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Shamba la Mvomero</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Hekta 2.0 • Alizeti</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hatua ya zao</p>
                <p className="font-label-lg text-label-lg text-secondary">Matayarisho</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory & Marketplace Stats - Spans 5 columns */}
      <div className="md:col-span-5 space-y-6">
        {/* Open Advisory Requests */}
        <div className="bg-surface rounded-xl hairline-border p-6 soft-lift">
          <h3 className="font-title-md text-title-md text-on-surface mb-6">Ushauri wa Kitaalamu</h3>
          <div className="space-y-4">
            <div className="border-b border-outline-variant pb-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-label-lg text-label-lg text-on-surface">Ugonjwa wa Majani - Mahindi</p>
                <span className="bg-amber-ochre/10 text-amber-ochre px-2 py-0.5 rounded font-label-sm text-label-sm">PENDING</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">Nimeona madoa ya kijivu kwenye majani...</p>
              <p className="font-label-sm text-label-sm text-outline mt-2">Masaa 2 yaliyopita</p>
            </div>
            <div className="pb-2">
              <div className="flex justify-between items-start mb-1">
                <p className="font-label-lg text-label-lg text-on-surface">Mbolea ya Alizeti</p>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-sm text-label-sm">SOLVED</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">Unashauri nitumie mbolea gani kabla ya kupanda...</p>
              <p className="font-label-sm text-label-sm text-outline mt-2">Siku 3 zilizopita</p>
            </div>
          </div>
          <button className="w-full mt-6 border border-primary text-primary py-2 rounded-lg font-label-lg text-label-lg hover:bg-primary-container/10 transition-all min-h-[48px]">
            Omba Ushauri Mpya
          </button>
        </div>

        {/* Marketplace Listing Count */}
        <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 soft-lift flex items-center justify-between">
          <div>
            <p className="font-label-lg text-label-lg opacity-80">Matangazo ya Soko</p>
            <h4 className="font-display-md text-display-md font-bold mt-1">12 Active</h4>
            <p className="font-body-md text-body-md opacity-70 mt-1">Bidhaa zako sokoni kwa sasa</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">trending_up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BuyerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Buyer Dashboard</h2>
      <Card>
        <p>Marketplace overview and active deals.</p>
      </Card>
    </div>
  );
};

export const OfficerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Officer Dashboard</h2>
      <Card>
        <p>Advisory queue and farm problem reports.</p>
      </Card>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <Card>
        <p>System overview and user management.</p>
      </Card>
    </div>
  );
};
