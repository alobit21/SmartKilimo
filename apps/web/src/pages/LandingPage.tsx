import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [lang, setLang] = useState<'SW' | 'EN'>('SW');
  const navigate = useNavigate();

  const handleLangToggle = () => {
    setLang(prev => prev === 'SW' ? 'EN' : 'SW');
  };

  return (
    <div className="text-on-surface bg-surface min-h-screen">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center px-4 py-4 w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-start font-display-md text-display-md font-bold text-primary">
            KilimoBora
          </div>
          
          {/* Center Navigation */}
          <nav className="hidden md:flex justify-center items-center gap-8 font-label-lg text-label-lg">
            <a className="text-primary border-b-[3px] border-primary pb-1 cursor-pointer" href="#">Soko</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Vipindi</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Ushauri</a>
          </nav>
          
          {/* Right Actions */}
          <div className="flex justify-end items-center gap-6">
            <button 
              onClick={handleLangToggle}
              className="flex items-center gap-1 font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
              <span>{lang === 'SW' ? 'Kiswahili' : 'English'}</span>
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer text-[22px]">notifications</span>
              <Link to="/login" className="material-symbols-outlined text-on-surface-variant cursor-pointer text-[22px]">account_circle</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-surface py-16 border-b border-outline-variant">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 flex flex-col gap-6">
              <h1 className="text-[40px] leading-[48px] md:text-[56px] md:leading-[64px] font-medium tracking-tight text-primary">
                {lang === 'SW' ? 'Jua nini cha kupanda, wapi, na nani atanunua' : 'Know what to plant, where, and who will buy'}
              </h1>
              <p className="font-body-lg text-[18px] leading-[28px] text-on-surface-variant max-w-[576px]">
                {lang === 'SW' 
                  ? 'KilimoBora huleta maarifa ya kisasa na masoko ya uhakika moja kwa moja mikononi mwa wakulima wa Kitanzania. Badili jembe lako kuwa biashara ya uhakika.' 
                  : 'KilimoBora brings modern insights and reliable markets straight to the hands of Tanzanian farmers. Turn your hoe into a guaranteed business.'}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button onClick={() => navigate('/register')} className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-lg text-label-lg hover:bg-primary/90 transition-all min-h-[48px] flex items-center justify-center">
                  {lang === 'SW' ? 'Anza Sasa Bure' : 'Start Now Free'}
                </button>
                <button className="border border-outline text-on-surface px-8 py-3.5 rounded-lg font-label-lg text-label-lg hover:bg-surface-container transition-all min-h-[48px] flex items-center justify-center">
                  {lang === 'SW' ? 'Tazama Bei za Soko' : 'View Market Prices'}
                </button>
              </div>
            </div>
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant h-[420px]">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A cinematic, high-detail photograph of a lush maize field in rural Tanzania during high midday." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3cE3x108Q-GYUslgNnHyjWGoa0zAyLjvEdkCnQlcNquNkdTHnGJEz7FtZwq2Ubja13idB3b1Tqp0mYw6PBc-292aSfPzGqjsVYPg-0XVwNEc8vfHQw-L10XhyGFYNcoHoMm99ZxDjap9kAVOkZu0LQhQmKFveeL5fhUN-YBUYblzEUDZLgLfHZNxc1lWXWaHHQd85WYEQMpFWzEY7N6_69AuG5uPp6UmdbM9JtZjeHl8R79um9Fql"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Role Based Selection (Bento Grid) */}
        <section className="bg-[#f7f7f5] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col gap-2 mb-8 text-center md:text-left">
              <span className="text-secondary font-label-lg text-label-lg uppercase tracking-widest">Huduma Zetu</span>
              <h2 className="font-display-md text-display-md text-on-surface">Chagua Funguo Yako ya Mafanikio</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Farmer Card */}
              <div onClick={() => navigate('/register')} className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="bg-primary-container w-12 h-12 rounded-lg flex items-center justify-center text-on-primary-container">
                  <span className="material-symbols-outlined">agriculture</span>
                </div>
                <h3 className="font-title-md text-title-md text-primary">Mkulima</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Pata ushauri wa mazao, ratiba za msimu, na ungana na wanunuzi moja kwa moja kutoka shambani kwako.</p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-primary font-label-lg group-hover:gap-2 transition-all">
                  <span>Fungua Akaunti</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
              {/* Buyer Card */}
              <div onClick={() => navigate('/register')} className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="bg-secondary-container w-12 h-12 rounded-lg flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <h3 className="font-title-md text-title-md text-primary">Mnunuzi</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Tafuta mazao bora kwa bei shindani. Agiza moja kwa moja na ufuatilie usafirishaji wa mizigo yako kwa urahisi.</p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-primary font-label-lg group-hover:gap-2 transition-all">
                  <span>Ingia Sokoni</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
              {/* Agricultural Officer */}
              <div onClick={() => navigate('/login')} className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="bg-tertiary-fixed w-12 h-12 rounded-lg flex items-center justify-center text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <h3 className="font-title-md text-title-md text-primary">Afisa Ugavi</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Dhibiti takwimu za wilaya, toa ushauri kwa vikundi vya wakulima na ufuatilie hali ya usalama wa chakula.</p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-primary font-label-lg group-hover:gap-2 transition-all">
                  <span>Dashboard ya Afisa</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
              {/* Admin */}
              <div onClick={() => navigate('/login')} className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="bg-surface-variant w-12 h-12 rounded-lg flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">settings</span>
                </div>
                <h3 className="font-title-md text-title-md text-primary">Msimamizi</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Simamia mfumo, dhibiti watumiaji, na hakikisha usalama wa miamala na mkataba yote ya kibiashara.</p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-primary font-label-lg group-hover:gap-2 transition-all">
                  <span>Ingia Jopo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b border-outline-variant">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center md:border-r border-outline-variant last:border-none">
                <div className="text-display-md font-bold text-primary">50k+</div>
                <div className="text-label-lg text-on-surface-variant">Wakulima Amilifu</div>
              </div>
              <div className="text-center md:border-r border-outline-variant last:border-none">
                <div className="text-display-md font-bold text-primary">TZS 12B</div>
                <div className="text-label-lg text-on-surface-variant">Miamala ya Soko</div>
              </div>
              <div className="text-center md:border-r border-outline-variant last:border-none">
                <div className="text-display-md font-bold text-primary">26</div>
                <div className="text-label-lg text-on-surface-variant">Mikoa ya Tanzania</div>
              </div>
              <div className="text-center border-none">
                <div className="text-display-md font-bold text-primary">150+</div>
                <div className="text-label-lg text-on-surface-variant">Maafisa Ugani</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resource / Editorial */}
        <section className="bg-surface py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-xl overflow-hidden border border-outline-variant shadow-sm aspect-square md:aspect-video">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A high-resolution, professional photograph of a farmer's hands holding a freshly harvested cassava root, still lightly covered in dry earth." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUDSP7Z_TDmet2gjppH4hhE4uPDpWPISa-vKfyJ0cRZAkT9zk-S4S6e1WI9la_qWAbI38zED_KD8mKE15N_FP3ZYz-jjESxlp7R05-9El9foJskrxEAjU8YXamO8DFmbLy6ssARVwzlhoddYih3jK7CgMk9CMHtkxJvyjnzvwkdZIakGuJBVgmOVSq6AWRYMeBkLkXqrrY4wxyWzZ4z-tkvUenuyblS6sH7H4evqJXi0g5wUGJ5jVI"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-4">
              <span className="text-secondary font-label-lg text-label-lg">Ushauri wa Kitaalamu</span>
              <h2 className="font-display-md text-display-md text-on-surface">Mbinu za Kisasa kwa Mazao ya Mizizi</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Gundua jinsi ya kuongeza tija kwenye kilimo cha muhogo kwa kutumia mbegu bora na mbolea asilia. Maafisa wetu wameandaa mwongozo kamili wa msimu huu.
              </p>
              <ul className="flex flex-col gap-2 mt-2">
                <li className="flex items-start gap-2 font-body-md text-body-md">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Uchaguzi wa mbegu bora zinazovumilia ukame</span>
                </li>
                <li className="flex items-start gap-2 font-body-md text-body-md">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Mbinu za kuzuia wadudu waharibifu wa mihogo</span>
                </li>
                <li className="flex items-start gap-2 font-body-md text-body-md">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Ratiba ya uvunaji kwa soko la kimataifa</span>
                </li>
              </ul>
              <a className="inline-flex items-center gap-1 font-label-lg text-primary mt-4 hover:underline underline-offset-4 transition-all" href="#">
                Soma Mwongozo Kamili
                <span className="material-symbols-outlined">north_east</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f7f7f5] py-12 border-y border-outline-variant">
          <div className="max-w-3xl mx-auto text-center px-4 flex flex-col gap-6">
            <h2 className="font-display-md text-display-md text-primary">Tayari Kukuza Uchumi Wako?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Jiunge na mtandao mkubwa zaidi wa kidijitali wa kilimo nchini Tanzania. Usipitwe na fursa za soko na habari za hali ya hewa.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => navigate('/register')} className="bg-primary text-on-primary px-12 py-4 rounded-lg font-label-lg text-label-lg hover:shadow-lg transition-all min-h-[48px]">
                Jisajili Leo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-inverse-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-8 w-full max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="font-title-md text-title-md text-primary-fixed">KilimoBora Tanzania</div>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-80 max-w-[320px] text-center md:text-left">
              Tukikuza tija, tunakuza Taifa. Programu rasmi ya usimamizi wa kilimo kidijitali.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm">
            <a className="text-on-surface-variant opacity-80 hover:text-primary-fixed transition-colors underline-offset-4 hover:underline" href="#">Faragha</a>
            <a className="text-on-surface-variant opacity-80 hover:text-primary-fixed transition-colors underline-offset-4 hover:underline" href="#">Sheria</a>
            <a className="text-on-surface-variant opacity-80 hover:text-primary-fixed transition-colors underline-offset-4 hover:underline" href="#">Wasiliana</a>
          </nav>
          <div className="font-body-md text-body-md text-inverse-on-surface opacity-80 text-center md:text-right">
            © 2024 KilimoBora Tanzania. Haki zote zimehifadhiwa.
          </div>
        </div>
      </footer>
    </div>
  );
};
