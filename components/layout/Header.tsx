'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/cart/CartContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useTheme } from '@/context/ThemeContext'
import { brand } from '@/config/brand'

const navLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/collections/all' },
  { label: 'Exhaust', href: '/collections/exhaust-systems' },
  { label: 'Lighting', href: '/collections/led-lighting' },
]

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { cartCount, openCart } = useCart()
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const container = containerRef.current

    const onScroll = () => {
      const y = window.scrollY
      const isScrolled = y > 20
      setScrolled(isScrolled)

      // Slide the whole container up by 38px (bar height) when scrolled past 60px.
      // The bar goes off the top of the viewport; the header naturally moves to top-0.
      if (container) {
        container.style.transform = y > 60 ? 'translateY(-38px)' : 'translateY(0)'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Header is always semi-transparent glass — never fully transparent.
  // This prevents page content from bleeding through.
  const isActive = scrolled || mobileOpen
  const headerBg = isActive
    ? theme === 'light'
      ? 'rgba(239, 237, 232, 0.94)'
      : 'rgba(13, 13, 13, 0.92)'
    : theme === 'light'
      ? 'rgba(239, 237, 232, 0.60)'
      : 'rgba(10, 10, 10, 0.50)'

  const navColor = theme === 'light' ? '#44403C' : '#aaaaaa'
  const logoColor = theme === 'light' ? '#1C1917' : '#ffffff'

  return (
    <>
      {/*
        Single fixed container wrapping BOTH the announcement bar and the header.
        On scroll > 60px, translateY(-38px) slides the bar off screen and
        the header naturally occupies the top of the viewport.
        This eliminates the "gap above header" problem completely.
      */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {/* Announcement bar — 38px */}
        <div
          style={{
            height: '38px',
            backgroundColor: '#F8BC51',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#422C00',
            }}
          >
            FREE SHIPPING ON ALL ORDERS OVER $99&nbsp;&nbsp;·&nbsp;&nbsp;JOIN THE VIKING ELITE REWARDS PROGRAM
          </span>
        </div>

        {/* Header — 72px */}
        <header
          style={{
            height: '72px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: headerBg,
            borderBottom: `1px solid ${isActive
              ? theme === 'light' ? 'rgba(120,113,108,0.15)' : 'rgba(80,69,54,0.14)'
              : 'transparent'
            }`,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label={brand.name}>
              <span
                className="font-display text-2xl tracking-wider leading-none"
                style={{ color: '#c8922a' }}
              >
                VIKING
              </span>
              <span
                className="hidden sm:block font-display text-2xl tracking-wider leading-none transition-colors group-hover:text-[#c8922a]"
                style={{ color: logoColor }}
              >
                CHROME
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest font-medium transition-colors hover:text-[#c8922a]"
                  style={{ color: navColor }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="p-2 transition-colors hover:text-[#c8922a]"
                style={{ color: navColor }}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

              <ThemeToggle />

              <button
                onClick={openCart}
                className="relative p-2 transition-colors hover:text-[#c8922a]"
                style={{ color: navColor }}
                aria-label={`Open cart, ${cartCount} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#c8922a] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 transition-colors hover:text-[#c8922a]"
                style={{ color: navColor }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu — positioned below the fixed container */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              top: '110px',
              left: 0,
              right: 0,
              zIndex: 65,
              background: theme === 'light' ? 'rgba(239,237,232,0.97)' : 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: `1px solid ${theme === 'light' ? 'rgba(120,113,108,0.15)' : '#1e1e1e'}`,
            }}
          >
            <nav className="flex flex-col px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium py-3 transition-colors hover:text-[#c8922a]"
                  style={{
                    color: theme === 'light' ? '#1C1917' : '#ffffff',
                    borderBottom: `1px solid ${theme === 'light' ? 'rgba(120,113,108,0.12)' : '#1a1a1a'}`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
