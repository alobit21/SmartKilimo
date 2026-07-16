import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useMyListings, useCreateListing, useUpdateListing, useDeleteListing } from '../features/marketplace/useMarketplace';
import { useFarms, useCreateFarm, useUpdateFarmStatus, useFarmWeather } from '../features/farms/useFarms';
import { useCrops } from '../features/crops/useCrops';
import { useMyAdvisoryRequests, useCreateAdvisoryRequest, useUpdateAdvisoryRequest, useDeleteAdvisoryRequest } from '../features/advisory/useAdvisory';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useFarmerDeals, useRespondDeal } from '../features/deals/useDeals';
import { LocationPickerMap } from '../components/ui/LocationPickerMap';
import { useTranslation } from '../lib/i18n';

const FarmWeatherWidget = ({ farmId }: { farmId: string }) => {
  const { data: weather, isLoading } = useFarmWeather(farmId);

  if (isLoading) return <div className="text-xs text-on-surface-variant animate-pulse p-2">Inapakia Hali ya Hewa...</div>;
  if (!weather) return <div className="text-xs text-on-surface-variant p-2">Hakuna data ya hali ya hewa.</div>;

  return (
    <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/50 mt-2">
      <h4 className="text-xs font-bold text-on-surface-variant mb-3 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">partly_cloudy_day</span>
        Hali ya Hewa (Sasa)
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined text-[18px]">thermostat</span>
          </div>
          <div>
            <div className="text-[10px] text-on-surface-variant">Joto</div>
            <div className="text-xs font-bold">{Number(weather.temperature).toFixed(1)}°C</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[18px]">water_drop</span>
          </div>
          <div>
            <div className="text-[10px] text-on-surface-variant">Unyevu</div>
            <div className="text-xs font-bold">{Number(weather.humidity).toFixed(0)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <span className="material-symbols-outlined text-[18px]">air</span>
          </div>
          <div>
            <div className="text-[10px] text-on-surface-variant">Upepo</div>
            <div className="text-xs font-bold">{Number(weather.windSpeed).toFixed(1)} m/s</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
            <span className="material-symbols-outlined text-[18px]">rainy</span>
          </div>
          <div>
            <div className="text-[10px] text-on-surface-variant">Mvua (1h)</div>
            <div className="text-xs font-bold">{Number(weather.rainfall).toFixed(1)} mm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FarmerCrops = () => {
  const { t } = useTranslation();
  const { data: farms, isLoading } = useFarms();
  const createFarmMutation = useCreateFarm();
  const updateStatusMutation = useUpdateFarmStatus();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    sizeHectares: '',
    latitude: '',
    longitude: '',
    soilNotes: ''
  });

  const [updateData, setUpdateData] = useState({
    status: 'Inakua Mzuri',
    growthProgress: 0,
  });

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFarmMutation.mutateAsync({
      name: formData.name,
      sizeHectares: Number(formData.sizeHectares),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      soilNotes: formData.soilNotes
    });
    setIsModalOpen(false);
    setFormData({ name: '', sizeHectares: '', latitude: '', longitude: '', soilNotes: '' });
  };

  const openUpdateModal = (farm: any) => {
    setSelectedFarmId(farm.id);
    setUpdateData({
      status: farm.status || 'Kitalu Kipya',
      growthProgress: farm.growthProgress || 0,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmId) return;
    
    await updateStatusMutation.mutateAsync({
      id: selectedFarmId,
      status: updateData.status,
      growthProgress: Number(updateData.growthProgress),
    });
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500 relative">
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">{t('farmer.crops.title')}</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">{t('farmer.crops.desc')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span> {t('farmer.crops.add')}
        </button>
      </header>

      {/* Create Farm Modal (Full Screen Split Layout) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background z-[9999] flex flex-col md:flex-row overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          
          {/* Left Side: Form */}
          <div className="w-full md:w-[450px] lg:w-[500px] bg-surface h-full flex flex-col shadow-2xl z-10 shrink-0">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface sticky top-0 z-20">
              <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">landscape</span> {t('farmer.crops.add')}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container rounded-full p-2 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form onSubmit={handleCreateFarm} className="space-y-6">
                <div>
                  <label className="block text-label-md font-bold mb-2">{t('farmer.crops.name')}</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-2 outline-none transition-all" placeholder="Mf. Shamba la Morogoro" />
                </div>
                
                <div>
                  <label className="block text-label-md font-bold mb-2">{t('farmer.crops.size')}</label>
                  <input required type="number" step="0.1" min="0.1" value={formData.sizeHectares} onChange={e => setFormData({...formData, sizeHectares: e.target.value})} className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-2 outline-none transition-all" placeholder="Mf. 2.5" />
                </div>
                
                <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/50 space-y-4">
                  <p className="font-label-md text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">location_on</span> {t('farmer.crops.location')}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-label-sm font-bold mb-1 text-on-surface-variant">Latitude</label>
                      <input required type="number" step="any" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 outline-none font-mono text-sm" placeholder="-6.173" />
                    </div>
                    <div>
                      <label className="block text-label-sm font-bold mb-1 text-on-surface-variant">Longitude</label>
                      <input required type="number" step="any" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 outline-none font-mono text-sm" placeholder="35.738" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-label-md font-bold mb-2">{t('farmer.crops.soil')}</label>
                  <textarea rows={3} value={formData.soilNotes} onChange={e => setFormData({...formData, soilNotes: e.target.value})} className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-2 outline-none transition-all resize-none" placeholder="Mf. Udongo Tifu Tifu unaohifadhi maji..." />
                </div>
                
                <button type="submit" disabled={createFarmMutation.isPending} className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold mt-8 text-label-lg hover:shadow-lg disabled:opacity-50 transition-all flex justify-center items-center gap-2 active:scale-[0.98]">
                  {createFarmMutation.isPending ? <><span className="material-symbols-outlined animate-spin">sync</span> {t('action.loading')}</> : t('farmer.crops.save')}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Interactive Map */}
          <div className="flex-1 h-[40vh] md:h-full relative bg-surface-container">
            <LocationPickerMap 
              latitude={formData.latitude === '' ? '' : Number(formData.latitude)} 
              longitude={formData.longitude === '' ? '' : Number(formData.longitude)} 
              onLocationSelect={(lat, lng) => setFormData({...formData, latitude: lat.toFixed(6), longitude: lng.toFixed(6)})} 
            />
          </div>
          
        </div>
      )}

      {/* Update Status Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-surface rounded-3xl p-6 md:p-8 w-[95vw] md:w-[450px] shadow-2xl">
            <h2 className="text-title-lg font-bold mb-6 text-on-surface flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">update</span> {t('farmer.crops.update_status')}
              </span>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container rounded-full p-2 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </h2>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-label-md font-bold mb-2">{t('farmer.crops.status.current')}</label>
                <select 
                  value={updateData.status} 
                  onChange={e => setUpdateData({...updateData, status: e.target.value})} 
                  className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary outline-none"
                >
                  <option value="Kitalu Kipya">{t('farmer.crops.status.new')}</option>
                  <option value="Inakua Mzuri">{t('farmer.crops.status.growing')}</option>
                  <option value="Inahitaji Maji">{t('farmer.crops.status.water')}</option>
                  <option value="Tayari Kuvunwa">{t('farmer.crops.status.ready')}</option>
                  <option value="Imeshambuliwa na Wadudu">{t('farmer.crops.status.pest')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-label-md font-bold mb-2 flex justify-between">
                  <span>{t('farmer.crops.progress')}</span>
                  <span className="text-primary">{updateData.growthProgress}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={updateData.growthProgress} 
                  onChange={e => setUpdateData({...updateData, growthProgress: Number(e.target.value)})} 
                  className="w-full accent-primary" 
                />
              </div>
              
              <button type="submit" disabled={updateStatusMutation.isPending} className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold mt-8 text-label-lg hover:shadow-lg disabled:opacity-50">
                {updateStatusMutation.isPending ? t('farmer.crops.updating') : t('farmer.crops.update_status')}
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
      ) : farms?.length === 0 ? (
        <div className="p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl">Hauna kitalu chochote kilichosajiliwa.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
          {farms?.map((farm, index) => (
            <div key={farm.id} className="bg-surface border border-outline-variant rounded-xl p-card_padding hover:border-primary transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${index % 2 === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'}`}>
                    <span className="material-symbols-outlined">{index % 2 === 0 ? 'grass' : 'filter_vintage'}</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface">{farm.name}</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Eka {farm.sizeHectares}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                  farm.status === 'Tayari Kuvunwa' ? 'bg-primary text-on-primary' : 
                  farm.status === 'Inahitaji Maji' || farm.status === 'Imeshambuliwa na Wadudu' ? 'bg-error-container text-error' : 
                  'bg-secondary-container text-on-secondary-container'
                }`}>
                  {farm.status || 'Kitalu Kipya'}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                    <span>Maendeleo ya Ukuaji</span>
                    <span>{farm.growthProgress || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${farm.growthProgress || 0}%` }}></div>
                  </div>
                </div>
                
                <div className="bg-surface-container-low p-4 rounded-lg flex justify-between items-center border border-outline-variant/50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">landscape</span>
                    <span className="font-label-sm text-label-sm text-on-surface">{farm.soilNotes || 'Udongo mzuri'}</span>
                  </div>
                </div>
                
                <FarmWeatherWidget farmId={farm.id} />
              </div>
              
              <div className="mt-6 flex gap-3">
                <button onClick={() => openUpdateModal(farm)} className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-label-sm hover:opacity-90 transition-opacity">
                  Sasisha Hali
                </button>
                <button onClick={() => alert('Ratiba ya kitalu inaandaliwa na Mtaalamu wetu.')} className="flex-1 border border-outline-variant text-on-surface py-2 rounded-lg font-label-sm hover:bg-surface-container transition-colors">
                  Tazama Ratiba
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FarmerAdvisory = () => {
  const { t } = useTranslation();
  const { data: requests, isLoading } = useMyAdvisoryRequests();
  const { data: farms } = useFarms();
  const { data: crops } = useCrops();
  const updateMutation = useUpdateAdvisoryRequest();
  const deleteMutation = useDeleteAdvisoryRequest();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);
  const [deletingRequestId, setDeletingRequestId] = useState<string | null>(null);
  
  const [description, setDescription] = useState('');
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEditClick = (req: any) => {
    setEditingRequestId(req.id);
    setSelectedFarm(req.farmId);
    setSelectedCrop(req.cropId);
    setDescription(req.description);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingRequestId(null);
    setDescription('');
    setSelectedFarm('');
    setSelectedCrop('');
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !selectedFarm || !selectedCrop) return;

    if (editingRequestId) {
      await updateMutation.mutateAsync({
        id: editingRequestId,
        data: { description, farmId: selectedFarm, cropId: selectedCrop }
      });
    } else {
      const formData = new FormData();
      formData.append('farmId', selectedFarm);
      formData.append('cropId', selectedCrop);
      formData.append('title', 'Msaada wa Haraka');
      formData.append('description', description);
      
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }
      await createMutation.mutateAsync(formData);
    }
    
    setIsModalOpen(false);
    setEditingRequestId(null);
    setDescription('');
    setSelectedCrop('');
    setSelectedFarm('');
    setSelectedFile(null);
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">{t('farmer.advisory.title')}</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">{t('farmer.advisory.desc')}</p>
        </div>
        <button 
          onClick={handleOpenNew}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add_a_photo</span> {t('farmer.advisory.ask')}
        </button>
      </header>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" 
          style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="bg-surface rounded-3xl p-6 md:p-8 w-[95vw] md:w-[500px] max-w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-title-lg font-bold mb-6 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">support_agent</span>
              Tuma Picha kwa Mtaalamu
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-label-md font-bold mb-2 text-on-surface">Chagua Kitalu</label>
                <select 
                  className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={selectedFarm}
                  onChange={(e) => setSelectedFarm(e.target.value)}
                  required
                >
                  <option value="">-- Chagua Kitalu chako --</option>
                  {farms?.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-md font-bold mb-2 text-on-surface">Chagua Zao</label>
                <select 
                  className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  required
                >
                  <option value="">-- Chagua Zao lililohusika --</option>
                  {crops?.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-label-md font-bold mb-2 text-on-surface">Eleza Tatizo (Magonjwa, Wadudu, n.k.)</label>
                <textarea 
                  className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Mfano: Mahindi yangu yanageuka rangi ya njano na yana madoa..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {!editingRequestId && (
                <div>
                  <label className="block text-label-md font-bold mb-2 text-on-surface">Picha ya Zao (Hiari)</label>
                  <div className="w-full p-4 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 hover:bg-surface-container transition-colors relative cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-primary/50">add_photo_alternate</span>
                    <span className="text-label-sm text-on-surface-variant">Bofya hapa kuweka picha</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {selectedFile && (
                      <span className="text-primary font-bold text-sm mt-2 bg-primary-container px-3 py-1 rounded-full">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingRequestId(null); }} className="flex-1 py-3 text-on-surface border border-outline-variant rounded-xl hover:bg-surface-container font-bold transition-colors">
                  Ghairi
                </button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 py-3 bg-primary text-on-primary rounded-xl flex items-center justify-center font-bold disabled:opacity-50 hover:shadow-md transition-all">
                  {createMutation.isPending || updateMutation.isPending ? (
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined animate-spin">sync</span> Inatuma...</span>
                  ) : (
                    editingRequestId ? 'Hifadhi Mabadiliko' : 'Tuma Ombi'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
      ) : requests?.length === 0 ? (
        <div className="p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl">Hujatuma maombi yoyote kwa wataalamu.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.map(req => (
            <div key={req.id} className="bg-surface border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-all shadow-sm">
              {req.photoUrl ? (
                <div className="w-full h-48 bg-surface-container-highest">
                  <img src={req.photoUrl} alt="Crop issue" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-48 bg-surface-container-highest flex flex-col items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2">image_not_supported</span>
                  <span className="text-label-sm">Hakuna picha</span>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {req.status === 'RESOLVED' ? 'Imetatuliwa' : 'Inasubiri'}
                  </span>
                  <span className="text-label-sm text-on-surface-variant">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="font-title-md mb-2 line-clamp-1">{req.farm?.name}</h3>
                <p className="text-body-sm text-on-surface-variant line-clamp-3 mb-4">{req.description}</p>
                
                {req.status === 'RESOLVED' && req.responseNotes && (
                  <div className="mt-4 p-3 bg-primary-container/20 border border-primary/30 rounded-lg">
                    <p className="text-label-sm font-bold text-primary mb-1">Ushauri wa Mtaalamu:</p>
                    <p className="text-body-sm text-on-surface">{req.responseNotes}</p>
                  </div>
                )}
                
                {req.status === 'PENDING' && (
                  <div className="mt-4 flex gap-2 pt-3 border-t border-outline-variant/50">
                    <button 
                      onClick={() => handleEditClick(req)}
                      className="flex-1 py-2 text-sm font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span> Hariri
                    </button>
                    <button 
                      onClick={() => setDeletingRequestId(req.id)}
                      className="flex-1 py-2 text-sm font-bold text-error bg-error/10 rounded-lg hover:bg-error/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span> Futa
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingRequestId}
        title="Futa Ombi la Ushauri"
        message="Je, una uhakika unataka kufuta ombi hili la ushauri? Hatua hii haiwezi kutenguliwa."
        confirmText="Ndio, Futa"
        cancelText="Ghairi"
        isLoading={deleteMutation.isPending}
        onConfirm={async () => {
          if (deletingRequestId) {
            await deleteMutation.mutateAsync(deletingRequestId);
            setDeletingRequestId(null);
          }
        }}
        onCancel={() => setDeletingRequestId(null)}
      />
    </div>
  );
};

export const FarmerMarket = () => {
  const { t } = useTranslation();
  const { data: listings, isLoading } = useMyListings();
  const { data: crops } = useCrops();
  const createListingMutation = useCreateListing();
  const updateListingMutation = useUpdateListing();
  const deleteListingMutation = useDeleteListing();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    cropId: '',
    quantity: '',
    unit: 'Kilo',
    pricePerUnit: '',
    currency: 'TZS'
  });

  const handleEditClick = (listing: any) => {
    setEditingListingId(listing.id);
    setFormData({
      cropId: listing.cropId || listing.crop?.id || '',
      quantity: listing.quantity.toString(),
      unit: listing.unit,
      pricePerUnit: listing.pricePerUnit.toString(),
      currency: listing.currency,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingListingId(null);
    setFormData({ cropId: '', quantity: '', unit: 'Kilo', pricePerUnit: '', currency: 'TZS' });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cropId || !formData.quantity || !formData.pricePerUnit) return;
    
    if (editingListingId) {
      // For updates, we just send JSON (no image update yet for listings in our backend setup)
      await updateListingMutation.mutateAsync({
        id: editingListingId,
        data: {
          cropId: formData.cropId,
          quantity: Number(formData.quantity),
          unit: formData.unit,
          pricePerUnit: Number(formData.pricePerUnit),
          currency: formData.currency,
        }
      });
    } else {
      const submissionData = new FormData();
      submissionData.append('cropId', formData.cropId);
      submissionData.append('quantity', formData.quantity);
      submissionData.append('unit', formData.unit);
      submissionData.append('pricePerUnit', formData.pricePerUnit);
      submissionData.append('currency', formData.currency);
      
      if (selectedFile) {
        submissionData.append('photo', selectedFile);
      }
      
      await createListingMutation.mutateAsync(submissionData as any);
    }
    
    setIsModalOpen(false);
    setEditingListingId(null);
    setFormData({ cropId: '', quantity: '', unit: 'Kilo', pricePerUnit: '', currency: 'TZS' });
    setSelectedFile(null);
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500 relative">
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">{t('farmer.market.title')}</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">{t('farmer.market.desc')}</p>
        </div>
        <button 
          onClick={handleOpenNew}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span> {t('farmer.market.add')}
        </button>
      </header>

      {/* Create Listing Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" 
          style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="bg-surface rounded-3xl p-6 md:p-8 w-[95vw] md:w-[600px] max-w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-title-lg font-bold mb-6 text-on-surface flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">storefront</span>
                Weka Bidhaa Sokoni
              </span>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container rounded-full p-2 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </h2>
            
            <form id="listing-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-2">Zao (Crop)</label>
                <select 
                  required
                  value={formData.cropId}
                  onChange={(e) => setFormData({...formData, cropId: e.target.value})}
                  className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option value="" disabled>-- Chagua zao --</option>
                  {crops?.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-2">Kiasi (Quantity)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="Mf. 100"
                    className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-2">Kipimo (Unit)</label>
                  <select 
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  >
                    <option value="Kilo">Kilo (KG)</option>
                    <option value="Tani">Tani (Ton)</option>
                    <option value="Gunia">Gunia (Sack)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-2">Bei kwa Kipimo (Price)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
                    placeholder="Mf. 1500"
                    className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-2">Sarafu (Currency)</label>
                  <select 
                    required
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full p-4 border border-outline-variant rounded-xl bg-surface-container-highest cursor-not-allowed outline-none text-on-surface-variant font-medium"
                    disabled
                  >
                    <option value="TZS">TZS</option>
                  </select>
                </div>
              </div>

              {!editingListingId && (
                <div>
                  <label className="block text-label-md font-bold text-on-surface mb-2">Picha ya Bidhaa (Hiari)</label>
                  <div className="w-full p-4 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center gap-2 hover:bg-surface-container transition-colors relative cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-primary/50">add_photo_alternate</span>
                    <span className="text-label-sm text-on-surface-variant">Bofya hapa kuweka picha ya bidhaa yako</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {selectedFile && (
                      <span className="text-primary font-bold text-sm mt-2 bg-primary-container px-3 py-1 rounded-full">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-8 pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingListingId(null); }} className="flex-1 py-3 text-on-surface border border-outline-variant rounded-xl hover:bg-surface-container font-bold transition-colors">
                  Ghairi
                </button>
                <button type="submit" disabled={createListingMutation.isPending || updateListingMutation.isPending} className="flex-1 py-3 bg-primary text-on-primary rounded-xl flex items-center justify-center font-bold disabled:opacity-50 hover:shadow-md transition-all">
                  {createListingMutation.isPending || updateListingMutation.isPending ? (
                    <span className="flex items-center gap-2"><span className="material-symbols-outlined animate-spin">sync</span> Inapakia...</span>
                  ) : (
                    editingListingId ? 'Hifadhi Mabadiliko' : 'Hifadhi Bidhaa'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mt-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-title-md text-title-md text-on-surface mb-4">Bidhaa Zilizopo Sokoni</h2>
          
          {isLoading ? (
            <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
          ) : listings?.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl">Hauna bidhaa yoyote sokoni.</div>
          ) : (
            listings?.map((listing) => (
              <div key={listing.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-32 h-24 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src={listing.photoUrl || "https://images.unsplash.com/photo-1599579085609-8b835bc4578b?auto=format&fit=crop&q=80&w=200"} alt={listing.crop?.name} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary">{listing.crop?.name} ({listing.quantity} {listing.unit})</h3>
                      <p className="font-label-sm text-on-surface-variant">Hali: {listing.status}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-title-md text-on-surface">{listing.currency} {Number(listing.pricePerUnit).toLocaleString()}</div>
                      <div className="font-label-sm text-on-surface-variant">kwa {listing.unit}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-outline-variant/50">
                    <div className="flex gap-4">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs font-bold">Ofa Mpya</span>
                      <button className="text-primary font-label-sm hover:underline">Tazama Ofa</button>
                    </div>
                    {listing.status === 'ACTIVE' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditClick(listing)}
                          className="px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span> Hariri
                        </button>
                        <button 
                          onClick={() => setDeletingListingId(listing.id)}
                          className="px-3 py-1.5 text-xs font-bold text-error bg-error/10 rounded hover:bg-error/20 transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span> Futa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <ConfirmDialog
          isOpen={!!deletingListingId}
          title="Futa Bidhaa"
          message="Je, una uhakika unataka kufuta bidhaa hii kutoka sokoni? Wanunuzi hawataiona tena."
          confirmText="Ndio, Futa"
          cancelText="Ghairi"
          isLoading={deleteListingMutation.isPending}
          onConfirm={async () => {
            if (deletingListingId) {
              await deleteListingMutation.mutateAsync(deletingListingId);
              setDeletingListingId(null);
            }
          }}
          onCancel={() => setDeletingListingId(null)}
        />
        
        <div>
          <h2 className="font-title-md text-title-md text-on-surface mb-4">Bei za Soko (Dodoma)</h2>
          <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/50">
              <span className="font-label-md text-on-surface">Mahindi</span>
              <span className="font-label-md text-primary flex items-center gap-1">450/kg <span className="material-symbols-outlined text-sm">trending_up</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/50">
              <span className="font-label-md text-on-surface">Alizeti</span>
              <span className="font-label-md text-primary flex items-center gap-1">1200/kg <span className="material-symbols-outlined text-sm">trending_up</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/50">
              <span className="font-label-md text-on-surface">Maharagwe</span>
              <span className="font-label-md text-error flex items-center gap-1">2100/kg <span className="material-symbols-outlined text-sm">trending_down</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FarmerContracts = () => {
  const { data: deals, isLoading } = useFarmerDeals();
  const respondMutation = useRespondDeal();

  const handleRespond = async (dealId: string, status: 'ACCEPTED' | 'REJECTED') => {
    await respondMutation.mutateAsync({ id: dealId, status });
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Mikataba Yangu</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama na udhibiti mikataba yako ya mauzo na wanunuzi mbalimbali.</p>
      </header>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant">Inapakia...</div>
        ) : !deals || deals.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">Huna mikataba yoyote bado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                  <th className="p-4 font-semibold">Mnunuzi</th>
                  <th className="p-4 font-semibold">Zao</th>
                  <th className="p-4 font-semibold">Kiasi</th>
                  <th className="p-4 font-semibold">Bei Jumla</th>
                  <th className="p-4 font-semibold">Tarehe ya Ombi</th>
                  <th className="p-4 font-semibold">Hali</th>
                  <th className="p-4 font-semibold">Vitendo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
                {deals.map(deal => {
                  const totalPrice = (deal.listing?.quantity || 0) * (deal.listing?.pricePerUnit || 0);
                  
                  return (
                    <tr key={deal.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4 font-medium">{deal.buyer?.fullName || 'Mnunuzi'}</td>
                      <td className="p-4">{deal.listing?.crop?.name}</td>
                      <td className="p-4">{deal.listing?.quantity} {deal.listing?.unit}</td>
                      <td className="p-4">{deal.listing?.currency} {totalPrice.toLocaleString()}</td>
                      <td className="p-4">{new Date(deal.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        {deal.status === 'PENDING' && <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">Inasubiri</span>}
                        {deal.status === 'ACCEPTED' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Imekubaliwa</span>}
                        {deal.status === 'REJECTED' && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Imekataliwa</span>}
                      </td>
                      <td className="p-4 text-right flex gap-2 justify-end">
                        {deal.status === 'PENDING' ? (
                          <>
                            <button 
                              onClick={() => handleRespond(deal.id, 'ACCEPTED')}
                              disabled={respondMutation.isPending}
                              className="text-primary hover:bg-primary-container px-3 py-1 rounded-md font-label-sm transition-colors"
                            >
                              Kubali
                            </button>
                            <button 
                              onClick={() => handleRespond(deal.id, 'REJECTED')}
                              disabled={respondMutation.isPending}
                              className="text-error hover:bg-error-container px-3 py-1 rounded-md font-label-sm transition-colors"
                            >
                              Kataa
                            </button>
                          </>
                        ) : (
                          <span className="text-on-surface-variant font-label-sm text-xs">Imekamilika</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
