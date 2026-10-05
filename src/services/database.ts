import { LeadInquiry, LeadStatus } from '../types';

const STORAGE_KEY = 'aspire_global_inquiries_db_v1';
const DB_NAME = 'AspireGlobalLeadsDB';
const DB_VERSION = 1;
const STORE_NAME = 'inquiries';

export const OFFICIAL_PHONE = '+971 54 137 4580';
export const OFFICIAL_WHATSAPP_DIGITS = '971541374580';
export const OFFICIAL_EMAIL = 'support@aspireglobalmanagement.com';
export const OFFICIAL_LOCATION = 'Ajman Free Zone, United Arab Emirates';
export const OFFICIAL_MAPS_URL = 'https://maps.app.goo.gl/R6hV4GA685Sjryqz5';
export const OFFICIAL_MAPS_EMBED = 'https://maps.google.com/maps?q=Ajman+Free+Zone,+Ajman,+United+Arab+Emirates&t=&z=15&ie=UTF8&iwloc=&output=embed';

export interface CorporateEmailEntry {
  id: string;
  departmentKey: string;
  email: string;
  label: string;
  description: string;
}

export const CORPORATE_EMAILS: CorporateEmailEntry[] = [
  {
    id: 'support',
    departmentKey: 'support',
    email: 'support@aspireglobalmanagement.com',
    label: 'Customer Support',
    description: '24/7 client helpdesk & active ticket escalation',
  },
  {
    id: 'hr',
    departmentKey: 'hr',
    email: 'hr@aspireglobalmanagement.com',
    label: 'HR Consultancy',
    description: 'Recruitment, executive search & UAE visa mobility',
  },
  {
    id: 'info',
    departmentKey: 'info',
    email: 'info@aspireglobalmanagement.com',
    label: 'General Information',
    description: 'Corporate overview, media & general inquiries',
  },
  {
    id: 'sales',
    departmentKey: 'sales',
    email: 'sales@aspireglobalmanagement.com',
    label: 'Sales & Partnerships',
    description: 'Enterprise packages, pricing proposals & SLA contracts',
  },
];

// Initial enterprise seed records so admin can inspect the system immediately
const SEED_INQUIRIES: LeadInquiry[] = [
  {
    id: 'AGM-2026-8812',
    fullName: 'Hamad Al-Kaabi',
    email: 'h.alkaabi@dubaimarinetrade.ae',
    phone: '+971 50 882 1944',
    company: 'Dubai Marine Trade Group',
    service: 'All-In-One Enterprise Solution',
    message: 'Looking to bundle our 3 office towers cleaning schedule and recruit 12 administrative and logistics specialists under a single SLA contract.',
    preferredTimeline: 'Immediate (Within 48 Hours)',
    createdAt: '2026-10-04T14:32:00Z',
    status: 'new',
    priority: 'high',
    notes: 'Urgent request for 3 commercial towers in Business Bay and DIFC. Follow up via WhatsApp requested.',
    source: 'contact_form',
  },
  {
    id: 'AGM-2026-8790',
    fullName: 'Bishnu Adhikari',
    email: 'b.adhikari@gulfnexus.com',
    phone: '+971 55 429 8810',
    company: 'Gulf Nexus Logistics',
    service: 'HR Consultancy & Executive Search',
    message: 'We require 25 certified forklift operators, warehouse supervisors, and UAE labor visa processing under MOHRE regulations.',
    preferredTimeline: 'This Month',
    createdAt: '2026-10-04T10:15:00Z',
    status: 'in_progress',
    priority: 'high',
    notes: 'Sent preliminary talent dossier and rate card. Awaiting HR director approval meeting on Tuesday.',
    source: 'contact_form',
  },
  {
    id: 'AGM-2026-8745',
    fullName: 'Elena Rostova',
    email: 'elena@soluxuryproperties.ae',
    phone: '+971 52 911 3400',
    company: 'SoLuxury Real Estate Dubai',
    service: 'Performance Digital Marketing',
    message: 'Seeking Google Search and Meta ad campaigns targeting high-net-worth property investors in GCC and Europe for luxury penthouse launch.',
    preferredTimeline: 'Immediate (Within 48 Hours)',
    createdAt: '2026-10-03T16:45:00Z',
    status: 'converted',
    priority: 'medium',
    notes: 'Onboarded on monthly retainer package. Google Ads and Meta Pixel tracking set up.',
    source: 'quick_book',
  },
  {
    id: 'AGM-2026-8692',
    fullName: 'David Sterling',
    email: 'd.sterling@primehealthgroup.com',
    phone: '+971 50 671 2290',
    company: 'PrimeHealth Specialty Clinics',
    service: 'Commercial Cleaning & Facility Care',
    message: 'Daily hospital-grade disinfection, specialized floor polishing, and post-shift deep sanitation across 4 outpatient clinic branches.',
    preferredTimeline: 'This Month',
    createdAt: '2026-10-02T09:20:00Z',
    status: 'contacted',
    priority: 'high',
    notes: 'Site inspection conducted yesterday in Jumeirah and Al Barsha. Formal quotation sent.',
    source: 'live_chat',
  },
];

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
}

