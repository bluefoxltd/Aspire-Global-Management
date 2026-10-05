import React from 'react';
import { OFFICIAL_PHONE, OFFICIAL_WHATSAPP_DIGITS } from '../services/database';
import { MessageSquare, Phone } from 'lucide-react';

interface MobileStickyBarProps {
  onQuickInquire?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = () => {
  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    'Hello Aspire Global Management, I am contacting you directly from mobile.'
  )}`;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#06241E]/95 backdrop-blur-md border-t border-emerald-900/60 px-3 py-2 flex items-center gap-2 shadow-2xl">
      <a
        href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors whitespace-nowrap active:scale-95"
      >
        <Phone className="w-3.5 h-3.5 text-[#DFC17B]" />
        <span>Call</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#DFC17B] text-[#06241E] text-xs font-bold hover:bg-[#ebd5a2] transition-colors whitespace-nowrap shadow active:scale-95"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
