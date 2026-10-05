export interface CountryData {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  priority?: number;
}

export const COUNTRIES: CountryData[] = [
  // UAE & GCC / Middle East (Top Priority)
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', priority: 1 },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', priority: 2 },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', priority: 3 },
  { name: 'Oman', code: 'OM', dialCode: '+968', flag: '🇴🇲', priority: 4 },
  { name: 'Kuwait', code: 'KW', dialCode: '+965', flag: '🇰🇼', priority: 5 },
  { name: 'Bahrain', code: 'BH', dialCode: '+973', flag: '🇧🇭', priority: 6 },

  // South Asia
  { name: 'Nepal', code: 'NP', dialCode: '+977', flag: '🇳🇵', priority: 7 },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', priority: 8 },
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', priority: 9 },
  { name: 'Bangladesh', code: 'BD', dialCode: '+880', flag: '🇧🇩', priority: 10 },
  { name: 'Sri Lanka', code: 'LK', dialCode: '+94', flag: '🇱🇰', priority: 11 },

  // Southeast Asia & East Asia
  { name: 'Philippines', code: 'PH', dialCode: '+63', flag: '🇵🇭', priority: 12 },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'Malaysia', code: 'MY', dialCode: '+60', flag: '🇲🇾' },
  { name: 'Indonesia', code: 'ID', dialCode: '+62', flag: '🇮🇩' },
  { name: 'Thailand', code: 'TH', dialCode: '+66', flag: '🇹🇭' },
  { name: 'Vietnam', code: 'VN', dialCode: '+84', flag: '🇻🇳' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: 'KR', dialCode: '+82', flag: '🇰🇷' },

  // Western & Americas
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', priority: 13 },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', priority: 14 },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64', flag: '🇳🇿' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: '🇳🇴' },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: '🇮🇪' },
  { name: 'Belgium', code: 'BE', dialCode: '+32', flag: '🇧🇪' },
  { name: 'Austria', code: 'AT', dialCode: '+43', flag: '🇦🇹' },
  { name: 'Poland', code: 'PL', dialCode: '+48', flag: '🇵🇱' },
  { name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷' },

  // Africa & Other
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭' },
  { name: 'Morocco', code: 'MA', dialCode: '+212', flag: '🇲🇦' },
  { name: 'Jordan', code: 'JO', dialCode: '+962', flag: '🇯🇴' },
  { name: 'Lebanon', code: 'LB', dialCode: '+961', flag: '🇱🇧' },
];

export const DEFAULT_COUNTRY: CountryData = COUNTRIES[0]; // UAE (+971)
