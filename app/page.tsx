'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Sun, Moon } from 'lucide-react'
import { useTheme } from './components/theme-context'

export default function PortfolioPage() {
  const { isDark } = useTheme()


  return (
    <section
      className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${isDark
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100'
        : 'bg-gradient-to-b from-white via-blue-50 to-white text-gray-800'
        }`}
    >
      <div className="max-w-3xl mx-auto p-6 pt-20">
        {/* Header */}
        <motion.h1
          className="mb-6 text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nguyen Le ⚡ Fullstack Developer
        </motion.h1>

        {/* Location */}
        <motion.div
          className="flex justify-center items-center gap-2 mb-10 text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <MapPin className="w-4 h-4 text-red-500" />
          <span>Currently based in Da Nang, Vietnam 🇻🇳</span>
        </motion.div>

        {/* About Me */}
        <motion.div
          className={`mb-12 p-6 rounded-2xl shadow-xl transition-all duration-500 backdrop-blur-md ${isDark
            ? 'bg-gray-800/60 hover:bg-gray-700/60 hover:shadow-purple-500/20'
            : 'bg-white/70 hover:bg-blue-50/80 hover:shadow-blue-300/30'
            }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            About Me
          </h2>
          <p className="leading-relaxed">
            Hey there 👋 I’m <span className="font-semibold">Nguyen Le</span> — a{' '}
            <span className="text-blue-500 font-medium">Fullstack Engineer</span> who loves crafting
            clean, scalable apps and exploring new ways to make the web faster and smarter.
          </p>
          <p className="mt-3 leading-relaxed">
            I thrive on <span className="italic">creative problem-solving</span> and enjoy diving
            deep into technologies like{' '}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              TypeScript, React, and AWS
            </span>
            . I’m always curious about modern frameworks, cloud architecture, and how small details
            can make a big difference in user experience.
          </p>
          <p className="mt-3 leading-relaxed">
            Outside of code, you’ll probably catch me enjoying football ⚽ (yes, I’m a proud MU fan
            😎), exploring design trends, or pushing myself with a new challenge.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
            Let’s Connect
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {[
              {
                href: 'mailto:leminhtrinhnguyen@gmail.com',
                label: 'Email',
                Icon: Mail,
                color: 'hover:text-blue-400',
              },
              {
                href: 'https://github.com/lmtn2000',
                label: 'GitHub',
                Icon: Github,
                color: 'hover:text-purple-400',
              },
              {
                href: 'https://www.linkedin.com/in/nguyenle-se',
                label: 'LinkedIn',
                Icon: Linkedin,
                color: 'hover:text-blue-500',
              },
            ].map(({ href, label, Icon, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 text-lg transition-all duration-300 ${color}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`p-3 rounded-full transition-all duration-300 group-hover:shadow-lg ${isDark
                    ? 'group-hover:shadow-purple-500/40 bg-gray-700'
                    : 'group-hover:shadow-blue-300/60 bg-white'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer quote */}
        <motion.p
          className="text-center italic text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          “Code with clarity. Create with passion.” 💡
        </motion.p>
      </div>
    </section>
  )
}
