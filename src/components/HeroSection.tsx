import React, { useState } from 'react'
import { Search, Github } from 'lucide-react'

interface HeroSectionProps {
  onSearchUser: (username: string) => void
  onGitHubLogin: () => void
}

// Platform logos as styled pill cards (like Codolio's chain)
const platforms = [
  { name: 'GFG', color: '#2F8D46', emoji: '꩜', bg: '#F0FFF4' },
  { name: 'LC', color: '#FFA116', emoji: '⚡', bg: '#FFFBEB' },
  { name: 'CC', color: '#1A1A2E', emoji: '👨‍🍳', bg: '#F8F8FF' },
  { name: 'CF', color: '#318CE7', emoji: '🏆', bg: '#EFF6FF' },
  { name: 'GH', color: '#111827', emoji: '🐙', bg: '#F9FAFB' },
  { name: 'HR', color: '#00EA64', emoji: '✦', bg: '#F0FFF7' },
]

const featureCards = [
  {
    icon: '🖥️',
    title: 'My Workspace',
    desc: 'Tag & filter questions for easy organization',
  },
  {
    icon: '📋',
    title: 'Sheet Tracker',
    desc: 'Track all coding sheets in one place',
  },
  {
    icon: '📝',
    title: 'Enhanced Notes',
    desc: 'Add detailed notes to questions easily.',
  },
]

export function HeroSection({ onSearchUser, onGitHubLogin }: HeroSectionProps) {
  const [inputUser, setInputUser] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUser.trim()) {
      onSearchUser(inputUser.trim())
    }
  }

  return (
    <section
      style={{
        background: '#FFFFFF',
        paddingTop: '0',
        overflow: 'hidden',
      }}
    >
      {/* ========== TOP HERO: Owl + Platform Chain ========== */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Owl mascot with platform arc */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Platform chain (left arc) */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-30%)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px',
            }}
          >
            {platforms.map((p, i) => (
              <div
                key={p.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: p.bg,
                  border: `1.5px solid ${p.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transform: `translateY(${Math.sin(i * 0.9) * 12}px)`,
                  transition: 'transform 0.3s ease',
                  cursor: 'default',
                  flexShrink: 0,
                }}
                title={p.name}
              >
                {p.emoji}
              </div>
            ))}
            {/* Dashed chain connector */}
          </div>

          {/* Owl mascot */}
          <div
            className="owl-float"
            style={{
              position: 'absolute',
              right: '5%',
              fontSize: '110px',
              lineHeight: 1,
              userSelect: 'none',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))',
            }}
          >
            🦉
          </div>
        </div>

        {/* ---- Main Hero Text ---- */}
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            padding: '32px 0 24px',
          }}
        >
          {/* "Simplify Your Prep" */}
          <div style={{ marginBottom: '24px' }}>
            <h1
              className="section-heading"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '12px' }}
            >
              Simplify Your Prep
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#4B5563',
                maxWidth: '560px',
                lineHeight: '1.65',
              }}
            >
              Say goodbye to last-minute stress. Track all your questions and
              notes in one place for easy review and revision.
            </p>
            <a href="#" className="text-orange-link" style={{ marginTop: '12px', fontSize: '14px' }}>
              Try Question Tracker →
            </a>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              maxWidth: '480px',
              background: '#F9FAFB',
              border: '1.5px solid #E5E7EB',
              borderRadius: '10px',
              padding: '6px 8px 6px 14px',
              marginBottom: '28px',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF7A00')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E7EB')}
          >
            <Search size={16} color="#9CA3AF" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
              placeholder="Enter GitHub username..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: '#111827',
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button type="submit" className="btn-orange" style={{ padding: '7px 18px', fontSize: '13px' }}>
              Search
            </button>
          </form>

          {/* Sign in with GitHub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>Or sign in directly:</span>
            <button
              onClick={onGitHubLogin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1.5px solid #111827',
                background: '#111827',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#374151')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#111827')}
            >
              <Github size={15} />
              Sign in with GitHub
            </button>
          </div>
        </div>

        {/* ---- Feature cards row ---- */}
        <div
          style={{
            display: 'flex',
            gap: '1px',
            background: '#E5E7EB',
            borderRadius: '12px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '780px',
            marginBottom: '0',
          }}
        >
          {featureCards.map((card) => (
            <div
              key={card.title}
              style={{
                flex: 1,
                background: '#FFFFFF',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#FFF7F0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
            >
              <span style={{ fontSize: '28px' }}>{card.icon}</span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {card.title}
              </span>
              <span style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.5' }}>{card.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#E5E7EB', marginTop: '40px' }} />
    </section>
  )
}
