import React, { useState } from 'react'
import { Flame, Zap, Trophy, Target, BookOpen, Clock, TrendingUp, CheckCircle, Sparkles, ChevronRight, BarChart2, Calendar, Award } from 'lucide-react'
import { SparklesDoodle, BrainDoodle, TinyPlantDoodle, IdeaLightbulbDoodle } from './Doodles'

interface DashboardWidgetsProps {
  streak: number
  xp: number
  level: number
  onNavigateToRoadmap: (topicId?: string) => void
  onOpenAiAssistant: (prompt?: string) => void
}

export function DashboardWidgets({
  streak,
  xp,
  level,
  onNavigateToRoadmap,
  onOpenAiAssistant
}: DashboardWidgetsProps) {
  const [completedGoals, setCompletedGoals] = useState<number[]>([1])

  const toggleGoal = (id: number) => {
    if (completedGoals.includes(id)) {
      setCompletedGoals(completedGoals.filter((g) => g !== id))
    } else {
      setCompletedGoals([...completedGoals, id])
    }
  }

  // Generate 20 weeks of activity heatmap cells
  const heatmapWeeks = 18
  const daysPerWeek = 7
  const heatmapData = Array.from({ length: heatmapWeeks * daysPerWeek }).map((_, i) => {
    const val = (i * 7 + 3) % 11
    if (val < 3) return 0
    if (val < 6) return 1
    if (val < 9) return 2
    return 3
  })

  const dailyGoals = [
    { id: 1, title: 'Solve 2 Array & String DSA Problems', xp: '+100 XP', category: 'DSA' },
    { id: 2, title: 'Build React Custom Hook for Dark Mode', xp: '+150 XP', category: 'React' },
    { id: 3, title: 'Read System Architecture Design Overview', xp: '+80 XP', category: 'System Design' }
  ]

  const weeklyHours = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 5.0 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 6.8 },
    { day: 'Fri', hours: 2.4 },
    { day: 'Sat', hours: 7.5 },
    { day: 'Sun', hours: 4.0 },
  ]

  return (
    <div className="space-y-8">
      {/* Top 4 Key Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Daily Streak Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Flame className="w-16 h-16 text-amber-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Daily Streak</span>
              <h4 className="text-2xl font-extrabold font-space text-zinc-100">{streak} Days 🔥</h4>
            </div>
          </div>
          <p className="text-xs text-amber-300 font-medium">Personal Best: 21 days • Keep cooking! 🍳</p>
        </div>

        {/* XP Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap className="w-16 h-16 text-purple-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Experience</span>
              <h4 className="text-2xl font-extrabold font-space text-zinc-100">{xp.toLocaleString()} XP</h4>
            </div>
          </div>
          <p className="text-xs text-purple-300 font-medium">+450 XP earned this week 🚀</p>
        </div>

        {/* Rank Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Trophy className="w-16 h-16 text-cyan-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Global Rank</span>
              <h4 className="text-2xl font-extrabold font-space text-zinc-100">#4 Diamond 💎</h4>
            </div>
          </div>
          <p className="text-xs text-cyan-300 font-medium">Top 2% of coders this season!</p>
        </div>

        {/* Level Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Award className="w-16 h-16 text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Current Level</span>
              <h4 className="text-2xl font-extrabold font-space text-zinc-100">Level {level}</h4>
            </div>
          </div>
          <p className="text-xs text-emerald-300 font-medium">Title: Master Architect 🧠</p>
        </div>
      </div>

      {/* Main Grid Section: Goals & Progress Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Goals & Heatmap (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Today's Goals Widget */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space text-zinc-100">Today's Missions 🎯</h3>
                  <p className="text-xs text-zinc-400">Complete tasks to extend your streak</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {completedGoals.length} / {dailyGoals.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {dailyGoals.map((goal) => {
                const isDone = completedGoals.includes(goal.id)
                return (
                  <div
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-300'
                        : 'bg-zinc-900/60 border-white/5 hover:border-purple-500/30 text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isDone ? 'bg-emerald-500 text-zinc-950' : 'border border-white/20 text-transparent'
                      }`}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`text-sm font-semibold block ${isDone ? 'line-through opacity-70' : ''}`}>
                          {goal.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                          {goal.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg">
                      {goal.xp}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Learning Heatmap */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold font-space text-zinc-100">Consistency Heatmap 🌿</h3>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Last 18 Weeks</span>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
                {heatmapData.map((val, idx) => {
                  const colors = ['bg-zinc-900', 'bg-purple-900/50', 'bg-purple-600', 'bg-cyan-400']
                  return (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-sm ${colors[val]} transition-colors hover:scale-125 cursor-pointer`}
                      title={`Activity level: ${val}`}
                    />
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/5">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-zinc-900" />
                <span className="w-3 h-3 rounded-sm bg-purple-900/50" />
                <span className="w-3 h-3 rounded-sm bg-purple-600" />
                <span className="w-3 h-3 rounded-sm bg-cyan-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Coding Hours Graph & AI Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Weekly Progress Graph */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold font-space text-zinc-100">Coding Hours 📊</h3>
                  <p className="text-xs text-zinc-400">Total: 33.4 hrs this week</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                +14% vs last week
              </span>
            </div>

            {/* Bar Chart Graphics */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
              {weeklyHours.map((item, i) => {
                const max = 8
                const heightPct = (item.hours / max) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.hours}h
                    </span>
                    <div className="w-full h-32 bg-zinc-900/80 rounded-xl p-1 flex items-end">
                      <div
                        className="w-full rounded-lg bg-gradient-to-t from-purple-600 to-cyan-400 group-hover:from-purple-500 group-hover:to-cyan-300 transition-all duration-500"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-zinc-400">{item.day}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Suggestions Box */}
          <div className="glass-card rounded-3xl p-6 border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-zinc-900/50 to-cyan-900/20 relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold font-space text-zinc-100">DevAtlas AI Assistant 🧠</h3>
                <p className="text-xs text-cyan-300 font-medium">Personalized recommendations for you</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              "Based on your recent DSA submissions, you're crushing Array manipulation! Next recommended step: Master Sliding Window algorithms."
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onOpenAiAssistant('Explain Sliding Window technique with React example')}
                className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>💡 Explain Sliding Window</span>
              </button>
              <button
                onClick={() => onNavigateToRoadmap('dsa-sliding-window')}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <span>🚀 Launch Challenge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
