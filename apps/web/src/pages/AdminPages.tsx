import React, { useState, useMemo } from 'react';
import { useTranslation } from '../lib/i18n';
import { useCrops } from '../features/crops/useCrops';
import { apiClient } from '../lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminRecentUsers, useUpdateUserStatus } from '../features/admin/useAdmin';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useActiveListings } from '../features/marketplace/useMarketplace';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#c084fc', '#fb923c'];

export const AdminUsers = () => {
  const { t } = useTranslation();
  const { data: users, isLoading: usersLoading } = useAdminRecentUsers();
  const updateStatusMutation = useUpdateUserStatus();

  const [userToToggle, setUserToToggle] = useState<{ id: string; isActive: boolean } | null>(null);
  const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);

  const initiateToggle = (user: { id: string; isActive: boolean }) => {
    setUserToToggle(user);
    setIsToggleConfirmOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!userToToggle) return;
    try {
      await updateStatusMutation.mutateAsync({ id: userToToggle.id, isActive: !userToToggle.isActive });
    } finally {
      setIsToggleConfirmOpen(false);
      setUserToToggle(null);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const totalPages = Math.ceil((users?.length || 0) / ITEMS_PER_PAGE);
  const paginatedUsers = users?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];

  const roleDistribution = useMemo(() => {
    if (!users) return [];
    const counts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [users]);

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <ConfirmDialog
        isOpen={isToggleConfirmOpen}
        title={userToToggle?.isActive ? "Simamisha Akaunti" : "Washa Akaunti"}
        message={`Je, unataka ${userToToggle?.isActive ? 'kusimamisha' : 'kuwasha'} akaunti hii?`}
        confirmText="Ndio, Endelea"
        cancelText="Ghairi"
        isLoading={updateStatusMutation.isPending}
        onConfirm={handleConfirmToggle}
        onCancel={() => {
          setIsToggleConfirmOpen(false);
          setUserToToggle(null);
        }}
      />
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Usimamizi wa Watumiaji</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama na dhibiti watumiaji wote wa mfumo.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
            {usersLoading ? (
              <div className="p-8 text-center text-on-surface-variant">Inapakia watumiaji...</div>
            ) : !users || users.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant">Hakuna watumiaji waliopatikana.</div>
            ) : (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                      <th className="p-4 font-semibold">Jina (Name)</th>
                      <th className="p-4 font-semibold">Barua Pepe / Simu</th>
                      <th className="p-4 font-semibold">Jukumu (Role)</th>
                      <th className="p-4 font-semibold">Tarehe ya Kujiunga</th>
                      <th className="p-4 font-semibold">Hali (Status)</th>
                      <th className="p-4 font-semibold text-right">Vitendo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
                    {paginatedUsers.map(user => (
                      <tr key={user.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-on-surface-variant">{user.email}</td>
                        <td className="p-4">
                          <span className="bg-surface-container-highest px-2 py-1 rounded text-xs font-bold uppercase">{user.role}</span>
                        </td>
                        <td className="p-4 text-on-surface-variant">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          {user.isActive ? (
                            <span className="text-green-600 font-bold text-xs flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Active</span>
                          ) : (
                            <span className="text-error font-bold text-xs flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">cancel</span> Inactive</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => initiateToggle({ id: user.id, isActive: user.isActive })}
                            disabled={updateStatusMutation.isPending}
                            className={`p-2 rounded-full transition-colors disabled:opacity-50 ${user.isActive ? 'text-error hover:bg-error-container' : 'text-green-600 hover:bg-green-100'}`}
                            title={user.isActive ? "Simamisha" : "Washa"}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {user.isActive ? 'block' : 'check_circle'}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest mt-auto">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-sm disabled:opacity-50 flex items-center gap-1 hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span> Iliyopita
                </button>
                <span className="text-sm font-medium text-on-surface-variant">
                  Ukurasa {currentPage} wa {totalPages}
                </span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-sm disabled:opacity-50 flex items-center gap-1 hover:bg-surface-container"
                >
                  Ijayo <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-center items-center h-[140px]">
            <div className="text-center">
              <p className="text-display-lg text-primary font-bold">{users?.length || 0}</p>
              <p className="text-title-md text-on-surface-variant mt-2">Jumla ya Watumiaji</p>
            </div>
          </div>
          
          <div className="bg-surface border border-outline-variant rounded-xl p-6 h-[300px] flex flex-col">
            <h2 className="text-title-md font-bold mb-2">Mgawanyo wa Majukumu</h2>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminCrops = () => {
  const { t } = useTranslation();
  const { data: crops, isLoading } = useCrops();
  const queryClient = useQueryClient();
  const [isSyncConfirmOpen, setIsSyncConfirmOpen] = useState(false);

  const syncMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/crops/sync-fao');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      setIsSyncConfirmOpen(false);
    }
  });

  const handleConfirmSync = () => {
    syncMutation.mutate();
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <ConfirmDialog
        isOpen={isSyncConfirmOpen}
        title="Sawazisha na FAO"
        message="Je, una uhakika unataka kusawazisha kanzi data ya mazao na mtandao wa FAO? Hii inaweza kuchukua muda kidogo."
        confirmText="Ndio, Sawazisha"
        cancelText="Ghairi"
        isLoading={syncMutation.isPending}
        onConfirm={handleConfirmSync}
        onCancel={() => setIsSyncConfirmOpen(false)}
      />
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">Kanzi ya Mazao (Crops DB)</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">Dhibiti aina za mazao zinazokubalika kwenye mfumo.</p>
        </div>
        <button 
          onClick={() => setIsSyncConfirmOpen(true)}
          disabled={syncMutation.isPending}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <span className={`material-symbols-outlined ${syncMutation.isPending ? 'animate-spin' : ''}`}>sync</span> 
          {syncMutation.isPending ? 'Inasawazisha...' : 'Sawazisha na FAO (Sync)'}
        </button>
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
      ) : (
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="p-4 font-semibold">Jina la Zao</th>
                <th className="p-4 font-semibold">Joto (°C)</th>
                <th className="p-4 font-semibold">Mvua (mm)</th>
                <th className="p-4 font-semibold">pH ya Udongo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
              {crops?.map(crop => (
                <tr key={crop.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">psychiatry</span>
                    {crop.name}
                  </td>
                  <td className="p-4">{crop.temperatureRangeMin} - {crop.temperatureRangeMax}</td>
                  <td className="p-4">{crop.rainfallRequirementMin} - {crop.rainfallRequirementMax}</td>
                  <td className="p-4">{crop.soilPhMin} - {crop.soilPhMax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const AdminMarket = () => {
  const { t } = useTranslation();
  const { data: listings, isLoading } = useActiveListings();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const totalPages = Math.ceil((listings?.length || 0) / ITEMS_PER_PAGE);
  const paginatedListings = listings?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];

  const marketVolume = useMemo(() => {
    if (!listings) return [];
    const volumes = listings.reduce((acc, listing) => {
      const name = listing.crop?.name || 'Unknown';
      acc[name] = (acc[name] || 0) + (listing.quantity * listing.pricePerUnit);
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(volumes).map(([name, value]) => ({ name, value }));
  }, [listings]);

  const marketShare = useMemo(() => {
    if (!listings) return [];
    const counts = listings.reduce((acc, listing) => {
      const name = listing.crop?.name || 'Unknown';
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [listings]);

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Usimamizi wa Soko</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama matangazo yote ya biashara sokoni kwa sasa.</p>
      </header>
      
      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia matangazo...</div>
      ) : !listings || listings.length === 0 ? (
        <div className="bg-surface rounded-xl p-8 text-center text-on-surface-variant border border-dashed border-outline-variant">
          Hakuna matangazo yoyote sokoni kwa sasa.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                      <th className="p-4 font-semibold">Zao (Crop)</th>
                      <th className="p-4 font-semibold">Mkulima</th>
                      <th className="p-4 font-semibold">Kiasi</th>
                      <th className="p-4 font-semibold">Bei (TZS)</th>
                      <th className="p-4 font-semibold">Thamani (Total)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
                    {paginatedListings.map(listing => (
                      <tr key={listing.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-4 font-medium flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-container text-on-primary-container rounded-md flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">psychiatry</span>
                          </div>
                          {listing.crop?.name}
                        </td>
                        <td className="p-4 text-on-surface-variant">{listing.farmer?.name || 'Mkulima'}</td>
                        <td className="p-4">{listing.quantity?.toLocaleString()} {listing.unit}</td>
                        <td className="p-4 font-medium">{listing.pricePerUnit?.toLocaleString()}</td>
                        <td className="p-4 text-primary font-bold">
                          {((listing.quantity || 0) * (listing.pricePerUnit || 0)).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {totalPages > 1 && (
                <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest mt-auto">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 border border-outline-variant rounded-lg text-sm disabled:opacity-50 flex items-center gap-1 hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span> Iliyopita
                  </button>
                  <span className="text-sm font-medium text-on-surface-variant">
                    Ukurasa {currentPage} wa {totalPages}
                  </span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-4 py-2 border border-outline-variant rounded-lg text-sm disabled:opacity-50 flex items-center gap-1 hover:bg-surface-container"
                  >
                    Ijayo <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface border border-outline-variant rounded-xl p-6 h-[300px] flex flex-col">
              <h2 className="text-title-md font-bold mb-2">Gawio la Matangazo</h2>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={marketShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 h-[300px] flex flex-col">
              <h2 className="text-title-md font-bold mb-2">Mwenendo wa Thamani (TZS)</h2>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketVolume} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} angle={-45} textAnchor="end" />
                    <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} tick={{ fill: '#6b7280', fontSize: 10 }} width={40} />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} TZS`} />
                    <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
