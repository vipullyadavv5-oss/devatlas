import React, { useState } from 'react'
import { Sun, Moon, Github } from 'lucide-react'

interface NavbarProps {
  devScore?: number
  onGitHubLogin: () => void
  darkMode: boolean
  setDarkMode: (val: boolean) => void
}

export function Navbar({ onGitHubLogin, darkMode, setDarkMode }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Question Tracker', href: '#questions' },
    { label: 'Company Wise Kit', href: '#company', badge: true },
    { label: 'Event Tracker', href: '#events' },
    { label: 'Profile Tracker', href: '#profile' },
  ]

  return (
    <header className="codo-navbar">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* ---- Brand Logo ---- */}
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          {/* Owl mascot */}
          <span style={{ fontSize: '28px', lineHeight: 1 }}>🦉</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              color: '#111827',
              letterSpacing: '-0.03em',
            }}
          >
            DevAtlas
          </span>
        </a>

        {/* ---- Desktop Nav Links ---- */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
            justifyContent: 'center',
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                position: 'relative',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                transition: 'background 0.15s, color 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#FFF7F0'
                ;(e.currentTarget as HTMLElement).style.color = '#FF7A00'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = '#374151'
              }}
            >
              {link.label}
              {link.badge && (
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    background: '#FF7A00',
                    color: '#fff',
                    borderRadius: '99px',
                    padding: '1px 5px',
                    letterSpacing: '0.05em',
                  }}
                >
                  NEW
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* ---- Right Controls ---- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#FF7A00'
              ;(e.currentTarget as HTMLElement).style.color = '#FF7A00'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'
              ;(e.currentTarget as HTMLElement).style.color = '#6B7280'
            }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Login Button */}
          <button
            onClick={onGitHubLogin}
            className="btn-orange"
            style={{ gap: '6px' }}
          >
            <Github size={15} />
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
