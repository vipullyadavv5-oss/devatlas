import React, { useState } from 'react'
import { Search, Github, Sparkles } from 'lucide-react'
import { SparklesDoodle } from './Doodles'
import { TechBackgroundIllustration } from './TechBackground'

interface HeroSectionProps {
  onSearchUser: (username: string) => void
  onGitHubLogin: () => void
}

export function HeroSection({ onSearchUser, onGitHubLogin }: HeroSectionProps) {
  const [inputUser, setInputUser] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUser.trim()) {
      onSearchUser(inputUser.trim())
    }
  }

  return (
    <section className="relative overflow-hidden py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold backdrop-blur-md">
        <SparklesDoodle size={16} />
        <span>Unified Developer Platform</span>
        <span className="text-zinc-600">•</span>
        <span className="text-cyan-400">GitHub + LeetCode + Codeforces</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-extrabold font-space tracking-tight leading-[1.15] max-w-4xl mx-auto">
        One Clean Verified <span className="gradient-text-purple">Developer Profile</span> &{' '}
        <span className="gradient-text-amber">Transparent DevScore</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
        DevAtlas aggregates your live commits, LeetCode problem difficulty, and Codeforces competitive ratings into one unified, verifiable developer card.
      </p>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto relative z-10">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl focus-within:border-purple-500/50 transition-all">
          <Search className="w-5 h-5 text-purple-400 ml-2 shrink-0" />
          <input
            type="text"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            placeholder="Enter GitHub username (e.g. tourist)..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shrink-0"
          >
            Analyze Profile
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 pt-3">
          <span>Or verify your own data:</span>
          <button
            onClick={onGitHubLogin}
            className="text-purple-300 hover:text-purple-200 font-bold underline flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" /> Sign in with GitHub
          </button>
        </div>
      </div>

      {/* Landing Page Tech Illustration Background Graphic */}
      <TechBackgroundIllustration />
    </section>
  )
}
