import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { OFFICIAL_WHATSAPP_DIGITS, OFFICIAL_PHONE } from '../services/database';
import { Play, MessageSquare, ArrowRight, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  currentLang: Language;
  onOpenVideoModal: () => void;
  onSelectService: (serviceId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentLang,
  onOpenVideoModal,
  onSelectService,
}) => {
  const [activeTab, setActiveTab] = useState<'hr' | 'marketing' | 'cleaning' | 'allInOne'>('allInOne');
  const t = translations[currentLang];

  const whatsappHeroUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    currentLang === 'ne'
      ? 'नमस्ते Aspire Global Management, म तपाईंको कर्पोरेट सेवाहरू (HR, Marketing, Cleaning, All-in-One) बारे कुराकानी गर्न चाहन्छु।'
      : currentLang === 'ar'
      ? 'مرحباً أسباير جلوبال مانجمنت، أود الاستفسار عن باقات الخدمات المؤسسية لديكم.'
      : 'Hello Aspire Global Management, I am contacting you regarding your corporate services (HR, Digital Marketing, Cleaning, All-in-One Solutions).'
  )}`;

  const serviceHighlights = [
    {
      id: 'hr',
      num: '01',
      title: t.services.hr.title,
      summary: t.services.hr.shortDesc,
      metric: t.services.hr.statsNumber,
      label: t.services.hr.statsLabel,
    },
    {
      id: 'marketing',
      num: '02',
      title: t.services.marketing.title,
      summary: t.services.marketing.shortDesc,
      metric: t.services.marketing.statsNumber,
      label: t.services.marketing.statsLabel,
    },
    {
      id: 'cleaning',
      num: '03',
      title: t.services.cleaning.title,
      summary: t.services.cleaning.shortDesc,
      metric: t.services.cleaning.statsNumber,
      label: t.services.cleaning.statsLabel,
    },
    {
      id: 'allInOne',
      num: '04',
      title: t.services.allInOne.title,
      summary: t.services.allInOne.shortDesc,
      metric: t.services.allInOne.statsNumber,
      label: t.services.allInOne.statsLabel,
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#06241E]">
      {/* Background Video / Visual Layer with Cinematic Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Video Loop with Fallback Image */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/hero_corporate_dubai_1791191557541.jpg"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-105 scale-105 transition-transform duration-1000"
        >
          {/* Official Aspire Global Management corporate video loop */}
          <source
            src="/aspire_corporate_showcase.mp4"
            type="video/mp4"
          />
        </video>

        {/* Multi-stage Luxury Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06241E]/95 via-[#06241E]/85 to-[#06241E]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#06241E]/60 to-[#06241E] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#06241E] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            {/* Trust badge with subtle typography */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#DFC17B]/40 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#DFC17B]" />
              <span className="text-xs font-semibold tracking-wide text-slate-100">
                {t.hero.badge}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-['Poppins']">
              <span>{t.hero.titlePrimary} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFC17B] via-[#F3E3BE] to-[#DFC17B] block mt-1">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary: WhatsApp Instant Redirect */}
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#DFC17B] hover:bg-[#ebd5a2] text-[#06241E] font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-[#DFC17B]/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.hero.ctaPrimary}</span>
                <span className="text-xs opacity-75 font-mono">({OFFICIAL_PHONE})</span>
              </a>

              {/* Secondary: Watch Corporate Video */}
              <button
                type="button"
                onClick={onOpenVideoModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide rounded-xl border border-white/20 backdrop-blur-md transition-all hover:border-[#DFC17B]/60 active:scale-95 group"
              >
                <div className="w-6 h-6 rounded-full bg-[#DFC17B] flex items-center justify-center text-[#06241E] group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#DFC17B]" />
                <span>Direct WhatsApp Inquiries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#DFC17B]" />
                <span>Licensed UAE Operations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#DFC17B]" />
                <span>Single SLA Accountability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Video Preview & Brand Seal Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-[#072B24]/90 border border-[#DFC17B]/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
              {/* Circular Emblem Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <BrandLogo size={52} />
                  <div>
                    <h3 className="text-white font-bold text-base font-['Poppins']">
                      Aspire Global
                    </h3>
                    <p className="text-[11px] text-[#DFC17B] uppercase tracking-wider font-semibold">
                      Management Portfolio
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DFC17B]/20 hover:bg-[#DFC17B]/30 border border-[#DFC17B]/40 text-[#DFC17B] rounded-lg text-xs font-semibold transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play Video</span>
                </button>
              </div>

              {/* Service Tab Selectors */}
              <div className="grid grid-cols-2 gap-2 my-4">
                {serviceHighlights.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(srv.id as any);
                      onSelectService(srv.id);
                    }}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      activeTab === srv.id
                        ? 'border-[#DFC17B] bg-[#0A352D] text-white shadow-md'
                        : 'border-white/10 bg-black/20 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#DFC17B] block font-bold">
                      {srv.num}
                    </span>
                    <p className="font-bold line-clamp-1 mt-0.5">{srv.title}</p>
                  </button>
                ))}
              </div>

              {/* Active Tab Highlight Preview */}
              {(() => {
                const cur = serviceHighlights.find((s) => s.id === activeTab)!;
                return (
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3">
                    <p className="text-xs text-slate-200 leading-relaxed font-normal">
                      {cur.summary}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <span className="text-lg font-bold text-[#DFC17B] font-mono tabular-nums">
                          {cur.metric}
                        </span>
                        <p className="text-[11px] text-slate-400">{cur.label}</p>
                      </div>
                      <a
                        href={`#${activeTab === 'allInOne' ? 'all-in-one' : activeTab}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const elem = document.querySelector('#services');
                          elem?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1 text-xs text-[#DFC17B] hover:underline font-semibold"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })()}

              {/* Quick WhatsApp Forward for the Active Service */}
              <div className="mt-4 pt-3 border-t border-white/10 text-center">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
                    `Hello Aspire Global, I want to inquire specifically about ${serviceHighlights.find((s) => s.id === activeTab)?.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Book {serviceHighlights.find((s) => s.id === activeTab)?.title.split(' ')[0]} via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip adjacent to Hero */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#DFC17B] font-mono tabular-nums">500+</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">{t.hero.statsClients}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#DFC17B] font-mono tabular-nums">98%</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">{t.hero.statsPlacement}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#DFC17B] font-mono tabular-nums">3M+ Sq.Ft</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">{t.hero.statsSquareFeet}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#DFC17B] font-mono tabular-nums">99.4%</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">{t.hero.statsSatisfaction}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
