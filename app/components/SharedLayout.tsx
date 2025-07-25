'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import { useI18n } from '../i18n/provider'

// Matrix rain effect component
const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number}>>([])
  
  useEffect(() => {
    const newDrops = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setDrops(newDrops)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-cyber-green font-mono text-xs opacity-30"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`,
            animation: 'matrix-rain 3s linear infinite'
          }}
        >
          {Array.from({length: 10}, (_, i) => (
            <div key={i} className="mb-2">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// Floating particles
const FloatingParticles = () => {
  const particles = Array.from({length: 15}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyber-blue rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

interface SharedLayoutProps {
  children: React.ReactNode
  showStatusBar?: boolean
}

export default function SharedLayout({ children, showStatusBar = true }: SharedLayoutProps) {
  const { language, t } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-20" />
      <MatrixRain />
      <FloatingParticles />
      
      {/* Scan line effect */}
      <div className="scan-line" />
      
      {/* Main container */}
      <div className="relative z-20">
        <Navigation />
        
        <main className="relative z-10">
          {children}
        </main>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyber-blue/50 pointer-events-none z-30" />
      <div className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyber-pink/50 pointer-events-none z-30" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyber-green/50 pointer-events-none z-30" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyber-blue/50 pointer-events-none z-30" />
      
      {/* Status bar */}
      {showStatusBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-cyber-blue/30 backdrop-blur-cyber z-30">
          <div className="container mx-auto px-6 py-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <div className="flex gap-6">
                <span className="text-cyber-green">◊ {t('system.online')}</span>
                <span className="text-cyber-blue">◊ {t('system.lang')}: {language.toUpperCase()}</span>
                <span className="text-cyber-pink">◊ DATA STREAM: ACTIVE</span>
              </div>
              <div className="text-cyber-blue">
                {mounted ? new Date().toLocaleTimeString() : '00:00:00'} {t('system.utc')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}