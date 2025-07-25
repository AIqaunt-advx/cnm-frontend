'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Card,
  CardBody,
  Tooltip,
  Chip,
  Button
} from '@heroui/react'
import { useI18n } from '../i18n/provider'

// Animated progress bar component
const AnimatedProgressBar = () => {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const duration = 2000 // 2 seconds total
    const steps = 32 // Number of blocks
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      
      // Ease-out animation: fast at start, slow at end
      const easeOut = 1 - Math.pow(1 - currentStep / steps, 3)
      const newProgress = Math.floor(easeOut * steps)
      
      setProgress(newProgress)
      
      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted) {
    return '[████████████████████████████████] 100%'
  }

  const blocks = Array.from({ length: 32 }, (_, i) => i < progress ? '█' : '░')
  const percentage = Math.round((progress / 32) * 100)

  return (
    <span>
      [{blocks.join('')}] {percentage}%
    </span>
  )
}

interface TradingItem {
  id: number
  marketHashName: string
  maxDiff: number
  expectedSales: number
  recommendation: number
  expectedIncome: number
  platforms: {
    steam: number
    buff: number
    csmoney: number
    skinport: number
  }
}

const mockData: TradingItem[] = [
  {
    id: 1,
    marketHashName: "★ Butterfly Knife",
    maxDiff: 1000,
    expectedSales: 533,
    recommendation: 3,
    expectedIncome: 3000, // 1000 * 3
    platforms: {
      steam: 85.20,
      buff: 59.40,
      csmoney: 72.10,
      skinport: 81.80
    }
  },
  {
    id: 2,
    marketHashName: "AK-47 | Neon Revolution (Factory New)",
    maxDiff: 25.80,
    expectedSales: 92,
    recommendation: 5,
    expectedIncome: 129, // 25.80 * 5
    platforms: {
      steam: 85.20,
      buff: 59.40,
      csmoney: 72.10,
      skinport: 81.80
    }
  },
  {
    id: 3,
    marketHashName: "AWP | Neo-Noir (Minimal Wear)",
    maxDiff: 45.60,
    expectedSales: 88,
    recommendation: 4,
    expectedIncome: 182.4, // 45.60 * 4
    platforms: {
      steam: 125.00,
      buff: 79.40,
      csmoney: 98.30,
      skinport: 118.00
    }
  },
  {
    id: 4,
    marketHashName: "M4A4 | Cyber Security (Field-Tested)",
    maxDiff: 18.30,
    expectedSales: 76,
    recommendation: 8,
    expectedIncome: 146.4, // 18.30 * 8
    platforms: {
      steam: 65.00,
      buff: 46.70,
      csmoney: 58.00,
      skinport: 62.80
    }
  },
  {
    id: 5,
    marketHashName: "Karambit | Gamma Doppler (Factory New)",
    maxDiff: 420.50,
    expectedSales: 65,
    recommendation: 2,
    expectedIncome: 841, // 420.50 * 2
    platforms: {
      steam: 2150.00,
      buff: 1729.50,
      csmoney: 1920.00,
      skinport: 2080.00
    }
  },
  {
    id: 6,
    marketHashName: "Glock-18 | Vogue (Minimal Wear)",
    maxDiff: 32.20,
    expectedSales: 84,
    recommendation: 6,
    expectedIncome: 193.2, // 32.20 * 6
    platforms: {
      steam: 95.00,
      buff: 62.80,
      csmoney: 78.00,
      skinport: 89.00
    }
  }
]

