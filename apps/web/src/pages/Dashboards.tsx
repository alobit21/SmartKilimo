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
          <button className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80">
            <span className="material-symbols-outlined">add</span>
            Ongeza
          </button>
        </div>
        <div className="space-y-4">
          {/* Shamba 1 */}
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
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
          </div>
          
          {/* Shamba 2 */}
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
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
          </div>
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
          <button className="w-full mt-6 border border-primary text-primary py-2 rounded-lg font-label-lg text-label-lg hover:bg-primary-container/10 transition-all min-h-[48px]">
            Omba Ushauri Mpya
          </button>
        </div>

        {/* Marketplace Listing Count */}
        <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 soft-lift flex items-center justify-between">
          <div>
            <p className="font-label-lg text-label-lg opacity-80">Matangazo ya Soko</p>
            <h4 className="font-display-md text-display-md font-bold mt-1">12 Active</h4>
            <p className="font-body-md text-body-md opacity-70 mt-1">Bidhaa zako sokoni kwa sasa</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">trending_up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BuyerDashboard = () => {
  return (
    <main className="max-w-7xl mx-auto px-gutter py-lg flex flex-col md:flex-row gap-lg">
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
            <p className="text-on-surface-variant font-body-md">Bidhaa 128 zilizopatikana nchini Tanzania</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {/* Listing Card 1: Maize */}
          <div className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group">
            <div className="relative h-48 w-full overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Mahindi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1rJCPXJq5Cj8XA-uFTIW9iA2e97l8PYzkevYHMUAGKKpGUs2eGeeAc5YRc_H1VUvFMqnS2oLeX7cVhgMGWXsmZBqFhkgQAdMmu0YhCdSwjKId5FNZS4xVett72FO7XDnvjH5Nez1fyhywmLA-Ox37mAb9DlDYPO7Ej5PVA4-O8COSIJpOdYI2OwAMJEGBR6EZRjovvLzqallqIzxmrPHE963I0PEUOCi6EYEHfHGmAOD7X5ZT51qB"/>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">Premium</span>
              </div>
            </div>
            <div className="p-card_padding flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-base">
                <h3 className="font-title-md text-title-md text-on-surface">Mahindi ya Manjano</h3>
                <span className="text-primary font-bold text-lg">850 <span className="text-xs font-normal">TZS/kg</span></span>
              </div>
              <div className="space-y-sm mb-lg flex-1">
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body-md">Mufindi, Iringa</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span className="font-body-md">Kiasi: 2,500 kg</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span className="font-body-md">Imepakiwa: Leo</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75">View Detail</button>
            </div>
          </div>

          {/* Listing Card 2: Rice */}
          <div className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group">
            <div className="relative h-48 w-full overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Mpunga" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhviM77usSy_41aDBfpqLnSaGS0BGoXwtbD5FFcaVWxxOGbrq1xMCIKM4039EkYE93cgdCdykdOG9PVFG0xsWi3jjuWl76gpoS_Bhz7ExA5rUSwfH3-u3StZG1mDgboMrin0aNIyhWx1aOx9_DFHlgcuhMk_vhJjSYjaWfU8yekaGH64qTxdPMbz_io-90-x-Xerbs4Sl40_JA1_YxG-ceJ9Ct2C6NhpIpltF3-FV0RAepuo3CPaMJ"/>
            </div>
            <div className="p-card_padding flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-base">
                <h3 className="font-title-md text-title-md text-on-surface">Mpunga wa Kyela</h3>
                <span className="text-primary font-bold text-lg">1,200 <span className="text-xs font-normal">TZS/kg</span></span>
              </div>
              <div className="space-y-sm mb-lg flex-1">
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body-md">Kyela, Mbeya</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span className="font-body-md">Kiasi: 5,000 kg</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span className="font-body-md">Muuzaji Aliyethibitishwa</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75">View Detail</button>
            </div>
          </div>

          {/* Listing Card 3: Beans */}
          <div className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group">
            <div className="relative h-48 w-full overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Maharage" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzoHPTGEOmto_POllTPkXKNQakj4jLMqJPpiW2E8QVQT78P82rMDLB9TBK3ePvtcARkLz1kce-YC4vMGqjFh7Q0Fez4cXMecLJ37IO7CKGuxGZ0Am7z6IhpHsCORaxcp0gBkCF1_-sI-UxtsEY7H01dEnPNHxS-lUqx_x5U_WA_eTPdLEoly-kKoKw39tfIaVQZXf80104EKpLFRxIpQlfzGNOIxvMzZ7y7lFGX8Zq2TqLLsvmYy-n"/>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">Bei Nafuu</span>
              </div>
            </div>
            <div className="p-card_padding flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-base">
                <h3 className="font-title-md text-title-md text-on-surface">Maharage Meupe</h3>
                <span className="text-primary font-bold text-lg">2,100 <span className="text-xs font-normal">TZS/kg</span></span>
              </div>
              <div className="space-y-sm mb-lg flex-1">
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body-md">Arusha Urban</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span className="font-body-md">Kiasi: 800 kg</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant text-tertiary">
                  <span className="material-symbols-outlined text-sm">history</span>
                  <span className="font-body-md">Ofa Inamalizika Leo</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75">View Detail</button>
            </div>
          </div>

          {/* Listing Card 4: Specialized Case */}
          <div className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group col-span-1 lg:col-span-2 md:flex-row">
            <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Alizeti" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkdJagav-xZ9I7vpOHvlLfCZh8F3PPnIEAui1KD4Xo1Q6wzTbiyAPoFUvMwlTUXqArJKQYLNJG-1xKoPoQSBrfAkdviFpgKET_wxDx66wJXqZzdplnBDjUleOpg4iiR85FAATZIWFoBt-pl7_1mqzVx6cCLKVEbPpIueAPxIsSPd3DA7JkfirMqEDuU41UCH-_W6-Nl0ivgY-LuhFyKRF3BX2Hzo704mchYz7gpLPfuJUBJskRpR7r"/>
              <div className="absolute top-3 left-3">
                <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">Bulk Order</span>
              </div>
            </div>
            <div className="p-card_padding flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-base">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Mbegu za Alizeti (Sunflowers)</h3>
                  <span className="text-primary font-bold text-2xl">950 <span className="text-xs font-normal">TZS/kg</span></span>
                </div>
                <p className="text-on-surface-variant mb-md font-body-md line-clamp-2">Mazao bora kabisa ya msimu huu kutoka Singida. Mbegu zimekauka vizuri na zimekaguliwa kwa ubora wa kiwango cha kwanza.</p>
                <div className="grid grid-cols-2 gap-md mb-lg">
                  <div className="flex items-center gap-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="font-body-md">Manyoni, Singida</span>
                  </div>
                  <div className="flex items-center gap-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">inventory_2</span>
                    <span className="font-body-md">Kiasi: 15,000 kg</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-md">
                <button className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75">View Detail</button>
                <button className="px-4 py-3 border border-outline-variant text-primary rounded-xl font-label-lg text-label-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
            </div>
          </div>

          {/* Listing Card 5: Rice Zanzibar */}
          <div className="listing-card bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden soft-lift flex flex-col h-full group">
            <div className="relative h-48 w-full overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Mpunga Zanzibar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH_XXzXhzMaUfs6R6JesX0oYtheAdtX3x5AuQnLBlO-8EWXeM95wAi4QT97Yjky_VoA2sQGVSURhsH_TblfiquaqHVuAkpxXYmVtTWpfzfkroNifVP1KUfwjx2aLrTQe9Udw7jSAOEZDQZQddWBUt1ypzMnHDWCBf80XnYQLtD_eHgtiRD1GyAds1zL_hIm17DZpnYICcLoHFEK-IFT-GQ2LYPV9hHV5SNXDP1zJrGtVXbX2G-yoIn"/>
            </div>
            <div className="p-card_padding flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-base">
                <h3 className="font-title-md text-title-md text-on-surface">Mpunga wa Zanzibar</h3>
                <span className="text-primary font-bold text-lg">1,450 <span className="text-xs font-normal">TZS/kg</span></span>
              </div>
              <div className="space-y-sm mb-lg flex-1">
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body-md">Chake Chake, Pemba</span>
                </div>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span className="font-body-md">Kiasi: 1,200 kg</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-secondary transition-colors active:scale-95 duration-75">View Detail</button>
            </div>
          </div>
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

export const OfficerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Officer Dashboard</h2>
      <Card>
        <p>Advisory queue and farm problem reports.</p>
      </Card>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <Card>
        <p>System overview and user management.</p>
      </Card>
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