export const DatabaseService = {
  async init(): Promise<void> {
    try {
      const current = await this.getAllInquiries();
      if (current.length === 0) {
        for (const item of SEED_INQUIRIES) {
          await this.saveRaw(item);
        }
      }
    } catch {
      // Fallback: check localStorage
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (!existing) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_INQUIRIES));
        }
      }
    }
  },

  async getAllInquiries(): Promise<LeadInquiry[]> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result as LeadInquiry[];
          if (list && list.length > 0) {
            // Sort by createdAt desc
            resolve(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          } else {
            resolve(this.getFromLocalStorage());
          }
        };
        req.onerror = () => {
          resolve(this.getFromLocalStorage());
        };
      });
    } catch {
      return this.getFromLocalStorage();
    }
  },

  getFromLocalStorage(): LeadInquiry[] {
    if (typeof window === 'undefined') return SEED_INQUIRIES;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_INQUIRIES));
        return SEED_INQUIRIES;
      }
      const parsed: LeadInquiry[] = JSON.parse(data);
      return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return SEED_INQUIRIES;
    }
  },

  async saveRaw(inquiry: LeadInquiry): Promise<void> {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(inquiry);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // ignore IndexedDB error, localStorage will take over
    }

    // Mirror to localStorage
    if (typeof window !== 'undefined') {
      const list = this.getFromLocalStorage();
      const idx = list.findIndex((x) => x.id === inquiry.id);
      if (idx >= 0) {
        list[idx] = inquiry;
      } else {
        list.unshift(inquiry);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  },

  async createInquiry(data: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    service: string;
    message: string;
    preferredTimeline?: string;
    source?: 'contact_form' | 'live_chat' | 'quick_book';
  }): Promise<LeadInquiry> {
    const id = `AGM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: LeadInquiry = {
      id,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.company?.trim() || 'Individual / Enterprise Client',
      service: data.service,
      message: data.message.trim(),
      preferredTimeline: data.preferredTimeline || 'Immediate',
      createdAt: new Date().toISOString(),
      status: 'new',
      priority: 'high',
      notes: `Inquiry received via ${data.source || 'contact_form'} on ${new Date().toLocaleDateString()}`,
      source: data.source || 'contact_form',
    };

    await this.saveRaw(newLead);
    return newLead;
  },

  async updateStatus(id: string, status: LeadStatus): Promise<void> {
    const leads = await this.getAllInquiries();
    const target = leads.find((l) => l.id === id);
    if (target) {
      target.status = status;
      await this.saveRaw(target);
    }
  },

  async updateNotes(id: string, notes: string): Promise<void> {
    const leads = await this.getAllInquiries();
    const target = leads.find((l) => l.id === id);
    if (target) {
      target.notes = notes;
      await this.saveRaw(target);
    }
  },

  async deleteInquiry(id: string): Promise<void> {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      const list = this.getFromLocalStorage().filter((l) => l.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  },

  exportToCSV(leads: LeadInquiry[]): string {
    const headers = [
      'Inquiry ID',
      'Full Name',
      'Email',
      'Phone/WhatsApp',
      'Company',
      'Service Requested',
      'Timeline',
      'Status',
      'Priority',
      'Date Submitted',
      'Client Message',
      'Internal Notes',
    ];

    const escape = (val: string | undefined) => `"${(val || '').replace(/"/g, '""')}"`;

    const rows = leads.map((l) => [
      escape(l.id),
      escape(l.fullName),
      escape(l.email),
      escape(l.phone),
      escape(l.company),
      escape(l.service),
      escape(l.preferredTimeline),
      escape(l.status),
      escape(l.priority),
      escape(new Date(l.createdAt).toLocaleString()),
      escape(l.message),
      escape(l.notes),
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  formatWhatsAppUrl(lead: Partial<LeadInquiry>, introText?: string): string {
    let msg = `*Aspire Global Management - New Client Inquiry*\n\n`;
    if (introText) {
      msg += `${introText}\n\n`;
    }
    if (lead.id) msg += `*Reference ID:* ${lead.id}\n`;
    if (lead.fullName) msg += `*Client Name:* ${lead.fullName}\n`;
    if (lead.company) msg += `*Company:* ${lead.company}\n`;
    if (lead.phone) msg += `*Contact:* ${lead.phone}\n`;
    if (lead.email) msg += `*Email:* ${lead.email}\n`;
    if (lead.service) msg += `*Service Requested:* ${lead.service}\n`;
    if (lead.preferredTimeline) msg += `*Expected Start:* ${lead.preferredTimeline}\n`;
    if (lead.message) msg += `*Requirement Details:*\n${lead.message}\n`;
    msg += `\n_Sent directly from aspireglobalmanagement.com_`;

    return `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(msg)}`;
  },
};
