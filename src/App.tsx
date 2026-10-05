/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { DatabaseService } from './services/database';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialSlider } from './components/TestimonialSlider';
import { FAQSection } from './components/FAQSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileStickyBar } from './components/MobileStickyBar';
import { VideoShowcaseModal } from './components/VideoShowcaseModal';
import { LeadManagementModal } from './components/LeadManagementModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('All-In-One Enterprise Solution');

  // Initialize DB and synchronize language
  useEffect(() => {
    DatabaseService.init().catch(console.error);

    const savedLang = localStorage.getItem('agm_preferred_lang') as Language;
    if (savedLang && ['en', 'ar', 'ne'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    // Set HTML dir for RTL (Arabic) support
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('font-arabic');
    } else if (currentLang === 'ne') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'ne';
      document.body.classList.add('font-nepali');
      document.body.classList.remove('font-arabic');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('font-arabic');
      document.body.classList.remove('font-nepali');
    }
    localStorage.setItem('agm_preferred_lang', currentLang);
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleSelectServiceForForm = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    const elem = document.querySelector('#contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans selection:bg-[#0A352D] selection:text-[#DFC17B]">
      {/* Top Bar Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenAdminPortal={() => setIsAdminModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Banner with video background and interactive highlights */}
        <HeroBanner
          currentLang={currentLang}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onSelectService={handleSelectServiceForForm}
        />

        {/* 4 Core Services: HR, Marketing, Cleaning, All-In-One */}
        <ServicesSection
          currentLang={currentLang}
          onSelectServiceForForm={handleSelectServiceForForm}
        />

        {/* Why Choose Aspire / Trust & UAE Compliance */}
        <WhyChooseUs currentLang={currentLang} />

        {/* Testimonials Slider */}
        <TestimonialSlider currentLang={currentLang} />

        {/* Interactive FAQ with search & category filters */}
        <FAQSection currentLang={currentLang} />

        {/* Contact Form with WhatsApp Direct forward & DB Storage */}
        <ContactForm
          currentLang={currentLang}
          preselectedService={preselectedService}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenAdminPortal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Interactive Live Chat Widget */}
      <LiveChatWidget currentLang={currentLang} />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar />

      {/* Interactive Full Corporate Video Showcase Modal */}
      <VideoShowcaseModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Secure Lead Management Database Modal */}
      <LeadManagementModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
