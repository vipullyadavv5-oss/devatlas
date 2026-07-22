import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { DashboardWidgets } from './components/DashboardWidgets'
import { Footer } from './components/Footer'
import { LoginPage } from './components/LoginPage'
import { fetchUserProfile, UserProfileData, getGitHubAuthUrl } from './services/api'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function App() {
  const [username, setUsername] = useState<string>('vipullyadavv5-oss')
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false)

  // Parse URL query parameter for username if redirected from GitHub OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const u = params.get('username')
    if (u) {
      setUsername(u)
    }
    // If coming back from GitHub OAuth callback
    const code = params.get('code')
    if (code) {
      setShowLoginPage(false)
    }
  }, [])

  // Fetch real profile data from FastAPI backend
  const loadProfile = async (userToFetch: string) => {
    setIsLoadingProfile(true)
    setProfileError(null)
    try {
      const data = await fetchUserProfile(userToFetch)
      setProfileData(data)
    } catch (err: any) {
      setProfileError('Backend API unavailable. Run FastAPI server on 127.0.0.1:8000!')
    } finally {
      setIsLoadingProfile(false)
    }
  }

  useEffect(() => {
    loadProfile(username)
  }, [username])

  const handleGitHubLogin = async () => {
    try {
      const url = await getGitHubAuthUrl()
      window.location.href = url
    } catch (err) {
      // Show login page with the GitHub button instead of alert
      setShowLoginPage(true)
    }
  }

  // Show dedicated login page
  if (showLoginPage) {
    return (
      <LoginPage
        onGitHubLogin={async () => {
          try {
            const url = await getGitHubAuthUrl()
            window.location.href = url
          } catch {
            alert('GitHub OAuth credentials not configured in backend/.env yet!')
          }
        }}
        onBack={() => setShowLoginPage(false)}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        color: '#111827',
      }}
    >
      {/* Navigation Header */}
      <Navbar
        devScore={profileData?.dev_score}
        onGitHubLogin={() => setShowLoginPage(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onSearchUser={(searchedUsername) => setUsername(searchedUsername)}
          onGitHubLogin={() => setShowLoginPage(true)}
        />

        {/* Loading Indicator */}
        {isLoadingProfile && (
          <div
            style={{
              maxWidth: '1200px',
              margin: '24px auto',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                background: '#FFFBF5',
                border: '1px solid #FFD5A8',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#B45309',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Fetching real-time stats across GitHub, LeetCode &amp; Codeforces...
            </div>
          </div>
        )}

        {/* Error Notification */}
        {profileError && (
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto 16px',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B91C1C', fontSize: '13px', fontWeight: 600 }}>
                <AlertCircle size={16} />
                {profileError}
              </div>
              <button
                onClick={() => loadProfile(username)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: '#EF4444',
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Profile Stats & DevScore Widgets */}
        <DashboardWidgets
          profileData={profileData}
          isLoading={isLoadingProfile}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Spin keyframe inline for loading icon */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
