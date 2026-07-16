import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useTranslation } from '../../lib/i18n';

export const RoleShell: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { t, language, toggleLanguage } = useTranslation();
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

  // Mocking links based on role
  const role = user?.role || 'FARMER';

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
          <Link to={`/${role.toLowerCase()}`} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('dashboard') || location.pathname === `/${role.toLowerCase()}` ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('dashboard') || location.pathname === `/${role.toLowerCase()}` ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            <span className="font-title-md text-title-md">{t('nav.dashboard')}</span>
          </Link>
          
          {role === 'FARMER' && (
            <>
              <Link 
                to="/farmer/crops" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('crops') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('crops') ? "'FILL' 1" : "'FILL' 0" }}>agriculture</span>
                <span className="font-title-md text-title-md">{t('nav.crops')}</span>
              </Link>
              <Link 
                to="/farmer/market" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('market') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('market') ? "'FILL' 1" : "'FILL' 0" }}>storefront</span>
                <span className="font-title-md text-title-md">{t('nav.market')}</span>
              </Link>
              <Link 
                to="/farmer/advisory" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('advisory') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('advisory') ? "'FILL' 1" : "'FILL' 0" }}>support_agent</span>
                <span className="font-title-md text-title-md">{t('nav.advisory')}</span>
              </Link>
              <Link 
                to="/farmer/contracts" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('contracts') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('contracts') ? "'FILL' 1" : "'FILL' 0" }}>description</span>
                <span className="font-title-md text-title-md">Mkataba</span>
              </Link>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <Link 
                to="/admin/users" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('/admin/users') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/admin/users') ? "'FILL' 1" : "'FILL' 0" }}>group</span>
                <span className="font-title-md text-title-md">Watumiaji (Users)</span>
              </Link>
              <Link 
                to="/admin/crops" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('/admin/crops') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/admin/crops') ? "'FILL' 1" : "'FILL' 0" }}>psychiatry</span>
                <span className="font-title-md text-title-md">Kanzi ya Mazao</span>
              </Link>
              <Link 
                to="/admin/market" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('/admin/market') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/admin/market') ? "'FILL' 1" : "'FILL' 0" }}>monitoring</span>
                <span className="font-title-md text-title-md">Soko (Market)</span>
              </Link>
            </>
          )}

          {role === 'OFFICER' && (
            <>
              <Link 
                to="/officer/market" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('/officer/market') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/officer/market') ? "'FILL' 1" : "'FILL' 0" }}>trending_up</span>
                <span className="font-title-md text-title-md">Mwenendo wa Soko</span>
              </Link>
              <Link 
                to="/officer/crops" 
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all scale-95 active:scale-90 ${location.pathname.includes('/officer/crops') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/officer/crops') ? "'FILL' 1" : "'FILL' 0" }}>local_library</span>
                <span className="font-title-md text-title-md">Rejea za Mazao</span>
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant">
          <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-lg text-label-lg mb-6 hover:opacity-90 transition-opacity">
            Tuma Ripoti
          </button>
          <div className="space-y-1">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-error-container hover:text-error rounded-xl transition-all text-label-lg">
              <span className="material-symbols-outlined">logout</span>
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <div className="flex-1 md:ml-64 min-h-screen">
        <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full pb-24 md:pb-8">
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
              <button onClick={toggleLanguage} className="bg-surface-container hover:bg-surface-container-high transition-colors px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">translate</span>
                {language === 'sw' ? 'EN' : 'SW'}
              </button>
              <button className="relative p-2 rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A professional headshot of a Tanzanian farmer in his 40s" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4uK5dn96xIHQSdES5uidKF24roVqspfKD0t7zvQSekxUkEjjtDTju7PRFuB9HUsoKD-AXRTfy7qFdMu8jaNrZ9vfe0XQqkTWAAcfWyGIxRzhJvZF8WnyQDQStQxxc88lvwbDFHCQegItwwH5epqdoYlRyb7oC6jyO9_p1McB21xgM_pBsfYXLWDc43PvGnxNes1GaI67LyhRU6eXp4C48I-YfYvHspHeuPYia3cDnvg4g9N8KNPg"
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
      </div>

      {/* Mobile Navigation Bar (Fixed Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-4 flex justify-around items-center z-50">
        <Link to={`/${role.toLowerCase()}`} className={`flex flex-col items-center ${location.pathname === `/${role.toLowerCase()}` ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === `/${role.toLowerCase()}` ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          <span className="text-xs font-label-sm mt-1">Home</span>
        </Link>
        
        {role === 'FARMER' && (
          <>
            <Link to="/farmer/crops" className={`flex flex-col items-center ${location.pathname.includes('/crops') ? 'text-primary' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/crops') ? "'FILL' 1" : "'FILL' 0" }}>agriculture</span>
              <span className="text-xs font-label-sm mt-1">Mazao</span>
            </Link>
            <Link to="/farmer/market" className={`flex flex-col items-center ${location.pathname.includes('/market') ? 'text-primary' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/market') ? "'FILL' 1" : "'FILL' 0" }}>storefront</span>
              <span className="text-xs font-label-sm mt-1">Soko</span>
            </Link>
            <Link to="/farmer/advisory" className={`flex flex-col items-center ${location.pathname.includes('/advisory') ? 'text-primary' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/advisory') ? "'FILL' 1" : "'FILL' 0" }}>support_agent</span>
              <span className="text-xs font-label-sm mt-1">Wataalamu</span>
            </Link>
          </>
        )}
      </nav>

      {/* Interactive FAB for mobile only */}
      <button className="md:hidden fixed right-4 bottom-24 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 active:scale-90 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};
