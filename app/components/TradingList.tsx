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
import React from 'react'

function timeAgo(timestamp: number, t: (k: string, v?: any) => string) {
  const now = Date.now() / 1000
  const diff = Math.max(0, Math.floor(now - timestamp))
  if (diff < 60) return diff + t('trading.platformPopover.secondsAgo')
  if (diff < 3600) return Math.floor(diff / 60) + t('trading.platformPopover.minutesAgo')
  if (diff < 86400) return Math.floor(diff / 3600) + t('trading.platformPopover.hoursAgo')
  return Math.floor(diff / 86400) + t('trading.platformPopover.daysAgo')
}

function TrendLine({ trendList }: { trendList: [string, number, number][] }) {
  if (!trendList || trendList.length === 0) return null
  const prices = trendList.map(item => item[1])
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const points = prices.map((p, i) => {
    const x = (i / (prices.length - 1 || 1)) * 100
    const y = 100 - ((p - min) / (max - min || 1)) * 80 - 10 // padding 10
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width="120" height="40" viewBox="0 0 100 40">
      <polyline
        fill="none"
        stroke="#00ff99"
        strokeWidth="2"
        points={points}
      />
    </svg>
  )
}

const PlatformPopover: React.FC<{ itemID: number }> = ({ itemID }) => {
  const [loading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const { t } = useI18n()


  const fetchData = async () => {
    try {
      const res = await fetch(`https://sdt-api.ok-skins.com/user/skin/v1/market-comparsion?itemId=${itemID}&platform=YOUPIN&typeDay=1&dateType=3`)
      const json = await res.json()
      setData(json?.data?.platformMarket || [])
    } catch (e) {
      setData([])
    }
  }

  return (
    <div
      className="min-w-[320px] p-2"
      onMouseEnter={fetchData}
      onTouchStart={fetchData}
    >
      {loading && <div className="text-cyber-blue text-center">{t('common.loading')}</div>}
      {!loading && data.length === 0 && <div className="text-cyber-pink text-center">{t('trading.platformPopover.click')}</div>}
      {!loading &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.map(platform => (
            <div key={platform.platform} className="mb-3 last:mb-0 border-b border-cyber-blue/10 pb-2 last:border-b-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-cyber-blue">{platform.platformName}</span>
                <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyber-green underline">{t('trading.platformPopover.jump')}</a>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono mb-1">
                <span>
                  {t('trading.platformPopover.price')}: 
                  <span className={platform.sellCount === 0 ? "text-cyber-pink font-bold" : "text-cyber-green font-bold"}>
                    ${platform.sellPrice}
                  </span>
                </span>
                <span>{t('trading.platformPopover.sellCount')}: <span className="text-cyber-blue">{platform.sellCount}</span></span>
                <span>{t('trading.platformPopover.updateTime')}: <span className="text-cyber-pink">{timeAgo(Number(platform.updateTime), t)}</span></span>
              </div>
              <TrendLine trendList={platform.trendList} />
            </div>
          ))}
        </div>
      }
    </div>
  )
}

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
  id: string
  item_designation: string
  expected_today_sales: number
  recommended_buy: number
}

interface ApiResponse {
  success: boolean
  timestamp: string
  total_items: number
  items: TradingItem[]
}

export default function TradingList() {
  const { t, mounted: i18nMounted } = useI18n()
  const [data, setData] = useState<TradingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const loadData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://main.vastsea.cc:8000/api/v1/prediction/recommendations?limit=10')
        const apiData: ApiResponse = await response.json()
        if (apiData.success) {
          setData(apiData.items)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [mounted])

  // Platform prices component removed as API doesn't provide platform data

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
                    <React.Fragment key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`grid grid-cols-6 gap-4 p-4 border-b border-cyber-blue/10 cursor-pointer transition-all duration-300 hover:bg-cyber-blue/5 ${selectedRow === item.id ? 'bg-cyber-blue/10 border-l-4 border-cyber-blue' : ''
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
                            {item.item_designation}
                          </span>
                        </div>

                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="inline-block"
                          >
                            <Chip
                              className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue font-mono font-bold cursor-pointer hover:bg-cyber-blue/30 transition-all text-xs"
                              variant="bordered"
                            >
                              {Math.floor(Math.random() * (20 - 1 + 1)) + 1}
                            </Chip>
                          </motion.div>
                        </div>

                        <div className="text-center">
                          <span className="font-mono text-cyber-green font-bold">
                            {item.expected_today_sales}
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="font-mono text-cyber-pink font-bold">
                            {item.recommended_buy}
                          </span>
                        </div>

                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="font-orbitron font-black text-cyber-green text-lg neon-green cursor-pointer"
                          >
                            ${(item.expected_today_sales * item.recommended_buy).toLocaleString()}
                          </motion.div>
                        </div>
                      </motion.div>
                      {/* 点击行后显示 PlatformPopover */}
                      {selectedRow === item.id && (
                        <div className="col-span-6 px-4 pb-4">
                          <PlatformPopover itemID={parseInt(item.id)} />
                        </div>
                      )}
                    </React.Fragment>
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
              ${data.reduce((sum, item) => sum + (item.expected_today_sales * item.recommended_buy), 0).toLocaleString()}
            </div>
            <div className="font-mono text-cyber-pink text-sm">{t('trading.stats.profit')}</div>
          </CardBody>
        </Card>

        <Card className="bg-black/60 border border-cyber-green/30 backdrop-blur-cyber">
          <CardBody className="text-center p-6">
            <div className="text-3xl font-orbitron font-bold text-cyber-green neon-green mb-2">
              {data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.expected_today_sales, 0) / data.length) : 0}
            </div>
            <div className="font-mono text-cyber-green text-sm">{t('trading.stats.success')}</div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}