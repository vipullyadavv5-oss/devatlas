import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { DashboardWidgets } from './components/DashboardWidgets'
import { Footer } from './components/Footer'
import { fetchUserProfile, UserProfileData, getGitHubAuthUrl } from './services/api'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function App() {
  const [username, setUsername] = useState<string>('vipullyadavv5-oss')
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(true)

  // Parse URL query parameter for username if redirected from GitHub OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const u = params.get('username')
    if (u) {
      setUsername(u)
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
      setProfileError("Backend API unavailable. Run FastAPI server on 127.0.0.1:8000!")
    } finally {
      setIsLoadingProfile(false)
    }
  }

  useEffect(() => {
    loadProfile(username)
  }, [username])

  // Sync dark class on html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleGitHubLogin = async () => {
    try {
      const url = await getGitHubAuthUrl()
      window.location.href = url
    } catch (err) {
      alert("GitHub OAuth credentials not configured in backend/.env yet!")
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#09090B] text-zinc-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <Navbar
        devScore={profileData?.dev_score}
        onGitHubLogin={handleGitHubLogin}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container */}
      <main className="pb-16 space-y-8">
        {/* Search Hero Section */}
        <HeroSection
          onSearchUser={(searchedUsername) => setUsername(searchedUsername)}
          onGitHubLogin={handleGitHubLogin}
        />

        {/* Loading Indicator */}
        {isLoadingProfile && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-4 rounded-2xl border border-cyan-500/30 flex items-center justify-center gap-3 text-cyan-300 text-xs font-medium animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Fetching real-time stats across GitHub, LeetCode & Codeforces...</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {profileError && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between text-amber-300 text-xs font-medium">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>{profileError}</span>
              </div>
              <button
                onClick={() => loadProfile(username)}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Profile Stats & DevScore Widgets */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardWidgets
            profileData={profileData}
            isLoading={isLoadingProfile}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
