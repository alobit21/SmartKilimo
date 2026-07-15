import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';

import { FarmerStats } from '../components/farmer/FarmerStats';
import { WeatherWidget } from '../components/farmer/WeatherWidget';
import { MarketPricesWidget } from '../components/farmer/MarketPricesWidget';
import { CropRecommendationsWidget } from '../components/farmer/CropRecommendationsWidget';

export const FarmerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Weather Snapshot Card (Spans 4 columns) */}
      <div className="md:col-span-4 bg-sky-set rounded-xl p-6 soft-lift flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">Hali ya Hewa</p>
            <h3 className="font-display-lg text-display-lg font-bold mt-1">28°C</h3>
            <p className="font-body-md text-body-md">Mvua za hapa na pale</p>
          </div>
          <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cloudy_filled</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Unyevu</p>
            <p className="font-title-md">65%</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">Upepo</p>
            <p className="font-title-md">12km/s</p>
          </div>
          <div className="text-center">
            <p className="text-label-sm font-label-sm opacity-70">UV</p>
            <p className="font-title-md">7.2</p>
          </div>
        </div>
      </div>

      {/* Crop Recommendation Card (Spans 8 columns) */}
      <div className="md:col-span-8 bg-sprout-tint rounded-xl p-6 soft-lift flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-[160px]">eco</span>
        </div>
        <div className="w-full md:w-[320px] md:h-[240px] h-48 rounded-lg overflow-hidden flex-shrink-0 z-10">
          <img 
            className="w-full h-full object-cover" 
            alt="A professional headshot of a Tanzanian farmer in his 40s" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4uK5dn96xIHQSdES5uidKF24roVqspfKD0t7zvQSekxUkEjjtDTju7PRFuB9HUsoKD-AXRTfy7qFdMu8jaNrZ9vfe0XQqkTWAAcfWyGIxRzhJvZF8WnyQDQStQxxc88lvwbDFHCQegItwwH5epqdoYlRyb7oC6jyO9_p1McB21xgM_pBsfYXLWDc43PvGnxNes1GaI67LyhRU6eXp4C48I-YfYvHspHeuPYia3cDnvg4g9N8KNPg"
          />
        </div>
        <div className="flex-1 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-container text-white px-3 py-1 rounded-full font-label-sm text-label-sm">Pendekezo Jipya</span>
            <span className="text-on-secondary-container font-label-lg text-label-lg">Mahindi - Soko Kubwa</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Panda Mahindi msimu huu</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Takwimu zinaonyesha uhitaji mkubwa wa mahindi mwezi Agosti katika soko la Dodoma. Inashauriwa kupanda mbegu za aina ya SC419.</p>
          <Link to="/farmer/recommendations" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all min-h-[48px] w-fit">
            Soma Maelezo Zaidi
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* My Farms (List View) - Spans 7 columns */}
      <div className="md:col-span-7 bg-surface rounded-xl hairline-border p-6 soft-lift">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-title-md text-title-md text-on-surface">Mashamba Yangu</h3>
          <Link to="/farmer/crops" className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80">
            <span className="material-symbols-outlined">add</span>
            Ongeza
          </Link>
        </div>
        <div className="space-y-4">
          {/* Shamba 1 */}
          <Link to="/farmer/crops" className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">agriculture</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Shamba la Morogoro Kusini</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Hekta 4.5 • Mahindi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hatua ya zao</p>
                <p className="font-label-lg text-label-lg text-secondary">Kuchipua</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </Link>
          
          {/* Shamba 2 */}
          <Link to="/farmer/crops" className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">agriculture</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Shamba la Mvomero</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Hekta 2.0 • Alizeti</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hatua ya zao</p>
                <p className="font-label-lg text-label-lg text-secondary">Matayarisho</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Advisory & Marketplace Stats - Spans 5 columns */}
      <div className="md:col-span-5 space-y-6">
        {/* Open Advisory Requests */}
        <div className="bg-surface rounded-xl hairline-border p-6 soft-lift">
          <h3 className="font-title-md text-title-md text-on-surface mb-6">Ushauri wa Kitaalamu</h3>
          <div className="space-y-4">
            <div className="border-b border-outline-variant pb-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-label-lg text-label-lg text-on-surface">Ugonjwa wa Majani - Mahindi</p>
                <span className="bg-amber-ochre/10 text-amber-ochre px-2 py-0.5 rounded font-label-sm text-label-sm">PENDING</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">Nimeona madoa ya kijivu kwenye majani...</p>
              <p className="font-label-sm text-label-sm text-outline mt-2">Masaa 2 yaliyopita</p>
            </div>
            <div className="pb-2">
              <div className="flex justify-between items-start mb-1">
                <p className="font-label-lg text-label-lg text-on-surface">Mbolea ya Alizeti</p>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-sm text-label-sm">SOLVED</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">Unashauri nitumie mbolea gani kabla ya kupanda...</p>
              <p className="font-label-sm text-label-sm text-outline mt-2">Siku 3 zilizopita</p>
            </div>
          </div>
          <Link to="/farmer/advisory" className="w-full mt-6 border border-primary text-primary py-2 rounded-lg font-label-lg text-label-lg flex items-center justify-center hover:bg-primary-container/10 transition-all min-h-[48px]">
            Omba Ushauri Mpya
          </Link>
        </div>

        {/* Marketplace Listing Count */}
        <Link to="/farmer/market" className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 soft-lift flex items-center justify-between hover:opacity-95 transition-opacity cursor-pointer">
          <div>
            <p className="font-label-lg text-label-lg opacity-80">Matangazo ya Soko</p>
            <h4 className="font-display-md text-display-md font-bold mt-1">12 Active</h4>
            <p className="font-body-md text-body-md opacity-70 mt-1">Bidhaa zako sokoni kwa sasa</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">trending_up</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

