import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';

export const BuyerShell: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <nav className="flex justify-between items-center px-gutter py-md w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-xl">
            <Link to="/buyer" className="font-display-md text-display-md font-bold text-primary">
              KilimoBora
            </Link>
            <div className="hidden md:flex gap-lg">
              <Link to="/buyer" className="text-primary border-b-2 border-primary pb-1 font-label-lg text-label-lg cursor-pointer">
                Soko
              </Link>
              <a className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg cursor-pointer" href="#">
                Vipindi
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg cursor-pointer" href="#">
                Ushauri
              </a>
            </div>
          </div>

          <div className="flex items-center gap-md">
            {/* Search Pill */}
            <div className="relative hidden sm:flex items-center group">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant">search</span>
              <input 
                className="pl-12 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full w-64 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary font-body-md" 
                placeholder="Tafuta mazao..." 
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-sm">
              <button className="flex items-center gap-xs px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
                <span className="font-label-lg text-label-lg">Kiswahili</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button onClick={handleLogout} className="p-2 text-on-surface-variant hover:bg-error-container hover:text-error rounded-full transition-colors" title="Ondoka">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface mt-xxl pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-gutter py-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-outline/20 pb-12 mb-12">
            <div className="w-full lg:w-1/4 min-w-[280px]">
              <span className="font-title-md text-title-md text-primary-fixed block mb-4">KilimoBora</span>
              <p className="font-body-md text-inverse-on-surface opacity-80 leading-relaxed">Tunawaunganisha wakulima wa Tanzania na wanunuzi ulimwenguni kote kupitia teknolojia ya kisasa.</p>
            </div>
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="font-label-lg text-label-lg mb-4 text-white">Huduma</p>
                <ul className="space-y-3 text-inverse-on-surface opacity-80 font-body-md">
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Soko la Mazao</a></li>
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Bei za Bidhaa</a></li>
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Ushauri wa Kitaalamu</a></li>
                </ul>
              </div>
              <div>
                <p className="font-label-lg text-label-lg mb-4 text-white">Kampuni</p>
                <ul className="space-y-3 text-inverse-on-surface opacity-80 font-body-md">
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Kuhusu Sisi</a></li>
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Wasiliana Nasi</a></li>
                  <li><a className="hover:text-primary-fixed transition-colors block py-1" href="#">Ubia</a></li>
                </ul>
              </div>
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <p className="font-label-lg text-label-lg mb-4 text-white">Jarida Letu</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input className="bg-surface-container-highest/10 border border-outline-variant/30 text-white rounded p-3 text-sm w-full outline-none focus:border-primary-fixed" placeholder="Barua pepe" type="email" />
                  <button className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm hover:opacity-90 whitespace-nowrap">Jiunge</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="font-label-sm text-label-sm text-inverse-on-surface opacity-80">© 2024 KilimoBora Tanzania. Haki zote zimehifadhiwa.</p>
            <div className="flex gap-lg font-label-sm text-label-sm">
              <a className="text-inverse-on-surface opacity-80 hover:text-primary-fixed hover:underline underline-offset-4 transition-all" href="#">Faragha</a>
              <a className="text-inverse-on-surface opacity-80 hover:text-primary-fixed hover:underline underline-offset-4 transition-all" href="#">Sheria</a>
              <a className="text-inverse-on-surface opacity-80 hover:text-primary-fixed hover:underline underline-offset-4 transition-all" href="#">Wasiliana</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Shell (Visible only on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-gutter py-sm flex justify-around items-center z-50">
        <a className="flex flex-col items-center gap-xs text-primary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="text-[10px] font-label-sm">Soko</span>
        </a>
        <a className="flex flex-col items-center gap-xs text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">agriculture</span>
          <span className="text-[10px] font-label-sm">Mazao</span>
        </a>
        <a className="flex flex-col items-center gap-xs text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-label-sm">Dashboard</span>
        </a>
        <a className="flex flex-col items-center gap-xs text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-label-sm">Wataalamu</span>
        </a>
        <a className="flex flex-col items-center gap-xs text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-label-sm">Wasifu</span>
        </a>
      </div>
    </div>
  );
};
