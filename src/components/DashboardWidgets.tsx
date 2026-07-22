import React from 'react'
import { Shield, Github, Code2, Award, Star, GitCommit, FolderGit2, Flame, CheckCircle, BarChart2, ExternalLink } from 'lucide-react'
import { UserProfileData } from '../services/api'

interface DashboardWidgetsProps {
  profileData: UserProfileData | null
  isLoading: boolean
}

export function DashboardWidgets({ profileData, isLoading }: DashboardWidgetsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-48 rounded-3xl bg-zinc-900/60 border border-white/5" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-3xl bg-zinc-900/60 border border-white/5" />
          <div className="h-64 rounded-3xl bg-zinc-900/60 border border-white/5" />
          <div className="h-64 rounded-3xl bg-zinc-900/60 border border-white/5" />
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center border border-white/10 space-y-4 max-w-xl mx-auto">
        <Shield className="w-12 h-12 text-zinc-600 mx-auto" />
        <h3 className="text-xl font-bold font-space text-zinc-100">No Profile Loaded</h3>
        <p className="text-xs text-zinc-400">Enter a GitHub username above to generate verified developer statistics.</p>
      </div>
    )
  }

  const { dev_score, score_breakdown, github_stats, leetcode_stats, codeforces_stats } = profileData

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* DevScore Overview Banner */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-purple-500/30 bg-gradient-to-r from-purple-900/20 via-zinc-900/80 to-cyan-900/20 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-space font-extrabold text-2xl text-white shadow-xl glow-purple">
              {Math.round(dev_score)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-extrabold font-space text-zinc-100">DevScore Analysis</h3>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Deterministic Score
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Transparent multi-platform score weighted across GitHub, LeetCode & Codeforces
              </p>
            </div>
          </div>

          {/* Quick Category Score Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">GitHub</span>
              <span className="text-sm font-bold text-purple-400 font-mono">{score_breakdown.github_score} pts</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">LeetCode</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{score_breakdown.leetcode_score} pts</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Codeforces</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">{score_breakdown.codeforces_score} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Main Platform Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GitHub Stats Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-space text-zinc-100">GitHub Activity</h4>
                <a
                  href={`https://github.com/${profileData.github_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-purple-400 hover:underline flex items-center gap-1 font-mono"
                >
                  @{profileData.github_username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Score: {score_breakdown.github_score}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                <FolderGit2 className="w-3.5 h-3.5 text-purple-400" /> Repositories
              </span>
              <span className="text-lg font-bold font-mono text-zinc-100">{github_stats.repos_count}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                <GitCommit className="w-3.5 h-3.5 text-cyan-400" /> Recent Commits
              </span>
              <span className="text-lg font-bold font-mono text-zinc-100">{github_stats.commit_count}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Stars Earned
              </span>
              <span className="text-lg font-bold font-mono text-zinc-100">{github_stats.stars_received}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Streak
              </span>
              <span className="text-lg font-bold font-mono text-zinc-100">{github_stats.contribution_streak} days</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-2">Primary Languages:</span>
            <div className="flex flex-wrap gap-1.5">
              {github_stats.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-purple-300 font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* LeetCode Stats Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-space text-zinc-100">LeetCode DSA</h4>
                <a
                  href={`https://leetcode.com/${profileData.leetcode_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  @{profileData.leetcode_username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Score: {score_breakdown.leetcode_score}
            </span>
          </div>

          <div className="text-center p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-xs text-zinc-400 font-semibold block">Total Solved</span>
            <span className="text-3xl font-extrabold font-space text-zinc-100">{leetcode_stats.total_solved}</span>
          </div>

          {/* Difficulty breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="font-bold text-emerald-400">Easy</span>
              <span className="font-mono font-bold text-zinc-100">{leetcode_stats.easy_solved}</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="font-bold text-amber-400">Medium</span>
              <span className="font-mono font-bold text-zinc-100">{leetcode_stats.medium_solved}</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <span className="font-bold text-rose-400">Hard</span>
              <span className="font-mono font-bold text-zinc-100">{leetcode_stats.hard_solved}</span>
            </div>
          </div>

          {leetcode_stats.contest_rating && (
            <div className="text-xs text-zinc-400 flex justify-between pt-2 border-t border-white/5">
              <span>Contest Rating:</span>
              <span className="font-mono font-bold text-amber-400">{leetcode_stats.contest_rating}</span>
            </div>
          )}
        </div>

        {/* Codeforces Stats Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-space text-zinc-100">Codeforces CP</h4>
                <a
                  href={`https://codeforces.com/profile/${profileData.codeforces_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                >
                  @{profileData.codeforces_username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              Score: {score_breakdown.codeforces_score}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Current Rating</span>
              <span className="text-xl font-bold font-mono text-cyan-300">{codeforces_stats.rating}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Max Rating</span>
              <span className="text-xl font-bold font-mono text-zinc-100">{codeforces_stats.max_rating}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Competitive Rank:</span>
              <span className="font-bold text-cyan-400">{codeforces_stats.rank}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Contests Attended:</span>
              <span className="font-mono font-bold text-zinc-100">{codeforces_stats.contests_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
