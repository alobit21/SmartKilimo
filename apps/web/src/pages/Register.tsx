import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { Role } from '@kilimosmart/shared-types';
import { useTranslation } from '../lib/i18n';

export const Register: React.FC = () => {
  const { t } = useTranslation();
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
      setSuccess(t('auth.register.success') || 'Usajili umekamilika! Tunakupeleka kwenye ukurasa wa kuingia...');
      
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
      <div className="sm:mx-auto sm:w-full sm:max-w-[448px]">
        <Link to="/" className="flex justify-center font-display-md text-display-md font-bold text-primary mb-6">
          KilimoBora
        </Link>
        <h2 className="text-center font-display-md text-[28px] font-bold text-on-surface">
          {t('auth.register.title')}
        </h2>
        <p className="mt-2 text-center text-on-surface-variant font-body-md">
          {t('auth.register.desc')}
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
              <label htmlFor="role" className="block font-label-lg text-label-lg text-on-surface mb-2">
                {t('auth.register.role')}
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded-xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary transition-colors text-on-surface bg-surface-container-lowest"
                >
                  <option value={Role.FARMER}>{t('auth.register.role.farmer')}</option>
                  <option value={Role.BUYER}>{t('auth.register.role.buyer')}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block font-label-lg text-label-lg text-on-surface mb-2">
                {t('auth.login.identifier')}
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
                {t('auth.login.password')}
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
                disabled={loading || !!success}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm font-label-lg text-on-primary bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    {t('action.loading')}
                  </>
                ) : (
                  t('auth.register.button')
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
                <span className="px-2 bg-surface text-on-surface-variant font-label-sm">{t('auth.register.has_account')}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-outline-variant rounded-xl shadow-sm font-label-lg text-on-surface bg-surface hover:bg-surface-container transition-colors"
              >
                {t('auth.register.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
