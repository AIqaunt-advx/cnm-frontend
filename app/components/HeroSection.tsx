'use client'

import { motion } from 'framer-motion'
import { Button, Card, CardBody } from '@heroui/react'
import { useI18n } from '../i18n/provider'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  onNavigateToTrading: () => void
}

// Fast terminal typing effect
const TerminalText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const startTimer = setTimeout(() => {
      const typeTimer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev < text.length) {
            setDisplayText(text.slice(0, prev + 1))
            return prev + 1
          } else {
            clearInterval(typeTimer)
            // Hide cursor after typing is complete
            setTimeout(() => setShowCursor(false), 500)
            return prev
          }
        })
      }, 25) // Visible typing effect - 25ms per character
    }, delay)

    return () => {
      clearTimeout(startTimer)
    }
  }, [text, delay, mounted])

  if (!mounted) {
    return <span className="font-mono opacity-0">{text}</span>
  }

  return (
    <span className="font-mono">
      {displayText}
      {showCursor && currentIndex < text.length && (
        <span className="animate-pulse text-cyber-blue">|</span>
      )}
    </span>
  )
}

// Multi-line terminal effect with colors
const TerminalBlock = ({ 
  lines, 
  colors = [], 
  startDelay = 0 
}: { 
  lines: string[], 
  colors?: string[], 
  startDelay?: number 
}) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const timer = setTimeout(() => {
      const lineInterval = setInterval(() => {
        setCurrentLine(prev => {
          if (prev < lines.length - 1) {
            return prev + 1
          } else {
            clearInterval(lineInterval)
            return prev
          }
        })
      }, 400) // 400ms between lines
    }, startDelay)

    return () => clearTimeout(timer)
  }, [lines.length, startDelay, mounted])

  if (!mounted) {
    return null
  }

  const defaultColors = ['text-cyber-green', 'text-cyber-blue', 'text-cyber-pink', 'text-cyber-green']

  return (
    <div>
      {lines.slice(0, currentLine + 1).map((line, index) => (
        <div key={index} className={`mb-2 ${colors[index] || defaultColors[index] || 'text-cyber-green'}`}>
          <TerminalText 
            text={line} 
            delay={index === currentLine ? 0 : 0} 
          />
        </div>
      ))}
    </div>
  )
}

// Holographic card component
const HoloCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    whileHover={{ 
      scale: 1.05, 
      rotateY: 5,
      transition: { duration: 0.3 }
    }}
    className="perspective-1000"
  >
    <Card className="bg-black/60 border border-cyber-blue/30 backdrop-blur-cyber relative overflow-hidden group">
      <div className="absolute inset-0 holographic opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-pink to-transparent" />
      <CardBody className="relative z-10">
        {children}
      </CardBody>
    </Card>
  </motion.div>
)

export default function HeroSection({ onNavigateToTrading }: HeroSectionProps) {
  const { t, mounted: i18nMounted } = useI18n()
  const [showCursor, setShowCursor] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted || !i18nMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue/30 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-cyber-blue font-orbitron">{t('system.loading')}</div>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: "⟨⟩",
      title: t('hero.features.quantum.title'),
      description: t('hero.features.quantum.description'),
      color: "cyber-blue",
      accent: "neon-blue"
    },
    {
      icon: "◊",
      title: t('hero.features.neural.title'),
      description: t('hero.features.neural.description'),
      color: "cyber-pink", 
      accent: "neon-pink"
    },
    {
      icon: "▲",
      title: t('hero.features.intelligence.title'),
      description: t('hero.features.intelligence.description'),
      color: "cyber-green",
      accent: "neon-green"
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main title with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl mb-4 relative">
            <span className="text-cyber-blue neon-blue">{t('brand.name')}</span>
            <div className="absolute -top-4 -right-4 text-cyber-green text-2xl font-mono animate-pulse">
              {showCursor && t('hero.online')}
            </div>
          </h1>
          
          <div className="text-cyber-green font-mono text-xl md:text-2xl mb-6">
            <TerminalText text={t('hero.initProtocol')} delay={100} />
          </div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-exo2 text-2xl md:text-4xl text-gray-300 mb-8 max-w-4xl mx-auto leading-tight"
          >
            <span className="text-cyber-blue neon-blue">{t('brand.fullName')}</span>
            <br />
            <span className="text-cyber-pink neon-pink">{t('brand.tagline')}</span>
          </motion.h2>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <Button
            size="lg"
            className="cyber-button bg-cyber-blue/20 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black px-12 py-6 text-xl font-orbitron font-bold"
            onClick={onNavigateToTrading}
          >
            <span className="flex items-center gap-3">
              ◊ {t('hero.enterNexus')}
              <span className="text-2xl">→</span>
            </span>
          </Button>
          
          <Button
            size="lg"
            variant="bordered"
            className="cyber-button border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black px-12 py-6 text-xl font-orbitron font-bold"
            onClick={() => window.location.href = '/docs'}
          >
            <span className="flex items-center gap-3">
              ⟨⟩ {t('hero.documentation')}
            </span>
          </Button>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <HoloCard key={index} delay={1.3 + index * 0.1}>
              <div className="text-center p-6">
                <div className={`text-6xl mb-6 text-${feature.color} ${feature.accent}`}>
                  {feature.icon}
                </div>
                <h3 className={`font-orbitron font-bold text-xl mb-4 text-${feature.color}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Progress bar decoration */}
                <div className="mt-6 h-1 bg-cyber-gray rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.8 + index * 0.15, duration: 1.2 }}
                    className={`h-full bg-gradient-to-r from-${feature.color} to-transparent`}
                  />
                </div>
              </div>
            </HoloCard>
          ))}
        </div>

        {/* Terminal window decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-black/80 border border-cyber-green/50 rounded-lg overflow-hidden">
            <div className="bg-cyber-gray/20 px-4 py-2 border-b border-cyber-green/30 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 font-mono text-cyber-green text-sm">cnm-csgo://trading-terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <TerminalBlock 
                lines={[
                  "$ ./cnm-csgo --initialize --mode=trading",
                  "[INFO] Cognitive processors: ONLINE",
                  "[INFO] Neural networks: SYNCHRONIZED",
                  "[SUCCESS] Ready for profit extraction..."
                ]}
                colors={[
                  'text-cyber-green',
                  'text-cyber-blue', 
                  'text-cyber-pink',
                  'text-cyber-green'
                ]}
                startDelay={600}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}