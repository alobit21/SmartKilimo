import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { RoleShell } from './components/layout/RoleShell';
import { Role } from '@kilimosmart/shared-types';

import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard, BuyerDashboard, OfficerDashboard, AdminDashboard } from './pages/Dashboards';

// Placeholder for Login
const Login = () => <div className="p-8">Login Page (To be implemented)</div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<div className="p-8">Register Page</div>} />

      {/* Farmer Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.FARMER]} />}>
        <Route element={<RoleShell />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
        </Route>
      </Route>

      {/* Buyer Routes */}
      <Route element={<ProtectedRoute allowedRoles={[Role.BUYER]} />}>
        <Route element={<RoleShell />}>
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
