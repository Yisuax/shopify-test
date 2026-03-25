'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { brand } from '@/config/brand'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background texture / gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#080808]" />

      {/* Decorative chrome lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-px h-full opacity-5"
          style={{ background: 'linear-gradient(to bottom, transparent, #c8922a, transparent)' }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full opacity-5"
          style={{ background: 'linear-gradient(to bottom, transparent, #c8922a 50%, transparent)' }}
        />
        <div
          className="absolute top-1/3 left-0 w-full h-px opacity-5"
          style={{ background: 'linear-gradient(to right, transparent, #c8922a, transparent)' }}
        />
      </div>

      {/* Gold accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c8922a 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px bg-[#c8922a]" />
          <span className="text-[#c8922a] text-xs uppercase tracking-[0.4em] font-medium">
            Premium Truck Accessories
          </span>
          <div className="w-8 h-px bg-[#c8922a]" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[clamp(52px,10vw,120px)] leading-none text-white tracking-wide"
        >
          <span className="block">VIKING</span>
          <span
            className="block chrome-shimmer"
            style={{ color: '#c8922a' }}
          >
            CHROME
          </span>
          <span className="block">SHOP</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#888] text-base sm:text-lg max-w-md leading-relaxed"
        >
          {brand.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-[#c8922a] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#e0a830] transition-colors"
          >
            Shop Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#aaa] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:border-white hover:text-white transition-colors"
          >
            View Collections
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-8 sm:gap-12 mt-8 pt-8 border-t border-[#1a1a1a]"
        >
          {[
            { value: '500+', label: 'Products' },
            { value: '10K+', label: 'Trucks Equipped' },
            { value: '15 Yrs', label: 'Experience' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl text-[#c8922a] tracking-wider">
                {stat.value}
              </span>
              <span className="text-[#555] text-[10px] uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6 text-[#333]" />
      </motion.div>
    </section>
  )
}
