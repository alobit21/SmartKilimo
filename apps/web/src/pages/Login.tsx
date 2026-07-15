import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../stores/auth-store';

export const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      const { user, token } = response.data;
      
      login(user, token);
      
      // Navigate to respective dashboard or original intended page
      if (from === '/') {
        navigate(`/${user.role.toLowerCase()}`);
      } else {
        navigate(from);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kuna tatizo limejitokeza. Tafadhali jaribu tena.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 soft-lift hairline-border sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-container text-on-error-container p-3 rounded-lg font-label-sm text-center">
                {error}
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
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm font-label-lg text-on-primary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity disabled:opacity-50"
              >
                {loading ? 'Inaingia...' : 'Ingia'}
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
