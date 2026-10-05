import React, { useRef, useState, useEffect } from 'react';
import { X, MessageSquare, Upload, Maximize } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { OFFICIAL_WHATSAPP_DIGITS, OFFICIAL_PHONE } from '../services/database';

interface VideoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const VideoShowcaseModal: React.FC<VideoShowcaseModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Permanently set to official Aspire Corporate Showcase Video (100% original)
  const [videoSrc, setVideoSrc] = useState<string>('/aspire_corporate_showcase.mp4');

  const t = translations[currentLang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setVideoSrc(localUrl);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    } else {
      videoRef.current.requestFullscreen().catch(console.error);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${OFFICIAL_WHATSAPP_DIGITS}?text=${encodeURIComponent(
    currentLang === 'ne'
      ? 'नमस्ते Aspire Global Management, म कर्पोरेट भिडियो हेरेर सम्पर्क गर्दैछु।'
      : currentLang === 'ar'
      ? 'مرحباً أسباير جلوبال مانجمنت، أود الاستفسار بعد مشاهدة الفيديو التعريفي.'
      : 'Hello Aspire Global Management, I am contacting you after watching your corporate video.'
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-2 sm:p-4 md:p-6"
    >
      {/* 100% Original Frameless Video Wrapper (no artificial timeline, no decorative device frames) */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between pb-3 px-1 text-white">
          <div className="flex items-center gap-2">
            <span id="video-modal-title" className="text-sm sm:text-base font-bold tracking-wide font-['Poppins']">
              Aspire Global Management
            </span>
            <span className="text-xs text-[#DFC17B] font-medium hidden sm:inline">
              · Corporate Presentation
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Optional upload tool to preview any alternative video file */}
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Select different video file to preview"
              className="px-2.5 py-1 text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change Video</span>
            </button>

            {/* Native Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/20 rounded-full transition-colors ml-1"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 100% Normal Original Video Player: Clean, Frameless, Unbounded */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            className="w-full h-full object-contain"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Bottom Action Strip */}
        <div className="w-full pt-3 px-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <p className="text-center sm:text-left text-slate-400 text-[11px] sm:text-xs">
            Playing official presentation at 100% original quality without compression.
          </p>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#DFC17B] hover:bg-[#ebd5a2] text-[#061D18] font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Chat on WhatsApp ({OFFICIAL_PHONE})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
