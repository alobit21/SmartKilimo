import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { Role } from '@kilimosmart/shared-types';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, token } = useAuthStore();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their specific dashboard if they try to access another role's route
    switch (user.role) {
      case Role.FARMER: return <Navigate to="/farmer" replace />;
      case Role.BUYER: return <Navigate to="/buyer" replace />;
      case Role.OFFICER: return <Navigate to="/officer" replace />;
      case Role.ADMIN: return <Navigate to="/admin" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};
