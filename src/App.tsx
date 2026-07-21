import React, { useState, useEffect, useRef } from 'react'

// ─── Doodle SVG Primitives ────────────────────────────────────────────────────

function CompassDoodle({ size = 48, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style}>
      <circle cx="24" cy="24" r="20" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="24" cy="24" r="3" fill="#7c3aed" />
      <polygon points="24,6 26,22 24,20 22,22" fill="#ef4444" />
      <polygon points="24,42 22,26 24,28 26,26" fill="#6b7280" />
      <polygon points="6,24 22,22 20,24 22,26" fill="#6b7280" />
      <polygon points="42,24 26,26 28,24 26,22" fill="#6b7280" />
      <text x="24" y="13" textAnchor="middle" fontSize="5" fill="#7c3aed" fontWeight="700">N</text>
    </svg>
  )
}

function MapPinDoodle({ size = 24, color = '#7c3aed', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color} />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  )
}

function StarDoodle({ size = 20, color = '#f59e0b', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.67l-4.78 2.53.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
        fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  )
}

function DottedPath({ className = '' }: { className?: string }) {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className={className}>
      <path d="M4 12 Q30 4 60 12 Q90 20 116 12" stroke="#7c3aed" strokeWidth="2"
        strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  )
}

function TreasureChest({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
      <rect x="4" y="16" width="28" height="16" rx="2" fill="#92400e" />
      <rect x="4" y="8" width="28" height="10" rx="2" fill="#78350f" />
      <rect x="14" y="20" width="8" height="6" rx="1" fill="#f59e0b" />
      <circle cx="18" cy="23" r="1.5" fill="#92400e" />
      <rect x="4" y="17" width="28" height="2" fill="#f59e0b" opacity="0.6" />
    </svg>
  )
}

function RocketDoodle({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 2C16 2 8 10 8 20h16C24 10 16 2 16 2z" fill="#7c3aed" />
      <rect x="12" y="20" width="8" height="6" rx="1" fill="#a78bfa" />
      <circle cx="16" cy="13" r="3" fill="white" opacity="0.9" />
      <path d="M8 22 L4 28 L8 26 Z" fill="#f59e0b" />
      <path d="M24 22 L28 28 L24 26 Z" fill="#f59e0b" />
    </svg>
  )
}

// ─── Progress Ring ────────────────────────────────────────────────────────────

function ProgressRing({
  value, max = 100, size = 80, stroke = 8, color = '#7c3aed', bg = '#e9d5ff', label, sublabel
}: {
  value: number; max?: number; size?: number; stroke?: number;
  color?: string; bg?: string; label: string; sublabel: string;
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dashEmpty = circ * (1 - pct)
  const [animated, setAnimated] = useState(false)
  const ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
          <circle
            ref={ref}
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={animated ? dashEmpty : circ}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold" style={{ fontFamily: 'Fredoka', color }}>{value}</span>
          <span className="text-[9px] text-gray-400 leading-tight">{sublabel}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-600">{label}</span>
    </div>
  )
}

// ─── 5-Star Rating ────────────────────────────────────────────────────────────

