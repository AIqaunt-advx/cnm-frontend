'use client'

import { motion } from 'framer-motion'
import SharedLayout from '../components/SharedLayout'
import TradingList from '../components/TradingList'

export default function TradingPage() {
  return (
    <SharedLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TradingList />
      </motion.div>
    </SharedLayout>
  )
}