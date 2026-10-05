import React from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { ShieldCheck, FileCheck2, Users, Clock, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface WhyChooseUsProps {
  currentLang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const icons = [ShieldCheck, FileCheck2, Users, Clock];

  return (
    <section id="why-us" className="py-20 bg-[#072620] text-white relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#DFC17B]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Brand Seal & Editorial Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFC17B] font-bold">
              <span>{t.why.sectionKicker}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Poppins'] leading-tight">
              {t.why.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.why.subtitle}
            </p>

            <div className="p-6 rounded-2xl bg-[#0A352D] border border-[#DFC17B]/30 flex items-center gap-5 shadow-xl">
              <BrandLogo size={60} />
              <div>
                <p className="text-white font-bold text-base font-['Poppins']">
                  Aspire Global Standard
                </p>
                <p className="text-xs text-[#DFC17B] mt-0.5">
                  100% UAE Labor & Municipality Regulation Compliant
                </p>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.why.points.map((point, index) => {
              const Icon = icons[index] || CheckCircle2;
              return (
                <div
                  key={point.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFC17B]/50 transition-colors backdrop-blur-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A352D] border border-[#DFC17B]/40 flex items-center justify-center text-[#DFC17B]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-['Poppins']">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
