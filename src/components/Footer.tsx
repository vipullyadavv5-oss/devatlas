import React from 'react'
import { Github, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #E5E7EB',
        background: '#FAFAFA',
        padding: '40px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🦉</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: '18px',
              color: '#111827',
            }}
          >
            DevAtlas
          </span>
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>
            — Your Verified Developer Profile
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {['About', 'Privacy', 'Terms', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: '13px',
                color: '#6B7280',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FF7A00')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6B7280')}
            >
              {link}
            </a>
          ))}
          <a
            href="https://github.com/vipullyadavv5-oss/devatlas"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              color: '#374151',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#111827'
              ;(e.currentTarget as HTMLElement).style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'
              ;(e.currentTarget as HTMLElement).style.color = '#374151'
            }}
          >
            <Github size={14} />
            GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '20px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
          © 2024 DevAtlas. Aggregates public data from GitHub, LeetCode &amp; Codeforces APIs.
        </p>
        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
          Built with ❤️ using FastAPI + React + Vite
        </p>
      </div>
    </footer>
  )
}
