import React, { useState, useEffect } from 'react'
import { Search, Bell, Moon, Sun, Flame, Zap, Trophy, Compass, Sparkles, User, Shield } from 'lucide-react'

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  streak: number
  xp: number
  level: number
  onOpenSearch: () => void
  onOpenNotifications: () => void
  darkMode: boolean
  setDarkMode: (val: boolean) => void
}

export function Navbar({
  activeTab,
  setActiveTab,
  streak,
  xp,
  level,
  onOpenSearch,
  onOpenNotifications,
  darkMode,
  setDarkMode
}: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'roadmaps', label: 'Roadmaps', icon: Sparkles },
    { id: 'ai', label: 'AI Assistant', icon: Zap },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
  ]

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center glow-purple group-hover:scale-105 transition-transform">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <span className="text-xl font-bold font-space gradient-text-purple tracking-tight">
              DevAtlas
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              v2.0 Gen-Z
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-2xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-purple-600/80 to-indigo-600/80 shadow-lg border border-purple-400/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300 animate-bounce' : ''}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Quick Stats & Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-semibold">
            <div className="flex items-center gap-1 text-amber-400" title="Daily Streak">
              <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
              <span>{streak}d</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-1 text-purple-400" title="Total XP">
              <Zap className="w-4 h-4 fill-purple-400" />
              <span>{xp} XP</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-1 text-cyan-400" title="Current Level">
              <Shield className="w-4 h-4" />
              <span>Lvl {level}</span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all flex items-center gap-2 text-xs"
            title="Search (Cmd + K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">⌘K</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 transition-all"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 cursor-pointer transition-all">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              UX
            </div>
            <span className="hidden sm:inline text-xs font-bold text-zinc-200 pr-1">Alex</span>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/5 py-2 px-2 bg-zinc-950/90">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-bold ${
                isActive ? 'text-purple-400 bg-purple-500/10' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}
