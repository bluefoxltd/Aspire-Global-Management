import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { translations } from '../locales/translations';
import {
  OFFICIAL_PHONE,
  OFFICIAL_WHATSAPP_DIGITS,
  OFFICIAL_EMAIL,
  CORPORATE_EMAILS,
} from '../services/database';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onOpenAdminPortal,
}) => {
  const t = translations[currentLang];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051c17] text-white pt-16 pb-24 sm:pb-12 border-t border-[#DFC17B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size={56} showWordmark={true} light={true} />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-sm">
              {t.footer.description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0A352D] hover:bg-[#0e443a] text-white rounded-lg border border-[#DFC17B]/30 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#DFC17B] fill-current" />
                <span>{t.footer.whatsappDirect}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#DFC17B] font-bold">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleNavClick(e, '#why-us')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNavClick(e, '#testimonials')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.testimonials}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, '#faq')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#DFC17B] font-bold">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  {t.services.hr.title.split('&')[0]}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  {t.services.marketing.title}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  {t.services.cleaning.title.split('&')[0]}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  {t.services.allInOne.title}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#DFC17B] font-bold">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFC17B] shrink-0" />
                <a href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`} className="hover:text-white font-mono">
                  {OFFICIAL_PHONE}
                </a>
              </li>
              <li className="space-y-1 pt-0.5">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-3.5 h-3.5 text-[#DFC17B] shrink-0" />
                  <span className="font-semibold text-white">Corporate Emails:</span>
                </div>
                <div className="pl-5 space-y-1 text-[11px] font-mono">
                  {CORPORATE_EMAILS.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <span className="text-[10px] text-[#DFC17B] font-sans">{item.label}:</span>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-slate-300 hover:text-white transition-colors truncate"
                      >
                        {item.email}
                      </a>
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFC17B] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/R6hV4GA685Sjryqz5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
                  title="Open location in Google Maps"
                >
                  {t.location}
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onOpenAdminPortal}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#DFC17B] hover:underline"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin & Leads Database Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>

          <div className="flex items-center gap-6">
            <span className="text-[#DFC17B] font-medium">{t.footer.compliance}</span>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {(['en', 'ar', 'ne'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`text-[11px] uppercase font-bold px-1.5 py-0.5 rounded transition-colors ${
                    currentLang === lang ? 'text-[#DFC17B] underline' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
