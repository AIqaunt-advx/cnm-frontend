'use client'

import SharedLayout from './components/SharedLayout'
import HeroSection from './components/HeroSection'
import Link from 'next/link'

export default function Home() {
  return (
    <SharedLayout>
      <HeroSection 
        onNavigateToTrading={() => {
          // Use Next.js router for navigation
          window.location.href = '/trading'
        }} 
      />
    </SharedLayout>
  )
}