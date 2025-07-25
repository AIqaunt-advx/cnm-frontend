'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { I18nProvider } from './i18n/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem={false}
      themes={['light', 'dark']}
      storageKey="cs2-nexus-theme"
    >
      <HeroUIProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  )
}