export type Language = 'en' | 'ar' | 'ne';

export interface ServiceItem {
  id: string;
  titleKey: string;
  shortDescKey: string;
  fullDescKey: string;
  image: string;
  iconName: string;
  featuresKey: string[];
  whatsappMessageKey: string;
  statsKey: { number: string; labelKey: string };
}

export interface FAQItem {
  id: string;
  category: 'general' | 'hr' | 'marketing' | 'cleaning' | 'all-in-one';
  questionKey: string;
  answerKey: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleKey: string;
  company: string;
  location: string;
  image: string;
  quoteKey: string;
  rating: number;
  highlightKey: string;
  service: string;
}

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'archived';
export type LeadPriority = 'high' | 'medium' | 'low';

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  preferredTimeline?: string;
  createdAt: string;
  status: LeadStatus;
  priority: LeadPriority;
  notes?: string;
  source: 'contact_form' | 'live_chat' | 'quick_book';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  action?: {
    type: 'whatsapp' | 'call' | 'contact_form';
    label: string;
    payload?: string;
  };
}
