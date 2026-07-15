import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { RoleShell } from './components/layout/RoleShell';
import { BuyerShell } from './components/layout/BuyerShell';
import { Role } from '@kilimosmart/shared-types';
import { FarmerDashboard, BuyerDashboard, OfficerDashboard, AdminDashboard, CropRecommendations } from './pages/Dashboards';
import { FarmerCrops, FarmerMarket, FarmerContracts } from './pages/FarmerPages';

import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Farmer Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.FARMER]} />}>
        <Route element={<RoleShell />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/recommendations" element={<CropRecommendations />} />
          <Route path="/farmer/crops" element={<FarmerCrops />} />
          <Route path="/farmer/market" element={<FarmerMarket />} />
          <Route path="/farmer/contracts" element={<FarmerContracts />} />
        </Route>
      </Route>

      {/* Buyer Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.BUYER]} />}>
        <Route element={<BuyerShell />}>
          <Route path="/buyer" element={<BuyerDashboard />} />
        </Route>
      </Route>

      {/* Officer Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.OFFICER]} />}>
        <Route element={<RoleShell />}>
          <Route path="/officer" element={<OfficerDashboard />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN]} />}>
        <Route element={<RoleShell />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
