'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@heroui/react'
import { useI18n } from '../i18n/provider'
import SharedLayout from '../components/SharedLayout'
import Link from 'next/link'

export default function DocsPage() {
  const { t } = useI18n()

  const docSections = [
    {
      title: "Getting Started",
      titleZh: "快速开始",
      icon: "🚀",
      items: [
        { title: "Installation", titleZh: "安装", href: "#installation" },
        { title: "Quick Setup", titleZh: "快速设置", href: "#setup" },
        { title: "First Trade", titleZh: "首次交易", href: "#first-trade" }
      ]
    },
    {
      title: "Trading Features",
      titleZh: "交易功能",
      icon: "📊",
      items: [
        { title: "Price Analysis", titleZh: "价格分析", href: "#analysis" },
        { title: "Profit Calculator", titleZh: "利润计算器", href: "#calculator" },
        { title: "Market Intelligence", titleZh: "市场情报", href: "#intelligence" }
      ]
    },
    {
      title: "API Reference",
      titleZh: "API参考",
      icon: "⚡",
      items: [
        { title: "Authentication", titleZh: "身份验证", href: "#auth" },
        { title: "Endpoints", titleZh: "接口端点", href: "#endpoints" },
        { title: "Rate Limits", titleZh: "频率限制", href: "#limits" }
      ]
    }
  ]

  return (
    <SharedLayout showStatusBar={false}>
      <div className="container mx-auto px-6 py-8 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron font-black text-4xl md:text-6xl mb-4">
            <span className="text-cyber-blue neon-blue">NEXUS</span>
            <span className="text-cyber-pink neon-pink mx-4">◊</span>
            <span className="text-cyber-green neon-green">DOCS</span>
          </h1>
          <div className="font-mono text-cyber-blue text-lg mb-6">
            &gt; COMPREHENSIVE TRADING DOCUMENTATION
          </div>
        </motion.div>

        {/* Documentation Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {docSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <Card className="bg-black/80 border border-cyber-blue/30 backdrop-blur-cyber shadow-cyber overflow-hidden h-full">
                <div className="absolute inset-0 holographic opacity-10" />
                <CardBody className="relative z-10 p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{section.icon}</div>
                    <h3 className="font-orbitron font-bold text-xl text-cyber-blue mb-2">
                      {t('nav.home') === 'TERMINAL' ? section.title : section.titleZh}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <motion.a
                        key={itemIndex}
                        href={item.href}
                        className="block p-3 rounded border border-cyber-gray/30 hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-rajdhani text-white group-hover:text-cyber-blue transition-colors">
                          {t('nav.home') === 'TERMINAL' ? item.title : item.titleZh}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Start Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-black/60 border border-cyber-green/30 backdrop-blur-cyber">
            <CardBody className="p-8">
              <h2 className="font-orbitron font-bold text-2xl text-cyber-green mb-6 text-center">
                ◊ QUICK START GUIDE
              </h2>
              
              <div className="bg-cyber-darker/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-cyber-green mb-2">$ npm install cs2-nexus</div>
                <div className="text-cyber-blue mb-2"># Initialize your trading environment</div>
                <div className="text-cyber-green mb-2">$ nexus init --platform steam,buff,csmoney</div>
                <div className="text-cyber-pink mb-2"># Start profit analysis</div>
                <div className="text-cyber-green">$ nexus analyze --mode realtime</div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/trading">
                  <Button 
                    className="cyber-button bg-cyber-green/20 border-cyber-green text-cyber-green font-mono"
                    variant="bordered"
                  >
                    ◊ START TRADING
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </SharedLayout>
  )
}