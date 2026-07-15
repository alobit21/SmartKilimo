import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { Role } from '@kilimosmart/shared-types';

export const Register: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.FARMER);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload: any = { password, role };
      if (phone) payload.phone = phone;
      if (email) payload.email = email;

      // Backend requires at least phone or email, let's enforce that if we can, 
      // but API handles it via DTO.
      if (!phone && !email) {
        throw new Error("Tafadhali ingiza barua pepe au namba ya simu.");
      }

      await apiClient.post('/auth/register', payload);
      setSuccess('Usajili umekamilika! Tunakupeleka kwenye ukurasa wa kuingia...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Kuna tatizo limejitokeza. Tafadhali jaribu tena.');
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
          Fungua Akaunti
        </h2>
        <p className="mt-2 text-center text-on-surface-variant font-body-md">
          Jiunge na mtandao wetu wa kilimo kidijitali
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
            {success && (
              <div className="bg-sprout-tint text-primary p-3 rounded-lg font-label-sm text-center">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="role" className="block font-label-lg text-label-lg text-on-surface mb-2">
                Aina ya Mtumiaji
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                >
                  <option value={Role.FARMER}>Mkulima (Farmer)</option>
                  <option value={Role.BUYER}>Mnunuzi (Buyer)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block font-label-lg text-label-lg text-on-surface mb-2">
                Namba ya Simu
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm placeholder-outline focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                  placeholder="mfano: 0712345678"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-label-lg text-label-lg text-on-surface mb-2">
                Barua pepe (Si lazima)
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm placeholder-outline focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                  placeholder="mfano: jina@email.com"
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
                  placeholder="Ingiza nenosiri jipya"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm font-label-lg text-on-primary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity disabled:opacity-50"
              >
                {loading ? 'Inasajili...' : 'Jisajili'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-on-surface-variant font-label-sm">Tayari una akaunti?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-outline-variant rounded-xl shadow-sm font-label-lg text-on-surface bg-surface hover:bg-surface-container transition-colors"
              >
                Ingia sasa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
