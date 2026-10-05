import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { ChevronLeft, ChevronRight, Star, Quote, Building2, MapPin } from 'lucide-react';

interface TestimonialSliderProps {
  currentLang: Language;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ currentLang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const t = translations[currentLang];
  const items = t.testimonials.items;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex] || items[0];

  return (
    <section id="testimonials" className="py-24 bg-white text-slate-900 overflow-hidden scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0A352D]">
            {t.testimonials.sectionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Poppins']">
            {t.testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto bg-[#F8FAF9] border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon */}
          <div className="absolute top-8 right-8 text-emerald-950/10 pointer-events-none">
            <Quote className="w-16 h-16" />
          </div>

          {/* Testimonial Content */}
          <div className="space-y-6 relative z-10 min-h-[220px] flex flex-col justify-between">
            {/* Star Rating & Service Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-[#DFC17B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-1.5 font-mono">5.0</span>
              </div>
              <div className="text-xs font-semibold text-[#0A352D] bg-[#0A352D]/10 px-3 py-1 rounded-md">
                {current.service}
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed font-['Poppins']">
              "{current.quote}"
            </blockquote>

            {/* Concrete Outcome Highlight */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A352D] bg-emerald-100/60 px-3.5 py-1.5 rounded-lg w-fit">
              <span>Verified Impact:</span>
              <span className="text-slate-900">{current.highlight}</span>
            </div>

            {/* Author Lockup */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 font-['Poppins']">
                  {current.contactPerson}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {current.role} · <span className="font-semibold text-slate-800">{current.name}</span>
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#0A352D]" />
                  <span>{current.location}</span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-[#0A352D] hover:text-white hover:border-[#0A352D] transition-colors shadow-sm active:scale-95"
                  aria-label={t.testimonials.prev}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === idx ? 'w-6 bg-[#0A352D]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-[#0A352D] hover:text-white hover:border-[#0A352D] transition-colors shadow-sm active:scale-95"
                  aria-label={t.testimonials.next}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
