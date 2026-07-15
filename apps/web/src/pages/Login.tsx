import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../stores/auth-store';

export const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { identifier, password });
      const { user, accessToken } = response.data;
      
      login(user, accessToken);
      setSuccess('Umeingia kikamilifu! Tunakupeleka kwenye ukurasa wako...');
      
      // Delay navigation slightly so user sees the success message
      setTimeout(() => {
        if (from === '/') {
          navigate(`/${user.role.toLowerCase()}`);
        } else {
          navigate(from);
        }
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kuna tatizo limejitokeza. Tafadhali jaribu tena.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-[448px]">
        <Link to="/" className="flex justify-center font-display-md text-display-md font-bold text-primary mb-6">
          KilimoBora
        </Link>
        <h2 className="text-center font-display-md text-[28px] font-bold text-on-surface">
          Karibu tena
        </h2>
        <p className="mt-2 text-center text-on-surface-variant font-body-md">
          Ingia kwenye akaunti yako kuendelea
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[448px]">
        <div className="bg-surface py-8 px-4 soft-lift hairline-border sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-container/20 border border-error/20 text-error p-4 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined shrink-0">error</span>
                <p className="font-label-md text-sm mt-0.5">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-sprout-tint border border-primary/20 text-primary p-4 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined shrink-0">check_circle</span>
                <p className="font-label-md text-sm mt-0.5">{success}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="identifier" className="block font-label-lg text-label-lg text-on-surface mb-2">
                Barua pepe au Namba ya Simu
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm placeholder-outline focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                  placeholder="mfano: 0712345678"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-label-lg text-label-lg text-on-surface mb-2">
                Nenosiri
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm placeholder-outline focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                  placeholder="Ingiza nenosiri lako"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-label-sm text-on-surface-variant">
                  Nikumbuke
                </label>
              </div>

              <div className="text-label-sm">
                <a href="#" className="font-label-lg text-primary hover:text-primary-fixed-dim transition-colors">
                  Umesahau nenosiri?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !!success}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm font-label-lg text-on-primary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    Inaingia...
                  </>
                ) : (
                  'Ingia'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-on-surface-variant font-label-sm">Huna akaunti?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border border-outline-variant rounded-xl shadow-sm font-label-lg text-on-surface bg-surface hover:bg-surface-container transition-colors"
              >
                Jisajili sasa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
