import React from 'react';
import { Card } from '../components/ui/Card';
import { useMyListings } from '../features/marketplace/useMarketplace';

export const FarmerCrops = () => {
  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Usimamizi wa Mazao</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Fuatilia ukuaji wa mazao yako, ratiba za msimu, na matarajio ya mavuno.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
        {/* Farm Block A */}
        <div className="bg-surface border border-outline-variant rounded-xl p-card_padding hover:border-primary transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined">grass</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-on-surface">Kitalu A - Mahindi</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Eka 2.5 • Dodoma</p>
              </div>
            </div>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">Inakua Mzuri</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                <span>Maendeleo ya Ukuaji</span>
                <span>Siku 45 / 120</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '37.5%' }}></div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-lg flex justify-between items-center border border-outline-variant/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">water_drop</span>
                <span className="font-label-sm text-label-sm text-on-surface">Unyevu: 60% (Sawa)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <span className="material-symbols-outlined">warning</span>
                <span className="font-label-sm text-label-sm">Weka Mbolea (Siku 2)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-label-sm hover:opacity-90 transition-opacity">
              Sasisha Hali
            </button>
            <button className="flex-1 border border-outline-variant text-on-surface py-2 rounded-lg font-label-sm hover:bg-surface-container transition-colors">
              Tazama Ratiba
            </button>
          </div>
        </div>

        {/* Farm Block B */}
        <div className="bg-surface border border-outline-variant rounded-xl p-card_padding hover:border-primary transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center">
                <span className="material-symbols-outlined">filter_vintage</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-on-surface">Kitalu B - Alizeti</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Eka 1.0 • Kongwa</p>
              </div>
            </div>
            <span className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-label-sm text-label-sm">Maandalizi</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                <span>Maendeleo ya Ukuaji</span>
                <span>Siku 0 / 90</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-outline-variant" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-lg flex justify-between items-center border border-outline-variant/50">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="font-label-sm text-label-sm">Udongo Uko Tayari</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-label-sm hover:opacity-90 transition-opacity">
              Anza Kupanda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FarmerMarket = () => {
  const { data: listings, isLoading } = useMyListings();

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">Soko Langu</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">Dhibiti bidhaa zako unazouza na ofa kutoka kwa wanunuzi.</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span> Weka Bidhaa Sokoni
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
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
                  <div className="flex gap-4 mt-4">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs font-bold">Ofa Mpya</span>
                    <button className="text-primary font-label-sm hover:underline">Tazama Ofa</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
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
  return (
    <div className="flex-1 animate-in fade-in duration-500">
      <header className="mb-xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">Mikataba Yangu</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Tazama na udhibiti mikataba yako ya mauzo na wanunuzi mbalimbali.</p>
      </header>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="p-4 font-semibold">Mnunuzi</th>
                <th className="p-4 font-semibold">Zao</th>
                <th className="p-4 font-semibold">Kiasi</th>
                <th className="p-4 font-semibold">Bei Jumla</th>
                <th className="p-4 font-semibold">Tarehe ya Makabidhiano</th>
                <th className="p-4 font-semibold">Hali</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 font-body-sm text-on-surface">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-medium">Bakhresa Group</td>
                <td className="p-4">Mahindi</td>
                <td className="p-4">Tani 5</td>
                <td className="p-4">TZS 4,500,000</td>
                <td className="p-4">20 Sept 2026</td>
                <td className="p-4">
                  <span className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-xs font-medium">Imethibitishwa</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-primary hover:underline font-label-sm">Tazama</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-medium">Dodoma Millers</td>
                <td className="p-4">Alizeti</td>
                <td className="p-4">Tani 1.5</td>
                <td className="p-4">TZS 1,800,000</td>
                <td className="p-4">05 Okt 2026</td>
                <td className="p-4">
                  <span className="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-xs font-medium">Inasubiri Sahihi</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-primary hover:underline font-label-sm">Saini</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
