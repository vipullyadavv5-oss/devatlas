import React, { useState } from 'react'
import { Sparkles, Send, Bot, User, RefreshCw, X } from 'lucide-react'
import { BrainDoodle } from './Doodles'
import { sendAiChat } from '../services/api'

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
}

interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  initialPrompt?: string
  userContext?: any
}

export function AiAssistantModal({ isOpen, onClose, initialPrompt, userContext }: AiAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Yo! 👋 I'm your DevAtlas AI coding co-pilot. Ask me to debug code, explain DSA concepts, or build custom learning roadmaps!",
      timestamp: 'Just now'
    }
  ])
  const [inputQuery, setInputQuery] = useState(initialPrompt || '')
  const [isTyping, setIsTyping] = useState(false)

  if (!isOpen) return null

  const quickSuggestions = [
    { label: '⚛️ Explain React 18 Hooks', query: 'Explain React 18 useTransition and useDeferredValue with simple examples.' },
    { label: '🗺️ Generate Full-Stack Roadmap', query: 'Generate a step-by-step roadmap for becoming a Senior Full-Stack Next.js & Node developer in 2026.' },
    { label: '🐛 Debug JS Code', query: 'Why am I getting "Uncaught TypeError: Cannot read properties of undefined" in my React state update?' },
    { label: '💼 Top Interview Questions', query: 'Give me the top 5 System Design questions asked by Tier-1 tech companies.' },
    { label: '📄 Resume Tech Tips', query: 'How should I describe my DevAtlas full-stack project on my resume to stand out?' }
  ]

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery
    if (!query.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsTyping(true)

    try {
      // Real API call to FastAPI /api/ai/chat endpoint powered by Gemini API
      const replyText = await sendAiChat(query, userContext)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now'
        }
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Oops! Our AI server experienced a temporary hiccup. Make sure the FastAPI backend is running! 🚀",
          timestamp: 'Just now'
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-float-in">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 border border-purple-500/30 shadow-2xl space-y-4 relative flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg glow-purple">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-space text-zinc-100 flex items-center gap-2">
                DevAtlas AI Assistant <BrainDoodle size={20} />
              </h3>
              <p className="text-xs text-cyan-300 font-medium">Real Gemini API Integration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {quickSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 hover:scale-105"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Message Conversation Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai'
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isAi ? 'bg-purple-600 text-white' : 'bg-cyan-500 text-zinc-950'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-zinc-900/80 border border-white/10 text-zinc-200 rounded-tl-none'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-tr-none shadow-md'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[10px] text-zinc-400 block text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            )
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-400 p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>DevAtlas AI is processing real API insights...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask me anything (e.g. Debug my code, Explain React)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-zinc-100 placeholder-zinc-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg glow-purple"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