import { useActiveListings } from '../features/marketplace/useMarketplace';
import { useCreateDeal, useBuyerDeals } from '../features/deals/useDeals';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

export const BuyerDashboard = () => {
  const { data: listings, isLoading: listingsLoading } = useActiveListings();
  const { data: deals, isLoading: dealsLoading } = useBuyerDeals();
  const createDealMutation = useCreateDeal();
  
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [selectedListingId, setSelectedListingId] = React.useState<string | null>(null);

  const initiateBuy = (listingId: string) => {
    setSelectedListingId(listingId);
    setIsConfirmOpen(true);
  };

  const handleConfirmBuy = async () => {
    if (!selectedListingId) return;
    try {
      await createDealMutation.mutateAsync(selectedListingId);
    } finally {
      setIsConfirmOpen(false);
      setSelectedListingId(null);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-gutter py-lg flex flex-col md:flex-row gap-lg">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Tuma Ofa ya Kununua"
        message="Je, una uhakika unataka kutuma ofa ya kununua bidhaa hii kwa mkulima? Hatua hii haiwezi kutenguliwa."
        confirmText="Ndio, Tuma Ofa"
        cancelText="Ghairi"
        isLoading={createDealMutation.isPending}
        onConfirm={handleConfirmBuy}
        onCancel={() => {
          setIsConfirmOpen(false);
          setSelectedListingId(null);
        }}
      />
      {/* Filter Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card_padding">
          <div className="flex items-center justify-between mb-md">
            <h2 className="font-title-md text-title-md text-on-surface">Vichujio</h2>
            <button className="text-label-sm text-primary hover:underline">Futa yote</button>
          </div>
          {/* Crop Type Filter */}
          <div className="mb-lg">
            <p className="font-label-lg text-label-lg text-on-surface-variant mb-sm">Aina ya Mazao</p>
            <div className="space-y-sm">
              <label className="flex items-center gap-sm cursor-pointer group">
                <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Mahindi (Maize)</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Mpunga (Rice)</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Maharage (Beans)</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Ngano (Wheat)</span>
              </label>
            </div>
          </div>
          {/* Region Filter */}
          <div className="mb-lg border-t border-outline-variant pt-lg">
            <p className="font-label-lg text-label-lg text-on-surface-variant mb-sm">Mkoa / Wilaya</p>
            <div className="space-y-sm">
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="region" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Iringa</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="region" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Zanzibar</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="region" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Morogoro</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="region" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Mbeya</span>
              </label>
            </div>
          </div>
          {/* Price Range */}
          <div className="border-t border-outline-variant pt-lg">
            <p className="font-label-lg text-label-lg text-on-surface-variant mb-sm">Bei (TZS/kg)</p>
            <div className="grid grid-cols-2 gap-sm">
              <input className="w-full text-xs p-2 rounded border border-outline-variant bg-background" placeholder="Kiwango cha chini" type="number"/>
              <input className="w-full text-xs p-2 rounded border border-outline-variant bg-background" placeholder="Kiwango cha juu" type="number"/>
            </div>
          </div>
        </div>
        {/* Weather Card Promo */}
        <div className="bg-primary text-on-primary rounded-xl p-card_padding relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-display-md mb-xs">cloudy_snowing</span>
            <h3 className="font-title-md text-title-md">Hali ya Hewa</h3>
            <p className="font-body-md opacity-90">Iringa: 24°C</p>
            <p className="font-label-sm text-label-sm mt-md uppercase tracking-wider">Angalia Utabiri →</p>
          </div>
        </div>
      </aside>

      {/* Marketplace Listings */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md">
          <div>
            <h1 className="font-display-md text-display-md font-bold text-on-surface">Viwango vya Soko</h1>
            <p className="text-on-surface-variant font-body-md">Bidhaa {listings?.length || 0} zilizopatikana nchini Tanzania</p>
          </div>
          <div className="flex items-center gap-sm">
            <span className="font-label-lg text-label-lg text-on-surface-variant whitespace-nowrap">Panga kwa:</span>
            <select className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 font-label-lg text-label-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bei ya Chini Kwanza</option>
              <option>Bei ya Juu Kwanza</option>
              <option>Mpya Zaidi</option>
            </select>
          </div>
        </div>

        {/* Bento Grid of Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg mb-xl">
          {listingsLoading ? (
            <div className="col-span-full p-8 text-center text-on-surface-variant">Inapakia bidhaa...</div>
          ) : listings?.length === 0 ? (
            <div className="col-span-full p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl">
              Hakuna bidhaa sokoni kwa sasa.
            </div>
          ) : (
            listings?.map(listing => (
              <div key={listing.id} className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group">
                <div className="relative h-48 w-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                  {listing.photoUrl ? (
                    <img src={listing.photoUrl} alt={listing.crop?.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-50">shopping_bag</span>
                  )}
                </div>
                <div className="p-card_padding flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-base">
                    <h3 className="font-title-md text-title-md text-on-surface">{listing.crop?.name}</h3>
                    <span className="text-primary font-bold text-lg">{listing.pricePerUnit?.toLocaleString()} <span className="text-xs font-normal">{listing.currency}/{listing.unit}</span></span>
                  </div>
                  <div className="space-y-sm mb-lg flex-1">
                    <div className="flex items-center gap-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span className="font-body-md">{listing.farmer?.name}</span>
                    </div>
                    <div className="flex items-center gap-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">inventory_2</span>
                      <span className="font-body-md">Kiasi: {listing.quantity?.toLocaleString()} {listing.unit}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => initiateBuy(listing.id)}
                    disabled={createDealMutation.isPending}
                    className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {createDealMutation.isPending ? 'Inatuma...' : <><span className="material-symbols-outlined">shopping_cart</span> Nunua / Weka Ofa</>}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="font-title-lg text-title-lg text-on-surface mb-4">Mikataba Yangu (My Deals)</h2>
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden mb-xl">
          {dealsLoading ? (
            <div className="p-8 text-center text-on-surface-variant">Inapakia mikataba...</div>
          ) : !deals || deals.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Hujatuma ofa yoyote bado.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                    <th className="p-4 font-semibold">Mkulima</th>
                    <th className="p-4 font-semibold">Zao</th>
                    <th className="p-4 font-semibold">Kiasi</th>
                    <th className="p-4 font-semibold">Jumla (TZS)</th>
                    <th className="p-4 font-semibold">Hali</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
                  {deals.map(deal => {
                    const totalPrice = (deal.listing?.quantity || 0) * (deal.listing?.pricePerUnit || 0);
                    return (
                      <tr key={deal.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-4 font-medium">{deal.farmer?.fullName || 'Mkulima'}</td>
                        <td className="p-4">{deal.listing?.crop?.name}</td>
                        <td className="p-4">{deal.listing?.quantity} {deal.listing?.unit}</td>
                        <td className="p-4">{totalPrice.toLocaleString()}</td>
                        <td className="p-4">
                          {deal.status === 'PENDING' && <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">Inasubiri</span>}
                          {deal.status === 'ACCEPTED' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Imekubaliwa</span>}
                          {deal.status === 'REJECTED' && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Imekataliwa</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-xxl flex justify-center items-center gap-sm">
          <button className="p-2 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full font-label-lg">1</button>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-lg">2</button>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-lg">3</button>
          <span className="text-on-surface-variant">...</span>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-lg">12</button>
          <button className="p-2 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-high">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </main>
  );
};

import { useState } from 'react';
import { usePendingAdvisories, useRespondAdvisory } from '../features/advisory/useAdvisory';

export const OfficerDashboard = () => {
  const { data: requests, isLoading } = usePendingAdvisories();
  const respondMutation = useRespondAdvisory();
  
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [responseNotes, setResponseNotes] = useState('');

  const handleRespond = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequestId || !responseNotes) return;
    
    await respondMutation.mutateAsync({ id: selectedRequestId, responseNotes });
    setSelectedRequestId(null);
    setResponseNotes('');
  };

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Maombi ya Wakulima (Advisory Queue)</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama na toa ushauri kwa wakulima kuhusu matatizo ya mazao yao.</p>
      </header>

      {isLoading ? (
        <div className="p-8 text-center text-on-surface-variant">Inapakia maombi...</div>
      ) : requests?.length === 0 ? (
        <div className="p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl bg-surface">
          Hakuna maombi mapya yanayosubiri ushauri.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests?.map(req => (
            <div key={req.id} className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
              {req.photoUrl && (
                <div className="w-full h-48 bg-surface-container-highest cursor-pointer" onClick={() => window.open(req.photoUrl, '_blank')}>
                  <img src={req.photoUrl} alt="Crop issue" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">
                    Inasubiri (Pending)
                  </span>
                  <span className="text-label-sm text-on-surface-variant">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="font-title-lg text-primary mb-1">{req.farm?.name}</h3>
                <p className="text-label-sm text-on-surface-variant mb-4 flex gap-2 items-center">
                  <span className="material-symbols-outlined text-sm">person</span> {req.farmer?.fullName || 'Mkulima'}
                  <span className="material-symbols-outlined text-sm ml-2">grass</span> {req.crop?.name}
                </p>
                
                <div className="bg-surface-container-lowest border border-outline-variant/50 p-4 rounded-lg mb-4 flex-1">
                  <p className="text-body-md text-on-surface">{req.description}</p>
                </div>
                
                {selectedRequestId === req.id ? (
                  <form onSubmit={handleRespond} className="mt-auto animate-in slide-in-from-top-2">
                    <label className="block text-label-sm font-bold mb-2 text-primary">Majibu / Ushauri wako:</label>
                    <textarea 
                      className="w-full p-3 border border-outline-variant rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-3"
                      rows={3}
                      placeholder="Andika ushauri wa kitaalamu hapa..."
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => { setSelectedRequestId(null); setResponseNotes(''); }}
                        className="flex-1 py-2 text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
                      >
                        Ghairi
                      </button>
                      <button 
                        type="submit" 
                        disabled={respondMutation.isPending}
                        className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-bold disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        {respondMutation.isPending ? 'Inatuma...' : 'Tuma Majibu'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setSelectedRequestId(req.id)}
                    className="w-full mt-auto bg-primary-container text-on-primary-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined">rate_review</span> Toa Ushauri
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useAdminStats, useAdminRecentUsers } from '../features/admin/useAdmin';

export const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users, isLoading: usersLoading } = useAdminRecentUsers();

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Admin Dashboard</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">System overview, metrics, and user management.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-xl">
        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant">Total Users</p>
            <p className="text-2xl font-bold text-on-surface">{statsLoading ? '...' : stats?.totalUsers}</p>
          </div>
        </div>
        
        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">storefront</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant">Marketplace Listings</p>
            <p className="text-2xl font-bold text-on-surface">{statsLoading ? '...' : stats?.totalListings}</p>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">handshake</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant">Total Deals</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-on-surface">{statsLoading ? '...' : stats?.totalDeals}</p>
              <p className="text-xs text-amber-600 mb-1">({stats?.pendingDeals} pending)</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-error-container text-on-error-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">forum</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant">Advisory Requests</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-on-surface">{statsLoading ? '...' : stats?.totalAdvisoryRequests}</p>
              <p className="text-xs text-amber-600 mb-1">({stats?.pendingAdvisories} pending)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <h2 className="text-title-lg font-bold mb-4">Recent Users</h2>
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        {usersLoading ? (
          <div className="p-8 text-center text-on-surface-variant">Loading users...</div>
        ) : !users || users.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Joined At</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
                {users.map(user => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const CropRecommendations = () => {
  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <nav className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm mb-sm">
          <span>Ushauri</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">Mapendekezo ya Mazao</span>
        </nav>
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Ushauri wa Mazao Dodoma</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Kulingana na hali ya udongo na hali ya hewa ya shamba lako huko Dodoma, hapa kuna mazao yanayoweza kukuletea faida kubwa zaidi msimu huu.</p>
      </header>

      {/* Results Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        
        {/* Card 1: Sunflower */}
        <div className="bg-surface border border-outline-variant rounded-xl p-card_padding flex flex-col gap-md transition-all hover:border-primary group">
          <div className="flex justify-between items-start">
            <div className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-lg flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span className="font-label-sm text-label-sm">Mahitaji Juu</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Hali: Inawezekana Sana</span>
          </div>
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover" alt="Sunflower" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2hGXIqT3QqveEvPF7l6sPcKxvN1dHmnukP99DPCMt-oII-auZuSyjy8Bg3A0382KPaYoM1p39dMv39ZEDdXinDoSXU8-tNzMmNMsLFKHYIs3YcEyMO3ReCQfgqb07-PeBBW7zY9lT65OY-leBttgk6Ptx_Km3CGnrbeCl7cre19ftIEDu9bHmPE0mRd6Ir1ohAcZtbcgCN9pNOwlqf9e3KHZiPBUvXg3E52MTWk9tPJQksTs2o0q"/>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Sunflower</h3>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-label-sm text-label-sm">Dodoma Central</span>
              </div>
            </div>
          </div>
          <div className="space-y-sm">
            <div className="flex justify-between items-end">
              <span className="font-label-lg text-label-lg text-on-surface">95% Match</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Optimal Soil</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '95%' }}></div>
            </div>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant flex-1">
            Alizeti inastahimili ukame wa Dodoma na soko la mafuta lina uhitaji mkubwa sana msimu huu.
          </p>
          <button className="w-full min-h-[48px] bg-primary text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors active:opacity-80">
            Orodhesha Zao Hili
          </button>
        </div>

        {/* Card 2: Beans */}
        <div className="bg-surface border border-outline-variant rounded-xl p-card_padding flex flex-col gap-md transition-all hover:border-primary group">
          <div className="flex justify-between items-start">
            <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-sm py-xs rounded-lg flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">sync</span>
              <span className="font-label-sm text-label-sm">Mahitaji ya Kati</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Hali: Inafaa</span>
          </div>
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover" alt="Beans" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmHbmKmewygDeycvZqios7pD_TlZd3fxZ7KIFVlchNelhLMdMQd9M6_OfansUizGNmU-QEhnFbbP0JQedEZxfcXrMv6QBIojWqp9lcNWmKHaViPpD1ZzuStxncoj2M2u4kE_nAFvF245YTr8H7IC-1gtrDMqCShdp0UievktwVvNk_Hlisb-cs8fsLvrRJIj5_0UaBDToJN9eDa4Bff0gUxAKuYKJGflhuQdpmqSPL8obFeTYGOj5"/>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Beans</h3>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-label-sm text-label-sm">Kongwa, Dodoma</span>
              </div>
            </div>
          </div>
          <div className="space-y-sm">
            <div className="flex justify-between items-end">
              <span className="font-label-lg text-label-lg text-on-surface">82% Match</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Good Moisture</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-secondary" style={{ width: '82%' }}></div>
            </div>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant flex-1">
            Maharagwe yanahitaji uangalizi wa unyevunyevu kidogo zaidi lakini yana soko la uhakika la ndani.
          </p>
          <button className="w-full min-h-[48px] bg-primary text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors active:opacity-80">
            Orodhesha Zao Hili
          </button>
        </div>

        {/* Card 3: Sesame */}
        <div className="bg-surface-bright border border-outline-variant rounded-xl p-card_padding flex flex-col gap-md transition-all border-error/30 hover:border-error group">
          <div className="flex justify-between items-start">
            <div className="bg-error/10 text-error px-sm py-xs rounded-lg flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span className="font-label-sm text-label-sm">Ushauri wa Kitaalamu</span>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover" alt="Sesame" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRHXniGxI2Ul28xPxp9A2LGkK_naBjXB3t_LlBpZ4KXGGgGVJtbAAKp7RsOi2qNpkI_1P2CYb4kGWbQDmikGBURasX1m99WeDva0dUMYJOTasTXl-WnlKxQcNp8PZCA5AxC3jVRFCgiejtwVvbVMqYtxb_bGukZhp8gG_6KNeAuvNHPXl7WmT7qIKaX8ezzWsodEHjWMO9HN8Ug2vLND2MmRcPavjOBAaOlYVFiJ2_Z8I8ZZg1bgL_"/>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Sesame</h3>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-label-sm text-label-sm">Bahi District</span>
              </div>
            </div>
          </div>
          <div className="space-y-sm">
            <div className="flex justify-between items-end">
              <span className="font-label-lg text-label-lg text-error">65% Match</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Rainfall Gap</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-error" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="bg-surface-container rounded-lg p-sm border border-outline-variant">
            <p className="text-body-md font-body-md text-on-surface-variant italic">
              "Sesame prefers less rainfall than your area gets. Nearby areas in Bahi district are better suited for this crop's peak yield."
            </p>
          </div>
          <button className="w-full min-h-[48px] bg-primary text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors active:opacity-80">
            Orodhesha Zao Hili
          </button>
        </div>
      </div>

      {/* Detailed Soil Stats Section */}
      <section className="mt-xxl border border-outline-variant rounded-xl overflow-hidden bg-surface">
        <div className="p-lg bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-title-md text-title-md text-on-surface">Uchambuzi wa Udongo (Dodoma Zone)</h2>
          <button className="text-primary font-label-lg text-label-lg flex items-center gap-xs">
            <span className="material-symbols-outlined">download</span> Pakua Ripoti Kamili
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="p-lg text-center">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-xs">pH Level</div>
            <div className="text-display-md font-display-md text-primary">6.8</div>
            <div className="text-on-secondary-container font-label-sm text-label-sm">Neutral</div>
          </div>
          <div className="p-lg text-center">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-xs">Nitrogen (N)</div>
            <div className="text-display-md font-display-md text-primary">Low</div>
            <div className="text-error font-label-sm text-label-sm">Requires Urea</div>
          </div>
          <div className="p-lg text-center">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-xs">Organic Matter</div>
            <div className="text-display-md font-display-md text-primary">2.4%</div>
            <div className="text-on-secondary-container font-label-sm text-label-sm">Improving</div>
          </div>
          <div className="p-lg text-center">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-xs">Water Retention</div>
            <div className="text-display-md font-display-md text-primary">Moderate</div>
            <div className="text-on-surface-variant font-label-sm text-label-sm">6-8 Days</div>
          </div>
        </div>
      </section>
    </div>
  );
};
