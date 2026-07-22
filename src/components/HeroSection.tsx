import React from 'react'
import { Sparkles, ArrowRight, Play, Zap, Code, ShieldCheck, Flame } from 'lucide-react'
import {
  FloatingCloudDoodle,
  StarDoodle,
  LightningDoodle,
  SparklesDoodle,
  IdeaLightbulbDoodle,
  RocketDoodle,
  CodingCatDoodle,
  TinyPlantDoodle,
  HandDrawnArrow
} from './Doodles'

interface HeroSectionProps {
  onStartLearning: () => void
  onGenerateRoadmap: () => void
}

export function HeroSection({ onStartLearning, onGenerateRoadmap }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Floating Animated SVG Doodles */}
      <div className="absolute top-10 left-10 hidden md:block">
        <FloatingCloudDoodle size={48} color="#8B5CF6" />
      </div>
      <div className="absolute top-16 right-16 hidden md:block">
        <RocketDoodle size={42} />
      </div>
      <div className="absolute bottom-10 left-1/4 hidden md:block">
        <CodingCatDoodle size={40} />
      </div>
      <div className="absolute top-1/2 right-12 hidden lg:block">
        <IdeaLightbulbDoodle size={36} />
      </div>
      <div className="absolute top-12 left-1/3 hidden lg:block">
        <SparklesDoodle size={32} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Text Column */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left relative">
          {/* Gen-Z Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>🔥 Main character energy unlocked</span>
            <span className="text-zinc-500">•</span>
            <span className="text-cyan-400">DevAtlas 2.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-space tracking-tight leading-[1.1]">
            Learn Tech.{' '}
            <span className="gradient-text-purple block sm:inline">Build Cool Stuff.</span>{' '}
            <span className="gradient-text-amber block">Become Unstoppable 🚀</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-400 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Personalized roadmaps, AI guidance, coding challenges and real-world projects—all in one place.
          </p>

          {/* Gen-Z Motivational Dialogue Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
            <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-medium flex items-center gap-1.5 hover:border-purple-500/30 transition-all">
              <span>🌿</span> Touch grass after this lesson
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-medium flex items-center gap-1.5 hover:border-purple-500/30 transition-all">
              <span>💪</span> You got this
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-medium flex items-center gap-1.5 hover:border-purple-500/30 transition-all">
              <span>🍳</span> Keep cooking
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-space font-bold text-base shadow-xl hover:shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 glow-purple group"
            >
              <span>🚀 Start Learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onGenerateRoadmap}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/40 text-zinc-200 font-space font-bold text-base backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>✨ Generate AI Roadmap</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Graphics Column */}
        <div className="lg:col-span-5 relative">
          {/* Main Hero Card Container */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10 space-y-6 backdrop-blur-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-sm text-zinc-100">Full-Stack AI Engineer Path</h3>
                    <p className="text-xs text-zinc-400">8 Biomes • 42 Nodes Completed</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                </span>
              </div>

              {/* Progress Tracker Widget */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Level 14 Progress</span>
                  <span className="text-purple-400 font-mono">78% (3,890 / 5,000 XP)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-950 p-0.5 border border-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-1000" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Floating Status Badges inside Hero Card */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Daily Streak</div>
                    <div className="text-sm font-bold font-space text-zinc-100">12 Days 🔥</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Rank</div>
                    <div className="text-sm font-bold font-space text-zinc-100">#4 Global 🏆</div>
                  </div>
                </div>
              </div>

              {/* Quote Footer inside Card */}
              <div className="p-3 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-xs text-purple-300 font-medium flex items-center gap-2">
                <span>💬</span>
                <span>"Code. Break. Learn. Repeat. Future you says thanks."</span>
              </div>
            </div>

            {/* Floating Card Accessories */}
            <div className="absolute -top-6 -right-6 glass-card p-3 rounded-2xl border border-white/10 shadow-xl hidden sm:flex items-center gap-2 text-xs font-bold text-cyan-300 animate-float z-20">
              <StarDoodle size={18} />
              <span>+250 XP Claimed!</span>
            </div>

            <div className="absolute -bottom-6 -left-6 glass-card p-3 rounded-2xl border border-white/10 shadow-xl hidden sm:flex items-center gap-2 text-xs font-bold text-amber-300 animate-float z-20">
              <TinyPlantDoodle size={18} />
              <span>Daily Goal Completed 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
