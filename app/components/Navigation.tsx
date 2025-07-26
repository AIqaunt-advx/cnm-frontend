'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Button, 
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@heroui/react'
import { useTheme } from 'next-themes'
import { useI18n } from '../i18n/provider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t, mounted: i18nMounted } = useI18n()
  const [glitchActive, setGlitchActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Random glitch effect
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted || !i18nMounted) {
    return null
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative bg-black/80 backdrop-blur-cyber border-b border-cyber-blue/30"
    >
      <div className="absolute inset-0 holographic opacity-20" />
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
            <motion.img
              src="https://s2.loli.net/2025/07/27/bCo7AGctgzL2TUd.png"
              alt="CNM CSGO Logo"
              className={`h-10 w-auto cursor-pointer ${glitchActive ? 'glitch' : ''}`}
              whileHover={{ scale: 1.05 }}
            />
            </Link>

          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <Link href="/">
                <Button
                  className={`cyber-button ${pathname === '/' ? 'bg-cyber-blue/20 border-cyber-blue' : 'border-cyber-gray'}`}
                  variant="bordered"
                >
                  <span className="font-orbitron">◊ {t('nav.home')}</span>
                </Button>
              </Link>
              <Link href="/trading">
                <Button
                  className={`cyber-button ${pathname === '/trading' ? 'bg-cyber-pink/20 border-cyber-pink' : 'border-cyber-gray'}`}
                  variant="bordered"
                >
                  <span className="font-orbitron">◊ {t('nav.trading')}</span>
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  className={`cyber-button ${pathname === '/docs' ? 'bg-cyber-green/20 border-cyber-green' : 'border-cyber-gray'}`}
                  variant="bordered"
                >
                  <span className="font-orbitron">◊ DOCS</span>
                </Button>
              </Link>
            </div>

            {/* Language selector */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className="cyber-button border-cyber-green min-w-16"
                >
                  <span className="font-mono text-cyber-green">
                    {mounted && i18nMounted ? (language === 'en' ? '[EN]' : '[中文]') : '[EN]'}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                className="bg-black/90 border border-cyber-blue/50"
                aria-label="Language selection"
                onAction={(key) => {
                  console.log('Language change:', key)
                  setLanguage(key as 'en' | 'zh')
                }}
              >
                <DropdownItem 
                  key="en" 
                  className="text-cyber-blue font-mono"
                >
                  [ENGLISH]
                </DropdownItem>
                <DropdownItem 
                  key="zh" 
                  className="text-cyber-green font-mono"
                >
                  [中文]
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Theme toggle */}
            <div className="flex items-center gap-2">
              <span className="text-cyber-blue font-mono text-sm">LIGHT</span>
              <Switch
                size="sm"
                color="primary"
                isSelected={mounted && theme === 'dark'}
                onValueChange={(isSelected: boolean) => {
                  console.log('Theme toggle:', isSelected ? 'dark' : 'light')
                  setTheme(isSelected ? 'dark' : 'light')
                }}
                classNames={{
                  wrapper: "bg-cyber-gray border border-cyber-blue/50",
                  thumb: "bg-cyber-blue shadow-neon-blue"
                }}
              />
              <span className="text-cyber-pink font-mono text-sm">DARK</span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}