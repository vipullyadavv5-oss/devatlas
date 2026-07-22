import React from 'react'

interface DoodleProps {
  size?: number
  className?: string
  color?: string
  style?: React.CSSProperties
}

export function FloatingCloudDoodle({ size = 32, className = 'animate-float', color = '#8B5CF6' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M7 22A6 6 0 0113.8 14.2A8 8 0 0127 18A5 5 0 0125 28H7a6 6 0 010-12z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(139, 92, 246, 0.15)" />
    </svg>
  )
}

export function StarDoodle({ size = 24, className = 'animate-pulse-slow', color = '#F59E0B' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L14.9 8.6L22 9.3L16.6 14L18.2 21L12 17.3L5.8 21L7.4 14L2 9.3L9.1 8.6L12 2Z" fill={color} opacity="0.8" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function LightningDoodle({ size = 28, className = 'hover:scale-125 transition-transform', color = '#F59E0B' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

export function SparklesDoodle({ size = 26, className = 'animate-pulse', color = '#06B6D4' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3V7M12 17V21M3 12H7M17 12H21M5.6 5.6L8.5 8.5M15.5 15.5L18.4 18.4M5.6 18.4L8.5 15.5M15.5 8.5L18.4 5.6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IdeaLightbulbDoodle({ size = 30, className = 'animate-float', color = '#F59E0B' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 21H15M12 2A7 7 0 005 9C05 12.4 7.2 15.2 8.5 17H15.5C16.8 15.2 19 12.4 19 9A7 7 0 0012 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="rgba(245, 158, 11, 0.2)" />
    </svg>
  )
}

export function RocketDoodle({ size = 34, className = 'animate-float', color = '#7C3AED' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 3C16 3 8 11 8 21H24C24 11 16 3 16 3Z" fill={color} stroke="#A855F7" strokeWidth="1.5" />
      <circle cx="16" cy="13" r="3" fill="#06B6D4" />
      <path d="M8 21L3 27L9 25Z" fill="#F59E0B" />
      <path d="M24 21L29 27L23 25Z" fill="#F59E0B" />
      <path d="M13 25L16 30L19 25Z" fill="#EF4444" />
    </svg>
  )
}

export function LaptopDoodle({ size = 32, className = '', color = '#06B6D4' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="11" rx="2" stroke={color} strokeWidth="2" fill="rgba(6, 182, 212, 0.15)" />
      <path d="M2 19H22M8 15H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CoffeeMugDoodle({ size = 28, className = '', color = '#F59E0B' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 8H19C20.1 8 21 8.9 21 10V11C21 12.1 20.1 13 19 13H18" stroke={color} strokeWidth="2" />
      <path d="M5 8H18V16C18 18.2 16.2 20 14 20H9C6.8 20 5 18.2 5 16V8Z" fill="rgba(245, 158, 11, 0.2)" stroke={color} strokeWidth="2" />
      <path d="M8 3C8 3 9 5 8 6M12 3C12 3 13 5 12 6M16 3C16 3 17 5 16 6" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CodingCatDoodle({ size = 34, className = 'animate-float', color = '#EC4899' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M6 10L10 16V22H22V16L26 10L20 12C18 11 14 11 12 12L6 10Z" fill="rgba(236, 72, 153, 0.2)" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="17" r="1.5" fill={color} />
      <circle cx="20" cy="17" r="1.5" fill={color} />
      <path d="M14 20Q16 22 18 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function TinyPlantDoodle({ size = 28, className = '', color = '#22C55E' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 15L12 21L17 15H7Z" fill="rgba(245, 158, 11, 0.4)" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M12 15V8" stroke={color} strokeWidth="2" />
      <path d="M12 10C10 6 6 8 6 11C9 11 11 10 12 10Z" fill={color} stroke={color} strokeWidth="1" />
      <path d="M12 9C14 5 18 7 18 10C15 10 13 9 12 9Z" fill={color} stroke={color} strokeWidth="1" />
    </svg>
  )
}

export function BrainDoodle({ size = 30, className = 'animate-pulse-slow', color = '#A855F7' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9.5 4C7 4 5 6 5 8.5C3.5 9.5 3 11.5 4 13.5C3 15.5 4 17.5 5.5 18.5C7 19.5 9 19.5 10 18.5M14.5 4C17 4 19 6 19 8.5C20.5 9.5 21 11.5 20 13.5C21 15.5 20 17.5 18.5 18.5C17 19.5 15 19.5 14 18.5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="rgba(168, 85, 247, 0.15)" />
      <path d="M12 4V20" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  )
}

export function PixelHeartDoodle({ size = 26, className = 'hover:scale-125 transition-transform', color = '#EF4444' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} />
    </svg>
  )
}

export function GameControllerDoodle({ size = 32, className = 'animate-float', color = '#06B6D4' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="6" width="20" height="12" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke={color} strokeWidth="2" />
      <path d="M6 12H10M8 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="11" r="1" fill="#EF4444" />
      <circle cx="17" cy="13" r="1" fill="#F59E0B" />
    </svg>
  )
}

export function BubbleTeaDoodle({ size = 28, className = '', color = '#EC4899' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 8L8 21H16L18 8H6Z" fill="rgba(236, 72, 153, 0.2)" stroke={color} strokeWidth="2" />
      <line x1="14" y1="2" x2="10" y2="10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="10" cy="17" r="1" fill={color} />
      <circle cx="14" cy="16" r="1" fill={color} />
      <circle cx="12" cy="19" r="1" fill={color} />
    </svg>
  )
}

export function HandDrawnArrow({ size = 40, className = '', color = '#8B5CF6' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M6 20C15 12 25 15 32 20M32 20L25 14M32 20L27 27" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
