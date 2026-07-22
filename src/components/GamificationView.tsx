import React from 'react'
import { Trophy, Medal, Award, Flame, Zap, Users, Star, CheckCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react'

export function GamificationView() {
  const leaderboardUsers = [
    { rank: 1, name: 'Maya "ByteQueen"', xp: 14200, streak: 34, avatar: '👑', badge: 'Diamond I' },
    { rank: 2, name: 'Devin "SyntaxGod"', xp: 12850, streak: 28, avatar: '🚀', badge: 'Diamond II' },
    { rank: 3, name: 'Siddharth "AlgoWizard"', xp: 11400, streak: 22, avatar: '🧙‍♂️', badge: 'Platinum I' },
    { rank: 4, name: 'Alex (You)', xp: 9850, streak: 12, avatar: 'UX', badge: 'Gold Master', isUser: true },
    { rank: 5, name: 'Priya "RustNinja"', xp: 8900, streak: 15, avatar: '⚡', badge: 'Gold I' },
  ]

  const achievements = [
    { id: 1, title: '🔥 7-Day Streak', desc: 'Maintained a coding streak for 7 consecutive days.', icon: '🔥', unlocked: true },
    { id: 2, title: '🚀 Launch Ready', desc: 'Completed your first full roadmap module.', icon: '🚀', unlocked: true },
    { id: 3, title: '🧠 AI Whisperer', desc: 'Asked 10+ questions to DevAtlas AI Assistant.', icon: '🧠', unlocked: true },
    { id: 4, title: '🏆 Top 5 Global', desc: 'Ranked in the top 5 coders on the weekly leaderboard.', icon: '🏆', unlocked: true },
    { id: 5, title: '💎 DSA Titan', desc: 'Solved 50 LeetCode style algorithm challenges.', icon: '💎', unlocked: false },
    { id: 6, title: '🌿 Touch Grass Champion', desc: 'Completed 100 hours of focused coding study.', icon: '🌿', unlocked: false }
  ]

  return (
    <div className="space-y-8">
      {/* View Title Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" /> Gamification & Community Arena
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-space text-zinc-100">
            Leaderboard & Badges 🏆
          </h2>
          <p className="text-xs text-zinc-400">Compete with friends, unlock achievements, and level up</p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950/80 p-2 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Current League</span>
            <span className="text-xs font-bold text-cyan-300 font-mono">Diamond Division 💎</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Leaderboard Podium & Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
            <h3 className="text-lg font-bold font-space text-zinc-100 flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" /> Weekly Top Coders
            </h3>

            {/* Podium Graphic */}
            <div className="flex items-end justify-center gap-4 py-4 border-b border-white/5">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-slate-300 flex items-center justify-center text-xl shadow-lg">
                  {leaderboardUsers[1].avatar}
                </div>
                <span className="text-xs font-bold text-zinc-200 mt-1">{leaderboardUsers[1].name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-zinc-400">{leaderboardUsers[1].xp} XP</span>
                <div className="w-16 h-20 bg-gradient-to-t from-slate-700 to-slate-500 rounded-t-2xl mt-2 flex items-center justify-center font-bold text-white text-lg">
                  2
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-xl glow-amber animate-bounce">
                  {leaderboardUsers[0].avatar}
                </div>
                <span className="text-xs font-extrabold text-amber-300 mt-1">{leaderboardUsers[0].name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">{leaderboardUsers[0].xp} XP</span>
                <div className="w-20 h-28 bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 rounded-t-2xl mt-2 flex items-center justify-center font-extrabold text-zinc-950 text-2xl shadow-2xl">
                  1
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-amber-700 flex items-center justify-center text-xl shadow-lg">
                  {leaderboardUsers[2].avatar}
                </div>
                <span className="text-xs font-bold text-zinc-200 mt-1">{leaderboardUsers[2].name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-zinc-400">{leaderboardUsers[2].xp} XP</span>
                <div className="w-16 h-16 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-2xl mt-2 flex items-center justify-center font-bold text-amber-200 text-lg">
                  3
                </div>
              </div>
            </div>

            {/* Full Leaderboard List */}
            <div className="space-y-2">
              {leaderboardUsers.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    user.isUser
                      ? 'bg-purple-500/10 border-purple-500/40 glow-purple'
                      : 'bg-zinc-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-mono font-bold text-xs ${
                      user.rank === 1 ? 'text-amber-400' : user.rank === 2 ? 'text-slate-300' : user.rank === 3 ? 'text-amber-600' : 'text-zinc-500'
                    }`}>
                      #{user.rank}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                        {user.name} {user.isUser && <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500 text-white font-mono">YOU</span>}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">{user.badge}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono font-bold">
                    <span className="text-amber-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streak}d
                    </span>
                    <span className="text-purple-300">{user.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Unlockable Achievements & Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
            <h3 className="text-lg font-bold font-space text-zinc-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> Achievements & Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                    ach.unlocked
                      ? 'bg-zinc-900/80 border-purple-500/30 hover:border-purple-500/60'
                      : 'bg-zinc-950/40 border-white/5 opacity-40 grayscale'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{ach.icon}</span>
                    {ach.unlocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Unlocked 🎉
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                        Locked 🔒
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-space text-zinc-100">{ach.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
