import React, { useState } from 'react'
import { Search, X, Flame, Sparkles, Trophy, BookOpen, Clock, ArrowRight, Bell, CheckCircle2 } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTopic: (topicId: string) => void
}

export function SearchModal({ isOpen, onClose, onSelectTopic }: SearchModalProps) {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const popularTopics = [
    { id: 'fe-react-basics', title: 'React 18 Architecture & Hooks', category: 'Frontend' },
    { id: 'dsa-arrays-strings', title: 'Sliding Window & Two Pointers', category: 'DSA' },
    { id: 'be-node-express', title: 'Node.js & Express REST APIs', category: 'Backend' },
    { id: 'ai-prompt-eng', title: 'AI Prompt Engineering & LLM APIs', category: 'AI' }
  ]

  const filtered = popularTopics.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-zinc-950/80 backdrop-blur-md animate-float-in">
      <div className="glass-card w-full max-w-xl rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4 relative">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-purple-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, roadmaps, algorithms..."
            className="flex-1 bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
            {query ? 'Search Results' : 'Popular Topics 🔥'}
          </div>

          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectTopic(item.id)
                onClose()
              }}
              className="p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors block">
                  {item.title}
                </span>
                <span className="text-[10px] text-purple-400 font-mono">{item.category}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs text-zinc-500">
              Looks like nothing matched "{query}"... let me search AI suggestions! 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsModalProps) {
  if (!isOpen) return null

  const notifications = [
    { id: 1, title: '🔥 7-Day Streak Alert!', desc: 'You logged in 7 days in a row. +100 bonus XP!', time: '10m ago', icon: Flame, color: 'text-amber-400' },
    { id: 2, title: '🎉 React 18 Course Completed!', desc: 'You earned the Master Frontend Badge.', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 3, title: '🚀 New Roadmap Available!', desc: 'AI Prompt Engineering & LLM APIs is live.', time: '1d ago', icon: Sparkles, color: 'text-cyan-400' },
    { id: 4, title: '💻 Daily Challenge Ready!', desc: 'Solve Sliding Window Maximum for 150 XP.', time: '2d ago', icon: Trophy, color: 'text-purple-400' }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-zinc-950/60 backdrop-blur-sm animate-float-in">
      <div className="glass-card w-full max-w-sm rounded-3xl p-5 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold font-space text-zinc-100">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon
            return (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${n.color}`} />
                  <span className="text-xs font-bold text-zinc-100">{n.title}</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">{n.desc}</p>
                <span className="text-[9px] text-zinc-500 font-mono block text-right">{n.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
