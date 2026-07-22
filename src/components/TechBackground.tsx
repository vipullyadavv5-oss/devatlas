import React from 'react'

export function TechBackgroundIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 p-4 sm:p-8 rounded-3xl bg-[#5C5C9C]/30 border border-purple-500/20 backdrop-blur-xl shadow-2xl overflow-hidden group">
      {/* Decorative Outer Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-pink-500/10 to-cyan-500/10 opacity-70 pointer-events-none" />

      {/* Main Vector SVG recreating the Tech Developer Illustration */}
      <svg
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl select-none"
      >
        {/* Background Canvas Tint */}
        <rect width="900" height="600" rx="30" fill="#5A589A" opacity="0.3" />

        {/* Central Browser / Code Window */}
        <rect x="230" y="160" width="440" height="280" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        {/* Window controls */}
        <circle cx="620" cy="190" r="6" fill="#000000" />
        <path d="M640 185 L652 197 M652 185 L640 197" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="210" x2="640" y2="210" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

        {/* Browser Content Elements */}
        <rect x="290" y="250" width="140" height="80" fill="#06B6D4" stroke="#000000" strokeWidth="3" />
        <circle cx="360" cy="290" r="22" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
        <path d="M338 290 H382 M360 268 V312" stroke="#000000" strokeWidth="2.5" />

        <line x1="450" y1="245" x2="630" y2="245" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <line x1="450" y1="270" x2="600" y2="270" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="450" y1="295" x2="580" y2="295" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="450" y1="320" x2="520" y2="320" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

        <rect x="450" y="350" width="80" height="24" rx="4" fill="#22C55E" stroke="#000000" strokeWidth="3" />
        <rect x="330" y="355" width="40" height="25" fill="#06B6D4" stroke="#000000" strokeWidth="3" />

        {/* WEB DESIGN Badge Top Left */}
        <g className="animate-float">
          <rect x="150" y="90" width="140" height="50" rx="8" fill="#06B6D4" stroke="#000000" strokeWidth="4" />
          <text x="220" y="122" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="16" fill="#000000">WEB DESIGN</text>
        </g>

        {/* CODING Badge Top Right */}
        <g className="animate-float">
          <rect x="555" y="95" width="130" height="48" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
          <text x="620" y="126" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="16" fill="#000000">CODING</text>
        </g>

        {/* Code Badge </> Pink Circle */}
        <g className="hover:scale-110 transition-transform">
          <circle cx="680" cy="160" r="40" fill="#EC4899" stroke="#000000" strokeWidth="4" />
          <text x="680" y="168" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="24" fill="#FFFFFF">&lt;/&gt;</text>
        </g>

        {/* Globe & Wi-Fi Icons Top */}
        <circle cx="310" cy="150" r="28" fill="#8B5CF6" stroke="#000000" strokeWidth="3.5" />
        <circle cx="310" cy="150" r="16" fill="none" stroke="#FFFFFF" strokeWidth="3" />

        <circle cx="410" cy="160" r="32" fill="#06B6D4" stroke="#000000" strokeWidth="3.5" />
        <path d="M396 168 Q410 150 424 168 M402 163 Q410 152 418 163" stroke="#000000" strokeWidth="3" fill="none" />

        {/* PHP Diamond */}
        <g transform="translate(680, 260) rotate(45)">
          <rect x="-32" y="-32" width="64" height="64" rx="10" fill="#F59E0B" stroke="#000000" strokeWidth="4" />
          <text transform="rotate(-45)" x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="18" fill="#000000">PHP</text>
        </g>

        {/* HTML Badge */}
        <rect x="760" y="275" width="80" height="42" rx="10" fill="#22C55E" stroke="#000000" strokeWidth="4" />
        <text x="800" y="303" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="18" fill="#000000">HTML</text>

        {/* USER EXPERIENCE Window Bottom Right */}
        <g transform="translate(570, 395)">
          <rect x="0" y="0" width="200" height="100" rx="16" fill="#22C55E" stroke="#000000" strokeWidth="4" />
          <circle cx="40" cy="40" r="16" fill="#F59E0B" stroke="#000000" strokeWidth="3" />
          <text x="40" y="45" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="14" fill="#000000">&lt;/&gt;</text>
          <text x="100" y="80" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="16" fill="#000000">USER EXPERIENCE</text>
        </g>

        {/* USER INTERFACE Window Mid Left */}
        <g transform="translate(180, 255)">
          <rect x="0" y="0" width="85" height="65" rx="10" fill="#F59E0B" stroke="#000000" strokeWidth="3.5" />
          <text x="42.5" y="42" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="10" fill="#000000">USER INTERFACE</text>
        </g>

        {/* GRAPHIC DESIGN Window Bottom Left */}
        <g transform="translate(140, 390)">
          <rect x="0" y="0" width="120" height="70" rx="12" fill="#F59E0B" stroke="#000000" strokeWidth="4" />
          <text x="60" y="44" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="12" fill="#000000">GRAPHIC DESIGN</text>
        </g>

        {/* LANDING PAGE Pill Bottom Center */}
        <g transform="translate(290, 425)">
          <rect x="0" y="0" width="230" height="52" rx="26" fill="#EC4899" stroke="#000000" strokeWidth="4" />
          <text x="85" y="32" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="16" fill="#000000">LANDING PAGE</text>
          <circle cx="185" cy="26" r="16" fill="#F59E0B" stroke="#000000" strokeWidth="3" />
        </g>

        {/* Floating Decorative Dots and Waves */}
        <path d="M190 490 Q205 480 220 490 Q235 500 250 490" stroke="#000000" strokeWidth="3" fill="none" />
        <path d="M700 260 Q715 250 730 260 Q745 270 760 260" stroke="#000000" strokeWidth="3" fill="none" />
        <circle cx="510" cy="110" r="10" fill="#06B6D4" stroke="#000000" strokeWidth="2.5" />
        <circle cx="460" cy="100" r="6" fill="#F59E0B" stroke="#000000" strokeWidth="2" />
      </svg>
    </div>
  )
}
