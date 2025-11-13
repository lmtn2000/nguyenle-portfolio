'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-context'

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDark, toggleDarkMode } = useTheme()

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-500 ${isDark
      ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100'
      : 'bg-gradient-to-b from-white via-blue-50 to-white text-gray-800'
      }`}>
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className={`absolute w-[600px] h-[600px] rounded-full mix-blend-screen blur-3xl opacity-40 transition-colors duration-500 ${isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-950 to-black'
            : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'
            }`}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 80, -80, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={`absolute w-[400px] h-[400px] rounded-full mix-blend-screen blur-3xl opacity-30 top-40 right-0 transition-colors duration-500 ${isDark
            ? 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800'
            : 'bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500'
            }`}
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-5 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${isDark
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700 hover:shadow-yellow-500/30'
          : 'bg-white text-blue-500 hover:bg-gray-100 hover:shadow-blue-300/40'
          }`}
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Children */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
