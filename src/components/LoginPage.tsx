import React from 'react'
import { Github, ArrowLeft, Shield, Star, GitCommit, Code2 } from 'lucide-react'

interface LoginPageProps {
  onGitHubLogin: () => void
  onBack: () => void
}

const features = [
  {
    icon: <Github size={20} />,
    title: 'GitHub Integration',
    desc: 'Fetch repos, commits, streak, stars, and language breakdown automatically.',
  },
  {
    icon: <Code2 size={20} />,
    title: 'LeetCode + Codeforces',
    desc: 'Your DSA problem-solving stats and contest rating history — all in one place.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Transparent DevScore',
    desc: 'A deterministic 0–100 score calculated openly from real platform data.',
  },
  {
    icon: <Star size={20} />,
    title: 'Verified Profile',
    desc: 'Show employers and peers a real, tamper-proof developer profile card.',
  },
]

export function LoginPage({ onGitHubLogin, onBack }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#374151',
          background: 'none',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '8px 14px',
          cursor: 'pointer',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor = '#FF7A00'
          ;(e.currentTarget as HTMLElement).style.color = '#FF7A00'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'
          ;(e.currentTarget as HTMLElement).style.color = '#374151'
        }}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          maxWidth: '900px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left: Features list */}
        <div>
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px',
            }}
          >
            <span style={{ fontSize: '36px' }}>🦉</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: '24px',
                color: '#111827',
                letterSpacing: '-0.03em',
              }}
            >
              DevAtlas
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            Your Verified{' '}
            <span style={{ color: '#FF7A00' }}>Developer Profile</span>{' '}
            in One Click
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: '#6B7280',
              lineHeight: '1.65',
              marginBottom: '32px',
            }}
          >
            Connect GitHub to instantly generate your unified developer profile with real stats,
            transparent scoring, and shareable portfolio card.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#FFF7F0',
                    border: '1.5px solid #FFD5A8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF7A00',
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '2px',
                    }}
                  >
                    {f.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E5E7EB',
            borderRadius: '16px',
            padding: '40px 32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Owl */}
          <div style={{ fontSize: '72px', lineHeight: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}>
            🦉
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '6px',
              }}
            >
              Sign in to DevAtlas
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
              We only request read access to your public profile and repositories.
            </p>
          </div>

          {/* GitHub OAuth button */}
          <button
            onClick={onGitHubLogin}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: '10px',
              background: '#111827',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'background 0.18s, transform 0.1s',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#374151'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#111827'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            <Github size={20} />
            Continue with GitHub
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>

          {/* Back to landing */}
          <button
            onClick={onBack}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#F9FAFB',
              color: '#374151',
              border: '1.5px solid #E5E7EB',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#FF7A00')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB')}
          >
            Browse without signing in
          </button>

          <p style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'center', lineHeight: '1.6' }}>
            By signing in, you agree to our Terms of Service. We never store your GitHub token and never write to your repos.
          </p>
        </div>
      </div>
    </div>
  )
}
