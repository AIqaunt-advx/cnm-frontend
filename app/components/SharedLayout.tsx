'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import { useI18n } from '../i18n/provider'

// Matrix rain effect component
const MatrixRain = () => {
  const [columns, setColumns] = useState<Array<{
    id: number,
    x: number,
    chars: string[],
    delay: number,
    speed: number
  }>>([])
  
  useEffect(() => {
    const generateRandomChars = (length: number) => {
      const chars = '0123456789$'
      return Array.from({ length }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      )
    }

    const numberOfColumns = Math.floor(window.innerWidth / 20)
    const newColumns = Array.from({ length: numberOfColumns }, (_, i) => ({
      id: i,
      x: (i / numberOfColumns) * 100,
      chars: generateRandomChars(15), // 增加字符数量
      delay: Math.random() * 3,
      speed: 1 + Math.random()
    }))
    setColumns(newColumns)

    const interval = setInterval(() => {
      setColumns(prev => prev.map(column => ({
        ...column,
        chars: generateRandomChars(15)
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {columns.map(column => (
        <div
          key={column.id}
          className="matrix-rain absolute text-cyber-green font-mono text-xs opacity-30"
          style={{
            left: `${column.x}%`,
            top: '-100px', // 确保从屏幕上方开始
            animationDelay: `${column.delay}s`,
            animationDuration: `${3 / column.speed}s`,
          }}
        >
          {column.chars.map((char, i) => (
            <div key={i} className="mb-2">
              {char}
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