import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';

export const RoleShell: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[var(--color-primary)] text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">KilimoSmart ({user?.role})</h1>
        <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-[var(--radius-button)] transition-colors">
          Logout
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <nav className="p-4 space-y-2">
            <div className="font-semibold text-gray-500 text-sm mb-4">NAVIGATION</div>
            <Link to={`/${user?.role.toLowerCase()}`} className="block p-2 rounded-[var(--radius-button)] hover:bg-gray-100 font-medium text-[var(--color-primary)]">
              Dashboard
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
