import React from 'react'
import { Github, Twitter, Disc as Discord, Heart, Coffee, Sparkles } from 'lucide-react'
import { CoffeeMugDoodle, CodingCatDoodle } from './Doodles'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-zinc-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Gen-Z Microcopy */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xl">🚀</span>
            <span className="text-lg font-bold font-space gradient-text-purple">DevAtlas v2.0</span>
          </div>
          <p className="text-xs text-zinc-400 font-sans max-w-sm">
            Personalized roadmaps, AI guidance, coding challenges and real-world projects—all in one place.
          </p>
          <div className="text-xs text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-1.5 pt-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>and too much coffee</span>
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Gen-Z Encouragement Banner */}
        <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-xs font-semibold text-purple-300 flex items-center gap-3">
          <CodingCatDoodle size={32} />
          <div>
            <div className="text-zinc-100 font-bold font-space">"Keep Building 🚀"</div>
            <div className="text-zinc-400 text-[11px]">See you tomorrow 👋</div>
          </div>
        </div>

        {/* Social Connections */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-space text-zinc-300 uppercase tracking-widest">Connect</div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href="https://github.com/vipullyadavv5-oss/devatlas"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
              title="Discord Community"
            >
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
