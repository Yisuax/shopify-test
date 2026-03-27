'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { brand } from '@/config/brand'

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        // Pull up to fill viewport — cancels main's paddingTop
        marginTop: '-110px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=85"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
          }}
          onError={(e) => {
            const fallbacks = [
              'https://images.unsplash.com/photo-1586191582056-5b43e3c265c3?w=1920&q=85',
              'https://images.unsplash.com/photo-1464219551459-ac14ae01fbe0?w=1920&q=85',
            ]
            const el = e.currentTarget
            const tried = parseInt(el.dataset.attempt ?? '0', 10)
            if (tried < fallbacks.length) {
              el.dataset.attempt = String(tried + 1)
              el.src = fallbacks[tried]
            }
          }}
        />
        {/* Cinematic overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.45) 0%,
              rgba(0,0,0,0.30) 35%,
              rgba(0,0,0,0.50) 65%,
              rgba(19,19,19,0.92) 88%,
              #131313 100%
            )`,
          }}
        />
      </div>

      {/* Decorative chrome lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            width: '1px',
            height: '100%',
            opacity: 0.05,
            background: 'linear-gradient(to bottom, transparent, #c8922a, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '33%',
            width: '1px',
            height: '100%',
            opacity: 0.05,
            background: 'linear-gradient(to bottom, transparent, #c8922a 50%, transparent)',
          }}
        />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{ width: '32px', height: '1px', backgroundColor: '#c8922a' }} />
          <span
            style={{
              color: '#c8922a',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              fontWeight: 500,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            Premium Truck Accessories
          </span>
          <div style={{ width: '32px', height: '1px', backgroundColor: '#c8922a' }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display"
          style={{
            fontSize: 'clamp(52px, 10vw, 120px)',
            lineHeight: 1,
            color: '#ffffff',
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          <span style={{ display: 'block' }}>VIKING</span>
          <span className="chrome-shimmer" style={{ display: 'block', color: '#c8922a' }}>
            CHROME
          </span>
          <span style={{ display: 'block' }}>SHOP</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            color: '#888888',
            fontSize: '17px',
            maxWidth: '400px',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {brand.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '8px' }}
        >
          <Link
            href="/products"
            style={{
              background: 'linear-gradient(135deg, #F8BC51 0%, #C8922A 100%)',
              color: '#422C00',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.12em',
              padding: '16px 44px',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              transition: 'filter 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
          >
            SHOP NOW →
          </Link>
          <Link
            href="/collections/all"
            style={{
              background: 'transparent',
              color: '#E5E2E1',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.12em',
              padding: '16px 44px',
              border: '2px solid rgba(229,226,225,0.55)',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F8BC51'
              e.currentTarget.style.color = '#F8BC51'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(229,226,225,0.55)'
              e.currentTarget.style.color = '#E5E2E1'
            }}
          >
            VIEW COLLECTIONS
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            marginTop: '32px',
            paddingTop: '32px',
            borderTop: '1px solid #1a1a1a',
          }}
        >
          {[
            { value: '500+', label: 'Products' },
            { value: '10K+', label: 'Trucks Equipped' },
            { value: '15 Yrs', label: 'Experience' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span className="font-display" style={{ fontSize: '28px', color: '#c8922a', letterSpacing: '0.08em' }}>
                {stat.value}
              </span>
              <span
                style={{
                  color: '#555',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown style={{ width: '24px', height: '24px', color: '#333' }} />
      </motion.div>
    </section>
  )
}
