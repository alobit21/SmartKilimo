import { create } from 'zustand';

type Language = 'sw' | 'en';

interface TranslationStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// English Translations
const enTranslations: Record<string, string> = {
  // Navigation / Sidebar
  'nav.dashboard': 'Dashboard',
  'nav.crops': 'My Farms & Crops',
  'nav.market': 'Marketplace',
  'nav.advisory': 'Expert Advisory',
  'nav.settings': 'Settings',
  'nav.logout': 'Logout',
  'nav.password': 'Change Password',
  
  // Dashboard - Farmer
  'farmer.weather.title': 'Weather Forecast',
  'farmer.weather.humidity': 'Humidity',
  'farmer.weather.wind': 'Wind Speed',
  'farmer.weather.uv': 'UV Index',
  
  'farmer.recommendations.badge': 'New Recommendation',
  'farmer.recommendations.title': 'Plant Maize this season',
  'farmer.recommendations.desc': 'Statistics show a high demand for maize in August in the Dodoma market. It is recommended to plant SC419 seeds.',
  'farmer.recommendations.button': 'Read More Details',
  
  'farmer.farms.title': 'My Farms',
  'farmer.farms.add': 'Add Farm',
  'farmer.farms.stage': 'Crop Stage',
  
  'farmer.advisory.title': 'Expert Advisory',
  'farmer.advisory.new': 'Request New Advice',
  
  'farmer.market.stats.title': 'Market Ads',
  'farmer.market.stats.desc': 'Your products currently in the market',
  
  // Market Prices Widget
  'market.prices.title': 'Market Prices (Major Markets)',
  'market.prices.all': 'All Tanzania',
  'market.prices.loading': 'Loading prices...',
  'market.prices.empty': 'No market data available at the moment.',
  'market.prices.per': 'per',

  // Language toggle
  'lang.switch': 'Switch to Swahili',

  // Modals & Actions
  'action.save': 'Save Changes',
  'action.cancel': 'Cancel',
  'action.loading': 'Loading...',
  'action.delete': 'Delete',
  'action.update': 'Update Status',
  'status.new': 'New Nursery',
  'status.growing': 'Growing Well',
  'status.needs_water': 'Needs Water/Fertilizer',
  'status.ready': 'Ready to Harvest',
  'status.pests': 'Attacked by Pests',

  // Crop Recommendations
  'crop.rec.title': 'Crop Recommendations',
  'crop.rec.desc': 'Based on your soil and weather conditions, here are the most profitable crops for this season.',
  'crop.rec.high_demand': 'High Demand',
  'crop.rec.medium_demand': 'Medium Demand',
  'crop.rec.normal': 'Normal Crop',
  'crop.rec.highly_possible': 'Status: Highly Possible',
  'crop.rec.suitable': 'Status: Suitable',
  'crop.rec.match': 'Match',
  'crop.rec.rain': 'Rainfall',
  'crop.rec.list_crop': 'List this Crop',
  'crop.rec.empty': 'No crop recommendations found.',
  'crop.rec.loading': 'Loading recommendations from FAO System...',
  // Landing Page
  'landing.market': 'Market',
  'landing.episodes': 'Episodes',
  'landing.advisory': 'Advisory',
  'landing.lang': 'Kiswahili',
  'landing.hero.title': 'Know what to plant, where, and who will buy',
  'landing.hero.desc': 'KilimoBora brings modern insights and reliable markets straight to the hands of Tanzanian farmers. Turn your hoe into a guaranteed business.',
  'landing.hero.start': 'Start Now Free',
  'landing.hero.view_prices': 'View Market Prices',
  'landing.services.subtitle': 'Our Services',
  'landing.services.title': 'Choose Your Key to Success',
  
  'landing.role.farmer.title': 'Farmer',
  'landing.role.farmer.desc': 'Get crop advice, seasonal schedules, and connect with buyers directly from your farm.',
  'landing.role.farmer.action': 'Open Account',
  
  'landing.role.buyer.title': 'Buyer',
  'landing.role.buyer.desc': 'Find quality crops at competitive prices. Order directly and track shipments easily.',
  'landing.role.buyer.action': 'Enter Market',
  
  'landing.role.officer.title': 'Agricultural Officer',
  'landing.role.officer.desc': 'Manage district stats, advise farmer groups, and track food security status.',
  'landing.role.officer.action': 'Officer Dashboard',
  
  'landing.role.admin.title': 'Admin',
  'landing.role.admin.desc': 'Manage the system, handle users, and ensure the security of all commercial transactions.',
  'landing.role.admin.action': 'Enter Panel',

  'landing.stats.farmers': 'Farmers',
  'landing.stats.experts': 'Experts',
  'landing.stats.deals': 'Successful Deals',
  'landing.stats.regions': 'Regions Reached',
  'landing.stats.active_farmers': 'Active Farmers',
  'landing.stats.market_tx': 'Market Transactions',
  'landing.stats.tanzania_regions': 'Regions in Tanzania',
  'landing.stats.ext_officers': 'Extension Officers',
  'landing.guide.tag': 'Expert Advisory',
  'landing.guide.title': 'Modern Techniques for Root Crops',
  'landing.guide.desc': 'Discover how to increase productivity in cassava farming using quality seeds and organic fertilizers. Our officers have prepared a complete guide for this season.',
  'landing.guide.bullet1': 'Selection of drought-tolerant quality seeds',
  'landing.guide.bullet2': 'Methods to prevent destructive pests in cassava',
  'landing.guide.bullet3': 'Harvest schedule for the international market',
  'landing.guide.link': 'Read Full Guide',
  'landing.cta.title': 'Ready to Grow Your Economy?',
  'landing.cta.desc': 'Join the largest digital agriculture network in Tanzania. Do not miss market opportunities and weather news.',
  'landing.cta.btn': 'Register Today',
  'landing.footer.slogan': 'By growing productivity, we grow the Nation. The official digital agriculture management application.',
  'landing.footer.copyright': '© 2024 KilimoBora Tanzania. All rights reserved.',
  'landing.footer.privacy': 'Privacy',
  'landing.footer.legal': 'Legal',
  'landing.footer.contact': 'Contact Us',

  // Auth
  'auth.login.title': 'Welcome Back',
  'auth.login.desc': 'Enter your credentials to continue',
  'auth.login.identifier': 'Email or Phone',
  'auth.login.password': 'Password',
  'auth.login.button': 'Login',
  'auth.login.no_account': 'Don\'t have an account?',
  'auth.login.register': 'Register',

  'auth.register.title': 'Join KilimoBora',
  'auth.register.desc': 'Create an account to start your journey',
  'auth.register.name': 'Full Name',
  'auth.register.role': 'Choose Role',
  'auth.register.role.farmer': 'Farmer',
  'auth.register.role.buyer': 'Buyer',
  'auth.register.button': 'Register',
  'auth.register.has_account': 'Already have an account?',
  'auth.register.login': 'Login',
  
  // Dashboards
  'dashboard.greeting': 'Hello',
  'dashboard.today': 'Today is',
  'dashboard.send_report': 'Send Report',
  'dashboard.admin.users': 'Users',
  'dashboard.admin.listings': 'Listings',
  'dashboard.admin.deals': 'Deals',
  'dashboard.admin.advisories': 'Advisory Requests',
  'dashboard.admin.recent_users': 'Recent Users',
  
  // Dashboard Items
  'dash.rec.badge': 'Maize - Major Market',
  'dash.rec.desc': 'Statistics show a high demand for maize in August in the Dodoma market. It is recommended to plant SC419 seeds.',
  'dash.farm1.name': 'Morogoro South Farm',
  'dash.farm2.name': 'Mvomero Farm',
  'dash.market.title': 'Market Rates',
  'dash.market.empty': 'No products in the market match your filters right now.',
  'dash.report.dl': 'Report is downloading. Please wait...',
  'dash.crop.match_high': 'This crop matches your climate perfectly, and its market is currently very good.',
  'dash.crop.match_med': 'This crop matches your climate well, and its market is average.',
  
  // Deals
  'deals.title': 'My Deals',
  'deals.farmer': 'Farmer',
  'deals.buyer': 'Buyer',
  'deals.crop': 'Crop',
  'deals.quantity': 'Quantity',
  'deals.total': 'Total (TZS)',
  'deals.status': 'Status',
  'deals.actions': 'Actions',
  'deals.empty': 'No deals found.',
  'deals.pending': 'Pending',
  'deals.accepted': 'Accepted',
  'deals.rejected': 'Rejected',
  'deals.cancel': 'Cancel Offer',
  'deals.buy': 'Buy / Place Offer',
  
  // Farmer Pages
  'farmer.crops.title': 'Crop Management',
  'farmer.crops.desc': 'Track your crop growth, seasonal schedules, and expected yields.',
  'farmer.crops.add': 'Register New Farm',
  'farmer.crops.name': 'Farm Name',
  'farmer.crops.size': 'Size (Hectares)',
  'farmer.crops.location': 'Farm Location (Search on map)',
  'farmer.crops.soil': 'Soil Type (Optional)',
  'farmer.crops.save': 'Save Farm',
  'farmer.crops.updating': 'Updating...',
  'farmer.crops.update_status': 'Update Status',
  'farmer.crops.status.current': 'Current Status',
  'farmer.crops.progress': 'Growth Progress',
  'farmer.crops.status.new': 'New Farm',
  'farmer.crops.status.growing': 'Growing Well',
  'farmer.crops.status.water': 'Needs Water/Fertilizer',
  'farmer.crops.status.ready': 'Ready to Harvest',
  'farmer.crops.status.pest': 'Pest Attack',
  
  'farmer.market.title': 'My Market',
  'farmer.market.desc': 'Manage your listings and set prices for your harvest.',
  'farmer.market.add': 'Post Advertisement',
  
  'farmer.advisory.title': 'Expert Advisory',
  'farmer.advisory.desc': 'Ask our experts about pests, soil health, or any farming challenges.',
  'farmer.advisory.ask': 'Ask Question',
};

