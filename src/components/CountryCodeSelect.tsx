import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CountryData, COUNTRIES, DEFAULT_COUNTRY } from '../data/countries';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface CountryCodeSelectProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  disabled?: boolean;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  selectedCountry,
  onSelectCountry,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input on open
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filter countries by query (matches country name, dial code, or ISO code)
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase().replace('+', '');
    if (!q) return COUNTRIES;

    return COUNTRIES.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(q);
      const codeMatch = c.code.toLowerCase().includes(q);
      const dialMatch = c.dialCode.replace('+', '').includes(q);
      return nameMatch || codeMatch || dialMatch;
    });
  }, [searchQuery]);

  const handleSelect = (country: CountryData) => {
    onSelectCountry(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-[46px] px-3.5 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-l-xl flex items-center gap-2 text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A352D] focus:border-transparent select-none cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode})`}
      >
        <span className="text-xl leading-none" role="img" aria-label={selectedCountry.name}>
          {selectedCountry.flag}
        </span>
        <span className="text-xs sm:text-sm font-semibold font-mono text-slate-900">
          {selectedCountry.dialCode}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0A352D]' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-80 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (e.g. UAE, 971)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A352D] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto flex-1 p-1.5 divide-y divide-slate-50 scrollbar-thin">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.dialCode === selectedCountry.dialCode && country.code === selectedCountry.code;
                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 text-left transition-colors text-xs ${
                      isSelected
                        ? 'bg-[#0A352D]/10 text-[#0A352D] font-bold'
                        : 'hover:bg-slate-100 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl leading-none shrink-0" role="img" aria-label={country.name}>
                        {country.flag}
                      </span>
                      <span className="truncate text-slate-900 font-sans">
                        {country.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-slate-500 font-semibold text-[11px]">
                        {country.dialCode}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0A352D] shrink-0" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 px-4 text-center text-xs text-slate-500">
                No country found matching <span className="font-semibold text-slate-700">"{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
