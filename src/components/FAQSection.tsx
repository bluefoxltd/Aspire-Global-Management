import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { OFFICIAL_WHATSAPP_DIGITS } from '../services/database';
import { ChevronDown, Search, MessageSquare, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  currentLang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(0); // first item open by default

  const t = translations[currentLang];
  const items = t.faq.items;

  const categories = [
    { id: 'all', label: t.faq.allCategories },
    { id: 'general', label: t.faq.cats.general },
    { id: 'hr', label: t.faq.cats.hr },
    { id: 'marketing', label: t.faq.cats.marketing },
    { id: 'cleaning', label: t.faq.cats.cleaning },
    { id: 'all-in-one', label: t.faq.cats['all-in-one'] },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCat === 'all' || item.category === selectedCat;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [items, selectedCat, searchQuery]);

  const toggleAccordion = (index: number) => {
    setExpandedId((prev) => (prev === index ? null : index));
  };

  const whatsappFaqUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    `Hello Aspire Global Management, I have a specific question not covered in the FAQ regarding your services.`
  )}`;

  return (
    <section id="faq" className="py-24 bg-[#F8FAF9] text-slate-900 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0A352D]">
            {t.faq.sectionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Poppins']">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCat === cat.id
                  ? 'bg-[#0A352D] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No questions found</p>
              <p className="text-xs text-slate-500">
                Try a different keyword or ask our team directly on WhatsApp.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = expandedId === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/90 rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-800 hover:text-[#0A352D] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-['Poppins']">{item.q}</span>
                    <div
                      className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#0A352D] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Direct Escalation Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#072620] to-[#0A352D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#DFC17B]/20">
          <div>
            <h4 className="text-base font-bold font-['Poppins'] text-white">
              {t.faq.directWhatsAppPrompt}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Connect directly with our corporate advisory team for rapid quotes and custom contracts.
            </p>
          </div>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#DFC17B] hover:bg-[#ebd5a2] text-[#06241E] font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{t.faq.directWhatsAppBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
