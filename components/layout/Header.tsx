'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/cart/CartContext'
import { brand } from '@/config/brand'

const navLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/collections/all' },
  { label: 'Exhaust', href: '/collections/exhaust-systems' },
  { label: 'Lighting', href: '/collections/led-lighting' },
]

export default function Header() {
  const { cartCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1e1e1e]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={brand.name}
          >
            <span className="text-[#c8922a] font-display text-2xl tracking-wider group-hover:text-white transition-colors leading-none">
              VIKING
            </span>
            <span className="hidden sm:block text-white font-display text-2xl tracking-wider group-hover:text-[#c8922a] transition-colors leading-none">
              CHROME
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#aaa] hover:text-[#c8922a] transition-colors text-xs uppercase tracking-widest font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="text-[#aaa] hover:text-white transition-colors p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            <button
              onClick={openCart}
              className="relative text-[#aaa] hover:text-[#c8922a] transition-colors p-2"
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

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#aaa] hover:text-white transition-colors p-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-20 bg-[#0a0a0a] border-b border-[#1e1e1e] md:hidden"
          >
            <nav className="flex flex-col px-4 py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white hover:text-[#c8922a] transition-colors text-sm uppercase tracking-widest font-medium py-3 border-b border-[#1a1a1a]"
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