export default function TradingList() {
  const { t, mounted: i18nMounted } = useI18n()
  const [data, setData] = useState<TradingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [mounted])

  const PlatformPrices = ({ platforms }: { platforms: TradingItem['platforms'] }) => (
    <div className="bg-black/95 border border-cyber-blue/50 rounded-lg p-4 min-w-[250px] backdrop-blur-cyber">
      <div className="text-cyber-blue font-orbitron font-bold text-sm mb-3 text-center">
        ◊ {t('trading.platformAnalysis')} ◊
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b border-cyber-blue/20 pb-2">
          <span className="font-mono text-cyber-green text-sm">[{t('trading.steam')}]</span>
          <span className="text-cyber-blue font-bold">${platforms.steam}</span>
        </div>
        <div className="flex justify-between items-center border-b border-cyber-pink/20 pb-2">
          <span className="font-mono text-cyber-pink text-sm">[{t('trading.buff')}]</span>
          <span className="text-cyber-pink font-bold">${platforms.buff}</span>
        </div>
        <div className="flex justify-between items-center border-b border-cyber-green/20 pb-2">
          <span className="font-mono text-cyber-green text-sm">[{t('trading.csmoney')}]</span>
          <span className="text-cyber-green font-bold">${platforms.csmoney}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-neon-yellow text-sm">[{t('trading.skinport')}]</span>
          <span className="text-neon-yellow font-bold">${platforms.skinport}</span>
        </div>
      </div>
    </div>
  )

  if (!mounted || !i18nMounted || loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-6">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-cyber-blue/30 rounded-full animate-spin">
              <div 
                className="absolute top-2 left-2 w-28 h-28 border-4 border-cyber-pink/50 rounded-full animate-spin" 
                style={{ animationDirection: 'reverse' }}
              />
              <div className="absolute top-4 left-4 w-24 h-24 border-4 border-cyber-green/70 rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-cyber-blue font-orbitron font-bold text-2xl neon-blue">◊</span>
            </div>
          </div>
          <div className="font-orbitron text-cyber-blue text-xl mb-4 neon-blue">
            {t('trading.loading')}
          </div>
          <div className="font-mono text-cyber-green text-sm">
            <AnimatedProgressBar />
          </div>
          <div className="font-mono text-cyber-pink text-xs mt-2">
            {t('system.quantum')}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="font-orbitron font-black text-4xl md:text-6xl mb-4">
          <span className="text-cyber-blue neon-blue">{t('trading.title')}</span>
        </h1>
        <div className="font-mono text-cyber-blue text-lg mb-6">
          {t('trading.subtitle')}
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            className="cyber-button border-cyber-green text-cyber-green font-mono"
            variant="bordered"
          >
            ◊ {t('trading.refresh')}
          </Button>
          <Button 
            className="cyber-button border-cyber-pink text-cyber-pink font-mono"
            variant="bordered"
          >
            ◊ {t('trading.export')}
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="bg-black/80 border border-cyber-blue/30 backdrop-blur-cyber shadow-cyber overflow-hidden">
          <div className="absolute inset-0 holographic opacity-10" />
          
          <div className="bg-cyber-gray/20 border-b border-cyber-blue/30 p-4">
            <div className="flex items-center justify-between">
              <div className="font-orbitron text-cyber-blue font-bold">
                ◊ {t('trading.matrix')}
              </div>
              <div className="font-mono text-cyber-green text-sm">
                {t('trading.live')} • {data.length} {t('trading.itemsTracked')}
              </div>
            </div>
          </div>

          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-6 gap-4 bg-cyber-gray/30 border-b border-cyber-blue/30 p-4 font-orbitron font-bold text-cyber-blue text-sm">
                  <div className="text-center">{t('trading.headers.index')}</div>
                  <div className="text-left">{t('trading.headers.item')}</div>
                  <div className="text-center">{t('trading.headers.maxDiff')}</div>
                  <div className="text-center">{t('trading.headers.expectedSales')}</div>
                  <div className="text-center">{t('trading.headers.recommendation')}</div>
                  <div className="text-center">{t('trading.headers.expectedIncome')}</div>
                </div>
                
                <AnimatePresence>
                  {data.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`grid grid-cols-6 gap-4 p-4 border-b border-cyber-blue/10 cursor-pointer transition-all duration-300 hover:bg-cyber-blue/5 ${
                        selectedRow === item.id ? 'bg-cyber-blue/10 border-l-4 border-cyber-blue' : ''
                      }`}
                      onClick={() => setSelectedRow(selectedRow === item.id ? null : item.id)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="text-center">
                        <span className="font-mono text-cyber-green font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <div className="text-left">
                        <span className="font-exo2 text-white font-medium text-sm">
                          {item.marketHashName}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <Tooltip 
                          content={<PlatformPrices platforms={item.platforms} />}
                          placement="top"
                          className="bg-transparent shadow-none"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="inline-block"
                          >
                            <Chip
                              className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue font-mono font-bold cursor-pointer hover:bg-cyber-blue/30 transition-all text-xs"
                              variant="bordered"
                            >
                              ${item.maxDiff}
                            </Chip>
                          </motion.div>
                        </Tooltip>
                      </div>
                      
                      <div className="text-center">
                        <span className="font-mono text-cyber-green font-bold">
                          {item.expectedSales}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <span className="font-mono text-cyber-pink font-bold">
                          {item.recommendation}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="font-orbitron font-black text-cyber-green text-lg neon-green"
                        >
                          ${(item.maxDiff * item.recommendation).toLocaleString()}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-black/60 border border-cyber-blue/30 backdrop-blur-cyber">
          <CardBody className="text-center p-6">
            <div className="text-3xl font-orbitron font-bold text-cyber-blue neon-blue mb-2">
              {data.length}
            </div>
            <div className="font-mono text-cyber-blue text-sm">{t('trading.stats.opportunities')}</div>
          </CardBody>
        </Card>
        
        <Card className="bg-black/60 border border-cyber-pink/30 backdrop-blur-cyber">
          <CardBody className="text-center p-6">
            <div className="text-3xl font-orbitron font-bold text-cyber-pink neon-pink mb-2">
              ${data.reduce((sum, item) => sum + (item.maxDiff * item.recommendation), 0).toLocaleString()}
            </div>
            <div className="font-mono text-cyber-pink text-sm">{t('trading.stats.profit')}</div>
          </CardBody>
        </Card>
        
        <Card className="bg-black/60 border border-cyber-green/30 backdrop-blur-cyber">
          <CardBody className="text-center p-6">
            <div className="text-3xl font-orbitron font-bold text-cyber-green neon-green mb-2">
              {Math.round(data.reduce((sum, item) => sum + item.expectedSales, 0) / data.length)}
            </div>
            <div className="font-mono text-cyber-green text-sm">{t('trading.stats.success')}</div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}