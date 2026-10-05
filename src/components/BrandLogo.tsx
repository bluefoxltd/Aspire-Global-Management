import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 48,
  showWordmark = false,
  light = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official circular seal with high-precision vector SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
        role="img"
        aria-label="Aspire Global Management Logo"
      >
        <defs>
          <radialGradient
            id="agmBgGrad"
            cx="0.5"
            cy="0.45"
            r="0.55"
            fx="0.35"
            fy="0.3"
          >
            <stop offset="0%" stopColor="#0e4339" />
            <stop offset="65%" stopColor="#0a352d" />
            <stop offset="100%" stopColor="#06241e" />
          </radialGradient>

          <linearGradient id="agmGoldGrad" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
            <stop offset="0%" stopColor="#f3e3be" />
            <stop offset="45%" stopColor="#dfc17b" />
            <stop offset="85%" stopColor="#c8a55c" />
            <stop offset="100%" stopColor="#e7cd94" />
          </linearGradient>
        </defs>

        {/* Outer Dark Green Circle with Gold Rim */}
        <circle cx="250" cy="250" r="240" fill="url(#agmBgGrad)" stroke="url(#agmGoldGrad)" strokeWidth="7" />
        {/* Inner concentric fine gold ring */}
        <circle cx="250" cy="250" r="226" fill="none" stroke="url(#agmGoldGrad)" strokeWidth="3" opacity="0.85" />

        {/* Monogram AG Ligature in Pure Precision Geometry */}
        <g stroke="url(#agmGoldGrad)" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Left leg of 'A' */}
          <path d="M 120 286 L 165 208" />

          {/* Core loop: Upper apex of A down to base, looping into the bottom bowl of G */}
          <path d="M 198 136 L 175 186 L 235 288 C 265 330 355 330 395 288 C 425 254 425 208 395 178 C 375 158 340 148 300 160" />

          {/* Upper crescent sweep of G */}
          <path d="M 252 150 C 275 125 335 120 375 148" />

          {/* G's inner horizontal crossbar */}
          <path d="M 335 210 L 400 210" />
        </g>

        {/* Horizontal Divider Line */}
        <line
          x1="95"
          y1="346"
          x2="405"
          y2="346"
          stroke="url(#agmGoldGrad)"
          strokeWidth="3.2"
          opacity="0.9"
        />

        {/* ASPIRE GLOBAL text */}
        <text
          x="250"
          y="336"
          textAnchor="middle"
          fill="url(#agmGoldGrad)"
          fontFamily="'Poppins', sans-serif"
          fontWeight="700"
          fontSize="29"
          letterSpacing="4.2"
        >
          ASPIRE GLOBAL
        </text>

        {/* MANAGEMENT text */}
        <text
          x="250"
          y="370"
          textAnchor="middle"
          fill="url(#agmGoldGrad)"
          fontFamily="'Poppins', sans-serif"
          fontWeight="500"
          fontSize="20"
          letterSpacing="8"
        >
          MANAGEMENT
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-semibold tracking-wide text-base md:text-lg font-['Poppins'] ${
              light ? 'text-white' : 'text-slate-900'
            }`}
          >
            Aspire Global
          </span>
          <span
            className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium ${
              light ? 'text-[#DFC17B]' : 'text-[#0A352D]'
            }`}
          >
            Management
          </span>
        </div>
      )}
    </div>
  );
};
