import React, { useState, useEffect } from 'react';
import { Language, LeadInquiry, LeadStatus } from '../types';
import { translations } from '../locales/translations';
import { DatabaseService, OFFICIAL_PHONE } from '../services/database';
import { BrandLogo } from './BrandLogo';
import { generateInquiryPdf } from '../utils/pdfGenerator';
import { X, Search, Download, Trash2, MessageSquare, ShieldCheck, Lock, Edit3, Check, Filter, FileText } from 'lucide-react';

interface LeadManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const LeadManagementModal: React.FC<LeadManagementModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const t = translations[currentLang];

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = async () => {
    const list = await DatabaseService.getAllInquiries();
    setLeads(list);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2026' || pinInput.trim() === 'aspire' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError(t.admin.invalidPin);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await DatabaseService.updateStatus(id, newStatus);
    await loadLeads();
  };

  const handleSaveNotes = async (id: string) => {
    await DatabaseService.updateNotes(id, noteContent);
    setEditingNoteId(null);
    await loadLeads();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this lead record?')) {
      await DatabaseService.deleteInquiry(id);
      await loadLeads();
    }
  };

  const handleExportCSV = () => {
    const csvData = DatabaseService.exportToCSV(leads);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AspireGlobal_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    const query = search.toLowerCase().trim();
    const matchQuery =
      !query ||
      lead.fullName.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      (lead.company && lead.company.toLowerCase().includes(query)) ||
      lead.service.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query);
    return matchStatus && matchQuery;
  });

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leads-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#072620] text-white px-6 py-4 flex items-center justify-between border-b border-[#DFC17B]/30">
          <div className="flex items-center gap-3">
            <BrandLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFC17B]" />
                <h2 id="leads-modal-title" className="text-base font-bold font-['Poppins'] text-white">
                  {t.admin.title}
                </h2>
              </div>
              <p className="text-xs text-slate-300 font-normal">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={t.admin.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Not Authenticated, Show PIN Form */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0A352D] flex items-center justify-center mx-auto border border-emerald-200">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900 font-['Poppins']">
                {t.admin.pinProtected}
              </h4>
              <p className="text-xs text-slate-500">
                {t.admin.enterPin}
              </p>
            </div>

            {pinError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {pinError}
              </p>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 2026)"
                className="w-full text-center tracking-widest text-lg font-mono font-bold py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A352D]"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3 bg-[#0A352D] hover:bg-[#06241E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
              >
                {t.admin.unlockBtn}
              </button>
            </form>

            <p className="text-[11px] text-slate-400">
              Default access PIN for administration review is <strong className="text-slate-600">2026</strong>.
            </p>
          </div>
        ) : (
          /* Authenticated Database Console */
          <div className="flex-1 flex flex-col min-h-0 bg-[#F8FAF9]">
            {/* Action Bar & Stats */}
            <div className="p-4 sm:p-6 bg-white border-b border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Stats Chips */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <span className="text-slate-500">Total Leads:</span>
                    <span className="font-mono text-slate-900 font-bold">{leads.length}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg">
                    <span>New Leads:</span>
                    <span className="font-mono font-bold">{newLeadsCount}</span>
                  </div>
                </div>

                {/* Export CSV button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A352D] hover:bg-[#07241E] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors whitespace-nowrap active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#DFC17B]" />
                  <span>{t.admin.exportCSV}</span>
                </button>
              </div>

              {/* Filters & Search Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.admin.searchPlaceholder}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {(['all', 'new', 'contacted', 'in_progress', 'converted', 'archived'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                          statusFilter === st
                            ? 'bg-[#0A352D] text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Leads Table / Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                  <p className="text-sm font-medium">{t.admin.noLeads}</p>
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const isEditingNote = editingNoteId === lead.id;

                  const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${lead.fullName}, thank you for contacting Aspire Global Management regarding "${lead.service}". Our team is following up on your inquiry (${lead.id}).`
                  )}`;

                  return (
                    <div
                      key={lead.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
                    >
                      {/* Top Row: Ref, Date, Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#0A352D] bg-[#0A352D]/10 px-2.5 py-1 rounded-md">
                            {lead.id}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(lead.createdAt).toLocaleString()}
                          </span>
                          <span className="text-[11px] text-slate-400 capitalize">
                            Source: {lead.source.replace('_', ' ')}
                          </span>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-medium">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              lead.status === 'new'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : lead.status === 'converted'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : lead.status === 'in_progress'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Main Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-slate-500 font-medium">Client & Company</p>
                          <p className="text-sm font-bold text-slate-900 mt-0.5">{lead.fullName}</p>
                          <p className="text-slate-600 font-medium">{lead.company}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 font-medium">Contact Coordinates</p>
                          <p className="text-slate-800 font-mono mt-0.5 font-semibold">{lead.phone}</p>
                          <p className="text-slate-600 truncate">{lead.email}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 font-medium">Requirement & Timeline</p>
                          <p className="text-slate-900 font-bold mt-0.5">{lead.service}</p>
                          <p className="text-slate-600">Timeline: {lead.preferredTimeline || 'Standard'}</p>
                        </div>
                      </div>

                      {/* Client Message */}
                      <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 border border-slate-100 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Requirement Description:</strong>
                        {lead.message}
                      </div>

                      {/* Internal Notes / Actions */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                        {/* Notes Section */}
                        <div className="flex-1 min-w-[240px]">
                          {isEditingNote ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                placeholder="Add follow-up notes..."
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#0A352D]"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveNotes(lead.id)}
                                className="p-1.5 bg-[#0A352D] text-white rounded-lg hover:bg-[#06241E]"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-500">
                              <span className="italic">
                                {lead.notes ? `Note: ${lead.notes}` : 'No internal notes added.'}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNoteId(lead.id);
                                  setNoteContent(lead.notes || '');
                                }}
                                className="text-slate-400 hover:text-slate-700 p-1"
                                title="Edit note"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp Reply, PDF Export & Delete Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => generateInquiryPdf(lead)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-[#0A352D] hover:text-white text-slate-700 font-semibold text-xs rounded-lg transition-colors border border-slate-200"
                            title="Download official inquiry confirmation PDF"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">PDF</span>
                          </button>

                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-3 h-3 fill-current" />
                            <span>WhatsApp Lead</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
              {t.admin.secureNotice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
