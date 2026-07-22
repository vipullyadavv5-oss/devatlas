import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { DashboardWidgets } from './components/DashboardWidgets'
import { InteractiveRoadmap } from './components/InteractiveRoadmap'
import { GamificationView } from './components/GamificationView'
import { AiAssistantModal } from './components/AiAssistantModal'
import { SearchModal, NotificationsDrawer } from './components/SearchAndNotifications'
import { Footer } from './components/Footer'
import { SparklesDoodle } from './components/Doodles'
import { fetchUserProfile, UserProfileData, getGitHubAuthUrl } from './services/api'
import { RefreshCw, Github, AlertCircle } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [username, setUsername] = useState<string>('vipullyadavv5-oss')
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [darkMode, setDarkMode] = useState<boolean>(true)

  // Modals state
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false)
  const [aiPrompt, setAiPrompt] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)

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
      setProfileError("Backend API unavailable or username not found. Run FastAPI server on 127.0.0.1:8000!")
    } finally {
      setIsLoadingProfile(false)
    }
  }

  useEffect(() => {
    loadProfile(username)
  }, [username])

  // Keyboard shortcut Cmd + K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
      alert("GitHub OAuth is not configured in backend/.env yet!")
    }
  }

  const streak = profileData ? profileData.streak : 12
  const xp = profileData ? profileData.xp : 3890
  const level = profileData ? profileData.level : 14
  const devScore = profileData ? profileData.dev_score : 84.5

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#09090B] text-zinc-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        xp={xp}
        level={level}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content View Switcher */}
      <main className="pb-16 space-y-8">
        {/* Real Profile Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={profileData?.avatar_url || "https://github.com/github.png"}
                alt={username}
                className="w-16 h-16 rounded-2xl border-2 border-purple-500/40 shadow-xl glow-purple object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-space text-zinc-100">@{username}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                    Live Verified Data
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  DevScore: <span className="text-cyan-300 font-bold font-mono text-sm">{devScore} / 100</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-initial flex items-center gap-2 bg-zinc-950/80 px-3 py-2 rounded-2xl border border-white/10 text-xs">
                <span className="text-zinc-400">Search User:</span>
                <input
                  type="text"
                  defaultValue={username}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim()
                      if (val) setUsername(val)
                    }
                  }}
                  className="bg-transparent text-purple-300 font-bold focus:outline-none w-28"
                  placeholder="github user..."
                />
              </div>

              <button
                onClick={handleGitHubLogin}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-purple-500/40 text-xs font-bold text-zinc-200 transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Connect GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State Banner */}
        {isLoadingProfile && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-4 rounded-2xl border border-cyan-500/30 flex items-center gap-3 text-cyan-300 text-xs font-medium animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Fetching live stats across GitHub REST, LeetCode GraphQL, and Codeforces API...</span>
            </div>
          </div>
        )}

        {/* Error Banner */}
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

        {/* Hero Banner on Dashboard */}
        {activeTab === 'dashboard' && (
          <HeroSection
            onStartLearning={() => setActiveTab('roadmaps')}
            onGenerateRoadmap={() => {
              setAiPrompt('Generate a custom AI roadmap for my developer stats')
              setIsAiOpen(true)
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && (
            <DashboardWidgets
              streak={streak}
              xp={xp}
              level={level}
              onNavigateToRoadmap={() => setActiveTab('roadmaps')}
              onOpenAiAssistant={(p) => {
                setAiPrompt(p || '')
                setIsAiOpen(true)
              }}
            />
          )}

          {activeTab === 'roadmaps' && (
            <InteractiveRoadmap onCompleteTopic={(id, xpEarned) => loadProfile(username)} />
          )}

          {activeTab === 'ai' && (
            <div className="py-8 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-purple-500/30 text-center space-y-4 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-cyan-500 mx-auto flex items-center justify-center text-3xl shadow-xl glow-purple animate-bounce">
                  🤖
                </div>
                <h2 className="text-3xl font-extrabold font-space">DevAtlas AI Coding Assistant</h2>
                <p className="text-sm text-zinc-400">
                  Real Gemini API integration sending structured developer stats JSON.
                </p>
                <button
                  onClick={() => {
                    setAiPrompt('')
                    setIsAiOpen(true)
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-lg hover:scale-105 transition-all"
                >
                  🚀 Launch Real AI Chat
                </button>
              </div>
            </div>
          )}

          {activeTab === 'gamification' && <GamificationView />}
        </div>
      </main>

      {/* Floating AI Trigger Button */}
      <button
        onClick={() => {
          setAiPrompt('')
          setIsAiOpen(true)
        }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all glow-purple flex items-center gap-2 group"
        title="Open DevAtlas AI Assistant"
      >
        <SparklesDoodle size={24} color="#FFFFFF" className="group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-space font-bold text-xs pr-1">Ask Gemini AI</span>
      </button>

      {/* Modals & Drawers */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiPrompt}
        userContext={profileData}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={() => setActiveTab('roadmaps')}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
