import React, { useState } from 'react'
import { Lock, Check, Play, Star, Sparkles, X, ChevronRight, BookOpen, Code, Trophy, HelpCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

export interface RoadmapNode {
  id: string
  title: string
  description: string
  category: 'Frontend' | 'Backend' | 'DSA' | 'AI'
  status: 'completed' | 'active' | 'locked'
  progress: number // 0 to 100
  xp: number
  starterCode?: string
  solutionCode?: string
}

interface InteractiveRoadmapProps {
  onCompleteTopic?: (nodeId: string, xpEarned: number) => void
}

export function InteractiveRoadmap({ onCompleteTopic }: InteractiveRoadmapProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Backend' | 'DSA' | 'AI'>('All')
  const [activeModalNode, setActiveModalNode] = useState<RoadmapNode | null>(null)
  const [userRating, setUserRating] = useState<number>(0)
  const [nodes, setNodes] = useState<RoadmapNode[]>([
    {
      id: 'fe-html-css',
      title: 'HTML5 & Modern CSS3 Grid',
      description: 'Master semantic layouts, flexbox, grid, and CSS custom properties.',
      category: 'Frontend',
      status: 'completed',
      progress: 100,
      xp: 200,
      starterCode: `/* Modern CSS Grid Layout */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`,
      solutionCode: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  padding: 1rem;\n}`
    },
    {
      id: 'fe-react-basics',
      title: 'React 18 Architecture & Hooks',
      description: 'Understand JSX, useState, useEffect, useRef, and component lifecycle.',
      category: 'Frontend',
      status: 'completed',
      progress: 100,
      xp: 350,
      starterCode: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`,
      solutionCode: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <button className="btn" onClick={() => setCount(prev => prev + 1)}>\n      Count: {count}\n    </button>\n  );\n}`
    },
    {
      id: 'fe-tailwind-framer',
      title: 'Tailwind CSS & Framer Motion',
      description: 'Build sleek micro-animations, responsive dark modes, and glassmorphism UI.',
      category: 'Frontend',
      status: 'active',
      progress: 65,
      xp: 400,
      starterCode: `<div className="glass-card p-6 hover:scale-105 transition-transform">\n  <h2 className="gradient-text-purple">Gen-Z Card</h2>\n</div>`,
      solutionCode: `<motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6">\n  <h2 className="gradient-text-purple">Gen-Z Card</h2>\n</motion.div>`
    },
    {
      id: 'be-node-express',
      title: 'Node.js & Express REST APIs',
      description: 'Build scalable API endpoints, authentication middleware, and route handlers.',
      category: 'Backend',
      status: 'completed',
      progress: 100,
      xp: 300,
      starterCode: `const express = require('express');\nconst app = express();\napp.get('/api/health', (req, res) => res.json({ status: 'ok' }));`,
      solutionCode: `app.get('/api/health', (req, res) => {\n  res.status(200).json({ status: 'healthy', timestamp: Date.now() });\n});`
    },
    {
      id: 'dsa-arrays-strings',
      title: 'Two Pointers & Sliding Window',
      description: 'Solve core algorithmic challenges with optimal O(N) space-time complexity.',
      category: 'DSA',
      status: 'active',
      progress: 40,
      xp: 500,
      starterCode: `function maxSubArraySum(arr, k) {\n  // Implement sliding window technique\n}`,
      solutionCode: `function maxSubArraySum(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  for (let i = 0; i < k; i++) windowSum += arr[i];\n  maxSum = windowSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}`
    },
    {
      id: 'ai-prompt-eng',
      title: 'AI Prompt Engineering & LLM APIs',
      description: 'Integrate OpenAI / Gemini APIs, structured output schemas, and agentic workflows.',
      category: 'AI',
      status: 'locked',
      progress: 0,
      xp: 600,
      starterCode: `// Connect to LLM API\nconst response = await fetch('/api/ai/generate', { method: 'POST' });`,
      solutionCode: `const response = await aiClient.generateText({ prompt, model: 'gemini-3.6-flash' });`
    }
  ])

  const categories = ['All', 'Frontend', 'Backend', 'DSA', 'AI'] as const

  const filteredNodes = nodes.filter((n) => selectedCategory === 'All' || n.category === selectedCategory)

  const handleMarkComplete = (node: RoadmapNode) => {
    // Trigger confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Update node status
    setNodes(nodes.map((n) => n.id === node.id ? { ...n, status: 'completed', progress: 100 } : n))
    setActiveModalNode({ ...node, status: 'completed', progress: 100 })

    if (onCompleteTopic) {
      onCompleteTopic(node.id, node.xp)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Learning Flow
          </div>
          <h2 className="text-2xl font-extrabold font-space text-zinc-100">DevAtlas Roadmaps 🗺️</h2>
          <p className="text-xs text-zinc-400">Click any topic node to inspect concepts and earn XP</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-950/80 p-1.5 rounded-2xl border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes Flow Path */}
      <div className="relative py-8 px-4 max-w-4xl mx-auto space-y-12">
        {/* Animated Connecting Vector Path Line */}
        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-cyan-400 to-amber-400 opacity-30 -z-10 rounded-full" />

        {filteredNodes.map((node, index) => {
          const isEven = index % 2 === 0
          const isCompleted = node.status === 'completed'
          const isActive = node.status === 'active'
          const isLocked = node.status === 'locked'

          return (
            <div
              key={node.id}
              className={`flex items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'} relative group`}
            >
              {/* Card Container */}
              <div
                onClick={() => setActiveModalNode(node)}
                className={`flex-1 glass-card p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-purple-500/40 glow-purple bg-gradient-to-r from-purple-900/20 to-zinc-900/60 scale-105'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
                    : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10">
                    {node.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">+{node.xp} XP</span>
                </div>

                <h3 className="text-lg font-bold font-space text-zinc-100 group-hover:text-cyan-300 transition-colors">
                  {node.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                  {node.description}
                </p>

                {/* Progress Bar inside Card */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex-1 h-2 rounded-full bg-zinc-950 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-400' : isActive ? 'bg-purple-500' : 'bg-zinc-700'
                      }`}
                      style={{ width: `${node.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-400">{node.progress}%</span>
                </div>
              </div>

              {/* Central Node Badge */}
              <div className="relative z-10">
                <div
                  onClick={() => setActiveModalNode(node)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/30 animate-pulse'
                      : isActive
                      ? 'bg-gradient-to-tr from-purple-600 to-cyan-500 text-white shadow-xl shadow-purple-500/40 scale-110 animate-bounce'
                      : 'bg-zinc-900 border border-white/10 text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-7 h-7 stroke-[3]" />
                  ) : isActive ? (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
              </div>

              {/* Spacer for 2-column alternating layout */}
              <div className="flex-1 hidden md:block" />
            </div>
          )
        })}
      </div>

      {/* Node Detail Modal Overlay */}
      {activeModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-float-in">
          <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalNode(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
                <span>{activeModalNode.category}</span> • <span className="text-amber-400">+{activeModalNode.xp} XP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-space text-zinc-100">
                {activeModalNode.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {activeModalNode.description}
              </p>
            </div>

            {/* Starter Code Block */}
            {activeModalNode.starterCode && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                  <span className="flex items-center gap-1.5"><Code className="w-4 h-4 text-cyan-400" /> Starter Code</span>
                  <span className="font-mono text-[10px] text-zinc-500">TypeScript / React</span>
                </div>
                <pre className="p-4 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs text-purple-200 overflow-x-auto">
                  <code>{activeModalNode.starterCode}</code>
                </pre>
              </div>
            )}

            {/* 5-Star Rating Component */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">Rate this learning topic:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${userRating >= star ? 'fill-amber-400' : 'text-zinc-600'}`} />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <span className="text-xs text-purple-300 font-medium">Thanks for your rating! ✨</span>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModalNode(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold transition-all"
              >
                Close
              </button>
              {activeModalNode.status !== 'completed' && (
                <button
                  onClick={() => handleMarkComplete(activeModalNode)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Mark Completed 🎉 (+{activeModalNode.xp} XP)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