function StarRating({ initialRating = 0, label = 'Rate this problem', onRate }: { initialRating?: number; label?: string; onRate?: (r: number) => void }) {
  const [rating, setRating] = useState(initialRating)
  const [hovered, setHovered] = useState(0)
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null)
  const labels = ['', 'Too easy 😴', 'Meh 🤷', 'Solid 💪', 'Tough 🔥', 'Legendary 🤯']

  const handleClick = (idx: number) => {
    setRating(idx)
    setAnimatingIdx(idx)
    if (onRate) onRate(idx)
    setTimeout(() => setAnimatingIdx(null), 600)
  }

  const active = hovered || rating

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((idx) => {
          const filled = idx <= active
          const isAnimating = animatingIdx !== null && idx <= animatingIdx
          return (
            <button
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleClick(idx)}
              className="relative outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
              style={{
                animation: isAnimating ? `bounce-in 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) ${(idx - 1) * 40}ms both` : 'none',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <defs>
                  <linearGradient id={`star-grad-${idx}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 3l3.6 7.3 8.1 1.2-5.8 5.7 1.4 8-7.3-3.8-7.3 3.8 1.4-8L6.3 11.5l8.1-1.2L18 3z"
                  fill={filled ? `url(#star-grad-${idx})` : '#e5e7eb'}
                  stroke={filled ? '#f59e0b' : '#d1d5db'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  style={{
                    transition: 'fill 0.2s ease, transform 0.2s ease',
                    transformOrigin: 'center',
                    transform: filled && idx === active ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              </svg>
            </button>
          )
        })}
      </div>
      <div
        className="text-sm font-semibold transition-all duration-300"
        style={{ color: active ? '#7c3aed' : '#9ca3af', minHeight: '20px' }}
      >
        {active ? labels[active] : 'Tap to rate ✨'}
      </div>
      {rating > 0 && (
        <div
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{ background: '#ede9fe', color: '#7c3aed', animation: 'float-in 0.4s ease both' }}
        >
          Saved! Thanks for the feedback 🗺️
        </div>
      )}
    </div>
  )
}

// ─── Streak Heatmap ───────────────────────────────────────────────────────────

function StreakHeatmap() {
  const weeks = 20
  const today = new Date()
  const cells: { count: number; date: string }[] = []

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (w * 7 + (6 - d)))
      const isRecent = w < 3
      const isFuture = date > today
      const count = isFuture ? 0 : isRecent
        ? Math.floor(Math.random() * 12)
        : Math.floor(Math.random() * 8)
      cells.push({ count, date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })
    }
  }

  const getColor = (n: number) => {
    if (n === 0) return '#f3f0eb'
    if (n <= 2) return '#ddd6fe'
    if (n <= 5) return '#a78bfa'
    if (n <= 8) return '#7c3aed'
    return '#5b21b6'
  }

  const getTerrain = (n: number) => {
    if (n === 0) return 'Ocean'
    if (n <= 2) return 'Plains'
    if (n <= 5) return 'Forest'
    if (n <= 8) return 'Mountains'
    return 'Peak'
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'Fredoka', fontSize: 16, fontWeight: 600, color: '#1f1235' }}>
            Terrain Map
          </span>
          <MapPinDoodle size={16} color="#7c3aed" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#f3f0eb' }} />
          <span>Ocean</span>
          <div className="w-3 h-3 rounded-sm" style={{ background: '#ddd6fe' }} />
          <span>Plains</span>
          <div className="w-3 h-3 rounded-sm" style={{ background: '#7c3aed' }} />
          <span>Peak</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        <div className="flex flex-col gap-[3px] mr-1 mt-[18px]">
          {days.map((d, i) => (
            <div key={i} className="text-[9px] text-gray-400 w-3 text-right leading-[11px]">{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: '3px' }}>
          {Array.from({ length: weeks }, (_, w) => {
            const d = new Date()
            d.setDate(d.getDate() - ((weeks - 1 - w) * 7 + 6))
            return (
              <div key={w} className="flex flex-col gap-[3px]">
                <div className="text-[8px] text-gray-400 h-[10px] leading-[10px] truncate">
                  {d.getDate() <= 7 ? months[d.getMonth()] : ''}
                </div>
                {cells.slice(w * 7, w * 7 + 7).map((cell, di) => (
                  <div
                    key={di}
                    title={`${cell.date}: ${cell.count} solved — ${getTerrain(cell.count)}`}
                    className="rounded-[3px] cursor-pointer transition-all duration-200 hover:scale-125 hover:z-10"
                    style={{
                      width: 11, height: 11,
                      background: getColor(cell.count),
                      animation: `terrain-appear 0.3s ease ${(w * 7 + di) * 5}ms both`,
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Topic Bar ────────────────────────────────────────────────────────────────

function TopicBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth((solved / total) * 100), 300)
    return () => clearTimeout(t)
  }, [solved, total])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-gray-400">{solved}/{total}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: '#f0ede8' }}>
        <div
          className="h-2 rounded-full"
          style={{
            width: `${width}%`,
            background: color,
            transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Problem Card ─────────────────────────────────────────────────────────────

function ProblemCard({ title, difficulty, tags, timeAgo, solved, onClick }: {
  title: string; difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[]; timeAgo: string; solved: boolean; onClick?: () => void;
}) {
  const diffColor = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' }[difficulty]
  const diffBg = { Easy: '#d1fae5', Medium: '#fef3c7', Hard: '#fee2e2' }[difficulty]

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
      style={{ background: solved ? '#f5f3ff' : '#fff7f0', border: '1px solid', borderColor: solved ? '#ddd6fe' : '#fde8d0' }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: solved ? '#ede9fe' : '#fff' }}
      >
        {solved ? '✅' : '🗺️'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: diffBg, color: diffColor }}>
            {difficulty}
          </span>
          {tags.map(t => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">{t}</span>
          ))}
        </div>
      </div>
      <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo}</span>
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ emoji, title, desc, earned, onClick }: { emoji: string; title: string; desc: string; earned: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all duration-200 hover:scale-105 cursor-pointer"
      style={{
        background: earned ? '#faf5ff' : '#f9fafb',
        border: `1.5px solid ${earned ? '#ddd6fe' : '#e5e7eb'}`,
        opacity: earned ? 1 : 0.5,
      }}
    >
      <div
        className="text-2xl w-12 h-12 flex items-center justify-center rounded-xl"
        style={{ background: earned ? '#ede9fe' : '#f3f4f6', animation: earned ? 'wander 4s ease-in-out infinite' : 'none' }}
      >
        {emoji}
      </div>
      <p className="text-xs font-bold text-gray-700 leading-tight">{title}</p>
      <p className="text-[10px] text-gray-400 leading-tight">{desc}</p>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Navbar({ onTabChange, activeTab }: { onTabChange: (t: string) => void; activeTab: string }) {
  const tabs = ['Dashboard', 'Problems', 'Journey', 'Profile']

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3" style={{
      background: 'rgba(240, 237, 232, 0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
    }}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('Dashboard')}>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #0d9488)' }}
        >
          <span className="text-white text-sm">🗺️</span>
        </div>
        <span style={{ fontFamily: 'Fredoka', fontSize: 22, fontWeight: 700, color: '#1f1235', letterSpacing: '-0.5px' }}>
          Dev<span style={{ color: '#7c3aed' }}>Atlas</span>
        </span>
        <StarDoodle size={14} color="#f59e0b" className="opacity-70" />
      </div>

      <div className="flex items-center gap-1 bg-white/70 rounded-xl p-1 border border-purple-100">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200"
            style={{
              background: activeTab === tab ? '#7c3aed' : 'transparent',
              color: activeTab === tab ? 'white' : '#6b7280',
              fontFamily: 'Plus Jakarta Sans',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div
          onClick={() => onTabChange('Profile')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', animation: 'pulse-glow 3s ease-in-out infinite' }}
          title="Explorer Profile"
        >
          AK
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div className="relative px-4 sm:px-6 pt-8 pb-4 overflow-hidden">
      <CompassDoodle size={56} className="absolute top-4 right-16 opacity-15 hidden sm:block" style={{ animation: 'wander 6s ease-in-out infinite' } as React.CSSProperties} />
      <StarDoodle size={18} color="#f59e0b" className="absolute top-8 left-1/3 opacity-40" />
      <StarDoodle size={12} color="#7c3aed" className="absolute top-16 right-1/3 opacity-30" />
      <MapPinDoodle size={20} color="#0d9488" className="absolute top-6 right-1/4 opacity-50" />

      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: '#ede9fe', color: '#7c3aed', fontFamily: 'Plus Jakarta Sans', animation: 'pin-drop 0.6s ease both' }}
          >
            🌍 Explorer Level 12
          </span>
          <DottedPath />
        </div>

        <h1
          className="leading-tight mb-2"
          style={{
            fontFamily: 'Fredoka',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            color: '#1f1235',
            letterSpacing: '-1px',
            animation: 'float-in 0.5s ease 0.1s both',
          }}
        >
          Chart Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #0d9488 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Coding Journey
          </span>
          <span className="inline-block ml-2" style={{ animation: 'wander 3s ease-in-out infinite' }}>🧭</span>
        </h1>

        <p className="text-gray-500 font-medium mb-4" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, animation: 'float-in 0.5s ease 0.2s both' }}>
          Every problem solved is a new territory unlocked. Keep exploring, keep growing.
        </p>

        <div className="flex flex-wrap gap-2" style={{ animation: 'float-in 0.5s ease 0.3s both' }}>
          {[
            { emoji: '⚡', label: 'DSA Master', color: '#f59e0b', bg: '#fef3c7' },
            { emoji: '🔥', label: '7-day Streak', color: '#ef4444', bg: '#fee2e2' },
            { emoji: '🏆', label: 'Top 5%', color: '#0d9488', bg: '#ccfbf1' },
          ].map(s => (
            <div
              key={s.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: s.bg, color: s.color, border: `1.5px solid ${s.color}30` }}
            >
              {s.emoji} {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Profile Card (Explorer Passport) ────────────────────────────────────────

function ProfileCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden h-full cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
      style={{
        background: 'linear-gradient(160deg, #1e1040 0%, #2d1b69 50%, #0f4c5c 100%)',
        boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
        animation: 'float-in 0.5s ease 0.1s both',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[3px] text-purple-300 uppercase">Explorer Passport</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full" style={{ background: '#f59e0b' }} />
          <div className="w-4 h-4 rounded-full" style={{ background: '#0d9488', marginLeft: -8, opacity: 0.8 }} />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0d9488)',
              border: '3px dashed rgba(255,255,255,0.3)',
            }}
          >
            🧑💻
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
            style={{ background: '#f59e0b', border: '2px solid #1e1040' }}
          >
            ⭐
          </div>
        </div>

        <div>
          <p className="text-white font-bold text-base" style={{ fontFamily: 'Fredoka', fontSize: 18 }}>Aryan Kumar</p>
          <p className="text-purple-300 text-xs">@aryan_explores</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPinDoodle size={12} color="#0d9488" />
            <span className="text-teal-300 text-[10px]">Bangalore, India</span>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-3 grid grid-cols-3 gap-2 text-center"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px dashed rgba(255,255,255,0.15)' }}
      >
        {[
          { val: '847', lbl: 'Solved' },
          { val: '12', lbl: 'Level' },
          { val: '68%', lbl: 'Rate' },
        ].map(s => (
          <div key={s.lbl}>
            <p className="text-white font-bold" style={{ fontFamily: 'Fredoka', fontSize: 18 }}>{s.val}</p>
            <p className="text-purple-300 text-[10px]">{s.lbl}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-300 text-[9px] tracking-widest uppercase">Explorer Since</p>
          <p className="text-white text-xs font-semibold">Jan 2024</p>
        </div>
        <div
          className="px-2 py-1 rounded-lg text-[10px] font-bold"
          style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b40' }}
        >
          🏅 Diamond
        </div>
      </div>

      <div className="absolute bottom-3 right-3 opacity-10">
        <CompassDoodle size={48} />
      </div>
    </div>
  )
}

// ─── Territory Stats Card ─────────────────────────────────────────────────────

function TerritoryCard({ emoji, value, label, sublabel, color, bg, accent, delay = 0, onClick }: {
  emoji: string; value: string; label: string; sublabel: string;
  color: string; bg: string; accent: string; delay?: number; onClick?: () => void;
}) {
  const [counted, setCounted] = useState(0)
  const numVal = parseInt(value.replace(/\D/g, ''), 10)

  useEffect(() => {
    let start = 0
    const end = numVal
    if (isNaN(end) || end <= 0) return
    const duration = 1000
    const step = Math.max(10, Math.floor(duration / end))
    const timer = setInterval(() => {
      start += Math.max(1, Math.ceil(end / 30))
      if (start >= end) { setCounted(end); clearInterval(timer) }
      else setCounted(start)
    }, step)
    return () => clearInterval(timer)
  }, [numVal])

  const display = isNaN(numVal) ? value : value.includes('%') ? `${counted}%` : counted.toString()

  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
      style={{
        background: bg,
        border: `1.5px solid ${accent}30`,
        boxShadow: `0 4px 20px ${accent}15`,
        animation: `float-in 0.5s ease ${delay}ms both`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl" style={{ animation: 'wander 4s ease-in-out infinite' }}>{emoji}</div>
        <div className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: `${accent}20`, color }}>
          Unlocked ✓
        </div>
      </div>
      <div>
        <p className="font-bold leading-none" style={{ fontFamily: 'Fredoka', fontSize: 28, color }}>{display}</p>
        <p className="text-gray-700 font-semibold text-sm mt-0.5">{label}</p>
        <p className="text-gray-400 text-[11px] mt-1 leading-tight">{sublabel}</p>
      </div>
      <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
        <StarDoodle size={24} color={color} />
      </div>
    </div>
  )
}

// ─── Problems View Component ─────────────────────────────────────────────────

function ProblemsView({ problems, onSelectProblem }: { problems: any[]; onSelectProblem: (p: any) => void }) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('All')

  const allTags = ['All', ...Array.from(new Set(problems.flatMap(p => p.tags)))]

  const filtered = problems.filter(p => {
    const matchesDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag)
    return matchesDiff && matchesSearch && matchesTag
  })

  return (
    <div className="flex flex-col gap-6 mt-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search problems by title, tag, or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
          <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map(d => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(d)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: filterDifficulty === d ? (d === 'Easy' ? '#10b981' : d === 'Medium' ? '#f59e0b' : d === 'Hard' ? '#ef4444' : '#7c3aed') : '#f3f4f6',
                color: filterDifficulty === d ? '#ffffff' : '#4b5563',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">Biomes:</span>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedTag === tag ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div
            key={p.title}
            onClick={() => onSelectProblem(p)}
            className="bg-white rounded-2xl p-5 border border-purple-50 hover:border-purple-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{p.solved ? '✅' : '🗺️'}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{
                    background: p.difficulty === 'Easy' ? '#d1fae5' : p.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                    color: p.difficulty === 'Easy' ? '#10b981' : p.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
                  }}
                >
                  {p.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{p.desc || 'Challenge your algorithm skills and unlock new realm points.'}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tags.map((t: string) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                <span>{p.timeAgo}</span>
                <span className="text-purple-600 font-semibold flex items-center gap-1">
                  Explore Quest →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Journey View Component ──────────────────────────────────────────────────

function JourneyView() {
  const biomes = [
    { title: 'Array Archipelago', level: '1-3', status: 'Completed', icon: '🏝️', color: '#7c3aed', desc: 'Master memory layouts, two pointers, and sliding windows.' },
    { title: 'Tree Canopy & Forest', level: '4-7', status: 'Completed', icon: '🌲', color: '#0d9488', desc: 'Traverse root structures, recursion trees, and segment paths.' },
    { title: 'Graph Mountain Range', level: '8-10', status: 'In Progress', icon: '🏔️', color: '#f59e0b', desc: 'Conquer shortest path networks, topological ordering & cycles.' },
    { title: 'DP Caverns of Echoes', level: '11-14', status: 'Locked', icon: '💎', color: '#ef4444', desc: 'Discover overlapping subproblems and optimal substructures.' },
    { title: 'System Architecture Peak', level: '15+', status: 'Locked', icon: '👑', color: '#8b5cf6', desc: 'The ultimate summit: distributed scaling, caches, and locks.' },
  ]

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-teal-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <CompassDoodle size={80} className="absolute right-4 bottom-4 opacity-20" />
        <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Expedition Roadmap</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1 mb-2" style={{ fontFamily: 'Fredoka' }}>The Realm of Code & Logic</h2>
        <p className="text-purple-200 text-sm max-w-xl">
          Traverse 5 distinct biomes to become an Atlas Grandmaster. Each biome contains trials, rare treasure chests, and legendary boss problems.
        </p>
      </div>

      <div className="flex flex-col gap-4 relative pl-4 border-l-2 border-dashed border-purple-300 my-2 ml-4">
        {biomes.map((b, idx) => (
          <div key={b.title} className="relative flex items-start gap-4 bg-white p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
            <div
              className="absolute -left-[33px] top-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow"
              style={{ background: b.color }}
            >
              {idx + 1}
            </div>

            <div className="text-3xl p-2 rounded-xl bg-purple-50">{b.icon}</div>

            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Fredoka' }}>{b.title}</h3>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{
                    background: b.status === 'Completed' ? '#d1fae5' : b.status === 'In Progress' ? '#fef3c7' : '#f3f4f6',
                    color: b.status === 'Completed' ? '#059669' : b.status === 'In Progress' ? '#d97706' : '#9ca3af',
                  }}
                >
                  {b.status}
                </span>
              </div>
              <p className="text-gray-600 text-xs mt-1 mb-3">{b.desc}</p>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Biome Tier: Level {b.level}</span>
                <button className="text-purple-600 font-bold hover:underline">View Territory Map →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Profile View Component ──────────────────────────────────────────────────

function ProfileView() {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Fredoka' }}>Explorer Codex & Attributes</h3>
              <span className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full">Rank #42 Global</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Algorithm Speed', val: '98th %', icon: '⚡' },
                { label: 'Code Cleanliness', val: '94/100', icon: '✨' },
                { label: 'Consistency', val: '28 Days', icon: '🔥' },
                { label: 'Biomes Mastery', val: '4 / 5', icon: '🗺️' },
              ].map(stat => (
                <div key={stat.label} className="bg-purple-50/50 p-3 rounded-xl border border-purple-100 text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="font-bold text-gray-800 text-sm">{stat.val}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-gray-700 text-sm mb-3">Skill Radar & Territory Mastery</h4>
            <div className="space-y-3">
              {[
                { name: 'Arrays & Hashing', pct: 85, color: '#7c3aed' },
                { name: 'Dynamic Programming', pct: 60, color: '#0d9488' },
                { name: 'Graph Algorithms', pct: 75, color: '#f59e0b' },
                { name: 'Tree Traversals', pct: 90, color: '#ef4444' },
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-gray-400 font-bold">{skill.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full" style={{ width: `${skill.pct}%`, background: skill.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Problem Modal ───────────────────────────────────────────────────────────

function ProblemModal({ problem, onClose, onSolve }: { problem: any; onClose: () => void; onSolve: () => void }) {
  const [rated, setRated] = useState(false)
  if (!problem) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-md"
            style={{
              background: problem.difficulty === 'Easy' ? '#d1fae5' : problem.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
              color: problem.difficulty === 'Easy' ? '#10b981' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
            }}
          >
            {problem.difficulty}
          </span>
          {problem.tags.map((t: string) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 font-medium">{t}</span>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Fredoka' }}>{problem.title}</h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {problem.desc || 'Given an input dataset, write an efficient algorithm to compute optimal bounds, process edges, and return the expected target under strict time limit memory limits.'}
        </p>

        <div className="bg-gray-900 text-gray-100 rounded-xl p-4 font-mono text-xs mb-4">
          <div className="text-gray-400 mb-1">// Example TestCase 1:</div>
          <div>Input: nums = [2,7,11,15], target = 9</div>
          <div>Output: [0,1]</div>
          <div className="text-gray-400 mt-2">// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</div>
        </div>

        <div className="my-6 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
          <StarRating label="Rate problem difficulty after expedition" onRate={() => setRated(true)} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button
            onClick={() => {
              onSolve()
              onClose()
            }}
            className="px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #0d9488)' }}
          >
            {problem.solved ? 'Solve Again 🔄' : 'Complete Expedition 🚀'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null)

  const [problems, setProblems] = useState([
    { title: 'Two Sum', difficulty: 'Easy' as const, tags: ['Array', 'Hash Map'], timeAgo: '2h ago', solved: true, desc: 'Find two numbers in an array that add up to a target value.' },
    { title: 'LRU Cache', difficulty: 'Hard' as const, tags: ['Design', 'Linked List'], timeAgo: '1d ago', solved: true, desc: 'Design a data structure that follows Least Recently Used cache eviction policy.' },
    { title: 'Word Ladder II', difficulty: 'Hard' as const, tags: ['BFS', 'Graph'], timeAgo: '2d ago', solved: false, desc: 'Find all shortest transformation sequences from startWord to endWord.' },
    { title: 'Coin Change', difficulty: 'Medium' as const, tags: ['DP'], timeAgo: '3d ago', solved: true, desc: 'Compute fewest coins needed to make up a given amount.' },
    { title: 'Merge K Sorted Lists', difficulty: 'Hard' as const, tags: ['Heap'], timeAgo: '5d ago', solved: true, desc: 'Merge k sorted linked lists into one sorted linked list.' },
    { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' as const, tags: ['Binary Search', 'Tree'], timeAgo: '6d ago', solved: false, desc: 'Return level order traversal of nodes values.' },
  ])

  const topics = [
    { label: 'Arrays & Strings', solved: 142, total: 180, color: '#7c3aed' },
    { label: 'Dynamic Programming', solved: 78, total: 150, color: '#0d9488' },
    { label: 'Graphs & Trees', solved: 95, total: 130, color: '#f59e0b' },
    { label: 'Sliding Window', solved: 38, total: 45, color: '#ef4444' },
    { label: 'Binary Search', solved: 52, total: 60, color: '#8b5cf6' },
  ]

  const badges = [
    { emoji: '🗺️', title: 'First Territory', desc: 'Solved first problem', earned: true },
    { emoji: '🔥', title: 'On Fire', desc: '7-day streak', earned: true },
    { emoji: '⚡', title: 'Speed Coder', desc: 'Solved in <5 min', earned: true },
    { emoji: '🏔️', title: 'Mountaineer', desc: '50 Hard problems', earned: false },
    { emoji: '🌊', title: 'Deep Diver', desc: '100 DP problems', earned: false },
    { emoji: '👑', title: 'Atlas King', desc: 'Rank #1', earned: false },
  ]

  const handleSolveProblem = (title: string) => {
    setProblems(prev =>
      prev.map(p => (p.title === title ? { ...p, solved: true, timeAgo: 'Just now' } : p))
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0ede8', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar onTabChange={setActiveTab} activeTab={activeTab} />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <HeroSection />

        {/* Dynamic Tab Switching */}
        {activeTab === 'Dashboard' && (
          <div className="animate-fadeIn">
            {/* Bento Grid Row 1 */}
            <div className="grid gap-4 mt-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              <div className="row-span-2" style={{ minHeight: 360 }}>
                <ProfileCard onClick={() => setActiveTab('Profile')} />
              </div>
              <TerritoryCard emoji="🏝️" value="847" label="Territories Unlocked" sublabel="Problems solved across all biomes" color="#7c3aed" bg="#faf5ff" accent="#7c3aed" delay={100} onClick={() => setActiveTab('Problems')} />
              <TerritoryCard emoji="🔥" value="7" label="Day Streak" sublabel="🔥 7-day streak — keep exploring!" color="#ef4444" bg="#fff5f5" accent="#ef4444" delay={200} />
              <TerritoryCard emoji="🌍" value="124" label="Active Days" sublabel="Days you ventured into the code jungle" color="#0d9488" bg="#f0fdfa" accent="#0d9488" delay={300} onClick={() => setActiveTab('Journey')} />
              <TerritoryCard emoji="⚡" value="68%" label="Acceptance Rate" sublabel="Your solutions pass the wilderness trials" color="#f59e0b" bg="#fffbeb" accent="#f59e0b" delay={400} />
            </div>

            {/* Row 2: Heatmap + Rings */}
            <div className="grid gap-4 mt-4 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl p-5 overflow-hidden" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(124, 58, 237, 0.1)', animation: 'float-in 0.5s ease 0.3s both' }}>
                <StreakHeatmap />
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <span>🗺️</span>
                  <span>Each cell = one day of exploration. Color = terrain intensity.</span>
                </div>
              </div>
              <div className="lg:col-span-1 rounded-2xl p-5" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(124, 58, 237, 0.1)', animation: 'float-in 0.5s ease 0.4s both' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontFamily: 'Fredoka', fontSize: 16, fontWeight: 600, color: '#1f1235' }}>Territory Rings</span>
                  <RocketDoodle size={20} className="opacity-70" />
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <ProgressRing value={142} max={180} color="#7c3aed" bg="#ede9fe" label="Arrays" sublabel="solved" />
                  <ProgressRing value={78} max={150} color="#0d9488" bg="#ccfbf1" label="DP" sublabel="solved" />
                  <ProgressRing value={95} max={130} color="#f59e0b" bg="#fef3c7" label="Graphs" sublabel="solved" />
                  <ProgressRing value={52} max={60} color="#ef4444" bg="#fee2e2" label="Binary" sublabel="solved" />
                </div>
              </div>
            </div>

            {/* Row 3: Topics + Activity + Rating/Badges */}
            <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl p-5" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(124, 58, 237, 0.1)', animation: 'float-in 0.5s ease 0.5s both' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontFamily: 'Fredoka', fontSize: 16, fontWeight: 600, color: '#1f1235' }}>Biome Progress</span>
                  <DottedPath className="opacity-60" />
                </div>
                <div className="flex flex-col gap-3">
                  {topics.map(t => <TopicBar key={t.label} {...t} />)}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(124, 58, 237, 0.1)', animation: 'float-in 0.5s ease 0.6s both' }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontFamily: 'Fredoka', fontSize: 16, fontWeight: 600, color: '#1f1235' }}>Recent Expeditions</span>
                  <button onClick={() => setActiveTab('Problems')} className="text-xs font-bold text-purple-600 hover:underline">View All →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {problems.slice(0, 5).map(p => <ProblemCard key={p.title} {...p} onClick={() => setSelectedProblem(p)} />)}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl p-5 flex-shrink-0" style={{ background: 'linear-gradient(160deg, #faf5ff, #f0fdfa)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1.5px solid #ddd6fe', animation: 'float-in 0.5s ease 0.7s both' }}>
                  <div className="flex items-center gap-1 mb-3 justify-center">
                    <TreasureChest size={20} />
                    <span style={{ fontFamily: 'Fredoka', fontSize: 15, fontWeight: 600, color: '#1f1235' }}>Rate Your Solution</span>
                  </div>
                  <StarRating label="How hard was it?" />
                </div>

                <div className="rounded-2xl p-4 flex-1" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(124, 58, 237, 0.1)', animation: 'float-in 0.5s ease 0.8s both' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontFamily: 'Fredoka', fontSize: 15, fontWeight: 600, color: '#1f1235' }}>Achievements</span>
                    <StarDoodle size={14} color="#f59e0b" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {badges.map(b => <Badge key={b.title} {...b} onClick={() => setActiveTab('Profile')} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Problems' && (
          <ProblemsView problems={problems} onSelectProblem={(p) => setSelectedProblem(p)} />
        )}

        {activeTab === 'Journey' && (
          <JourneyView />
        )}

        {activeTab === 'Profile' && (
          <ProfileView />
        )}

        {/* Problem Details Modal */}
        {selectedProblem && (
          <ProblemModal
            problem={selectedProblem}
            onClose={() => setSelectedProblem(null)}
            onSolve={() => handleSolveProblem(selectedProblem.title)}
          />
        )}

        {/* Footer doodle strip */}
        <div className="flex items-center justify-center gap-4 mt-12 opacity-30">
          <DottedPath />
          <CompassDoodle size={28} />
          <DottedPath />
          <StarDoodle size={16} color="#7c3aed" />
          <DottedPath />
        </div>
      </main>
    </div>
  )
}
