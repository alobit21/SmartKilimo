import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';

export const RoleShell: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentTime(now.toLocaleDateString('sw-TZ', options));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mocking links based on role - specific to Farmer for now
  const isFarmer = user?.role === 'FARMER' || true; // Force true for demo purposes to match design

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      {/* SideNavBar */}
      <aside className="hidden md:flex h-full w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex-col py-6 px-4 z-50">
        <div className="mb-8 px-4">
          <h1 className="font-headline-sm text-headline-sm text-primary mb-1">Mkulima Bora</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">Morogoro, Tanzania</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {/* Active: Dashboard */}
          <Link to={`/${user?.role?.toLowerCase() || 'farmer'}`} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('dashboard') || location.pathname === '/farmer' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('dashboard') || location.pathname === '/farmer' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            <span className="font-title-md text-title-md">Dashboard</span>
          </Link>
          <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all scale-95 active:scale-90" href="#">
            <span className="material-symbols-outlined">agriculture</span>
            <span className="font-title-md text-title-md">Mazao</span>
          </a>
          <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all scale-95 active:scale-90" href="#">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-title-md text-title-md">Soko</span>
          </a>
          <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all scale-95 active:scale-90" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="font-title-md text-title-md">Wataalamu</span>
          </a>
          <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all scale-95 active:scale-90" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="font-title-md text-title-md">Mkataba</span>
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant">
          <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-lg text-label-lg mb-6 hover:opacity-90 transition-opacity">
            Tuma Ripoti
          </button>
          <div className="space-y-1">
            <a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-xl transition-all text-label-lg" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Mipangilio</span>
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-error-container hover:text-error rounded-xl transition-all text-label-lg">
              <span className="material-symbols-outlined">logout</span>
              <span>Ondoka</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
        {/* Top Navigation Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="md:hidden">
            <button className="p-2 text-on-surface">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          <div>
            <h2 className="font-display-md text-display-md font-bold text-primary">Hujambo, {user?.name?.split(' ')[0] || 'Joseph'}!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Leo ni tarehe {currentTime} • Morogoro</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile" 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Views Rendered Here */}
        <Outlet />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body-md text-body-md text-on-surface-variant opacity-80">© 2024 KilimoBora Tanzania. Haki zote zimehifadhiwa.</p>
            <div className="flex items-center gap-6">
              <a className="font-label-sm text-label-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors hover:underline underline-offset-4" href="#">Faragha</a>
              <a className="font-label-sm text-label-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors hover:underline underline-offset-4" href="#">Sheria</a>
              <a className="font-label-sm text-label-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors hover:underline underline-offset-4" href="#">Wasiliana</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Bar (Fixed Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-4 flex justify-around items-center z-50">
        <a className="flex flex-col items-center text-primary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-xs font-label-sm mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">agriculture</span>
          <span className="text-xs font-label-sm mt-1">Farms</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-xs font-label-sm mt-1">Market</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-xs font-label-sm mt-1">Profile</span>
        </a>
      </nav>

      {/* Interactive FAB for mobile only */}
      <button className="md:hidden fixed right-4 bottom-24 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 active:scale-90 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};
