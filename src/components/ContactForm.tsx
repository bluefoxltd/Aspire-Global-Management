import React, { useState, useEffect } from 'react';
import { Language, LeadInquiry } from '../types';
import { translations } from '../locales/translations';
import {
  DatabaseService,
  OFFICIAL_PHONE,
  OFFICIAL_WHATSAPP_DIGITS,
  OFFICIAL_EMAIL,
  OFFICIAL_LOCATION,
  OFFICIAL_MAPS_URL,
  OFFICIAL_MAPS_EMBED,
  CORPORATE_EMAILS,
} from '../services/database';
import { generateInquiryPdf } from '../utils/pdfGenerator';
import { CountryCodeSelect } from './CountryCodeSelect';
import { CountryData, DEFAULT_COUNTRY } from '../data/countries';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Download,
  FileText,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
  Navigation,
  Copy,
  Check,
} from 'lucide-react';

interface ContactFormProps {
  currentLang: Language;
  preselectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  currentLang,
  preselectedService,
}) => {
  const t = translations[currentLang];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    service: 'All-In-One Enterprise Solution',
    preferredTimeline: 'Immediate (Within 48 Hours)',
    message: '',
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryData>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanNumber = phoneNumber.trim().replace(/^0+/, '');
    const cleanDial = selectedCountry.dialCode.replace('+', '');
    // Guard against duplicated country codes if user typed them
    const finalPhone = cleanNumber.startsWith(cleanDial)
      ? `+${cleanNumber}`
      : `${selectedCountry.dialCode} ${cleanNumber}`;

    if (!formData.fullName.trim() || !formData.email.trim() || !cleanNumber || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone/WhatsApp Number, and Requirement Details).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const saved = await DatabaseService.createInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: finalPhone,
        company: formData.company,
        service: formData.service,
        preferredTimeline: formData.preferredTimeline,
        message: formData.message,
        source: 'contact_form',
      });

      setSubmittedLead(saved);

      // Automatically construct and redirect/open WhatsApp in background or new tab if user chooses
      const waUrl = DatabaseService.formatWhatsAppUrl(saved, 'Hello Aspire Global Management, I have just submitted a corporate inquiry:');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setErrorMessage('Unable to process inquiry at this moment. Please contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyMapLink = () => {
    navigator.clipboard.writeText(OFFICIAL_MAPS_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadReceipt = () => {
    if (!submittedLead) return;
    // Download executive table-based PDF with logo header and corporate contact footer
    generateInquiryPdf(submittedLead);
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setSelectedCountry(DEFAULT_COUNTRY);
    setPhoneNumber('');
    setFormData({
      fullName: '',
      email: '',
      company: '',
      service: 'All-In-One Enterprise Solution',
      preferredTimeline: 'Immediate (Within 48 Hours)',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0A352D]">
            {t.contact.sectionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Poppins']">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Reach, Credentials & Interactive Map Box */}
          <div className="lg:col-span-5 bg-[#072620] text-white rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 border border-[#DFC17B]/30 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#DFC17B] font-bold">
                {t.contact.directReach}
              </span>
              <h3 className="text-2xl font-bold font-['Poppins'] text-white">
                Aspire Global Management
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our executive headquarters for bespoke HR, digital marketing, commercial facility solutions, and turnkey business management in UAE.
              </p>
            </div>

            {/* Direct Contact Items */}
            <div className="space-y-3.5 text-sm">
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0A352D] text-[#DFC17B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Official WhatsApp
                  </p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">
                    {OFFICIAL_PHONE}
                  </p>
                  <span className="text-[11px] text-[#DFC17B] font-medium">Click to chat instantly →</span>
                </div>
              </a>

              <a
                href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0A352D] text-[#DFC17B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Direct Phone Line
                  </p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">
                    {OFFICIAL_PHONE}
                  </p>
                  <span className="text-[11px] text-slate-300">Sunday – Friday: Business Hours</span>
                </div>
              </a>

              {/* Corporate Department Email Directory - Full Width Without Any Truncation */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#0A352D] text-[#DFC17B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white uppercase tracking-wider font-bold">
                      Corporate Department Emails
                    </p>
                    <span className="text-[10px] text-slate-400">Guaranteed 2-hour response SLA</span>
                  </div>
                </div>

                <div className="space-y-2 pt-0.5">
                  {CORPORATE_EMAILS.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-black/35 hover:bg-white/10 transition-colors border border-white/10 space-y-1 group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#DFC17B] uppercase tracking-wider">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(item.email)}
                            title={`Copy ${item.email}`}
                            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-[10px]"
                            aria-label={`Copy ${item.email}`}
                          >
                            {copiedEmail === item.email ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 text-[10px] font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="opacity-70 group-hover:opacity-100 text-[10px]">Copy</span>
                              </>
                            )}
                          </button>
                          <a
                            href={`mailto:${item.email}`}
                            title={`Email ${item.email}`}
                            className="p-1 rounded text-slate-300 hover:text-[#DFC17B] hover:bg-white/10 transition-colors"
                            aria-label={`Open mailto for ${item.email}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* 100% Full Width Email Display - Never Cut Off Or Hidden */}
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs sm:text-[13px] font-medium text-white hover:text-[#DFC17B] transition-colors block select-all break-all leading-relaxed"
                      >
                        {item.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Location & Exact Google Map Box */}
            <div className="rounded-2xl bg-black/40 border border-[#DFC17B]/40 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#DFC17B]/20 border border-[#DFC17B]/40 flex items-center justify-center text-[#DFC17B]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Location: Ajman Freezone
                    </h4>
                    <p className="text-[11px] text-[#DFC17B] font-medium">
                      {OFFICIAL_LOCATION}
                    </p>
                  </div>
                </div>

                <a
                  href={OFFICIAL_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#DFC17B] text-[#06241E] text-[10px] font-bold rounded-md hover:bg-[#ebd5a2] transition-colors flex items-center gap-1 shrink-0"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Open Maps</span>
                </a>
              </div>

              {/* Exact Embedded Map Viewport */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-slate-900 shadow-inner group">
                <iframe
                  title="Aspire Global Management Location - Ajman Free Zone"
                  src={OFFICIAL_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-105"
                />

                {/* Overlay Direct Pin Bar */}
                <div className="absolute top-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-200 font-mono text-[10px] truncate">
                    GPS: 25.4182° N, 55.4414° E
                  </span>
                  <a
                    href={OFFICIAL_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DFC17B] hover:underline font-semibold flex items-center gap-0.5 shrink-0 ml-1"
                  >
                    <span>View Larger Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Box of Google Map Link with 1-click Copy & Direct Navigation */}
              <div className="p-3 bg-[#0A352D]/80 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="w-full sm:w-auto truncate">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                    Google Maps Link:
                  </span>
                  <a
                    href={OFFICIAL_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DFC17B] hover:underline font-mono text-[11px] truncate block"
                  >
                    {OFFICIAL_MAPS_URL}
                  </a>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleCopyMapLink}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={OFFICIAL_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#DFC17B] text-[#06241E] text-[11px] font-bold hover:bg-[#ebd5a2] transition-colors flex items-center gap-1 whitespace-nowrap shadow"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Security Guarantee Note */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#DFC17B] shrink-0" />
              <span>All corporate data encrypted and handled under strict confidentiality.</span>
            </div>
          </div>

          {/* Right Column: Contact & Lead Form / Confirmation State */}
          <div className="lg:col-span-7 bg-[#F8FAF9] border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm">
            {submittedLead ? (
              /* Success State */
              <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0A352D] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 font-['Poppins']">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    {t.contact.successDesc}
                  </p>
                </div>

                {/* Lead Summary Badge */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500">{t.contact.referenceId}:</span>
                    <span className="font-mono font-bold text-[#0A352D] text-sm">{submittedLead.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.contact.nameLabel}:</span>
                    <span className="font-semibold text-slate-800">{submittedLead.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.contact.serviceLabel}:</span>
                    <span className="font-semibold text-slate-800">{submittedLead.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.contact.phoneLabel}:</span>
                    <span className="font-mono text-slate-800">{submittedLead.phone}</span>
                  </div>
                </div>

                {/* WhatsApp & Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={DatabaseService.formatWhatsAppUrl(
                      submittedLead,
                      'Hello Aspire Global Management, I have just submitted a corporate inquiry:'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>{t.contact.openWhatsAppBtn}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadReceipt}
                    title="Download official PDF confirmation"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border-2 border-[#0A352D]/20 text-[#0A352D] hover:bg-[#0A352D]/5 hover:border-[#0A352D] text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 group"
                  >
                    <FileText className="w-4 h-4 text-[#0A352D] group-hover:scale-110 transition-transform" />
                    <span>{t.contact.downloadSummary}</span>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A352D] font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.contact.newInquiry}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Inquiry Input Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.contact.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.contact.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp with Searchable Country Code Dropdown */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-700">
                        {t.contact.phoneLabel} <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {selectedCountry.flag} {selectedCountry.name}
                      </span>
                    </div>

                    <div className="flex rounded-xl shadow-xs">
                      <CountryCodeSelect
                        selectedCountry={selectedCountry}
                        onSelectCountry={setSelectedCountry}
                        disabled={isSubmitting}
                      />
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          setErrorMessage('');
                        }}
                        placeholder={selectedCountry.dialCode === '+971' ? '54 137 4580' : '98XXXXXXXX'}
                        className="flex-1 min-w-0 px-3.5 py-2.5 bg-white border border-l-0 border-slate-300 rounded-r-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] focus:border-transparent transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.contact.companyPlaceholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                    >
                      <option value="All-In-One Enterprise Solution">{t.contact.serviceOptions.all}</option>
                      <option value="HR Consultancy & Executive Search">{t.contact.serviceOptions.hr}</option>
                      <option value="Performance Digital Marketing">{t.contact.serviceOptions.marketing}</option>
                      <option value="Commercial Cleaning & Facility Care">{t.contact.serviceOptions.cleaning}</option>
                      <option value="Custom Multi-Service Consultation">{t.contact.serviceOptions.custom}</option>
                    </select>
                  </div>

                  {/* Expected Timeline */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t.contact.timelineLabel}
                    </label>
                    <select
                      name="preferredTimeline"
                      value={formData.preferredTimeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                    >
                      <option value="Immediate (Within 48 Hours)">{t.contact.timelineOptions.immediate}</option>
                      <option value="This Month">{t.contact.timelineOptions.thisMonth}</option>
                      <option value="Next Quarter">{t.contact.timelineOptions.nextMonth}</option>
                      <option value="Planning / Exploring Options">{t.contact.timelineOptions.planning}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {t.contact.messageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#0A352D] hover:bg-[#07241E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#DFC17B]" />
                  <span>{isSubmitting ? t.contact.submitting : t.contact.submitBtn}</span>
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Submitting securely logs your inquiry and connects you with our executive team on WhatsApp ({OFFICIAL_PHONE}).
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

