import React from 'react'
import { Moon, Sun, Github, Shield } from 'lucide-react'

interface NavbarProps {
  devScore?: number
  onGitHubLogin: () => void
  darkMode: boolean
  setDarkMode: (val: boolean) => void
}

export function Navbar({ devScore, onGitHubLogin, darkMode, setDarkMode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center glow-purple">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <span className="text-xl font-bold font-space gradient-text-purple tracking-tight">
              DevAtlas
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Verified Profile Engine
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {devScore !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-semibold">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-400">DevScore:</span>
              <span className="text-cyan-300 font-mono font-bold">{devScore} / 100</span>
            </div>
          )}

          <button
            onClick={onGitHubLogin}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Connect GitHub</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 transition-all"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </div>
    </header>
  )
}
