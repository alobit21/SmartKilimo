import React from 'react';
import { Card } from '../components/ui/Card';

import { FarmerStats } from '../components/farmer/FarmerStats';
import { WeatherWidget } from '../components/farmer/WeatherWidget';
import { MarketPricesWidget } from '../components/farmer/MarketPricesWidget';
import { CropRecommendationsWidget } from '../components/farmer/CropRecommendationsWidget';

export const FarmerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Farmer Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back. Here is your farm's performance.</p>
        </div>
      </div>
      
      <FarmerStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketPricesWidget />
        </div>
        <div className="space-y-6">
          <WeatherWidget />
          <CropRecommendationsWidget />
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
