import React from 'react'

interface DoodleProps {
  size?: number
  className?: string
  color?: string
}

export function RocketDoodle({ size = 32, className = 'animate-float', color = '#7C3AED' }: DoodleProps) {
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

export function SparklesDoodle({ size = 26, className = 'animate-pulse', color = '#06B6D4' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3V7M12 17V21M3 12H7M17 12H21M5.6 5.6L8.5 8.5M15.5 15.5L18.4 18.4M5.6 18.4L8.5 15.5M15.5 8.5L18.4 5.6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CodingCatDoodle({ size = 32, className = 'animate-float', color = '#EC4899' }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M6 10L10 16V22H22V16L26 10L20 12C18 11 14 11 12 12L6 10Z" fill="rgba(236, 72, 153, 0.2)" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="17" r="1.5" fill={color} />
      <circle cx="20" cy="17" r="1.5" fill={color} />
      <path d="M14 20Q16 22 18 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
