import React, { useState, useEffect, useRef } from 'react';
import { Language, ChatMessage } from '../types';
import { translations } from '../locales/translations';
import { BrandLogo } from './BrandLogo';
import { DatabaseService, OFFICIAL_PHONE, OFFICIAL_WHATSAPP_DIGITS } from '../services/database';
import { MessageSquare, X, Send, Bot, Phone, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface LiveChatWidgetProps {
  currentLang: Language;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  const initialWelcome =
    currentLang === 'ne'
      ? 'नमस्ते! Aspire Global Management मा यहाँलाई स्वागत छ। HR Consultancy, Digital Marketing वा Commercial Cleaning सम्बन्धी के जानकारी लिन चाहनुहुन्छ?'
      : currentLang === 'ar'
      ? 'أهلاً بكم في أسباير جلوبال مانجمنت! كيف يمكننا مساعدة شركتكم في خدمات التوظيف، التسويق الرقمي أو نظافة المرافق اليوم؟'
      : 'Hello and welcome to Aspire Global Management. How can our team assist your enterprise with HR, Digital Marketing, or Facility Management today?';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: initialWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: t.chat.quickActions,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate smart corporate agent response
    setTimeout(() => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('hr') || lower.includes('recruitment') || lower.includes('hiring') || lower.includes('भर्ती')) {
        replyText =
          currentLang === 'ne'
            ? `हाम्रो HR Consultancy ले यूएईका शीर्ष कम्पनीहरूमा योग्य जनशक्ति छनोट र भिसा सहजीकरण गर्दछ। थप जानकारीका लागि सिधै हाम्रो ह्वाट्सएप ${OFFICIAL_PHONE} मा सन्देश पठाउनुहोस्।`
            : currentLang === 'ar'
            ? 'توفر استشارات الموارد البشرية لدينا خدمات التوظيف التنفيذي، وتأشيرات العمل، والامتثال لقوانين MOHRE في الإمارات. يمكنكم التواصل المباشر عبر واتساب.'
            : 'Our HR Consultancy provides executive talent search, MOHRE labor compliance, and employment visa solutions. Would you like our HR director to send a rate card directly to your WhatsApp?';
      } else if (lower.includes('marketing') || lower.includes('seo') || lower.includes('ads') || lower.includes('मार्केटिङ')) {
        replyText =
          currentLang === 'ne'
            ? 'हाम्रो Digital Marketing टिमले गुगल तथा सामाजिक सञ्जालबाट बढीभन्दा बढी व्यापारिक ग्राहक (Leads) ल्याउन सहयोग गर्दछ। विस्तृत योजनाका लागि ह्वाट्सएपमा कुरा गर्नुहोस्।'
            : currentLang === 'ar'
            ? 'نقدم استراتيجيات تسويق رقمي وإعلانات جوجل وميتا مدروسة لزيادة المبيعات والعائد الإعلاني. تواصلوا معنا عبر واتساب للمزيد.'
            : 'Our Performance Digital Marketing scales qualified B2B/B2C inquiries via SEO, Google Search, and Meta ads with 3.8x average ROAS. We can audit your current online presence right now.';
      } else if (lower.includes('clean') || lower.includes('facility') || lower.includes('नर्मल') || lower.includes('सफाई') || lower.includes('تنظيف')) {
        replyText =
          currentLang === 'ne'
            ? 'हामी कर्पोरेट अफिस, भवन तथा व्यावसायिक स्थानहरूको अन्तर्राष्ट्रिय स्तरको सरसफाई (Commercial Cleaning) सेवा दिन्छौं। दररेटका लागि ह्वाट्सएपमा सम्पर्क गर्नुहोस्।'
            : currentLang === 'ar'
            ? 'نوفر خدمات تنظيف تجاري شاملة وجلي الرخام وتعقيم الأبراج بمواد معتمدة من بلدية دبي. نرحب باستفساركم عبر واتساب لتقديم كشف موقع فوري.'
            : 'Our Commercial Cleaning service provides hospital-grade sanitization, marble crystallization, and corporate building care with 100% eco-certified detergents. Can we arrange a site inspection?';
      } else {
        replyText =
          currentLang === 'ne'
            ? `तपाईंको सन्देशका लागि धन्यवाद! हाम्रा वरिष्ठ परामर्शदातासँग तत्काल कुरा गर्न हाम्रो आधिकारिक ह्वाट्सएप ${OFFICIAL_PHONE} मा जोडिहाल्नुहोस्।`
            : currentLang === 'ar'
            ? `شكراً لتواصلكم مع أسباير جلوبال مانجمنت. للرد الفوري والمخصص، نوصي بالتواصل عبر واتساب الرسمي ${OFFICIAL_PHONE}.`
            : `Thank you for your message! For an immediate quote and direct coordination with our management, tap below to chat on WhatsApp (${OFFICIAL_PHONE}).`;
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: {
          type: 'whatsapp',
          label: `Continue on WhatsApp (${OFFICIAL_PHONE})`,
          payload: text,
        },
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 900);
  };

  const directWhatsAppUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    'Hello Aspire Global Management, I am contacting you from the website live chat.'
  )}`;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 bg-[#0A352D] hover:bg-[#06241E] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-[#DFC17B]/40 hover:scale-105 active:scale-95 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC17B]"
            aria-label="Open Live Chat"
          >
            <div className="relative">
              <BrandLogo size={28} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0A352D] rounded-full" />
            </div>

            <span className="hidden sm:inline-block text-xs font-bold tracking-wide font-['Poppins']">
              Live Chat Support
            </span>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DFC17B] text-[#06241E] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[85vh] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0A352D] text-white p-4 flex items-center justify-between border-b border-[#DFC17B]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BrandLogo size={36} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0A352D] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-['Poppins'] text-white">
                  {t.chat.supportTitle}
                </h4>
                <p className="text-[11px] text-[#DFC17B] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.chat.supportStatus}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Switch to WhatsApp"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#DFC17B]" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Notice Banner */}
          <div className="bg-emerald-50 px-3.5 py-1.5 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
            <span className="line-clamp-1">{t.chat.onlineNow}</span>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A352D] font-bold hover:underline shrink-0 ml-1"
            >
              Open WA
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAF9]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#0A352D] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action button if agent provides one */}
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <a
                          href={`https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
                            `Hello Aspire Global Management, following up from chat: "${msg.action.payload || ''}"`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] rounded-lg transition-colors active:scale-95"
                        >
                          <MessageSquare className="w-3 h-3 fill-current" />
                          <span>{msg.action.label}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Reply Chips on first message */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          type="button"
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] font-semibold text-[#0A352D] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg px-2.5 py-1 transition-colors active:scale-95 text-left"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2 rounded-xl border border-slate-200 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A352D] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A352D] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A352D] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium ml-1">{t.chat.agentTyping}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A352D] transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#0A352D] text-white rounded-xl hover:bg-[#06241E] disabled:opacity-40 transition-colors shrink-0"
                aria-label={t.chat.send}
              >
                <Send className="w-4 h-4 text-[#DFC17B]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