// Swahili Translations
const swTranslations: Record<string, string> = {
  // Navigation / Sidebar
  'nav.dashboard': 'Dashibodi',
  'nav.crops': 'Mashamba na Mazao',
  'nav.market': 'Soko',
  'nav.advisory': 'Ushauri',
  'nav.settings': 'Mipangilio',
  'nav.logout': 'Ondoka',
  'nav.password': 'Badilisha Nenosiri',
  
  // Dashboard - Farmer
  'farmer.weather.title': 'Hali ya Hewa',
  'farmer.weather.humidity': 'Unyevu',
  'farmer.weather.wind': 'Kasi ya Upepo',
  'farmer.weather.uv': 'Mionzi (UV)',
  
  'farmer.recommendations.badge': 'Pendekezo Jipya',
  'farmer.recommendations.title': 'Panda Mahindi msimu huu',
  'farmer.recommendations.desc': 'Takwimu zinaonyesha uhitaji mkubwa wa mahindi mwezi Agosti katika soko la Dodoma. Inashauriwa kupanda mbegu za aina ya SC419.',
  'farmer.recommendations.button': 'Soma Maelezo Zaidi',
  
  'farmer.farms.title': 'Mashamba Yangu',
  'farmer.farms.add': 'Ongeza',
  'farmer.farms.stage': 'Hatua ya zao',
  
  'farmer.advisory.title': 'Ushauri wa Kitaalamu',
  'farmer.advisory.new': 'Omba Ushauri Mpya',
  
  'farmer.market.stats.title': 'Matangazo ya Soko',
  'farmer.market.stats.desc': 'Bidhaa zako sokoni kwa sasa',
  
  // Market Prices Widget
  'market.prices.title': 'Bei za Soko (Soko Mkuu)',
  'market.prices.all': 'Tanzania Zote',
  'market.prices.loading': 'Inapakia bei...',
  'market.prices.empty': 'Hakuna takwimu za soko kwa sasa.',
  'market.prices.per': 'kwa',

  // Language toggle
  'lang.switch': 'Badili lugha (English)',

  // Modals & Actions
  'action.save': 'Hifadhi Mabadiliko',
  'action.cancel': 'Ghairi',
  'action.loading': 'Inapakia...',
  'action.delete': 'Futa',
  'action.update': 'Sasisha Hali',
  'status.new': 'Kitalu Kipya',
  'status.growing': 'Inakua Mzuri',
  'status.needs_water': 'Inahitaji Maji/Mbolea',
  'status.ready': 'Tayari Kuvunwa',
  'status.pests': 'Imeshambuliwa na Wadudu',

  // Crop Recommendations
  'crop.rec.title': 'Mapendekezo ya Mazao',
  'crop.rec.desc': 'Kulingana na hali ya udongo na hali ya hewa ya shamba lako, hapa kuna mazao yanayoweza kukuletea faida kubwa zaidi msimu huu.',
  'crop.rec.high_demand': 'Mahitaji Juu',
  'crop.rec.medium_demand': 'Mahitaji ya Kati',
  'crop.rec.normal': 'Zao la Kawaida',
  'crop.rec.highly_possible': 'Hali: Inawezekana Sana',
  'crop.rec.suitable': 'Hali: Inafaa',
  'crop.rec.match': 'Match',
  'crop.rec.rain': 'Mvua',
  'crop.rec.list_crop': 'Orodhesha Zao Hili',
  'crop.rec.empty': 'Hakuna taarifa za mazao zilizopatikana.',
  'crop.rec.loading': 'Inapakia Mapendekezo kutoka Mfumo wa FAO...',
  // Landing Page
  'landing.market': 'Soko',
  'landing.episodes': 'Vipindi',
  'landing.advisory': 'Ushauri',
  'landing.lang': 'English',
  'landing.hero.title': 'Jua nini cha kupanda, wapi, na nani atanunua',
  'landing.hero.desc': 'KilimoBora huleta maarifa ya kisasa na masoko ya uhakika moja kwa moja mikononi mwa wakulima wa Kitanzania. Badili jembe lako kuwa biashara ya uhakika.',
  'landing.hero.start': 'Anza Sasa Bure',
  'landing.hero.view_prices': 'Tazama Bei za Soko',
  'landing.services.subtitle': 'Huduma Zetu',
  'landing.services.title': 'Chagua Funguo Yako ya Mafanikio',
  
  'landing.role.farmer.title': 'Mkulima',
  'landing.role.farmer.desc': 'Pata ushauri wa mazao, ratiba za msimu, na ungana na wanunuzi moja kwa moja kutoka shambani kwako.',
  'landing.role.farmer.action': 'Fungua Akaunti',
  
  'landing.role.buyer.title': 'Mnunuzi',
  'landing.role.buyer.desc': 'Tafuta mazao bora kwa bei shindani. Agiza moja kwa moja na ufuatilie usafirishaji wa mizigo yako kwa urahisi.',
  'landing.role.buyer.action': 'Ingia Sokoni',
  
  'landing.role.officer.title': 'Afisa Ugavi',
  'landing.role.officer.desc': 'Dhibiti takwimu za wilaya, toa ushauri kwa vikundi vya wakulima na ufuatilie hali ya usalama wa chakula.',
  'landing.role.officer.action': 'Dashboard ya Afisa',
  
  'landing.role.admin.title': 'Msimamizi',
  'landing.role.admin.desc': 'Simamia mfumo, dhibiti watumiaji, na hakikisha usalama wa miamala na mkataba yote ya kibiashara.',
  'landing.role.admin.action': 'Ingia Jopo',

  'landing.stats.farmers': 'Wakulima',
  'landing.stats.experts': 'Wataalamu',
  'landing.stats.deals': 'Miamala Iliyofanikiwa',
  'landing.stats.regions': 'Mikoa Tuliopo',
  'landing.stats.active_farmers': 'Wakulima Amilifu',
  'landing.stats.market_tx': 'Miamala ya Soko',
  'landing.stats.tanzania_regions': 'Mikoa ya Tanzania',
  'landing.stats.ext_officers': 'Maafisa Ugani',
  'landing.guide.tag': 'Ushauri wa Kitaalamu',
  'landing.guide.title': 'Mbinu za Kisasa kwa Mazao ya Mizizi',
  'landing.guide.desc': 'Gundua jinsi ya kuongeza tija kwenye kilimo cha muhogo kwa kutumia mbegu bora na mbolea asilia. Maafisa wetu wameandaa mwongozo kamili wa msimu huu.',
  'landing.guide.bullet1': 'Uchaguzi wa mbegu bora zinazovumilia ukame',
  'landing.guide.bullet2': 'Mbinu za kuzuia wadudu waharibifu wa mihogo',
  'landing.guide.bullet3': 'Ratiba ya uvunaji kwa soko la kimataifa',
  'landing.guide.link': 'Soma Mwongozo Kamili',
  'landing.cta.title': 'Tayari Kukuza Uchumi Wako?',
  'landing.cta.desc': 'Jiunge na mtandao mkubwa zaidi wa kidijitali wa kilimo nchini Tanzania. Usipitwe na fursa za soko na habari za hali ya hewa.',
  'landing.cta.btn': 'Jisajili Leo',
  'landing.footer.slogan': 'Tukikuza tija, tunakuza Taifa. Programu rasmi ya usimamizi wa kilimo kidijitali.',
  'landing.footer.copyright': '© 2024 KilimoBora Tanzania. Haki zote zimehifadhiwa.',
  'landing.footer.privacy': 'Faragha',
  'landing.footer.legal': 'Sheria',
  'landing.footer.contact': 'Wasiliana',

  // Auth
  'auth.login.title': 'Karibu Tena',
  'auth.login.desc': 'Ingiza taarifa zako ili kuendelea',
  'auth.login.identifier': 'Barua pepe au Simu',
  'auth.login.password': 'Nenosiri',
  'auth.login.button': 'Ingia',
  'auth.login.no_account': 'Huna akaunti?',
  'auth.login.register': 'Jisajili',

  'auth.register.title': 'Jiunge na KilimoBora',
  'auth.register.desc': 'Tengeneza akaunti ili kuanza safari yako',
  'auth.register.name': 'Jina Kamili',
  'auth.register.role': 'Chagua Wadhifa',
  'auth.register.role.farmer': 'Mkulima',
  'auth.register.role.buyer': 'Mnunuzi',
  'auth.register.button': 'Jisajili',
  'auth.register.has_account': 'Tayari una akaunti?',
  'auth.register.login': 'Ingia',
  
  // Dashboards
  'dashboard.greeting': 'Hujambo',
  'dashboard.today': 'Leo ni tarehe',
  'dashboard.send_report': 'Tuma Ripoti',
  'dashboard.admin.users': 'Watumiaji',
  'dashboard.admin.listings': 'Matangazo Sokoni',
  'dashboard.admin.deals': 'Miamala',
  'dashboard.admin.advisories': 'Maombi ya Ushauri',
  'dashboard.admin.recent_users': 'Watumiaji Wapya',
  
  // Dashboard Items
  'dash.rec.badge': 'Mahindi - Soko Kubwa',
  'dash.rec.desc': 'Takwimu zinaonyesha uhitaji mkubwa wa mahindi mwezi Agosti katika soko la Dodoma. Inashauriwa kupanda mbegu za aina ya SC419.',
  'dash.farm1.name': 'Shamba la Morogoro Kusini',
  'dash.farm2.name': 'Shamba la Mvomero',
  'dash.market.title': 'Viwango vya Soko',
  'dash.market.empty': 'Hakuna bidhaa sokoni kwa sasa inayokidhi vichujio vyako.',
  'dash.report.dl': 'Ripoti inapakuliwa. Tafadhali subiri...',
  'dash.crop.match_high': 'Zao hili linaendana na hali ya hewa ya eneo lako, na soko lake kwa sasa lipo vizuri sana.',
  'dash.crop.match_med': 'Zao hili linaendana na hali ya hewa ya eneo lako, na soko lake kwa sasa lipo katika hali ya kawaida.',
  
  // Deals
  'deals.title': 'Mikataba Yangu (My Deals)',
  'deals.farmer': 'Mkulima',
  'deals.buyer': 'Mnunuzi',
  'deals.crop': 'Zao',
  'deals.quantity': 'Kiasi',
  'deals.total': 'Jumla (TZS)',
  'deals.status': 'Hali',
  'deals.actions': 'Vitendo',
  'deals.empty': 'Hujatuma ofa yoyote bado.',
  'deals.pending': 'Inasubiri',
  'deals.accepted': 'Imekubaliwa',
  'deals.rejected': 'Imekataliwa',
  'deals.cancel': 'Ghairi Ofa',
  'deals.buy': 'Nunua / Weka Ofa',
  
  // Farmer Pages
  'farmer.crops.title': 'Usimamizi wa Mazao',
  'farmer.crops.desc': 'Fuatilia ukuaji wa mazao yako, ratiba za msimu, na matarajio ya mavuno.',
  'farmer.crops.add': 'Sajili Kitalu Kipya',
  'farmer.crops.name': 'Jina la Kitalu/Shamba',
  'farmer.crops.size': 'Ukubwa (Hekari)',
  'farmer.crops.location': 'Eneo la Kitalu (Tafuta kwenye ramani)',
  'farmer.crops.soil': 'Aina ya Udongo (Hiari)',
  'farmer.crops.save': 'Hifadhi Kitalu Kipya',
  'farmer.crops.updating': 'Inasasisha...',
  'farmer.crops.update_status': 'Sasisha Hali',
  'farmer.crops.status.current': 'Hali ya Sasa',
  'farmer.crops.progress': 'Maendeleo ya Ukuaji',
  'farmer.crops.status.new': 'Kitalu Kipya',
  'farmer.crops.status.growing': 'Inakua Mzuri',
  'farmer.crops.status.water': 'Inahitaji Maji/Mbolea',
  'farmer.crops.status.ready': 'Tayari Kuvunwa',
  'farmer.crops.status.pest': 'Imeshambuliwa na Wadudu',

  'farmer.market.title': 'Soko Langu',
  'farmer.market.desc': 'Dhibiti matangazo yako ya biashara na upange bei ya mavuno yako.',
  'farmer.market.add': 'Weka Tangazo Sokoni',

  'farmer.advisory.title': 'Ushauri wa Wataalamu',
  'farmer.advisory.desc': 'Uliza maswali juu ya wadudu, afya ya udongo au changamoto yoyote ya shamba lako.',
  'farmer.advisory.ask': 'Uliza Swali',
};

const dictionaries: Record<Language, Record<string, string>> = {
  en: enTranslations,
  sw: swTranslations,
};

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: 'sw', // default to swahili
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const { language } = get();
    return dictionaries[language][key] || key;
  },
}));

export const useTranslation = () => {
  const { language, setLanguage, t } = useTranslationStore();
  
  const toggleLanguage = () => {
    setLanguage(language === 'sw' ? 'en' : 'sw');
  };
  
  return { t, language, toggleLanguage };
};
