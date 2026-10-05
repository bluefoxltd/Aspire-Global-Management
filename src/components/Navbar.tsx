import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { OFFICIAL_WHATSAPP_DIGITS, OFFICIAL_PHONE } from '../services/database';
import { MessageSquare, Phone, Globe, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenAdminPortal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#why-us', label: t.nav.about },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappDirectUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    currentLang === 'ne'
      ? 'नमस्ते Aspire Global Management, म थप जानकारी लिन चाहन्छु।'
      : currentLang === 'ar'
      ? 'مرحباً أسباير جلوبال مانجمنت، أود الاستفسار عن خدماتكم المؤسسية.'
      : 'Hello Aspire Global Management, I would like to inquire about your corporate services in UAE.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-950/10 py-3'
          : 'bg-[#06241E]/90 backdrop-blur-sm border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Zone 1: Single Brand Zone */}
          <a
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC17B] rounded-lg"
          >
            <BrandLogo size={42} showWordmark={true} light={!scrolled} />
          </a>

          {/* Zone 2: 4-6 Clean Text Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors relative py-1 hover:text-[#DFC17B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DFC17B] ${
                  scrolled ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Action Points */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  scrolled
                    ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'border-white/20 text-slate-200 hover:bg-white/10'
                }`}
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>{currentLang.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50 text-xs font-medium text-slate-800"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentLang === 'en' ? 'text-[#0A352D] font-bold bg-emerald-50/70' : ''
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[10px] text-slate-400">EN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('ar');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentLang === 'ar' ? 'text-[#0A352D] font-bold bg-emerald-50/70' : ''
                    }`}
                  >
                    <span>العربية</span>
                    <span className="text-[10px] text-slate-400">AR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('ne');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentLang === 'ne' ? 'text-[#0A352D] font-bold bg-emerald-50/70' : ''
                    }`}
                  >
                    <span>नेपाली</span>
                    <span className="text-[10px] text-slate-400">NE</span>
                  </button>
                </div>
              )}
            </div>

            {/* Discrete Database Portal Access for Client/Admin */}
            <button
              type="button"
              onClick={onOpenAdminPortal}
              title="Secure Leads Database Portal"
              className={`p-2 rounded-md transition-colors border ${
                scrolled
                  ? 'border-slate-200 text-slate-600 hover:text-[#0A352D] hover:bg-slate-50'
                  : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#DFC17B]" />
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#06241E] bg-gradient-to-r from-[#DFC17B] to-[#EBD5A2] rounded-lg shadow-sm hover:from-[#EBD5A2] hover:to-[#DFC17B] transition-all whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{t.nav.whatsapp}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange(currentLang === 'en' ? 'ar' : currentLang === 'ar' ? 'ne' : 'en')}
              className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider border ${
                scrolled ? 'border-slate-200 text-slate-700' : 'border-white/20 text-slate-200'
              }`}
            >
              {currentLang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0A352D] text-white border-b border-emerald-900 px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 pb-4 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-slate-200 hover:text-[#DFC17B] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language selector in mobile drawer */}
          <div className="pt-1">
            <p className="text-xs uppercase text-slate-400 tracking-wider mb-2 font-semibold">
              {t.nav.language}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'ar', 'ne'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    onLanguageChange(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-colors ${
                    currentLang === lang
                      ? 'bg-[#DFC17B] text-[#06241E] border-[#DFC17B]'
                      : 'border-white/20 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : 'नेपाली'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#06241E] bg-[#DFC17B] rounded-lg shadow"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t.nav.whatsapp} ({OFFICIAL_PHONE})</span>
            </a>

            <a
              href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-white/10 rounded-lg hover:bg-white/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {OFFICIAL_PHONE}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPortal();
              }}
              className="w-full text-center text-xs text-slate-400 hover:text-[#DFC17B] py-1 underline underline-offset-4"
            >
              {t.nav.adminPortal} (Secure Lead Database)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
