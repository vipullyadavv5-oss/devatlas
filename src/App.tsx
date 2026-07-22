import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { DashboardWidgets } from './components/DashboardWidgets'
import { InteractiveRoadmap } from './components/InteractiveRoadmap'
import { GamificationView } from './components/GamificationView'
import { AiAssistantModal } from './components/AiAssistantModal'
import { SearchModal, NotificationsDrawer } from './components/SearchAndNotifications'
import { Footer } from './components/Footer'
import { SparklesDoodle, RocketDoodle, CodingCatDoodle, LightningDoodle } from './components/Doodles'

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [streak, setStreak] = useState<number>(12)
  const [xp, setXp] = useState<number>(3890)
  const [level, setLevel] = useState<number>(14)
  const [darkMode, setDarkMode] = useState<boolean>(true)

  // Modals state
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false)
  const [aiPrompt, setAiPrompt] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)

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

  const handleCompleteTopic = (nodeId: string, xpEarned: number) => {
    setXp((prev) => {
      const newXp = prev + xpEarned
      if (newXp >= 5000) setLevel(15)
      return newXp
    })
  }

  const openAiWithPrompt = (promptText?: string) => {
    setAiPrompt(promptText || '')
    setIsAiOpen(true)
  }

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
      <main className="pb-16 space-y-12">
        {/* Render Hero only on Dashboard tab for high conversion impact */}
        {activeTab === 'dashboard' && (
          <HeroSection
            onStartLearning={() => setActiveTab('roadmaps')}
            onGenerateRoadmap={() => openAiWithPrompt('Generate a custom AI roadmap for my career goal')}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && (
            <DashboardWidgets
              streak={streak}
              xp={xp}
              level={level}
              onNavigateToRoadmap={() => setActiveTab('roadmaps')}
              onOpenAiAssistant={openAiWithPrompt}
            />
          )}

          {activeTab === 'roadmaps' && (
            <InteractiveRoadmap onCompleteTopic={handleCompleteTopic} />
          )}

          {activeTab === 'ai' && (
            <div className="py-8 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-purple-500/30 text-center space-y-4 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-cyan-500 mx-auto flex items-center justify-center text-3xl shadow-xl glow-purple animate-bounce">
                  🤖
                </div>
                <h2 className="text-3xl font-extrabold font-space">DevAtlas AI Coding Assistant</h2>
                <p className="text-sm text-zinc-400">
                  Ask questions, debug code, or request custom roadmaps powered by Gemini AI.
                </p>
                <button
                  onClick={() => openAiWithPrompt()}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-lg hover:scale-105 transition-all"
                >
                  🚀 Open AI Chat Window
                </button>
              </div>
            </div>
          )}

          {activeTab === 'gamification' && <GamificationView />}
        </div>
      </main>

      {/* Floating AI Trigger Button */}
      <button
        onClick={() => openAiWithPrompt()}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all glow-purple flex items-center gap-2 group"
        title="Open DevAtlas AI Assistant"
      >
        <SparklesDoodle size={24} color="#FFFFFF" className="group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-space font-bold text-xs pr-1">Ask AI</span>
      </button>

      {/* Modals & Drawers */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiPrompt}
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
