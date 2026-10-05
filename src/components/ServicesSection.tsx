import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { OFFICIAL_WHATSAPP_DIGITS } from '../services/database';
import { Users, TrendingUp, Sparkles, Layers, ArrowUpRight, Check, MessageSquare } from 'lucide-react';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectServiceForForm: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectServiceForForm,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hr' | 'marketing' | 'cleaning' | 'allInOne'>('all');
  const t = translations[currentLang];

  const services = [
    {
      id: 'hr',
      title: t.services.hr.title,
      shortDesc: t.services.hr.shortDesc,
      fullDesc: t.services.hr.fullDesc,
      features: t.services.hr.features,
      statsNum: t.services.hr.statsNumber,
      statsLabel: t.services.hr.statsLabel,
      image: '/src/assets/images/service_hr_consultancy_1791191570479.jpg',
      icon: Users,
      badge: 'Talent & Compliance',
      waMessage: t.services.hr.waMessage,
    },
    {
      id: 'marketing',
      title: t.services.marketing.title,
      shortDesc: t.services.marketing.shortDesc,
      fullDesc: t.services.marketing.fullDesc,
      features: t.services.marketing.features,
      statsNum: t.services.marketing.statsNumber,
      statsLabel: t.services.marketing.statsLabel,
      image: '/src/assets/images/service_digital_marketing_1791191583715.jpg',
      icon: TrendingUp,
      badge: 'Growth & Analytics',
      waMessage: t.services.marketing.waMessage,
    },
    {
      id: 'cleaning',
      title: t.services.cleaning.title,
      shortDesc: t.services.cleaning.shortDesc,
      fullDesc: t.services.cleaning.fullDesc,
      features: t.services.cleaning.features,
      statsNum: t.services.cleaning.statsNumber,
      statsLabel: t.services.cleaning.statsLabel,
      image: '/src/assets/images/service_cleaning_commercial_1791191596618.jpg',
      icon: Sparkles,
      badge: 'Facility & Hygiene',
      waMessage: t.services.cleaning.waMessage,
    },
    {
      id: 'allInOne',
      title: t.services.allInOne.title,
      shortDesc: t.services.allInOne.shortDesc,
      fullDesc: t.services.allInOne.fullDesc,
      features: t.services.allInOne.features,
      statsNum: t.services.allInOne.statsNumber,
      statsLabel: t.services.allInOne.statsLabel,
      image: '/src/assets/images/service_all_in_one_solutions_1791191607360.jpg',
      icon: Layers,
      badge: 'Integrated Operations',
      waMessage: t.services.allInOne.waMessage,
    },
  ];

  const filteredServices = activeTab === 'all' ? services : services.filter((s) => s.id === activeTab);

  return (
    <section id="services" className="py-24 bg-[#F8FAF9] text-slate-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0A352D]">
            {t.services.sectionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Poppins']">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.services.subtitle}
          </p>

          {/* Interactive Filter Control */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-200/80 rounded-xl max-w-xl mx-auto mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hr')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'hr'
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              HR Consultancy
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('marketing')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'marketing'
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              Digital Marketing
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cleaning')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cleaning'
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              Cleaning & Facility
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('allInOne')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'allInOne'
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              All-In-One
            </button>
          </div>
        </div>

        {/* Services Grid with Asymmetric Bento Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            const waUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
              service.waMessage
            )}`;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Editorial Category Tag (Unboxed, typography with separator) */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <Icon className="w-3.5 h-3.5 text-[#DFC17B]" />
                    <span>{service.badge}</span>
                  </div>

                  {/* Quantitative proof metric on image */}
                  <div className="absolute bottom-4 right-4 text-right bg-[#06241E]/90 backdrop-blur-md border border-[#DFC17B]/40 px-3.5 py-1.5 rounded-lg text-white">
                    <span className="text-sm font-bold text-[#DFC17B] font-mono tabular-nums block">
                      {service.statsNum}
                    </span>
                    <span className="text-[10px] text-slate-300 tracking-wider">
                      {service.statsLabel}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Poppins'] group-hover:text-[#0A352D] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.fullDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#0A352D] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Row: Redirects directly to WhatsApp and pre-fills form */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A352D] hover:bg-[#07241E] text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current text-[#DFC17B]" />
                      <span>{t.services.inquireWhatsApp}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForForm(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A352D] hover:text-emerald-700 transition-colors py-2 px-1"
                    >
                      <span>{t.services.requestProposal}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
